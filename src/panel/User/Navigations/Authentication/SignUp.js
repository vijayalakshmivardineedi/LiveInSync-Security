import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, emailVerificationAsync } from "../../Redux/Slice/AuthSlice/SignupSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { user, loading, signupError, verificationError } = useSelector(
    (state) => state.signup
  );

  const handleSignup = async () => {
    if (!email) {
      setEmailError("Please enter your email.");
    } else {
      const emailPattern = /\S+@\S+\.\S+/;
      if (!emailPattern.test(email)) {
        setEmailError("Please enter a valid email address.");
      } else {
        // try {
        //   // Dispatch signupUser async thunk
        //   const action = await dispatch(signupUser({ email }));
        //   if (signupUser.fulfilled.match(action)) {
        //     setEmailError("");
        //     console.log("Email:", email);
        //     // Dispatch emailVerificationAsync async thunk
        //     const verificationAction = await dispatch(emailVerificationAsync({ email }));
        //     if (emailVerificationAsync.fulfilled.match(verificationAction)) {
        //       navigation.navigate("Verification", { email });
        //     } else {
        //       console.error("Email verification error:", verificationAction.payload);
        //     }
        //   } else {
        //     console.error("Signup error:", action.payload);
        //   }
        // } catch (error) {
        //   console.error("Unexpected error:", error);
        // }
        navigation.navigate("User Details", { email });
      }
    }
  };

  const handleSigninpress = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/User/gif/Mobilelogin.gif")}
        style={styles.image}
      />
      <Text style={{ fontWeight: "500", fontSize: 48 }}>
        Sign <Text style={styles.signUpText}>Up</Text>
      </Text>
      <Text style={{ fontSize: 24, paddingHorizontal: 5 }}>
        Your Gateway to convenience!
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
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
      <Text style={{ color: "red" }}>{signupError || verificationError}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 30, fontSize: 16, textAlign: "center" }}>
        Already have an account?{" "}
        <Text style={styles.signUpText} onPress={handleSigninpress}>
          Sign In
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 280,
    marginVertical: 30,
    marginTop: 100,
  },
  signUpText: {
    color: "#630000",
  },
  input: {
    width: "100%",
    marginBottom: 10,
    marginTop: 15,
  },
  button: {
    width: "100%",
    backgroundColor: "black",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
});

export default SignUp;
