import React from 'react';
import { View, Dimensions,StyleSheet,Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const Courbe = () => {
  // Définition des données pour le graphique
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [
          Math.random() * 100000, // Exemple de valeur aléatoire pour janvier
          Math.random() * 100000, // Exemple de valeur aléatoire pour février
          Math.random() * 100000, // Exemple de valeur aléatoire pour mars
          Math.random() * 100000, // Exemple de valeur aléatoire pour avril
          Math.random() * 100000, // Exemple de valeur aléatoire pour mai
          Math.random() * 100000, // Exemple de valeur aléatoire pour juin
          Math.random() * 100000, // Exemple de valeur aléatoire pour juillet
          Math.random() * 100000, // Exemple de valeur aléatoire pour août
          Math.random() * 100000, // Exemple de valeur aléatoire pour septembre
          Math.random() * 100000, // Exemple de valeur aléatoire pour octobre
          Math.random() * 100000, // Exemple de valeur aléatoire pour novembre
          Math.random() * 100000, // Exemple de valeur aléatoire pour décembre
        ],
        color: (opacity = 1) => `rgba(192, 112, 47, ${opacity})`, // Couleur des barres
      },
    ],
  };
  const data1 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [
          Math.random() * 100000, // Exemple de valeur aléatoire pour janvier
          Math.random() * 100000, // Exemple de valeur aléatoire pour février
          Math.random() * 100000, // Exemple de valeur aléatoire pour mars
          Math.random() * 100000, // Exemple de valeur aléatoire pour avril
          Math.random() * 100000, // Exemple de valeur aléatoire pour mai
          Math.random() * 100000, // Exemple de valeur aléatoire pour juin
          Math.random() * 100000, // Exemple de valeur aléatoire pour juillet
          Math.random() * 100000, // Exemple de valeur aléatoire pour août
          Math.random() * 100000, // Exemple de valeur aléatoire pour septembre
          Math.random() * 100000, // Exemple de valeur aléatoire pour octobre
          Math.random() * 100000, // Exemple de valeur aléatoire pour novembre
          Math.random() * 100000, // Exemple de valeur aléatoire pour décembre
        ],
        color: (opacity = 1) => `rgba(192, 112, 47, ${opacity})`, // Couleur des barres
      },
    ],
  };
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Assurez-vous que cette fonction existe
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
    propsForLabels: {
      fontSize: 14,
      fontFamily: 'sans-serif',
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Ajoutez une fonction color ici si nécessaire
    },
    propsForVerticalLabels: {
      angle: -30,
      yOffset: -10,
    },
  };
  
 
   return (
     <View style={styles.container}>
       {/* Titre et Sous-titre */}
       <View style={styles.header}>
         <Text style={styles.title}>Analyse Financière</Text>
         <Text style={styles.subtitle}>Bénéfices et Pertes par Mois</Text>
       </View>
 
       {/* Premier Graphique de Barres */}
       <BarChart
         data={data}
         width={Dimensions.get('window').width - 40}
         height={300}
         yAxisSuffix={' Ar'}
         yAxisInterval={1}
         chartConfig={chartConfig}
         bezier
         style={{ marginVertical: 8, borderRadius: 16 }}
         withInnerLines={false}
         withOuterLines={false}
         withDots={false}
         withHorizontalLabels={true}
         withVerticalLabels={true}
         withHorizontalGridlines={false}
         withVerticalGridlines={false}
         withChainedModeActive={true}
         withScrollableXAxis={true}
       />
 
       {/* Légende */}
       <Text style={styles.legend}>Bénéfices et Pertes</Text>
 
       {/* Titre et Sous-titre après la première simulation */}
       <View style={[styles.header, { marginTop: 20 }]}>
         <Text style={styles.title}>Analyse Financière après un tour de Kilalao-mpitatanana</Text>
         <Text style={styles.subtitle}>Bénéfices et Pertes par Mois</Text>
       </View>
 
       {/* Deuxième Graphique de Barres */}
       <BarChart
         data={data1}
         width={Dimensions.get('window').width - 40}
         height={300}
         yAxisSuffix={' Ar'}
         yAxisInterval={1}
         chartConfig={chartConfig}
         bezier
         style={{ marginVertical: 8, borderRadius: 16 }}
         withInnerLines={false}
         withOuterLines={false}
         withDots={false}
         withHorizontalLabels={true}
         withVerticalLabels={true}
         withHorizontalGridlines={false}
         withVerticalGridlines={false}
         withChainedModeActive={true}
         withScrollableXAxis={true}
       />
 
       {/* Légende */}
       <Text style={styles.legend}>Bénéfices et Pertes</Text>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
     paddingHorizontal: 20,
   },
   header: {
     flexDirection: 'column',
     alignItems: 'center',
     marginBottom: 20,
   },
   title: {
     fontSize: 24,
     fontWeight: 'bold',
   },
   subtitle: {
     fontSize: 18,
     color: '#888',
   },
   legend: {
     marginTop: 10,
     marginLeft: 10,
   },
 });
 
 export default Courbe; 