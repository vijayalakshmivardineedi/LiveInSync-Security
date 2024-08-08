import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get('window');
const services = [
  {
    category: "Daily Help",
    items: [
      {
        name: "Maid",
        icon: require("../../../../assets/User/images/dailyHelp.png"),
      },
      {
        name: "Milkman",
        icon: require("../../../../assets/User/images/milk-1.png"),
      },
      {
        name: "Cook",
        icon: require("../../../../assets/User/images/cook-1.png"),
      },
      {
        name: "Paperboy",
        icon: require("../../../../assets/User/images/newspaper.png"),
      },
      {
        name: "Driver",
        icon: require("../../../../assets/User/images/taxi-driver.png"),
      },
      {
        name: "Water",
        icon: require("../../../../assets/User/images/water.png"),
      },
    ],
  },
  {
    category: "Technical Help",
    items: [
      {
        name: "Plumber",
        icon: require("../../../../assets/User/images/plumber (2).png"),
      },
      {
        name: "Carpenter",
        icon: require("../../../../assets/User/images/carpenter (1).png"),
      },
      {
        name: "Electrician",
        icon: require("../../../../assets/User/images/electrician.png"),
      },
      {
        name: "Painter",
        icon: require("../../../../assets/User/images/painter.png"),
      },
      {
        name: "Moving",
        icon: require("../../../../assets/User/images/fast-delivery.png"),
      },
      {
        name: "Mechanic",
        icon: require("../../../../assets/User/images/engineer.png"),
      },
      {
        name: "Appliance",
        icon: require("../../../../assets/User/images/washing-machine.png"),
      },
      {
        name: "Pest Clean",
        icon: require("../../../../assets/User/images/pest.png"),
      },
    ],
  },
];

const ServiceItem = ({ name, icon }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (name === "Maid") {
      navigation.navigate("Maids");
    }
    if (name === "Plumber") {
      ;
      navigation.navigate("Plumber");
    }
    if (name === "Milkman") {
      navigation.navigate("Milk Man");
    }
    if (name === "Cook") {
      navigation.navigate("Cook");
    }
    if (name === "Paperboy") {
      navigation.navigate("Paper Boy");
    }
    if (name === "Driver") {
      navigation.navigate("Driver");
    }
    if (name === "Water") {
      navigation.navigate("Water");
    }
    if (name === "Carpenter") {
      navigation.navigate("Carpenter");
    }
    if (name === "Electrician") {
      navigation.navigate("Electrician");
    }
    if (name === "Appliance") {
      navigation.navigate("Appliance");
    }
    if (name === "Pest Clean") {
      navigation.navigate("Pest Control");
    }
    if (name === "Mechanic") {
      navigation.navigate("Mechanic");
    }
    if (name === "Moving") {
      navigation.navigate("Movers");
    }
    if (name === "Painter") {
      navigation.navigate("Painter");
    }

  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.serviceIconContainer,{borderColor:"#192C4C",borderWidth:1}]}>
        <Image source={icon} style={styles.serviceIcon} />
        <Text style={styles.serviceName}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ServicesList = ({ category, items }) => (
  <View>
    {category === "Daily Help" && (
      <View style={styles.categoryHeader}>
        <View style={{ borderWidth: 1, borderRadius: 50, borderColor: "#192c4c", padding: 8, marginRight: 10 }}>
          <Image
            source={require("../../../../assets/User/images/dailyHelp-2.png")}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.categoryTitle}>Daily Help</Text>
          <Text style={styles.categorySubtitle}>
            On special insistence of our dealer's
          </Text>
        </View>
      </View>
    )}
    {category === "Technical Help" && (
      <View style={styles.categoryHeader}>
        <View style={{ borderWidth: 1, borderRadius: 50, borderColor: "#192C4C", padding: 8, marginRight: 10 }}>
          <Image
            source={require("../../../../assets/User/images/technicalHelp-1.png")}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.categoryTitle}>Technical Help</Text>
          <Text style={styles.categorySubtitle}>
            On special insistence of our dealer's
          </Text>
        </View>
      </View>
    )}
    <View style={styles.servicesGrid}>
      {items.map((item, index) => (
        <ServiceItem key={index} {...item} />
      ))}
    </View>
  </View>
);

const Service = () => {
  return (
    <ScrollView style={styles.container}>
      {services.map((service, index) => (
        <ServicesList key={index} {...service} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingVertical: 10,
    backgroundColor: "#f6f6f6",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#192C4C"
  },
  categorySubtitle: {
    fontSize: 12,
    color: "gray",
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    marginTop: 10,
  },
  serviceIconContainer: {
    backgroundColor: "#C59358",
    padding: 10,
    borderRadius: 50,
    marginLeft: 8,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.21,
    height: 93,
  },
  serviceIcon: {
    width: 40,
    height: 40,
  },
  serviceText: {
    fontSize: 14,
    textAlign: "center",
  },
  categorySubtitle2: {
    fontSize: 14,
    color: "gray",
  },
  image: {
    width: 30,
    height: 30,
  },
  serviceName: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    maxWidth: 70,
    color:"#192c4c"
  },
});

export default Service;
