import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal,StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';
import { deleteDataFromTable} from './database';


const db = SQLite.openDatabase('monopoly.db');

const MonComposant = () => {
  const route = useRoute();
  const { itemId } = route.params;
  const [people, setPeople] = useState([]);
  const [Famokarana, setFamokarana] = useState([]);
  const [Fitaovana, setFitaovana] = useState([]);
  const [Manodidina, setManodidina] = useState([]);
  const [Fanamarihana, setFanamarihana] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  let idtable;
  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Fonction pour ouvrir le modal
 const openModal = (id) => {
  idtable=id;
  setIsModalVisible(true);
};



  useEffect(() => {
    async function fetchData() {
      await recupereDonnees(itemId);
      await recupereFamokarana(itemId);
      await recupereFitaovampamokarana(itemId);
      await recupereManodidina(itemId);
      await recupereFanamarihana(itemId);
    }
    fetchData();
  }, [itemId]);

  async function recupereDonnees(id) {
   
    try {
      
      const result = await db.transactionAsync(async tx => {
        const result = await tx.executeSqlAsync('SELECT * FROM Mpamokatra WHERE id =?', [id]);
        console.log(result.rows);
        setPeople(result.rows);
      }, false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }
  async function recupereFamokarana(id) {
    try {
      const result = await db.transactionAsync(async tx => {
        // Utilisez la clause WHERE pour filtrer les données par ID
        const result = await tx.executeSqlAsync('SELECT * FROM Famokarana WHERE MpamokatraId=?', [id]);
        console.log('Données récupérées:', result.rows);
        // Mettre à jour l'état avec les données récupérées
        setFamokarana(result.rows);
        
        
      }, false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }
  async function recupereFitaovampamokarana(id) {
    try {
      const result = await db.transactionAsync(async tx => {
        // Utilisez la clause WHERE pour filtrer les données par ID
        const result = await tx.executeSqlAsync('SELECT * FROM Fitaovampamokarana WHERE MpamokatraId=?', [id]);
        console.log('Données récupérées:', result.rows);
        // Mettre à jour l'état avec les données récupérées
        setFitaovana(result.rows);
        
        
      }, false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }
  async function recupereManodidina(id) {
    try {
      const result = await db.transactionAsync(async tx => {
        // Utilisez la clause WHERE pour filtrer les données par ID
        const result = await tx.executeSqlAsync('SELECT * FROM ManodidinaFamokarana WHERE MpamokatraId=?', [id]);
        console.log('Données récupérées:', result.rows);
        // Mettre à jour l'état avec les données récupérées
        setManodidina(result.rows);
        
        
      }, false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }
  async function recupereFanamarihana(id) {
    try {
      const result = await db.transactionAsync(async tx => {
        // Utilisez la clause WHERE pour filtrer les données par ID
        const result = await tx.executeSqlAsync('SELECT * FROM Fanamarihana WHERE MpamokatraId=?', [id]);
        console.log('Données récupérées:', result.rows);
        // Mettre à jour l'état avec les données récupérées
        setFanamarihana(result.rows);
        
        
      }, false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }
  const transposeTable = (table) => {
    const transposedTable = [];
    const headers = Object.keys(table?.[0]?? {});

    for (let i = 1; i < headers.length; i++) {
      const column = headers[i];
      const transposedRow = { column };

      for (let j = 0; j < table?.length?? 0; j++) {
        const row = table[j];
        transposedRow[`row${j + 1}`] = row?.[column]?? '';
      }

      transposedTable.push(transposedRow);
    }

    return transposedTable;
  };

  const transposedpeople= transposeTable(people);
  const transposedfamokarana= transposeTable(Famokarana);
  const transposedfitaovana= transposeTable(Fitaovana);
  const transposedManodidina= transposeTable(Manodidina);
  const transposedfFanamarihana= transposeTable(Fanamarihana);
  
  

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() =>deleteDataFromTable('Mpamokatra',selectedRows)}>
              <Ionicons name="trash-outline" size={24} style={styles.buttonIcon} />
              <Text style={styles.modalButtonText}>Fafana</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleNavigateToKilalao(id)}>
              <Ionicons name="create-outline" size={24} style={styles.buttonIcon} />
              <Text style={styles.modalButtonText}>Ovana</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
       <View style={styles.space} />
      <Text style={styles.title}>Mpamokatra:</Text>
      <View style={styles.table}>
        {transposedpeople.map((row, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.columnHeader}>{row.column}</Text>
            {Object.values(row)
             .slice(1)
             .map((value, index) => (
              <TouchableOpacity key={index} onPress={() => openModal(value.id)}>
              <Text style={styles.tableCell}>{value}</Text>
            </TouchableOpacity>
              ))}
          </View>
        ))}
      </View>
      <View style={styles.space} />
      <Text style={styles.title}>Famokarana:</Text>
      <View style={styles.table}>
        {transposedfamokarana.map((row, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.columnHeader}>{row.column}</Text>
            {Object.values(row)
             .slice(1)
             .map((value, index) => (
              <TouchableOpacity key={index} onPress={() => openModal()}>
              <Text style={styles.tableCell}>{value}</Text>
            </TouchableOpacity>
              ))}
          </View>
        ))}
      </View>
      <View style={styles.space} />
      <Text style={styles.title}>Fitaovampamokarana:</Text>
      <View style={styles.table}>
        {transposedfitaovana.map((row, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.columnHeader}>{row.column}</Text>
            {Object.values(row)
             .slice(1)
             .map((value, index) => (
                <Text style={styles.tableCell} key={index}>
                  {value}
                </Text>
                
              ))}
          </View>
        ))}
      </View>
      <View style={styles.space} />
      <Text style={styles.title}>Manodidinany famokarana:</Text>
      <View style={styles.table}>
        {transposedManodidina.map((row, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.columnHeader}>{row.column}</Text>
            {Object.values(row)
             .slice(1)
             .map((value, index) => (
                <Text style={styles.tableCell} key={index}>
                  {value}
                </Text>
              ))}
          </View>
        ))}
      </View>
      <View style={styles.space} />
      <Text style={styles.title}>Fanamarihana:</Text>
      <View style={styles.table}>
        {transposedfFanamarihana.map((row, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.columnHeader}>{row.column}</Text>
            {Object.values(row)
             .slice(1)
             .map((value, index) => (
                <Text style={styles.tableCell} key={index}>
                  {value}
                </Text>
              ))}
          </View>
        ))}
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, 
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600', 
    marginBottom: 12, 
    color: '#333333', 
  },
  table: {
    flexDirection: 'row',
    marginTop: 14, 
    borderWidth: 0.5, 
    borderColor: '#007bff', 
    borderRadius: 3, 
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'column',
    flex: 1,
    borderTopWidth: 0.5, 
    borderTopColor: '#dddddd', 
  },
  columnHeader: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 4,
    paddingHorizontal: 8, 
    fontWeight: '500', 
    color: '#777777',
  },
  tableCell: {
    paddingVertical: 4,
    paddingHorizontal: 8, 
    margin: 1, 
    color: '#999999',
  },
  space: {
    height: 24, 
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
  }
});


export default MonComposant;
