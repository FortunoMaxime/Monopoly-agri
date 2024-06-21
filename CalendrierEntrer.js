import React, { useState,useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Button, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { copyColumnData,getLastId} from './database';

const Production = ({ navigation }) => {
  const [nom, setNom] = useState([]);
  const [data, setData] = useState([
      ['Karazany', 'Janoary', 'Febroary', 'Marsa', 'April', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Descembra', 'Totaly'],
  ]);
  const [data1, setData1] = useState([
    ['Karazany', 'Janoary', 'Febroary', 'Marsa', 'April', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Descembra', 'Totaly'],
]);

  useEffect(() => {
      getLastId('Mpamokatra')
          .then(id => {
              console.log('Dernier ID:', id);
              return id;
          })
          .then(id => copyColumnData('Famokarana', 'Sehapihariana', id))
          .then(columnData => setNom(columnData))
          .catch(error => console.error('Erreur:', error));
  }, []);

  useEffect(() => {
      if (nom && nom.length > 0) {
          for (let i = 0; i < nom.length; i++) {
              console.log(nom[i]);
              addKarazany(nom[i]);
          }
      }
      if (nom && nom.length > 0) {
        for (let i = 0; i < nom.length; i++) {
            console.log(nom[i]);
            addKarazany1(nom[i]);
        }
    }
  }, [nom]);
  const retrieveData = async(table,nomtable) => {
    const result=table.slice(1);
    const last= await getLastId('Mpamokatra');
    console.log(last);
    insertVokatraData(table,nomtable,last);
}

function toutenregistrer() {
     retrieveData(data,'VokatraNiakatra');
     retrieveData(data1,'VokatraNohanina');
}

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
            const newData = [...data];
            newData[rowIndex][cellIndex] = newText;
            setData(newData);
            updateTotaly1();
        }
    }
}

 
  function addKarazany(karazanyValue) {
    setData(prevData => {
        const newRow = [karazanyValue, ...Array(data[0].length - 1).fill('')];
        return [...prevData, newRow];
    });
}
function addKarazany1(karazanyValue) {
    setData1(prevData => {
        const newRow = [karazanyValue, ...Array(data1[0].length - 1).fill('')];
        return [...prevData, newRow];
    });
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


  return (
      <ScrollView style={styles.container}>
          <Text style={{ fontSize: 20, padding: 10 }}>Vokatra niakatra(en Nature):</Text>
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
          <Text style={{ fontSize: 20, padding: 10 }}>Vokatra nohanina(en Nature):</Text>
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
                                          value={cell}
                                          editable={false}
                                          style={[styles.input, styles.cell]}
                                      />
                                  ) : (
                                      <TextInput
                                          value={cell}
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
          <Button title="Tahirizina" onPress={toutenregistrer} />
          <View style={styles.space} />
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  space: {
    height: 100,
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
    
  },
});

export default Production;