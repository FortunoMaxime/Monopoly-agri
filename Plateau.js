import React, { useState, useRef } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const Plateau = () => {
  const [charges, setCharges] = useState([]);
  const [gains, setGains] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCharge, setIsCharge] = useState(true);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('attach-money');
  const [editingItemId, setEditingItemId] = useState(null);
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());

  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

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
      <Text style={styles.itemText}>{item.description}: {item.amount} Ar</Text>
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
        <Text style={styles.topBarText}>{months[activeMonth]}</Text>
      </View>
      <View style={styles.upperContainer}>
        <View style={styles.upperSection}>
          <Text style={styles.upperText}>Fandaniana</Text>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => { setIsCharge(true); setModalVisible(true); }}
          >
            <MaterialIcons name="add" size={30} color="white" />
          </TouchableOpacity>
          <ImageBackground source={require('./assets/bg/depense.jpg')} resizeMode="cover" style={styles.image}>
          <FlatList
            data={charges}
            keyExtractor={(item) => item.id}
            renderItem={renderListItem}
            style={styles.list}
          />
          </ImageBackground>
          <Text style={styles.bottomText}>Totaly : {charges.reduce((total, item) => total + parseFloat(item.amount), 0)} Ar</Text>
        </View>
        <View style={styles.upperSection}>
          <Text style={styles.upperText}>Vola Miditra</Text>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => { setIsCharge(false); setModalVisible(true); console.log('cliqué le bouton ajouter'); }}
          >
            <MaterialIcons name="add" size={30} color="white" />
          </TouchableOpacity>
          <ImageBackground source={require('./assets/bg/gain.jpg')} resizeMode="cover" style={styles.image}>
          <FlatList
            data={gains}
            keyExtractor={(item) => item.id}
            renderItem={renderListItem}
            style={styles.list}
          />
          </ImageBackground>
          <Text style={styles.bottomText}>Totaly : {gains.reduce((total, item) => total + parseFloat(item.amount), 0)} Ar</Text>
        </View>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Vola ampelantanana : {gains.reduce((total, item) => total + parseFloat(item.amount), 0) - charges.reduce((total, item) => total + parseFloat(item.amount), 0)} Ariary</Text>
      </View>
      <View style={styles.monthsContainer}>
        <View style={styles.sideContainerTop}>
          {["Janvier", "Février", "Mars", "Avril"].map((month, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.monthItem, months.indexOf(month) === activeMonth && styles.activeMonth]}
              onPress={() => setActiveMonth(months.indexOf(month))}
            >
              <Text style={styles.monthText}>{month}</Text>
              {months.indexOf(month) === activeMonth && <MaterialIcons name="place" size={24} color="red" />}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.sideContainerLeft}>
            {["Décembre", "Novembre"].map((month, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.monthItem, months.indexOf(month) === activeMonth && styles.activeMonth]}
                onPress={() => setActiveMonth(months.indexOf(month))}
              >
                <Text style={styles.monthText}>{month}</Text>
                {months.indexOf(month) === activeMonth && <MaterialIcons name="place" size={24} color="red" />}
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.diceContainer}>
            <TouchableOpacity onPress={() => setActiveMonth(Math.floor(Math.random() * 12))}>
              <MaterialIcons name="casino" size={width/15} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveMonth(Math.floor(Math.random() * 12))}>
              <MaterialIcons name="casino" size={width/15} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.sideContainerRight}>
            {["Mai", "Juin"].map((month, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.monthItem, months.indexOf(month) === activeMonth && styles.activeMonth]}
                onPress={() => setActiveMonth(months.indexOf(month))}
              >
                <Text style={styles.monthText}>{month}</Text>
                {months.indexOf(month) === activeMonth && <MaterialIcons name="place" size={24} color="red" />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.sideContainerBottom}>
          {["Octobre", "Septembre", "Août", "Juillet"].map((month, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.monthItem, months.indexOf(month) === activeMonth && styles.activeMonth]}
              onPress={() => setActiveMonth(months.indexOf(month))}
            >
              <Text style={styles.monthText}>{month}</Text>
              {months.indexOf(month) === activeMonth && <MaterialIcons name="place" size={24} color="red" />}
            </TouchableOpacity>
          ))}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: height / 200,
    backgroundColor: '#34A853',
  },
  topBarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    height: height * 0.35,
  },
  upperSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    flex: 1,
    flexDirection: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width : '100%',
    height : '80%',
  },
  upperText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#34A853',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    zIndex : 33,
  },
  bottomText: {
    fontSize: 14,
    color: '#666666',
    margin: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFFFFF',
  },
  itemText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
    marginLeft: 5,
  },
  totalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    height: height * 0.45,
  },
  sideContainerLeft: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sideContainerRight: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderColor: 'green',
    marginLeft: 'auto',
    marginRight : width/100,
  },
  sideContainerTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
  },
  sideContainerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
    borderColor: 'blue',
    margin: 'auto',
  },
  middleContainer: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: width/200,
  },
  diceContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34A853',
    height: width * 0.15,
    width: width * 0.15,
    marginVertical: 'auto',
    marginHorizontal: width / 5,
    borderRadius: 10,
  },
  monthItem: {
    width: width * 0.22,
    height: width * 0.12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#825391',
    margin: 5,
    borderRadius: 5,
    marginVertical: height/150,
  },
  monthText: {
    fontSize: width/40,
    color: '#FFFFFF',
  },
  activeMonth: {
    backgroundColor: '#4E9F3D',
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
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    backgroundColor : '#fff',
  },
});

export default Plateau;