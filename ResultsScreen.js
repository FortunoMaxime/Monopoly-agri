import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity ,Button} from 'react-native';
import { copyColumnData,getLastId,insertDonneFandanina,insertDonneexel,insertTotaly,insertFandanianaData} from './database';
import { DataTable } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const ResultsScreen = ({ route }) => {
  const { resultats1, resultats2, calendrier1, calendrier2,filana } = route.params;
  
  const [data, setData] = useState([
    ['Karazany', 'Janoary', 'Febroary', 'Marsa', 'Aprily', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Desambra'],
  ]);
  const [data1, setData1] = useState([
    ['Karazany', 'Janoary', 'Febroary', 'Marsa', 'Aprily', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Desambra'],
  ]);
  const [niakatra, setNiakatra] = useState([
    ['Karazany', 'Janoary', 'Febroary', 'Marsa', 'Aprily', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Descembra'],
  ]);
  const [nohanina, setNohanina] = useState([
    ['Karazany', 'Janoary', 'Febroary', 'Marsa', 'Aprily', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Descembra'],
  ]);
  const [tenafilana, setFilana] = useState([
    ['Karazany', 'Janoary', 'Febroary', 'Marsa', 'Aprily', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septembra', 'Oktobra', 'Novembra', 'Descembra'],
  ]);
  const [TotaltyFandanina, setFandanina] = useState([
    ['Totaly','', '', '', '', '', '', '', '', '', '', '', ''],
]);

const [TotaltyFidirana, setFidirana] = useState([
    ['Totaly','', '', '', '', '', '', '', '', '', '', '', ''],
]);
  useEffect(() => {
    recupereDonnees1();
  }, []);
  useEffect(() => {
    updateTotaltyFandanina();
  
  }, [data]);

  useEffect(() => {
    updateTotaltyFidirana();

  }, [data1]);

  

  const retrieveData = async (table, nomtable) => {
    const result = table.slice(1); // Enlève la première ligne d'en-têtes
    const last = await getLastId('Mpamokatra');
    console.log(last);
    // Transforme les données en tableaux imbriqués
insertFandanianaData(result, nomtable, last);
   // insertDonneexel(result, nomtable, last);
  }
  
  const retrieveAutre = async (table, nomtable) => {
    const last = await getLastId('Mpamokatra');
    console.log(last);
    // Transforme les données en tableaux imbriqués
    const result = table.slice(1);
    const formattedResult = result.map(row => row.map(cell => cell));
    console.log("Formatted Result for Autre:", formattedResult);
    insertDonneFandanina(formattedResult, nomtable, last);
  }
  
  
function toutenregistrer() {
     retrieveData(data,'Fandaniana');
     retrieveData(data1,'Fidirambola');
     retrieveAutre(TotaltyFandanina,'TotalyFandaniana');
     retrieveAutre(TotaltyFidirana,'TotalyFidirana');
}
const recupereDonnees1 = () => {
  const formattedResultats1 = resultats1.map(row => row.map(cell => cell));
  const formattedResultats2 = resultats2.map(row => row.map(cell => cell));
  const formattedCalendrier1 = calendrier1.map(row => row.map(cell => cell));
  const formattedCalendrier2 = calendrier2.map(row => row.map(cell => cell));
  const formattedFilana = filana.map(row => row.map(cell => cell));

  setData([data[0], ...resultats1]);
  setData1([data1[0], ...resultats2]);
  setNiakatra([niakatra[0], ...calendrier1]);
  setNohanina([nohanina[0], ...calendrier2]);
  setFilana([tenafilana[0], ...filana]);
};


  const handleCellChange = (rowIndex, cellIndex, newText) => {
    if (cellIndex === 0 || (cellIndex > 0 && cellIndex < data[0].length - 1 && /^\d+$/.test(newText))) {
      setData(prevData => {
        const newData = [...prevData];
        newData[rowIndex][cellIndex] = newText;
        return newData;
      });
      if (cellIndex > 0 && cellIndex < data[0].length - 1) updateTotaly();
    }
  };

  const handleCellChange1 = (rowIndex, cellIndex, newText) => {
    if (cellIndex === 0 || (cellIndex > 0 && cellIndex < data1[0].length - 1 && /^\d+$/.test(newText))) {
      setData1(prevData => {
        const newData = [...prevData];
        newData[rowIndex][cellIndex] = newText;
        return newData;
      });
      if (cellIndex > 0 && cellIndex < data1[0].length - 1) updateTotaly1();
    }
  };

  const addRow = () => {
    setData(prevData => [...prevData, Array(data[0].length).fill('')]);
  };

  const addRow1 = () => {
    setData1(prevData => [...prevData, Array(data1[0].length).fill('')]);
  };

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

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 20, padding: 10 }}>Fandaniana:</Text>
      <ScrollView horizontal={true}>
        <DataTable>
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
      <TouchableOpacity style={styles.floatingButton} onPress={addRow}>
        <Ionicons name="add-circle-outline" size={40} color="#fff" />
      </TouchableOpacity>

      <Text style={{ fontSize: 20, padding: 10 }}>Fidirambola:</Text>
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
      <TouchableOpacity style={styles.floatingButton} onPress={addRow1}>
        <Ionicons name="add-circle-outline" size={40} color="#fff" />
      </TouchableOpacity>

      <Text style={{ fontSize: 20, padding: 10 }}>Vokatra niakatra:</Text>
      <ScrollView horizontal={true}>
        <DataTable>
          <DataTable.Header>
            {niakatra[0].map((header, index) => (
              <DataTable.Title key={index}>{header}</DataTable.Title>
            ))}
          </DataTable.Header>
          {niakatra.slice(1).map((row, rowIndex) => (
            <DataTable.Row key={rowIndex}>
                {row.map((cell, cellIndex) => (
                    <DataTable.Cell key={cellIndex} style={styles.cell}>
                        {cellIndex === niakatra[0].length - 1 ? (
                            <TextInput
                                value={cell.toString()}
                                editable={false}
                                style={[styles.input, styles.cell]}
                            />
                        ) : (
                            <TextInput
                                value={cell.toString()}
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
      <TouchableOpacity style={styles.floatingButton} onPress={addRow1}>
        <Ionicons name="add-circle-outline" size={40} color="#fff" />
      </TouchableOpacity>

      <Text style={{ fontSize: 20, padding: 10 }}>Vokatra nohanina:</Text>
      <ScrollView horizontal={true}>
        <DataTable>
          <DataTable.Header>
            {nohanina[0].map((header, index) => (
              <DataTable.Title key={index}>{header}</DataTable.Title>
            ))}
          </DataTable.Header>
          {nohanina.slice(1).map((row, rowIndex) => (
            <DataTable.Row key={rowIndex}>
                {row.map((cell, cellIndex) => (
                    <DataTable.Cell key={cellIndex} style={styles.cell}>
                        {cellIndex === nohanina[0].length - 1 ? (
                            <TextInput
                                value={cell.toString()}
                                editable={false}
                                style={[styles.input, styles.cell]}
                            />
                        ) : (
                            <TextInput
                                value={cell.toString()}
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
      <TouchableOpacity style={styles.floatingButton} onPress={addRow1}>
        <Ionicons name="add-circle-outline" size={40} color="#fff" />
      </TouchableOpacity>

      <Text style={{ fontSize: 20, padding: 10 }}>Filan'ny fianakaviana:</Text>
      <ScrollView horizontal={true}>
        <DataTable>
          <DataTable.Header>
            {tenafilana[0].map((header, index) => (
              <DataTable.Title key={index}>{header}</DataTable.Title>
            ))}
          </DataTable.Header>
          {filana.slice(1).map((row, rowIndex) => (
            <DataTable.Row key={rowIndex}>
                {row.map((cell, cellIndex) => (
                    <DataTable.Cell key={cellIndex} style={styles.cell}>
                        {cellIndex === filana[0].length - 1 ? (
                            <TextInput
                                value={cell.toString()}
                                editable={false}
                                style={[styles.input, styles.cell]}
                            />
                        ) : (
                            <TextInput
                                value={cell.toString()}
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
      <TouchableOpacity style={styles.floatingButton} onPress={addRow1}>
        <Ionicons name="add-circle-outline" size={40} color="#fff" />
      </TouchableOpacity>
      <Button title="Raiketina" onPress={toutenregistrer} />
      <View style={styles.spacebe} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  spacebe: {
    height: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e8eaf6',
    padding: 10,
    borderRadius: 5,
  },
  floatingButton: {
    marginTop: '10%',
    padding: '2%',
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
});

export default ResultsScreen;
