import React from 'react'; 
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function GoalItem(props) {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{props.text}</Text>
      <Pressable onPress={() => props.onDelete(props.id)}>
        <Icon name="delete" size={24} color="#59403c" style={styles.deleteIcon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    padding: 10, 
    marginVertical: 8, 
    backgroundColor: '#faba73',
    borderColor: '#59403c',
    borderWidth: 0.8, 
    borderRadius: 8, 
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  goalText: {
    color: '#59403c',
    flex: 1, 
    fontSize:15,
  },
  deleteIcon: {
    marginLeft: 10, 
  },
});

export default GoalItem;
