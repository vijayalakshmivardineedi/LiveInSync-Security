import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";

const PaperBoyProfile = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
 
  const [radioValue, setRadioValue] = useState("first");

  const handleAddPress = () => {
     if (radioValue) {
       // Proceed with adding to household
       setModalVisible(true);
     } else {
       Alert.alert("Please select a News Paper.");
     }
  };

  const handleContinuePress = () => {
    setModalVisible(false);
    setSecondModalVisible(true);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Entry Code: ${entryCode}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type: ", result.activityType);
        } else {
          console.log("Shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Dismissed");
      }
    } catch (error) {
      console.error("Error sharing: ", error.message);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Image
              source={require("../../../../../assets/User/images/learner_5999070.png")}
              style={styles.image}
            />
            <View style={styles.content}>
              <Text style={styles.cardTitle}>Raju</Text>
              <View style={styles.locationContainer}>
                <Ionicons
                  name="call"
                  size={16}
                  color="black"
                  style={styles.locationIcon}
                />
                <Text style={styles.cardSubText1}>+91 8520089197</Text>
              </View>
              <View style={styles.locationContainer}>
                <Ionicons
                  name="location"
                  size={16}
                  color="black"
                  style={styles.locationIcon}
                />
                <Text style={styles.cardSubText1}>
                  Pilla Vari Veedhi, Jail Road, Near Complex, Visakhapatnam
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.reviewContainer}>
                  <Ionicons
                    name="star"
                    size={16}
                    color="gold"
                    style={styles.starIcon}
                  />
                  <Ionicons
                    name="star"
                    size={16}
                    color="gold"
                    style={styles.starIcon}
                  />
                  <Ionicons
                    name="star"
                    size={16}
                    color="gold"
                    style={styles.starIcon}
                  />
                  <Ionicons
                    name="star"
                    size={16}
                    color="gold"
                    style={styles.starIcon}
                  />
                  <Ionicons
                    name="star-outline"
                    size={16}
                    color="gold"
                    style={styles.starIcon}
                  />
                </View>
              </View>
            </View>
          </View>
          {/* New Card */}
          <View style={styles.newCard}>
            <View style={styles.newCardItem}>
              <Image
                source={require("../../../../../assets/User/images/punctuality.png")}
                style={styles.newCardImage}
              />
              <Text style={styles.newCardNumber}>4.75</Text>
              <Text style={styles.newCardText}>Time</Text>
              <Text style={styles.newCardSubText}>Punctual</Text>
            </View>
            <View style={styles.newCardItem}>
              <Image
                source={require("../../../../../assets/User/images/schedule.png")}
                style={styles.newCardImage}
              />
              <Text style={styles.newCardNumber}>4.5</Text>
              <Text style={styles.newCardText}>Quite</Text>
              <Text style={styles.newCardSubText}>Regular</Text>
            </View>
            <View style={styles.newCardItem}>
              <Image
                source={require("../../../../../assets/User/images/attitude.png")}
                style={styles.newCardImage}
              />
              <Text style={styles.newCardNumber}>4.9</Text>
              <Text style={styles.newCardText}>Good</Text>
              <Text style={styles.newCardSubText}>Behaviors</Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              margin: 10,
              marginLeft: 20,
            }}
          >
            News Papers
          </Text>
          <View style={styles.radioButtonContainer}>
            <RadioButton.Group
              onValueChange={(newValue) => setRadioValue(newValue)}
              value={radioValue}
            >
              <View style={styles.radioButtonRow}>
                <RadioButton value="first" />
                <Text style={styles.radioButtonText}>Time of India</Text>
              </View>
              <View style={styles.radioButtonRow}>
                <RadioButton value="second" />
                <Text style={styles.radioButtonText}>Sakshi</Text>
              </View>
              <View style={styles.radioButtonRow}>
                <RadioButton value="third" />
                <Text style={styles.radioButtonText}>Eenadu</Text>
              </View>
              <View style={styles.radioButtonRow}>
                <RadioButton value="fourth" />
                <Text style={styles.radioButtonText}>Andhrajyothi</Text>
              </View>
              <View style={styles.radioButtonRow}>
                <RadioButton value="fifth" />
                <Text style={styles.radioButtonText}>Visalandra</Text>
              </View>
            </RadioButton.Group>
          </View>
        </View>
        {/* Bottom Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalColumn}>
                <Image
                  source={require("../../../../../assets/User/images/learner_5999070.png")}
                  style={styles.modalImage}
                />
                <Text style={styles.modalText}>Review</Text>
              </View>
              <View style={styles.modalRow}>
                <Text style={styles.Name}>Raju</Text>
                <Text style={styles.Slot}>Selected News Paper</Text>
              </View>

              <View style={styles.modalRow1}>
                <Text style={styles.modalText1}>+91 8520089197</Text>
                <Text style={styles.modalSlot}>Sakshi</Text>
              </View>
              <Text style={styles.modalText2}>Salary: ₹6000/-</Text>

              <Text style={styles.modalText3}>
                Pilla Vari Veedhi, Jail Road, Near Complex, Vizag.
              </Text>

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.continueButton]}
                  onPress={handleContinuePress}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Second Bottom Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={secondModalVisible}
          onRequestClose={() => setSecondModalVisible(false)}
        >
          <View style={styles.secondModalContainer}>
            <View style={styles.secondModalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.secondModalHeading}>Maid Entry Code</Text>

                <TouchableOpacity onPress={() => setSecondModalVisible(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <Text style={styles.code}>125896</Text>
              <Text
                style={{
                  color: "white",
                  margin: 10,
                  fontWeight: "500",
                  fontSize: 16,
                  marginLeft: "20%",
                }}
              >
                OTP to be used on arrival at gate
              </Text>
              <View style={styles.secondModalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.shareButton]}
                  onPress={handleShare}
                >
                  <Ionicons name="share" size={24} color="white" />
                  <Text style={styles.shareButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <View style={{ backgroundColor: "white", height: 50, opacity: 1 }}>
        <TouchableOpacity style={styles.addbutton} onPress={handleAddPress}>
          <Text style={styles.newCardNumber1}>ADD TO HOUSEHOLD</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcf6f0",
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardSubText1: {
    fontSize: 13,
    marginTop: 4,
    color: "#7C7C7C",
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 4,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  starIcon: {
    marginRight: 2,
  },
  newCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  newCardItem: {
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 30,
  },
  newCardImage: {
    width: 40,
    height: 40,
    marginTop: 20,
  },
  newCardNumber: {
    fontSize: 14,
    marginTop: 8,
    backgroundColor: "#E7E8EC",
    padding: 4,
    borderRadius: 10,
    width: 50,
    textAlign: "center",
    color: "#6A53AA",
    fontWeight: "900",
  },
  newCardText: {
    fontSize: 14,
    marginTop: 4,
  },
  newCardSubText: {
    fontSize: 14,
  },

  newCardNumber1: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
    fontWeight: "900",
  },
  addbutton: {
    alignItems: "center",
    backgroundColor: "#6A53AA",
    padding: 10,
    width: "50%",
    marginLeft: 80,
    borderRadius: 10,
    bottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",

    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",

    padding: 20,
    width: "100%",
    paddingHorizontal: 30,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
  modalImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 10,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "600",
    marginRight: 10,
  },
  modalText2: {
    fontSize: 18,
    fontWeight: "500",
    marginRight: 10,
    color: "#515151",
  },
  modalText3: {
    fontSize: 16,
    fontWeight: "400",
    marginRight: 10,
    color: "#797979",
  },
  modalText1: {
    fontSize: 16,
    color: "#515151",
  },
  modalSlot: {
    backgroundColor: "#D8D9E0",
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: 10,
    fontWeight: "800",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#6A53AA",
  },
  continueButton: {
    backgroundColor: "#6A53AA",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  modalColumn: {
    alignItems: "center",
  },
  Name: {
    fontSize: 16,
    fontWeight: "500",
  },
  Slot: {
    textDecorationLine: "underline",
    fontSize: 16,
    fontWeight: "500",
  },
  modalRow1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  secondModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  secondModalContent: {
    backgroundColor: "#E0D8FF",
    padding: 20,
    width: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  secondModalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 10, // Add padding
    marginLeft: "30%",
  },
  secondModalButtonContainer: {
    alignItems: "center",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A53AA",
    padding: 10,
    borderRadius: 5,
  },
  shareButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  code: {
    backgroundColor: "white",
    padding: 10,
    width: 80,
    marginLeft: "35%",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  selectedSlot: {
    backgroundColor: "#6A53AA",
  },
  selectedSlotText: {
    color: "white",
  },

  radioButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  radioButtonText: {
    marginLeft: 8,
  },
});

export default PaperBoyProfile;
