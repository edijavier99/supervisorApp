import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button } from 'react-native';

export const AddEmployeeScreen = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        phone_number: "",
        email: "",
        hours: "",
        floor: "",
        floor_position: ""
    });

    // Función para manejar los cambios en los campos del formulario
    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = () => {
        // Lógica para manejar el envío del formulario
        console.log(formData);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                value={formData.name}
                style={styles.input}
                onChangeText={(text) => handleInputChange('name', text)}
                placeholder="Introduce el nombre"
            />
            <TextInput
                value={formData.surname}
                style={styles.input}
                onChangeText={(text) => handleInputChange('surname', text)}
                placeholder="Introduce el apellido"
            />
            <TextInput
                value={formData.phone_number}
                style={styles.input}
                onChangeText={(text) => handleInputChange('phone_number', text)}
                placeholder="Introduce el número de móvil"
                keyboardType="phone-pad"
            />
            <TextInput
                value={formData.email}
                style={styles.input}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="Introduce el email"
                keyboardType="email-address"
            />
            <TextInput
                value={formData.hours}
                style={styles.input}
                onChangeText={(text) => handleInputChange('hours', text)}
                placeholder="Introduce las horas trabajadas"
                keyboardType="numeric"
            />
            <TextInput
                value={formData.floor}
                style={styles.input}
                onChangeText={(text) => handleInputChange('floor', text)}
                placeholder="Introduce el piso"
            />
            <TextInput
                value={formData.floor_position}
                style={styles.input}
                onChangeText={(text) => handleInputChange('floor_position', text)}
                placeholder="Introduce la posición en el piso"
            />
            <Button
                title="Enviar"
                onPress={handleSubmit}
                color="#007BFF"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});
