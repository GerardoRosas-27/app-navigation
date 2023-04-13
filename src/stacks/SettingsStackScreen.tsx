import React from 'react'

import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from '../screens/SettingsScreen';


const SettingsStackScreen = () => {
    const SettingsStack = createNativeStackNavigator();
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Setting1" component={SettingsScreen} />
        </SettingsStack.Navigator>
    );
};

export default SettingsStackScreen;