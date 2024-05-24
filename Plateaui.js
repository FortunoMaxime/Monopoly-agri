import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const Plateaui = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleClick = (text) => {
    setDialogText(text);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [panel1Visible, setPanel1Visible] = useState(false);
  const [panel2Visible, setPanel2Visible] = useState(false);

  const togglePanel1 = () => {
    setPanel1Visible(!panel1Visible);
  };

  const togglePanel2 = () => {
    setPanel2Visible(!panel2Visible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.haut, { height: 80 }]} onPress={() => handleClick('')}>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.haut, { height: 80 }]} onPress={() => handleClick('MARTSA')}>
          <Text>MARTSA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.haut, { height: 80 }]} onPress={() => handleClick('APRILY')}>
          <Text>APRILY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.haut, { height: 80 }]} onPress={() => handleClick('MEY')}>
          <Text>MEY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.haut, { height: 80 }]} onPress={() => handleClick('JONA')}>
          <Text>JONA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.haut, { height: 80 }]} onPress={() => handleClick('')}>
          <Text></Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={[styles.column, styles.side ]}>
        <TouchableOpacity style={[styles.milieu1, { height: 120 }]} onPress={() => handleClick('FEBROARY')}>
          <Text>FEBROARY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.milieu1, { height: 120 }]} onPress={() => handleClick('JANOARY')}>
          <Text>JANOARY</Text>
        </TouchableOpacity>
        </View>
        <View style={[styles.column, styles.middle, { backgroundColor: '#bbb' }]}>
          <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'red' }}>Kilalaom-pitatanana</Text>
        </View>
        <View style={[styles.column, styles.side]}>
        <TouchableOpacity style={[styles.milieu1, { height: 120 }]} onPress={() => handleClick('JOLAY')}>
          <Text>JOLAY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.milieu1, { height: 120 }]} onPress={() => handleClick('AOGOSITRA')}>
          <Text>AOGOSITRA</Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.haut, { height: 80 }]} onPress={() => handleClick('')}>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.haut, { height: 80 }]} onPress={() => handleClick('DESAMBRA')}>
          <Text>DESAMBRA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.haut, { height: 80 }]} onPress={() => handleClick('NOVAMBRA')}>
          <Text>NOVAMBRA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.haut, { height: 80 }]} onPress={() => handleClick('OCTOBRA')}>
          <Text>OCTOBRA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.haut, { height: 80 }]} onPress={() => handleClick('SEPTABRA')}>
          <Text>SEPTAMBRA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.haut, { height: 80 }]} onPress={() => handleClick('')}>
          <Text></Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
        <Text style={styles.modalText}>{dialogText}</Text>
        <View style={styles.containerazerty}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.flipazerty} onPress={togglePanel1}>
          <Text>Click to slide the first panel down or up</Text>
          {panel1Visible && (
        <View style={styles.panelazerty}>
          <Text>Hello world!</Text>
        </View>
      )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.flipazerty} onPress={togglePanel2}>
          <Text>Click to slide the second panel down or up</Text>
          {panel2Visible && (
        <View style={styles.panelazerty}>
          <Text>Hello world!</Text>
        </View>
      )}
        </TouchableOpacity>
      </View>
      
    </View>

          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Fermer</Text>
            
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#f1f1f1',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  haut: {
    borderWidth: 1,
    width: '16%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    padding: 10,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  side: {
    backgroundColor: '#f1f1f1',
    width: '19%',
  },
  milieu1: {
    borderWidth: 1,
    height: 120,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    width: '62%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: '#f1f1f1',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  intercontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipButton: {
    padding: 5,
    textAlign: 'center',
    backgroundColor: '#e5eecc',
    borderWidth: 1,
    borderColor: '#c3c3c3',
  },
  flipButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
 
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  containerazerty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  flipazerty: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#e5eecc',
    borderWidth: 1,
    borderColor: '#c3c3c3',
  },
  panelcss:{
    flexDirection: 'row',

  },
  panelazerty: {
     flex: 1,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#e5eecc',
    borderWidth: 1,
    borderColor: '#c3c3c3',
  },
});

export default Plateaui;