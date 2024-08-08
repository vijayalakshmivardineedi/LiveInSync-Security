import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Linking } from "react-native";
import { fetchresidents } from "../../../Redux/Slice/CommunitySlice/residentsSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Residents = () => {
  const dispatch = useDispatch();
  const { userProfiles } = useSelector((state) => state.userResidents);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [societyId, setSocietyId] = useState(null);
  useEffect(() => {
    const getSocietyId = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        const id = JSON.parse(user).societyId
        if (id !== null) {
          setSocietyId(id);
        } else {
          console.error('No societyId found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching societyId from AsyncStorage:', error);
      }
    };
    getSocietyId();
  }, []);

  useEffect(() => {
    console.log(societyId)
    if (societyId) {
      dispatch(fetchresidents(societyId));
    }
  }, [dispatch, societyId]);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const selectBlock = (block) => {
    setSelectedBlock(block);
    setShowOptions(false);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredContacts = userProfiles.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCall = (mobileNumber) => {
    const url = `tel:${mobileNumber}`;
    Linking.openURL(url).catch((err) =>
      Alert.alert("Error", "Failed to open dialer")
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Image source={{ uri: item.profilePicture }} style={styles.avatar} />
      <View style={styles.contactInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.mobileNumber}>{item.mobileNumber}</Text>
        <View style={styles.blockFlat}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}> {item.buildingName}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Flat No - {item.flatNumber}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.callButton}
        onPress={() => handleCall(item.mobileNumber)}
      >
        <Icon name="call-outline" size={24} color="#7D0431" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => selectBlock("A")}
          >
            <Text style={styles.optionText}>Block A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => selectBlock("B")}
          >
            <Text style={styles.optionText}>Block B</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => selectBlock("C")}
          >
            <Text style={styles.optionText}>Block C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => selectBlock("D")}
          >
            <Text style={styles.optionText}>Block D</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.selectBlock} onPress={toggleOptions}>
          <Text style={styles.selectBlockText}>
            {selectedBlock ? `Block ${selectedBlock}` : "Select Block"}
          </Text>
          <Icon
            name={showOptions ? "caret-up" : "caret-down"}
            size={16}
            color="#777"
          />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Icon
            name="search"
            size={20}
            color="#777"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Residents Contacts"
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
      </View>
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};
export default Residents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  selectBlock: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  selectBlockText: {
    color: "black",
    fontSize: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    flex: 3,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    minHeight: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
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
  blockFlat: {
    flexDirection: "row",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#E3E3E3",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#393939",
    fontSize: 12,
    fontWeight: "600",
  },
  callButton: {
    padding: 10,
    bottom: 10,
  },
  optionsContainer: {
    position: "absolute",
    top: 45,
    left: 10,
    width: 100,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    zIndex: 1,
  },
  option: {
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});