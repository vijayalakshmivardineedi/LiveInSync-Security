import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { EditUserProfile } from '../../../Redux/Slice/ProfileSlice/EditProfileSlice';
import { fetchUserProfiles } from "../../../Redux/Slice/ProfileSlice/ProfileSlice";
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ route }) => {
  const dispatch = useDispatch();
  const { profiles, status, error } = useSelector((state) => state.profiles);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const { userId, societyId,id } = route.params;
  useEffect(() => {
    if (userId && societyId) {
      dispatch(fetchUserProfiles({ userId, societyId }));
    }
  }, [dispatch, userId, societyId]);

  useEffect(() => {
    if (profiles.length > 0) {
      const profile = profiles[0];
      setName(profile.name);
      setPhoneNumber(profile.mobileNumber);
      setEmail(profile.email);
      setProfileImage(profile.profilePicture);
    }
  }, [profiles]);

  const handleSaveChanges = async () => {
    const updatedProfile = { name, mobileNumber: phoneNumber, email, profilePicture: profileImage, id };
    try {
      await dispatch(EditUserProfile(updatedProfile)).unwrap();
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
    } catch (error) {
      Alert.alert('Profile Update Failed', 'There was an error updating your profile. Please try again.');
    }
  };

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          <Image source={profileImage ? { uri: profileImage } : require('../../../../../assets/User/images/girl.png')} style={styles.profileImage} />
          <TouchableOpacity style={styles.cameraIconContainer} onPress={handleChoosePhoto}>
            <Image source={require('../../../../../assets/User/images/camera.png')} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.name}>{name}</Text>
          <Text>
            <Text style={styles.idLabel}>ID: </Text>
            <Text style={styles.idValue}>{userId}</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.inputLabel}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" placeholderTextColor="#7A7A7A" />
      <Text style={styles.inputLabel}>Phone Number</Text>
      <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" placeholderTextColor="#7A7A7A" keyboardType="phone-pad" />
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput style={styles.input} value={email}  placeholder="Email" placeholderTextColor="#7A7A7A" keyboardType="email-address" />
      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save the Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
  cameraIcon: {
    width: 20,
    height: 20,
  },
  profileDetails: {
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  idLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  idValue: {
    fontSize: 16,
    color: '#7D0431',
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#7D0431',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfile;