import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import DialpadPin from "../Component/CustomKeypad/DailpadPin";
import DialpadKeypad from "../Component/CustomKeypad/DialpadKeypad";
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { fetchVisitorVerify } from '../../User/Redux/Slice/Security_Panel/HomeScreenSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");
const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, "Y", 0, "X"];
const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.38;
const pinLength = 6;
const pinContainerSize = width / 1.8;
const pinSize = pinContainerSize / pinLength;
const modalDuration = 5000; // Modal visibility duration in milliseconds

const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [code, setCode] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [pinEnabled, setPinEnabled] = useState(true); // State to control PIN entry
    const [selectedOption, setSelectedOption] = useState(null); // State for selected radio button
    const [societyId, setSocietyId] = useState(null);
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
        if (modalVisible) {
            const timer = setTimeout(() => {
                setModalVisible(false);
                setPinEnabled(true); // Enable PIN entry when modal is closed
                setCode([]); // Clear the PIN code
            }, modalDuration);

            return () => clearTimeout(timer);
        }
    }, [modalVisible]);

    const handleEnter = () => {
        if (code.length === pinLength && selectedOption) {
            const payload = {
                societyId,
                id: code.join(''), // Join the code array into a string
                visitorType: selectedOption
            };

            dispatch(fetchVisitorVerify(payload))
                .then(() => {
                    setModalVisible(true);
                    setPinEnabled(false); // Disable PIN entry when modal is displayed
                })
                .catch((error) => {
                    console.error('Error fetching visitor verify:', error);
                    // Handle error as needed
                });
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setPinEnabled(true);
        setCode([]);
    }

    const handleOptionSelect = (option) => {
        setSelectedOption(option === 'guests' ? 'Guest' : 'Service');
        // Perform data storage or other logic specific to the selected option
    };

    const renderPinAndKeypad = () => {
        return (
            <View style={styles.pinContainer}>
                <View style={{ marginTop: -50 }}>
                    <DialpadPin
                        pinLength={pinLength}
                        pinSize={pinSize}
                        code={code}
                        disabled={!pinEnabled}
                    />
                </View>
                <View style={styles.textContainer}>
                    <DialpadKeypad
                        dialPadContent={dialPadContent}
                        pinLength={pinLength}
                        setCode={setCode}
                        code={code}
                        dialPadSize={dialPadSize}
                        dialPadTextSize={dialPadTextSize}
                        disabled={!pinEnabled}
                    />
                </View>
                <TouchableOpacity style={styles.enterButton} onPress={handleEnter} disabled={!pinEnabled}>
                    <Text style={styles.enterButtonText}>Enter</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Radio Buttons */}
            <View style={styles.radioContainer}>
                {selectedOption !== null ? null : (
                    <>
                        <TouchableOpacity style={[styles.radioButton, selectedOption === 'guests' && styles.selectedRadioButton]} onPress={() => handleOptionSelect('guests')}>
                            <Text style={styles.radioText}>Guests</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.radioButton, selectedOption === 'service' && styles.selectedRadioButton]} onPress={() => handleOptionSelect('service')}>
                            <Text style={styles.radioText}>Service</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            {/* Conditional Render based on selectedOption */}
            {selectedOption !== null && renderPinAndKeypad()}

            {/* Fixed Horizontal Scroll at the Bottom */}
            <View style={styles.scrollContainer}>
                <ScrollView horizontal={true} contentContainerStyle={styles.horizontalScroll}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Frequent Visitors")}>
                        <View style={styles.menuView}>
                            <Text style={styles.menuText}>Frequent Visitors</Text>
                            <Image source={require("../../../assets/Security/images/guest-list.png")} style={styles.menuImage} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Add Visitor")}>
                        <View style={styles.menuView}>
                            <Text style={styles.menuText}>Add Visitors</Text>
                            <Image source={require("../../../assets/Security/images/new (1).png")} style={styles.menuImage} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Residents")}>
                        <View style={styles.menuView}>
                            <Text style={styles.menuText}>Residents</Text>
                            <Image source={require("../../../assets/Security/images/lender (1).png")} style={styles.menuImage} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={require("../../../assets/Security/gif/door.gif")} style={{ width: 120, height: 120 }} />
                        <Text style={styles.modalText}>Enter IN</Text>
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <AntDesign name="close" size={24} color="#7d0431" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: -120, // Adjust this value to move the buttons up or down
        backgroundColor: '#7d0431',
        borderRadius: 4,
        paddingHorizontal: 40,
        paddingVertical: 40, // Increased vertical padding for height
    },
    selectedRadioButton: {
        borderBottomWidth: 2,
        borderColor: '#7d0431',
    },
    radioText: {
        fontSize: 18,
        color: '#fff',
    },
    pinContainer: {
        marginTop: -150,
        alignItems: 'center',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    enterButton: {
        backgroundColor: '#7d0431',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    enterButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 10,
    },
    horizontalScroll: {
        paddingVertical: 0,
    },
    menuItem: {
        marginHorizontal: 5,
    },
    menuView: {
        height: 110,
        width: 160,
        backgroundColor: '#F8E9DC',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 10,
    },
    menuText: {
        fontSize: 16,
        fontWeight: '500',
        width: 72,
    },
    menuImage: {
        width: 70,
        height: 70,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});