// Notice.js

import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchNotices, selectNotices, selectLoading, selectError } from '../../User/Redux/Slice/Notice/NoticeSlice';
import { fetchNotices, selectError, selectLoading, selectNotices } from '../../User/Redux/Slice/Security_Panel/NoticeSlice';

const Notice = () => {
  const dispatch = useDispatch();
  const notices = useSelector(selectNotices);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchNotices());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notices}
        keyExtractor={(item) => item._id} 
        renderItem={({ item }) => (
          <View style={styles.MainContainer}>
            <View style={styles.header}>
              <Image
                source={require("../../../assets/Security/images/message-board.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.headerText}>{item.subject}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Text style={styles.mainText}>{item.subject}</Text>
            <Text style={styles.paragraph}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainContainer: {
    backgroundColor: "#F3FBFF",
    borderWidth: 1,
    borderColor: "#27272a",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
    color: "#192c4c",
  },
  time: {
    fontSize: 14,
    color: "grey",
  },
  mainText: {
    fontSize: 16,
    fontWeight: "500",
  },
  paragraph: {
    fontSize: 14,
    letterSpacing: 0.5,
    color: "grey",
  },
});

export default Notice;