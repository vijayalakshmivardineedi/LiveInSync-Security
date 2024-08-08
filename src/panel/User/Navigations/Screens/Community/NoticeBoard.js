import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotices } from '../../../Redux/Slice/CommunitySlice/NoticeSlice';

const NoticeBoard = () => {
  const dispatch = useDispatch();
  const notices = useSelector((state) => state.notices.items);
  const noticeStatus = useSelector((state) => state.notices.status);
  const error = useSelector((state) => state.notices.error);

  
  useEffect(() => {
    if (noticeStatus === 'idle') {
      dispatch(fetchNotices());
    }
  }, [noticeStatus, dispatch]);

 
  const renderItem = ({ item }) => (

    <View style={styles.noticeContainer}>
      
      <View style={styles.dateTimeContainer}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.message}>{item.description}</Text>
    </View>
 
  );

  return (
    <View style={styles.container}>
      {noticeStatus === 'loading' && <ActivityIndicator size="large" color="#0000ff" />}
      {noticeStatus === 'failed' && <Text>Error: {error}</Text>}
      {noticeStatus === 'succeeded' && (
        <FlatList
          data={notices}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  noticeContainer: {
    backgroundColor: "#f6f6f6",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    borderWidth: 1,
    borderColor: "#91A8BA",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  dateTimeContainer: {
    flexDirection: "row",
    marginBottom: 4,
    justifyContent: "space-between",
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    marginBottom: 4,
    color: "#777",
  },
  message: {
    fontSize: 14,
    color: "#333",
  },
});

export default NoticeBoard;
