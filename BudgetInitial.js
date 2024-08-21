import React, { useState,useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView,  Text,TouchableOpacity,Button } from 'react-native';
import { DataTable } from 'react-native-paper';
import { copyColumnData,getLastId,insertDonneexel,insertdonnetable} from './database';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import AlertCustom from './AlertCustom'; 
import { useRoute } from '@react-navigation/native';

export default function BudgetInitial() {
    const [showAlert, setShowAlert] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    const route = useRoute();
    const { itemId } = route.params;
    console.log('itole route',route.params)

  const [data, setData] = useState([
      ['Karazany', 'Janoary', 'Febroary', 'Marsa', 'April', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Desambra', 'Totaly'],
  ]);
  const [data1, setData1] = useState([
    ['Karazany', 'Janoary', 'Febroary', 'Marsa', 'April', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Desambra', 'Totaly'],
]);
const [data2, setData2] = useState([
    ['','Janoary', 'Febroary', 'Marsa', 'April', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Desambra'],
    ['','', '', '', '', '', '', '', '', '', '', '', ''],
]);
const [data3, setData3] = useState([
    ['','Janoary', 'Febroary', 'Marsa', 'April', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Desambra'],
    ['','', '', '', '', '', '', '', '', '', '', '', ''],
]);

const [TotaltyFandanina, setFandanina] = useState([
    ['Totaly','', '', '', '', '', '', '', '', '', '', '', '', ''],
]);

const [TotaltyFidirana, setFidirana] = useState([
    ['Totaly','', '', '', '', '', '', '', '', '', '', '', '', ''],
]);
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

  useEffect(() => {
    recupereDonnees1(itemId);
    recupereDonnees2(itemId);

  }, [itemId]);

  useEffect(() => {
    updateTotaltyFandanina();
  
  }, [data]);

  useEffect(() => {
    updateTotaltyFidirana();

  }, [data1]);

  useEffect(() => {
    updateData2();
}, [data3, TotaltyFidirana, TotaltyFandanina]);
useEffect(() => {
    const result = andranavolafarany(TotaltyFandanina,TotaltyFidirana,data2);
    console.log('result',result);
    const combinedData = [ data3[0], [...result] ];
    setData3(combinedData);
      console.log('comine',combinedData);
}, [ TotaltyFidirana, TotaltyFandanina]);

function toggleEditable() {
    setIsEditable(prevState => !prevState);
}

const recupereDonnees1 = async (id) => {
    try {
        const db = await SQLite.openDatabaseAsync('monopoly.db');
        let result = await db.getAllAsync(`SELECT Karazany, Janvier, Fevrier, Mars, Avril, Mai, Juin, Juillet, Aout, Sepetembre, Octobre, Novembre, Descembre FROM Fandaniana WHERE MpamokatraId=${id}`);

        for (let i = 0; i < result.length; i++) {
            for (let key in result[i]) { // Parcourir les propriétés de chaque objet
                if (result[i][key] === ""|| result[i][key] === null) {
                    result[i][key] = 0; // Remplacer les valeurs vides par 0
                }
               
            }
        }
        console.log('result ito',result);
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
const recupereDonnees2 = async (id) => {
    try {
        const db = await SQLite.openDatabaseAsync('monopoly.db');
        let result = await db.getAllAsync(`SELECT Karazany, Janvier, Fevrier, Mars, Avril, Mai, Juin, Juillet, Aout, Sepetembre, Octobre, Novembre, Descembre FROM Fidirambola WHERE MpamokatraId=${id}`);
        console.log(result);
        for (let i = 0; i < result.length; i++) {
            for (let key in result[i]) { // Parcourir les propriétés de chaque objet
                if (result[i][key] === ""|| result[i][key] === null) {
                    result[i][key] = 0; // Remplacer les valeurs vides par 0
                }
             
            }
        }

        const processedData = result.map(row => [
          
            row.Karazany, row.Janvier, row.Fevrier, row.Mars, row.Avril, row.Mai, row.Juin, row.Juillet, row.Aout, row.Sepetembre, row.Octobre, row.Novembre, row.Descembre,
            // Calculer le total pour chaque ligne
            Object.values(row).slice(1).reduce((acc, val) => acc + parseInt(val, 10), 0).toString()
        ]);
       
        combinedData = [data1[0],...processedData];
        setData1(combinedData);
       
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
};
  function handleCellChange(rowIndex, cellIndex, newText) {
      if (cellIndex === 0) {
          const newData = [...data];
          newData[rowIndex][cellIndex] = newText;
          setData(newData);
      } else {
          if (cellIndex > 0 && cellIndex < data[0].length - 1 && /^\d+$/.test(newText)) {
              const newData = [...data];
              newData[rowIndex][cellIndex] = newText;
              setData(newData);
              updateTotaly();
              updateData2();

          }
      }
  }
  function handleCellChange1(rowIndex, cellIndex, newText) {
    if (cellIndex === 0) {
        const newData = [...data1];
        newData[rowIndex][cellIndex] = newText;
        setData(newData);
    } else {
        if (cellIndex > 0 && cellIndex < data1[0].length - 1 && /^\d+$/.test(newText)) {
            const newData = [...data1];
            newData[rowIndex][cellIndex] = newText;
            setData1(newData);
            updateTotaly1();
            updateTotaltyFidirana();
            updateData2();
           
        }
    }
}
function getLastColumnValue() {
    return data3.map(row => row[row.length - 1]);
}

function handleCellChange2(rowIndex, cellIndex, newText) {

        if (cellIndex < data2[0].length - 1 && /^\d+$/.test(newText)) {
            const newData = [...data2];
            newData[rowIndex][cellIndex] = newText;
            setData2(newData);
            }
}
function handleCellChange3(rowIndex, cellIndex, newText) {

    if (cellIndex < data3[0].length) {
        const newData = [...data3];
        newData[rowIndex][cellIndex] = newText;
        setData3(newData);
        }
}

  function updateTotaly() {
      setData(prevData => {
          return prevData.map(row => {
              if (row[0] !== 'Karazany') {
                  const total = row.slice(1, -1).reduce((acc, val) => {
                      if (!isNaN(parseFloat(val))) {
                          return acc + parseFloat(val);
                      }
                      return acc;
                  }, 0);
                  const updatedRow = [...row];
                  updatedRow[row.length - 1] = total.toString();
                  return updatedRow;
              }
              return row;
          });
      });
  }
  function updateTotaly1() {
    setData1(prevData => {
        return prevData.map(row => {
            if (row[0] !== 'Karazany') {
                const total = row.slice(1, -1).reduce((acc, val) => {
                    if (!isNaN(parseFloat(val))) {
                        return acc + parseFloat(val);
                    }
                    return acc;
                }, 0);
                const updatedRow = [...row];
                updatedRow[row.length - 1] = total.toString();
                return updatedRow;
            }
            return row;
        });
    });
}

function updateData2() {
    const months = ['Janoary', 'Febroary', 'Marsa', 'April', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Descembra'];
    
    setData2(prevData => {
        return prevData.map((row, rowIndex) => {
            if (rowIndex === 0) return row;
            const updatedRow = row.map((cell, cellIndex) => {
                if (cellIndex === 0 ) return cell;
                const prevMonthIndex = cellIndex === 0 ? months.length : cellIndex - 1;
                
                const prevMonthValue = parseFloat(data3[rowIndex][prevMonthIndex]) || 0;
                const fidiranaValue = parseFloat(TotaltyFidirana[0][cellIndex + 1]) || 0;
                const fandaninaValue = parseFloat(TotaltyFandanina[0][cellIndex + 1]) || 0;

                const newValue = prevMonthValue + fidiranaValue - fandaninaValue;
                return newValue.toString();
            });
            return updatedRow;
        });
    });
}

function andranavolafarany(TotaltyFandanina,TotaltyFidirana,data2){

    const retournena = [];
    const tenaretourne = [];
    console.log('fandanina',TotaltyFidirana[0]);
    
      for (let i = 0; i < TotaltyFandanina.length; i++) {
        const row = TotaltyFandanina[i];
        const row1 = TotaltyFidirana[i];
     
        for (let j = 1; j < row.length; j++) {
          retournena.push(row1[j] - row[j]);
        }
      }
    retournena.pop();
    console.log('retournena',retournena);
    const data2tsisentete = data2.slice(1).map(row => {
        return row.map(val => {
            // Utilisation de parseInt pour transformer en chiffre
            const num = parseInt(val);
            // Vérification si c'est une chaîne vide
            return isNaN(num) ? 0 : num;
        });
    });
    const tenavaleu2=data2tsisentete[0];
console.log(tenavaleu2);

    for (let i = 0; i < retournena.length; i++) {
        const sum = retournena[i] + tenavaleu2[i];
        tenaretourne.push(sum);
    }
    return tenaretourne;
  
}



function updateTotaltyFandanina() {
    const totals = data[0].map((_, columnIndex) => {
      if (columnIndex === 0) return 'Totaly';
      const sum = data.slice(1).reduce((acc, row) => {
        const value = parseFloat(row[columnIndex]);
        return acc + (isNaN(value) ? 0 : value);
      }, 0);
      return sum.toString();
    });
    setFandanina([totals]);
}
function updateTotaltyFidirana() {
    const totals = data1[0].map((_, columnIndex) => {
      if (columnIndex === 0) return 'Totaly';
      const sum = data1.slice(1).reduce((acc, row) => {
        const value = parseFloat(row[columnIndex]);
        return acc + (isNaN(value) ? 0 : value);
      }, 0);
      return sum.toString();
    });
    setFidirana([totals]);
    console.log(data[data.length - 1][11]);
}

  return (
    <ScrollView style={styles.container}>
      <View style={styles.voalohany}>
      <Text style={styles.importText}>Fidiram-bola sy fandanina:</Text>
        <View style={styles.fandaninafidirambola}>
          <View style={[styles.panel, styles.columnItem, styles.centerText]}>
          <Text style={styles.importText}>{TotaltyFidirana[0][13]}</Text>
          </View>
          <View style={[styles.panel, styles.columnItem, styles.centerText]}>
            <Text style={styles.importText}>{TotaltyFandanina[0][13]}</Text>
          </View>
        </View>
        <Text style={styles.importText}>Vola sisa farany taona:</Text>
        <View style={[styles.panel, styles.centerText, styles.totaly]}>
          <Text style={styles.TotalyText}>{data3[1][11]}</Text>
        </View>
        
      </View>
      <View style={styles.voalohany}> 
      <Text style={{ fontSize: 20, padding: 10 }}>Vola voalohan'ny volana:</Text>
          <ScrollView horizontal={true}>
              <DataTable>
                  <DataTable.Header>
                      {data2[0].map((header, index) => (
                          <DataTable.Title key={index}>{header}</DataTable.Title>
                      ))}
                  </DataTable.Header>

                  {data2.slice(1).map((row, rowIndex) => (
                      <DataTable.Row key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                              <DataTable.Cell key={cellIndex} style={styles.cell}>
                                  {cellIndex === data2[0].length - 1 ? (
                                      <TextInput
                                          value={cell}
                                          editable={false}
                                          style={[styles.input, styles.cell]}
                                      />
                                  ) : (
                                      <TextInput
                                          value={cell}
                                          editable={isEditable}
                                          onChangeText={(text) => handleCellChange2(rowIndex + 1, cellIndex, text)}
                                          style={[styles.input, styles.cell]}
                                      />
                                  )}
                              </DataTable.Cell>
                          ))}
                      </DataTable.Row>
                  ))}
              </DataTable>
          </ScrollView>
            
          <Text style={{ fontSize: 20, padding: 10 }}>Fandaniana:</Text>
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
                                value={cell.toString()}
                                editable={false}
                                style={[styles.input, styles.cell]}
                            />
                        ) : (
                            <TextInput
                                value={cell.toString()}
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
          <Text style={{ fontSize: 20, padding: 10 }}>Fidiram-bola:</Text>
          <ScrollView horizontal={true}>
          <DataTable>
        <DataTable.Header>
            {data1[0].map((header, index) => (
                <DataTable.Title key={index}>{header}</DataTable.Title>
            ))}
        </DataTable.Header>

        {data1.slice(1).map((row, rowIndex) => (
            <DataTable.Row key={rowIndex}>
                {row.map((cell, cellIndex) => (
                    <DataTable.Cell key={cellIndex} style={styles.cell}>
                        {cellIndex === data1[0].length - 1 ? (
                            <TextInput
                                value={cell.toString()}
                                editable={false}
                                style={[styles.input, styles.cell]}
                            />
                        ) : (
                            <TextInput
                                value={cell.toString()}
                                editable={isEditable}
                                onChangeText={(text) => handleCellChange1(rowIndex + 1, cellIndex, text)}
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
                
                {TotaltyFidirana.map((row, rowIndex) => (
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
          <Text style={{ fontSize: 20, padding: 10 }}>Vola sisa faran'ny volana:</Text>
          <ScrollView horizontal={true}>
              <DataTable>
                  <DataTable.Header>
                      {data3[0].map((header, index) => (
                          <DataTable.Title key={index}>{header}</DataTable.Title>
                      ))}
                  </DataTable.Header>

                  {data3.slice(1).map((row, rowIndex) => (
            <DataTable.Row key={rowIndex}>
                {row.map((cell, cellIndex) => (
                    <DataTable.Cell key={cellIndex} style={styles.cell}>
                       
                            <TextInput
                                value={cell.toString()}
                                editable={isEditable}
                                onChangeText={(text) => handleCellChange3(rowIndex + 1, cellIndex, text)}
                                style={[styles.input, styles.cell]}
                            />
                      
                    </DataTable.Cell>
                ))}
            </DataTable.Row>
        ))}
              </DataTable>
          </ScrollView>
          <View style={styles.spacekely} />
          <TouchableOpacity style={[styles.floatingButton, { backgroundColor: isEditable ? '#68B684' : '#2196F3' }]} onPress={toggleEditable}>
      {isEditable ? (
         <Ionicons name="checkmark-circle" size={40} color="#fff"  onPress={handleIconClick} />
      ) : (
        <Ionicons name="create" size={40} color="#fff" />
      )}
    </TouchableOpacity>
    {showAlert && <AlertCustom title="Modification enregistrée" message="Votre modification a été enregistrée avec succès." onOk={() => console.log('OK Pressed')} />}
          <View style={styles.space} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 40,
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
  container: {
    padding:15,
    flex: 1,
    backgroundColor: '#fff',
  },
  panel: {
    backgroundColor: '#68B684',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  voalohany: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  totaly: {
    width: '70%',
    alignSelf: 'center',
    paddingTop:10,
  },
  fandaninafidirambola: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnItem: {
    flex: 1,
    marginHorizontal: 10,
  },
  importText: {
    fontSize: 15,
    marginBottom:20,
  },
  TotalyText: {
    fontSize: 25,
    marginBottom:20,
  },
  centerText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  space: {
    height: 100,
  },
  spacekely: {
    height: 20,
  },
  input: {
      borderWidth: 1,
      borderColor: '#e8eaf6',
      padding: 10,
      borderRadius: 5,
  },
  floatingButton: {
    marginTop:'10%',
    padding:'2%',
    bottom: 20,
    left: '85%',
    backgroundColor: '#68B684',
    borderRadius: 20,
    width: 90,
    height: 60,
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
  cell: {
      width: 100,
  },
  addButton: {
      marginTop: 20,
      backgroundColor: '#673ab7',
      color: '#fff',
      borderRadius: 5,
  },
});