import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, Image, } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
const RaiseComplaint = () => {
    const [checked, setChecked] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const handleInputChange = (text) => {
        setInputValue(text);
    };
    const openDialog = () => {
        setIsDialogVisible(true);
    };
    const handleDropdownSelect = (option) => {
        setSelectedOption(option);
        setDropdownVisible(false);
    };
    const handleCamera = () => {
        launchCamera({}, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                console.log('Image: ', response.uri);
            }
        });
    };
    const handleGallery = () => {
        launchImageLibrary({}, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                console.log('Image: ', response.uri);
            }
        });
    };
    const dropdownOptions = [
        { label: 'Plumbing', value: 'Plumbing' },
        { label: 'Lift', value: 'Lift' },
        { label: 'Common Area', value: 'Common Area' },
        { label: 'Payment', value: 'Payment' },
        { label: 'Car Parking', value: 'Car Parking' },
        { label: 'Others', value: 'Others' },
    ];

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropdownButton} onPress={() => setDropdownVisible(!dropdownVisible)}>
                <Text style={styles.dropdownText}>{selectedOption ? selectedOption.label : 'Electrical'}</Text>
                <Icon name={dropdownVisible ? "chevron-up" : "chevron-down"} size={20} color="#000" />
            </TouchableOpacity>
            {dropdownVisible && (
                <View style={styles.dropdown}>
                    {dropdownOptions.map(option => (
                        <TouchableOpacity
                            key={option.value}
                            style={styles.dropdownItem}
                            onPress={() => handleDropdownSelect(option)}
                        >
                            <Text style={styles.dropdownItemText}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            <View style={styles.radioButtonContainer}>
                <RadioButton.Group
                    onValueChange={(newValue) => setChecked(newValue)}
                    value={checked}
                >
                    <View style={styles.radioButtonRow}>
                        <View style={styles.radioButton}>
                            <RadioButton value="Personal" color="#192C4C" />
                            <Text>Personal</Text>
                        </View>
                        <View style={styles.radioButton}>
                            <RadioButton value="Community" color="#192C4C" />
                            <Text>Community</Text>
                        </View>
                    </View>
                </RadioButton.Group>
            </View>
            <TextInput
                style={styles.inputField}
                value={inputValue}
                onChangeText={handleInputChange}
                textAlignVertical="top"
                multiline={true}
                numberOfLines={6}
            />
            <TouchableOpacity style={styles.actionButton} onPress={openDialog}>
                <MaterialIcons name="attachment" size={20} color="#C59358" />
                <Text style={styles.actionText}>Attach Photo</Text>
            </TouchableOpacity>
            {isDialogVisible && (
                <Modal animationType="slide" transparent={true} visible={isDialogVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modaltext}>Choose From...</Text>
                            <TouchableOpacity style={styles.modalItem} onPress={handleCamera}>
                                <Text style={styles.modaltext}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalItem} onPress={handleGallery}>
                                <Text style={styles.modaltext}>Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalItem} onPress={() => console.log('Files')}>
                                <Text style={styles.modaltext}>Browse files</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setIsDialogVisible(false)}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit Complaint</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: "#91A8BA",
        backgroundColor: '#f6f6f6',
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        zIndex: 1,
    },
    dropdownText: {
        fontSize: 16,
        color: "#192C4C",
        fontWeight: "bold",
        color: '#000',
    },
    dropdown: {
        backgroundColor: '#f6f6f6',
        borderWidth: 1,
        borderColor: "#91A8BA",
        borderRadius: 5,
        padding: 10,
        position: 'absolute',
        left: 20,
        right: 20,
        top: 60,
        zIndex: 2,
    },
    dropdownItem: {
        paddingVertical: 10,
    },
    dropdownItemText: {
        fontWeight: '400',
        fontSize: 16,
    },
    radioButtonContainer: {
        marginTop: 20,
        marginLeft: 20,
    },
    radioButtonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    inputField: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginLeft: 10,
        marginRight: 20,
        borderColor: '#ccc',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    actionText: {
        fontSize: 16,
        color: '#C59358',
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        minWidth: 300,
    },
    modaltext: {
        fontSize: 18,
        color: '#000',
        textAlign: 'left',
        marginVertical: 5,
    },
    modalItem: {
        padding: 5,
    },
    closeButton: {
        backgroundColor: '#E5E4E2',
        marginTop: 10,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        fontWeight: 'bold',
        color: '#000',
    },
    submitButton: {
        backgroundColor: '#192C4C',
        marginTop: 60,
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RaiseComplaint;