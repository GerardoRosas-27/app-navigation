import React from 'react'
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./stacks/HomeStackScreen";
import SettingsStackScreen from './stacks/SettingsStackScreen';
import { NavigationContainer } from "@react-navigation/native";



const TabsApp = () => {
    const Tab = createBottomTabNavigator();
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Setting" component={SettingsStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };
  
  export default TabsApp;