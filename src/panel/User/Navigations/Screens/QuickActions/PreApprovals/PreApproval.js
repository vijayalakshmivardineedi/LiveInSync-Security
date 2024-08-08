// PreApproval.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { fetchPreApprovals } from '../../../../Redux/Slice/Home/PreapprovalSlice';

const PreApproval = ({ route }) => {

  const dispatch = useDispatch();
  const { societyId, buildingName, flatNumber } = route.params;

  const { preApprovals, status, error } = useSelector((state) => state.preApprovals);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPreApprovals({ societyId, block: buildingName, flatNo: flatNumber }));
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }
  // const handleShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       message: `Check out this entry code!${visitorId}`,
  //     });

  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //       } else {
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView vertical={true}>
        <View style={styles.cards}>
          {preApprovals.map((preApproval) => (
            <View key={preApproval._id} style={styles.eachCard}>
              <View style={styles.imageText}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Avatar.Image resizeMode="cover" size={60} source={require('../../../../../../assets/User/images/man.png')} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                      {preApproval.name}
                    </Text>
                    <Text style={{ fontSize: 16, color: 'grey' }}>
                      {preApproval.phoneNumber}
                    </Text>
                  </View>
                </View>
                <View style={styles.code}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#fff' }}>
                    {preApproval.visitorId}
                  </Text>
                </View>
              </View>
              <View style={styles.entry}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 14 }}>
                    Entry Time: {preApproval.checkInDateTime}
                  </Text>
                </View>
                <TouchableOpacity 
                // onPress={handleShare}
                >
                  <View style={styles.share}>
                    <Entypo name="share" size={22} color="#c59358" />
                    <Text style={{ fontSize: 14, color: '#c59358' }}>Share</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cards: {
    paddingHorizontal: 10,
  },
  eachCard: {
    height: 120,
    backgroundColor: '#f6f6f6',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#91A8BA',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },
  imageText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    backgroundColor: '#192c4c',
  },
  code: {
    backgroundColor: '#192c4c',
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  share: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 100,
    height: 37,
    flexDirection: 'row',
    borderColor: '#c59358',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});

export default PreApproval;
