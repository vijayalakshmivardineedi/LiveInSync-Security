// DialpadPin.js

import React from "react";
import { StyleSheet, View, Text } from "react-native";

const DialpadPin = ({ pinLength, pinSize, code, dialPadContent }) => {
  return (
    <View style={styles.dialPadPinContainer}>
      {Array(pinLength)
        .fill()
        .map((_, index) => {
          const digit = code[index] !== undefined ? code[index].toString() : "";
          return (
            <View
              key={index}
              style={{
                width: pinSize,
                height: pinSize,
                overflow: "hidden",
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#7d0431",
                borderBottomWidth: 1.2,
              }}
            >
              <Text style={styles.pinDigit}>{digit}</Text>
            </View>
          );
        })}
    </View>
  );
};

export default DialpadPin;

const styles = StyleSheet.create({
  dialPadPinContainer: {
    flexDirection: "row",
    backgroundColor:"#F8E9DC",
    alignItems: "flex-end",
    borderRadius:12,
    paddingHorizontal:10,
    paddingVertical:12
  },
  pinDigit: {
    fontSize: 28,
    color: "#7d0431",
    marginBottom:4
  },
});
