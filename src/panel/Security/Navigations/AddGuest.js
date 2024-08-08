import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  Platform
} from "react-native";
import { Avatar, TextInput, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { createVisitor } from "../../User/Redux/Slice/Security_Panel/VisitorsSlice";
import { fetchSocietyById } from "../../User/Redux/Slice/Security_Panel/SocietyByIdSlice";
import MyDialog from "../DialogBox/DialogBox";
import * as ImagePicker from "expo-image-picker";
import * as Camera from "expo-camera";

const AddGuest = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [block, setBlock] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [showBuildingDropdown, setShowBuildingDropdown] = useState(false);
  const [showFlatNoDropdown, setShowFlatNoDropdown] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const cameraRef = useRef(null);

  const error = useSelector((state) => state.visitor.error);
  const successMessage = useSelector((state) => state.visitor.successMessage);
  const [buildings, setBuildings] = useState([]);
  const [flatsForSelectedBlock, setFlatsForSelectedBlock] = useState([]);
  const dispatch = useDispatch();
  const { societyId } = route.params;
  const { society } = useSelector((state) => state.societyById);

  useEffect(() => {
    dispatch(fetchSocietyById(societyId));
  }, [dispatch, societyId]);

  useEffect(() => {
    if (society) {
      setBuildings(society.blocks);
    }
  }, [society]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  const selectBuilding = (building) => {
    setBlock(building.blockName);
    setShowBuildingDropdown(false);
    const fetchedFlats = fetchFlatsForBlock(building.blockName);
    setFlatsForSelectedBlock(fetchedFlats);
  };

  const fetchFlatsForBlock = (block) => {
    const flats =
      buildings.find((item) => item.blockName === block)?.flats || [];
    return flats;
  };

  const selectFlatNo = (flatNo) => {
    setFlatNo(flatNo.flatNumber);
    setShowFlatNoDropdown(false);
  };

  const validateInputs = () => {
    let isValid = true;
    if (!name) {
      isValid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phoneNumber || !phonePattern.test(phoneNumber)) {
      isValid = false;
    }

    if (!block) {
      isValid = false;
    }

    if (!flatNo) {
      isValid = false;
    }
    return isValid;
  };

  const handleConfirm = async () => {
    if (validateInputs()) {
      setLoading(true);
      const status = "Waiting";
      const role = "Guest";
      const date = new Date().toISOString();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phoneNumber", phoneNumber);
      formData.append("societyId", societyId);
      formData.append("status", status);
      formData.append("role", role);
      formData.append("block", block);
      formData.append("flatNo", flatNo);
      formData.append("date", date);

      if (imageFile) {
        formData.append("pictures", imageFile);
      }

      try {
        const response = await dispatch(createVisitor(formData));
        if (response.meta.requestStatus === "fulfilled") {
          setName("");
          setPhoneNumber("");
          setBlock("");
          setFlatNo("");
          setImageFile(null);
          setImagePreview(null);
          setShowDialog(true);
          setTimeout(() => {
            setShowDialog(false);
            navigation.navigate("InandOut1");
          }, 1000);
        } else {
          setShowDialog(true);
          setTimeout(() => {
            setShowDialog(false);
          }, 1000);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
      }
    }
  };

  const handleAvatarPress = () => {
    setActionSheetVisible(true);
  };

  const handleCameraPress = async () => {
    if (hasCameraPermission === null) {
      console.log("Camera permission status is unknown");
      return;
    }
    if (hasCameraPermission === false) {
      console.log("No access to camera");
      return;
    }
    setActionSheetVisible(false);
    setCameraModalVisible(true);
  };

  const handleBrowsePress = async () => {
    setActionSheetVisible(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const { uri, fileName, type } = result.assets[0];
      setImageFile({ uri, name: fileName, type });
      setImagePreview(uri);
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      if (uri) {
        const fileName = uri.split("/").pop();
        const response = await fetch(uri);
        const blob = await response.blob();
        setImageFile({ uri, name: fileName, type: blob.type });
        setImagePreview(uri);
        setCameraModalVisible(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={handleAvatarPress}
          >
            <Avatar.Image
              style={styles.avatar}
              resizeMode="cover"
              size={124}
              source={
                imagePreview
                  ? { uri: imagePreview }
                  : require("../../../assets/Security/images/man (1).png")
              }
            />
          </TouchableOpacity>

          <View style={styles.inputContent}>
            <TextInput
              style={[styles.inputBlock, { marginTop: 20 }]}
              label="Name"
              value={name}
              mode="outlined"
              outlineColor="#CCC"
              theme={{ colors: { primary: "#192c4c" } }}
              onChangeText={setName}
            />
            <TextInput
              style={[styles.inputBlock, { marginTop: 20 }]}
              label="Phone Number"
              value={phoneNumber}
              keyboardType="phone-pad"
              mode="outlined"
              outlineColor="#CCC"
              theme={{ colors: { primary: "#192c4c" } }}
              onChangeText={setPhoneNumber}
            />
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={[
                  styles.dropdown,
                  showBuildingDropdown && styles.dropdownActive,
                  { marginTop: 20 },
                ]}
                onPress={() => setShowBuildingDropdown(!showBuildingDropdown)}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    !block && styles.placeholderText,
                  ]}
                >
                  {block || "Select Building"}
                </Text>
                <Text>
                  <MaterialIcons
                    name={showBuildingDropdown ? "arrow-drop-up" : "arrow-drop-down"}
                    size={20}
                    color="#000"
                    style={{ marginRight: 5 }}
                  />
                </Text>
              </TouchableOpacity>
              {showBuildingDropdown && (
                <View style={styles.dropdownList}>
                  {buildings.map((building) => (
                    <TouchableOpacity
                      key={building._id}
                      onPress={() => selectBuilding(building)}
                    >
                      <Text style={styles.dropdownItem}>
                        {building.blockName}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={[
                  styles.dropdown,
                  showFlatNoDropdown && styles.dropdownActive,
                  { marginTop: 20 },
                ]}
                onPress={() => setShowFlatNoDropdown(!showFlatNoDropdown)}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    !flatNo && styles.placeholderText,
                  ]}
                >
                  {flatNo || "Select Flat No"}
                </Text>
                <Text>
                  <MaterialIcons
                    name={showFlatNoDropdown ? "arrow-drop-up" : "arrow-drop-down"}
                    size={20}
                    color="#000"
                    style={{ marginRight: 5 }}
                  />
                </Text>
              </TouchableOpacity>
              {showFlatNoDropdown && (
                <View style={styles.dropdownList}>
                  {flatsForSelectedBlock.map((flat) => (
                    <TouchableOpacity
                      key={flat._id}
                      onPress={() => selectFlatNo(flat)}
                    >
                      <Text style={styles.dropdownItem}>
                        {flat.flatNumber}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <Button
              mode="contained"
              style={styles.button}
              onPress={handleConfirm}
              loading={loading}
            >
              Add Guest
            </Button>
          </View>
        </ScrollView>
      </View>

      <MyDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        successMessage={successMessage}
        error={error}
      />

      <Modal visible={cameraModalVisible} transparent={true}>
        <View style={styles.cameraContainer}>
          <Camera.Camera
            style={styles.camera}
            ref={cameraRef}
          />
          <Button mode="contained" onPress={takePhoto}>
            Take Photo
          </Button>
          <Button mode="outlined" onPress={() => setCameraModalVisible(false)}>
            Cancel
          </Button>
        </View>
      </Modal>

      <Modal visible={actionSheetVisible} transparent={true}>
        <View style={styles.actionSheetContainer}>
          <Button mode="contained" onPress={handleCameraPress}>
            Open Camera
          </Button>
          <Button mode="outlined" onPress={handleBrowsePress}>
            Browse Files
          </Button>
          <Button mode="text" onPress={() => setActionSheetVisible(false)}>
            Cancel
          </Button>
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  inputContent: {
    width: "80%",
  },
  inputBlock: {
    backgroundColor: "#F5F5F5",
  },
  dropdownContainer: {
    width: "100%",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  dropdownActive: {
    borderColor: "#192c4c",
  },
  dropdownText: {
    fontSize: 16,
  },
  placeholderText: {
    color: "#aaa",
  },
  dropdownList: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCC",
    top: 50,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  camera: {
    width: '80%',
    height: '60%',
    borderRadius: 10,
  },
  actionSheetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
});

export default AddGuest;
