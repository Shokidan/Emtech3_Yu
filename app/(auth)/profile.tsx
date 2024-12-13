import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, TextInput, Modal, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

const Profile = () => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    name: 'Daniel Kimbell Yu',
    age: '22',
    gender: 'Male',
    lastChecked: 'XX/XX/XXXX',
  });

  const handleSave = () => {
    setEditModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen options={{ headerShown: false }} />

        {/* Background Circles */}
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />

        <ScrollView style={styles.profileBox}>
          <Text style={styles.HeaderText}>Profile</Text>

          {/* Info and Profile Picture */}
          <View style={styles.headerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.infotext}>Name: {profileDetails.name}</Text>
              <Text style={styles.infotext}>Age: {profileDetails.age}</Text>
              <Text style={styles.infotext}>Gender: {profileDetails.gender}</Text>
              <Text style={styles.infotext}>Last Checked: {profileDetails.lastChecked}</Text>
            </View>

            <View style={styles.imageContainer}>
              <Image source={require('../../assets/images/profile.jpg')} style={styles.profileImageLarge} />
              <Pressable style={styles.edit} onPress={() => setEditModalVisible(true)}>
                <Text style={styles.editText}>Edit Profile</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.line} />

          <Text style={styles.importantText}>Image of captured foot pressure: </Text>
          <View style={styles.imageCompiler}>
            <Image source={require('../../assets/images/1 (1).jpg')} style={styles.images} />
            <Image source={require('../../assets/images/1 (2).jpg')} style={styles.images} />
            <Image source={require('../../assets/images/1 (3).jpg')} style={styles.images} />
          </View>

          <View style={styles.line} />

          {/* Recommendation Section */}
          <View style={styles.recommendationContainer}>
            <Text style={styles.importantText}>Recommendation:</Text>
            <Text style={styles.recommendationText}>Identified Foot Arch:</Text>
            <Text style={styles.recommendationText}>Insole Recommendation:</Text>
          </View>
        </ScrollView>

        {/* Edit Profile Modal */}
        <Modal
          visible={isEditModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Edit Profile</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={profileDetails.name}
                onChangeText={(text) => setProfileDetails({ ...profileDetails, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={profileDetails.age}
                onChangeText={(text) => setProfileDetails({ ...profileDetails, age: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Gender"
                value={profileDetails.gender}
                onChangeText={(text) => setProfileDetails({ ...profileDetails, gender: text })}
              />
              <Button title="Save" onPress={handleSave} />
              <Button title="Cancel" onPress={() => setEditModalVisible(false)} color="red" />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBox: {
    width: '90%',
    backgroundColor: '#F4B949',
    borderRadius: 35,
    padding: 20,
    marginTop: 20,
  },
  HeaderText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImageLarge: {
    width: 110,
    height: 110,
    borderRadius: 50,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  edit: {
    backgroundColor: '#F6F6D8',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 5,
    alignItems: 'center',
  },
  editText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B3F00',
  },
  infotext: {
    fontSize: 15,
    marginBottom: 10,
    color: '#4B3F00',
    fontWeight: 'bold',
  },
  line: {
    marginTop: 5,
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  imageCompiler: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  images: {
    width: '32%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  recommendationContainer: {
    backgroundColor: '#F6F6D8',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  },
  recommendationText: {
    fontSize: 15,
    marginVertical: 5,
    color: '#4B3F00',
  },
  importantText: {
    fontSize: 15,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  circleTopRight: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 200,
    backgroundColor: 'rgba(255, 200, 200, 0.5)',
    zIndex: 0,
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: 'rgba(200, 200, 255, 0.5)',
    zIndex: 0,
  },
});
