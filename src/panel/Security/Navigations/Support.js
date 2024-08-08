import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Support = () => {
    const [issue, setIssue] = useState('');
    const [message, setMessage] = useState('');

    const handleIssueChange = (text) => {
        setIssue(text);
    };

    const handleMessageChange = (text) => {
        setMessage(text);
    };

    const handleSend = () => {
        console.log("Send issue:", issue, "Send message:", message);
        setIssue('');
        setMessage('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Get Support</Text>
            <Text style={styles.subheading}>Ask us or suggest any way we can improve</Text>
            <TextInput
                style={styles.input1}
                onChangeText={handleIssueChange}
                value={issue}
                placeholder="Mention issue"
            />
            <TextInput
                style={styles.input}
                onChangeText={handleMessageChange}
                value={message}
                placeholder="Type your message here"
                textAlignVertical="top"
multiline={true}
      numberOfLines={4}
            />
            <TouchableOpacity
                onPress={handleSend}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 5,
    },
    subheading: {
        fontSize: 16,
        marginBottom: 20,
    },
    input1: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    input: {
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        borderRadius: 5,
        backgroundColor: "#192c4c",
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '50%',
    },

    buttonText: {
        fontSize: 20,
        fontWeight: "600",
        color: '#fff',
    },
});

export default Support;