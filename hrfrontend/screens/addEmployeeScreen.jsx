import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Icon } from 'react-native-elements';  // Importa Icon desde react-native-elements

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

    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        console.log(formData);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Icon name="user" type="font-awesome" size={20} color="gray" style={styles.icon} />
                <TextInput
                    value={formData.name}
                    style={styles.input}
                    onChangeText={(text) => handleInputChange('name', text)}
                    placeholder="Introduce el nombre"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="user" type="font-awesome" size={20} color="gray" style={styles.icon} />
                <TextInput
                    value={formData.surname}
                    style={styles.input}
                    onChangeText={(text) => handleInputChange('surname', text)}
                    placeholder="Introduce el apellido"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="phone" type="font-awesome" size={20} color="gray" style={styles.icon} />
                <TextInput
                    value={formData.phone_number}
                    style={styles.input}
                    onChangeText={(text) => handleInputChange('phone_number', text)}
                    placeholder="Introduce el número de móvil"
                    keyboardType="phone-pad"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="envelope" type="font-awesome" size={20} color="gray" style={styles.icon} />
                <TextInput
                    value={formData.email}
                    style={styles.input}
                    onChangeText={(text) => handleInputChange('email', text)}
                    placeholder="Introduce el email"
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="clock" type="font-awesome" size={20} color="gray" style={styles.icon} />
                <TextInput
                    value={formData.hours}
                    style={styles.input}
                    onChangeText={(text) => handleInputChange('hours', text)}
                    placeholder="Introduce las horas que trabaja"
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="building" type="font-awesome" size={20} color="gray" style={styles.icon} />
                <TextInput
                    value={formData.floor}
                    style={styles.input}
                    onChangeText={(text) => handleInputChange('floor', text)}
                    placeholder="Introduce el piso"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="map-marker" type="font-awesome" size={20} color="gray" style={styles.icon} />
                <TextInput
                    value={formData.floor_position}
                    style={styles.input}
                    onChangeText={(text) => handleInputChange('floor_position', text)}
                    placeholder="Introduce la posición en el piso"
                />
            </View>
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        margin:10,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5

    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderRadius: 5,
    },
});
