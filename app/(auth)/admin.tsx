import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

const AdminInsoleRecommendation = () => {
  const [selectedArch, setSelectedArch] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isArchModalVisible, setIsArchModalVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const data = {
    highArch: [
      {
        id: '1',
        name: 'Allan Patrick',
        bio: 'Age: 22 Occupation: Programmer',
        image: require('../../assets/images/allanPatrick.png'),
      },
      {
        id: '2',
        name: 'Marl Potal',
        bio: 'Age: 21 Occupation: Network Engineer',
        image: require('../../assets/images/marlPotal.png'),
      },
    ],
    normalArch: [
      {
        id: '3',
        name: 'Hev Yzabel',
        bio: 'Age: 23 Occupation: System Administrator',
        image: require('../../assets/images/hevYzabel.png'),
      },
      {
        id: '4',
        name: 'Jaira Maculada',
        bio: 'Age: 22 Occupation: Network Specialist',
        image: require('../../assets/images/jairaMaculada.png'),
      },
    ],
    flatFooted: [
      {
        id: '5',
        name: 'Janjan Leo',
        bio: 'Age: 25 Occupation: Programmer',
        image: require('../../assets/images/janjanLeo.png'),
      },
      {
        id: '6',
        name: 'Joram Gomez',
        bio: 'Age: 24 Occupation: Programmer',
        image: require('../../assets/images/joramGomez.png'),
      },
    ],
  };

  const archColors = {
    highArch: '#F4B949',
    normalArch: '#B9E0F9',
    flatFooted: '#F4B949',
  };

  const handleArchPress = (archType) => {
    setSelectedArch(archType);
    setIsArchModalVisible(true);
  };

  const handlePersonPress = (person) => {
    setSelectedPerson(person);
  };

  const getFilteredPersons = () => {
    if (!selectedArch || !data[selectedArch]) return [];
    const persons = data[selectedArch];
    return persons.filter((person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />
      <Image
        source={require('../../assets/images/Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.header}>Admin View</Text>

      <View style={styles.columnContainer}>
        {Object.keys(data).map((archType) => (
          <TouchableOpacity
            key={archType}
            style={[styles.archButton, { backgroundColor: archColors[archType] }]}
            onPress={() => handleArchPress(archType)}
          >
            <Text style={styles.archText}>{archType.replace(/([A-Z])/g, ' $1').trim()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Arch Modal */}
      <Modal
        visible={isArchModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsArchModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: archColors[selectedArch] || '#fff' }]}>
            <Text style={styles.modalHeader}>
              {selectedArch === 'highArch'
                ? 'High Arch'
                : selectedArch === 'normalArch'
                ? 'Normal Arch'
                : 'Flat Footed'}
            </Text>

            <TextInput
              style={styles.searchBar}
              placeholder="Search name..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <FlatList
              data={getFilteredPersons()}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.personTouchable}
                  onPress={() => handlePersonPress(item)}
                >
                  <Text style={styles.personName}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={styles.noResultsText}>No results found</Text>}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsArchModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Person Modal */}
      {selectedPerson && (
        <Modal
          visible={!!selectedPerson}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSelectedPerson(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContainer, { backgroundColor: archColors[selectedArch] || '#fff' }]}>
              {selectedPerson.image && (
                <Image source={selectedPerson.image} style={styles.personImage} />
              )}
              <Text style={styles.personName}>{selectedPerson.name}</Text>
              <Text style={styles.bioDetail}>{selectedPerson.bio}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedPerson(null)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};


export default AdminInsoleRecommendation;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f9f9f9',
      justifyContent: 'center',
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
    logo: {
      width: 300,
      height: 300,
      alignSelf: 'center',
      marginBottom: 20, 
    },
    header: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    columnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 40, // Increase vertical margin
    },
    archButton: {
      flex: 1,
      marginHorizontal: 10,
      padding: 20,
      borderRadius: 8,
      width: '30%',
      alignItems: 'center',
    },
    archText: {
      color: '#fff',
      fontSize: 18,
      marginTop: 10,
    },
    largePathologistImage: {
      width: 100,
      height: 100,
    },
    searchBar: {
      height: 40,
      borderColor: '#EECDA2',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 10,
      marginVertical: 10,
    },
    personTouchable: {
      padding: 10,
    },
    personName: {
      fontSize: 16,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      alignSelf: 'center',
    },
    personImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'center',
    },
    bioDetail: {
      flexDirection: 'row',
      fontSize: 16,
      marginVertical: 5,
      color: '#666',
    },
    detailLabel: {
      fontWeight: 'bold',
      color: '#333',
    },
    detailValue: {
      color: '#666',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '90%',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
    },
    modalHeader: {
      fontSize: 28,
      color: '#575756',
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
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
      adminButton: {
        backgroundColor: '#F4B949',
        paddingVertical: 5,  // Smaller padding for a smaller button
        paddingHorizontal: 15,
        borderRadius: 15,
        position: 'absolute',
        top: 20,
        right: 20,  // Align button to the right
      },
  });
  
export default AdminInsoleRecommendation;