import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { userLogin } from "../../Redux/Slice/AuthSlice/Login/LoginSlice"; // Import your Redux action

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    let isValid = true;
    if (!email) {
      setEmailError("Please enter your email.");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Please enter your password.");
      isValid = false;
    } else {
      setPasswordError("");
    }
    if (isValid) {
      try {
        const resultAction = await dispatch(userLogin({ email, password }));
        console.log('Login result:', resultAction);
    
        if (userLogin.fulfilled.match(resultAction)) {
          await AsyncStorage.setItem('userToken', resultAction.payload.token);
          
          // Assuming the role is available in resultAction.payload.role
          const userRole = resultAction.payload.profile.role;
          console.log('User role:', userRole);
          // Navigate to different screens based on the user's role
          if (userRole === 'User') {
            navigation.navigate("Tab"); 
          } else if (userRole === 'Sequrity') {
            navigation.navigate("Header");
          } else {
            console.log('Unhandled user role:', userRole);
          }
        } else {
          console.log('Login failed:', resultAction.payload);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    }
    
  };

  const handleSignuppress = () => {
    navigation.navigate("Create User");
  };

  const handleForgotpress = () => {
    navigation.navigate("Forgot Password");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.halfContainer1}>
        <Image
          source={require("../../../../assets/User/gif/Login.gif")}
          style={styles.video}
          resizeMode="cover"
        />
        <Text style={{ fontWeight: "600", fontSize: 48, color: "#F3E1D5" }}>
          Login
        </Text>
        <Text style={{ fontSize: 16, paddingHorizontal: 5, paddingVertical: 5, color: "#F3E1D5" }}>
          Experience Seamless Access
        </Text>
      </View>
      <View style={styles.halfContainer2}>

        <TextInput
          style={styles.input}
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError("");
          }}
          keyboardType="email-address"
          mode="outlined"
          outlineColor="#CCC"
          theme={{ colors: { primary: "#27272A" } }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.input}
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={!showPassword} 
            mode="outlined"
            outlineColor="#CCC"
            theme={{ colors: { primary: "#27272A" } }}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
            <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#888" />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <Text
          onPress={handleForgotpress}
          style={{
            textAlign: "right", 
            color: "#7D0431",
            marginTop: 5,
            fontSize: 15,
            fontWeight: "400",
            width: "90%",
          }}
        >
          Forgot Password
        </Text>
        <TouchableOpacity style={styles.Button} onPress={handleLogin}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
            Sign In
          </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, fontSize: 16, textAlign: "center" }}>
          Don't have an account!
          <Text style={styles.signUpText} onPress={handleSignuppress}>
            <Text
              style={{
                color: "#7D0431",
                marginTop: 10,
                fontSize: 15,
                fontWeight: "400",
              }}
            > Sign Up
            </Text>
          </Text>
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
  halfContainer1: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7D0431",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,

  },
  halfContainer2: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: "#fbf5f1"
  },
  signUpText: {
    color: "#F8E9DC",
  },
  video: {
    width: "80%",
    height: "70%",
    marginTop: 10,
  },
  input: {
    width: "90%",
    marginBottom: 5,
  },
  passwordInput: {
    width: "90%",
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
  Button: {
    width: "90%",
    backgroundColor: "#7D0431",
    padding: 10,
    alignItems: "center",
    borderRadius: 12,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    alignSelf: 'left',
    fontSize: 12,
  },
});

export default Login;
