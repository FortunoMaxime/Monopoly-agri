import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const Plateau = () => {
  const [modalDepart, setModalDepart] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCharge, setIsCharge] = useState(true);
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [nomBouton, setNomBouton] = useState('Ajouter');
  const [seeStock, setStockVisible] = useState(false);
  const [budjetInitiale, setBudjetInitiale] = useState(0);
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  // Initialize monthData array with charges and gains properties for each month
  const initialMonthData = months.map((month, index) => ({
    month,
    charges: [],
    gains: [],
    stockFambolena: [],
    stockFiompina: [],
    solde: (index === activeMonth ? budjetInitiale : 0),
  }));
  const [monthData, setMonthData] = useState(initialMonthData);

  useEffect(() => {
    const updatedMonthData = months.map((month, index) => ({
     ...initialMonthData[index],
      solde: (index === activeMonth? budjetInitiale : 0),
    }));
    setMonthData(updatedMonthData);
  }, [budjetInitiale, activeMonth]);  

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
      console.log(newStockFio.anarana + '  ' + newStockFio.isa);
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
  };
  const resetDonnesFio = () => {
    setAnarana('');
    setIsa('');
    setEditingStockFioId(null);
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
  
  

  const renderListItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => showOptions(item)}
      style={styles.listItem}
    >
      <MaterialIcons name={item.icon} size={30} color="black" />
      <Text style={styles.itemText}>{item.description}: {item.amount} Ar</Text>
    </TouchableOpacity>
  );
  const renderStockItemFamb = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => showOptions(item)}
      style={styles.listItem}
    >
      <MaterialIcons name="agriculture" size={30} color="black" />
      <Text style={styles.itemText}>{item.karazana}: {item.fatra} Ar</Text>
    </TouchableOpacity>
  );
  const renderStockItemFio = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => showOptions(item)}
      style={styles.listItem}
    >
      <MaterialIcons name="pets" size={30} color="black" />
      <Text style={styles.itemText}>{item.anarana}: {item.isa} Ar</Text>
    </TouchableOpacity>
  );

  const showOptions = (item) => {
    setModal2Visible(true);
    setSelectedItem(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
      <TouchableOpacity style={styles.menuBurger} onPress={() => console.log('Menu clicked')}>
                <MaterialIcons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.topBarText}>{months[activeMonth]}</Text>
        <TouchableOpacity style={styles.helpMenu} onPress={() => setStockVisible(true)}>
                <MaterialIcons name="store" marginRight ={width/100} size={30} color="white" />
        </TouchableOpacity>
      </View>
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
            onPress={() => { setIsCharge(false); setModalVisible(true); }}
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
              style={[styles.monthItem, months.indexOf(month) === activeMonth && styles.activeMonth, monthData[months.indexOf(month)].solde < 0 && styles.negativeBalance]}
              onPress={() => setActiveMonth(months.indexOf(month))}
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
                style={[styles.monthItem, months.indexOf(month) === activeMonth && styles.activeMonth, monthData[months.indexOf(month)].solde < 0 && styles.negativeBalance]}
                onPress={() => setActiveMonth(months.indexOf(month))}
              >
                <Text style={styles.monthText}>{month}</Text>
                {months.indexOf(month) === activeMonth && <MaterialIcons name="place" size={24} color="red" />}
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.diceContainer}>
            <TouchableOpacity onPress={() => setActiveMonth(Math.floor(Math.random() * 12))}>
              <MaterialIcons name="casino" size={width/15} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveMonth(Math.floor(Math.random() * 12))}>
              <MaterialIcons name="casino" size={width/15} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.sideContainerRight}>
            {["Mai", "Juin"].map((month, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.monthItem, months.indexOf(month) === activeMonth && styles.activeMonth, monthData[months.indexOf(month)].solde < 0 && styles.negativeBalance]}
                onPress={() => setActiveMonth(months.indexOf(month))}
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
              style={[styles.monthItem, months.indexOf(month) === activeMonth && styles.activeMonth, monthData[months.indexOf(month)].solde < 0 && styles.negativeBalance]}
              onPress={() => setActiveMonth(months.indexOf(month))}
            >
              <Text style={styles.monthText}>{month}</Text>
              {months.indexOf(month) === activeMonth && <MaterialIcons name="place" size={24} color="red" />}
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
          <View style={styles.modalContent2}>
          <View style = {styles.TitreModal}>
          <Text style={styles.modalTitle}>Stock</Text>
          <TouchableOpacity style={styles.modalFermer}  onPress={() => setStockVisible(false)}>
                  <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalTitle}>Fambolena</Text>
          {monthData[activeMonth].stockFambolena.length === 0 && (
              <Text style={styles.emptyListText}>Tsy misy</Text>
          )}
          {monthData[activeMonth].stockFambolena.length > 0 && (
            <FlatList
              data={monthData[activeMonth].stockFambolena}
              keyExtractor={(item) => item.idFamb}
              renderItem={renderStockItemFamb}
              style={styles.list}
            />
          )}
           <Text style={styles.modalTitle}>Fiompiana</Text>
          {monthData[activeMonth].stockFiompina.length === 0 && (
              <Text style={styles.emptyListText}>Tsy misy</Text>
          )}
          {monthData[activeMonth].stockFiompina.length > 0 && (
            <FlatList
              data={monthData[activeMonth].stockFiompina}
              keyExtractor={(item) => item.idFio}
              renderItem={renderStockItemFio}
              style={styles.list}
            />
          )}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: height / 200,
    backgroundColor: '#228b22',
  },
  menuBurger :{
    justifyContent : 'center',
    alignItems : 'center',
    left : width /60,
  },
  topBarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign : 'center',
    margin: 'auto',
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    height: height * 0.35,
  },
  upperSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    flex: 1,
    flexDirection: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width : '80%',
    height : '60%',
    margin : 'auto',
  },
  upperText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  floatingButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#34A853',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    zIndex : 33,
  },
  bottomText: {
    fontSize: 14,
    color: '#666666',
    margin: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFFFFF',
    width :'100%',
    borderTopRightRadius: 20,
  },
  totalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    height: height * 0.45,
  },
  sideContainerLeft: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sideContainerRight: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderColor: 'green',
    marginLeft: 'auto',
    marginRight : width/100,
  },
  sideContainerTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
  },
  sideContainerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
    borderColor: 'blue',
    margin: 'auto',
  },
  middleContainer: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: width/200,
  },
  diceContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34A853',
    height: width * 0.15,
    width: width * 0.15,
    marginVertical: 'auto',
    marginHorizontal: width / 5.5,
    borderRadius: 10,
  },
  monthItem: {
    width: width * 0.22,
    height: width * 0.12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#346751',
    margin: 5,
    borderRadius: 5,
    marginVertical: height/150,
  },
  monthText: {
    fontSize: width/40,
    color: '#FFFFFF',
  },
  activeMonth: {
    backgroundColor: '#4E9F3D',
  },
  negativeBalance : {
    backgroundColor : 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal2Container:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal3Container:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop : height/8,
  },
  TitreModal : {
    flexDirection : 'row',
    width : "100%",
    justifyContent : 'center',
  },
  modalFermer: {
    height :  height / 24,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    width : height / 24,
    borderRadius : height / 12,
    position:'absolute',
    right : 0,
    justifyContent :'center',
    alignItems : 'center',
  },
  modalContent2: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '95%',
    alignItems: 'center',
  },
  modalOptTxt: {
    width:  '90%',
    height :  height / 18,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding : 10,
    margin : 5,
    justifyContent : 'center',
    alignItems: 'center',
    borderRadius : 10,
  },
  modalSuite: {
    width:  '90%',
    height :  height / 18,
    backgroundColor: 'green',
    padding : 10,
    margin : 5,
    justifyContent : 'center',
    alignItems: 'center',
    borderRadius : 10,
  },
  optionText2: {
    color: '#fff',
  },
  optionText3 : {
    fontWeight : 'bold',
  },
  tahiry: {
    flexDirection : 'row',
    width :'100%',
    alignItems : 'center',
    height : 'content',
    paddingVertical : height / 50,
  },
  hanampy: {
    width:  '40%',
    height :  height / 20,
    backgroundColor: 'green',
    justifyContent : 'center',
    alignItems: 'center',
    padding : 5,
    position : 'absolute',
    right : 0,
    borderRadius : 10,
  },
  annulerTxt : {
    color: 'red',
    fontWeight : 'bold',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 5,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  itemText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  itemAmount: {
    fontSize: 14,
    color: '#666666',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyListText:{
    marginTop: '30%',
    color: '#ccc',
    fontSize : height / 40,
  }
});
export default Plateau;