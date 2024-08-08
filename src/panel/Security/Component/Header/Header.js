import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../../Navigations/HomeScreen';
import Settings from './Settings';
import InandOut1 from './InandOut1';

const Header = () => {
    const [activeTab, setActiveTab] = useState('InAndOut');

    const renderContent = () => {
        switch (activeTab) {
            case 'Home':
                return <HomeScreen />;
            case 'InAndOut':
                return <InandOut1 />;
            case 'Settings':
                return <Settings />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topHalf}>
                <Text style={styles.SocietyName}>Jackson Heights</Text>
                <View style={styles.topNav}>
                    <TouchableOpacity style={styles.tabView} onPress={() => setActiveTab('Home')}>
                        <MaterialIcons name="home-filled" size={36} color={activeTab === 'Home' ? 'white' : '#f0d0b8'} />
                        <Text style={{ color: activeTab === 'Home' ? 'white' : '#f0d0b8' }}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabView} onPress={() => setActiveTab('InAndOut')}>
                        <Entypo name="swap" size={32} color={activeTab === 'InAndOut' ? 'white' : '#f0d0b8'} />
                        <Text style={{ color: activeTab === 'InAndOut' ? 'white' : '#f0d0b8' }}>In and Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabView} onPress={() => setActiveTab('Settings')}>
                        <Ionicons name="settings" size={32} color={activeTab === 'Settings' ? 'white' : '#f0d0b8'} />
                        <Text style={{ color: activeTab === 'Settings' ? 'white' : '#f0d0b8' }}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomHalf}>
                {renderContent()}
            </View>
        </SafeAreaView>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topHalf: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#7D0431',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    bottomHalf: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    SocietyName: {
        color: "#ffffff",
        fontWeight: "600",
        fontSize: 16
    },
    topNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 50,
        paddingVertical: 20
    },
    tabView: {
        alignItems: "center"
    }
});
