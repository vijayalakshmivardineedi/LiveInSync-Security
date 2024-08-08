import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    ScrollView,
} from "react-native";

const EditProfile = () => {
    const [inputs, setInputs] = useState({
        name: "Harsha",
        phone: "852009897",
        id: "#1234567",
        address: "Gandhi Nagar, Madhurawada, Visakhapatnam, Andhra Pradesh, 530052",
    });

    // Function to handle text input changes
    const handleInputChange = (text, field) => {
        setInputs({ ...inputs, [field]: text });
    };

    // Function to handle save action
    const handleSave = () => {
        console.log("Saved inputs:", inputs);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../../assets/Security/images/policeman.png")}
                    style={styles.image}
                />
            </View>
            <Text style={styles.heading}>GATE-1</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input,styles.id]}
                    onChangeText={(text) => handleInputChange(text, "id")}
                    value={inputs.id}
                    placeholder="ID"
                    editable={false}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange(text, "name")}
                    value={inputs.name}
                    placeholder="Name"
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange(text, "phone")}
                    value={inputs.phone}
                    placeholder="Phone"
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input2}
                    onChangeText={(text) => handleInputChange(text, "address")}
                    value={inputs.address}
                    placeholder="Address"
                    textAlignVertical="top"
                    multiline={true}
                    numberOfLines={4}
                />
            </View>
            <View style={styles.Button}>
                <Text style={styles.ButtonText}>Save</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "white",
    },
    imageContainer: {
        backgroundColor: "#F3FBFF",
        borderRadius: 90,
        padding: 10,
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 5,
        padding: 5,
    },
    id:{
        backgroundColor:"#f6f6f6",
        borderColor: "lightgray",
    },
    input: {
        height: "auto",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        width: "100%",
    },
    input2: {
        height: "auto",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        width: "100%",
        padding: 10,
    },
    Button: {
        backgroundColor: "#192c4c",
        padding: 10,
        width: "100%",
        alignItems: "center",
        borderRadius: 8,
        position: "absolute",
        bottom: 0, marginBottom: 10
    },
    ButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "600"
    },
});

export default EditProfile;