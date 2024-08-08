import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const AddVisitors = () => {

    const [societyId, setSocietyId] = useState("");
    useEffect(() => {
        const getUserName = async () => {
            try {
                const userString = await AsyncStorage.getItem("user");
                if (userString !== null) {
                    const user = JSON.parse(userString);
                    setSocietyId(user.societyId);
                }
            } catch (error) {
                console.error("Failed to fetch the user from async storage", error);
            }
        };
        getUserName();

    }, []);
    console.log(societyId)
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate("Add Guest",{societyId})}>
                    <View style={styles.card}>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Guest</Text>
                        <View style={styles.imageContainer}>
                            <Image source={require("../../../assets/Security/images/man (2).png")} style={styles.image} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Add Delivery",{societyId})}>
                    <View style={styles.card}>
                        <Text style={{ fontSize: 20, fontWeight: "500", }}>Delivery</Text>
                        <View style={styles.imageContainer}>
                            <Image source={require("../../../assets/Security/images/delivery.png")} style={styles.image} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate("Add Service",{societyId})}>
                    <View style={styles.card}>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Service</Text>
                        <View style={styles.imageContainer}>
                            <Image source={require("../../../assets/Security/images/mechanic.png")} style={styles.image} />
                        </View>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Add Cab",{societyId})}>
                    <View style={styles.card}>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Cab</Text>
                        <View style={styles.imageContainer}>
                            <Image source={require("../../../assets/Security/images/taxi (1).png")} style={styles.image} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate("Add Others",{societyId})}>
                    <View style={styles.card}>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Others</Text>
                        <View style={styles.imageContainer}>
                            <Image source={require("../../../assets/Security/images/group.png")} style={styles.image} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default AddVisitors;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    row: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        flexDirection: "row",
        gap: 10
    },
    image: {
        width: 110,
        height: 110,
    },
    card: {
        borderRadius: 8,
        backgroundColor: "#f3fbff",
        height: 150,
        width: 175,
        padding: 10,
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
})