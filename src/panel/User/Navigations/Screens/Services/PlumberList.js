import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Zocial from "@expo/vector-icons/Zocial";
import { fetchServices } from "../../../Redux/Slice/ServiceSlice/ServiceSlice";

const PlumberList = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);


  // useEffect(() => {
  //   console.log("State data :", data); 
  // }, [data]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemHeader}>{item.header}</Text>
      <View style={styles.rowContainer}>
        <View style={styles.leftColumn}>
          <View style={styles.iconAndText}>
            <FontAwesome5
              name="user-alt"
              size={15}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <View style={styles.iconAndText}>
            <Zocial name="call" size={20} color="black" style={styles.icon} />
            <Text style={styles.phone}>{item.phoneNumber}</Text>
          </View>
        </View>

      </View>
      <TouchableOpacity
        onPress={() => handleCall(item.phoneLeft)}
        style={styles.callButton}
      >
        <Text style={styles.callNowText}>Call Now</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

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
        data={data.plumber}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 10
  },
  itemContainer: {
    backgroundColor: "#f6f6f6",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: "#91A8BA",
    marginBottom: 10,
    padding: 15,
  },
  itemHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    color: "black",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  rightColumn: {
    flex: 1,
  },
  iconAndText: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
    color: "#c59358",
  },
  name: {
    fontSize: 17,
    fontWeight: "500",
    marginLeft: 8,
  },
  phone: {
    fontSize: 14,
    color: "#666",
  },
  separator: {
    height: 5,
  },
  callButton: {
    backgroundColor: "#192c4c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 100,
    width: 100,
  },
  callNowText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default PlumberList;
