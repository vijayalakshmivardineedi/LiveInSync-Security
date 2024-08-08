import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const Documents = ({ navigation }) => {
  const [expanded, setExpanded] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [documents, setDocuments] = useState([
    {
      name: "Voter Id",
      image: require("../../../../../assets/User/images/user.png"),
      defaultText: "No files added",
    },
    {
      name: "College Id",
       image: require("../../../../../assets/User/images/user.png"),
      defaultText: "No files added",
    },
    {
      name: "Pan Card",
      image:require("../../../../../assets/User/images/user.png"),
      defaultText: "No files added",
    },
    {
      name: "Passport",
      image:require("../../../../../assets/User/images/user.png"),
      defaultText: "No files added",
    },
    {
      name: "Aadhaar Card",
      image:require("../../../../../assets/User/images/user.png"),
      defaultText: "No files added",
    },
    {
      name: "Driving License",
      image:require("../../../../../assets/User/images/user.png"),
      defaultText: "No files added",
    },
    {
      name: "Rental Agreement",
      image:require("../../../../../assets/User/images/user.png"),
      defaultText: "No files added",
    },
  ]);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleAddPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setName("");
    setSelectedOption("");
    setDropdownVisible(false);
    setImageUri(null);
  };

  const handleSave = () => {
    const updatedDocuments = documents.map((doc) => {
      if (doc.name === selectedOption) {
        return { ...doc, image: { uri: imageUri }, defaultText: "" };
      }
      return doc;
    });
    setDocuments(updatedDocuments);
    handleCloseModal();
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  const handleCamera = () => {
    const options = {
      mediaType: "photo",
      saveToPhotos: true,
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleGallery = () => {
    const options = {
      mediaType: "photo",
    };
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardcontainer}>
        {/* <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Icon name="arrow-back" type="material" color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Document</Text>
          <Button
            mode="contained"
            onPress={handleAddPress}
            style={styles.addButton}
          >
            Add
          </Button>
        </View> */}
      </View>
      {documents.map((doc, index) => (
        <View key={index} style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => toggleExpand(index)}
            style={styles.itemHeader}
          >
            <Image source={doc.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>{doc.name}</Text>
              <Text style={styles.defaultText}>{doc.defaultText}</Text>
            </View>
            <Icon
              name={expanded === index ? "chevron-up" : "chevron-down"}
              type="font-awesome"
              color="#A0A0A0"
            />
          </TouchableOpacity>
          {expanded === index && (
            <View style={styles.expandedContent}>
              {/* <Text>Additional details about {doc.name}</Text> */}
            </View>
          )}
        </View>
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Document</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={setName}
              value={name}
            />
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                onPress={handleDropdownToggle}
                style={styles.dropdownHeader}
              >
                <Text>{selectedOption || "Select"}</Text>
                <Icon
                  name={dropdownVisible ? "chevron-up" : "chevron-down"}
                  type="font-awesome"
                  color="#A0A0A0"
                />
              </TouchableOpacity>
              {dropdownVisible && (
                <View style={styles.dropdownList}>
                  {documents.map((doc, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => handleOptionSelect(doc.name)}
                    >
                      <Text>{doc.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleCamera}
                style={styles.cameraButton}
              >
                <Image
                  source={require("../../../../../assets/User/images/camera.png")}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleGallery}
                style={styles.galleryButton}
              >
                <Image
                  source={require("../../../../../assets/User/images/image.png")}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
            </View>
            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            )}
            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.saveButton}
            >
              Save
            </Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  addButton: {
    marginLeft: "auto",
    backgroundColor: "#6333BB",
    fontWeight: "bold",
    fontSize: 18,
  },
  cardcontainer: {
    backgroundColor: "white",
    marginBottom: 20,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#A0A0A0",
    marginHorizontal: 20,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemText: {
    fontSize: 20,
  },
  defaultText: {
    fontSize: 14,
    color: "lightgrey",
  },
  expandedContent: {
    padding: 40,
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 10,
  },
  dropdownContainer: {
    width: "100%",
    marginBottom: 10,
  },
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  dropdownList: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "80%",
  },
  cameraButton: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  galleryButton: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  buttonIcon: {
    width: 40,
    height: 40,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  saveButton: {
    width: "100%",
    backgroundColor: "#6333BB",
  },
});

export default Documents;
