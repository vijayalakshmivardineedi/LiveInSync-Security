// import { useNavigation } from "@react-navigation/native";
// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const UserDetails = () => {
//     const [phoneNumber, setPhoneNumber] = useState('+91 9458612458');
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const navigation=useNavigation();
    
//     const handleContinue = () => {
//         navigation.navigate("Apartment Details");
//     };

//     return (
//         <View style={styles.container}>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
               
//                 <View style={styles.infoContainer}>
//                     <Text style={styles.info}>{phoneNumber}</Text>
//                 </View>
//                 <Text style={styles.text}>Please fill the details below:</Text>

//                 <TextInput
//                     style={styles.input}
//                     placeholder="Name"
//                     value={name}
//                     onChangeText={setName}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Email"
//                     value={email}
//                     onChangeText={setEmail}
//                     keyboardType="email-address"
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Password"
//                     value={password}
//                     onChangeText={setPassword}
//                     secureTextEntry
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Confirm Password"
//                     value={confirmPassword}
//                     onChangeText={setConfirmPassword}
//                     secureTextEntry
//                 />
//             </ScrollView>

//             <View style={styles.footer}>
//                 <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//                     <Text style={styles.continueButtonText}>Continue</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
        
//     },
//     scrollContainer: {
//         padding: 20,
//         paddingBottom: 80, 
//     },
//     backButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginLeft: 10,
//     },
//     infoContainer: {
//         marginTop: 5,
//         marginBottom: 20,
//     },
//     info: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     text: {
//         fontSize: 16,
//         marginBottom: 10,
//     },
//     input: {
//         height: 50,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         marginBottom: 20,
//         fontSize:16,
//         paddingHorizontal: 10,
//         borderRadius: 8,
//         marginTop:10
//     },
//     footer: { 
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     continueButton: {
//         backgroundColor: '#27272a',
//         padding: 15,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     continueButtonText: {
//         fontSize: 18,
//         fontWeight: "600",
//         color: '#fff',
//     },
// });

// export default UserDetails;





import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../Redux/Slice/AuthSlice/SignupSlice";

const UserDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Resident");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, loading, error } = useSelector(state => state.signup);
  const route = useRoute();
  const { phoneNumber } = route.params;
  const handleContinue = () => {
    if (password === confirmPassword) {
      const userData = { name, phoneNumber, email, password, role };
      dispatch(signupUser(userData));
    } else {
      alert("Passwords don't match");
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{phoneNumber}</Text>
        </View>
        {/* <Text style={styles.text}>Please fill in the details below:</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <View>
          <Text style={{color:"red"}}>{error}</Text>
          {console.log(error)}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  infoContainer: {
    marginTop: 5,
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  continueButton: {
    backgroundColor: "#27272a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});

export default UserDetails;