import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import ExcelSimulator from './EntrerManuel';
import BudgetInitialEntrer from './BudgetInitialEntrer';
import Famakafakana from './famakafakana';
import Production from './CalendrierEntrer';

const Tab = createBottomTabNavigator();

const Pagination = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "A.G.E") {
            iconName = 'event';
          } else if (route.name === "Filan'ny fianakaviana") {
            iconName = 'money';
          } else if (route.name === 'Tetibola voalohany') {
            iconName = 'attach-money';
          } else if (route.name === 'Kalandrie') {
            iconName = 'timeline';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#34A853', // Couleur de l'icône lorsque l'onglet est actif
        tabBarInactiveTintColor: '#888', // Couleur de l'icône lorsque l'onglet est inactif
        tabBarLabelStyle: {
          fontSize: 10, // Taille de la police de l'étiquette réduite
          marginBottom: 5, // Marge inférieure
          fontWeight: 'bold',
        },
        tabBarStyle: {
          position: 'absolute', // Positionnement absolu
          bottom: 0, // Bas de la page
          paddingVertical: 10, // Rembourrage vertical
          height: 60, // Hauteur de la barre de navigation
          zIndex: 8, // Z-index pour assurer que la barre est au-dessus
        },
      })}
    >
      <Tab.Screen name="A.G.E" component={Famakafakana} />
      <Tab.Screen name="Kalandrie" component={Production} />
      <Tab.Screen name="Tetibola voalohany" component={BudgetInitialEntrer} />
      <Tab.Screen name="Filan'ny fianakaviana" component={ExcelSimulator} />
    </Tab.Navigator>
  );
};

export default Pagination;
