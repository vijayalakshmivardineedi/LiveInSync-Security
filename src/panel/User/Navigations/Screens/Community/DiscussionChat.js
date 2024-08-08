import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EmojiSelector from "react-native-emoji-selector";
import { useRoute } from "@react-navigation/native";
import socketServices from "../../../Socket/SocketServices";

const DiscussionChat = () => {
  const route = useRoute();
  const { item } = route.params;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(item.messages || []);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const senderId = '6694e955fef273737d9196a5'
  const flatListRef = useRef(null);

  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToEnd();
  }, []);
  const groupId = item._id;
  useEffect(() => {
    // Join the group when the component mounts
    socketServices.emit('joinGroup', groupId);

    // Fetch chat history when the component mounts
    socketServices.emit('getChatHistory', groupId);

    // Listen for new messages
    const handleNewMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // Listen for chat history from the server
    const handleChatHistory = (chatHistory) => {
      setMessages(chatHistory);
    };

    // Handle any errors fetching chat history
    const handleChatHistoryError = (error) => {
      console.error('Error fetching chat history:', error);
    };

    // Handle errors
    const handleError = (error) => {
      console.error('Error:', error.message);
    };

    socketServices.on('newMessage', handleNewMessage);
    socketServices.on('chatHistory', handleChatHistory);
    socketServices.on('chatHistoryError', handleChatHistoryError);
    socketServices.on('error', handleError);

    // Clean up event listeners on unmount
    return () => {
      socketServices.removeListener('chatHistory', handleChatHistory);
      socketServices.removeListener('chatHistoryError', handleChatHistoryError);
      socketServices.removeListener('newMessage', handleNewMessage);
      socketServices.removeListener('error', handleError);
    };
  }, [groupId]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        groupId,
        senderId,
        content: input,
        sender: { _id: senderId, name: 'You' },
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      // Update local state with the new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Emit the new message to the server
      socketServices.emit('sendMessage', newMessage);

      // Clear the input field
      setInput("");
      scrollToEnd();

      // Request updated chat history
      socketServices.emit('getChatHistory', groupId);
    }
  };

  const handleAttachFile = async () => {
    try {
      console.log("File attachment functionality triggered");
    } catch (error) {
      console.error("Error handling file attachment:", error);
    }
  };

  const handleVoiceInput = async () => {
    try {
      console.log("Voice input functionality triggered");
    } catch (error) {
      console.error("Error handling voice input:", error);
    }
  };

  const toggleEmojiPicker = () => {
    if (!showEmojiPicker) {
      Keyboard.dismiss();
      setTimeout(() => setShowEmojiPicker(true), 100);
    } else {
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setInput((prevInput) => prevInput + emoji);
  };

  const renderItem = ({ item }) => {
    const isSenderValid = item.sender && item.sender._id;
    const isSentByCurrentUser = isSenderValid && item.sender._id === senderId;
    return (
      <View
        style={[
          styles.messageContainer,
          isSentByCurrentUser ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text style={styles.sender}>
          {item.sender === !null ? (item.sender._id === senderId ? "You" : item.sender.name) : "Admin"}

        </Text>
        <Text style={styles.message}>{item.content}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.chatList}
        onContentSizeChange={scrollToEnd}
      />
      <View style={styles.inputContainer}>
        <Icon
          name="emoticon-happy-outline"
          size={24}
          color="#7a7a7a"
          style={styles.icon}
          onPress={toggleEmojiPicker}
        />
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={(text) => {
              setInput(text);
              if (showEmojiPicker) {
                setShowEmojiPicker(false);
              }
            }}
            placeholder="Type your message"
            placeholderTextColor="#7a7a7a"
            multiline={true}
            onFocus={() => setShowEmojiPicker(false)}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <Icon
            name="paperclip"
            size={20}
            color="#7a7a7a"
            style={styles.innerIcon}
            onPress={handleAttachFile}
          />
          <Icon
            name="microphone-outline"
            size={20}
            color="#7a7a7a"
            style={styles.innerIcon}
            onPress={handleVoiceInput}
          />
        </View>
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Icon name="send-circle" size={35} color="#6e3bd4" />
        </TouchableOpacity>
      </View>
      {showEmojiPicker && (
        <EmojiSelector
          onEmojiSelected={handleEmojiSelect}
          showSearchBar={false}
          showTabs={false}
          showHistory={false}
          showSectionTitles={false}
          columns={8}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatList: {
    paddingHorizontal: 15,
  },
  messageContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  sentMessage: {
    backgroundColor: "#d1e7dd",
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: "#888",
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f0f0f0",
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
  },
  innerIcon: {
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  sendButton: {
    marginLeft: 5,
  },
});

export default DiscussionChat;