import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { GiftedChat, InputToolbar, Send, Bubble } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Picker as EmojiPicker } from 'emoji-mart-native';
import * as ImagePicker from 'react-native-image-picker';

const MessagetoGuard = () => {
  const [selectedGate, setSelectedGate] = useState(null);
  const [selectedGuard, setSelectedGuard] = useState(null);
  const [messages, setMessages] = useState([]);
  const [openGate, setOpenGate] = useState(false);
  const [openGuard, setOpenGuard] = useState(false);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputToolbarFocused, setInputToolbarFocused] = useState(false);

  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));

    setTimeout(() => {
      const responseMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: 'Hi Sir',
        createdAt: new Date(), 
      }; 
      setMessages(previousMessages => GiftedChat.append(previousMessages, responseMessage));
    }, 1000);
  };

  const handleGateOpen = (open) => {
    setOpenGate(open);
    if (open) {
      setOpenGuard(false);
    }
  };

  const handleGuardOpen = (open) => {
    setOpenGuard(open);
    if (open) {
      setOpenGate(false);
    }
  };

//   const toggleEmojiPicker = () => {
//     setShowEmojiPicker(!showEmojiPicker);
//     Keyboard.dismiss();
//   };

//   const handleEmojiSelect = (emoji) => {
//     const text = messages[0]?.text || '';
//     const newMessage = {
//       _id: Math.round(Math.random() * 1000000),
//       text: text + emoji.native,
//       createdAt: new Date(),
//       user: {
//         _id: 1,
//       },
//     };
//     setMessages(GiftedChat.append(messages, [newMessage]));
//     setShowEmojiPicker(false);
//   };

  const handleImagePicker = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.assets) {
        const imageMessage = {
          _id: Math.round(Math.random() * 1000000),
          text: '',
          createdAt: new Date(),
          user: {
            _id: 1,
          },
          image: response.assets[0].uri,
        };
        setMessages(GiftedChat.append(messages, [imageMessage]));
      }
    });
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.dropdownRow}>
        <DropDownPicker
          open={openGate}
          value={selectedGate}
          items={[
            { label: 'Gate 1', value: 'gate1' },
            { label: 'Gate 2', value: 'gate2' },
            { label: 'Gate 3', value: 'gate3' },
          ]}
          setOpen={handleGateOpen}
          setValue={setSelectedGate}
          containerStyle={styles.dropdownContainer}
          style={{ height: 45, width: 175 }}
          dropDownContainerStyle={styles.dropdownContainerStyle}
          placeholder="Select Gate"
          showTickIcon={false}
          textStyle={{ fontWeight: 'bold' }} 
        />
        <DropDownPicker
          open={openGuard}
          value={selectedGuard}
          items={[
            { label: 'Swami', value: 'guard1' },
            { label: 'Rama Rao', value: 'guard2' },
            { label: 'Sudarshan', value: 'guard3' }
          ]}
          setOpen={handleGuardOpen}
          setValue={setSelectedGuard}
          containerStyle={styles.dropdownContainer1}
          style={{ height: 45, width: 175   }}
          dropDownContainerStyle={styles.dropdownContainerStyle1}
          placeholder="Select Guard"
          showTickIcon={false}
          textStyle={{ fontWeight: 'bold' }}
        />
      </View>



      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{ _id: 1 }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={[
              styles.inputToolbar,
              { backgroundColor: inputToolbarFocused ? '#fff' : '#E8E8E8' }
            ]}
            onFocus={() => setInputToolbarFocused(true)}
            onBlur={() => setInputToolbarFocused(false)}
            primaryStyle={{ alignItems: 'flex-end' }}
          />
        )}
        renderSend={(props) => (
          <View style={styles.sendContainer}>
            <TouchableOpacity
            //  onPress={toggleEmojiPicker}
              style={styles.iconContainer}>
              <Icon name="smile-o" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={styles.iconContainer}>
              <Icon name="microphone" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleImagePicker} style={styles.iconContainer}>
              <Icon name="paperclip" size={24} color="#000" style={styles.verticalPaperclip} />
            </TouchableOpacity>
            <Send {...props}>
              <View style={styles.sendButton}>
                <Icon name="paper-plane" size={20} color="#007AFF" />
              </View>
            </Send>
          </View>
        )} 
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: { borderBottomRightRadius: 0, backgroundColor: '#6333BB', },
              left: { borderBottomLeftRadius: 0, backgroundColor: '#AD88C6', }
            }}
            textStyle={{
              right: { color: '#fff' },  
              left: { color: '#fff' }    
            }}
          />
        )}
        
        alwaysShowSend
        scrollToBottom
      />
      {/* {showEmojiPicker && <EmojiPicker onSelect={handleEmojiSelect} style={styles.emojiPicker} />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#000',
    zIndex: 1,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 70,
  },
  headerText1: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 110,
  },
  dropdownRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#f6f6f6',
    zIndex: 1,
  },
  dropdownContainer: {
    height: 40,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "space-between",  
  },
  dropdownContainerStyle: {
    backgroundColor: '#fafafa',
    width: 150,
    zIndex: 1,
  }, 
  dropdownContainer1: {
    height: 40,
    flex: 1,
    marginHorizontal: 5,
  },
  dropdownContainerStyle1: {
    backgroundColor: '#fafafa',
    width: 150,

    zIndex: 1,
  }, 
  inputToolbar: {
    borderTopColor: '#E8E8E8',
    borderTopWidth: 1,
  },
  sendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    width: 44,
    borderRadius: 22,
    margin: 5,
  },
  iconContainer: {
    marginHorizontal: 5,
  },
  verticalPaperclip: {
    transform: [{ rotate: '220deg' }],
  },
  emojiPicker: {
    width: '100%',
  },
});

export default MessagetoGuard;