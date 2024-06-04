import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
//import { GestureHandlerRootView } from 'react-native-gesture-handler';
const StartupAnimation = () => {
  const navigation = useNavigation();

 useEffect(() => {
    // Déclencher la navigation vers la page d'accueil après 5 secondes
    const timer = setTimeout(() => {
      navigation.navigate('home'); // Assurez-vous que 'home' est le nom correct de votre écran d'accueil
    }, 3000);

    // Nettoyer le timer lorsque le composant est démonté
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="fadeIn"
        duration={3000}
        source={require('./animation.gif')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F0E9',
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default StartupAnimation;
