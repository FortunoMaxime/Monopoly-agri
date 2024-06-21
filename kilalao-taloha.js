import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

import CalendrierProduction from './CalendrierProduction';
import JeuBudgetFamilial from './JeuBudgetFamilial';
import BudgetInitial from './BudgetInitial';
import Courbe from './Courbe';
import Plateau from './Plateau';

const Tab = createBottomTabNavigator();

const KilalaoTabNavigator = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { itemId } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Kalandriem-pamokarana') {
            iconName = 'event';
          } else if (route.name === "Lalao tetibola ara-mpianakaviana") {
            iconName = 'money';
          } else if (route.name === 'Tetibola voalohany') {
            iconName = 'attach-money';
          } else if (route.name === 'Courbe') {
            iconName = 'timeline';
          } else if (route.name === 'Plateau') {
            iconName = 'gamepad';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#34A853',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 5,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          paddingVertical: 10,
          height: 60,
          zIndex: 8,
        },
      })}
    >
      <Tab.Screen 
        name="Plateau" 
        component={Plateau} 
        initialParams={{ itemId: itemId }} 
      />
      <Tab.Screen 
        name="Kalandriem-pamokarana" 
        component={CalendrierProduction} 
        initialParams={{ itemId: itemId }} 
      />
      <Tab.Screen 
        name="Lalao tetibola ara-mpianakaviana" 
        component={JeuBudgetFamilial} 
        initialParams={{ itemId: itemId }} 
      />
      <Tab.Screen 
        name="Tetibola voalohany" 
        component={BudgetInitial} 
        initialParams={{ itemId: itemId }} 
      />
      <Tab.Screen 
        name="Courbe" 
        component={Courbe} 
        initialParams={{ itemId: itemId }} 
      />
    </Tab.Navigator>
  );
};

export default KilalaoTabNavigator;
