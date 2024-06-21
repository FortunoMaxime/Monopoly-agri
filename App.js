import 'setimmediate';
import 'react-native-gesture-handler';
import React ,{useEffect}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartupAnimation from './StartupAnimation';
import HomeScreen from './home';
import Choix from './Choix';
import Plateau from './Plateau'; 
import Famakafakana from './famakafakana';
import InterfaceData from './InterfaceData';
import CalendrierProduction from './CalendrierProduction';
import JeuBudgetFamilial from './JeuBudgetFamilial';
import BudgetInitial from './BudgetInitial';
import Courbe from './Courbe';
import KilalaoTabNavigator from './kilalao-taloha'
import Import from './excel';
import ExcelSimulator from './EntrerManuel';;
import Pagination from './Pagination';
import Vaovao from './Kilalaovaovao';
import ResultsScreen from './ResultsScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Startup">
        <Stack.Screen name="Startup" component={StartupAnimation} options={{ headerShown: false }} />
        <Stack.Screen name="kilalao" component={KilalaoTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Pagination" component={Pagination} options={{ headerShown: false }} />
        <Stack.Screen name="home" component={HomeScreen} options={{ title: 'Accueil' }} />
        <Stack.Screen name="Choix" component={Choix} options={{ title: 'Choix' }} />
        <Stack.Screen name="Plateau" component={Plateau} options={{ title: 'Plateau' }} />
        <Stack.Screen name="Famakafakana" component={Famakafakana} options={{ title: 'Famakafakana' }} />
        <Stack.Screen name="InterfaceData" component={InterfaceData} options={{ title: 'InterfaceData' }} />
        <Stack.Screen name="CalendrierProduction" component={CalendrierProduction} options={{ title: 'Calendrier de Production' }} />
        <Stack.Screen name="JeuBudgetFamilial" component={JeuBudgetFamilial} options={{ title: 'Jeu Budgétaire Familial' }} />
        <Stack.Screen name="BudgetInitial" component={BudgetInitial} options={{ title: 'Budget Initial' }} />
        <Stack.Screen name="Courbe" component={Courbe} options={{ title: 'Courbe' }} />
        <Stack.Screen name="Import" component={Import} options={{ title: 'Import'}} />
        <Stack.Screen name="ExcelSimulator" component={ExcelSimulator} options={{ title: ''}} />
        <Stack.Screen name="Vaovao" component={Vaovao} options={{ title: 'Kilalao vaovao'}} />
        <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
