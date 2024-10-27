import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Status from './components/Status'; 
import InputMethodEditor from './components/IME'; 
import MessageList from './components/MessageList'; 
import { createTextMessage, createImageMessage, createLocationMessage } from './components/MessageUtils';
import Constants from 'expo-constants'; 

export default function App() {
  const [messages, setMessages] = useState([
    createImageMessage('https://unsplash.it/300/300'),
    createTextMessage('World'),
    createTextMessage('Hello'),
    createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324,
    }),
  ]);


  const handlePressMessage = () => {

  };

  const renderMessageList = () => (
    <View style={styles.content}>
      <MessageList messages={messages} onPressMessage={handlePressMessage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Status />
      {renderMessageList()}
      <InputMethodEditor onChangeInputMethod={(inputMethod) => console.log(inputMethod)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight, // Use Constants to avoid overlap
  },
  content: {
    flex: 1,
  },
});
