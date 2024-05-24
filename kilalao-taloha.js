import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import CalendrierProduction from './CalendrierProduction';
import JeuBudgetFamilial from './JeuBudgetFamilial';
import BudgetInitial from './BudgetInitial';
import Courbe from './Courbe';
import Plateau from './Plateau';

const Tab = createBottomTabNavigator();

const KilalaoTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Calendrier de production') {
            iconName = 'event';
          } else if (route.name === 'Jeu budgétaire familial') {
            iconName = 'money';
          } else if (route.name === 'Budget initial') {
            iconName = 'attach-money';
          } else if (route.name === 'Courbe') {
            iconName = 'timeline';
          } else if (route.name === 'Plateau') { 
            iconName = 'gamepad'; 
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
          //borderTopLeftRadius: 24, // Rayon de bordure supérieur gauche
         // borderTopRightRadius: 24, // Rayon de bordure supérieur droit
          position: 'absolute', // Positionnement absolu
          bottom: 0, // Bas de la page
          paddingVertical: 10, // Rembourrage vertical
          height: 60, // Hauteur de la barre de navigation
          zIndex: 8, // Z-index pour assurer que la barre est au-dessus
        },
      })}
    >
      <Tab.Screen name="Plateau" component={Plateau} />
      <Tab.Screen name="Calendrier de production" component={CalendrierProduction} />
      <Tab.Screen name="Jeu budgétaire familial" component={JeuBudgetFamilial} />
      <Tab.Screen name="Budget initial" component={BudgetInitial} />
      <Tab.Screen name="Courbe" component={Courbe} />
    </Tab.Navigator>
  );
};

export default KilalaoTabNavigator;
