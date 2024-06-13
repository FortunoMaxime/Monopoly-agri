import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import Choix from './Choix'; 
import Famakafakana from './famakafakana'; 
import ExcelReader from './excel'; 
import { useNavigation } from '@react-navigation/native'; 
import * as SQLite from 'expo-sqlite';

const { width, height } = Dimensions.get('window');
const HomeScreen = () => {
  const navigation = useNavigation(); 
  const listTitleFontSize = Dimensions.get('window').width * 0.03; 

  const [people, setPeople] = useState([]);
  const [id, setId] = useState('');


  async function recupereDonnees() {
    try {
      const db = await SQLite.openDatabaseAsync('monopoly.db');
      if (!db) {
        throw new Error('Impossible d\'ouvrir la base de données');
      }
      const rows  = await db.getAllAsync('SELECT id, Anarana FROM Mpamokatra');
      setPeople(rows);
      
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }
  
  

  useEffect(() => {
    recupereDonnees();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // State pour la visibilité du modal


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleOpenModal(item.id)}>
      <Ionicons name="person-circle-outline" size={40} color="#68B684" />
      <Text style={styles.title}>{item.Anarana}</Text>
      <TouchableOpacity onPress={() => handleExportMonopoly(item)} style={styles.exportButton}>
        <Ionicons name="ellipsis-vertical" size={24} color="#68B684" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleOpenModal = (itemId) => {
    console.log('ID de l\'élément cliqué:', itemId);
    setId(itemId); // Stockez l'ID dans l'état local
    // Ouvrir le modal uniquement si ce n'est pas déjà ouvert
    if (!modalVisible) {
      setModalVisible(true);
    }
  };
  
  const handleCloseModal = () => {
    setModalVisible(false); // Cacher le modal
  };

  const handleExportMonopoly = (person) => {
    // Implémentez la logique pour exporter le monopoly de la personne sélectionnée
    console.log("Exporting monopoly for", person.id);
  };

  const handleNavigateToInterfaceData = (id) => {
    navigation.navigate('InterfaceData', { itemId: id });
    setModalVisible(false);
    console.log("Navigating to InterfaceData screen with item ID:", id);
  };
  
  const handleNavigateToKilalao = (id) => {
    navigation.navigate('kilalao', { itemId: id});
    setModalVisible(false);
    console.log("Navigating to Kilalao screen with item ID:", id);
  };
  const  makanyexel= () => {
    navigation.navigate('ExcelRender');
    setModalVisible(false);
    
  };
  const handleNewAction = () => {
    navigation.navigate('Famakafakana');
    // Implémentez la logique pour une nouvelle action
    console.log("Performing a new action");
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleNavigateToInterfaceData(id)}>
              <Ionicons name="create-outline" size={24} style={styles.buttonIcon} />
              <Text style={styles.modalButtonText}>AGE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => makanyexel()}>
              <Ionicons name="add-circle-outline" size={24} style={styles.buttonIcon} />
              <Text style={styles.modalButtonText}>Kilalao vaovao</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleNavigateToKilalao(id)}>
              <Ionicons name="time-outline" size={24} style={styles.buttonIcon} />
              <Text style={styles.modalButtonText}>Kilalao taloha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kilalaom-pitatanana</Text>
      </View>
      <View style={styles.listContainerTitle}>
      <Text style={[styles.listTitle,{ fontSize: listTitleFontSize }]}>LISITRY NY MPAMBOLY EFA NANAOVANA MONOPOLY</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Recherche"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search" size={24} color="#68B684" style={styles.searchIcon} />
      </View>
      <FlatList
        data={people}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleOpenModal(item.id)}>
            <Ionicons name="person-circle-outline" size={40} color="#68B684" />
            <Text style={styles.title}>{item.Anarana}</Text>
            <TouchableOpacity onPress={() => handleExportMonopoly(item)} style={styles.exportButton}>
              <Ionicons name="ellipsis-vertical" size={24} color="#68B684" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={[styles.floatingButton]} onPress={handleNewAction}>
       <Ionicons name="add-circle-outline" size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  headerTitle: {
    fontSize: width/20,
    fontWeight: 'bold',
    color: '#303030',
    textAlign: 'center', // Centrer le texte
    textTransform: 'uppercase', // Mettre le texte en majuscules
    letterSpacing: 2, // Espacement entre les lettres
    textShadowColor: '#ccc', // Couleur de l'ombre du texte
    textShadowOffset: { width: 2, height: 2 }, // Décalage de l'ombre
    textShadowRadius: 10, // Rayon de l'ombre
  },  
  listTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#720455', // Violet pastel
    textAlign: 'center',
    letterSpacing: 1, // Ajoute un espacement entre les lettres
    shadowColor: '#000', // Ajoute une ombre
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Ajoute une élévation pour créer un effet de profondeur
  },
  
  listContainer: {
    paddingBottom: 100,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303030',
    marginLeft: 10,
  },
  exportButton: {
    marginLeft: 'auto',
  },
  listContainerTitle: {
    marginLeft: 0,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#68B684',
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#68B684',
    height: height/22,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: '#303030',
  },
  searchIcon: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width:'90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 60,
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
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#be9fbf',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    width:'100%',
    height:70,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default HomeScreen;
