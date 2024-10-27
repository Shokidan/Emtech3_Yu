import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons

const InputMethodEditor = ({ onChangeInputMethod }) => {
  const [text, setText] = useState('');

  const handleChange = (inputText) => {
    setText(inputText);
  };

  const handleSend = () => {
    if (text.trim()) {
      onChangeInputMethod(text); // Send the text to the parent
      setText(''); // Clear the input after sending
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => console.log("Text input method selected")}>
          <Icon name="text-fields" size={24} color="white" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log("Image input method selected")}>
          <Icon name="image" size={24} color="white" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log("Location input method selected")}>
          <Icon name="location-on" size={24} color="white" /> 
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={handleChange} // Update text state
          placeholder="Type a message..."
          onSubmitEditing={handleSend} // Optional: Send on enter
        />


        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Icon name="send" size={24} color="white" /> 
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white', // Optional: background color
  },
  buttonContainer: {
    flexDirection: 'row', // Align buttons in a row
    justifyContent: 'flex-start', // Align buttons at the start
    marginBottom: 10, // Space between buttons and input
  },
  button: {
    backgroundColor: '#007BFF', // Blue background for buttons
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5, // Space between buttons
    alignItems: 'center', // Center the icon inside the button
  },
  inputContainer: {
    flexDirection: 'row', // Align input and send button in a row
    alignItems: 'center', // Align input and button vertically
  },
  input: {
    flex: 1, // Take up as much space as possible
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9', // Light background for input
    height: 45, // Adjust height for better alignment
  },
  sendButton: {
    backgroundColor: '#28A745', // Green background for Send button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10, // Space between input and Send button
    alignItems: 'center', // Center the send icon
  },
});

export default InputMethodEditor;
