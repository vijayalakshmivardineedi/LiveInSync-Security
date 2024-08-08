import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Modal, Pressable, Alert } from 'react-native';
import { Card, Button, Text, Avatar, IconButton, List } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const documents = [
  { id: '1', title: 'Campaign Review Image', status: 'No files added', icon: 'image' },
  { id: '2', title: 'Voter ID', status: 'No files added', icon: 'card-account-details' },  // Changed icon
  { id: '3', title: 'Aadhar', status: 'No files added', icon: 'card-account-details' },    // Changed icon
  { id: '4', title: 'Bonafide Certificate', status: 'No files added', icon: 'certificate' },
  { id: '5', title: 'Driving License', status: 'No files added', icon: 'car' },
  { id: '6', title: 'College ID', status: 'No files added', icon: 'school' },
  { id: '7', title: 'Other Documents', status: 'No files added', icon: 'file-document' },
  { id: '8', title: 'Estimates/Invoices including all files', status: 'No files added', icon: 'file-multiple' },
  { id: '9', title: 'Dose 2 Certificate', status: 'No files added', icon: 'file-certificate' },
];

const DocumentItem = ({ item, onOpenModal }) => (
  <Card style={styles.card}>
    <Card.Title
      title={item.title}
      subtitle={item.status}
      left={(props) => <Avatar.Icon {...props} icon={item.icon} style={styles.icon} />}
      right={(props) => (
        <View style={styles.rightSection}>
          <Button mode="contained" onPress={() => onOpenModal(item)} style={styles.button}>
            Add
          </Button>
          <IconButton icon="chevron-down" onPress={() => {}} />
        </View>
      )}
    />
  </Card>
);

const MyDocuments = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = (item) => {
    setSelectedDocument(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleImagePick = (type) => {
    const options = {
      mediaType: type === 'photo' ? 'photo' : 'mixed',
      quality: 1,
    };
    const pickerFunc = type === 'photo' ? launchCamera : launchImageLibrary;
    pickerFunc(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log('Image selected: ', response.assets[0]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={documents}
        renderItem={({ item }) => <DocumentItem item={item} onOpenModal={handleOpenModal} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
      {selectedDocument && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select an option for {selectedDocument.title}</Text>
              <List.Section>
                <List.Item title="Add Document" onPress={() => handleCloseModal()} />
                <List.Item title="Take Photo" onPress={() => {
                  handleImagePick('photo');
                  handleCloseModal();
                }} />
                <List.Item title="Choose from Library" onPress={() => {
                  handleImagePick('library');
                  handleCloseModal();
                }} />
                <List.Item title="Attach File" onPress={() => {
                  // Handle file attachment
                  handleCloseModal();
                }} />
                <List.Item title="Cancel" onPress={handleCloseModal} />
              </List.Section>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContentContainer: {
    paddingBottom: 20, // Add padding to the bottom if necessary
  },
  card: {
    marginVertical: 8,
    backgroundColor: 'white',
  },
  icon: {
    backgroundColor: '#F3E1D5',
  },
  button: {
    marginRight: 10,
    backgroundColor: '#800336',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default MyDocuments;
