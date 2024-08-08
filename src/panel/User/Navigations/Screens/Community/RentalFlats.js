import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

const familyMemberImages = [
  require("../../../../../assets/User/images/man.png"),
  require("../../../../../assets/User/images/man.png"),
  require("../../../../../assets/User/images/man.png"),
  require("../../../../../assets/User/images/man.png"),
  require("../../../../../assets/User/images/man.png"),
  require("../../../../../assets/User/images/man.png"),
  require("../../../../../assets/User/images/man.png"),
];


const properties = [
  {
    id: 1,
    plotNo: '45',
    price: '5,0000',
    address: 'Block 13 Street 4 Near 1678',
    bed: 3,
    bath: 4,
    area: '4000 sft',
    image: require('../../../../../assets/User/images/house2.jpg'),
  },
  {
    id: 2,
    plotNo: '46',
    price: '5,5000',
    address: 'Block 14 Street 5 Near 1679',
    bed: 4,
    bath: 3,
    area: '4500 sft',
    image: require('../../../../../assets/User/images/house3.jpg'),
  },
  {
    id: 3,
    plotNo: '47',
    price: '6,0000',
    address: 'Block 15 Street 6 Near 1680',
    bed: 5,
    bath: 5,
    area: '5000 sft',
    image: require('../../../../../assets/User/images/house4.jpg'),
  },
];

const RentalFlats = () => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [selectedDate, setSelectedDate] = useState("");
  const [reasonForLeaving, setReasonForLeaving] = useState("");

  const navigation = useNavigation();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
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
      reasonForLeaving,
    });
    setShowModal(false);
    navigation.navigate("Flats");
  };

  const handleLeaseTermination = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../../../../assets/User/images/house.jpg")}
        style={styles.propertyImage}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Block</Text>
            <Text style={styles.detailValue}>F New</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Plot No</Text>
            <Text style={styles.detailValue}>256</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Property Type</Text>
            <Text style={styles.detailValue}>House</Text>
          </View>
        </View>
        <View style={[styles.row, styles.familyMembersSection]}>
          <View>
            <Text style={styles.detailLabel}>Family Members</Text>
            <View style={styles.familyMembers}>
              {familyMemberImages.map((image, index) => (
                <Image
                  key={index}
                  source={image}
                  style={styles.familyMemberImage}
                />
              ))}
            </View>
          </View>
          <Text style={styles.familyMembersCount}>7</Text>
        </View>
        <View style={styles.row1}>
          <View style={styles.detailBox1}>
            <Text style={styles.detailLabel}>Total Cars</Text>
            <Text style={styles.detailValue}>4</Text>
          </View>
          <View style={styles.detailBox1}>
            <Text style={styles.detailLabel}>Rg no</Text>
            <Text style={styles.detailValue}>TC-343-1456/R</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.terminateButton}
          onPress={handleLeaseTermination}
        >
          <Text style={styles.terminateButtonText}>Lease Termination</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.availablePropertiesContainer}>
        <View style={styles.row}>
          <Text style={styles.availablePropertiesText}>
            Properties available for Rent
          </Text>
          {/* <TouchableOpacity>
            <Text style={styles.sellAllText}>See all</Text>
          </TouchableOpacity> */}
        </View>

        <ScrollView horizontal>
          {properties.map((property) => (
            <View key={property.id} style={styles.propertyContainer}>
              <Image
                source={property.image}
                style={styles.availablePropertyImage}
              />
              <View style={styles.row}>
                <Text style={styles.detailText}>
                  Plot No: {property.plotNo}
                </Text>
                <Text style={styles.detailText}>SAR {property.price}</Text>
              </View>
              <Text style={styles.detailText2}>{property.address}</Text>

              <View style={styles.alternatingRow}>
                <Image
                  source={require("../../../../../assets/User/images/bed.png")}
                  style={styles.availablePropertyImage2}
                />
                <Text style={styles.alternatingText}>{property.bed} bed</Text>
                <Image
                  source={require("../../../../../assets/User/images/shower.png")}
                  style={styles.availablePropertyImage2}
                />
                <Text style={styles.alternatingText}>{property.bath} bath</Text>
                <Image
                  source={require("../../../../../assets/User/images/ruler.png")}
                  style={styles.availablePropertyImage2}
                />
                <Text style={styles.alternatingText}>{property.area}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Leaving Date</Text>
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
                  color={show ? "#0000FF" : "#192c4c"}
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
            <Text style={styles.modalHeading}>Reason for Leaving</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter reason for leaving"
              value={reasonForLeaving}
              onChangeText={setReasonForLeaving}
              multiline={true}
            />
            <Button
              title="Submit"
              onPress={handleConfirm}
              color="#192c4c"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  propertyImage: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailBox: {
    width: '32%',
    borderWidth: 1,
    backgroundColor:"#f6f6f6",
    borderColor: '#91A8BA',
    borderRadius: 10,
    padding: 10,
  },
  detailBox1: {
    width: '48%',
    borderWidth: 1,
    backgroundColor:"#f6f6f6",
    borderColor: '#91A8BA',
    borderRadius: 10,
    padding: 10,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#192c4c',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '400',
    color: '#555',
  },
  familyMembersSection: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor:"#f6f6f6",
    borderColor: '#91A8BA',
  },
  familyMembers: {
    flexDirection: 'row',
    marginTop: 5,
  },
  familyMemberImage: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 15,
  },
  familyMembersCount: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  terminateButton: {
    backgroundColor: '#192c4c',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
  terminateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  availablePropertiesContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  availablePropertiesText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sellAllText: {
    color: '#c59358',
    fontSize: 16,
  },
  availablePropertyImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  propertyContainer: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#91A8BA',
  },
  detailText: {
    fontSize: 16,
    color: '#192c4c',
    fontWeight: '700',
  },
  detailText2: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    marginBottom: 5,
  },
  availablePropertyImage2: {
    width: 30,
    height: 30,
  },
  alternatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alternatingText: {
    fontSize: 14,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWithIconInput: {
    flex: 1,
    marginBottom: 1,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },
});

export default RentalFlats;
