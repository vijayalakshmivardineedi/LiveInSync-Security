
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { RadioButton } from "react-native-paper";

const ApartmentDetails = ({ navigation }) => {
    const [selectedCity, setSelectedCity] = useState("");
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [selectedSociety, setSelectedSociety] = useState("");
    const [showSocietyDropdown, setShowSocietyDropdown] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState("");
    const [showBlockDropdown, setShowBlockDropdown] = useState(false);
    const [selectedFlat, setSelectedFlat] = useState("");
    const [showFlatDropdown, setShowFlatDropdown] = useState(false);
    const [selectedYou, setSelectedYou] = useState("");
    const [showYouDropdown, setShowYouDropdown] = useState(false);
    const [checked, setChecked] = React.useState("");

    const selectCity = (city) => {
        setSelectedCity(city.label);
        setShowCityDropdown(false);
    };

    const selectSociety = (society) => {
        setSelectedSociety(society.label);
        setShowSocietyDropdown(false);
    };

    const selectBlock = (block) => {
        setSelectedBlock(block.label);
        setShowBlockDropdown(false);
    };

    const selectFlat = (Flat) => {
        setSelectedFlat(Flat.label);
        setShowFlatDropdown(false);
    };

    const selectYou = (You) => {
        setSelectedYou(You.label);
        setShowYouDropdown(false);
    };

    const toggleCityDropdown = () => {
        setShowCityDropdown(!showCityDropdown);
        setShowSocietyDropdown(false);
        setShowBlockDropdown(false);
        setShowFlatDropdown(false);
        setShowYouDropdown(false);
    };

    const toggleSocietyDropdown = () => {
        setShowSocietyDropdown(!showSocietyDropdown);
        setShowCityDropdown(false);
        setShowBlockDropdown(false);
        setShowFlatDropdown(false);
        setShowYouDropdown(false);
    };

    const toggleBlockDropdown = () => {
        setShowBlockDropdown(!showBlockDropdown);
        setShowCityDropdown(false);
        setShowSocietyDropdown(false);
        setShowFlatDropdown(false);
        setShowYouDropdown(false);
    };

    const toggleFlatDropdown = () => {
        setShowFlatDropdown(!showFlatDropdown);
        setShowCityDropdown(false);
        setShowSocietyDropdown(false);
        setShowBlockDropdown(false);
        setShowYouDropdown(false);
    };

    const toggleYouDropdown = () => {
        setShowYouDropdown(!showYouDropdown);
        setShowCityDropdown(false);
        setShowSocietyDropdown(false);
        setShowBlockDropdown(false);
        setShowFlatDropdown(false);
    };

    const cities = [
        { label: "Vijayawada", icon: require("../../../../assets/User/images/House.png"), },
        { label: "Hyderabad", icon: require("../../../../assets/User/images/House.png"), },
        { label: "Tirupati", icon: require("../../../../assets/User/images/House.png"), },
    ];

    const societies = [
        { label: "MVV City", icon: require("../../../../assets/User/images/House.png"), },
        { label: "Sky Park", icon: require("../../../../assets/User/images/House.png"), },
        { label: "Vansanth Vihar", icon: require("../../../../assets/User/images/House.png"), },
    ];

    const blocks = [
        { label: "Block A", icon: require("../../../../assets/User/images/Block.png") },
        { label: "Block B", icon: require("../../../../assets/User/images/Block.png") },
        { label: "Block C", icon: require("../../../../assets/User/images/Block.png") },
    ];

    const Flats = [
        { label: "101", icon: require("../../../../assets/User/images/location-pin.png") },
        { label: "102", icon: require("../../../../assets/User/images/location-pin.png") },
        { label: "103", icon: require("../../../../assets/User/images/location-pin.png") },
    ];

    const Yous = [
        { label: "Flat Owner", icon: require("../../../../assets/User/images/young-man.png"), },
        { label: "Renting with Family", icon: require("../../../../assets/User/images/young-man.png"), },
        { label: "Renting with Flatmate", icon: require("../../../../assets/User/images/young-man.png"), },
    ];

    return (
        <ScrollView vertical={true}>
            <View style={styles.container}>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>City</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={toggleCityDropdown}
                    >
                        <Image
                            source={require("../../../../assets/User/images/location-pin.png")}
                            style={{ width: 20, height: 20 }}
                        />
                        <Text style={styles.selected}>
                            {selectedCity || "Select Your City"}
                        </Text>
                        <Icon
                            name={showCityDropdown ? "angle-up" : "angle-down"}
                            size={20}
                            color="#000"
                            style={styles.angleIcon}
                        />
                    </TouchableOpacity>
                    {showCityDropdown && (
                        <View style={styles.dropdownList}>
                            {cities.map((city, index) => (
                                <TouchableOpacity key={index} onPress={() => selectCity(city)}>
                                    <View style={styles.dropdownItem}>
                                        <Image source={city.icon} style={styles.icon} />
                                        <Text>{city.label}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>Society Name</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={toggleSocietyDropdown}
                    >
                        <Image
                            source={require("../../../../assets/User/images/House.png")}
                            style={{ width: 20, height: 20 }}
                        />
                        <Text style={styles.selected}>
                            {selectedSociety || "Select Your Society"}
                        </Text>
                        <Icon
                            name={showSocietyDropdown ? "angle-up" : "angle-down"}
                            size={20}
                            color="#000"
                            style={styles.angleIcon}
                        />
                    </TouchableOpacity>
                    {showSocietyDropdown && (
                        <View style={styles.dropdownList}>
                            {societies.map((society, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => selectSociety(society)}
                                >
                                    <View style={styles.dropdownItem}>
                                        <Image source={society.icon} style={styles.icon} />
                                        <Text>{society.label}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>Block Number</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={toggleBlockDropdown}
                    >
                        <Image
                            source={require("../../../../assets/User/images/Block.png")}
                            style={{ width: 20, height: 20 }}
                        />
                        <Text style={styles.selected}>
                            {selectedBlock || "Select Your Block"}
                        </Text>
                        <Icon
                            name={showBlockDropdown ? "angle-up" : "angle-down"}
                            size={20}
                            color="#000"
                            style={styles.angleIcon}
                        />
                    </TouchableOpacity>
                    {showBlockDropdown && (
                        <View style={styles.dropdownList}>
                            {blocks.map((block, index) => (
                                <TouchableOpacity key={index} onPress={() => selectBlock(block)}>
                                    <View style={styles.dropdownItem}>
                                        <Image source={block.icon} style={styles.icon} />
                                        <Text>{block.label}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>Flat No</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={toggleFlatDropdown}
                    >
                        <Image
                            source={require("../../../../assets/User/images/location-pin.png")}
                            style={{ width: 20, height: 20 }}
                        />
                        <Text style={styles.selected}>
                            {selectedFlat || "Select Your Flat No "}
                        </Text>
                        <Icon
                            name={showFlatDropdown ? "angle-up" : "angle-down"}
                            size={20}
                            color="#000"
                            style={styles.angleIcon}
                        />
                    </TouchableOpacity>
                    {showFlatDropdown && (
                        <View style={styles.dropdownList}>
                            {Flats.map((Flat, index) => (
                                <TouchableOpacity key={index} onPress={() => selectFlat(Flat)}>
                                    <View style={styles.dropdownItem}>
                                        <Image source={Flat.icon} style={styles.icon} />
                                        <Text>{Flat.label}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>You are</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={toggleYouDropdown}
                    >
                        <Image
                            source={require("../../../../assets/User/images/young-man.png")}
                            style={{ width: 20, height: 20 }}
                        />
                        <Text style={styles.selected}>{selectedYou || "Select"}</Text>
                        <Icon
                            name={showYouDropdown ? "angle-up" : "angle-down"}
                            size={20}
                            color="#000"
                            style={styles.angleIcon}
                        />
                    </TouchableOpacity>
                    {showYouDropdown && (
                        <View style={styles.dropdownList}>
                            {Yous.map((You, index) => (
                                <TouchableOpacity key={index} onPress={() => selectYou(You)}>
                                    <View style={styles.dropdownItem}>
                                        <Image source={You.icon} style={styles.icon} />
                                        <Text>{You.label}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
                <RadioButton.Group
                    onValueChange={(newValue) => setChecked(newValue)}
                    value={checked}
                >
                    <View style={styles.radioButtonContainer}>
                        <RadioButton value="Current resident" />
                        <Text>Current resident</Text>
                    </View>
                    <View style={styles.radioButtonContainer}>
                        <RadioButton value="Move in" />
                        <Text>Move in</Text>
                    </View>
                </RadioButton.Group>
                <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    backButton: {
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 16,
    },
    dropdownContainer: {
        marginBottom: 16,
        padding: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: "bold",
    },
    continueButton: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 5
    },
    continueButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    dropdown: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
    },
    selected: {
        flex: 1,
        marginLeft: 10,
        padding: 5,
    },
    angleIcon: {
        marginLeft: 10,
        opacity: 0.3,
    },
    dropdownList: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
    },
    dropdownItem: {
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth:1,
        borderBottomColor:"#d0d0d0"

    },
    radioButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 5
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
});

export default ApartmentDetails;