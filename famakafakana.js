
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { saveDataToTable, getLastId, saveDataKey,insertDonneexel } from './database';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';


let lastId;
getLastId('Mpamokatra').then(id => {
  lastId = id;
  console.log('Dernier ID:', lastId);
}).catch(error => {
  console.error('Erreur:', error);
});

const Famakafakana = ({navigation}) => {
  const [panel1Visible, setPanel1Visible] = useState(false);
  const [panel2Visible, setPanel2Visible] = useState(false);
  const [panel3Visible, setPanel3Visible] = useState(false);
  const [panel4Visible, setPanel4Visible] = useState(false);
  const [panel5Visible, setPanel5Visible] = useState(false);
  const [panel6Visible, setPanel6Visible] = useState(false);
  const [text, setText] = useState('');
  
  const [anaranaSyFanampiny, setAnaranaSyFanampiny] = useState('');
  const [manambadySaTsia, setManambadySaTsia] = useState('');
  const [toerana, setToerana] = useState('');
  const [kaominina, setKaominina] = useState('');
  const [fokotany, setFokotany] = useState('');

  const [serampihariana, setSerampihariana] = useState('');
const [velaranaisa, setVelaranaisa] = useState('');
const [velaranaAmbolena, setVelaranaAmbolena] = useState('');
const [toeranafamokarana, setToeranafamokarana] = useState('');
const [teknikaAmpiasaina, setTeknikaAmpiasaina] = useState('');
const [vokatra, setVokatra] = useState('');
const [volananiakarana, setVolanaNiakarana] = useState('');
const [volananambolena, setVolanaNambolena] = useState('');

const [fitaovampamokarana, setFitaovampamokarana] = useState('');
const [isa, setIsa] = useState('');

const [mpisehatra, setMpisehatra] = useState('');
const [asaAtao, setAsaAtao] = useState('');
const [adiresy, setAdiresy] = useState('');
const [tel, setTel] = useState('');
const [efaHiaraMiasa, setEfaHiaraMiasa] = useState('');

const [nom, setnom] = useState('');

const [image, setImage] = useState(null); // Déplacez cette ligne ici
const [fileUri, setFileUri] = useState(null);
const [filefilana, setFilefilana] = useState('');
const [filefikirakirana, setFilefikirakirana] = useState('');

const [Karazany, setkarazany] = useState('');
const [JanvierFilana, setJanvierFilana] = useState('');
const [FevrierFilana, setFevrierFilana] = useState('');
const [MarsFilana, setMarsFilana] = useState('');
const [AvrilFilana, setAvrilFilana] = useState('');
const [MaiFilana, setMai] = useState('');
const [JuinFilana, setJuinFilana] = useState('');
const [JuilletFilana, setJuilletFilana] = useState('');
const [AoutFilana, setAoutFilana] = useState('');
const [SeptembreFilana, setSeptembreFilana] = useState('');
const [OctobreFilana, setOctobreFilana] = useState('');
const [NovembreFilana, setNovembre] = useState('');
const [DecembreFilana, setDescembreFilana] = useState('');


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
    console.log(result);
    if (!result.canceled) {
      const base64Image =result.assets[0].uri
      setImage(base64Image);
    }
  };
  //Maka valeur ana champs de texte

  const handleSubmitPanel1 = () => {
    const data = {
       Anarana: anaranaSyFanampiny,
       Manambady: manambadySaTsia,
       Toerana: toerana,
       Kaominina: kaominina,
       Fokotany: fokotany,
       ImageBase64:image,
    };
   
    saveDataToTable('Mpamokatra', data);
   };
   


const handleSubmitPanel2 = () => {
  
  const data = {
    Sehapihariana: serampihariana,
    VelaranaIsa: velaranaisa,
    velaranaAmbolena: velaranaAmbolena,
    TeknikaAmpiasaina: teknikaAmpiasaina,
    VokatraKg: vokatra,
    VolanaNambolena:volananambolena,
    VolanaNamokarana:volananiakarana,
    MpamokatraId:lastId,
 };

 saveDataKey('Famokarana', data);

};


const handleSubmitPanel3 = () => {
  const data = {
  Fitaovampamokarana: fitaovampamokarana,
  Isa: isa,
  MpamokatraId:lastId,
  };
  saveDataKey('Fitaovampamokarana',data);
 };
 

 const handleSubmitPanel4 = () => {
  
  const data = {
    Mpisehatra: mpisehatra,
    AsaAtao: asaAtao,
    Adiresy: adiresy,
    Tel: tel,
    Efahiaramiasa: efaHiaraMiasa,
    MpamokatraId:lastId,
 };

 saveDataKey('ManodidinaFamokarana', data);

};

 
 const handleSubmitPanel5 = () => {
  const data={
    Fanamarihana:text,
    MpamokatraId:lastId,
  };
  saveDataKey('Fanamarihana',data);
};
const handleNavigateEntrerManuel = () => {
  navigation.navigate('ExcelSimulator');
};
const handleSubmitPanelImport = () => {
  const data={
    NomFeuille:nom,
    MpamokatraId:lastId,
  };
  saveDataKey('Fanamarihana',data);
};
//tapitra eto

  const handleTextChange = newText => {
    setText(newText);
  };

  const togglePanel1 = () => {
    setPanel1Visible(!panel1Visible);
  };

  const togglePanel2 = () => {
    setPanel2Visible(!panel2Visible);
  };

  const togglePanel3 = () => {
    setPanel3Visible(!panel3Visible);
  };
   const togglePanel4 = () => {
    setPanel4Visible(!panel4Visible);
  };
  const togglePanel5 = () => {
    setPanel5Visible(!panel5Visible);
  };

  const  importfilana=()=> {
    pickDocument();
  }

  const  importtetibola=()=> {
    pickDocument();
  }
   const [isDocumentPickerOpen, setIsDocumentPickerOpen] = useState(false);

  const pickDocument = async () => {
    if (isDocumentPickerOpen) {
      console.log('Un document est déjà en cours de sélection. Attendez...');
      return;
    }

    setIsDocumentPickerOpen(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    });
      console.log('Document picked:', result.assets[0].uri);
      const filename = result.assets[0].name? result.assets[0].name : "Nom indéterminé";
      setFilefilana(filename);
      readExcelFile(result.assets[0].uri);
    } catch (err) {
      console.error('Erreur lors de la sélection du document:', err);
    } finally {
      setIsDocumentPickerOpen(false);
    }
  }
  const pickDocumentfilana = async () => {
    if (isDocumentPickerOpen) {
      console.log('Un document est déjà en cours de sélection. Attendez...');
      return;
    }

    setIsDocumentPickerOpen(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    });
      console.log('Document picked:', result.assets[0].uri);
      const filename = result.assets[0].name? result.assets[0].name : "Nom indéterminé";
      const nomfeuille = 'B familiaux (Jeu)';
      console.log(nomfeuille);
      readExcelFile(result.assets[0].uri, nomfeuille);
      setFilefikirakirana(filename);
      
    } catch (err) {
      console.error('Erreur lors de la sélection du document:', err);
    } finally {
      setIsDocumentPickerOpen(false);
    }
  }
  const readExcelFile = async (fileUri, sheetName) => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
      
      // Convert the base64 content to binary string
      const binaryString = atob(fileContent);
      const arrayBuffer = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        arrayBuffer[i] = binaryString.charCodeAt(i);
      }
  
      // Créer un nouveau Workbook à partir de l'ArrayBuffer
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  
      // Obtenir le nom de la feuille spécifiée
    const worksheet = workbook.Sheets[sheetName];
    
    if (!worksheet) {
      console.error('Feuille non trouvée:', sheetName);
      return;
    }
    setnom(sheetName);
    handleSubmitPanelImport();
      let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            // Supprimer les 6 premières lignes
      jsonData = jsonData.slice(6);
      // Supprimer la dernière ligne
      jsonData.pop();

     console.log(jsonData);
     insertDonneexel(jsonData);


    } catch (error) {
      console.error('Erreur lors de la lecture du fichier Excel:', error);
    }
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <TouchableOpacity style={styles.panel} onPress={togglePanel1}>
      <Text style={{ fontSize: 20}}>Ny Mpamokatra</Text>
      </TouchableOpacity>

      {panel1Visible && (
  <View style={styles.panel}>
    <View style={styles.inter}>
    <TouchableOpacity style={[styles.floatingButton]} onPress={pickImage}>
    <Ionicons name="person-circle-outline" size={100} color="#68B684" />
    {image && <Image source={{ uri: image }} style={styles.floatingButtonImg} />}
    </TouchableOpacity>
    <View style={styles.iner}>
    <Text style={styles.label}>Anarana sy fanampiny:</Text>
      
      <TextInput
            style={styles.input}
            onChangeText={setAnaranaSyFanampiny}
            value={anaranaSyFanampiny}
          />
          <Text style={styles.label}>Manambady sa tsia:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setManambadySaTsia}
            value={manambadySaTsia}
          />
          <Text style={styles.label}>Toerana:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setToerana}
            value={toerana}
          />
          <Text style={styles.label}>Kaominina:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setKaominina}
            value={kaominina}
          />
          <Text style={styles.label}>Fokotany:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFokotany}
            value={fokotany}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPanel1}>
            <Text style={styles.submitButtonText}>Raiketina</Text>
          </TouchableOpacity>
      </View>
    </View>
    </View>
)}

      <View style={styles.space} />

      <TouchableOpacity style={styles.panel} onPress={togglePanel2}>
      <Text style={{ fontSize: 20}}>Famokarana</Text>
      </TouchableOpacity>

      {panel2Visible && (
  <View style={styles.panel}>
    <View style={styles.inter}>
      <View style={styles.form}>
      <Text style={styles.label}>Serampihariana:</Text>
      <TextInput
 style={styles.input}
 value={serampihariana}
 onChangeText={text => setSerampihariana(text)}
/>
<Text style={styles.label}>Velarana/Isa: </Text>
<TextInput
 keyboardType="numeric"
 style={styles.input}
 value={velaranaisa}
 onChangeText={text => setVelaranaisa(text)}
/>
<Text style={styles.label}>Velarana Ambolena/isa:</Text>
<TextInput
 keyboardType="numeric"
 style={styles.input}
 value={velaranaAmbolena}
 onChangeText={text => setVelaranaAmbolena(text)}
/>
<Text style={styles.label}>Toerana famokarana:</Text>
<TextInput
 style={styles.input}
 value={toeranafamokarana}
 onChangeText={text => setToeranafamokarana(text)}
/>
<Text style={styles.label}>Teknika ampiasaina:</Text>
<TextInput
 style={styles.input}
 value={teknikaAmpiasaina}
 onChangeText={text => setTeknikaAmpiasaina(text)}
/>
<Text style={styles.label}>Vokatra:</Text>
<TextInput
  keyboardType="numeric"
 style={styles.input}
 value={vokatra}
 onChangeText={text => setVokatra(text)}
/>
<Text style={styles.label}>Volana Nambolena:</Text>
<TextInput
 style={styles.input}
 value={volananambolena}
 onChangeText={text => setVolanaNambolena(text)}
/>
<Text style={styles.label}>Volana Niakarany:</Text>
<TextInput
 style={styles.input}
 value={volananiakarana}
 onChangeText={text => setVolanaNiakarana(text)}
/>


<TouchableOpacity style={styles.submitButton} onPress={handleSubmitPanel2}>
 <Text style={styles.submitButtonText}>Raiketina</Text>
</TouchableOpacity>

      </View>
    </View>
  </View>
)}
       <View style={styles.space} />

      <TouchableOpacity style={styles.panel} onPress={togglePanel3}>
      <Text style={{  fontSize: 20}}>Fitaovampamokarana</Text>
      </TouchableOpacity>

      {panel3Visible && (
 <View style={styles.panel}>
    <View style={styles.inter}>
      <View style={styles.form}>
        <Text style={styles.label}>Fitaovampamokarana:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setFitaovampamokarana(text)}
          value={fitaovampamokarana}
        />
        <Text style={styles.label}>Isa:</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          onChangeText={text => setIsa(text)}
          value={isa}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPanel3}>
          <Text style={styles.submitButtonText}>Raiketina</Text>
        </TouchableOpacity>
      </View>
    </View>
 </View>
)}

      <View style={styles.space} />

      <TouchableOpacity style={styles.panel} onPress={togglePanel4}>
      <Text style={{ fontSize: 20}}>Manodidina ny famokarana</Text>
      </TouchableOpacity>

      {panel4Visible && (
 <View style={styles.panel}>
    <View style={styles.inter}>
      <View style={styles.form}>
        <Text style={styles.label}>Mpisehatra:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setMpisehatra(text)}
          value={mpisehatra}
        />
        <Text style={styles.label}>Asa atao:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setAsaAtao(text)}
          value={asaAtao}
        />
        <Text style={styles.label}>Adiresy:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setAdiresy(text)}
          value={adiresy}
        />
        <Text style={styles.label}>Tel:</Text>
        <TextInput
           keyboardType="numeric"
          style={styles.input}
          onChangeText={text => setTel(text)}
          value={tel}
        />
        <Text style={styles.label}>Efa hiara-miasa:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setEfaHiaraMiasa(text)}
          value={efaHiaraMiasa}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPanel4}>
          <Text style={styles.submitButtonText}>Raiketina</Text>
        </TouchableOpacity>
      </View>
    </View>
 </View>
)}

      <TouchableOpacity style={styles.panel} onPress={togglePanel5}>
      <Text style={{ fontSize: 20}}>Fanamarihanamanodidina ny toeram-pamokarana</Text>
      </TouchableOpacity>
      {panel5Visible && (
 <View style={styles.panel}>
    <View style={styles.inter}>
      
      <View style={styles.form}>
      <Text style={styles.label}>Fanamarihana:</Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPanel5}>
          <Text style={styles.submitButtonText}>Raiketina</Text>
        </TouchableOpacity>
      </View>
    </View>
 </View>
)}

      <View style={styles.panelimport}>
      <Text style={{ fontSize: 18}}>Importation :</Text>
      <View style={styles.panelim}>
      <TouchableOpacity style={styles.import} onPress={pickDocumentfilana} >
      <Text style={styles.importText}>Filan'ny fianakaviana</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.import} onPress={pickDocument}>
      <Text style={styles.importText}>Tetibola fikirakirana</Text>
      </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 18}}>Manuel :</Text>
      <View style={styles.panelim}>
      <TouchableOpacity style={styles.import} onPress={handleNavigateEntrerManuel()} >
      <Text style={styles.importText}>Ampidirina tanana</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={styles.rowray}>
      {filefilana && (
         <View>
         <Image
         source={require('./exceller.png')}style={styles.excelimage}
         />
      <Text style={{marginLeft:20}}>{filefilana}</Text>
      </View>
      )}
      {filefikirakirana && (
         <View >
         <Image
         source={require('./exceller.png')}style={styles.excelimage}
         />
      <Text style={{marginLeft:20}}>{filefikirakirana}</Text>
      </View>
      )}
      </View>
      </ScrollView>
 </SafeAreaView>
  );
};

const styles = {
  container: {
    flex:1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 60,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  panelimport:{
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
  panelim:{
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  import:{
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
  space: {
    height: 20,
  },
  inter: {
    backgroundColor: '#f2f2f2',
    padding: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 0,
    borderRadius: 5,
  },
  iner: {
    marginTop: 200,
    
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  form: {
    marginTop: 10,
    flex: 1,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333333',
    
  },
  image: {
    width: 200,
    height: 200,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    color: '#333333',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute', // Permet de positionner le bouton par rapport à son conteneur parent
   top: 30, // Positionne le bouton du haut
    left: '45%',  // Positionne le bouton à gauche
    right: null, // Ne positionne pas le bouton à droite (null signifie que la propriété n'est pas appliquée)
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
    right: null, 
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
  excelimage: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin:20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: '2',
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
 rowray: {
    flexDirection: 'column',
    flex:1,
    padding: '20px',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    flexDirection: 'row', // Aligne les enfants horizontalement

  },
};

  export default Famakafakana;