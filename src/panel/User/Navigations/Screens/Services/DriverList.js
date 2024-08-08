import React,{useEffect} from "react";
import { View, StyleSheet, FlatList, Text ,
  ActivityIndicator, TouchableOpacity} from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../../Redux/Slice/ServiceSlice/ServiceSlice";


const DriverList = () => {
    navigation = useNavigation();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.services);
  
    useEffect(() => {
      dispatch(fetchServices());
    }, [dispatch]);
  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("Driver Profile", { ...item })}
    >
      <Avatar.Image
       source={{ uri: `http://192.168.29.226:2000${item.pictures}` }}
        size={50}
        containerStyle={styles.avatarContainer}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phoneNumber}</Text>
      </View>
      <MaterialIcons
        name="arrow-forward-ios"
        size={18}
        color="#91A88A"
        style={styles.icon}
      />
    </TouchableOpacity>
  );
  const ItemSeparator = () => <View style={styles.separator} />;
 
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  return (
    <View style={styles.container}>
      <FlatList
       data={data.driver}
       keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcf6f0",
    paddingHorizontal: 15,
    paddingTop:10
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    borderWidth:1,
    borderColor:"#e6b08b",

  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  phone: {
    fontSize: 14,
    color: "#666",
    marginLeft: 15,
  },
  avatarContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius:0,
    height:50,
  },
  icon: {
    marginLeft: "auto",
  },
  separator: {
    height: 10,
  },
});
export default DriverList;
