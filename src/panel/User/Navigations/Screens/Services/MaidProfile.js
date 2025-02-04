import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../../Redux/Slice/ServiceSlice/ServiceSlice";
import { addService } from "../../../Redux/Slice/ServiceSlice/AddServiceSlice";
const MaidProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { id } = route.params;
  const { data, loading, error } = useSelector((state) => state.services);
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleAddPress = () => {
    if (selectedSlot) {
      setModalVisible(true);
    } else {
      Alert.alert("Please select a time slot.");
    }
  };
  const selectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const handleContinuePress = () => {
    const serviceData = {
      societyId: "6683b57b073739a31e8350d0",
      serviceType: "maid", // Change this based on your actual service type
      userid: "967452",
      list: [
        {
          userId: "mhjsWd0mm",
          Block: "Block-1",
          flatNumber: "101",
          timings: selectedSlot,
          reviews: "",
          rating: 4.5,
        },
      ],
    };
    console.log(serviceData)
    dispatch(addService(serviceData));

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
          console.log('Shared with activity type: ', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.error('Error sharing: ', error.message);
    }
  };

  // Filter the maid data based on the id
  const filteredMaid = data.maid.find(maid => maid._id === id);

  if (!filteredMaid) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View key={filteredMaid._id} style={styles.container}>
        <View style={styles.card}>
          <Image
            source={{ uri: filteredMaid.pictures }}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.cardTitle}>{filteredMaid.name}</Text>
            <View style={styles.locationContainer}>
              <Ionicons
                name="call"
                size={14}
                color="#C59358"
                style={styles.locationIcon}
              />
              <Text style={styles.cardSubText1}>{filteredMaid.phoneNumber}</Text>
            </View>
            <View style={styles.locationContainer}>
              <Ionicons
                name="location"
                size={14}
                color="#C59358"
                style={styles.locationIcon}
              />
              <Text style={styles.cardSubText1}>
                {filteredMaid.address}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.reviewContainer}>
                <Ionicons
                  name="star"
                  size={16}
                  color="#C59358"
                  style={styles.starIcon}
                />
                <Ionicons
                  name="star"
                  size={16}
                  color="#C59358"
                  style={styles.starIcon}
                />
                <Ionicons
                  name="star"
                  size={16}
                  color="#C59358"
                  style={styles.starIcon}
                />
                <Ionicons
                  name="star"
                  size={16}
                  color="#C59358"
                  style={styles.starIcon}
                />
                <Ionicons
                  name="star-outline"
                  size={16}
                  color="#C59358"
                  style={styles.starIcon}
                />
              </View>
              <TouchableOpacity onPress={handleAddPress}>
                <Text style={styles.newCardNumber1}>ADD</Text>
              </TouchableOpacity>
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
              source={require("../../../../../assets/User/images/medal.png")}
              style={styles.newCardImage}
            />
            <Text style={styles.newCardNumber}>4.8</Text>
            <Text style={styles.newCardText}>Exceptional</Text>
            <Text style={styles.newCardSubText}>Service</Text>
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
        <Text style={{ fontWeight: "700", fontSize: 20, margin: 15 }}>
          Available Time Slots
        </Text>
        {/* Morning Section Card */}
        <View style={styles.morningSectionCard}>
          <View style={styles.timeSlotsContainer}>
            <TouchableOpacity
              style={[
                styles.timeSlot,
                selectedSlot === "6:00-7:00" && styles.selectedSlot,
              ]}
              onPress={() => selectSlot("6:00-7:00")}
            >
              <Text
                style={[
                  styles.timeSlotText,
                  selectedSlot === "6:00-7:00" && styles.selectedSlotText,
                ]}
              >
                {filteredMaid.timings}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ fontWeight: "700", fontSize: 20, margin: 20 }}>
          Reviews
        </Text>
        <ScrollView
          horizontal
          contentContainerStyle={styles.horizontalScrollView}
        >
          {[1, 2, 3, 4].map((_, index) => (
            <View key={index}>
              <View style={styles.reviewCard}>
                <View style={styles.reviewSection}>
                  <View style={styles.reviewContainer}>
                    <Ionicons
                      name="star"
                      size={16}
                      color="#C59358"
                      style={styles.starIcon}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      color="#C59358"
                      style={styles.starIcon}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      color="#C59358"

                      style={styles.starIcon}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      color="#C59358"

                      style={styles.starIcon}
                    />
                    <Ionicons
                      name="star-outline"
                      size={16}
                      color="#C59358"

                      style={styles.starIcon}
                    />
                  </View>

                  <View style={styles.imageSection}>
                    <Image
                      source={require("../../../../../assets/User/images/punctuality.png")}
                      style={styles.reviewImage}
                    />
                    <Image
                      source={require("../../../../../assets/User/images/schedule.png")}
                      style={styles.reviewImage}
                    />
                    <Image
                      source={require("../../../../../assets/User/images/medal.png")}
                      style={styles.reviewImage}
                    />
                    <Image
                      source={require("../../../../../assets/User/images/attitude.png")}
                      style={styles.reviewImage}
                    />
                  </View>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontWeight: "500", color: "#797979" }}>
                    "satisfied with their service, thanks team."
                  </Text>
                  <Text style={{ marginTop: 5 }}></Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
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
                source={require("../../../../../assets/User/images/woman_480.png")}
                style={styles.modalImage}
              />
              <Text style={styles.modalText}>Review</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.Name}>Poornima Sundarapu</Text>
              <Text style={styles.Slot}>Selected Slot</Text>
            </View>

            <View style={styles.modalRow1}>
              <Text style={styles.modalText1}>+91 8520089197</Text>
              <Text style={styles.modalSlot}>7:20 - 8:20</Text>
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
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7d0431"
  },
  cardSubText1: {
    fontSize: 13,
    marginTop: 4,
    color: "#7C7C7C",
    fontWeight: "400",
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
    backgroundColor: "#DDDEE0",
    padding: 4,
    borderRadius: 10,
    width: 50,
    textAlign: "center",
    color: "#7d0431",
    fontWeight: "600",
  },
  newCardText: {
    fontSize: 12,
    marginTop: 4,
  },
  newCardSubText: {
    fontSize: 12,
  },
  morningSectionCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  morningSectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444444",
  },
  EveningSectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    color: "#444444",
  },
  timeSlotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeSlot: {
    backgroundColor: "#D8D9E0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: 10,
    marginRight: 10,
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: "600",
  },
  horizontalScrollView: {
    paddingHorizontal: 16,
  },
  reviewCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    elevation: 2,
    width: "95%",
    marginTop: 1,
  },
  reviewSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  imageSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 16,
  },
  reviewImage: {
    width: 20,
    height: 20,
  },
  reviewText: {
    fontSize: 12,
    marginTop: 4,
  },
  newCardNumber1: {
    fontSize: 14,
    backgroundColor: "#7d0431",
    borderRadius: 10,
    width: 60,
    height: 30,
    padding: 5,
    marginTop: 10,
    textAlign: "center",
    color: "#fff",
    fontWeight: "900",
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
    fontSize: 18,
    fontWeight: "500",
  },
  Slot: {
    textDecorationLine: "underline",
    fontSize: 18,
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
    backgroundColor: "#7d0431",
  },
  selectedSlotText: {
    color: "white",
  },
});

export default MaidProfile;
