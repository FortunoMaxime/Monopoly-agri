import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Button, Text, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { insertDonneexel, getLastId } from './database';
import { Ionicons } from '@expo/vector-icons';
import AlertCustom from './AlertCustom'; 
import Alerttsmety from './Alerttsmety'; 


const ExcelSimulator = ({ navigation }) => {
    const [somme, setsomme] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [data, setData] = useState([
        ['Karazany', 'Janoary', 'Febroary', 'Martsa', 'Aprily', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novambra', 'Desambra', 'Totaly'],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ]);
    const [TotaltyFandanina, setFandanina] = useState([
        ['Totaly','', '', '', '', '', '', '', '', '', '', '', '', ''],
    ]);
    useEffect(() => {
        updateTotaltyFandanina();
      }, [data]);
      useEffect(() => {
        if (showAlert) {
          setTimeout(() => {
            setShowAlert(false); 
          }, 3000);
        }
      }, [showAlert]);
    function toutenregistrer() {
        retrieveData(data,'FilanaIsambolana');
        setShowAlert(true);
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

    function addRow() {
        setData(prevData => {
            const newRow = Array(data[0].length).fill('');
            return [...prevData, newRow];
        });
    }

    const retrieveData = async(table,nomtable) => {
        const result=table.slice(1);
        const last= await getLastId('Mpamokatra');
        console.log(last);
        insertDonneexel(result,nomtable,last);
    }

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
            <Ionicons name="add-circle-outline" size={40} color="#fff" />
            </TouchableOpacity> 
            <Button title="Raiketina" onPress={toutenregistrer} />
            {showAlert && <AlertCustom title="Tafiditra " message="Tafiditra soamatsara ilay Excel" onOk={() => console.log('OK Pressed')} />}
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
        marginTop:'10%',
        padding:'2%',
        bottom: 20,
        left: '85%',
        backgroundColor: '#68B684',
        borderRadius: 50,
        width: 70,
        height: 70,
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
      floatingButton1: {
        marginTop:'10%',
        padding:'2%',
        bottom: 20,
        backgroundColor: '#68B684',
        borderRadius: 50,
        width: 200,
        height: 200,
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

export default ExcelSimulator;
