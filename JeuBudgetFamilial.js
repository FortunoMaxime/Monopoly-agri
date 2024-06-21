import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { DataTable } from 'react-native-paper';
import { insertDonneexel, getLastId } from './database';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import AlertCustom from './AlertCustom';
import { useRoute } from '@react-navigation/native'; 

const JeuBudgetFamilial = () => {
const route = useRoute();
const { itemId } = route.params;
  const [somme, setsomme] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState([
      ['Karazany', 'Janoary', 'Febroary', 'Marsa', 'April', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Descembra', 'Totaly'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ]);
  const [TotaltyFandanina, setFandanina] = useState([
      ['Totaly','', '', '', '', '', '', '', '', '', '', '', '', ''],
  ]);

  useEffect(() => {
 recupereDonnees1(itemId)
}, [itemId]);
function toggleEditable() {
  setIsEditable(prevState => !prevState);
}

const recupereDonnees1 = async (id) => {
  try {
      const db = await SQLite.openDatabaseAsync('monopoly.db');
      let result = await db.getAllAsync(`SELECT Karazany, Janvier, Fevrier, Mars, Avril, Mai, Juin, Juillet, Aout, Sepetembre, Octobre, Novembre, Descembre FROM FilanaIsambolana WHERE MpamokatraId=${id}`);

      for (let i = 0; i < result.length; i++) {
          for (let key in result[i]) { // Parcourir les propriétés de chaque objet
              if (result[i][key] === "") {
                  result[i][key] = 0; // Remplacer les valeurs vides par 0
              }
             
          }
      }
      const processedData = result.map(row => [
        
          row.Karazany, row.Janvier, row.Fevrier, row.Mars, row.Avril, row.Mai, row.Juin, row.Juillet, row.Aout, row.Sepetembre, row.Octobre, row.Novembre, row.Descembre,
          // Calculer le total pour chaque ligne
          Object.values(row).slice(1).reduce((acc, val) => acc + parseInt(val, 10), 0).toString()
      ]);
     
      combinedData = [data[0],...processedData];
      setData(combinedData);

     
  } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
  }
};

const calculateTotalSum = () => {
      const sum = TotaltyFandanina[0].slice(1).reduce((acc, val) => {
          const num = parseFloat(val);
          return acc + (isNaN(num) ? 0 : num);
      }, 0);
      setsomme(sum.toString());
  };

  const handleIconClick = () => {
    setShowAlert(true); // Active l'affichage de l'alerte
  };

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false); // Désactive l'affichage de l'alerte après un délai
      }, 3000); // Puisque nous utilisons un composant personnalisé, vous pouvez ajuster le timing comme vous le souhaitez
    }
  }, [showAlert]);
  return (
      <ScrollView style={styles.container}>
          <Text style={{ fontSize: 20, padding: 10 }}>Filan'ny fianakaviana:</Text>
          <ScrollView horizontal={true}>
              <DataTable>
                  <DataTable.Header>
                      {data[0].map((header, index) => (
                          <DataTable.Title key={index}>{header}</DataTable.Title>
                      ))}
                  </DataTable.Header>

                  {data.slice(1).map((row, rowIndex) => (
                      <DataTable.Row key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                              <DataTable.Cell key={cellIndex} style={styles.cell}>
                                  {cellIndex === data[0].length - 1 ? (
                                      <TextInput
                                          value={cell}
                                          editable={false}
                                          style={[styles.input, styles.cell]}
                                      />
                                  ) : (
                                      <TextInput
                                          value={cell}
                                          editable={isEditable}
                                          onChangeText={(text) => handleCellChange(rowIndex + 1, cellIndex, text)}
                                          style={[styles.input, styles.cell]}
                                      />
                                  )}
                              </DataTable.Cell>
                          ))}
                      </DataTable.Row>
                  ))}
              </DataTable>
          </ScrollView>
          <ScrollView horizontal={true}>
          <DataTable>
              
          {TotaltyFandanina.map((row, rowIndex) => (
                    <DataTable.Row key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <DataTable.Cell key={cellIndex} style={styles.cell}>
                                <TextInput
                                    value={cell}
                                    editable={false}
                                    style={[styles.input, styles.cell]}
                                />
                            </DataTable.Cell>
                        ))}
                    </DataTable.Row>
                ))}
            </DataTable>
      </ScrollView>
      <TouchableOpacity style={[styles.floatingButton, { backgroundColor: isEditable ? '#68B684' : '#2196F3' }]} onPress={toggleEditable}>
      {isEditable ? (
         <Ionicons name="checkmark-circle" size={40} color="#fff" onPress={handleIconClick} />
      ) : (
        <Ionicons name="create" size={40} color="#fff" />
      )}
    </TouchableOpacity>
    {showAlert && <AlertCustom title="Modification enregistrée" message="Votre modification a été enregistrée avec succès." onOk={() => console.log('OK Pressed')} />}
          <View style={styles.space} />
          
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  space: {
      height: 100,
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

  input: {
      borderWidth: 1,
      borderColor: '#e8eaf6',
      padding: 10,
      borderRadius: 5,
  },
  cell: {
      width: 100,
  },
  addButton: {
      marginTop: 20,
      backgroundColor: '#673ab7',
      color: '#fff',
      borderRadius: 5,
      width: '20%',
  },
  panel: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      height: '50%',
  },
 
});

export default JeuBudgetFamilial;


