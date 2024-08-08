import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfiles } from "../../Redux/Slice/ProfileSlice/ProfileSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [societyId, setSocietyId] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const { profiles } = useSelector((state) => state.profiles);
  useEffect(() => {
    const getUserName = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString !== null) {
          const user = JSON.parse(userString);
          setUserName(user.name);
          setSocietyId(user.societyId);
          setUserId(user.userId);
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
      const profile = profiles[0];
      setBuildingName(profile.buildingName);
      setFlatNumber(profile.flatNumber);
    }
  }, [profiles]);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading1}>Hi,</Text>
          <Text style={styles.heading2}>{userName}</Text>
        </View>
        <View style={styles.iconAvatar}>
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <Ionicons name="notifications" size={30} color="#DDDEE0" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar.Image
              style={styles.Avatar}
              resizeMode="cover"
              size={45}
              source={require("../../../../assets/User/images/man.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView vertical={true}>

        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.community}>
            <View style={styles.comText}>
              <Text style={styles.heading}>Community</Text>
              <Text style={styles.subHeading} onPress={() => navigation.navigate("Community")}>View all</Text>
            </View>
            <View style={styles.comImages}>
              <TouchableOpacity onPress={() => navigation.navigate("Call to Security")}>
                <View style={styles.comborder}>
                  <Image
                    style={styles.comImage}
                    source={require("../../../../assets/User/images/mechanic.png")}
                  /></View></TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Emergency")}>
                <View style={styles.comborder}>
                  <Image
                    style={styles.comImage}
                    source={require("../../../../assets/User/images/emergency-call.png")}
                  /></View></TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Residents ")}>
                <View style={styles.comborder} >
                  <Image
                    style={[styles.comImage, { width: 30, height: 30 }]}
                    source={require("../../../../assets/User/images/lender.png")}
                  /></View></TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Discussion")}>
                <View style={styles.comborder}>
                  <Image
                    style={styles.comImage}
                    source={require("../../../../assets/User/images/discussion (1).png")}
                  />
                </View></TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
                <View style={styles.comborder}>
                  <Image
                    style={styles.comImage}
                    source={require("../../../../assets/User/images/bills.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.heading}>Last Activity</Text>

            <View style={styles.lastCard}>
              <View style={styles.lastCard1}>
                <Avatar.Image
                  size={40}
                  source={require("../../../../assets/User/images/alarm-3.png")}
                  style={{ backgroundColor: "#f6f6f6", marginRight: 15 }}
                />
                <View style={{ width: "84%" }}>
                  <View style={styles.lastCard2}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>
                      Meeting-Society Members
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: "gray" }}>12:39 PM</Text>
                  </View>
                  <View style={styles.lastCard2}>
                    <Text style={{ color: 'gray', fontSize: 14 }}>Naga Raju</Text>
                    <Text style={styles.lastCardText2}>Upcoming</Text>
                  </View>
                </View>
              </View>
              <Text style={{ marginTop: 10, fontSize: 14, fontWeight: "500" }}>09 May 2024, 12:45 Society Conference Hall</Text>
            </View>
          </View>
          <View style={styles.rentalflats}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={styles.heading}>Rental Flats</Text>
              <Text onPress={() => navigation.navigate("Rental Flats")}>View All</Text></View>
            <Image
              style={styles.rentCard}
              source={require("../../../../assets/User/images/advertise.png")}
            />
          </View>
          <View style={styles.rentalflats}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={styles.heading}>Notice Board</Text>
              <Text onPress={() => navigation.navigate("Notice Board")}>View All</Text></View>
            <View style={{ width: "100%", height: 125, borderWidth: 1, borderColor: "#91A8BA", backgroundColor: "#f6f6f6", borderRadius: 10, padding: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../../assets/User/images/corkboard (1).png")} style={{ width: 45, height: 45, marginRight: 10 }} />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 600, color: "#192c4c" }}>Scheduled Maintenance Notice</Text>
                  <Text style={{ fontSize: 13, color: "gray" }}>12:34 PM</Text>
                </View>
              </View>
              <Text style={{ fontSize: 12, fontWeight: 500, letterSpacing: 0.7, color: "#91A0AA" }}>
                Routine water maintenance on June 15th, 9:00 AM - 12:00 PM. Water services will be unavailable. We apologize for the inconvenience. Thank you for understanding.</Text>
            </View>
          </View>
          <View style={styles.preApproveVisitors}>
            <View style={styles.comText}>
              <Text style={styles.heading}>Pre Approve Visitors</Text>
            </View>
            <ScrollView horizontal={true}>
              <View style={styles.cards}>
                <TouchableOpacity onPress={() => navigation.navigate("Pre Approval Visitors", { societyId, buildingName, flatNumber })}>
                  <View style={styles.eachCard} >
                    <Text style={styles.cardText}>Guest</Text>
                    <Image style={styles.cardImage} source={require('../../../../assets/User/images/tourist.png')} />
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          <View style={styles.bookAmenities}>
            <View style={styles.comText}>
              <Text style={styles.heading}>Book Amenities</Text>
              <Text style={styles.subHeading} onPress={() => navigation.navigate("Amenities")}>More</Text>
            </View>

            <Image
              style={[styles.rentCard, { height: 180 }]}
              source={require("../../../../assets/User/images/amenities (2).png")}
            />
          </View>
          <View style={styles.localServices}>
            <Text style={styles.heading}>LocalServices</Text>
            <View style={styles.serviceCards}>
              <TouchableOpacity onPress={() => navigation.navigate("Plumber")}>
                <View style={styles.eachServiceCard} >
                  <View style={styles.card}>
                    <Image style={styles.serviceCardImage} source={require('../../../../assets/User/images/plumber (2).png')} />
                    <Text style={styles.serviceCardText}>Plumbing Service</Text>
                  </View>
                  <AntDesign name="right" size={16} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Carpenter")}>
                <View style={styles.eachServiceCard}>
                  <View style={styles.card}>
                    <Image style={styles.serviceCardImage} source={require('../../../../assets/User/images/carpenter (1).png')} />
                    <Text style={styles.serviceCardText}>Carpenter Service</Text>
                  </View>
                  <AntDesign name="right" size={16} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Pest Control")}>
                <View style={styles.eachServiceCard}>
                  <View style={styles.card}>
                    <Image style={styles.serviceCardImage} source={require('../../../../assets/User/images/pest.png')} />
                    <Text style={styles.serviceCardText}>Pest Control Service</Text>
                  </View>
                  <AntDesign name="right" size={16} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView >
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#7D0431",
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
  },
  heading: {
    paddingTop: 8,
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  heading1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#DDDEE0"
  },
  heading2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#C59358",
  },
  iconAvatar: {
    flexDirection: "row",
    alignItems: "center",
  },
  Avatar: {
    marginLeft: 20,
  },
  rentCard: {
    height: 150,
    width: "100%",
    backgroundColor: "#6333bb",
    borderRadius: 10,
  },
  comText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subHeading: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 15,
    paddingRight: 3,
  },
  comImages: {
    flexDirection: "row",
    justifyContent: 'center',

  },
  comImage: {
    height: 30,
    width: 30,
  },
  lastCard: {
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#91A8BA",
    height: 100,
    padding: 10
  },
  lastCard1: {
    flexDirection: "row",
  },
  lastCard2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastCardText2: {
    backgroundColor: '#009830',
    borderRadius: 15,
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 5,
    textAlign: 'center'
  },
  cards: {
    flexDirection: 'row',
  },
  eachCard: {
    backgroundColor: '#f6f6f6',
    height: 130,
    width: 120,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#91A8BA",
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#192c4c",
    marginBottom: 10
  },
  cardImage: {
    resizeMode: 'cover',
    height: 80,
    width: 80,
  },
  eachServiceCard: {
    backgroundColor: '#f6f6f6',
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#91A8BA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    margin: 5
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceCardImage: {
    height: 40,
    width: 40,
  },
  serviceCardText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 12
  },
  viewMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  comborder: {
    borderWidth: 1,
    borderRadius: 50,
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#F3E1D5",
    borderColor: "#C59358"
  }
});
export default HomeScreen;