import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearStatus } from "../../Redux/Slice/AuthSlice/Forgot/resetPasswordSlice";

const ResetPassword = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.resetPassword);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { email } = route.params;

  const handleResetPassword = async () => {
    dispatch(clearStatus());
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    } else {
      setPasswordError("");
    }
    
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError("");
    }
    
    try {
      await dispatch(updatePassword({ email, newPassword: password }));
      navigation.navigate("Login");
    } catch (err) {
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          <View style={styles.phoneRow}>
            <Text style={styles.phoneText}>{email}</Text>
          </View>
        </View>
        <TextInput
          mode="outlined"
          label="New Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          outlineColor="#CCC"
          theme={{ colors: { primary: "#27272A" } }}
          error={passwordError !== ""}
        />
        {passwordError !== "" && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}
        <TextInput
          mode="outlined"
          label="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          outlineColor="#CCC"
          theme={{ colors: { primary: "#27272A" } }}
          error={confirmPasswordError !== ""}
        />
        {confirmPasswordError !== "" && (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        )}
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
          {loading ? "Saving..." : "Save"}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {success && <Text style={styles.successText}>{success}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  button: {
    width: "100%",
    backgroundColor: "black",
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#666",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneText: {
    fontSize: 16,
    fontStyle: "italic",
  },
  input: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  successText: {
    color: "green",
    marginTop: 5,
  },
});

export default ResetPassword;
