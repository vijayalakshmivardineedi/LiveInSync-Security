import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { Appbar, Button, Provider as PaperProvider } from "react-native-paper";

const Invoice = ({ title, amount, dueDate, fine }) => {
  return (
    <View style={styles.invoiceContainer}>
      <Text style={styles.invoiceTitle}>{title}</Text>
      <View style={styles.rowContainer}>
        <Button mode="contained" style={styles.overdueButton}>
          Overdues
        </Button>
        <Text style={styles.dueDate1}>{dueDate}</Text>
      </View>
      <View style={styles.row}>
        <Image
          source={require("../../../../../assets/User/images/rupee-sign.png")}
          style={styles.iconImage1}
        />
        <Text style={styles.amount}>
          ₹ {amount}{" "}
          {fine && <Text style={styles.fine}>+ ₹ {fine} (Fine)</Text>}
        </Text>
      </View>
      <View style={styles.row}>
        <Image
          source={require("../../../../../assets/User/images/calendar.png")}
          style={styles.iconImage}
        />
        <Text style={styles.dueDate}>Due date {dueDate}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWithIcon}>
          <Image
            source={require("../../../../../assets/User/images/tick.png")}
            style={styles.iconImage}
          />
          <Text style={styles.buttonText}>I have Paid</Text>
        </View>
        <View style={styles.buttonWithIcon1}>
          <Image
            source={require("../../../../../assets/User/images/rupee.png")}
            style={styles.iconImage}
          />
          <Text style={styles.buttonText}>Pay now</Text>
        </View>
      </View>
    </View>
  );
};

const Payment = () => {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        
        <View style={styles.card}>
          <View style={styles.balanceContainer}>
            <View style={styles.balanceTextRow}>
              <Text style={styles.balanceText}>Advance</Text>
              <Text style={styles.balanceText}>Dues</Text>
              <Text style={styles.balanceText}>Overdues</Text>
            </View>
            <View style={styles.balanceAmountRow}>
              <Text style={[styles.balanceAmount, { color: "green" }]}>0</Text>
              <Text style={styles.balanceAmount}>52,040.92</Text>
              <Text style={[styles.balanceAmount, { color: "#6333BB" }]}>
                52,040.92
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.yearStatusContainer}>
            <Button mode="contained" style={styles.button}>
              2019-2020
            </Button>
            <Text style={styles.statusText}>STATUS</Text>
          </View>
          <Text style={styles.duesText}>DUES</Text>
        </View>

        <ScrollView>
          <View style={styles.card}>
            <Invoice title="Test" amount="2000.00" dueDate="17 Dec 2019" />
          </View>
          <View style={styles.card}>
            <Invoice
              title="Invoice for Maintenance"
              amount="1278.82"
              fine="999.00"
              dueDate="04 Nov 2019"
            />
          </View>
          <View style={styles.card}>
            <Invoice
              title="Invoice for Maintenance"
              amount="100.00"
              dueDate="04 Nov 2019"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  balanceContainer: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  balanceTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  balanceAmountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  balanceText: {
    color: "#999",
    fontSize: 16,
    flex: 1,
    textAlign: "left",
  },
  balanceAmount: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 3,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  yearStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  yearStatusText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#999",
    marginLeft: 60,
  },
  duesText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#999",
  },
  invoiceContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  dueDate: {
    color: "#999",
    marginVertical: 5,
    marginLeft: 10,
  },

  dueDate1: {
    color: "#999",
    marginVertical: 5,
    marginLeft: 10,
  },
  amount: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
  },
  fine: {
    color: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  buttonWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 55,
  },
  buttonWithIcon1: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 55,
  },
  buttonText: {
    marginLeft: 5,
  },

  iconImage: {
    width: 20,
    height: 20,
  },
  iconImage1: {
    width: 20,
    height: 20,
    marginTop: 10,
  },
});

export default Payment;
