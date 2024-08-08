import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Dimensions,
  Share,
  Alert
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from 'react-redux';
import { createVisitor, resetState } from '../../Redux/Slice/Security_Panel/VisitorsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserProfiles } from "../../Redux/Slice/ProfileSlice/ProfileSlice";

const { width, height } = Dimensions.get("window");




const QuickActions = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCabModalVisible, setCabModalVisible] = useState(false);
  const [isDeliveryModalVisible, setDeliveryModalVisible] = useState(false);
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);
  const [isHelpModalVisible, setHelpModalVisible] = useState(false);
  const [guestModalVisible, setGuestModalVisible] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [guestContent, setGuestContent] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAlertModalVisible, setAlertModalVisible] = useState(false);


  const [societyId, setSocietyId] = useState('');
  const [userId, setUserId] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [role, setRole] = useState('');
  const [qrImageUrl, setQrImageUrl] = useState(null);
  const [visitorId, setVisitorId] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  // Cab entry state
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [company, setCompany] = useState('');

  //Delivery
  const [details, setDetails] = useState("")

  const { profiles, status, error } = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  const resetFields = () => {
    setName('');
    setPhoneNumber('');
    setVehicleNumber('');
    setCompany('');
    setDetails('');
    setIsCheckboxChecked(false);
  };
  //  const { loading, error, success } = useSelector((state) => state.visitor);

  useEffect(() => {
    const getUserName = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString !== null) {
          const user = JSON.parse(userString);
          setUserId(user.userId);
          setSocietyId(user.societyId);
        }
      } catch (error) {
        console.error("Failed to fetch the user from async storage", error);
      }
    };
    getUserName();
  }, []);

  useEffect(() => {
    if (userId && societyId) {
      dispatch(fetchUserProfiles({ userId, societyId }));
    }
  }, [dispatch, userId, societyId]);
  useEffect(() => {
    if (profiles.length > 0) {
      const profile = profiles[0]; // Assuming you want the first profile, update as necessary
      setBuildingName(profile.buildingName);
      setFlatNumber(profile.flatNumber);
    }
  }, [profiles]);

  console.log(buildingName, flatNumber)
  const handleSubmitCabEntry = () => {
    const visitorData = {
      userId,
      name,
      phoneNumber,
      vehicleNumber,
      company,
      societyId,
      block: buildingName,
      flatNo: flatNumber,
      role
    };

    dispatch(createVisitor(visitorData))
      .then((result) => {
        if (createVisitor.fulfilled.match(result)) {
          Alert.alert('Success', 'Cab entry created successfully');
          const { visitors } = result.payload.data.savedVisitor.society
          const qrImage = result.payload.data.qrCodeUrl
          const newVisitor = visitors[visitors.length - 1];
          const { visitorId } = newVisitor;
          setVisitorId(visitorId);
          setQrImageUrl(qrImage);
          setShowQrModal(true);
          resetFields();
          setCabModalVisible(false);
          setInviteModalVisible(true);
        } else {
          Alert.alert('Error', result.payload || 'Failed to create cab entry');
        }
      })

  };
  const handleSubmitDeliveryEntry = () => {
    const visitorData = {
      userId,
      name,
      phoneNumber,
      details,
      company,
      societyId,
      block: buildingName,
      flatNo: flatNumber,
      role
    };

    dispatch(createVisitor(visitorData))
      .then((result) => {
        if (createVisitor.fulfilled.match(result)) {

          Alert.alert('Success', 'Delivery entry created successfully');
          const { visitors } = result.payload.data.savedVisitor.society
          const qrImage = result.payload.data.qrCodeUrl
          const newVisitor = visitors[visitors.length - 1];
          const { visitorId } = newVisitor;
          setVisitorId(visitorId);
          setQrImageUrl(qrImage);
          setShowQrModal(true);
          resetFields();
          setDeliveryModalVisible(false);
          setInviteModalVisible(true);
        } else {
          Alert.alert('Error', result.payload || 'Failed to create cab entry');
        }
      })
      .finally(() => {

        dispatch(resetState());
      });
  };
  const handleSubmitGuestEntry = () => {
    const visitorData = {
      userId,
      name,
      phoneNumber,
      vehicleNumber,
      societyId,
      block: buildingName,
      flatNo: flatNumber,
      role,
      isFrequent: isCheckboxChecked
    };

    dispatch(createVisitor(visitorData))
      .then((result) => {
        if (createVisitor.fulfilled.match(result)) {

          Alert.alert('Success', 'Delivery entry created successfully');
          const { visitors } = result.payload.data.savedVisitor.society
          const qrImage = result.payload.data.qrCodeUrl
          const newVisitor = visitors[visitors.length - 1];
          const { visitorId } = newVisitor;
          setVisitorId(visitorId);
          setQrImageUrl(qrImage);
          setShowQrModal(true);
          resetFields();
          setGuestModalVisible(false);
          setInviteModalVisible(true);
        } else {
          Alert.alert('Error', result.payload || 'Failed to create cab entry');
        }
      })
      .finally(() => {
        dispatch(resetState());
      });
  };
  const handleSubmitServiceEntry = () => {
    const visitorData = {
      userId,
      name,
      phoneNumber,
      company,
      details,
      vehicleNumber,
      societyId,
      block: buildingName,
      flatNo: flatNumber,
      role,
    };

    dispatch(createVisitor(visitorData))
      .then((result) => {
        if (createVisitor.fulfilled.match(result)) {

          Alert.alert('Success', 'Service entry created successfully');
          const { visitors } = result.payload.data.savedVisitor.society
          const qrImage = result.payload.data.qrCodeUrl
          const newVisitor = visitors[visitors.length - 1];
          const { visitorId } = newVisitor;
          setVisitorId(visitorId);
          setQrImageUrl(qrImage);
          setShowQrModal(true);
          resetFields();
          setDeliveryModalVisible(false);
          setInviteModalVisible(true);
        } else {
          Alert.alert('Error', result.payload || 'Failed to create cab entry');
        }
      })
      .finally(() => {
        dispatch(resetState());
      });
  };


  const handleActionPress = (action) => {
    if (action === "Cab") {
      setRole("Cab")
      setCabModalVisible(true);
    } else if (action === "Delivery") {
      setRole("Delivery")
      setDeliveryModalVisible(true);

    } else if (action === "Help") {
      setRole("Service")
      setHelpModalVisible(true);
    } else if (action === "Guest") {
      setRole("Guest")
      setGuestModalVisible(true);
    }
  };



  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this entry code!${visitorId}`,
        url: qrImageUrl
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleAlertModal = () => {
    setAlertModalVisible(!isAlertModalVisible);
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const handleRaiseAlarm = () => {
    toggleModal();
    toggleAlertModal();
  };

  const renderOption = (option, imageSource, label) => (
    <TouchableOpacity
      style={[
        styles.iconWrapper,
        selectedOption === option && styles.selectedIconWrapper,
      ]}
      onPress={() => handleOptionPress(option)}
    >
      <Image source={imageSource} style={styles.icon} />
      <Text style={styles.iconLabel}>{label}</Text>
    </TouchableOpacity>
  );




  return (
    <View style={styles.container}>
      {status === 'loading' && <ActivityIndicator size="large" color="#0000ff" />}
      <Text style={styles.heading}>Allow Future Entry</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => handleActionPress("Cab")}
        >
          <Image
            source={require("../../../../assets/User/images/taxi (2).png")}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Cab</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => handleActionPress("Delivery")}
        >
          <Image
            source={require("../../../../assets/User/images/fast-delivery (1).png")}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => handleActionPress("Help")}
        >
          <Image
            source={require("../../../../assets/User/images/policemen.png")}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => handleActionPress("Guest")}
        >
          <Image
            source={require("../../../../assets/User/images/cake.png")}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Guest</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Notify Gate</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconWrapper} onPress={toggleModal}>
          <Image
            source={require("../../../../assets/User/images/warning (1).png")}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Security Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => navigation.navigate("Message to Guard")}
        >
          <Image
            source={require("../../../../assets/User/images/text1.png")}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Message to Guard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => navigation.navigate("Call to Security")}
        >
          <Image
            source={require("../../../../assets/User/images/phone1.png")}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Call to Security</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Allow Exit</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconWrapper}>
          <Image
            source={require("../../../../assets/User/images/boy-and-girl.png")}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Kid</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>My Visits</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconWrapper}>
          <Image
            source={require("../../../../assets/User/images/chat-bubbles-with-ellipsis.png")}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Request Code</Text>
        </TouchableOpacity>
      </View>

      {/* Cab Modal */}
      <Modal
        visible={isCabModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCabModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => setCabModalVisible(false)}
            >
              <MaterialCommunityIcons
                name="close"
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <Image
              source={require('../../../../assets/User/images/taxi (2).png')}
              style={styles.modalImage}
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChangeText={setVehicleNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Company"
              value={company}
              onChangeText={setCompany}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmitCabEntry}
            >
              <Text style={styles.buttonText}>Invite Cab</Text>
            </TouchableOpacity>
            {/* {loading && <ActivityIndicator size="large" color="#0000ff" />} */}
            {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
            {/* {success && (
              <Text style={styles.successText}>Cab entry created successfully!</Text>
            )} */}
          </View>
        </View>
      </Modal>

      {/* Delivery Modal */}
      <Modal
        visible={isDeliveryModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDeliveryModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => setDeliveryModalVisible(false)}
            >
              <MaterialCommunityIcons name="close" style={styles.closeIcon} />
            </TouchableOpacity>
            <Image
              source={require("../../../../assets/User/images/fast-delivery (1).png")}
              style={styles.modalImage}
            />
            <TextInput style={styles.input} placeholder="Name" value={name}
              onChangeText={setName} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TextInput style={styles.input} placeholder="Company" value={company}
              onChangeText={setCompany} />
            <TextInput style={styles.input} placeholder="Order ID" value={details}
              onChangeText={setDetails} />
            <TouchableOpacity style={styles.button} onPress={handleSubmitDeliveryEntry}>
              <Text style={styles.buttonText}>Invite Delivery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Help */}
      <Modal
        visible={isHelpModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setHelpModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => setHelpModalVisible(false)}
            >
              <MaterialCommunityIcons name="close" style={styles.closeIcon} />
            </TouchableOpacity>
            <Image
              source={require("../../../../assets/User/images/policemen.png")}
              style={styles.modalImage}
            />
            <TextInput style={styles.input} placeholder="Name" value={name}
              onChangeText={setName} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChangeText={setVehicleNumber}
            />
            <TextInput style={styles.input} placeholder="Company" value={company}
              onChangeText={setCompany} />
            <TextInput style={styles.input} placeholder="Details" value={details}
              onChangeText={setDetails} />
            <TouchableOpacity style={styles.button} onPress={handleSubmitServiceEntry}>
              <Text style={styles.buttonText}>Invite Service</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Guest */}
      <Modal
        visible={guestModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setGuestModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => setGuestModalVisible(false)}
            >
              <MaterialCommunityIcons name="close" style={styles.closeIcon} />
            </TouchableOpacity>
            <Image
              source={require("../../../../assets/User/images/cake.png")}
              style={styles.modalImage}
            />
            <TextInput style={styles.input} placeholder="Name" value={name}
              onChangeText={setName} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TextInput style={styles.input} placeholder="Vehicle Number"
              value={vehicleNumber}
              onChangeText={setVehicleNumber} />
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isCheckboxChecked ? "checked" : "unchecked"}
                onPress={() => setIsCheckboxChecked(!isCheckboxChecked)}
              />
              <Text style={styles.checkboxLabel}>
                Add to frequent Visitor
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmitGuestEntry}>
              <Text style={styles.buttonText}>Invite Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showQrModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowQrModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => setShowQrModal(false)}
            >
              <MaterialCommunityIcons name="close" style={styles.closeIcon} />
            </TouchableOpacity>
            {qrImageUrl && (
              <>
                <Image
                  source={{ uri: `http://192.168.29.226:2000${qrImageUrl}` }}
                  style={styles.qrImage}
                />

                <Text style={{ marginBottom: 5 }}>Visitor ID: {visitorId}</Text>
                <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                  <View style={styles.shareButtonContent}>
                    <MaterialCommunityIcons name="share" color="#fff" size={20} />
                    <Text style={styles.shareButtonText}>Share</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
            {!qrImageUrl && <ActivityIndicator size="large" color="#0000ff" />}
          </View>
        </View>
      </Modal>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay1}>
          <View style={styles.modalContent1}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <View >
              {renderOption(
                "Fire",
                require("../../../../assets/User/images/fire.png"),
                "Fire"
              )}
              {renderOption(
                "Stuck in Lift",
                require("../../../../assets/User/images/elevator.png"),
                "Stuck in Lift"
              )}
              {renderOption(
                "Animal Threat",
                require("../../../../assets/User/images/snake.png"),
                "Animal Threat"
              )}
              {renderOption(
                "Visitors Threat",
                require("../../../../assets/User/images/traveler.png"),
                "Visitors Threat"
              )}
            </View>

            <TouchableOpacity
              style={styles.raiseAlarmButton}
              onPress={handleRaiseAlarm}
            >
              <Text style={styles.raiseAlarmButtonText}>Raise Alarm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isAlertModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleAlertModal}
      >
        <View style={styles.modalOverlay2}>
          <View style={styles.modalContent2}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleAlertModal}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Image
              source={require("../../../../assets/User/images/alert.png")}
              style={styles.alertIcon}
            />
            <Text style={styles.alertMessage}>
              Alarm Raised for {selectedOption}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: width * 0.04,
    backgroundColor: "#fff",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#192c4c",
    marginBottom: height * 0.02,
    marginTop: height * 0.03,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrapper: {
    alignItems: "center",

    width: width * 0.18,
    height: height * 0.09,
    borderRadius: 50,
    marginBottom: 10,
    marginRight: width * 0.07,
    borderWidth: 1,
    backgroundColor: "#F3E1D5",
    borderColor: "#C59358",
  },
  icon: {
    width: 40,
    height: 40,
    marginTop: 15,
  },
  iconLabel: {
    marginTop: 5,
    color: "#222222",
    textAlign: "center",
    marginTop: width * 0.03,
    marginTop: height * 0.03,
    fontSize: 10,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: width * 0.8,
    alignItems: "center",
  },
  closeIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeIcon: {
    fontSize: 24,
    color: "#555",
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#7D0431",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  entryCode: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#192c4c",
    marginBottom: 20,
  },
  qrImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  shareButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#7D0431",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  shareButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  shareButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  container3: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  additionalContent: {
    fontSize: 16,
    marginTop: 10,
  },
  modalOverlay1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent1: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: width * 0.12
    ,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "red",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  raiseAlarmButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    alignItems: "center",
    borderRadius: 5,
  },
  raiseAlarmButtonText: {
    color: "white",
    fontSize: 16,
  },
  modalOverlay2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent2: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  alertIcon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  alertMessage: {
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedIconWrapper: {
    backgroundColor: "#7D0431",
  },
});

export default QuickActions;