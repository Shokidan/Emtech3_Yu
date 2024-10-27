import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, FlatList, Modal, Button, Pressable } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState(false); 
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false); 
  const [goalToDelete, setGoalToDelete] = useState(null);


  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => {
      const updatedGoals = [...currentCourseGoals, { text: enteredGoalText, id: Math.random().toString() }];
      
      if (updatedGoals.length > 5) {
        setIsWarningModalVisible(true); 
      }
      
      return updatedGoals; 
    });
  }


  function confirmDeleteHandler() {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== goalToDelete); 
    });
    setIsModalVisible(false); 
  }

  function cancelDeleteHandler() {
    setIsModalVisible(false); 
  }

  function deleteGoalHandler(id) {
    setGoalToDelete(id); 
    setIsModalVisible(true); 
  }

  function showWelcomeModal() {
    setIsWelcomeModalVisible(true); 
  }

  function closeWelcomeModal() {
    setIsWelcomeModalVisible(false); 
  }


  function closeWarningModal() {
    setIsWarningModalVisible(false); 
  }

    return (
      <ImageBackground
      source={require('./assets/Background9.png')} 
      style={styles.background}
      resizeMode="cover"
      >  
    
      <View style={styles.appContainer}>
        <View>
          <Image source={require('./assets/Button.png')} style={styles.headerImage}/>
        </View>

        <View style={styles.navBar}>
          <Pressable onPress={showWelcomeModal}>
            <Icon name="person" size={30} color="#ffd9a2" /> 
          </Pressable>
          <Text style={styles.navBarText}>Goals</Text>
        </View>

        <View style={styles.inputContainer}>
          <GoalInput onAddGoal={addGoalHandler} />
        </View>

        <View style={styles.goalsContainer}>
          <Text style={styles.headerText}>List of Goals:</Text>

          <FlatList
            data={courseGoals} 
            renderItem={({ item }) => (
              <GoalItem
                text={item.text}
                id={item.id}          
                onDelete={deleteGoalHandler}  
              />
            )}
            keyExtractor={(item) => item.id} 
          />

          <Modal
          visible={isModalVisible}
          animationType="fade"
          transparent={true}
          >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to delete this goal?</Text>
              <View style={styles.modalButtons}>
                <Button title="Cancel" onPress={cancelDeleteHandler} />
                <Button title="Confirm" onPress={confirmDeleteHandler} />
              </View>
            </View>
          </View>
        </Modal>


        <Modal
          visible={isWelcomeModalVisible}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Welcome user to the application!</Text>
              <Text style={styles.modalText}>List down all of your goals!</Text>
              <Text style={styles.modalText}>°˖✧◝(⁰▿⁰)◜✧˖°</Text>
              <Button title="Close" onPress={closeWelcomeModal} />
            </View>
          </View>
        </Modal>

        <Modal
          visible={isWarningModalVisible}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Warning!</Text>
              <Text style={styles.modalText}> You have too many goals! Remember to pace yourself!.</Text>
              <Text style={styles.modalText}>╰(⸝⸝⸝´꒳`⸝⸝⸝)╯</Text>
              <Button title="Close" onPress={closeWarningModal} />
            </View>
          </View>
        </Modal>

        </View>
      </View>
      </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
    appContainer: {
      top:50,
      padding: 50,
      flex: 1,
      allignItems: 'center',
      jusitfyContent: 'center',
      paddingHorizontal: 16,
    },

    ImportantText:{
      fontWeight:'bold',
      fontSize:25,
      backgroundColor: '#b5d6d6',
      alignSelf: 'center',
      width: 375,
      padding: 15,
      bottom: 15,
    },

    goalsContainer:{
      borderWidth: 0.5,
      backgroundColor: '#e39462',
      borderColor: '#59403c',
      width: '100%',
      padding: 15,
      borderRadius: 15,
    },

  headerImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'cover',
  },

    background: {
      flex:1,
      top:'0%'
  },
    headerText: {
        fontWeight: 'bold',
        color: '#ffd9a2', 
        fontSize: 18,
    },
    navBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingVertical: 5,
      marginBottom: 10,
      backgroundColor: '#e39462',
      borderRadius: 10,
    },
    navBarText: {
      color: '#ffd9a2',
      fontSize: 15
      ,
      fontWeight: 'bold',
    },

    modalContent: {
      width: '80%', 
      padding: 20,
      backgroundColor: '#ffd9a2',
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      top:400,
      left:40
    },

    modalText: {
      marginBottom: 20,
      fontSize: 18,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
  });


