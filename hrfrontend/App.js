import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { LoginScreen } from './screens/loginScreen';
import { AddEmployeeScreen } from './screens/addEmployeeScreen';
import { TabNavigator } from './navigation/navigation';
import { CoverScreen } from './screens/coverScreen';
import {AllEmployeesScreen } from "./screens/allEmployeesScreen"

enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ title: "Login" }} 
        />
        <Stack.Screen 
          name="Profile" 
          component={TabNavigator} 
          options={{ title: "Profile" , headerShown: false }} 
        />
        <Stack.Screen 
          name="AddEmployee" 
          component={AddEmployeeScreen} 
          options={{ title: "Add Employee" }} 
        />
        <Stack.Screen 
          name="CoverEmployee" 
          component={CoverScreen} 
          options={{ title: "Cover Employee" }} 
        />
        <Stack.Screen 
          name="AllEmployeesList"
          component={AllEmployeesScreen}
          options={{title: "List"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
