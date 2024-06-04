import React, { useState } from 'react';
import { StyleSheet, View ,TextInput} from 'react-native';
import { DataTable } from 'react-native-paper';

const ExcelSimulator = () => {
  const [data, setData] = useState([
    ['John Doe', 'john@example.com', '123 Main St'],
    ['Jane Doe', 'jane@example.com', '456 Elm St'],
    // Ajoutez autant de lignes que nécessaire
  ]);

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>First Name</DataTable.Title>
          <DataTable.Title>Last Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
        </DataTable.Header>

        {data.map((row, rowIndex) => (
          <DataTable.Row key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <DataTable.Cell key={cellIndex}>
                <TextInput
                  value={cell}
                  onChangeText={(text) => handleCellChange(rowIndex, cellIndex, text)}
                  style={styles.input}
                />
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
});

function handleCellChange(rowIndex, cellIndex, newText) {
  const newData = [...data];
  newData[rowIndex][cellIndex] = newText;
  setData(newData);
}

export default ExcelSimulator;
