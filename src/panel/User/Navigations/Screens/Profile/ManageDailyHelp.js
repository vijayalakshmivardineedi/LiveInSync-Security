// src/ManageDailyHelp.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServicePerson } from '../../../Redux/Slice/ProfileSlice/manageServiceSlice';
const ManageDailyHelp = ({ route }) => {

  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { societyId, userId } = route.params;
  console.log(societyId)



  const dispatch = useDispatch();
  const { servicePerson, loading, error } = useSelector((state) => state.manageServices);


  useEffect(() => {
    dispatch(fetchServicePerson({ societyId }));
  }, [dispatch, societyId]);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleted(true);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  if (isDeleted) return null;
  console.log(servicePerson)

  const ServicesFunction = ({ userId }) => {
    const [serviceTypes, setServiceTypes] = useState([
      'maid',
      'milkMan',
      'cook',
      'paperBoy',
      'driver',
      'water',
      'plumber',
      'carpenter',
      'electrician',
      'painter',
      'moving',
      'mechanic',
      'appliance',
      'pestClean']);

    const findServiceMember = (serviceList) => {
      return serviceList.find(service =>
        service.list.some(member => member.userId === userId)
      );
    };

    const displayData = serviceTypes.reduce((acc, serviceType) => {
      const serviceList = servicePerson[serviceType] || [];
      const foundService = findServiceMember(serviceList);
      if (foundService) {
        acc[serviceType] = foundService;
      }
      return acc;
    }, {});

    return (
      <div>
        <h1>Services for User {userId}</h1>
        {Object.keys(displayData).length > 0 ? (
          Object.keys(displayData).map(serviceType => (
            <div key={serviceType}>
              <h2>{serviceType}</h2>
              <div>
                <h3>{displayData[serviceType].name}</h3>
                <p>Phone: {displayData[serviceType].phoneNumber}</p>
                <p>Address: {displayData[serviceType].address}</p>
                <p>Timings: {displayData[serviceType].timings.join(', ')}</p>
                <p>Rating: {displayData[serviceType].rating}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No service found for the given user ID.</p>
        )}
      </div>
    );
  }


  return (
    <View style={styles.card}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {servicePerson && !loading && !error && (
        <>
          <TouchableOpacity style={styles.deleteIcon} onPress={handleDelete}>
            <Icon name="trash" size={20} color="red" />
          </TouchableOpacity>
          <View style={styles.row}>
            <Image
              source={{ uri: 'https://img.freepik.com/premium-photo/male-female-profile-avatar-user-avatars-gender-icons_1020867-74940.jpg' }}
              style={styles.avatar}
            />
            <View style={styles.info}>
              <Text style={styles.name}>Name: {servicePerson.name}</Text>
              <Text style={styles.occupation}>Occupied: {servicePerson.address}</Text>
            </View>
          </View>
          <Text style={styles.timing}>Timing: {servicePerson.timings}</Text>
        </>
      )}
      ServicesFunction(userId)
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleConfirmDelete}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleCancelDelete}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  occupation: {
    fontSize: 14,
    marginBottom: 8,
  },
  timing: {
    fontSize: 14,
    marginTop: 16,
  },
  deleteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#7d0431',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default ManageDailyHelp;
