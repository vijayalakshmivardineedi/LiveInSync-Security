import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFrequentVisitors } from '../../User/Redux/Slice/Security_Panel/FrequentVisitorsSlice';

const FrequentVisitors = () => { 
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const visitors = useSelector((state) => state.frequentVisitors.visitors);
  const visitorStatus = useSelector((state) => state.frequentVisitors.status);
  const error = useSelector((state) => state.frequentVisitors.error);
  const [societyId, setSocietyId] = useState(null);
  useEffect(() => {
      const getSocietyId = async () => {
          try {
              const user = await AsyncStorage.getItem('user');
              const id = JSON.parse(user).societyId
              if (id !== null) {
                  setSocietyId(id);
              } else {

                
                  console.error('No societyId found in AsyncStorage');
              }
          } catch (error) {
              console.error('Error fetching societyId from AsyncStorage:', error);
          }
      };
      getSocietyId();
  }, []);
  useEffect(() => {
    if (visitorStatus === 'idle') {
      dispatch(fetchFrequentVisitors());
    }
  }, [visitorStatus, dispatch]);

  const filteredVisitors = visitors.filter(visitor =>
    visitor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          {visitorStatus === 'loading' && <Text>Loading...</Text>}
          {visitorStatus === 'failed' && <Text>{error}</Text>}
          {visitorStatus === 'succeeded' && filteredVisitors.map((visitor) => (
            <View key={visitor.id} style={styles.visitorContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{ uri: visitor.image }}
                  style={styles.image}
                />
                <View>
                  <Text style={styles.heading}>{visitor.name}</Text>
                  <Text style={styles.subHeading}>{visitor.type}</Text>
                </View>
              </View>
              <View style={styles.timeContainer}>
                <View>
                  <Text style={styles.inTime}>In: {visitor.inTime}</Text>
                  <Text style={styles.outTime}>Out: {visitor.outTime}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container2: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchInput: {
    height: 50,
    borderColor: "#0F3D3E",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderRadius: 10,
  },
  visitorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#f6f6f6",
    marginRight: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 16,
    color: "gray",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inTime: {
    fontSize: 14,
    color: "green",
  },
  outTime: {
    fontSize: 14,
    color: "red",
  },
  inTimeLabel: {
    color: "#FCBA03",
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
  },
  buttonIn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "green",
  },
  buttonOut: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default FrequentVisitors;