import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import GramaticaScreen from '../screens/GramaticaScreen';
import PrayersScreen from '../screens/prayersScreen';
import VerbTensesScreen from '../screens/VerbTensesScreen';

const HomeStackScreen = () => {
    const HomeStack = createNativeStackNavigator();
    return (

        <HomeStack.Navigator>
            <HomeStack.Screen name="Landing" component={LandingScreen} />
            <HomeStack.Screen name="Gramatica" component={GramaticaScreen} />
            <HomeStack.Screen name="Oraciones" component={PrayersScreen} />
            <HomeStack.Screen name="Verbos" component={VerbTensesScreen} />
            
        </HomeStack.Navigator>
    );
}

export default HomeStackScreen;