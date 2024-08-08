import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';
import telephoneImage from "../../../assets/Security/images/telephone.png";
import { fetchresidents } from '../../User/Redux/Slice/CommunitySlice/residentsSlice';

const Residents = () => {
  const dispatch = useDispatch();
  const { userProfiles, status, error } = useSelector((state) => state.userResidents);
  const [societyId, setSocietyId] = useState(null);

  useEffect(() => {
    const getSocietyId = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        const id = JSON.parse(user).societyId;
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

  const handlePhonePress = (phoneNumber) => {
    const dialNumber = `tel:${phoneNumber}`;
    Linking.openURL(dialNumber);
  };

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  if (status === "failed") {
    return <Text>Error: {error}</Text>;
  }

  const groupResidentsByBlock = () => {
    const groupedResidents = {};
    userProfiles.forEach((resident) => {
      const { buildingName } = resident;
      if (!groupedResidents[buildingName]) {
        groupedResidents[buildingName] = [];
      }
      groupedResidents[buildingName].push(resident);
    });
    return groupedResidents;
  };

  const groupedResidents = groupResidentsByBlock();
  const sortedBlockNames = Object.keys(groupedResidents).sort((a, b) => {
    return a.localeCompare(b);
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Icon
            name="search"
            size={20}
            color="grey"
            style={styles.searchIcon}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholderTextColor="grey"
            placeholder="Search..."
          />
        </View>
      </View>

      {/* Render blocks and their corresponding residents */}
      {sortedBlockNames.map((blockName) => (
        <View key={blockName} style={styles.blockContainer}>
          <Text style={styles.blockText}>{blockName}</Text>
          {groupedResidents[blockName].map((resident) => (
            <View key={resident._id} style={styles.avatarContainer}>
              <Image
                source={{
                  uri: `http://localhost:2000${resident.profilePicture}`,
                }}
                style={styles.avatarImage}
              />
              <View style={styles.avatarInfo}>
                <Text style={styles.nameText}>{resident.name}</Text>
                <Text style={styles.blockNumberText}>
                  {resident.buildingName}{" "}
                  <Icon name="circle" size={5} color="grey" />{" "}
                  {resident.flatNumber}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handlePhonePress(resident.mobileNumber)}
              >
                <Image source={telephoneImage} style={styles.phoneIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  searchContainer: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    width: "100%",
  },
  blockContainer: {
    width: "100%",
    marginBottom: 20,
  },
  blockText: {
    alignSelf: "flex-start",
    color: "grey",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "left", // Align block names to the left
  },
  avatarContainer: {
    marginTop: 5,
    backgroundColor: "#F3FBFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 5,
    marginRight: 10,
  },
  avatarInfo: {
    flex: 1,
    marginLeft: 10,
  },
  nameText: {
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
    fontSize: 18,
  },
  blockNumberText: {
    color: "grey",
    fontWeight: "500",
  },
  phoneIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default Residents;