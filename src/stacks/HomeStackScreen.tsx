import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';

const HomeStackScreen = () => {
    const HomeStack = createNativeStackNavigator();
    return (

        <HomeStack.Navigator>
            <HomeStack.Screen name="Landing" component={LandingScreen} />

        </HomeStack.Navigator>
    );
}

export default HomeStackScreen;