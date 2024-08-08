import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

// Importing icons
import bellIcon from '../../../../../assets/User/images/alarm.png';
import checkIcon from '../../../../../assets/User/images/check.png';
import closeIcon from '../../../../../assets/User/images/tick.png';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const fetchedNotifications = [
        { id: '1', type: 'maintenance', title: 'Maintenance Alert', message: 'Water shutdown from 2 PM to 4 PM', timestamp: '2024-05-27T10:00:00Z' },
        { id: '2', type: 'parcel', title: 'Parcel Delivery', message: 'Your package has arrived at the lobby', timestamp: '2024-05-27T11:00:00Z' },
        { id: '3', type: 'guest', title: 'Guest Request', guestName: 'John Doe', message: 'Your guest John Doe is waiting for you.', timestamp: '2024-05-27T12:00:00Z' },
      ];
      setNotifications(fetchedNotifications);
    };

    fetchNotifications();
  }, []);

  // Function to handle notification deletion
  const handleDelete = (id) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  // Render swipeable right actions
  const renderRightActions = (id) => {
    return (
      <View style={styles.rightActionsContainer}>
        <TouchableOpacity onPress={() => handleDelete(id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const timestamp = new Date(item.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <View style={styles.notificationItem}>
          <View style={styles.imageContainer}>
            <Image source={bellIcon} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
          <Text style={styles.timestamp}>{timestamp}</Text>
          {item.type === 'guest' && (
            <View style={styles.guestActionsContainer}>
              <TouchableOpacity style={styles.guestActionButton}>
                <Image source={checkIcon} style={styles.guestActionIcon} />
                <Text style={styles.guestActionText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.guestActionButton}>
                <Image source={closeIcon} style={styles.guestActionIcon} />
                <Text style={styles.guestActionText}>Decline</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.emptyMessage}>No notifications available</Text>}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
    position: 'relative',
  },
  imageContainer: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  image: {
    width: 40,
    height: 40,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: '#555',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#777',
  },
  rightActionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  deleteText: {
    fontSize: 16,
    color: 'red',
    marginHorizontal: 10,
  },
  guestActionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  guestActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  guestActionIcon: {
    width: 10,
    height: 20,
  },
  guestActionText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#1',
  },
});

export default Notifications;
