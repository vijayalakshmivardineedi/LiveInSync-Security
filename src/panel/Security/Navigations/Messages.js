import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          <Text style={styles.recentMessages}>Recent Messages</Text>

          <View>
            <View style={styles.messageRow}>
              <Image
                source={require("../../../assets/Security/images/thanusha.jpg")}
                style={styles.avatar}
              />
              <View style={styles.messageContent}>
                <Text style={styles.title}>Thanusha</Text>
                <Text style={styles.subtitle}>
                  B 303 <Icon name="circle" size={5} color="grey" /> 5 min ago
                </Text>
              </View>
              <Icon name="call" size={30} color="green" />
            </View>
            <Text style={styles.additionalText}>
              Keep Kids away from the cars in parking at Block-B
            </Text>
            <View style={styles.divider} />
          </View>

          <View>
            <View style={styles.messageRow}>
              <Image
                source={require("../../../assets/Security/images/1706695970983.jpg")}
                style={styles.avatar}
              />
              <View style={styles.messageContent}>
                <Text style={styles.title}>Sunil</Text>
                <Text style={styles.subtitle}>
                  A 303 <Icon name="circle" size={5} color="grey" /> 10min ago
                </Text>
              </View>
              <Icon name="call" size={30} color="green" />
            </View>
            <Text style={styles.additionalText}>
              Keep Kids away from the cars in parking at Block-B
            </Text>
            <View style={styles.divider} />
          </View>


          <View>
            <View style={styles.messageRow}>
              <Image
                source={require("../../../assets/Security/images/puji.jpg")}
                style={styles.avatar}
              />
              <View style={styles.messageContent}>
                <Text style={styles.title}>Pujitha</Text>
                <Text style={styles.subtitle}>
                 C 208 <Icon name="circle" size={5} color="grey" /> 7 min ago
                </Text>
              </View>
              <Icon name="call" size={30} color="green" />
            </View>
            <Text style={styles.additionalText}>
              Keep Kids away from the cars in parking at Block-B
            </Text>
            <View style={styles.divider} />
          </View>



          <View>
            <View style={styles.messageRow}>
              <Image
                source={require("../../../assets/Security/images/kishore.png")}
                style={styles.avatar}
              />
              <View style={styles.messageContent}>
                <Text style={styles.title}>kishore</Text>
                <Text style={styles.subtitle}>
                  B 307 <Icon name="circle" size={5} color="grey" /> 5 min ago
                </Text>
              </View>
              <Icon name="call" size={30} color="green" />
            </View>
            <Text style={styles.additionalText}>
              Keep Kids away from the cars in parking at Block-B
            </Text>
            <View style={styles.divider} />
          </View>
          <View>
            <View style={styles.messageRow}>
              <Image
                source={require("../../../assets/Security/images/karthik.png")}
                style={styles.avatar}
              />
              <View style={styles.messageContent}>
                <Text style={styles.title}>karthik</Text>
                <Text style={styles.subtitle}>
                  B 302 <Icon name="circle" size={5} color="grey" /> 30 min ago
                </Text>
              </View>
              <Icon name="call" size={30} color="green" />
            </View>
            <Text style={styles.additionalText}>
              Keep Kids away from the cars in parking at Block-B
            </Text>
            <View style={styles.divider} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container2: {
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "#00695c",
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    color: "white",
  },
  recentMessages: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  messageContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  additionalText: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 16,
  },
  searchInput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderRadius: 10,
    borderColor: "#0F3D3E",
  },
  noResultsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});

export default Messages;