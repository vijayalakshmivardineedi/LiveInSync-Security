import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import call from 'react-native-phone-call';
import DropDownPicker from 'react-native-dropdown-picker';

const data = [
    { id: '1', name: 'Swami', phone: '7894562156', gate: 'gate1', avatar_url: require('../../../../../assets/User/images/kishore_360.jpg') },
    { id: '2', name: 'Narayana Rao', phone: '7894562156', gate: 'gate2', avatar_url: require('../../../../../assets/User/images/kishore_360.jpg') },
    { id: '3', name: 'Sundaram', phone: '7894562156', gate: 'gate3', avatar_url: require('../../../../../assets/User/images/kishore_360.jpg') },
    { id: '4', name: 'Naidu', phone: '7894562156', gate: 'gate1', avatar_url: require('../../../../../assets/User/images/kishore_360.jpg') },
    { id: '5', name: 'Basha', phone: '7894562156', gate: 'gate2', avatar_url: require('../../../../../assets/User/images/kishore_360.jpg') },
    { id: '6', name: 'Ganapathi', phone: '7894562156', gate: 'gate3', avatar_url: require('../../../../../assets/User/images/kishore_360.jpg') },
    { id: '7', name: 'Virayya', phone: '7894562156', gate: 'gate1', avatar_url: require('../../../../../assets/User/images/kishore_360.jpg') },
];

const CalltoSecurity = () => {
    const [selectedGate, setSelectedGate] = useState(null);
    const [openGate, setOpenGate] = useState(false);

    const handleCallPress = (phone) => {
        const args = {
            number: phone,
            prompt: true,
        };
        call(args).catch(console.error);
    };

    const renderItem = ({ item }) => (
       
            <View style={styles.itemContainer}>
                <Avatar source={item.avatar_url} rounded size="medium" />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.phone}>{item.phone}</Text>
                </View>
                <TouchableOpacity onPress={() => handleCallPress(item.phone)}>
                <Icon name="phone" size={30} color="#c59358" style={styles.callIcon} />
                </TouchableOpacity>
            </View>
       
    );

  
    const filteredData = selectedGate ? data.filter(item => item.gate === selectedGate) : data;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                
                <View style={styles.titleContainer}>
                    
                    <DropDownPicker
                        open={openGate}
                        value={selectedGate}
                        items={[
                            { label: 'Select All', value: null }, 
                            { label: 'Gate 1', value: 'gate1' },
                            { label: 'Gate 2', value: 'gate2' },
                            { label: 'Gate 3', value: 'gate3' }
                        ]}
                        setOpen={setOpenGate}
                        setValue={setSelectedGate}
                        containerStyle={styles.dropdownContainer}
                        style={styles.dropdown}
                        placeholder="Select Gate"
                        showTickIcon={false}
                        />
                </View>
            </View>
           
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                style={{ marginTop: 20 }}
            />
            </View>
       
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal:10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        zIndex:1
    },
   
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    switchButtonActive: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    switchTextActive: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    dropdownContainer: {
        marginTop: 10,
        width: "100%",
    },
    
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft:10,
    },
    phone: {
        fontSize: 14,
        color: '#666',
        marginLeft:10,
    },
    callIcon: {
        marginLeft: 'auto',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 5,
        
    },
    icon: {
        width: 20,
        height: 20,
        marginLeft: 5,
    },
});

export default CalltoSecurity;