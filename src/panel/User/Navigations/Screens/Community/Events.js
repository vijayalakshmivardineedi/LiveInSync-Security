import React, { useEffect } from "react";
import { Text, Image, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-native-paper";
import { fetchEvents } from "../../../Redux/Slice/CommunitySlice/EventSlice";

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);
  let content;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };
  const ensureStartAM = (dateString) => {
    const date = new Date(dateString);
    const randomHour = 9 + Math.floor(Math.random() * 3); 
    date.setHours(randomHour);
    date.setMinutes(Math.floor(Math.random() * 60));
    date.setSeconds(0);
    return date;
  };
  const ensurePM = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
        if (hours < 12) {
      date.setHours(12 + Math.floor(Math.random() * 9));
      date.setMinutes(Math.floor(Math.random() * 60));
      date.setSeconds(0);
    }
    return date;
  };

  if (status === "loading") {
    content = <Text>Loading...</Text>;
  } else if (status === "succeeded") {
    content = events.map((event) => {
      const startDate = ensureStartAM(event.startDate);
      const endDate = ensurePM(event.endDate);

      return (
        <Card style={styles.card} key={event._id}>
          <Card.Content>
            <Image source={{ uri: `http://192.168.29.226:2000${event.pictures}` }} style={styles.pictures} />
            <Text style={styles.text}>Name: {event.name}</Text>
            <Text style={styles.text}>Event Date: {formatDate(startDate)}</Text>
            <Text style={styles.text}>
              Event Start: {formatTime(startDate)}
            </Text>
            <Text style={styles.text}>Event End: {formatTime(endDate)}</Text>
          </Card.Content>
        </Card>
      );
    });
  } else if (status === "failed") {
    content = <Text>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>{content}</ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "90%",
    borderRadius: 10,
    marginTop: 10,
  },
  pictures: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default Events;