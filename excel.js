import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as XLSX from 'xlsx';

const ExcelReader = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const readExcelFile = async () => {
      try {
        // Assurez-vous que ce chemin est correct et accessible
        const filePath = '/data/user/0/host.exp.exponent/cache/DocumentPicker/c53c2a8a-ce5a-4c89-a1ff-7897f5a83c1a.xlsx';
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const excelData = XLSX.utils.sheet_to_json(worksheet);
        setData(excelData);
      } catch (error) {
        console.error('Error reading Excel file:', error);
      }
    };

    readExcelFile();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {Object.values(item).map((value, index) => (
              <Text key={index} style={styles.cell}>
                {value}
              </Text>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  cell: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 5,
  },
});

export default ExcelReader;
