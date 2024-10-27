import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Toolbar = ({ onSendMessage, onChangeInputMethod }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim().length > 0) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <View style={styles.toolbar}>
      <TouchableOpacity style={styles.button} onPress={() => onChangeInputMethod('text')}>
        <Icon name="text-fields" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onChangeInputMethod('image')}>
        <Icon name="image" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onChangeInputMethod('location')}>
        <Icon name="location-on" size={24} color="white" />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSend}
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>SEND</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FFF',
    height: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6f9adc',  // Updated color
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#6aff56',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Toolbar;
