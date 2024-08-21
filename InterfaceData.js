import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';
import { useNavigation ,navigation,navigate} from '@react-navigation/native'; 

const MonComposant = () => {
  const route = useRoute();
  const navigation = useNavigation(); 
  const { itemId } = route.params;
  console.log(itemId);

  const [db, setDb] = useState(null);
  const [people, setPeople] = useState([]);
  const [sary, setsary] = useState([]);
  const [Famokarana, setFamokarana] = useState([]);
  const [Fitaovana, setFitaovana] = useState([]);
  const [Manodidina, setManodidina] = useState([]);
  const [Fanamarihana, setFanamarihana] = useState([]);
  const [ataoimport, setimport] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [tableName, setTableName] = useState('');
  const [idtenaiz, setIemid] = useState('');


  useEffect(() => {
    const initializeDB = async () => {
      const db = await SQLite.openDatabaseAsync('monopoly.db');
      setDb(db);
    };
    initializeDB();
  }, []);

  useEffect(() => {
    if (db) {
      fetchData();
    }
  }, [db]);

  const fetchData = useCallback(async () => {
    await recupereDonnees(itemId);
    await recupereSary(itemId);
    await recupereFamokarana(itemId);
    await recupereFitaovampamokarana(itemId);
    await recupereManodidina(itemId);
    await recupereFanamarihana(itemId);
  }, [itemId, db]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const openModal = async (nomTable, itemId) => {
    setIemid(itemId);
    setTableName(nomTable); // Mettre à jour l'état tableName avec le nom de la table
    if (!isModalVisible) {
      // Récupérer les données spécifiques à la table et l'ID sélectionnés
      let result;
      switch(nomTable) {
        case 'Mpamokatra':
          result = await db.getAllAsync(`SELECT * FROM Mpamokatra WHERE id = ?`, [itemId]);
          break;
        case 'Famokarana':
          result = await db.getAllAsync(`SELECT * FROM Famokarana WHERE id = ?`, [itemId]);
          break;
        case 'Fitaovampamokarana':
          result = await db.getAllAsync(`SELECT * FROM Fitaovampamokarana WHERE id = ?`, [itemId]);
          break;
        case 'ManodidinaFamokarana':
          result = await db.getAllAsync(`SELECT * FROM ManodidinaFamokarana WHERE id = ?`, [itemId]);
          break;
        case 'Fanamarihana':
          result = await db.getAllAsync(`SELECT * FROM Fanamarihana WHERE id = ?`, [itemId]);
          break;
        default:
          result = [];
      }
  
      // Mettre à jour les valeurs d'édition avec les valeurs actuelles de la ligne sélectionnée
      setEditValues(result[0] || {});
      setModalVisible(true);
    }
  };
  

  const deleteEntry = async (nomtable,id) => {
    try {
     

      // Supprimer l'entrée principale si la table est "Mpamokatra"
      if (nomtable === 'Mpamokatra') {
        await db.runAsync('DELETE FROM Famokarana WHERE MpamokatraId = ?', [id]);
        await db.runAsync('DELETE FROM Fitaovampamokarana WHERE MpamokatraId = ?', [id]);
        await db.runAsync('DELETE FROM ManodidinaFamokarana WHERE MpamokatraId = ?', [id]);
        await db.runAsync('DELETE FROM Fanamarihana WHERE MpamokatraId = ?', [id]);
        await db.runAsync('DELETE FROM Mpamokatra WHERE id = ?', [id]);
      }
      else{
 // Commencer une transaction pour assurer la cohérence
 await db.runAsync(`DELETE FROM ${nomtable} WHERE MpamokatraId = ?`, [id]);

 await fetchData();
      }
      setModalVisible(false);
      
      navigation.navigate('home');
      
  
      // Rafraîchir les données après suppression
    
    } catch (error) {
      console.error('Erreur lors de la suppression des données:', error);
    }
  };
  

  const updateEntry = async (id) => {
    try {
      const keys = Object.keys(editValues);
      const values = keys.map((key) => editValues[key]);
      const setString = keys.map((key) => `${key} = ?`).join(', ');
  
      console.log(`Updating ${tableName} with values:`, editValues); // Debugging log
      console.log(`SQL: UPDATE ${tableName} SET ${setString} WHERE id = ?`, [...values, id]); // Debugging log
  
      await db.runAsync(`UPDATE ${tableName} SET ${setString} WHERE id = ?`, [...values, id]);
      await fetchData();
      setModalVisible(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données:', error);
    }
  };
  

  const handleInputChange = (key, value) => {
    setEditValues({ ...editValues, [key]: value });
  };

  const recupereDonnees = async (id) => {
    try {
      const result = await db.getAllAsync(`SELECT id, Anarana, Manambady, Toerana, Kaominina, Fokotany FROM Mpamokatra WHERE id = ?`, [id]);
      setPeople(result);
      setEditValues(result[0]); // Initialiser les valeurs d'édition avec les valeurs actuelles
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const recupereSary = async (id) => {
    try {
      const result = await db.getAllAsync(`SELECT ImageBase64 FROM Mpamokatra WHERE id = ?`, [id]);
      setsary(result[0].ImageBase64);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const recupereFamokarana = async (id) => {
    try {
      const result = await db.getAllAsync('SELECT * FROM Famokarana WHERE MpamokatraId = ?', [id]);
      setFamokarana(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const recupereFitaovampamokarana = async (id) => {
    try {
      const result = await db.getAllAsync('SELECT * FROM Fitaovampamokarana WHERE MpamokatraId = ?', [id]);
      setFitaovana(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const recupereManodidina = async (id) => {
    try {
      const result = await db.getAllAsync('SELECT * FROM ManodidinaFamokarana WHERE MpamokatraId = ?', [id]);
      setManodidina(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const recupereFanamarihana = async (id) => {
    try {
      const result = await db.getAllAsync('SELECT * FROM Fanamarihana WHERE MpamokatraId = ?', [id]);
      setFanamarihana(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const recupereImport = async (id) => {
    try {
      const result = await db.getAllAsync('SELECT NomFeuille FROM FeuilleImporter WHERE MpamokatraId = ?', [id]);
      setimport(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const transposeTable = (table) => {
    const transposedTable = [];
    const headers = Object.keys(table?.[0] ?? {});

    for (let i = 1; i < headers.length - 1; i++) {
      const column = headers[i];
      const transposedRow = { column };

      for (let j = 0; j < table?.length ?? 0; j++) {
        const row = table[j];
        transposedRow[`row${j + 1}`] = row?.[column] ?? '';
      }
      transposedTable.push(transposedRow);
    }

    return transposedTable;
  };

  const transposedpeople = transposeTable(people);
  const transposedfamokarana = transposeTable(Famokarana);
  const transposedfitaovana = transposeTable(Fitaovana);
  const transposedManodidina = transposeTable(Manodidina);
  const transposedfFanamarihana = transposeTable(Fanamarihana);

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => deleteEntry(tableName, itemId)}>
              <Ionicons name="trash-outline" size={24} style={styles.buttonIcon} />
              <Text style={styles.modalButtonText}>Fafana</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => updateEntry(idtenaiz)}>
              <Ionicons name="create-outline" size={24} style={styles.buttonIcon} />
              <Text style={styles.modalButtonText}>Ovana</Text>
            </TouchableOpacity>
            <ScrollView>
            {Object.keys(editValues).map((key, index) => {
            if (key !== 'id'&& key !== 'ImageBase64') {
              return (
                <View key={index} style={styles.inputRow}>
                  <Text style={styles.inputLabel}>{key}</Text>
                  <TextInput
                    style={styles.input}
                    value={editValues[key]}
                    onChangeText={(value) => handleInputChange(key, value)}
                  />
                </View>
              );
            }
            return null; // Ne rien rendre pour la clé 'id'
          })}

            </ScrollView>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.space} />
        <Text style={styles.title}>Mpamokatra:</Text>
        <View style={styles.mpamokatra}>
          <View style={styles.imageP}>

          {sary && typeof sary === 'string'? (
        <Image
          source={{ uri: sary }}
          style={styles.floatingButton}
        />
      ) : (
        <Text>Erreur : L'URL de l'image est invalide.</Text>
      )}
          </View>
          <View style={styles.tableP}>
            {transposedpeople.map((row, index) => (
              <View style={styles.tableRowP} key={index}>
                <Text style={styles.columnHeaderMpamokatra}>{row.column}</Text>
                {Object.values(row)
                  .slice(1)
                  .map((value, index) => (
                    <TouchableOpacity key={index} onPress={() => openModal('Mpamokatra', itemId)}>
                      <Text style={styles.tableCell}>{value}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            ))}
          </View>
        </View>
        <View style={styles.space} />
        <Text style={styles.title}>Famokarana:</Text>
        <View style={styles.table}>
          {transposedfamokarana.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.columnHeader}>{row.column}</Text>
              {Object.values(row).slice(1)
                .map((value, index) => (
                    <TouchableOpacity key={index} onPress={() => openModal('Famokarana', itemId)}>
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
                  <Text style={styles.tableCell} key={index}onPress={() => openModal('Fitaovampamokarana', itemId)}>
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
                  <Text style={styles.tableCell} key={index} onPress={() => openModal('ManodidinaFamokarana', itemId)}>
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
                  <Text style={styles.tableCell} key={index}onPress={() => openModal('Fanamarihana', itemId)}>
                    {value}
                  </Text>
                ))}
            </View>
          ))}
        </View>
    
      </ScrollView>
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
  mpamokatra: {
    height: '37%',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 10,
    margin: 10,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  imageP: {
    width: '35%',
    height: '80%',
    marginRight: 10,
  },
  tableP: {
    paddingLeft: '1%',
    flexDirection: 'column',
    width: '70%',
    borderWidth: 0.5,
    borderColor: '#007bff',
    borderRadius: 3,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'column',
    flex: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 0.5,
  },
  tableRowP: {
    flexDirection: 'row',
    flex: 1,
    borderTopColor: '#dddddd',
    marginLeft: '5%',
    borderTopWidth: 0.5,
  },
  columnHeaderMpamokatra: {
    width: '30%',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 60,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    width: '100%',
    height: 70,
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
  floatingButton: {
    borderRadius: 90,
    width: '90%',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  excelimage: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: '2' },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowray: {
    flexDirection: 'column',
    flex: 1,
    padding: '20px',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputLabel: {
    width: '30%',
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '70%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
});

export default MonComposant;
