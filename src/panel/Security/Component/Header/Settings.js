
import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Linking, } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../../../User/Redux/Slice/AuthSlice/LoginSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleIconPress = () => {
        navigation.navigate("Edit Security Profile");
    };
    const handleMessagesPress = () => {
        navigation.navigate("Messages");
    };
    const handleNoticePress = () => {
        navigation.navigate("Notice");

    };
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('userToken');
        } catch (e) {
            console.log('Error clearing user from AsyncStorage:', e);
        }
        dispatch(logout());
        navigation.navigate('Login');
    };
    const handlePhonePress = (phoneNumber) => {
        const dialNumber = `tel:${phoneNumber}`;
        Linking.openURL(dialNumber);
    };
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require("../../../../assets/Security/images/policeman.png")}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>Harsha</Text>
                    <View style={styles.subheadingContainer}>
                        <Icon name="lens" size={20} color="green" />
                        <Text style={styles.subheading}>On Duty</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.editIconContainer}
                    onPress={handleIconPress}
                >
                    <Icon name="edit" size={30} color="grey" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.rowContent} onPress={handleMessagesPress}>
                <Image
                    source={require("../../../../assets/Security/images/email.png")}
                    style={styles.Image2}
                />
                <View style={styles.imagecontent}>
                    <Text style={styles.rowText}>Messages</Text>
                </View>
                <Icon name="navigate-next" size={25} color="lightgrey" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowContent} onPress={handleNoticePress}>
                <Image
                    source={require("../../../../assets/Security/images/notice.png")}
                    style={styles.Image2}
                />
                <View style={styles.imagecontent}>
                    <Text style={styles.rowText}>Notice</Text>
                </View>
                <Icon name="navigate-next" size={25} color="lightgrey" />
            </TouchableOpacity>
            <Text
                style={{
                    marginTop: 10,
                    marginRight: "56%",
                    fontSize: 18,
                    fontWeight: "bold",
                }}
            >
                Quick Contacts
            </Text>
            <TouchableOpacity onPress={() => handlePhonePress("+919912872178")}>
                <View style={styles.rowContent}>
                    <Image
                        source={require("../../../../assets/Security/images/telephone.png")}
                        style={styles.Image2}
                    />
                    <View style={styles.imagecontent}>
                        <Text style={styles.rowText}>Call Admin</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePhonePress("+919912872178")}>
                <View style={styles.rowContent}>
                    <Image
                        source={require("../../../../assets/Security/images/telephone.png")}
                        style={styles.Image2}
                    />
                    <View style={styles.imagecontent}>
                        <Text style={styles.rowText}>Call Secretary</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Text
                style={{
                    marginTop: 10,
                    marginRight: "78%",
                    fontSize: 18,
                    fontWeight: "bold",
                }}
            >
                More
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Support")}>
                <View style={styles.rowContent}>
                    <Image
                        source={require("../../../../assets/Security/images/customer-service.png")}
                        style={styles.Image2}
                    />
                    <View style={styles.imagecontent}>
                        <Text style={styles.rowText}>Support</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Terms and Conditions")}>
                <View style={styles.rowContent}>
                    <Image
                        source={require("../../../../assets/Security/images/terms-and-conditions.png")}
                        style={styles.Image2}
                    />
                    <View style={styles.imagecontent}>
                        <Text style={styles.rowText}>Terms and Conditions</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
                <View style={styles.rowContent}>
                    <Image
                        source={require("../../../../assets/Security/images/log-out.png")}
                        style={styles.Image2}
                    />
                    <View style={styles.imagecontent}>
                        <Text style={styles.rowText}>Logout</Text>
                    </View>
                </View>

            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 5,
        backgroundColor: "white",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        width: "90%",
        borderRadius: 10,
        backgroundColor: "#F3FBFF",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginTop: 10,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    subheadingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    subheading: {
        fontSize: 16,
        color: "grey",
        marginLeft: 5,
    },
    editIconContainer: {
        padding: 10,
        borderRadius: 20,
    },
    rowContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        width: "90%",
        borderColor: "lightgrey",
        borderRadius: 10,
        marginTop: 10,
    },
    Image2: {
        width: 30,
        height: 30,

        marginRight: 10,
    },
    rowText: {
        fontSize: 16,
        marginRight: 10,
    },
    imagecontent: {
        flex: 1,
        marginRight: 10,
    },

});

export default Settings;