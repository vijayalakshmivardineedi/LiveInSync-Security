import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
const slides = [
  {
    key: "two",
    title: "Bills and Payments",
    text: "View and pay your maintenance, utilities bill form LivInSync",
    image: require("../../../../assets/User/gif/Payment Information.gif"),
  },
  {
    key: "one",
    title: "Improve your family security",
    text: "Ensure that only verified and approved visitors are allowed entry into your community",
    image: require("../../../../assets/User/gif/403 Error Forbidden.gif"),
  },
  {
    key: 'three',
    title: "Stay connected with your neighbour",
    text: "Stay informed about society announcements and take part in polls or discussions",
    image: require("../../../../assets/User/gif/Group Chat.gif"),
  },
];
const Onboard = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Image
          source={item.image}
          style={{
            resizeMode: "cover",
            height: "50%",
            width: "80%",
          }}
        />
        <Text
          style={{
            paddingBottom: 10,
            fontSize: 24,
            fontWeight: "700",
            color: "#ebcebd",
            textAlign: "center",
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "#f3e1d5",
            fontSize: 16,
            paddingHorizontal: 30,
          }}
        >
          {item.text}
        </Text>
      </View>
    );
  };
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{ fontSize: 18, color: "#ebcebd" }}>Next</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{ fontSize: 18, color: "#ebcebd" }}>Done</Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#7D0431", }}>
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        activeDotStyle={{
          backgroundColor: "#f3e1d5",
          width: 10,
        }}
        onSlideChange={(index) => setCurrentIndex(index)}
        initialScrollIndex={currentIndex}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7D0431",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#ebcebd",
    paddingVertical: 15,
    borderRadius: 12,
    paddingHorizontal: 30,
    margin:20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#7D0431",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonCircle: {
    marginTop: '30%'
  }
});

export default Onboard;