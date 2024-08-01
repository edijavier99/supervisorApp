import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export const LoginForm = ({navigation}) => {
    const handleLogin = () => {
        Alert.alert('Siiii');
        setTimeout(()=>{
            
        })
    };

    return (
        <View style={styles.formLogin}>
            <Text style={styles.title}>Iniciar sesión</Text>
            <Text style={styles.subtitle}>Bienvenido!</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                keyboardType="email-address"  // Configura el teclado para correos electrónicos
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry  // Muestra los caracteres como puntos
            />
            <Button title="Iniciar sesión" onPress={handleLogin} />
            <Button title ="Ir al perfile" onPress={()=>{
                navigation.navigate('Profile' )
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    formLogin: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "900",
        textAlign: "center",
        marginBottom: 10, // Añadí un margen inferior para separar del siguiente texto
    },
    subtitle: {
        fontSize: 15,
        textAlign: "center",
        marginTop: 15,
        marginBottom: 20, // Añadí un margen inferior para separar del siguiente elemento
    },
    input: {
        borderColor: "black",
        height: 40,
        borderWidth: 1,
        marginVertical: 10, // Margin vertical en lugar de usar margin en todos los lados
        borderRadius: 10,
        paddingHorizontal: 15, // paddingHorizontal en lugar de paddingLeft para consistencia
        width: '100%',  // Usar ancho completo en lugar de un ancho fijo para adaptarse a diferentes dispositivos
    },
});
