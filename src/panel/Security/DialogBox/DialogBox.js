import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MyDialog = ({ message, showDialog, onClose }) => {
    if (!showDialog) return null;

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={showDialog}
            onRequestClose={onClose}
        >
            <View style={styles.overlayStyle}>
                <View style={styles.dialogStyle}>
                    <Text style={styles.messageStyle}>{message}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlayStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialogStyle: {
        backgroundColor: '#630000',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    messageStyle: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonStyle: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonTextStyle: {
        color: '#630000',
        fontSize: 16,
    },
});

export default MyDialog;
