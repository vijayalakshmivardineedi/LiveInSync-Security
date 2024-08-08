import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Image,
  BackHandler
} from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createVisitor } from "../../User/Redux/Slice/Security_Panel/VisitorsSlice";

const AddDelivery = ({route}) => {
  const { societyId } = route.params;
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [company, setCompany] = useState("");
  const [companyError, setCompanyError] = useState('');
  const [block, setSelectedBuilding] = useState("");
  const [buildingError, setBuildingError] = useState("");
  const [flatNo, setSelectedFlatNo] = useState("");
  const [flatNoError, setFlatNoError] = useState("");
  const [showBuildingDropdown, setShowBuildingDropdown] = useState(false);
  const [showFlatNoDropdown, setShowFlatNoDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // const [buildings, setBuildings] = useState();
  const [flatsForSelectedBlock, setFlatsForSelectedBlock] = useState([]);
  const [bellImage, setBellImage] = useState(require('../../../assets/Security/gif/notification.gif'));
  const [ringingText, setRingingText] = useState('Ringing....');
  const [subText, setSubText] = useState('They are getting informed');
  const [isConfirmationClicked, setIsConfirmationClicked] = useState(false);
  const buildings = ["Block A", "Block B", "Block C", "Block D", "Block E"];
  const flatNos = ["101", "105", "501", "201", "302"];
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.visitor);


  useEffect(() => {
    const backAction = () => {
      if (isConfirmationClicked) {
        setIsConfirmationClicked(false);
        setShowModal(false);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [isConfirmationClicked]);
  const validateInputs = () => {
    let isValid = true;
    if (!name) {
      setNameError("Please enter your Name.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!phoneNumber) {
      setPhoneNumberError("Please enter your phone number.");
      isValid = false;
    } else {
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(phoneNumber)) {
        setPhoneNumberError("Please enter a valid phone number.");
        isValid = false;
      } else {
        setPhoneNumberError("");
      }
    }
    if (!block) {
      setBuildingError("Select a building.");
      isValid = false;
    } else {
      setBuildingError("");
    }

    if (!flatNo) {
      setFlatNoError("Select a flat number.");
      isValid = false;
    } else {
      setFlatNoError("");
    }
    return isValid;

  }  
  useEffect(() => {
    const backAction = () => {
      if (isConfirmationClicked) {
        setIsConfirmationClicked(false);
        setShowModal(false);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [isConfirmationClicked]);

  const handleConfirm = () => {
    if (validateInputs()) {
      const status = "Check In";
      const role = "Delivery";
      const checkInDateTime = "1";
      const visitorData = { name, phoneNumber, company, societyId, status, role, block, flatNo, checkInDateTime};
      dispatch(createVisitor(visitorData));
      setShowModal(true);
      setIsConfirmationClicked(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChangeImage = () => {
    setBellImage(require('../../../assets/Security/images/check-mark.png'));
    setRingingText('Allowed!!!');
    setSubText('Let Delivery Enter in the Society');
    setIsConfirmationClicked(false);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView vertical={true}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            style={styles.avatar}
            resizeMode="cover"
            size={124}
            source={require("../../../assets/Security/images/delivery-man (1).png")}
          />
        </View>

        <View style={styles.inputContent}>
          <TextInput
            style={styles.inputBlock}
            label="Name"
            value={name}
            mode="outlined"
            outlineColor="#CCC"
            theme={{ colors: { primary: "#192c4c" } }}
            error={!!nameError}
            onChangeText={(text) => setName(text)}
          />
          {nameError ? (
            <Text style={styles.errorText}>{nameError}</Text>
          ) : null}
          <TextInput
            style={[styles.inputBlock, { marginTop: 10 }]}
            label="PhoneNumber"
            value={phoneNumber}
            keyboardType="phone-pad"
            mode="outlined"
            outlineColor="#CCC"
            theme={{ colors: { primary: "#192c4c" } }}
            error={!!phoneNumberError}
            onChangeText={(text) => { setPhoneNumber(text); setPhoneNumberError(""); }}
          />
          {phoneNumberError ? (
            <Text style={styles.errorText}>{phoneNumberError}</Text>
          ) : null}
          <TextInput
            style={[styles.inputBlock, { marginTop: 10 }]}
            label='Company'
            value={company}
            mode='outlined'
            outlineColor="#CCC"
            theme={{ colors: { primary: "#192c4c" } }}
            onChangeText={(text) => setCompany(text)}
          />

          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={[styles.dropdown, showBuildingDropdown && styles.dropdownActive, { marginTop: 15 }]}
              onPress={() => setShowBuildingDropdown(!showBuildingDropdown)}
            >
              <Text style={[styles.dropdownText, !block && styles.placeholderText]}>{block || "Select Building"} </Text>
              <Text>
                <MaterialIcons name={showBuildingDropdown ? 'arrow-drop-up' : 'arrow-drop-down'} size={20} color="#000" style={{ marginRight: 5 }} />
              </Text>
            </TouchableOpacity>
            {showBuildingDropdown && (
              <View style={styles.dropdownList}>
                {buildings.map((building, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => selectBuilding(building)}
                  >
                    <Text style={styles.dropdownItem}>{building}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {buildingError ? (<Text style={styles.errorText}>{buildingError}</Text>) : null}

          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={[styles.dropdown, showFlatNoDropdown && styles.dropdownActive, { marginTop: 15 }]}
              onPress={() => setShowFlatNoDropdown(!showFlatNoDropdown)}
            >
              <Text style={[styles.dropdownText, !flatNo && styles.placeholderText,]}>{flatNo || "Select Flat No"}  </Text>
              <Text>
                <MaterialIcons name={showFlatNoDropdown ? 'arrow-drop-up' : 'arrow-drop-down'} size={20} color="#000" style={{ marginRight: 5 }} />
              </Text>
            </TouchableOpacity>
            {showFlatNoDropdown && (
              <View style={styles.dropdownList}>
                {flatNos.map((flatNo, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => selectFlatNo(flatNo)}
                  >
                    <Text style={styles.dropdownItem}>{flatNo}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {flatNoError ? <Text style={styles.errorText}>{flatNoError}</Text> : null}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleConfirm} disabled={isConfirmationClicked}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={handleChangeImage}>
              <Image source={bellImage} style={styles.loadingGif} />
            </TouchableOpacity>
            <Text style={styles.ringingText}>{ringingText}</Text>
            <Text style={styles.subText}>{subText}</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  avatar: {
    backgroundColor: "lightgray",
  },
  inputContent: {
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  inputBlock: {
    borderColor: "#CCC",
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    color: "#CCC",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownActive: {
    borderColor: '#192c4c',
    borderWidth: 2,
  },
  dropdownText: {
    color: '#192c4c',
  },
  placeholderText: {
    color: '#192c4c',
  },
  dropdownList: {
    width: "100%",
    marginTop: 10,
    marginHorizontal: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#CCC',
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  buttonContainer: {
    backgroundColor: "#192c4c",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: '600',
    textAlign: "center",
    fontSize: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 'auto',
    height: '30%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  loadingGif: {
    width: 100,
    height: 115,
  },
  ringingText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#888',
    marginBottom: 50,
  },
});  
export default AddDelivery;