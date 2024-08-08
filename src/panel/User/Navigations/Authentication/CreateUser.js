import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { RadioButton, Text as PaperText, Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from '../../Redux/Slice/AuthSlice/Signup/citySlice';
import { fetchSocieties } from "../../Redux/Slice/AuthSlice/Signup/societySlice";
import { sendVerificationEmail } from '../../Redux/Slice/AuthSlice/Signup/SendEmailVerification';
import { useNavigation } from "@react-navigation/native";


const CreateUser = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const cities = useSelector(state => state.citiesState.cities);
    const societies = useSelector(state => state.societiesState.societies);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [society, setSociety] = useState("");
    const [block, setBlock] = useState("");
    const [flat, setFlat] = useState("");
    const [showCityMenu, setShowCityMenu] = useState(false);
    const [showSocietyMenu, setShowSocietyMenu] = useState(false);
    const [showBlockMenu, setShowBlockMenu] = useState(false);
    const [showFlatMenu, setShowFlatMenu] = useState(false);
    const [userType, setUserType] = useState("");
    const [blocksForSelectedSociety, setBlocksForSelectedSociety] = useState([]);
    const [flatsForSelectedBlock, setFlatsForSelectedBlock] = useState([]);
    const [citySelected, setCitySelected] = useState(false);
    const [societySelected, setsocietySelected] = useState(false);
    const [blockSelected, setblockSelected] = useState(false);
    const [flatsSelected, setFlatsSelected] = useState(false);
    const [societyId, setSocietyId] = useState('')

    useEffect(() => {
        dispatch(fetchCities());
    }, [dispatch]);

    const selectCity = (selectedCity) => {
        setCity(selectedCity.name);
        setShowCityMenu(false);
        dispatch(fetchSocieties(selectedCity._id));
        setCitySelected(true);
    };

    const toggleCityMenu = () => {
        setShowCityMenu(!showCityMenu);
    };

    const selectSociety = (selectedSociety) => {
        setsocietySelected(true);
        setSocietyId(selectedSociety._id)
        setSociety(selectedSociety.societyName);
        setShowSocietyMenu(false);
        const fetchedBlocks = fetchBlocksForSociety(selectedSociety._id);
        setBlocksForSelectedSociety(fetchedBlocks);
    };

    const fetchBlocksForSociety = (selectedSocietyId) => {
        const blocks = societies.find(item => item._id === selectedSocietyId)?.blocks || [];
        return blocks;
    };

    const selectBlock = (selectedBlock) => {
        setblockSelected(true);
        setBlock(selectedBlock.blockName);
        setShowBlockMenu(false);
        const fetchedFlats = fetchFlatsForBlock(selectedBlock.blockName);
        setFlatsForSelectedBlock(fetchedFlats);
    };

    const fetchFlatsForBlock = (selectedBlockName) => {
        const flats = blocksForSelectedSociety.find(item => item.blockName === selectedBlockName)?.flats || [];
        return flats;
    };

    const selectFlat = (selectedFlat) => {
        setFlat(selectedFlat.flatNumber);
        setShowFlatMenu(false);
        setFlatsSelected(true);
    };

    const toggleSocietyMenu = () => {
        setShowSocietyMenu(!showSocietyMenu);
    };

    const toggleBlockMenu = () => {
        setShowBlockMenu(!showBlockMenu);
    };

    const toggleFlatMenu = () => {
        setShowFlatMenu(!showFlatMenu);
    };

    const handleCreateUser = () => {
        dispatch(sendVerificationEmail(email))
            .unwrap()
            .then((result) => {
                console.log('Email sent:', result);
                console.log(name,
                    email,
                    mobileNumber,
                    password,
                    societyId,
                    society,
                    block,
                    flat,
                    userType)
                navigation.navigate("Verification", {
                    name,
                    email,
                    mobileNumber,
                    password,
                    societyId,
                    society,
                    block,
                    flat,
                    userType,
                });
            })
            .catch((error) => {
                // Handle error (optional)
                console.error('Failed to send email:', error);
            });
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Create User</Text>
                <Text style={styles.sectionTitle}>User Information</Text>
                <TextInput
                    theme={{ colors: { primary: "#7D0431" } }}
                    mode="outlined"
                    style={styles.input}
                    label="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    theme={{ colors: { primary: "#7D0431" } }}
                    mode="outlined"
                    style={styles.input}
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    theme={{ colors: { primary: "#7D0431" } }}
                    mode="outlined"
                    style={styles.input}
                    label="Phone Number"
                    value={mobileNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />
                <TextInput
                    theme={{ colors: { primary: "#7D0431" } }}
                    mode="outlined"
                    style={styles.input}
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                <Text style={styles.sectionTitle}>Apartment Information</Text>
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity onPress={toggleCityMenu} style={[styles.dropdown, showCityMenu && styles.dropdownActive]}>
                        <Text style={styles.dropdownText}>{city ? city : "Select City"}</Text>
                    </TouchableOpacity>
                    {showCityMenu && (
                        <View style={styles.menu}>
                            {cities.map((item) => (
                                <TouchableOpacity key={item._id} onPress={() => selectCity(item)}>
                                    <Text style={styles.menuItem}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity onPress={toggleSocietyMenu} style={[styles.dropdown, showSocietyMenu && styles.dropdownActive]} disabled={!citySelected}>
                        <Text style={styles.dropdownText}>{society ? society : "Select Society"}</Text>
                    </TouchableOpacity>
                    {showSocietyMenu && (
                        <View style={styles.menu}>
                            {societies.map((item) => (
                                <TouchableOpacity key={item._id} onPress={() => selectSociety(item)} disabled={!citySelected}>
                                    <Text style={styles.menuItem}>{item.societyName}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.dropdownContainer}>
                    <TouchableOpacity onPress={toggleBlockMenu} style={[styles.dropdown, showBlockMenu && styles.dropdownActive]} disabled={!societySelected}>
                        <Text>{block ? block : "Select Block"}</Text>
                    </TouchableOpacity>
                    {showBlockMenu && (
                        <View style={styles.menu}>
                            {blocksForSelectedSociety.map((item) => (
                                <TouchableOpacity key={item._id} onPress={() => selectBlock(item)} disabled={!societySelected}>
                                    <Text style={styles.menuItem}>{item.blockName}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.dropdownContainer}>
                    <TouchableOpacity onPress={toggleFlatMenu} style={[styles.dropdown, showSocietyMenu && styles.dropdownActive]} disabled={!blockSelected}>
                        <View>
                            <Text>{flat ? flat : "Select Flat"}</Text>
                        </View>
                    </TouchableOpacity>
                    {showFlatMenu && (
                        <View style={styles.menu}>
                            {flatsForSelectedBlock.map((item) => (
                                <TouchableOpacity key={item._id} onPress={() => selectFlat(item)} disabled={!blockSelected}>
                                    <Text style={styles.menuItem}>{item.flatNumber}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
                {flatsSelected && (
                    <View style={styles.radioContainer}>
                        <View style={styles.radioGroup}>
                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                    theme={{ colors: { primary: "#7D0431" } }}
                                    value="Owner"
                                    status={userType === "Owner" ? "checked" : "unchecked"}
                                    onPress={() => setUserType("Owner")}
                                />
                                <PaperText>Owner</PaperText>
                            </View>
                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                    theme={{ colors: { primary: "#7D0431" } }}
                                    value="Tenant"
                                    status={userType === "Tenant" ? "checked" : "unchecked"}
                                    onPress={() => setUserType("Tenant")}
                                />
                                <PaperText>Tenant</PaperText>
                            </View>
                        </View>
                    </View>)}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    theme={{ colors: { primary: '#7D0431' } }}
                    onPress={handleCreateUser}
                    disabled={!name || !email || !mobileNumber || !password || !city || !society || !block || !flat || !userType}
                >
                    Submit
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
        backgroundColor: "#fcf6f0",
    },
    title: {
        fontSize: 28,
        color: "#7D0431",
        letterSpacing: 0.7,
        fontWeight: "bold",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 5,
        color: "#555",
    },
    input: {
        marginVertical: 5,
    },
    dropdownContainer: {
        marginVertical: 8,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 5,
    },
    dropdownActive: {
        borderColor: "#7D0431",
    },
    dropdownText: {
        fontSize: 16,
    },
    menu: {
        marginTop: 5,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        maxHeight: 150,
        overflow: "scroll",
    },
    menuItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    radioContainer: {
        marginTop: 20,
    },
    radioGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonContainer: {
        marginVertical: 20,
        paddingHorizontal: 15,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default CreateUser;
