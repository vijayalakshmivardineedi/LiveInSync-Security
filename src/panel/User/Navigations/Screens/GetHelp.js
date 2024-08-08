import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const GetHelp = () => {
  const navigation = useNavigation();
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [showCateDropdown, setShowCateDropdown] = useState(false);
  const [selectedCate, setSelectedCate] = useState(null);
  const [showStatuDropdown, setShowStatuDropdown] = useState(false);
  const [selectedStatu, setSelectedStatu] = useState(null);
  const [isConfirmationClicked, setIsConfirmationClicked] = useState(false);


  const Types = ['Community', 'Payment', 'Visitors', 'user'];
  const Cates = ['Electrical', 'Plumbing', 'Residents', 'Payments', 'Water', 'Outers'];
  const Status = ['Resolved', 'Pending', 'OnHold'];

  const selectType = (Type) => {
    setSelectedType(Type);
    setShowTypeDropdown(false);
  };

  const selectCate = (Cate) => {
    setSelectedCate(Cate);
    setShowCateDropdown(false);
  };

  const selectStatu = (Statu) => {
    setSelectedStatu(Statu);
    setShowStatuDropdown(false);
  };

  const toggleDropdown = (dropdown) => {
    if (dropdown === 'type') {
      setShowTypeDropdown(!showTypeDropdown);
      setShowCateDropdown(false);
      setShowStatuDropdown(false);
    } else if (dropdown === 'cate') {
      setShowCateDropdown(!showCateDropdown);
      setShowTypeDropdown(false);
      setShowStatuDropdown(false);
    } else if (dropdown === 'statu') {
      setShowStatuDropdown(!showStatuDropdown);
      setShowTypeDropdown(false);
      setShowCateDropdown(false);
    }
  };
  const handlebuttonPress = () => {
    navigation.navigate('Select the Category');
  }

  const tickets = [
    {
      id: '1',
      type: 'Payments',
      status: 'Resolved',
      date: '24 April 2024',
      reqId: '123478',
      issue: 'Payment not reflecting',
      close: 'Closed',
      resolution: 'Resolved by Support . personal',
    },
    {
      id: '2',
      type: 'Plumbing',
      status: 'On Hold',
      date: '01 May 2024',
      reqId: '123478',
      issue: 'Payment not reflecting',
      close: 'Closed',
      resolution: 'Resolved by Support . personal',
    },
    {
      id: '3',
      type: 'Electrical',
      status: 'In Progress',
      date: '01 May 2024',
      reqId: '123478',
      issue: 'Payment not reflecting',
      close: 'Closed',
      resolution: 'Resolved by Support . personal',
    },
    {
      id: '4',
      type: 'Payments',
      status: 'Resolved',
      date: '24 April 2024',
      reqId: '123478',
      issue: 'Payment not reflecting',
      close: 'Closed',
      resolution: 'Resolved by Support . personal',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Hold':
        return 'red';
      case 'In Progress':
        return 'orange';
      case 'In Progress':
        return 'green';
      case 'Resolved':
        return 'green';
      default:
        return 'gray';
    }
  };


  return (
    <View style={styles.container}>

      <View style={[styles.rowContainer, styles.row1]}>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={[styles.dropdown, isConfirmationClicked && styles.dimmedInput]}
            onPress={() => toggleDropdown('type')}
            disabled={isConfirmationClicked}
          >
            <Text style={styles.fontWeightBold}>{selectedType || 'Type'}</Text>
            <Icon name={showTypeDropdown ? 'angle-up' : 'angle-down'} size={20} color="#000" style={{ marginLeft: 5 }} />
          </TouchableOpacity>
          {showTypeDropdown && (
            <View style={styles.dropdownList}>
              {Types.map((Type, index) => (
                <TouchableOpacity key={index} onPress={() => selectType(Type)} style={styles.dropdownItem}>
                  <Text style={{fontWeight:400}}>{Type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={[styles.dropdown, isConfirmationClicked && styles.dimmedInput]}
            onPress={() => toggleDropdown('cate')}
            disabled={isConfirmationClicked}
          >
            <Text style={styles.fontWeightBold}>{selectedCate || 'Category'}</Text>
            <Icon name={showCateDropdown ? 'angle-up' : 'angle-down'} size={20} color="#000" style={{ marginLeft: 5 }} />
          </TouchableOpacity>
          {showCateDropdown && (
            <View style={styles.dropdownList}>
              {Cates.map((Cate, index) => (
                <TouchableOpacity key={index} onPress={() => selectCate(Cate)} style={styles.dropdownItem}>
                  <Text style={{fontWeight:400}}>{Cate}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={[styles.dropdown, isConfirmationClicked && styles.dimmedInput]}
            onPress={() => toggleDropdown('statu')}
            disabled={isConfirmationClicked}
          >
            <Text style={styles.fontWeightBold}>{selectedStatu || 'Status'}</Text>
            <Icon name={showStatuDropdown ? 'angle-up' : 'angle-down'} size={20} color="#000" style={{ marginLeft: 5 }} />
          </TouchableOpacity>
          {showStatuDropdown && (
            <View style={styles.dropdownList}>
              {Status.map((Statu, index) => (
                <TouchableOpacity key={index} onPress={() => selectStatu(Statu)} style={styles.dropdownItem}>
                  <Text style={{fontWeight:400}}>{Statu}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ticketContainer}>
            <View style={styles.header}>
              <Text style={styles.type}>
                {item.type}
              </Text>
              <Text style={[styles.status, { backgroundColor: getStatusColor(item.status) }]}>
                {item.status}
              </Text>
            </View>
            <View style={[styles.header, { marginBottom: 12 }]}>

              <Text style={styles.date}>
                Req Id: {item.reqId}
              </Text>
              <Text style={styles.date}>
                {item.date}
              </Text>
            </View>
            <View style={styles.row}>
              <Fontisto name="credit-card" size={14} color="#C59358" />
              <Text style={styles.issue}>{item.issue}</Text>
            </View>
            <View style={styles.row}>
              <Octicons name="issue-closed" size={18} color="#C59358" />
              {/* <Image source={require('../../../../assets/User/images/chat.png')} style={styles.icon} /> */}
              <Text style={styles.issue}>{item.close}</Text>
            </View>
            <View style={styles.row}>
              <FontAwesome6 name="user-large" size={18} color="#C59358" />
              {/* <Image source={require('../../../../assets/User/images/people.png')} style={styles.icon} /> */}
              <Text style={styles.resolution}>{item.resolution}</Text>
            </View>
            {item.type !== 'Payments' ? (
              <View style={styles.actions}>
                <View style={styles.actionButton}>
                  <MaterialCommunityIcons name="check-all" size={22} color="#C59358" style={{ marginRight: 5 }} />

                  <Text style={styles.actionText}>Resolve</Text>
                </View>
                <View style={styles.actionButton}>
                  <MaterialCommunityIcons name="comment-processing" size={20} color="#C59358" style={{ marginRight: 5 }} />
                  <Text style={styles.actionText}>Comment</Text>
                </View>
              </View>
            ) : (
              <View style={styles.ratingContainer}>
                <AntDesign name="staro" size={24} color="#C59358" />
                <Text style={styles.ratingText}>Rate</Text>
              </View>
            )}
          </View>
        )}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={styles.raiseIssueButton} onPress={handlebuttonPress}>
          <Text style={styles.raiseIssueText}>Rise Your Issue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  row1: {
    flexDirection: 'row',

  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    minWidth: 110,
  },
  dimmedInput: {
    backgroundColor: '#f0f0f0',
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  dropdownItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 110,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  ticketContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3
  },
  type: {
    fontSize: 18,
    color: "#192c4c",
    fontWeight: 'bold',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  status: {
    color: '#fff',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
    overflow: 'hidden',
  },
  date: {
    color: '#888',
  },
  issue: {
    color: '#333',
    marginLeft: 8,
  },
  resolution: {
    color: '#333',
    marginLeft: 8,
  },
  raiseIssueButton: {
    flexDirection: 'row',
    marginRight: 30,
    backgroundColor: '#C59358',
    padding: 12,
    borderRadius: 50,
    position: 'absolute',
    bottom: 5,
  },
  raiseIssueText: {
    color: '#fff',
    fontWeight: "700",
    fontSize: 16
  },
  actions: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderRadius:8,
    borderColor: "#C59358",
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  actionText: {
    fontSize: 16,
    color:"#C59358",
    fontWeight:"700"
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fontWeightBold: {
    fontWeight: '600',
    color:"#192C4C"
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#C59358",
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 8,
    marginTop: 3,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 5,
    color: "#C59358"
  },
});

export default GetHelp;