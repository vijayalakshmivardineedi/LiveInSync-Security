import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Sample() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setScanned(false); // Reset scanned state to allow scanning again
  };

  const handleVerification = () => {
    if (scannedData === 'VALID_DATA') {
      alert('Data is verified!');
    } else {
      alert('Data verification failed!');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{scannedData}</Text>
            <Button title="Verify Data" onPress={handleVerification} />
            <Button title="Close Modal" onPress={closeModal} />
          </View>
        </View>
      </Modal>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
