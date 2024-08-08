import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Community = () => {
    const navigation = useNavigation();

    const handleCardPress = () => {
        navigation.navigate("Residents ");
    };
    const handleEmegencyPress = () => {
        navigation.navigate("Emergency");
    };
    const handleDocumentpress = () => {
        navigation.navigate("Documents");
    }

    const handleDiscussionPress = () => {
        navigation.navigate("Communication");

    }
    const handleRentalFlatsPress = () => {
        navigation.navigate("Rental Flats");
    }
    const handleNoticeBoardPress = () => {
        navigation.navigate("Notice Board");
    }
    const handlePaymentPress = () => {
        navigation.navigate("Payment");
    }
    const handleAminitiesPress = () => {
        navigation.navigate("Amenities");
    };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Discovery</Text>

            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={handleCardPress}>
                    <Image
                        style={styles.cardImage}
                        source={require("../../../../assets/User/images/contacts.png")}
                    />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardHeading}>Residents</Text>
                        <Text style={styles.cardSubheading}>
                            View society residents & management Committee
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={handleEmegencyPress}>
                    <Image
                        style={styles.cardImage}
                        source={require("../../../../assets/User/images/ambulance (1).png")}
                    />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardHeading}>Emergency No’s</Text>
                        <Text style={styles.cardSubheading}>
                            Emergency contacts for your society
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.card} onPress={handleRentalFlatsPress}>
                <Image
                    style={styles.cardImage}
                    source={require("../../../../assets/User/images/building.png")}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.cardHeading}>Rental Flats</Text>
                    <Text style={styles.cardSubheading}>
                        Find & post your flats for rentals
                    </Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.text}>Engage</Text>

            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={handleDiscussionPress}>
                    <Image
                        style={styles.cardImage}
                        source={require("../../../../assets/User/images/chating.png")}
                    />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardHeading}>Discussion</Text>
                        <Text style={styles.cardSubheading}>
                            Host meetings , polls and Communication channels
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={handleAminitiesPress}>
                    <Image
                        style={styles.cardImage}
                        source={require("../../../../assets/User/images/amenities.png")}
                    />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardHeading}>Amenities</Text>
                        <Text style={styles.cardSubheading}>
                            Book facilities in your society
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={handleDocumentpress}>
                    <Image
                        style={styles.cardImage}
                        source={require("../../../../assets/User/images/upload.png")}
                    />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardHeading}>Documents</Text>
                        <Text style={styles.cardSubheading}>
                            Find & store society and personal documents
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={handleNoticeBoardPress}>
                    <Image
                        style={styles.cardImage}
                        source={require("../../../../assets/User/images/pinned-notes (1).png")}
                    />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardHeading}>Notice Board</Text>
                        <Text style={styles.cardSubheading}>View society announcement</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate("Polls") }}>
                    <Image
                        style={styles.cardImage}
                        source={require("../../../../assets/User/images/upload.png")}
                    />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardHeading}>Polls</Text>
                        <Text style={styles.cardSubheading}>
                            Give you decisions
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate("Events") }}>
                    <Image
                        style={styles.cardImage}
                        source={require("../../../../assets/User/images/upload.png")}
                    />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardHeading}>Events</Text>
                        <Text style={styles.cardSubheading}>
                            Community Events
                        </Text>
                    </View>
                </TouchableOpacity>


            </View>
            <Text style={styles.text}>Pay</Text>
            <TouchableOpacity style={styles.card} onPress={handlePaymentPress}>
                <Image
                    style={styles.cardImage}
                    source={require("../../../../assets/User/images/tick.png")}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.cardHeading}>Payments</Text>
                    <Text style={styles.cardSubheading}>
                        Pay utility bills, and other society charges
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f5f5f5",
    },

    text: {
        fontSize: 16,
        color: "#484848",
        fontWeight: "700",
        margin: 5,
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    card: {
        width: "49%",
        height: 75, // Adjusted height to fit content naturally
        backgroundColor: "#fff",
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        padding: 7,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    cardImage: {
        width: 40,
        height: 40,
        marginRight: 16, // Margin to space out image and text
    },
    cardContent: {
        flex: 1,
        // justifyContent: "center",
    },
    cardHeading: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 4,
        textAlign: "left", // Align text to the left
    },
    cardSubheading: {
        fontSize: 10,
        color: "#666",
        textAlign: "left", // Align text to the left
    },
});

export default Community;
