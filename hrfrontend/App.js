import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LoginScreen } from './screens/loginScreen';
import {NavigationContainer} from '@react-navigation/native';
import { ProfileScreen } from './screens/profileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name = "LoginScreen"
              component = {LoginScreen}
              options = {{title : "Login"}}
            />
            <Stack.Screen  name="ProfileScreen" component = {ProfileScreen} options = {{title :"Profile"}}/>

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
