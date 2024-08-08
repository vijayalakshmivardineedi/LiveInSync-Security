import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
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
  const [showOptions, setShowOptions] = useState({
    arrivalTime: false,
    departureTime: false,
    category: false,
  });

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

  const toggleDropdown = (field) => {
    setShowOptions((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSelect = (field, value) => {
    if (field === "arrivalTime") setArrivalTime(value);
    if (field === "departureTime") setDepartureTime(value);
    if (field === "category") setCategory(value);
    toggleDropdown(field);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Arrival time</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                placeholder="Arrival time"
                value={arrivalTime}
                onChangeText={setArrivalTime}
              />
              <TouchableOpacity
                onPress={() => toggleDropdown("arrivalTime")}
                style={styles.iconContainer}
              >
                <AntDesign
                  name="caretdown"
                  size={12}
                  color="#777"
                  style={styles.iconInside}
                />
              </TouchableOpacity>
            </View>
            {showOptions.arrivalTime && (
              <View style={styles.dropdown}>
                {[
                  "10:00 AM",
                  "11:00 AM",
                  "12:00 PM",
                  "1:00 PM",
                  "2:00 PM",
                  "3:00 PM",
                  "4:00 PM",
                  "5:00 PM",
                ].map((time) => (
                  <TouchableOpacity
                    key={time}
                    onPress={() => handleSelect("arrivalTime", time)}
                    style={styles.dropdownItem}
                  >
                    <Text>{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Departure time</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                placeholder="Departure time"
                value={departureTime}
                onChangeText={setDepartureTime}
              />
              <TouchableOpacity
                onPress={() => toggleDropdown("departureTime")}
                style={styles.iconContainer}
              >
                <AntDesign
                  name="caretdown"
                  size={12}
                  color="#777"
                  style={styles.iconInside}
                />
              </TouchableOpacity>
            </View>
            {showOptions.departureTime && (
              <View style={styles.dropdown}>
                {["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map(
                  (time) => (
                    <TouchableOpacity
                      key={time}
                      onPress={() => handleSelect("departureTime", time)}
                      style={styles.dropdownItem}
                    >
                      <Text>{time}</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Number of guests</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                placeholder="Number of guests"
                value={numGuests}
                onChangeText={setNumGuests}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
              />
              <TouchableOpacity
                onPress={() => toggleDropdown("category")}
                style={styles.iconContainer}
              >
                <AntDesign
                  name="caretdown"
                  size={12}
                  color="#777"
                  style={styles.iconInside}
                />
              </TouchableOpacity>
            </View>
            {showOptions.category && (
              <View style={styles.dropdown}>
                {["Business", "Casual", "Formal"].map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => handleSelect("category", cat)}
                    style={styles.dropdownItem}
                  >
                    <Text>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date</Text>
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
                  color={show ? "#0000FF" : "#c59358"}
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
          </View>
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
          <TouchableOpacity
            onPress={handleConfirm}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingHorizontal:10,marginTop:10,
  },
  
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    flex: 1,
  },
  inputWithIcon: {
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
  },

  dropdown: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#fff",
    position: "absolute",
    top: 45,
    width: "100%",
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
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
    backgroundColor: "#192c4c",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {
    position: "absolute",
    right: 10,
  },
});
