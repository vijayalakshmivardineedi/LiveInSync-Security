// Discussion.js
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import socketServices from "../../../Socket/SocketServices"
import people from "../../../../../assets/User/Avatar/boy (1).png"
const Discussion = () => {
  const navigation = useNavigation();
  const [groups, setGroups] = useState([])
  useEffect(() => {
    // Initialize the socket connection
    socketServices.initializeSocket();
    const societyId = "6683b57b073739a31e8350d0"
    const id = "668cddfbcf07da6369f58c66"
    socketServices.emit('getGroups', { societyId, id });
    // Handle receiving the list of groups
    socketServices.on('groupList', (data) => {
      setGroups(data);
    });
    return () => {
      socketServices.removeListener('groupList');
    };
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DiscussionChat", { item })}
    >
      <View style={styles.itemContainer}>
        <Avatar
          source={people}
          rounded
          size={50}
          containerStyle={styles.avatarContainer}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.groupName}</Text>
          <Text style={styles.person}>{(item.members ? item.members.length : 0)}</Text>
        </View>
        <MaterialIcons
          name="arrow-forward-ios"
          size={24}
          color="black"
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
  const ItemSeparator = () => <View style={styles.separator} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
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
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray",

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
  person: {
    fontSize: 14,
    color: "#666",
    marginLeft: 15,
  },
  avatarContainer: {
    borderWidth: 1,
    borderColor: "white",
  },
  icon: {
    marginLeft: "auto",
  },

  separator: {
    height: 10,
  },
});

export default Discussion;