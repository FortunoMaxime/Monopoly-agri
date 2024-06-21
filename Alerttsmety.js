// AlertCustom.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Alerttsmety = ({ title, message, onOk }) => {
  return (
    <View style={styles.container}>
      <View style={styles.alertBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40, // Offset from bottom edge
    right: 20,  // Offset from right edge
    zIndex: 999, // Ensure it's above other content
  },
  alertBox: {
    backgroundColor: 'rgba(255, 0, 0,0.8)',
    borderRadius: 10,
    padding: 20,
    maxWidth: 300, // Adjust width as needed
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // White text color
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#ffffff', // White text color
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default Alerttsmety;
