import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
  BackHandler,
} from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { createVisitor } from "../../User/Redux/Slice/Security_Panel/VisitorsSlice";



const AddCab = ({ route }) => {
  const { societyId } = route.params;
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [showBuildingDropdown, setShowBuildingDropdown] = useState(false);
  const [showFlatNoDropdown, setShowFlatNoDropdown] = useState(false);
  
  const [buildings, setBuildings] = useState();
  const [flatsForSelectedBlock, setFlatsForSelectedBlock] = useState([]);
  const [company, setCompany] = useState("");
  const [block, setBlock] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [inVehicleNumber, setCabNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [bellImage, setBellImage] = useState(require('../../../assets/Security/gif/notification.gif'));
  const [ringingText, setRingingText] = useState('Ringing....');
  const [subText, setSubText] = useState('They are getting informed');
  const [isConfirmationClicked, setIsConfirmationClicked] = useState(false);
  const dispatch = useDispatch();

  const { society } = useSelector((state) => state.societyById)
  useEffect(() => {
    console.log(societyId)
    dispatch(fetchSocietyById(societyId));
  }, [dispatch, societyId])

  useEffect(() => {
    if (society) {
      setBuildings(society.blocks);
    }
  }, [society]);

  const selectBuilding = (building) => {
    setBlock(building.blockName);
    setShowBuildingDropdown(false);

    const fetchedFlats = fetchFlatsForBlock(building.blockName);

    setFlatsForSelectedBlock(fetchedFlats);
  };
  const fetchFlatsForBlock = (block) => {
    const flats = buildings.find(item => item.blockName === block)?.flats || [];

    return flats;
  };

  const selectFlatNo = (flatNo) => {
    setFlatNo(flatNo.flatNumber);
    setShowFlatNoDropdown(false);
  };
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

    return isValid;
  }

  const handleConfirm = () => {
    if (validateInputs()) {

      const status = "Check In";
      const role = "Cab";
      const checkInDateTime = "1";
      const visitorData = { name, phoneNumber, company, inVehicleNumber, societyId, status, role, block, flatNo, checkInDateTime };
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
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        extraScrollHeight={20}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              style={styles.avatar}
              resizeMode="cover"
              size={124}
              source={require("../../../assets/Security/images/taxi.png")}
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
            <TextInput
              style={[styles.inputBlock, { marginTop: 10 }]}
              label='Cab Number'
              value={inVehicleNumber}
              mode='outlined'
              outlineColor="#CCC"
              theme={{ colors: { primary: "#192c4c" } }}
              onChangeText={(text) => setCabNumber(text)}
            />
            <TextInput
              style={[styles.inputBlock, { marginTop: 10 }]}
              label='Block Number'
              value={block}
              mode='outlined'
              outlineColor="#CCC"
              theme={{ colors: { primary: "#192c4c" } }}
              onChangeText={(text) => setBlock(text)}
            />

            <TextInput
              style={[styles.inputBlock, { marginTop: 10 }]}
              label='Flat Number'
              value={flatNo}
              mode='outlined'
              outlineColor="#CCC"
              theme={{ colors: { primary: "#192c4c" } }}
              onChangeText={(text) => setFlatNumber(text)}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleConfirm} disabled={isConfirmationClicked || loading}>
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
  buttonContainer: {
    backgroundColor: "#192c4c",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    marginHorizontal: 30,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
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

export default AddCab;
