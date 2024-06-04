import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet,TextInput } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';

const Import = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null); 
  const [fileUri, setFileUri] = useState(null);
  const [sheetInfo, setSheetInfo] = useState({ sheetNames: [], sheetCount: 0 });

  const [isEditing, setIsEditing] = useState(false);

  // Fonction pour gérer la fin de l'édition d'une cellule
  const handleEndEdit = (newContent) => {
    // Mettre à jour l'état global avec le nouveau contenu ici
    console.log(newContent);
    setIsEditing(false);
  };

  const headers = ['Name', 'Year', 'Value'];
  const data1 = [
    ['Tesla', '2019', 10],
    ['Volvo', '2019', 11],
    ['Toyota', '2019', 12],
    ['Honda', '2019', 13],
    ['Tesla', '2020', 20],
    ['Volvo', '2020', 11],
    ['Toyota', '2020', 14],
    ['Honda', '2020', 13],
    ['Tesla', '2021', 30],
    ['Volvo', '2021', 15],
    ['Toyota', '2021', 12],
    ['Honda', '2021', 13],
  ];

  const pickDocumentfilana = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
      });
      if (result.type === 'success') {
        Makaanarana(result.uri);
      }
    } catch (err) {
      console.error('Erreur lors de la sélection du document:', err);
    }
  }

  const Makaanarana = async (filePath) => {
    try {
      const fileData = await FileSystem.readAsStringAsync(filePath, { encoding: FileSystem.EncodingType.Base64 });
      const binaryStr = atob(fileData);
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetNames = workbook.SheetNames;
      setSheetInfo({ sheetNames, sheetCount: sheetNames.length });
    } catch (error) {
      console.error('Erreur lors de la lecture du fichier Excel:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.floatingButton} onPress={pickImage}>
        <Ionicons name="person-circle-outline" size={100} color="#68B684" />
        {image && <Image source={{ uri: image }} style={styles.floatingButtonImg} />}
      </TouchableOpacity>
      <View style={styles.panelimport}>
        <Text style={{ fontSize: 18 }}>Importation :</Text>
        <View style={styles.panelim}>
          <TouchableOpacity style={styles.import} onPress={pickDocumentfilana}>
            <Text style={styles.importText}>Kilalao-mpitantanana</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text>Nombre de feuilles: {sheetInfo.sheetCount}</Text>
      <Text>Liste des feuilles:</Text>
      {sheetInfo.sheetNames.map((name, index) => (
        <Text key={index}>{name}</Text>
      ))}
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          <DataTable>
            <DataTable.Header>
              {headers.map((header, index) => (
                <DataTable.Title key={index}>{header}</DataTable.Title>
              ))}
            </DataTable.Header>
            {data1.map((row, rowIndex) => (
              <DataTable.Row key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <DataTable.Cell key={cellIndex}>
                  <TextInput
                    value={cell}
                    onChangeText={(text) => setIsEditing(true)}
                    onBlur={() => handleEndEdit(cell)}
                    style={[inputStyle.base, isEditing? inputStyle.editing : {}]}
                  />
                </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ScrollView>
    </View>
  );
};
const inputStyle = StyleSheet.create({
  base: {
    fontSize: 16, // Taille de texte plus grande
    paddingVertical: 5, // Padding vertical pour plus d'espace autour du texte
    paddingHorizontal: 10, // Padding horizontal pour plus d'espace autour du texte
    borderWidth: 1, // Bordure pour séparer le texte du fond
    borderColor: '#ccc', // Couleur de bordure par défaut
    borderRadius: 5, // Arrondir les coins pour un design plus moderne
  },
  editing: {
    borderColor: 'red', // Changement de couleur de bordure lors de l'édition
    backgroundColor: '#ffebcd', // Fond légèrement transparent pour indiquer l'état d'édition
  },
});
const cellStyle = {
  borderWidth: 1, // Ajoute une bordure autour de chaque cellule
  borderColor: '#ccc', // Couleur de la bordure
  margin: 5, // Espacement entre les cellules
  padding: 10, // Paddings intérieurs pour plus d'espace
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  floatingButton: {
    top: 30,
    left: '20%',
    backgroundColor: '#004300',
    borderRadius: 100,
    width: 200,
    height: 200,
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
  floatingButtonImg: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  panelimport: {
    marginTop: '20%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'column',
  },
  panelim: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  import: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
  },
  importText: {
    color: '#fff',
    fontSize: 15,
  },
  
});

export default Import;
