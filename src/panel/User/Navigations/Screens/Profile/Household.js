import { React, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Image, Modal, TextInput, Alert, } from "react-native";
import { ActivityIndicator, Avatar, Menu } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { addFamilyMemberAsync, deleteFamilyMemberAsync, getFamilyMembersAsync, } from "../../../Redux/Slice/ProfileSlice/Household/AddMemberSlice";
import { addVehicleAsync, deleteVehicleAsync } from "../../../Redux/Slice/ProfileSlice/Household/VehicleSlice";
import { addPetAsync, deletePetAsync } from "../../../Redux/Slice/ProfileSlice/Household/PetSlice"

import { deleteFrequentVisitor, fetchFrequentVisitors } from "../../../Redux/Slice/ProfileSlice/Household/frequentVisitorsSlice";

const Household = ({ route }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [checkmarkModal, setCheckmarkModal] = useState(false);
  const [checkmarkModal1, setCheckmarkModal1] = useState(false);
  const [checkmarkModal2, setCheckmarkModal2] = useState(false);
  const [checkmarkModal3, setCheckmarkModal3] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [relation, setRelation] = useState("");
  const [relationError, setRelationError] = useState("");
  const [relationMenuVisible, setRelationMenuVisible] = useState(false);
  const [genderMenuVisible, setGenderMenuVisible] = useState(false);
  const [vehicleTypeMenuVisible, setVehicleTypeMenuVisible] = useState(false);
  const [petTypeMenuVisible, setPetTypeMenuVisible] = useState(false);
  const [vehicleType, setVehicleType] = useState("");

  //Add vehicle data

  const [driverName, setDriverName] = useState("");
  const [driverNameError, setDriverNameError] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleNumberError, setVehicleNumberError] = useState("");
  const [modelName, setModelName] = useState("");
  const [modelNameError, setModelNameError] = useState("");
  const [brand, setBrand] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  const { visitors, fetchStatus, deleteStatus, error } = useSelector(state => state.frequentVisitors);
  const { userId, societyId, id, buildingName, flatNumber } = route.params;

  //pet data
  const [petName, setPetName] = useState("")
  const [petType, setPetType] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [breed, setBreed] = useState("")
  const { data } = useSelector((state => state.houseHolds))
  const relations = [
    "Mother",
    "Father",
    "Brother",
    "Sibling",
    "Daughter",
    "Son",
    "Friend",
    "Other",
  ];
  const PetTypeList = ['Dog', 'Cat', 'Bird', 'Hamster', 'Rabbit', 'Other']
  const Gender = [
    "Male",
    "Female",
    "Others",
  ];
  const VehicleTypes = [
    "Bike",
    "Car",
    "Others",
  ];




  // async function checkNetworkConnectivity() {
  //   const netInfoState = await NetInfo.fetch();
  //   return netInfoState.isConnected;
  // }
  useEffect(() => {
    dispatch(getFamilyMembersAsync({ societyId, userId }))
  }, [societyId, userId])
  const closeRelationMenu = () => setRelationMenuVisible(false);
  const dispatch = useDispatch()
  const handleRelationSelect = (relation) => {
    setRelation(relation);
    closeRelationMenu();
  };
  const handleGenderSelect = (marital) => {
    setGender(marital);
    setGenderMenuVisible(false);
  };
  const handleVehicleTypeSelect = (typo) => {
    setVehicleType(typo)
    setVehicleTypeMenuVisible(false);
  };
  const handlePetTypeSelect = (typo) => {
    setPetType(typo)
    setPetTypeMenuVisible(false);
  };

  //Frequent Visitors

  useEffect(() => {
    dispatch(fetchFrequentVisitors({ societyId, block: buildingName, flatNo: flatNumber }));
  }, [dispatch]);


  const validateInputs = () => {
    let isValid = true;
    if (!name) {
      setNameError("Please enter your Name.");
      isValid = false;
    } else {
      setNameError("");
    }
    if (!mobileNumber) {
      setMobileNumberError("Please enter your mobile number.");
      isValid = false;
    } else {
      setMobileNumberError("");
    }
    if (!age) {
      setAgeError("Please enter your Age.");
      isValid = false;
    } else {
      setAgeError("");
    }
    if (!relation) {
      setRelationError("Select a Relation.");
      isValid = false;
    } else {
      setRelationError("");
    }
    return isValid;
  };
  const validateInputs1 = () => {
    let isValid = true;


    if (!vehicleNumber) {
      setVehicleNumberError("Please enter Vehicle Number.");
      isValid = false;
    } else {
      setVehicleNumberError("");
    }
    if (!modelName) {
      setModelNameError("Please enter Model Name.");
      isValid = false;
    } else {
      setModelNameError("");
    }
    if (!brand) {
      setBrandError("Please enter Brand.");
      isValid = false;
    } else {
      setBrandError("");
    }
    if (!vehicleType) {
      setTypeError1("Please enter Type.");
      isValid = false;
    } else {
      setTypeError("");
    }
    if (!phoneNumber) {
      setPhoneNumberError("Please enter Phone Number.");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }
    return isValid;
  };
  const handleConfirm = () => {
    setShowModal(true);
  };
  const handleConfirm1 = () => {
    setShowModal1(true);
  };
  const handleConfirm2 = () => {
    setShowModal2(true);
  };
  const closeCross = () => {
    setShowModal(false);
  };
  const closeCross1 = () => {
    setShowModal1(false);
  };
  const closeCross2 = () => {
    setShowModal2(false);
  };
  const closeCross3 = () => {
    setShowModal3(false);
  };
  const handleCloseModal = async () => {
    if (validateInputs()) {
      const memberData = {
        name,
        mobileNumber,
        gender,
        relation,
        age,
      };
      const result = await dispatch(addFamilyMemberAsync({ memberData, societyId, userId }));
      if (result.type === 'houseHolds/addFamilyMember/fulfilled') {
        dispatch(getFamilyMembersAsync({ societyId, userId }));
        setShowModal(false);
        setCheckmarkModal(true);
        setName("")
        setMobileNumber('')
        setAge('')
        setRelation("")
        setGender("")
        setTimeout(() => {
          setCheckmarkModal(false);
        }, 1800);
      } else {
        // Handle error case
        console.error('Failed to add family member:', result.error.message);
      }
    }
  };
  const confirmDeleteFamily = async (id) => {
    const result = await dispatch(deleteFamilyMemberAsync({ societyId, userId, id }));
    console.log(result);
    if (result.type === 'houseHolds/deleteFamilyMembers/fulfilled') {
      dispatch(getFamilyMembersAsync({ societyId, userId }));
    } else {
      Alert.alert('Error', 'Failed to delete family member.');
    }
  };
  const confirmDeleteVehicle = async (id) => {
    const result = await dispatch(deleteVehicleAsync({ societyId, userId, id }));
    console.log(result);
    if (result.type === 'houseHolds/deleteVehicle/fulfilled') {
      dispatch(getFamilyMembersAsync({ societyId, userId }));
    } else {
      Alert.alert('Error', 'Failed to delete vehicle.');
    }
  };
  const handleAddVehicleDetailsCloseModal1 = async () => {

    const vehicleData = {
      driverName,
      vehicleNumber,
      modelName,
      brand,
      vehicleType,
      phoneNumber,
    };
    try {
      const result = await dispatch(addVehicleAsync({ vehicleData, societyId, userId }))
      if (result.type === 'houseHolds/addVehicle/fulfilled') {
        dispatch(getFamilyMembersAsync({ societyId, userId }));
        setBrand("")
        setModelName('')
        setVehicleNumber('')
        setVehicleType("")
        setDriverName("")
        setPhoneNumber('')
        setShowModal1(false);
        setCheckmarkModal1(true);
        setTimeout(() => {
          setCheckmarkModal1(false);
        }, 1800);
      } else {
        // Handle error if needed
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }

  };
  const handlePetCloseModal2 = async () => {
    const petData = {
      petName,
      petType,
      age,
      gender,
      breed
    }
    const result = await dispatch(addPetAsync({ petData, societyId, userId }))
    console.log(result)
    if (result.type === 'houseHolds/addPet/fulfilled') {
      dispatch(getFamilyMembersAsync({ societyId, userId }));
      setPetName("")
      setPetType("")
      setAge("")
      setGender("")
      setBreed("")
      setShowModal2(false);
      setCheckmarkModal2(true);
      setTimeout(() => {
        setCheckmarkModal2(false);
      }, 1800);
    }
  };
  const confirmPetDelete2 = async (id) => {
    const result = await dispatch(deletePetAsync({ societyId, userId, id }));
    if (result.type === 'houseHolds/deletePet/fulfilled') {
      dispatch(getFamilyMembersAsync({ societyId, userId }));
    } else {
      Alert.alert('Error', 'Failed to delete pet.');
    }
  };
  const handleCloseModal3 = () => {
    if (validateInputs1()) {
      setShowModal3(false);
      setCheckmarkModal3(true);
      setTimeout(() => {
        setCheckmarkModal3(false);
      }, 1800);
    }
  };

  const getAvatarByAgeAndGender = (age, gender) => {
    if (age < 13) {
      return gender === "Male"
        ? require("../../../../../assets/User/Avatar/boy (1).png")
        : require("../../../../../assets/User/Avatar/child.png");
    } else if (age < 20) {
      return gender === "Male"
        ? require("../../../../../assets/User/Avatar/user.png")
        : require("../../../../../assets/User/Avatar/girl (1).png");
    } else if (age < 60) {
      return gender === "Male"
        ? require("../../../../../assets/User/Avatar/man (2).png")
        : require("../../../../../assets/User/Avatar/indian.png");
    } else {
      return gender === "Male"
        ? require("../../../../../assets/User/Avatar/grandpa.png")
        : require("../../../../../assets/User/Avatar/pensioner.png");
    }
  };
  const getAvatarByPetType = (type) => {
    switch (type) {
      case 'Dog':
        return require("../../../../../assets/User/Avatar/dog.png");
      case 'Cat':
        return require("../../../../../assets/User/Avatar/cat.png");
      case 'Bird':
        return require("../../../../../assets/User/Avatar/parrot.png");
      case 'Hamster':
        return require("../../../../../assets/User/Avatar/hamster.png");
      case 'Rabbit':
        return require("../../../../../assets/User/Avatar/bunny.png");
      case 'Other':
      default:
        return require("../../../../../assets/User/Avatar/house.png");
    }
  };
  const confirmDelete = async (visitorId) => {
    try {
      // Dispatch the deleteFrequentVisitor action
      const resultData = await dispatch(deleteFrequentVisitor({
        societyId,
        block: buildingName,
        flatNo: flatNumber,
        visitorId
      }));

      console.log(resultData);

      if (resultData.type === "frequentVisitors/deleteFrequentVisitor/fulfilled") {
        console.log(resultData.type); // Assuming resultData has a success property

      
        // Ensure that fetchFrequentVisitors is awaited properly
       dispatch(fetchFrequentVisitors({
          societyId,
          block: buildingName,
          flatNo: flatNumber
        }));
        

      } else {
        // Handle the case where deletion was not successful, but no error was thrown
        Alert.alert('Error', 'Failed to delete visitor');
      }
    } catch (error) {
      // On failure, show an alert with the error message
      Alert.alert('Error', `Failed to delete visitor: ${error.message}`);
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView vertical={true}>
        <View style={styles.header}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {" "}
            Family Members
          </Text>
          <TouchableOpacity onPress={handleConfirm}>
            <Text style={styles.button}>ADD</Text>
          </TouchableOpacity>
        </View>
        <View>
          {data.map((card) => (
            card.familyMembers.map((member) => (
              <View key={member._id} style={styles.eachcard}>
                <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar.Image
                      size={55}
                      source={getAvatarByAgeAndGender(member.age, member.gender)}
                    />
                    <View style={{ marginLeft: 20 }}>
                      <Text style={{ fontSize: 18, fontWeight: "500", paddingBottom: 3 }}>
                        {member.name}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18, fontWeight: "500", color: "#949494", }}>
                          {member.age}{" "}
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: "500", color: "#949494", paddingLeft: 5 }}>
                          {member.Relation}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 18, fontWeight: "500", color: "#949494" }}>
                        {member.mobileNumber}{" "}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => confirmDeleteFamily(member._id)}>
                    <Icon name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ))}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          onRequestClose={handleCloseModal}
        >
          {/**Add family member */}
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={{ fontSize: 20, fontWeight: "900" }}>
                  Add Member
                </Text>
                <TouchableOpacity style={{ position: "absolute", right: 0 }}>
                  <Entypo
                    name="circle-with-cross"
                    size={24}
                    color="black"
                    onPress={closeCross}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContent}>
                <View>
                  <Text style={styles.inputText}>Name</Text>
                  <TextInput
                    style={styles.inputBlock}
                    value={name}
                    placeholder="Name"
                    error={!!nameError}
                    onChangeText={(text) => setName(text)}
                  />
                  {nameError ? (
                    <Text style={styles.errorText}>{nameError}</Text>
                  ) : null}
                </View>
                {/**add mobile number */}
                <View>
                  <Text style={styles.inputText}>Mobile Number</Text>
                  <TextInput
                    style={styles.inputBlock}
                    value={mobileNumber}
                    placeholder="Mobile Number"
                    error={!!mobileNumberError}
                    onChangeText={(text) => setMobileNumber(text)}
                  />
                  {mobileNumberError ? (
                    <Text style={styles.errorText}>{mobileNumberError}</Text>
                  ) : null}
                </View>

                {/**Add Gender fileds */}

                <View style={styles.dropdownContainer}>
                  <Text style={styles.inputText}>Gender</Text>
                  <TouchableOpacity
                    style={styles.inputBlock2}
                    onPress={() =>
                      setGenderMenuVisible(!genderMenuVisible)
                    }
                  >
                    <Text>{gender || "Select Gender"}</Text>
                    <Text>
                      <MaterialIcons
                        name={
                          genderMenuVisible
                            ? "arrow-drop-up"
                            : "arrow-drop-down"
                        }
                        size={20}
                        color="#000"
                        style={{ marginRight: 5 }}
                      />
                    </Text>
                  </TouchableOpacity>
                  {genderMenuVisible && (
                    <View style={styles.dropdownList}>
                      {Gender.map((marital, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleGenderSelect(marital)}
                        >
                          <Text style={styles.dropdownItem}>{marital}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  {relationError ? (
                    <Text style={styles.errorText}>{relationError}</Text>
                  ) : null}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.inputText}>Age</Text>
                    <TextInput
                      style={styles.inputBlock1}
                      value={age}
                      placeholder="Age"
                      keyboardType="numeric"
                      error={!!ageError}
                      onChangeText={(text) => setAge(text)}
                    />
                    {ageError ? (
                      <Text style={styles.errorText}>{ageError}</Text>
                    ) : null}
                  </View>

                  <View style={styles.dropdownContainer}>
                    <Text style={styles.inputText}>Relation</Text>
                    <TouchableOpacity
                      style={styles.inputBlock2}
                      onPress={() =>
                        setRelationMenuVisible(!relationMenuVisible)
                      }
                    >
                      <Text>{relation || "Select Relation"}</Text>
                      <Text>
                        <MaterialIcons
                          name={
                            relationMenuVisible
                              ? "arrow-drop-up"
                              : "arrow-drop-down"
                          }
                          size={20}
                          color="#000"
                          style={{ marginRight: 5 }}
                        />
                      </Text>
                    </TouchableOpacity>
                    {relationMenuVisible && (
                      <View style={styles.dropdownList}>
                        {relations.map((relation, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => handleRelationSelect(relation)}
                          >
                            <Text style={styles.dropdownItem}>{relation}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    {relationError ? (
                      <Text style={styles.errorText}>{relationError}</Text>
                    ) : null}
                  </View>

                </View>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          visible={checkmarkModal}
          transparent={true}
          style={styles.modalBlock}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer1}>
              <Image
                style={styles.modalImage}
                source={require("../../../../../assets/User/images/tick.png")}
              />
              <Text style={styles.modalText1}>Member Added Successfully!</Text>
              <Text style={styles.modalText2}>
                Siri as been added as your Member.
              </Text>
            </View>
          </View>
        </Modal>

        {/**Add vehicle details */}
        <View style={styles.header}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Vehicles</Text>
          <TouchableOpacity onPress={handleConfirm1}>
            <Text style={styles.button}>ADD</Text>
          </TouchableOpacity>
        </View>
        {data.map((vehicle) => (
          vehicle.Vehicle.map((auto) => (
            <View style={styles.Vehiclecard} key={vehicle._id}>
              <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end", marginRight: "2%" }}>
                <TouchableOpacity onPress={() => confirmDeleteVehicle(auto._id)}>
                  <Icon name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
              <View>
                <View
                  style={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Text style={styles.vehicletext}>{auto.modelName}</Text>
                  <View style={styles.dropdownContainer}>
                    <Text style={styles.vehicletext}>{auto.type}</Text>
                  </View>
                </View>
              </View>

              <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Text style={styles.vehicletext}>{auto.brand}</Text>
                <Text style={styles.vehicletext}>{auto.vehicleNumber}</Text>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Text style={styles.vehicletext}>{auto.driverName}</Text>
                <Text style={styles.vehicletext}>{auto.mobileNumber}</Text>
              </View>
            </View>
          ))))}

        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal1}
          onRequestClose={handleAddVehicleDetailsCloseModal1}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={{ fontSize: 20, fontWeight: "900" }}>
                  Add Vehicle
                </Text>
                <TouchableOpacity style={{ position: "absolute", right: 0 }}>
                  <Entypo
                    name="circle-with-cross"
                    size={24}
                    color="black"
                    onPress={closeCross1}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContent}>
                <View style={styles.inputRow}>
                  <View style={styles.inputRow}>
                    <View style={styles.inputBlockContainer}>
                      <Text style={styles.inputText}>Brand</Text>
                      <TextInput
                        style={styles.inputBlock}
                        value={brand}
                        placeholder="Brand"
                        onChangeText={(text) => setBrand(text)}
                      />
                    </View>
                    <View style={styles.inputBlockContainer}>
                      <Text style={styles.inputText}>Model Name</Text>
                      <TextInput
                        style={styles.inputBlock}
                        value={modelName}
                        placeholder="Model Name"
                        error={!!modelNameError}
                        onChangeText={(text) => setModelName(text)}
                      />
                      {modelNameError ? (
                        <Text style={styles.errorText}>{modelNameError}</Text>
                      ) : null}
                    </View>
                    <View style={styles.inputBlockContainer}>
                      <Text style={styles.inputText}>Vehicle Number</Text>
                      <TextInput
                        style={styles.inputBlock}
                        value={vehicleNumber}
                        placeholder="Vehicle Number"
                        error={!!vehicleNumberError}
                        onChangeText={(text) => setVehicleNumber(text)}
                      />
                      {vehicleNumberError ? (
                        <Text style={styles.errorText}>{vehicleNumberError}</Text>
                      ) : null}
                    </View>
                  </View>
                  {/***type dropdwon */}
                  <View style={styles.dropdownContainer}>
                    <Text style={styles.inputText}>Type</Text>
                    <TouchableOpacity
                      style={styles.inputBlock2}
                      onPress={() =>
                        setVehicleTypeMenuVisible(!vehicleTypeMenuVisible)
                      }>
                      <Text>{vehicleType || "Select Type"}</Text>
                      <Text>
                        <MaterialIcons
                          name={
                            vehicleTypeMenuVisible
                              ? "arrow-drop-up"
                              : "arrow-drop-down"
                          }
                          size={20}
                          color="#000"
                          style={{ marginRight: 5 }}
                        />
                      </Text>
                    </TouchableOpacity>
                    {vehicleTypeMenuVisible && (
                      <View style={styles.dropdownList}>
                        {VehicleTypes.map((typo, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => handleVehicleTypeSelect(typo)}>
                            <Text style={styles.dropdownItem}>{typo}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    {relationError ? (
                      <Text style={styles.errorText}>{relationError}</Text>
                    ) : null}
                  </View>
                </View>

                <View style={styles.inputRow}>
                  <View style={styles.inputBlockContainer}>
                    <Text style={styles.inputText}>Driver Name</Text>
                    <TextInput
                      style={styles.inputBlock}
                      value={driverName}
                      placeholder="Driver Name"
                      error={!!driverNameError}
                      onChangeText={(text) => setDriverName(text)}
                    />
                    {driverNameError ? (
                      <Text style={styles.errorText}>{driverNameError}</Text>
                    ) : null}
                  </View>
                  <View style={styles.inputBlockContainer}>
                    <Text style={styles.inputText}>Phone Number</Text>
                    <TextInput
                      style={styles.inputBlock}
                      value={phoneNumber}
                      placeholder="Phone Number"
                      onChangeText={(text) => setPhoneNumber(text)}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={handleAddVehicleDetailsCloseModal1}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          visible={checkmarkModal1}
          transparent={true}
          style={styles.modalBlock}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer1}>
              <Image
                style={styles.modalImage}
                source={require("../../../../../assets/User/images/tick.png")}
              />
              <Text style={styles.modalText1}>Vehicle Added Successfully!</Text>
              <Text style={styles.modalText2}>Vehicle has been Added.</Text>
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Pets</Text>
          <TouchableOpacity onPress={handleConfirm2}>
            <Text style={styles.button}>ADD</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cards}>
          <View>
            {data.map((vehicle) => (
              vehicle.pets.map((auto) => (
                <View key={auto._id} style={styles.eachcard}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                      <Avatar.Image
                        size={55}
                        resizeMode="cover"
                        source={getAvatarByPetType(auto.petType)}
                      />
                      <View style={{ marginLeft: 20 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "500",
                            paddingBottom: 3,
                          }}
                        >
                          {auto.petName}
                        </Text>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "500",
                            color: "#949494",
                          }}
                        >
                          {auto.petType}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                      <TouchableOpacity onPress={() => confirmPetDelete2(auto._id)}>
                        <Icon
                          name="delete"
                          size={24}
                          color="red"
                          style={{ marginLeft: "67%" }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))))}
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal2}
          onRequestClose={handlePetCloseModal2}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={{ fontSize: 20, fontWeight: "900" }}>
                  Add Pets
                </Text>
                <TouchableOpacity style={{ position: "absolute", right: 0 }}>
                  <Entypo
                    name="circle-with-cross"
                    size={24}
                    color="black"
                    onPress={closeCross2}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContent}>
                <View>
                  <Text style={styles.inputText}>Pet Name</Text>
                  <TextInput
                    style={styles.inputBlock}
                    value={petName}
                    placeholder="Pet Name"
                    error={!!petName}
                    onChangeText={(text) => setPetName(text)}
                  />
                </View>

                {/***Pet Type dropdwon */}
                <View style={styles.dropdownContainer}>
                  <Text style={styles.inputText}>Pet Type</Text>
                  <TouchableOpacity
                    style={styles.inputBlock2}
                    onPress={() =>
                      setPetTypeMenuVisible(!petTypeMenuVisible)
                    }
                  >
                    <Text>{petType || "Select Type"}</Text>
                    <Text>
                      <MaterialIcons
                        name={
                          petTypeMenuVisible
                            ? "arrow-drop-up"
                            : "arrow-drop-down"
                        }
                        size={20}
                        color="#000"
                        style={{ marginRight: 5 }}
                      />
                    </Text>
                  </TouchableOpacity>
                  {petTypeMenuVisible && (
                    <View style={styles.dropdownList}>
                      {
                        PetTypeList.map((typo, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => handlePetTypeSelect(typo)}
                          >
                            <Text style={styles.dropdownItem}>{typo}</Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  )}
                </View>
                <View>
                  <Text style={styles.inputText}>Breed</Text>
                  <TextInput
                    style={styles.inputBlock}
                    value={breed}
                    placeholder="Breed"
                    error={!!ageError}
                    onChangeText={(text) => setBreed(text)}
                  />
                </View>
                <View>
                  <Text style={styles.inputText}>Age</Text>
                  <TextInput
                    style={styles.inputBlock}
                    value={age}
                    placeholder="Age"
                    error={!!ageError}
                    onChangeText={(text) => setAge(text)}
                  />
                </View>
                <View>
                  <Text style={styles.inputText}>Gender</Text>
                  <TextInput
                    style={styles.inputBlock}
                    value={gender}
                    placeholder="Gender"
                    onChangeText={(text) => setGender(text)}
                  />

                </View>

              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handlePetCloseModal2}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          visible={checkmarkModal2}
          transparent={true}
          style={styles.modalBlock}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer1}>
              <Image
                style={styles.modalImage}
                source={require("../../../../../assets/User/images/tick.png")}
              />
              <Text style={styles.modalText1}> Added Successfully!</Text>
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Frequent Visitors
          </Text>
        </View>
        <View style={styles.cards}>
          {fetchStatus === 'loading' && <Text>Loading...</Text>}
          {fetchStatus === 'failed' && <Text>{error}</Text>}
          {visitors.map((person) => (
            <View key={person._id} style={styles.eachcard}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Avatar.Image
                  size={55}
                  resizeMode="cover"
                  source={person.image}
                />
                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      paddingBottom: 3,
                    }}
                  >
                    {person.name} {person.visitorId}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      color: "#949494",
                    }}
                  >
                    {person.role} {person.phoneNumber}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => confirmDelete(person.visitorId)}>
                  <Icon
                    name="delete"
                    size={24}
                    color="red"

                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <Modal
          animationType="fade"
          visible={checkmarkModal3}
          transparent={true}
          style={styles.modalBlock}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer1}>
              <Image
                style={styles.modalImage}
                source={require("../../../../../assets/User/images/tick.png")}
              />
              <Text style={styles.modalText1}> Added Successfully!</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Household;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#F3E1D5",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 15,
    margin: 5,
  },
  button: {
    backgroundColor: "#7D0431",
    padding: 5,
    width: 50,
    borderRadius: 5,
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center",
  },
  eachcard: {
    height: 80,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
  },
  image: {
    height: 20,
    width: 20,
  },
  audiText: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  chips: {
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  eachChip: {
    backgroundColor: "#e7e7e7",
    width: "auto",
    borderRadius: 8,
    paddingHorizontal: 35,
    paddingVertical: 6,
    marginVertical: 3,
    alignItems: "center",
  },
  eachChip1: {
    backgroundColor: "#e7e7e7",
    width: "auto",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  chipText1: {
    fontSize: 15,
    fontWeight: "600",
  },
  chipText2: {
    fontSize: 15,
    fontWeight: "600",
    color: "#7D0431",
  },
  modalBackground: {
    backgroundColor: "rgba(0,0,0,0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: "auto",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  modalContainer1: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: "auto",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    fontSize: 16,
    fontWeight: "600",
  },
  inputBlock: {
    backgroundColor: "#f6f6f6",
    borderRadius: 5,
    height: 40,
    borderColor: "#e7e7e7",
    borderWidth: 2,
    paddingLeft: 15,
    marginVertical: 5,
  },
  inputBlock1: {
    backgroundColor: "#f6f6f6",
    borderRadius: 5,
    height: 40,
    borderColor: "#e7e7e7",
    borderWidth: 2,
    paddingLeft: 15,
    width: 160,
    marginVertical: 5,
  },
  inputBlock2: {
    backgroundColor: "#f6f6f6",
    borderRadius: 5,
    height: 40,
    width: 160,
    borderColor: "#e7e7e7",
    borderWidth: 2,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  dropdownList: {
    borderWidth: 2,
    borderColor: "#e7e7e7",
    borderRadius: 5,
    padding: 8,
    zIndex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
  buttonContainer: {
    backgroundColor: "#7D0431",
    borderRadius: 8,
    height: 45,
    justifyContent: "center",
    marginTop: 60,
    bottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  modalImage: {
    height: 80,
    width: 80,
    marginVertical: 30,
  },
  modalText1: {
    fontSize: 18,
    fontWeight: "800",
  },
  modalText2: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 50,
    marginTop: 5,
  },
  Vehiclecard: {
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  vehicletext: {
    margin: 5,
    fontSize: 16,
  },
});