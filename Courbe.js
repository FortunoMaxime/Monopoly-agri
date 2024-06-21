import React, { useState, useEffect, useCallback } from 'react';
import { View, Dimensions, StyleSheet, Text, ScrollView } from 'react-native';
import { LineChart, StackedBarChart } from 'react-native-chart-kit';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';

const Courbe = () => {

  const route = useRoute();
  const { itemId } = route.params;

  const [db, setDb] = useState(null);
  const [fandanina, setFandanina] = useState([]);
  const [fidirana, setFidirana] = useState([]);
  const [maxValue, setMaxValue] = useState(null);
  const [moisMaxValue, setMoisMaxValue] = useState(null);
  const [karazanyMaxValue, setKarazanyMaxValue] = useState(null);
  const [maxFidirana, setMaxFidirana] = useState(null);
  const [MoisMaxFidirana, setMoisMaxFidirana] = useState(null);
  const [karazanyMaxFidirana, setKarazanyMaxFidirana] = useState(null);

  const [Maxligne, setMaxligne] = useState(null);
  const [karazanyValeurligne, setKarazanyligne] = useState(null);

  const [MaxligneFidirana, setMaxligneFidirana] = useState(null);
  const [karazanyligneFidirana, setKarazanyligneFidirana] = useState(null);

  useEffect(() => {
    const initializeDB = async () => {
      const db = await SQLite.openDatabaseAsync('monopoly.db');
      setDb(db);
    };
    initializeDB();
  }, []);

  useEffect(() => {
    if (db) {
      fetchData();
    }
  }, [db]);

  const fetchData = useCallback(async () => {
    await recupereDonnees1(itemId);
    await recupereDonnees2(itemId);
   
  }, [itemId]);

  useEffect(async() => {
    await recupereDonneesFandanina(itemId);
    await recupereDonneesFidiralbola(itemId);
  }, [fidirana,fandanina]);

  const recupereDonneesFandanina = async (id) => {
    try {
      const db = await SQLite.openDatabaseAsync('monopoly.db');
      let result = await db.getAllAsync(`SELECT Karazany, Janvier, Fevrier, Mars, Avril, Mai, Juin, Juillet, Aout, Sepetembre, Octobre, Novembre, Descembre FROM Fandaniana WHERE MpamokatraId=${id}`);

      for (let i = 0; i < result.length; i++) {
        for (let key in result[i]) {
          if (result[i][key] === "") {
            result[i][key] = 0;
          }
        }
      }
      console.log('result ito', result);

      const processedData = result.map(row => [
        row.Karazany, row.Janvier, row.Fevrier, row.Mars, row.Avril, row.Mai, row.Juin, row.Juillet, row.Aout, row.Sepetembre, row.Octobre, row.Novembre, row.Descembre,
        Object.values(row).slice(1).reduce((acc, val) => acc + parseInt(val, 10), 0).toString()
      ]);

     // const combinedData = [data[0], ...processedData];
     const valeursparligne = result.map(row => {
      const valeurs = [
        row.Janvier, row.Fevrier, row.Mars, row.Avril, row.Mai, row.Juin, row.Juillet, row.Aout, row.Septembre, row.Octobre, row.Novembre, row.Decembre
      ];
    
      // Convertir chaque valeur en nombre, en traitant les vides comme des zéros
      const parsedValeurs = valeurs.map(val => {
        const parsedVal = parseInt(val, 10);
        return isNaN(parsedVal) ? 0 : parsedVal;  // Convertir en 0 si la valeur ne peut pas être convertie
      });
    
      // Calculer la somme des valeurs
      const totalValeur = parsedValeurs.reduce((acc, curr) => acc + curr, 0);
      
      console.log('ito le row.karazany', row.Karazany);  // Récupère la valeur de "Karazany"
     setKarazanyligne(row.Karazany);
      return totalValeur;
    });
    
    console.log(valeursparligne);  
    setMaxligne(valeursparligne);

     let maxVal = -Infinity;
     let karazanyOfMax = null;
     let moisOfMax = null;
     const mois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Sepetembre', 'Octobre', 'Novembre', 'Descembre'];

     for (let i = 0; i < result.length; i++) {
       const row = result[i];
       const values = Object.values(row).slice(1).map(Number); // Exclure la première et la dernière colonne
       for (let j = 0; j < values.length; j++) {
         if (values[j] > maxVal) {
           maxVal = values[j];
           karazanyOfMax = row.Karazany; // Récupérer la valeur de la première colonne
           moisOfMax = mois[j]; // Récupérer le mois correspondant
         }
       }
     }

     setMaxValue(maxVal);
     setKarazanyMaxValue(karazanyOfMax);
     setMoisMaxValue(moisOfMax);

    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };
  const recupereDonneesFidiralbola = async (id) => {
    try {
      const db = await SQLite.openDatabaseAsync('monopoly.db');
      let result = await db.getAllAsync(`SELECT Karazany, Janvier, Fevrier, Mars, Avril, Mai, Juin, Juillet, Aout, Sepetembre, Octobre, Novembre, Descembre FROM Fidirambola WHERE MpamokatraId=${id}`);

      for (let i = 0; i < result.length; i++) {
        for (let key in result[i]) {
          if (result[i][key] === "") {
            result[i][key] = 0;
          }
        }
      }
      console.log('result ito', result);

      const processedData = result.map(row => [
        row.Karazany, row.Janvier, row.Fevrier, row.Mars, row.Avril, row.Mai, row.Juin, row.Juillet, row.Aout, row.Sepetembre, row.Octobre, row.Novembre, row.Descembre,
        Object.values(row).slice(1).reduce((acc, val) => acc + parseInt(val, 10), 0).toString()
      ]);

     // const combinedData = [data[0], ...processedData];
     const valeursparligne = result.map(row => {
      const valeurs = [
        row.Janvier, row.Fevrier, row.Mars, row.Avril, row.Mai, row.Juin, row.Juillet, row.Aout, row.Septembre, row.Octobre, row.Novembre, row.Decembre
      ];
    
      // Convertir chaque valeur en nombre, en traitant les vides comme des zéros
      const parsedValeurs = valeurs.map(val => {
        const parsedVal = parseInt(val, 10);
        return isNaN(parsedVal) ? 0 : parsedVal;  // Convertir en 0 si la valeur ne peut pas être convertie
      });
    
      // Calculer la somme des valeurs
      const totalValeur = parsedValeurs.reduce((acc, curr) => acc + curr, 0);
      
      console.log('ito le row.karazany', row.Karazany);  // Récupère la valeur de "Karazany"
     setKarazanyligneFidirana(row.Karazany);
      return totalValeur;
    });
    
    console.log(valeursparligne);  
   
   setMaxligneFidirana(valeursparligne);

     let maxVal = -Infinity;
     let karazanyOfMax = null;
     let moisOfMax = null;
     const mois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Sepetembre', 'Octobre', 'Novembre', 'Descembre'];

     for (let i = 0; i < result.length; i++) {
       const row = result[i];
       const values = Object.values(row).slice(1).map(Number); // Exclure la première et la dernière colonne
       for (let j = 0; j < values.length; j++) {
         if (values[j] > maxVal) {
           maxVal = values[j];
           karazanyOfMax = row.Karazany; // Récupérer la valeur de la première colonne
           moisOfMax = mois[j]; // Récupérer le mois correspondant
         }
       }
     }

      setMaxFidirana(maxVal);
      setKarazanyMaxFidirana(karazanyOfMax);
      setMoisMaxFidirana(moisOfMax);

    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const recupereDonnees1 = async (id) => {
    try {
      let result = await db.getAllAsync(`SELECT Janvier, Fevrier, Mars, Avril, Mai, Juin, Juillet, Aout, Sepetembre, Octobre, Novembre, Descembre FROM TotalyFandaniana WHERE MpamokatraId=${id}`);
      console.log('resut',result);
      for (let i = 0; i < result.length; i++) {
        for (let key in result[i]) {
          if (result[i][key] === "" || result[i][key] === null) {
            result[i][key] = 0;
          }
          console.log(`fidirana[${i}][${key}] = `, result[i][key]);
        }
      }
      setFandanina(result);
      console.log(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };
  const recupereDonnees2 = async (id) => {
    try {
      let result = await db.getAllAsync(`SELECT Janvier, Fevrier, Mars, Avril, Mai, Juin, Juillet, Aout, Sepetembre, Octobre, Novembre, DeScembre FROM TotalyFidirana WHERE MpamokatraId=${id}`);

      for (let i = 0; i < result.length; i++) {
        for (let key in result[i]) {
          if (result[i][key] === "" || result[i][key] === null) {
            result[i][key] = 0;
          }
         // console.log(`fidirana[${i}][${key}] = `, result[i][key]);
        }
      }

      setFidirana(result);
      console.log('ITO NGAMBA',result);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const getValue = (index, key) => {
    return (fandanina[index] && fandanina[index][key] !== undefined) ? fandanina[index][key] : 0;
  };
  const getValue1 = (index, key) => {
    return (fidirana[index] && fidirana[index][key] !== undefined) ? fidirana[index][key] : 0;
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [
          getValue(0, "Janvier"),
          getValue(0, "Fevrier"),
          getValue(0, "Mars"),
          getValue(0, "Avril"),
          getValue(0, "Mai"),
          getValue(0, "Juin"),
          getValue(0, "Juillet"),
          getValue(0, "Aout"),
          getValue(0, "Septembre"),
          getValue(0, "Octobre"),
          getValue(0, "Novembre"),
          getValue(0, "Decembre")
        ],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      },
      {
        data: [
          getValue1(0, "Janvier"),
          getValue1(0, "Fevrier"),
          getValue1(0, "Mars"),
          getValue1(0, "Avril"),
          getValue1(0, "Mai"),
          getValue1(0, "Juin"),
          getValue1(0, "Juillet"),
          getValue1(0, "Aout"),
          getValue1(0, "Septembre"),
          getValue1(0, "Octobre"),
          getValue1(0, "Novembre"),
          getValue1(0, "Decembre")
        ],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      },
    ],
  };

  const stackedData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    legend: ['Fandanina', 'Fidirana'],
    data: [
      [
        getValue(0, "Janvier"),
        getValue(0, "Fevrier"),
        getValue(0, "Mars"),
        getValue(0, "Avril"),
        getValue(0, "Mai"),
        getValue(0, "Juin"),
        getValue(0, "Juillet"),
        getValue(0, "Aout"),
        getValue(0, "Septembre"),
        getValue(0, "Octobre"),
        getValue(0, "Novembre"),
        getValue(0, "Decembre")
      ],
      [
        getValue1(0, "Janvier"),
        getValue1(0, "Fevrier"),
        getValue1(0, "Mars"),
        getValue1(0, "Avril"),
        getValue1(0, "Mai"),
        getValue1(0, "Juin"),
        getValue1(0, "Juillet"),
        getValue1(0, "Aout"),
        getValue1(0, "Septembre"),
        getValue1(0, "Octobre"),
        getValue1(0, "Novembre"),
        getValue1(0, "Decembre")
      ]
    ],
    barColors: ['#1E90FF', '#FF6347'],
  };

 const chartConfig = {
    backgroundColor: '#f5f5f5',
    backgroundGradientFrom: '#dfe4ea',
    backgroundGradientTo: '#ceebd9',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
      fontFamily: 'sans-serif',
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    },
    propsForVerticalLabels: {
      angle: -30,
      yOffset: -10,
    },
  };


  // Calculate differences between the datasets
  const differences = data.datasets[1].data.map((value, index) => {
    const differenceValue = value - data.datasets[0].data[index];
    return { value: differenceValue };
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Analyse Financière</Text>
        <Text style={styles.subtitle}>Bénéfices et Pertes par Mois</Text>
      </View>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={550}
        yAxisSuffix={' Ar'}
        yAxisInterval={1}
        chartConfig={chartConfig}
        style={{ marginVertical: 8, borderRadius: 16 }}
        withInnerLines={true}
        withOuterLines={true}
        withDots={true}
        withHorizontalLabels={true}
        withVerticalLabels={true}
        withHorizontalGridlines={false}
        withVerticalGridlines={false}
        withChainedModeActive={true}
        withScrollableXAxis={true}
      />
    {/* <StackedBarChart
        data={stackedData}
        width={Dimensions.get('window').width - 40}
        height={550}
        yAxisSuffix={' Ar'}
        yAxisInterval={1}
        chartConfig={chartConfig}
        style={{ marginVertical: 8, borderRadius: 16 }}
  />*/}
       <View style={styles.differencesContainer}>
        <Text style={styles.differencesTitle}>Différences Mensuelles</Text>
        <View style={styles.differencesTable}>
          {differences.map((diff, index) => (
            <View key={index} style={styles.differenceRow}>
              <Text style={styles.monthLabel}>{data.labels[index]}</Text>
              <Text style={styles.differenceValue}>{diff.value.toFixed(2)} Ar</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.card}>
      <Text style={styles.differencesTitle}>Dépesnes maximum de l'exploitation</Text>
      <View style={styles.differencesTable}>
        <Text style={styles.maxText}>{karazanyValeurligne}:{Maxligne} </Text>
      </View>
      <Text style={styles.differencesTitle}>Benefice maximum de l'exploitation</Text>
      <View style={styles.differencesTable}>
        <Text style={styles.maxText}>{karazanyligneFidirana}:{MaxligneFidirana} </Text>
      </View>
      </View>
      <View style={styles.maxContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dépense Maximum des mois</Text>
          <Text style={styles.cardText}>Montant: {maxValue}</Text>
          <Text style={styles.cardText}>Mois: {moisMaxValue}</Text>
          <Text style={styles.cardText}>Type: {karazanyMaxValue}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bénéfice Maximum des mois</Text>
          <Text style={styles.cardText}>Montant: {maxFidirana}</Text>
          <Text style={styles.cardText}>Mois: {MoisMaxFidirana}</Text>
          <Text style={styles.cardText}>Type: {karazanyMaxFidirana}</Text>
        </View>
      </View>
     { /*<Text style={styles.differencesTitle}>Dépesnes maximum </Text>
      <View style={styles.differencesTable}>
        <Text style={styles.maxText}>Valeur maximale des dépenses: {maxValue} (Karazany: {karazanyMaxValue}, Mois: {moisMaxValue})</Text>
        <Text style={styles.maxText}>Valeur maximale des recettes: {maxFidirana} (Karazany: {karazanyMaxFidirana}, Mois: {MoisMaxFidirana})</Text>
        </View>*/}
      <View style={styles.spacebe} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  spacebe: {
    height: 60,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
  },
  differencesContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  differencesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  differencesTable: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
  },
  differenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  monthLabel: {
    fontSize: 16,
  },
  differenceValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
   maxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
    marginBottom: 2,
  },
});

export default Courbe;