import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Choix = ({ handleCloseModal }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity set to 0
  const slides = [
    { image: require('./cottages.jpg'), caption: 'Ny asanareo no fanalahidin\'ny firoboroboan\'i Madagasikara' },
    { image: require('./rice.jpg'), caption: 'Ny voa rehetra nambolenao dia dingana mankany amin\'ny hoavy tsara kokoa' },
    { image: require('./road.jpg'), caption: 'Ny fanoloran-tenanao dia mamelona ny fianakaviantsika sy ny firenentsika' },
  ];

  const handleNavigate = () => {
    handleCloseModal(); // Fermez le modal lors de la navigation
    // Implémentez votre logique de navigation ici
    console.log("Navigating to another screen...");
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.slideshowContainer}>
        <Text style={styles.modalTitle}>Titre du Modal</Text>
        <View style={styles.imageContainer}>
          <Image source={slides[slideIndex].image} style={styles.image} />
          <Animated.Text style={[styles.caption, { opacity: fadeAnim }]}>{slides[slideIndex].caption}</Animated.Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
          <MaterialIcons name="explore" size={24} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Naviguer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
          <MaterialIcons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  slideshowContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 200,
    borderRadius: 20, // Rounded corners
    marginBottom: 10,
  },
  caption: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#34A853',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Choix;
