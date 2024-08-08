import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import CheckIn from './Check-In';
import CheckOut from './Check-Out';
import Waiting from './Waiting';
import { fetchVisitors } from '../../../User/Redux/Slice/Security_Panel/InandOutSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InandOut1 = () => {

    const [activeTab, setActiveTab] = useState('Check In');
    const dispatch = useDispatch();
    const [societyId, setSocietyId] = useState(null);
    const { visitors = [], status, error } = useSelector((state) => state.visitors);
    useEffect(() => {
        const getSocietyId = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                const id = JSON.parse(user).societyId
                if (id !== null) {
                    setSocietyId(id);
                } else {
                    console.error('No societyId found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error fetching societyId from AsyncStorage:', error);
            }
        };
        getSocietyId();
    }, []);

      useEffect(() => {
        if (societyId) {
            dispatch(fetchVisitors(societyId));
        }
    }, [dispatch, societyId]);

    if (status === 'loading') {
        return <Text>Loading...</Text>;
    }

   
    const checkInData = visitors.filter((visitor) => visitor.status === 'Check In');
    const checkOutData = visitors.filter((visitor) => visitor.status === 'Check Out');
    const waitingData = visitors.filter((visitor) => visitor.status === 'Waiting');

    const renderContent = () => {
        switch (activeTab) {
            case 'Check In':
                return <CheckIn data={checkInData} />;
            case 'Check Out':
                return <CheckOut data={checkOutData} />;
            case 'Waiting':
                return <Waiting data={waitingData} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topHalf}>
                <View style={styles.topNav}>
                    <TouchableOpacity style={styles.tabView} onPress={() => setActiveTab('Check In')}>
                        <Text style={{ color: activeTab === 'Check In' ? 'white' : '#f0d0b8' }}>Check In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabView} onPress={() => setActiveTab('Check Out')}>
                        <Text style={{ color: activeTab === 'Check Out' ? 'white' : '#f0d0b8' }}>Check Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabView} onPress={() => setActiveTab('Waiting')}>
                        <Text style={{ color: activeTab === 'Waiting' ? 'white' : '#f0d0b8' }}>Waiting</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomHalf}>
                {renderContent()}
            </View>
        </SafeAreaView>
    );
};

export default InandOut1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topHalf: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8E9DC',
    },
    bottomHalf: {
        flex: 8,
        backgroundColor: '#ffffff',
    },

    topNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 50,
        paddingVertical: 20,
    },
    tabView: {
        alignItems: "center"
    }
});
