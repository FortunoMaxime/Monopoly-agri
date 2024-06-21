import React, { useState,useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView,  Text,TouchableOpacity,Button } from 'react-native';
import { DataTable } from 'react-native-paper';
import { copyColumnData,getLastId,insertDonneFandanina,insertDonneexel,insertTotaly} from './database';
import { Ionicons } from '@expo/vector-icons';

const BudgetInitialEntrer = ({ navigation }) => {
  const [nom, setNom] = useState([]);
  const [data, setData] = useState([
      ['Karazany', 'Janoary', 'Febroary', 'Marsa', 'April', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Desambra', 'Totaly'],
  ]);
  const [data1, setData1] = useState([
    ['Karazany', 'Janoary', 'Febroary', 'Marsa', 'April', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Desambra', 'Totaly'],
]);
const [data2, setData2] = useState([
    ['Janoary', 'Febroary', 'Marsa', 'April', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Desambra'],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
]);
const [data3, setData3] = useState([
    ['Janoary', 'Febroary', 'Marsa', 'April', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Desambra'],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
]);

const [TotaltyFandanina, setFandanina] = useState([
    ['Totaly','', '', '', '', '', '', '', '', '', '', '', '', ''],
]);

const [TotaltyFidirana, setFidirana] = useState([
    ['Totaly','', '', '', '', '', '', '', '', '', '', '', '', ''],
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
              addKarazany(nom[i]);
          }
      }
      if (nom && nom.length > 0) {
        for (let i = 0; i < nom.length; i++) {

            addKarazany1(nom[i]);
        }
    }
  }, [nom]);
  useEffect(() => {
    updateTotaltyFandanina();
  
  }, [data]);

  useEffect(() => {
    updateTotaltyFidirana();

  }, [data1]);

  useEffect(() => {
    updateData2();
}, [data3, TotaltyFidirana, TotaltyFandanina]);

const retrieveData = async(table,nomtable) => {
    const result=table.slice(1);
    const last= await getLastId('Mpamokatra');
    console.log(last);
    insertDonneexel(result,nomtable,last);
}
const retrieveAutre= async(table,nomtable) =>  {
    const last= await getLastId('Mpamokatra');
    console.log(last);
    insertDonneFandanina(table,nomtable,last);
}
function toutenregistrer() {
     retrieveData(data,'Fandaniana');
     retrieveData(data1,'Fidirambola');
     retrieveAutre(TotaltyFandanina,'TotalyFandaniana');
     retrieveAutre(TotaltyFidirana,'TotalyFidirana');
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
function handleCellChange2(rowIndex, cellIndex, newText) {

        if (cellIndex < data2[0].length - 1 && /^\d+$/.test(newText)) {
            const newData = [...data2];
            newData[rowIndex][cellIndex] = newText;
            setData2(newData);
            }
}
function handleCellChange3(rowIndex, cellIndex, newText) {

    if (cellIndex < data3[0].length - 1 && /^\d+$/.test(newText)) {
        const newData = [...data3];
        newData[rowIndex][cellIndex] = newText;
        setData3(newData);
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
function addRow() {
    setData(prevData => {
        const newRow = Array(data[0].length).fill('');
        return [...prevData, newRow];
    });
}
function addRow1() {
    setData1(prevData => {
        const newRow = Array(data[0].length).fill('');
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
}

 

  return (
      <ScrollView style={styles.container}>
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

          <TouchableOpacity style={[styles.floatingButton]} onPress={addRow}>
            <Ionicons name="add-circle-outline" size={25} color="#fff" />
            </TouchableOpacity>   
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
          <TouchableOpacity style={[styles.floatingButton]} onPress={addRow1}>
            <Ionicons name="add-circle-outline" size={25} color="#fff" />
            </TouchableOpacity>   
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
                                  {cellIndex === data3[0].length - 1 ? (
                                      <TextInput
                                          value={cell}
                                          editable={false}
                                          style={[styles.input, styles.cell]}
                                      />
                                  ) : (
                                      <TextInput
                                          value={cell}
                                          onChangeText={(text) => handleCellChange3(rowIndex + 1, cellIndex, text)}
                                          style={[styles.input, styles.cell]}
                                      />
                                  )}
                              </DataTable.Cell>
                          ))}
                      </DataTable.Row>
                  ))}
              </DataTable>
          </ScrollView>
          <View style={styles.spacekely} />
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
    left: '80%',
    backgroundColor: '#68B684',
    borderRadius: 50,
    width: 55,
    height: 55,
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

export default BudgetInitialEntrer;