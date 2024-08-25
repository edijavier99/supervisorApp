import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator,Pressable } from 'react-native';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importar AsyncStorage


export const LoginForm = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async () => {
    const apiUrl = `http://127.0.0.1:8000/myapp/api/token/`;

    setLoading(true);
    setErrorMessage('');  // Limpiar errores anteriores

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: userEmail, password: userPassword })
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud. Verifique sus credenciales.');
      }

      const data = await response.json();
      console.log(data);

    //   Maneja el almacenamiento del token y la navegación aquí
        await AsyncStorage.setItem('userToken', data.token);
      // Navega a la pantalla de perfil
      navigation.navigate('Profile');

    } catch (error) {
      setErrorMessage(error.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formLogin}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <Text style={styles.subtitle}>Bienvenido!</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        inputMode="email"
        autoCapitalize="none"  // Desactiva la autocapitalización
        value={userEmail}
        onChangeText={setUserEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        autoCapitalize="none"  // Desactiva la autocapitalización
        value={userPassword}
        onChangeText={setUserPassword}
      />
        <Pressable onPress={handleLoginSubmit}>
          <Text>Enviar</Text>
        </Pressable>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
