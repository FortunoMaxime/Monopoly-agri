import React, { useState, useRef, useEffect } from 'react';
import { View, Alert, ImageBackground, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Dimensions, useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { TabView, SceneMap } from 'react-native-tab-view';
import { ScrollView } from 'react-native-virtualized-view';
import styles from './stylesplateau';

const { width, height } = Dimensions.get('window');

const Plateau = () => {
  const [afficherMenu, setVisibility] = useState(false);
  const [modalDepart, setModalDepart] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCharge, setIsCharge] = useState(true);
  const [isFambolena, setIsFambolena] = useState(true);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [karazana, setKarazana] = useState('');
  const [fatra, setFatra] = useState('');
  const [anarana, setAnarana] = useState('');
  const [isa, setIsa] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('attach-money');
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingStockFambId, setEditingStockFambId] = useState(null);
  const [editingStockFioId, setEditingStockFioId] = useState(null);
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modalGain ,  setModalGainVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [nomBouton, setNomBouton] = useState('Ajouter');
  const [seeStock, setStockVisible] = useState(false);
  const [budjetInitiale, setBudjetInitiale] = useState(0);
  const [pileActive , setPileActive] = useState([new Date().getMonth()]);
  const [disableNext, setDisableNext] = useState(false);
  const [seeDiceM, setDiceModVis] = useState(false);
  const [conf, setConf] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [moisDeRemboursement, setRembMois] = useState('');
  const [tauxInter, setTaux] = useState('');
  const [modalVenteVisible, setModalVenteVisible] = useState('');
  const [Pu, setPu] = useState('');
  const [FatraNaIsa, setFatraNaIsa] = useState('');
  const [randomValue , setRandomValue] = useState(null);
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const ResultatDe = [
    "Tsy misy n'inoninona",
    "Fahasoavana : 50000 Ar (vola nomen'ny fianakaviana na olon-kafa)",
    "Loza voajanahary : 2/3 ny vokatra azo (tsy ampy orana, havandra, cyclone, valala)",
    "Tsy misy n'inoninona",
    "Mpangalatra vokatra : 1/4 ny vokatra very (na eny atanimboly na eny ampitehirizana) ",
    "Aretina @ fambolena na fiompiana : 2/3 ny vokatra no azo",
    "Tsara ny taona : mitombo 1/4 ny vokatra @ fambolena atao",
    "Tsy misy n'ininoninona",
    "Fahasimbana eo ampitehirizana : 1/4 ny vokatra simba",
    "Tsara ny taona : mitombo 1/4 ny vokatra @ fiompiana atao",
    "Adidy goavana tsy azo ialana : 100.000 Ar",
    "Adidy maro isankarazany : 5.000 Ar (latsakemboka OP, adidy @ fiangonana,...)"

  ]
  // Initialize monthData array with charges and gains properties for each month
  const initialMonthData = months.map((month, index) => ({
    month,
    charges: [],
    totalCharge : 0,
    gains: [],
    totalGain : 0,
    stockFambolena:  [],
    stockFiompina: [],
    solde: (index === activeMonth ? budjetInitiale : 0),
  }));
  const [monthData, setMonthData] = useState(initialMonthData);

  useEffect(() => {
    const updatedMonthData = months.map((month, index) => ({
      ...initialMonthData[index],
      solde: (index === activeMonth ? budjetInitiale : 0),
      stockFambolena: initialMonthData[index].stockFambolena, // Ajoutez cette ligne
      stockFiompina: initialMonthData[index].stockFiompina,   // Ajoutez cette ligne
    }));
    setMonthData(updatedMonthData);
  }, [budjetInitiale]);
  
  const next = () => {
    console.log('le next ', activeMonth);
    if(activeMonth >= 11){
      setActiveMonth(0);
    }else{
    setActiveMonth(activeMonth + 1);
    }
    if (!pileActive.some(pile => pile === activeMonth + 1)){
    setPileActive([...pileActive,activeMonth + 1]);
  }
    console.log('le pile actif : ', pileActive)
  };
  const prev = () => {
    console.log('le prev ', activeMonth);
    if(activeMonth <= 0){
      setActiveMonth(11);
    }else{
    setActiveMonth(activeMonth - 1);
    }
  };
  const [init, setInit] = useState(new Date().getMonth());

  const terminer = () => {
    prev();
    pileActive.push(404);
    setInit(404);
  }
  const nouveaujeu = () => {
    Alert.alert(
      'Avertissement',
      'Toutes les données sont enregistré ! \n Voulez vous commencer un nouveau jeu',
      [
        {text: 'NON', onPress: () => setConf(false)},
        {text: 'OUI', onPress: () => setConf(true)},
      ]
    );

   if(conf){
   setMonthData(initialMonthData);
   setPileActive([new Date().getMonth()]);
   }else{
    prev();
    pileActive.push(404);
    setInit(404);
   }
  }
  const checkIfDone = (index) => {
    if(index === 0){
      index = 12;
    }
    return(!pileActive.some(pile => pile === index));
  };
  const disablePrev = () => {
    return(activeMonth === init  ? true : false);
  };
  const estTerminé = () => {
    return(pileActive.length === 12 && activeMonth === pileActive[0] ? true : false);
  };
  const newAmount = (solde) => {
    setModalDepart(false);
    setBudjetInitiale(solde);
  };

  const handleAddOrEditItem = () => {
    if (amount && description) {
      const newItem = { id: editingItemId || Date.now().toString(), amount, description, icon: selectedIcon };

      const updatedData = monthData.map(month => {
        if (months.indexOf(month.month) === activeMonth) {
          if (isCharge) {
            return { 
              ...month, 
              charges: editingItemId ? month.charges.map(item => (item.id === editingItemId ? newItem : item)) : [...month.charges, newItem],
              solde: month.solde - (isCharge ? parseFloat(amount) : -parseFloat(amount))
            };
          } else {
            return { 
              ...month, 
              gains: editingItemId ? month.gains.map(item => (item.id === editingItemId ? newItem : item)) : [...month.gains, newItem],
              solde: month.solde - (isCharge ? parseFloat(amount) : -parseFloat(amount)) 
            };
          }
        }
        return month;
      });    
     
      setMonthData(updatedData);
      resetModal();
    }
    console.log('nandalo amle ajout na item')  
  };

  const handleAddOrEditStockFamb = () => {
    if (karazana && fatra) {
      const newStockFamb = { idFamb: editingStockFambId || Date.now().toString(), karazana, fatra };
      console.log(newStockFamb.karazana + ' '+ newStockFamb.fatra);
      const updatedStockFamb = monthData.map(month => {
        if (months.indexOf(month.month) === activeMonth) {
            return { 
              ...month, 
              stockFambolena: editingStockFambId ? month.stockFambolena.map(itemFamb => (itemFamb.idFamb === editingStockFambId ? newStockFamb: itemFamb)) : [...month.stockFambolena, newStockFamb]
            };
        }
        return month;
      });      
      setMonthData(updatedStockFamb);
      resetDonnesFamb();
    }
  };
  const handleAddOrEditStockFio = () => {
    if (anarana && isa) {
      const newStockFio = { idFio: editingStockFioId || Date.now().toString(), anarana, isa };
      const updatedStockFio = monthData.map(month => {
        if (months.indexOf(month.month) === activeMonth) {
            return { 
              ...month, 
              stockFiompina: editingStockFioId ? month.stockFiompina.map(itemFio => (itemFio.idFio === editingStockFioId ? newStockFio: itemFio)) : [...month.stockFiompina, newStockFio]
            };
        }
        return month;
      });      
      setMonthData(updatedStockFio);
      resetDonnesFio();
    }
  };


  const resetModal = () => {
    setModalVisible(false);
    setAmount('');
    setDescription('');
    setSelectedIcon('attach-money');
    setEditingItemId(null);
  };
  const resetDonnesFamb = () => {
    setKarazana('');
    setFatra('');
    setEditingStockFambId(null);
    setModalUpdateVisible(false);
  };
  const resetDonnesFio = () => {
    setAnarana('');
    setIsa('');
    setEditingStockFioId(null);
    setModalUpdateVisible(false);
  };

  const randomDice = () => {
    setRandomValue(Math.floor(Math.random() * 12));
    setDiceModVis(true);
  };
  const handleEditItem = (item) => {
    setModalVisible(true);
    setAmount(item.amount);
    setDescription(item.description);
    setSelectedIcon(item.icon);
    setEditingItemId(item.id);
    setNomBouton('Modifier');
    setIsCharge(monthData[activeMonth].charges.some(charge => charge.id === item.id));
    setModal2Visible(false);
  };

  const handleEditProduit = (item) => {
    if(isFambolena){
    setModalUpdateVisible(true);
    setKarazana(item.karazana);
    setFatra(item.fatra);
    setEditingStockFambId(item.idFamb);;
    setModal3Visible(false);
  }else{
    setModalUpdateVisible(true);
    setAnarana(item.anarana);
    setIsa(item.isa);
    setEditingStockFioId(item.idFio);;
    setModal3Visible(false);
  }
  };

  const handleDeleteItem = (id) => {
    const isItemCharge = monthData[activeMonth].charges.some(item => item.id === id);
  
    const updatedData = monthData.map(month => {
      if (months.indexOf(month.month) === activeMonth) {
        let updatedCharges = month.charges;
        let updatedGains = month.gains;
  
        if (isItemCharge) {
          updatedCharges = month.charges.filter(item => item.id !== id);
        } else {
          updatedGains = month.gains.filter(item => item.id !== id);
        }
        const updatedSolde = updatedGains.reduce((total, item) => total + parseFloat(item.amount), 0) - 
                             updatedCharges.reduce((total, item) => total + parseFloat(item.amount), 0);
  
        return { ...month, charges: updatedCharges, gains: updatedGains, solde: updatedSolde };
      }
      return month;
    });
  
    setMonthData(updatedData);
    setModal2Visible(false);
  };

  const handleDeleteProduit = (id) => {
    const isItemFambolena = monthData[activeMonth].stockFambolena.some(item => item.idFamb === id);
    const updatedData = monthData.map(month => {
      if (months.indexOf(month.month) === activeMonth) {
        let updatedStockFamb = month.stockFambolena;
        let updatedStockFio = month.stockFiompina;
  
        if (isItemFambolena) {
          updatedStockFamb = month.stockFambolena.filter(item => item.idFamb !== id);
        } else {
          updatedStockFio = month.stockFiompina.filter(item => item.idFio !== id);
        }
        return { ...month, stockFambolena: updatedStockFamb, stockFiompina: updatedStockFio};
      }
      return month;
    });
  
    setMonthData(updatedData);
    setModal3Visible(false);
  };
  
  const handleHivarotraFamb = (item)  => {
    console.log(FatraNaIsa);
    console.log(Pu);
    console.log(item.karazana);
    if(Pu && FatraNaIsa){
      const am = Pu * FatraNaIsa;
      const des = item.karazana;
      console.log(am);
      console.log(des);
      setAmount(am);
      setDescription(des);
      console.log('amount : ', amount);
      console.log('description : ', description);
      setSelectedIcon("gras");
      setModalVenteVisible(false);
      handleAddOrEditItem();
    }
  };

  const renderListItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => showOptions(item)}
      style={styles.listItem}
    >
      <MaterialIcons name={item.icon} size={30} color="black" />
      <Text style={styles.itemText}>{item.description}: {item.amount} Ar</Text>
    </TouchableOpacity>
  );
  const showOptions = (item) => {
    setModal2Visible(true);
    setSelectedItem(item);
  };
  const showOptionsProduit = (item) => {
    setModal3Visible(true);
    setSelectedProduit(item);
    console.log('mandalo anle showoption produit');
  };
const FirstRoute = () => (
  <View style={styles.elementtabview}>
    {monthData[activeMonth].stockFambolena.length === 0 && (
      <Text style={styles.emptyListText}>Tsy misy</Text>
  )}
  {monthData[activeMonth].stockFambolena.length > 0 && (
    <ScrollView>
    {monthData[activeMonth].stockFambolena.map((item) => (
      <View key={item.idFamb} style={styles.list}>
       <TouchableOpacity style={styles.listItemStock}  onLongPress={() => {showOptionsProduit(item); setIsFambolena(true)}}>
            <MaterialIcons name="agriculture" size={30} color="black" />
            <Text style={styles.itemText}>{item.karazana}: {item.fatra} Kg</Text>
          </TouchableOpacity>
      </View>
    ))}
  </ScrollView>
  )}
  </View>
);

const SecondRoute = () => (
  <View style={styles.elementtabview}>
    {monthData[activeMonth].stockFiompina.length === 0 && (
      <Text style={styles.emptyListText}>Tsy misy</Text>
  )}
  {monthData[activeMonth].stockFiompina.length > 0 && (
    <ScrollView>
    {monthData[activeMonth].stockFiompina.map((item) => (
      <View key={item.idFio} style={styles.list}>
          <TouchableOpacity style={styles.listItemStock}  onLongPress={() => {showOptionsProduit(item); setIsFambolena(false)}}>
            <MaterialIcons name="pets" size={30} color="black" />
            <Text style={styles.itemText}>{item.anarana}: {item.isa} isa</Text>
          </TouchableOpacity>
      </View>
    ))}
  </ScrollView>
  )}
  </View>
);

const ThirdRoute = () => (
  <View style={styles.elementtabview}>
     <View style={styles.IMFcontent}>
     <Picker
              selectedValue={description}
              style={styles.input}
              onValueChange={(itemValue) => setDescription(itemValue)}
            >
              <Picker.Item label="OTIV" value="OTIV" />
              <Picker.Item label="CECAM" value="CECAM" />
              <Picker.Item label="CSA" value="CSA" />
              <Picker.Item label="FRDA" value="FRDA" />
              <Picker.Item label="ACEP-Madagascar	" value="ACEP-Madagascar	" />
              <Picker.Item label="MADACREDITO" value="MADACREDITO" />
              <Picker.Item label="apem-paiq	" value="apem-paiq" />
              <Picker.Item label="FIVOY" value="FIVOY" />
              <Picker.Item label="VAHATRA" value="VAHATRA" />
              <Picker.Item label="vola-mahasoa	" value="vola-mahasoa	" />
              <Picker.Item label="hafa" value="hafa" />
              {/* Add more icons as needed */}
            </Picker>
           <TextInput
              style={styles.input}
              placeholder="Vola hindramina"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
             <TextInput
              style={styles.input}
              placeholder="Tahan-janabola (isam-bolana)"
              keyboardType="numeric"
              value={tauxInter}
              onChangeText={setTaux}
            />
             <Text>Volana hamerenana</Text>
             <Picker
              selectedValue={moisDeRemboursement}
              style={styles.input}
              onValueChange={(itemValue) => setRembMois(itemValue)}
            >
              <Picker.Item label="Janvier" value="Janvier" />
              <Picker.Item label="Février" value="Février" />
              <Picker.Item label="Mars" value="Mars" />
              <Picker.Item label="Avril" value="Avril" />
              <Picker.Item label="Mai" value="Mai" />
              <Picker.Item label="Juin" value="Juin" />
              <Picker.Item label="Juillet" value="Juillet" />
              <Picker.Item label="Août" value="Août" />
              <Picker.Item label="Septembre" value="Septembre" />
              <Picker.Item label="Octobre" value="Octobre" />
              <Picker.Item label="Novembre" value="Novembre" />
              <Picker.Item label="Décembre" value="Décembre" />
            </Picker>
            <Button title={nomBouton} onPress={handleAddOrEditItem} />
  </View>
  </View>
);
const ForthRoute = () => (
  <View style={styles.elementtabview}>
     <View style={styles.IMFcontent}>
    <TextInput
              style={styles.input}
              placeholder="Montant"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <Picker
              selectedValue={selectedIcon}
              style={styles.input}
              onValueChange={(itemValue) => setSelectedIcon(itemValue)}
            >
              <Picker.Item label="Fambolena" value="gras" />
              <Picker.Item label="Tokan-trano" value="family-restroom" />
              <Picker.Item label="Fiompiana" value="pets" />
              {/* Add more icons as needed */}
            </Picker>
            <Button title={nomBouton} onPress={handleAddOrEditItem} />
            </View>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const renderScene2 = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  forth: ForthRoute,
});

const layout = useWindowDimensions();

const [index, setIndex] = React.useState(0);
const [routes] = React.useState([
  { key: 'first', title: 'Fambolena', },
  { key: 'second', title: 'Fiompiana' },
]);

  const [index2, setIndex2] = React.useState(0);
  const [routes2] = React.useState([
    { key: 'first', title: 'Fambolena', },
    { key: 'second', title: 'Fiompiana' },
    { key: 'third', title: 'IMF' },
    { key: 'forth', title: 'Hafa' },
  ]);



  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
      <TouchableOpacity style={styles.menuBurger} onPress={() => setVisibility(!afficherMenu)}>
                <MaterialIcons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.topBarText}>{months[activeMonth]}</Text>
        <TouchableOpacity style={styles.helpMenu} onPress={() => setStockVisible(true)}>
                <MaterialIcons name="store" marginRight ={width/100} size={30} color="white" />
        </TouchableOpacity>
      </View>
     <ScrollView>
      {afficherMenu && 
      <View style ={styles.menuList}>
          <TouchableOpacity style ={styles.tOpList}>
          <MaterialIcons name= "view-list" size={30} color="black" />
          <Text style={styles.itemText}>Liste</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.tOpList}>
          <MaterialIcons name= "download" size={30} color="black" />
          <Text style={styles.itemText}>Importer</Text>
          </TouchableOpacity> 
          <TouchableOpacity style ={styles.tOpList}>
          <MaterialIcons name= "upload" size={30} color="black" />
          <Text style={styles.itemText}>Exporter</Text>
          </TouchableOpacity>
           <TouchableOpacity style ={styles.tOpList}>
           <MaterialIcons name= "help" size={30} color="black" />
           <Text style={styles.itemText}>Guide</Text>
          </TouchableOpacity>
      </View>}
      <View style={styles.upperContainer}>
        <View style={styles.upperSection}>
          <Text style={styles.upperText}>Fandaniana</Text>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => { setIsCharge(true); setModalVisible(true); }}
          >
            <MaterialIcons name="add" size={30} color="white" />
          </TouchableOpacity>
          {monthData[activeMonth].charges.length === 0 && (
            <ImageBackground source={require('./assets/bg/depense.jpg')} resizeMode="cover" style={styles.image}>
              <Text style={styles.emptyListText}>0 Ar</Text>
            </ImageBackground>
          )}
          {monthData[activeMonth].charges.length > 0 && (
            <FlatList
              data={monthData[activeMonth].charges}
              keyExtractor={(item) => item.id}
              renderItem={renderListItem}
              style={styles.list}
            />
          )}
          <Text style={styles.bottomText}>Totaly : {monthData[activeMonth].charges.reduce((total, item) => total + parseFloat(item.amount), 0)} Ar</Text>
        </View>
        <View style={styles.upperSection}>
          <Text style={styles.upperText}>Vola Miditra</Text>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => { setIsCharge(false); setModalGainVisible(true); }}
          >
            <MaterialIcons name="add" size={30} color="white" />
          </TouchableOpacity>
          {monthData[activeMonth].gains.length === 0 && (
            <ImageBackground source={require('./assets/bg/gain.jpg')} resizeMode="cover" style={styles.image}>
              <Text style={styles.emptyListText}>0 Ar</Text>
            </ImageBackground>
          )}
          {monthData[activeMonth].gains.length > 0 && (
            <FlatList
              data={monthData[activeMonth].gains}
              keyExtractor={(item) => item.id}
              renderItem={renderListItem}
              style={styles.list}
            />
          )}
          <Text style={styles.bottomText}>Totaly : {monthData[activeMonth].gains.reduce((total, item) => total + parseFloat(item.amount), 0)} Ar</Text>
        </View>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Vola ampelantanana : {monthData[activeMonth].solde} Ariary</Text>
      </View>
      <View style={styles.monthsContainer}>
        <View style={styles.sideContainerTop}>
          {["Janvier", "Février", "Mars", "Avril"].map((month, index) => (
            <TouchableOpacity
              key={index}
              disabled = {checkIfDone(months.indexOf(month))}
              style={[styles.monthItem, months.indexOf(month) === activeMonth && styles.activeMonth, monthData[months.indexOf(month)].solde < 0 && styles.negativeBalance, checkIfDone(months.indexOf(month)) && styles.disabledMonth]}
              onPress={() =>{
                setActiveMonth(months.indexOf(month));
                console.log(activeMonth);
              } }
            >
              <Text style={styles.monthText}>{month}</Text>
              {months.indexOf(month) === activeMonth && <MaterialIcons name="place" size={24} color="red" />}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.sideContainerLeft}>
            {["Décembre", "Novembre"].map((month, index) => (
              <TouchableOpacity
                key={index}
                disabled = {checkIfDone(months.indexOf(month))}
                style={[styles.monthItem, months.indexOf(month) === activeMonth && styles.activeMonth, monthData[months.indexOf(month)].solde < 0 && styles.negativeBalance, checkIfDone(months.indexOf(month)) && styles.disabledMonth]}
                onPress={() =>{
                  setActiveMonth(months.indexOf(month));
                  console.log(activeMonth);
                } }
              >
                <Text style={styles.monthText}>{month}</Text>
                {months.indexOf(month) === activeMonth && <MaterialIcons name="place" size={24} color="red" />}
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.middleMiddleContainer}>
          <View style={styles.controlContainer}>
            <TouchableOpacity disabled = {disablePrev()} onPress={() => prev()} style = {disablePrev() && styles.disabledControl}>
              <MaterialIcons name ="navigate-before" size={width/15} color="white" />
            </TouchableOpacity>
            </View>
          <View style={styles.diceContainer}>
            <TouchableOpacity onPress={() => randomDice()}>
              <MaterialIcons name="casino" size={width/15} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.controlContainer}>
            <TouchableOpacity disabled = {disableNext} onPress={() => next()}>
              <MaterialIcons name="navigate-next" size={width/15} color="white" />
            </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sideContainerRight}>
            {["Mai", "Juin"].map((month, index) => (
              <TouchableOpacity
                key={index}
                disabled = {checkIfDone(months.indexOf(month))}
                style={[styles.monthItem, months.indexOf(month) === activeMonth && styles.activeMonth, monthData[months.indexOf(month)].solde < 0 && styles.negativeBalance, checkIfDone(months.indexOf(month)) && styles.disabledMonth]}
                onPress={() =>{
                  setActiveMonth(months.indexOf(month));
                  console.log(activeMonth);
                } }
              >
                <Text style={styles.monthText}>{month}</Text>
                {months.indexOf(month) === activeMonth && <MaterialIcons name="place" size={24} color="red" />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.sideContainerBottom}>
          {["Octobre", "Septembre", "Août", "Juillet"].map((month, index) => (
            <TouchableOpacity
              key={index}
              disabled = {checkIfDone(months.indexOf(month))}
              style={[styles.monthItem, months.indexOf(month) === activeMonth && styles.activeMonth, monthData[months.indexOf(month)].solde < 0 && styles.negativeBalance, checkIfDone(months.indexOf(month)) && styles.disabledMonth]}
              onPress={() =>{
                setActiveMonth(months.indexOf(month));
                console.log(activeMonth);
              } }
            >
              <Text style={styles.monthText}>{month}</Text>
              {months.indexOf(month) === activeMonth && <MaterialIcons name="place" size={24} color="red" />}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      </ScrollView>

      <Modal
          transparent={true}
          visible={modalDepart}
          animationType="slide"
          onRequestClose={() => setModalDepart(false)}
        >
          <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Ampidiro ireo tahiry ampelatananao </Text>
          <TextInput
              style={styles.input}
              placeholder="Tahirim-bola"
              keyboardType="numeric"
              value={budjetInitiale}
              onChangeText={setBudjetInitiale}
            />
            <View style = {styles.tahiry}>
              <Text style={styles.optionText3}>Tahirim-bokatra :</Text>
              <TouchableOpacity style={styles.hanampy} onPress={handleAddOrEditStockFamb}>
                  <Text style={styles.optionText2}>+ Hanampy</Text>
                </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Inona"
              value={karazana}
              onChangeText={setKarazana}
            /> 
            <TextInput
            style={styles.input}
            placeholder="Fatra (kilao)"
            keyboardType="numeric"
            value={fatra}
            onChangeText={setFatra}
          /> 
          <View style = {styles.tahiry}>
          <Text style={styles.optionText3} >Biby fiompy :</Text>
          <TouchableOpacity style={styles.hanampy} onPress={handleAddOrEditStockFio}>
              <Text style={styles.optionText2}>+ Hanampy</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Inona"
            value={anarana}
            onChangeText={setAnarana}
          /> 
          <TextInput
          style={styles.input}
          placeholder="Isa"
          keyboardType="numeric"
          value={isa}
          onChangeText={setIsa}
        />
            <TouchableOpacity style={styles.modalSuite} onPress={() => newAmount(budjetInitiale)}>
              <Text style={styles.optionText2}>Hanohy</Text>
            </TouchableOpacity>
          </View>
          </View>
      </Modal>



      <Modal
          transparent={true}
          visible={seeStock}
          animationType="slide"
          onRequestClose={() => setStockVisible(false)}
        >
          <View style={styles.modal3Container}>
           <View style = {styles.contenuDuStock}>
          <View style = {styles.TitreModal}>
          <Text style={styles.modalTitle}>Stock</Text>
          <TouchableOpacity style={styles.modalFermer}  onPress={() => setStockVisible(false)}>
                  <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style = {styles.TabViews}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
          </View>
          </View>
          </View>
      </Modal>


      <Modal
          transparent={true}
          visible={modalGain}
          animationType="slide"
          onRequestClose={() => setModalGainVisible(false)}
        >
          <View style={styles.modal3Container}>
           <View style = {styles.contenuDuStock}>
          <View style = {styles.TitreModal}>
          <Text style={styles.modalTitle}>Fidirambola </Text>
          <TouchableOpacity style={styles.modalFermer}  onPress={() => setModalGainVisible(false)}>
                  <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style = {styles.TabViews}>
          <TabView
            navigationState={{ index: index2, routes: routes2 }}
            renderScene={renderScene2}
            onIndexChange={setIndex2}
            initialLayout={{ width: layout.width }}
          />
          </View>
          </View>
          </View>
      </Modal>


      <Modal
          transparent={true}
          visible={modal2Visible}
          animationType="slide"
          onRequestClose={() => setModal2Visible(false)}
        >
          <View style={styles.modal2Container}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalOptTxt} onPress={() => handleEditItem(selectedItem)}>
              <Text style={styles.optionText}>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOptTxt} onPress={() => handleDeleteItem(selectedItem.id)}>
              <Text style={styles.optionText}>Supprimer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModal2Visible(false)}>
              <Text style={styles.annulerTxt} >Annuler</Text>
            </TouchableOpacity>
          </View>
          </View>
      </Modal>

      <Modal
          transparent={true}
          visible={modal3Visible}
          animationType="slide"
          onRequestClose={() => setModal3Visible(false)}
        >
          <View style={styles.modal2Container}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalOptTxt} onPress={() => handleEditProduit(selectedProduit)}>
              <Text style={styles.optionText}>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOptTxt} onPress={() => handleDeleteProduit(isFambolena ? selectedProduit.idFamb : selectedProduit.idFio)}>
              <Text style={styles.optionText}>Supprimer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOptTxt} onPress={() =>  setModalVenteVisible(true)}>
              <Text style={styles.optionText}>Vendre</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModal3Visible(false)}>
              <Text style={styles.annulerTxt} >Annuler</Text>
            </TouchableOpacity>
          </View>
          </View>
      </Modal>

      <Modal
        transparent={true}
        visible={modalUpdateVisible}
        animationType="slide"
        onRequestClose={isFambolena ? resetDonnesFamb : resetDonnesFio}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{isFambolena ? 'Fambolena' : 'Fiompiana'}</Text>
            <TextInput
              style={styles.input}
              placeholder={isFambolena ? karazana : anarana}
              value={isFambolena ? karazana : anarana}
              onChangeText={isFambolena ? setKarazana : setAnarana}
            />
            <TextInput
              style={styles.input}
              placeholder={isFambolena ? fatra : isa}
              keyboardType="numeric"
              value={isFambolena ? fatra : isa}
              onChangeText={isFambolena ? setFatra : setIsa}
            />
            <Button title="modifier" onPress={() => {isFambolena ? handleAddOrEditStockFamb() : handleAddOrEditStockFio()}} />
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={modalVenteVisible}
        animationType="slide"
        onRequestClose={isFambolena ? resetDonnesFamb : resetDonnesFio}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{isFambolena ? 'Hivarotra Voly' : 'Hivarotra Biby Fiompy'}</Text>
            <TextInput
              style={styles.input}
              placeholder={isFambolena ? 'Vidiny / famarana' : "Vidin'ny iray"}
              value={Pu}
              keyboardType="numeric"
              onChangeText={setPu}
            />
            <TextInput
              style={styles.input}
              placeholder="Fatra na isa hamidy"
              keyboardType="numeric"
              value={FatraNaIsa}
              onChangeText={setFatraNaIsa}
            />
            <Button title="Hivarotra" onPress={() => {isFambolena ? handleHivarotraFamb(selectedProduit) : handleHivarotraFio(selectedProduit)}} />
          </View>
        </View>
      </Modal>

    <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={resetModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{isCharge ? 'Ajouter une Charge' : 'Ajouter un Gain'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Montant"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <Picker
              selectedValue={selectedIcon}
              style={styles.input}
              onValueChange={(itemValue) => setSelectedIcon(itemValue)}
            >
              <Picker.Item label="Fambolena" value="gras" />
              <Picker.Item label="Tokan-trano" value="family-restroom" />
              <Picker.Item label="Fiompiana" value="pets" />
              {/* Add more icons as needed */}
            </Picker>
            <Button title={nomBouton} onPress={handleAddOrEditItem} />
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={estTerminé()}
        animationType="slide"
        onRequestClose={resetModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tour terminé !</Text>
            <TouchableOpacity style={styles.modalOptTxt} onPress={() => terminer()}>
              <Text style={styles.optionText}>Scéance de conseil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOptTxt} onPress={() => nouveaujeu()}>
              <Text style={styles.optionText}>Nouveau jeu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={seeDiceM}
        animationType="fade"
        onRequestClose={resetModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Resultat</Text>
              <Text style={styles.optionText}>{(randomValue + 1)}</Text>
              <Text style={styles.optionText}>{ResultatDe[randomValue]}</Text>
              <TouchableOpacity onPress={() => setDiceModVis(false)}>
              <Text style={styles.annulerTxt} >Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Plateau;