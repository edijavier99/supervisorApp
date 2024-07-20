import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, BackHandler } from 'react-native';
import { LoginForm } from "../components/loginForm";

export const LoginScreen = ({navigation}) =>{    
    return(
        <View style={styles.loginContainer}>
          <LoginForm navigation = {navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer:{
        flex: 1,
        justifyContent: "center",
}
})