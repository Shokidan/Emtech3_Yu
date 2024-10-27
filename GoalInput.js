import { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, Alert, Modal, Button } from 'react-native';

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);  

  function textInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalText); 
    setEnteredGoalText('');  
    setModalVisible(false);   
  }

  function handleOrientationChange() {
    console.log('Orientation changed'); 
  }

  function handleDismiss() {
    console.log('Modal dismissed'); 
    setModalVisible(false); 
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={textInputHandler}
        placeholder="Your Course Goal!"
        style={styles.textInput}
        value={enteredGoalText}
      />

      <View style={styles.container}>
        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#e39462' : '#faba73',
              padding: 10,
              opacity: pressed ? 0.75 : 1,
            },
            styles.pressable
          ]}
          onPress={() => setModalVisible(true)}               
          disabled={!enteredGoalText}  
        >
          <Text style={styles.Wordpressable}>New Goal!</Text>
        </Pressable>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleDismiss}
          supportedOrientations={['portrait', 'landscape']}
          onDismiss={handleDismiss} 
          onOrientationChange={handleOrientationChange}  
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Do you want to add this goal?</Text>
              <Button title="Yes, Add" onPress={addGoalHandler} />
              <Button title="Cancel" onPress={handleDismiss} />
            </View>
          </View>
        </Modal>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  textInput: {
    borderWidth: 1.5,
    backgroundColor: '#e39462',
    borderColor: '#59403c',
    width: '65%',
    padding: 15,
    borderRadius: 10,
  },
  container: {
    justifyContent: 'center', 
    alignItems: 'center',      
    padding: 10,
    left: 5,
  },
  pressable: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  Wordpressable: {
    color: '#59403c',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent black background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',  // Solid background for the modal content
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default GoalInput;
