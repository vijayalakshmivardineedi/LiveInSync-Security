import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../../Redux/Slice/ServiceSlice/ServiceSlice";

const MaidList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const renderItem = ({ item }) => (

    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("Maid Profile",{ id: item._id})}
    >
      <Avatar.Image source={{ uri: `http://192.168.29.226:2000${item.pictures}` }} size={50} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phoneNumber}</Text>
      </View>
      <MaterialIcons name="arrow-forward-ios" size={18} color="#7d0431" />
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
        data={data.maid}
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
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    
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
  },
  phone: {
    fontSize: 14,
    color: "#666",
  },
  separator: {
    height: 10,
  },
});

export default MaidList;
