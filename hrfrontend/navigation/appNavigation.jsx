// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from "./navigation";
import { AddEmployeeScreen } from "../screens/addEmployeeScreen";

const Stack = createStackNavigator();

export const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // Hides the header for all screens
            }}
        >
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="AddEmployee" component={AddEmployeeScreen} />
        </Stack.Navigator>
    );
};
