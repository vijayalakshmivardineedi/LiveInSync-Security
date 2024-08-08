import React from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity, Image } from 'react-native';

const CheckIn = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* <Image source={{ uri:item.avatar}} style={styles.avatar} /> */}
      <View style={styles.itemTextContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemSubText}>{item.role} {item.location}</Text>
      </View>
      <Text style={styles.itemTime}>IN: {item.time}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemText: {
    fontSize: 20,
    fontWeight: '600',
  },
  itemSubText: {
    color: '#888',
  },
  itemTime: {
    color: 'green',
  },
  list: {
    paddingHorizontal: 15,
  },
});

export default CheckIn;