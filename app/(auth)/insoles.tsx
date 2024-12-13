import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';

const insoleData = [
  {
    id: '1',
    title: 'Normal Arch',
    productName: 'Ideastep XD-736 ComfortMax Breathable Arch Support Insoles',
    description: 'The content of these insoles is truly remarkable. They are made with high elastic sponge that offers superior cushioning and flexibility. This ensures your customers enjoy maximum comfort with every step they take, reducing fatigue and enhancing their overall experience.',
    image: require('../../assets/images/SPORTS-INSOLES.png'),
  },
  {
    id: '2',
    title: 'Flat Feet',
    productName: 'IDEASTEP 055-22# Advanced Shock-absorbing Sports Insoles with Antibacterial Protection and Arch Support',
    description: 'These insoles are specifically engineered to target and alleviate pain in the arch, while also stabilizing the hind foot for improved balance and performance. Whether you suffer from plantar fasciitis or simply seek relief from general foot discomfort, our insoles are the perfect solution.',
    image: require('../../assets/images/Flat Foot Insole.png'),
  },
  {
    id: '3',
    title: 'High Arch',
    productName: 'Heated Insoles Cycling Moldable Walk Fit Orthotic Insoles Ideastep M+3-1#',
    description: 'Ideal for high arches, offering firm arch support and shock absorption.',
    image: require('../../assets/images/High Arch Insole.png'),
  },
];

const InsoleProductPage = () => {
  const [selectedInsole, setSelectedInsole] = useState(insoleData[0]);

  const getImageStyle = (id) => {
    if (id === '2') {
      return styles.productImageFlatFoot;
    } else if (id === '3') {
      return styles.productImageHighArch;
    }
    return styles.productImage;
  };

  const getContainerStyle = (id) => {
    if (id === '2') {
      return [styles.marginFlatFoot];
    } else if (id === '3') {
      return [styles.marginHighArch];
    }
    return [styles.marginNormalArch];
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />

      <Text style={styles.title}>{selectedInsole.title}</Text>
      <Text style={styles.productName}>{selectedInsole.productName}</Text>

      <View style={[styles.imageContainer, ...getContainerStyle(selectedInsole.id)]}>
        <Image source={selectedInsole.image} style={getImageStyle(selectedInsole.id)} />
      </View>

      <Text style={styles.description}>{selectedInsole.description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={styles.imageList}
        showsHorizontalScrollIndicator={false}
      >
        {insoleData.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => setSelectedInsole(item)}>
            <Image source={item.image} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7A6229',
    marginBottom: 10,
    marginTop: 15,
  },
  productName: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    marginRight: 15,
  },
  imageContainer: {
    alignItems: 'center',
  },
  marginNormalArch: {
    marginTop: 85,
    marginBottom: 100,
  },
  marginFlatFoot: {
    marginTop: 10,
    marginBottom: 25,
  },
  marginHighArch: {
    marginTop: 20,
    marginBottom: 40,
  },
  productImage: {
    width: 500,
    height: 175,
    transform: [{ rotate: '-35deg' }],
    resizeMode: 'contain',
  },
  productImageFlatFoot: {
    width: 400,
    height: 325,
    transform: [{ rotate: '-5deg' }],
    resizeMode: 'contain',
  },
  productImageHighArch: {
    width: 450,
    height: 375,
    transform: [{ rotate: '10deg' }],
    resizeMode: 'contain',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  imageList: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    resizeMode: 'contain',
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

export default InsoleProductPage;
