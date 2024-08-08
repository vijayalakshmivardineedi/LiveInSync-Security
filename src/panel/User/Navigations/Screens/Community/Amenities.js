import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
  Modal,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";

const DetailBox = ({ title, value, backgroundColor, width }) => (
  <View style={[styles.detailBox, { backgroundColor, width }]}>
    <Text style={styles.detailTitle}>{title}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const CommunityHall = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.scene}>
      <Image
        source={{
          uri: "https://bpp.hmda.gov.in/Images/Community.jpg",
        }}
        style={styles.image}
      />
      <Text style={styles.description}>
        Residents can book the hall for private events such as birthday parties,
        weddings, and anniversaries, providing a convenient and affordable venue
        option. A fully equipped kitchen is available for catering purposes,
        making it convenient for hosting events that involve food and beverages.
      </Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <DetailBox
            title="Capacity"
            value="400 - 600"
            backgroundColor="#fff"
            width="48%"
          />
          <DetailBox
            title="Timings"
            value="11 am - 11 pm"
            backgroundColor="#fff"
            width="48%"
          />
        </View>
        <DetailBox
          title="Location"
          value="Vasanth vihar, Block 2, Kommadhi junction, near GVP College"
          backgroundColor="#fff"
          width="100%"
        />
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Booking Screen")}
      >
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const PlayArea = ({ date, show, showDatePicker, onChange }) => (
  <View style={styles.scene}>
    <Image
      source={{
        uri: "https://www.jaivinayakgroup.com/wp-content/uploads/2023/04/Blog-1.jpg",
      }}
      style={styles.image}
    />
    <ScrollView>
      <View >
        <View style={styles.header}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="football-outline" size={28} color="#c59358" style={{ marginRight: 10 }} />
            <Text style={styles.title}>Football ground</Text>
          </View>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={showDatePicker}
          >
            <Text style={styles.bookButtonText}>Book now</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <View style={styles.content}>
          <View style={styles.row}>
            <Icon name="clock-o" size={20} color="#c59358" />
            <Text style={styles.text}>
              Mon - Thurs: 7:30am - 4:30 pm{"\n"}
              Fri - Sun: 07:30am - 12:00 am
            </Text>

          </View>
          <View style={styles.row}>
            <Icon name="map-marker" size={20} color="#c59358" />
            <Text style={styles.text}>
              Al Marabea Street, Exit 18 Al Khail Road, Al Marabea East - Dubai
              - UAE
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />
      <View >
        <View style={styles.header}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <FontAwesome6 name="person-swimming" size={28} color="#c59358" style={{ marginRight: 10 }} />

            <Text style={styles.title}>Swimming pool</Text>

          </View>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={showDatePicker}
          >
            <Text style={styles.bookButtonText}>Book now</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={onChange}

            />
          )}
        </View>
        <View style={styles.content}>
          <View style={styles.row}>
            <Icon name="clock-o" size={20} color="#c59358" />
            <Text style={styles.text}>
              Mon - Thurs: 7:30am - 4:30 pm{"\n"}
              Fri - Sun: 07:30am - 12:00 am
            </Text>

          </View>
          <View style={styles.row}>
            <Icon name="map-marker" size={20} color="#c59358" />
            <Text style={styles.text}>
              Al Marabea Street, Exit 18 Al Khail Road, Al Marabea East - Dubai
              - UAE
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <View >
        <View style={styles.header}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <MaterialCommunityIcons name="tennis" size={28} color="#c59358" style={{ marginRight: 10 }} />

            <Text style={styles.title}>Tennis court</Text>
          </View>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={showDatePicker}
          >
            <Text style={styles.bookButtonText}>Book now</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <View style={styles.content}>
          <View style={styles.row}>
            <Icon name="clock-o" size={20} color="#c59358" />
            <Text style={styles.text}>
              Mon - Thurs: 7:30am - 4:30 pm{"\n"}
              Fri - Sun: 07:30am - 12:00 am
            </Text>

          </View>
          <View style={styles.row}>
            <Icon name="map-marker" size={20} color="#c59358" />
            <Text style={styles.text}>
              Al Marabea Street, Exit 18 Al Khail Road, Al Marabea East - Dubai
              - UAE
            </Text>
          </View>
        </View>
      </View>
    </ScrollView >
  </View >
);

const Gym = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const timeSlots = [
    "07:00 am",
    "07:30 am",
    "10:30 am",
    "12:30 pm",
    "02:30 pm",
    "04:30 pm",
    "06:30 pm",
    "08:30 pm",
    "10:30 pm",
  ];

  const handleSlotPress = (slot) => {
    setSelectedSlot(slot);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const handleConfirm = () => {
    setModalVisible(true);
  };

  const ModalPopup = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeading}>Gymnasium</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 16,
              borderRadius:10,
              fontWeight: "400",
              borderWidth: 1,
              borderColor: "#f2f7f4",
              padding: 8,
              backgroundColor: "#DDDEE0",
            }}
          >
            <Text>Timing</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="clock-o" size={20} color="#c59358" />
              <Text> 8:30 am to 9:30 pm</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={styles.modalCancelButton}
          >
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );



  return (
    <View style={styles.scene}>
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/f0/7d/22/f07d22c0f887230958aa0c54c4336338.jpg",
        }}
        style={styles.image}
      />
      <Text style={styles.description}>
        Our state-of-the-art gym is equipped with the latest equipment and
        offers a variety of fitness classes to help you stay in shape. Whether
        you're looking to lift weights, do cardio, or take a yoga class, we have
        something for everyone.
      </Text>
      <Text style={styles.timeSlotTitle}>Choose a Time Slot</Text>
      <View style={styles.inputWithIcon}>
        <TextInput
          style={[styles.input, styles.inputWithIconInput]}
          placeholder="Date"
          value={selectedDate.toLocaleDateString()}
          onChangeText={setSelectedDate}
          editable={false}
        />
        <TouchableOpacity onPress={showDatepicker} style={styles.iconContainer}>
          <Icon name="calendar" size={20} color="#c59358" />
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <View style={styles.timeSlotContainer}>
        {timeSlots.map((slot) => (
          <TouchableOpacity
            key={slot}
            style={[
              styles.timeSlotButton,
              selectedSlot === slot && styles.selectedTimeSlotButton,
            ]}
            onPress={() => handleSlotPress(slot)}
          >
            <Text style={styles.timeSlotButtonText}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
      <ModalPopup />
    </View>
  );
};

const Amenities = () => {
  const layout = useWindowDimensions();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "community", title: "Hall" },
    { key: "playArea", title: "Play area" },
    { key: "gym", title: "Gym" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "community":
        return <CommunityHall />;
      case "playArea":
        return (
          <PlayArea
            date={date}
            show={show}
            showDatePicker={showDatePicker}
            onChange={onChange}
          />
        );
      case "gym":
        return <Gym />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.labelStyle}
      activeColor="#192c4c"
      inactiveColor="#777"
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#f6f6f6",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    color: "#7a7873",
    textAlign: "justify",
    paddingHorizontal: 5,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailBox: {
    marginBottom: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#91A8BA"
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailRow1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#192c4c",
  },
  detailValue: {
    fontSize: 16,
    marginTop: 5,
  },
  tabBar: {
    backgroundColor: "#fff",
  },
  indicator: {
    backgroundColor: "#192c4c",
  },
  labelStyle: {
    fontSize: 18,
    fontWeight: "600"
  },
  buttonContainer: {
    backgroundColor: "#192c4c",
    padding: 15,
    borderRadius: 10,
    position: 'absolute', bottom: 1, width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center", margin: "auto"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  headerText: {
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  subtitle: {
    color: "#666",
  },
  content: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  bookButton: {
    backgroundColor: "#192c4c",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  bookButtonText: {
    color: "#fff",
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  timeSlotTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 16,
  },
  timeSlotButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 8,
    backgroundColor: "#DDDEE0",
  },
  selectedTimeSlotButton: {
    backgroundColor: "#c59358",
  },
  timeSlotButtonText: {
    fontSize: 16,
    color: "#000",
  },
  iconContainer: {
    position: "absolute",
    right: 10,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputWithIconInput: {
    flex: 1,
    marginBottom: 1,
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalCancelButton: {
    backgroundColor: "#192c4c",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",

    marginTop: 20,
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});

export default Amenities;
