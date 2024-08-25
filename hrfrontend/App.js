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
import { NotificationScreen } from './screens/notificationScreen';
import { RootSiblingParent } from 'react-native-root-siblings';

enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>{/* <- use RootSiblingParent to wrap your root component */}
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
        <Stack.Screen 
          name="Notification"
          component={NotificationScreen}
          options={{title: "Notifications"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </RootSiblingParent>
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
