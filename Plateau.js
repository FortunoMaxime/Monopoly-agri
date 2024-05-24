import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Text, TouchableOpacity, Modal, TextInput, Button, FlatList} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const Plateau = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [previousMoveX, setPreviousMoveX] = useState(null);
  const [previousMoveY, setPreviousMoveY] = useState(null);

  const [charges, setCharges] = useState([]);
  const [gains, setGains] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCharge, setIsCharge] = useState(true);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('attach-money');
  const [editingItemId, setEditingItemId] = useState(null);

  const outerCircleRef = useRef(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const { moveX, moveY, dx, dy } = gestureState;
      if (previousMoveX !== null && previousMoveY !== null) {
        const angle = rotationAngle + calculateAngleChange(dx, dy);
        setRotationAngle(angle);
      }
      setPreviousMoveX(moveX);
      setPreviousMoveY(moveY);
    },
    onPanResponderRelease: () => {
      setPreviousMoveX(null);
      setPreviousMoveY(null);
    },
  });

  const calculateAngleChange = (dx, dy) => {
    const radius = 150; // Fixed radius
    const circumference = 2 * Math.PI * radius;
    const angleChange = (180 * (dx + dy) / circumference) % 360;
    return angleChange;
  };

  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

  const handleAddOrEditItem = () => {
    if (amount && description) {
      const newItem = { id: editingItemId || Date.now().toString(), amount, description, icon: selectedIcon };

      if (isCharge) {
        setCharges(prev => {
          if (editingItemId) {
            return prev.map(item => (item.id === editingItemId ? newItem : item));
          }
          return [...prev, newItem];
        });
      } else {
        setGains(prev => {
          if (editingItemId) {
            return prev.map(item => (item.id === editingItemId ? newItem : item));
          }
          return [...prev, newItem];
        });
      }

      resetModal();
    }
  };

  const resetModal = () => {
    setModalVisible(false);
    setAmount('');
    setDescription('');
    setSelectedIcon('attach-money');
    setEditingItemId(null);
  };

  const handleEditItem = (item) => {
    setModalVisible(true);
    setAmount(item.amount);
    setDescription(item.description);
    setSelectedIcon(item.icon);
    setEditingItemId(item.id);
    setIsCharge(charges.some(charge => charge.id === item.id));
  };

  const handleDeleteItem = (id) => {
    if (isCharge) {
      setCharges(prev => prev.filter(item => item.id !== id));
    } else {
      setGains(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <MaterialIcons name={item.icon} size={24} color="black" />
      <Text style={styles.itemText}>{item.description}: {item.amount} Ariary</Text>
      <TouchableOpacity onPress={() => handleEditItem(item)}>
        <MaterialIcons name="edit" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <MaterialIcons name="agriculture" size={30} color="white" />
        <MaterialIcons name="grass" size={30} color="white" />
        <MaterialIcons name="park" size={30} color="white" />
      </View>
      <View style={styles.upperContainer}>
        <View style={styles.upperSection}>
          <Text style={styles.upperText}>Charges Mensuelles</Text>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => { setIsCharge(true); setModalVisible(true); }}
          >
            <MaterialIcons name="add" size={30} color="white" />
          </TouchableOpacity>
          <FlatList
            data={charges}
            keyExtractor={(item) => item.id}
            renderItem={renderListItem}
            style={styles.list}
          />
          <Text style={styles.bottomText}>Charges Total: {charges.reduce((total, item) => total + parseFloat(item.amount), 0)} Ariary</Text>
        </View>
        <View style={styles.upperSection}>
          <Text style={styles.upperText}>Gains Mensuels</Text>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => { setIsCharge(false); setModalVisible(true); }}
          >
            <MaterialIcons name="add" size={30} color="white" />
          </TouchableOpacity>
          <FlatList
            data={gains}
            keyExtractor={(item) => item.id}
            renderItem={renderListItem}
            style={styles.list}
          />
          <Text style={styles.bottomText}>Gains Total: {gains.reduce((total, item) => total + parseFloat(item.amount), 0)} Ariary</Text>
        </View>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Budget du Mois: {gains.reduce((total, item) => total + parseFloat(item.amount), 0) - charges.reduce((total, item) => total + parseFloat(item.amount), 0)} Ariary</Text>
      </View>
      <View style={styles.plateauContainer}>
        <TouchableOpacity style={styles.arrowButton}>
          <MaterialIcons name="navigate-before" size={30} color="black" />
          <Text>Précédent</Text>
        </TouchableOpacity>
        <View
          style={[styles.outerCircle, { transform: [{ rotate: `${rotationAngle}deg` }] }]}
          ref={outerCircleRef}
          {...panResponder.panHandlers}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.circle,
                { transform: [{ rotate: `${index * (360 / 12)}deg` }, { translateX: 130 }] }
              ]}
            >
              <Text style={[styles.monthText, { transform: [{ rotate: `${-rotationAngle}deg` }] }]}>{months[index]}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.arrowButton}>
          <MaterialIcons name="navigate-next" size={30} color="black" />
          <Text>Suivant</Text>
        </TouchableOpacity>
        <View style={styles.indicatorContainer}>
          <MaterialIcons name="arrow-drop-up" size={60} color="black" style={styles.indicator} />
        </View>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={resetModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{isCharge ? 'Ajouter une Charge' : 'Ajouter un Gain'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Montant"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <Picker
              selectedValue={selectedIcon}
              style={styles.input}
              onValueChange={(itemValue) => setSelectedIcon(itemValue)}
            >
              <Picker.Item label="Money" value="attach-money" />
              <Picker.Item label="Family" value="family-restroom" />
              <Picker.Item label="Pig" value="pets" />
              {/* Add more icons as needed */}
              </Picker>
              <Button title="Ajouter" onPress={handleAddOrEditItem} />
            </View>
          </View>
        </Modal>
      </View>
    );
  };

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#F7F9FC',
},
topBar: {
flexDirection: 'row',
justifyContent: 'space-around',
padding: 10,
backgroundColor: '#34A853',
},
upperContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
paddingHorizontal: 20,
paddingTop: 20,
height: '36%',
},
upperSection: {
flex: 1,
backgroundColor: '#FFFFFF',
borderRadius: 10,
margin: 10,
padding: 20,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.2,
shadowRadius: 2,
elevation: 5,
},
upperText: {
fontSize: 18,
fontWeight: 'bold',
color: '#333333',
marginBottom: 10,
},
floatingButton: {
position: 'absolute',
bottom: 10,
right: 10,
backgroundColor: '#34A853',
width: 50,
height: 50,
borderRadius: 25,
justifyContent: 'center',
alignItems: 'center',
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.2,
shadowRadius: 2,
elevation: 5,
},
bottomText: {
fontSize: 16,
color: '#666666',
margin: 20,
position: 'absolute',
bottom: 0,
backgroundColor: '#FFFFFF',
},
itemText: {
fontSize: 16,
color: '#666666',
marginTop: 10,
marginLeft: 10,
},
totalContainer: {
backgroundColor: '#FFFFFF',
padding: 20,
marginHorizontal: 30,
borderRadius: 10,
alignItems: 'center',
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.2,
shadowRadius: 2,
elevation: 5,
margin: 20,
},
totalText: {
fontSize: 18,
fontWeight: 'bold',
color: '#333333',
},
plateauContainer: {
height: '50%', // Occupy half of the screen height
width: '100%', // Occupy full width
position: 'absolute',
bottom: 0, // Align to the bottom of the screen
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
paddingVertical: 20,
backgroundColor: '#F7F9FC', // Match background color for seamless look
borderStyle: 'solid',
borderWidth: 1,
borderColor: 'green',
},
outerCircle: {
width: 300,
height: 300,
borderRadius: 150,
borderWidth: 1,
borderColor: '#CCCCCC',
backgroundColor: '#FFFFFF',
justifyContent: 'center',
alignItems: 'center',
position: 'relative',
},
circle: {
position: 'absolute',
width: 40,
height: 40,
borderRadius: 20,
backgroundColor: '#34A853',
justifyContent: 'center',
alignItems: 'center',
},
monthText: {
color: '#FFFFFF',
fontSize: 12,
},
indicatorContainer: {
position: 'absolute',
alignSelf: 'center',
top: 10,
},
indicator: {
transform: [{ rotate: '180deg' }],
},
arrowButton: {
padding: 20,
alignItems: 'center',
},
bottomBar: {
padding: 20,
backgroundColor: '#34A853',
alignItems: 'center',
},
bottomBarText: {
fontSize: 16,
color: '#FFFFFF',
fontWeight: 'bold',
},
modalContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
backgroundColor: '#FFFFFF',
padding: 20,
borderRadius: 10,
width: '80%',
alignItems: 'center',
},
modalTitle: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 20,
},
input: {
width: '100%',
borderBottomWidth: 1,
marginBottom: 20,
padding: 5,
fontSize: 16,
},
list: {
flex: 1,
},
listItem: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
marginBottom: 10,
paddingHorizontal: 10,
borderBottomWidth: 1,
borderBottomColor: '#CCCCCC',
},
});

export default Plateau;

