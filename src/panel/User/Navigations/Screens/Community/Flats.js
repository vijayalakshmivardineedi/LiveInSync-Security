import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
export default function App() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [numGuests, setNumGuests] = useState("");
  const [category, setCategory] = useState("");
  const [decoration, setDecoration] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    const currentDate = new Date();
    setSelectedDate(currentDate.toLocaleDateString());
  }, []);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setSelectedDate(currentDate.toLocaleDateString());
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };
  const handleConfirm = () => {
    console.log({
      selectedDate,
      arrivalTime,
      departureTime,
      numGuests,
      category,
      decoration,
    });
  };
  const InputWithIcon = ({ placeholder, value, onChangeText }) => (
    <View style={styles.inputWithIcon}>
      <TextInput
        style={[styles.input, styles.inputWithIconInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <AntDesign
        name="caretdown"
        size={20}
        color="#777"
        style={styles.iconContainer}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Booking</Text>
      <View style={styles.form}>
        <InputWithIcon
          placeholder="Arrival time"
          value={arrivalTime}
          onChangeText={setArrivalTime}
        />
        <InputWithIcon
          placeholder="Departure time"
          value={departureTime}
          onChangeText={setDepartureTime}
        />
        <InputWithIcon
          placeholder="Number of guests"
          value={numGuests}
          onChangeText={setNumGuests}
        />
        <InputWithIcon
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <View style={styles.inputWithIcon}>
          <TextInput
            style={[styles.input, styles.inputWithIconInput]}
            placeholder="Date"
            value={selectedDate}
            onFocus={() => setShow(true)}
            onChangeText={setSelectedDate}
          />
          <TouchableOpacity
            onPress={showDatepicker}
            style={styles.iconContainer}
          >
            <Icon
              name="calendar"
              size={20}
              color={show ? "#0000FF" : "#7E4DD9"}
            />
          </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Text style={styles.label}>Do you require decoration?</Text>
        <View style={styles.decorOptions}>
          <TouchableOpacity
            style={[styles.decorButton, !decoration && styles.selected]}
            onPress={() => setDecoration(false)}
          >
            <Text>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.decorButton, decoration && styles.selected]}
            onPress={() => setDecoration(true)}
          >
            <Text>Yes</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  form: {
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputWithIconInput: {
    flex: 1,
    marginBottom: 1,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
  },
  label: {
    marginBottom: 8,
  },
  decorOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  decorButton: {
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "40%",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#D3D3D3",
  },
  confirmButton: {
    backgroundColor: "#7E4DD9",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
