import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { sendForgotPasswordEmail } from "../../Redux/Slice/AuthSlice/Forgot/SendForgotEmail";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const email = useSelector((state) => state.forgotPassword.email);
  const loading = useSelector((state) => state.forgotPassword.loading);
  const success = useSelector((state) => state.forgotPassword.success);
  const error = useSelector((state) => state.forgotPassword.error);
  const [email, setemail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleContinue = () => {
    let isValid = true;
    if (!email) {
      setEmailError("Please enter your email.");
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setEmailError("Please enter a valid email address.");
        isValid = false;
      } else {
        setEmailError("");
      }
    }
    
    if (isValid) {
      dispatch(sendForgotPasswordEmail(email))
          .then(returnResult => {
              console.log('result', returnResult);
              if (returnResult.payload.success === true) {
                console.log('Email sent successfully,navigate to verification screen');
                  navigation.navigate("Verification ", { email });
              } else {
                  Alert.alert( returnResult.payload.message);
              }
          })
          .catch(error => {
              console.error('Error sending forgot password email:', error);
          });
  }
  
  };
  

  const handleLoginPage = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require("../../../../assets/User/gif/Forgot password.gif")}
          style={styles.image}
        />
        <Text style={styles.headerText}>Forgot Password</Text>
      </View>
      <View style={styles.bottomContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => {
            setemail(text);
            setEmailError("");
          }}
          keyboardType="email-address"
          style={styles.input}
          mode="outlined"
          outlineColor="#CCC"
          theme={{ colors: { primary: "#27272A" } }}
          error={!!emailError}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>
            {loading ? 'Sending...' : 'Continue'}
          </Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Text style={styles.backToSignIn} onPress={handleLoginPage}>
          Back to
          <Text style={styles.highlightText}> Login</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  topContainer: {
    flex: 3.6,
    backgroundColor: "#7D0431",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#fbf5f1",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  image: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
  headerText: {
    fontWeight: "500",
    fontSize: 42,
    color: "#F3E1D5",
  },
  highlightText: {
    color: "#7D0431",
  },
  input: {
    width: "100%",
  },
  errorText: {
    color: "red",
  },
  button: {
    width: "100%",
    backgroundColor: "#7D0431",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: "#F8E9DC",
    fontSize: 24,
    fontWeight: "700",
  },
  backToSignIn: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ForgotPassword;
