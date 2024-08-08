import React from 'react';
import {
    View, TouchableOpacity, StyleSheet, Text,
    Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import image from "../../../../../assets/User/images/tick.png"
const IndividualChat = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.contactItem}>
                <Image source={image} style={styles.avatar} />
                <View style={styles.contactInfo}>
                    <Text style={styles.name}>name</Text>
                    <Text style={styles.mobileNumber}>mobileNumber</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate("Residents ")}>
                <AntDesign name="plus" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fcf6f0",
    },
    floatingButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        right: 30,
        bottom: 30,
        backgroundColor: '#7d0431',
        elevation: 8,
    },
    contactItem: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#91A8BA",
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    contactInfo: {
        flex: 1,
        marginLeft: 15,
        bottom: 5,
    },
    name: {
        fontSize: 16,
        color: "#192c4c",
        fontWeight: "bold",
        marginTop: 10,
    },
    mobileNumber: {
        fontSize: 14,
        color: "#777",
    },
});

export default IndividualChat;
