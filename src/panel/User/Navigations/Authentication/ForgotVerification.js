import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { verifyForgotOTP, selectLoadingStatus, selectError, selectVerificationStatus } from '../../Redux/Slice/AuthSlice/Forgot/forgotOtpSlice'; // Update with correct path to your slice file

const ForgotVerification = ({ route }) => {
  const { email } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const loading = useSelector(selectLoadingStatus);
  // const verificationStatus = useSelector(selectVerificationStatus);
  // const error = useSelector(selectError);
  const { loading, verificationStatus, error } = useSelector((state) =>state.forgototp)
  const [countdown, setCountdown] = useState(180);
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(""));
  const refs = useRef([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(countdown - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (refs.current[0]) {
      refs.current[0].focus();
    }
  }, []);

  const handleEdit = () => { };
  const handleResendOTP = () => {
    setCountdown(180);
  };
  const handleContinue = () => {
    dispatch(verifyForgotOTP({ email, otp: verificationCode.join('') }))
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleChangeVerificationCode = (index, value) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    if (value.length === 0 && index > 0 && refs.current[index - 1]) {
      refs.current[index - 1].focus();
    }

    if (value.length === 1 && index < verificationCode.length - 1 && refs.current[index + 1]) {
      refs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    if (verificationStatus) {
      navigation.navigate("Reset Password", { email });
    }
  }, [verificationStatus, navigation, email]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.prompt}>Enter the OTP sent to your email id</Text>
        <View style={styles.row}>
          <View style={styles.emailRow}>
            <Text style={styles.emailText}>{email}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editText}>Edit</Text>
            <Icon name="edit" size={20} color="#7d0431" />
          </TouchableOpacity>
        </View>
        <View style={styles.otpContainer}>
          {verificationCode.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) =>
                handleChangeVerificationCode(index, value)
              }
              keyboardType="numeric"
              maxLength={1}
              ref={(input) => (refs.current[index] = input)}
            />
          ))}
        </View>
        <View style={styles.flexibleContainer}>
          <View style={styles.resendRow}>
            <View style={styles.countdownContainer}>
              <MaterialCommunityIcons name="clock" size={20} color="#000" />
              <Text style={styles.countdownText}>{formatTime(countdown)}</Text>
            </View>
            <TouchableOpacity
              style={styles.resendButton}
              onPress={handleResendOTP}
              disabled={countdown > 0}
            >
              <Text
                style={[
                  styles.resendText,
                  countdown > 0 && styles.resendTextDisabled,
                ]}
              >
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            disabled={loading} // Disable continue button while loading
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.continueText}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fbf5f1",
  },
  prompt: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 13,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  emailRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  emailText: {
    fontSize: 16,
    fontStyle:'italic',
    marginLeft: 10,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  editText: {
    fontSize: 16,
    marginRight: 5,
    color: "#7D0431",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  otpInput: {
    borderBottomWidth: 1,
    height: 25,
    width: 25,
    textAlign: "center",
  },
  flexibleContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 15,
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  countdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 20,
  },
  countdownText: {
    fontSize: 16,
    marginLeft: 10,
  },
  resendButton: {
    alignItems: "flex-end",
    marginRight: 20,
  },
  resendText: {
    fontSize: 16,
    color: "#7D0431",
  },
  resendTextDisabled: {
    color: "grey",
  },
  continueButton: {
    backgroundColor: "#7D0431",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  continueText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
});

export default ForgotVerification;
