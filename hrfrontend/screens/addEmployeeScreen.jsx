import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Pressable, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ToastMessage } from '../components/toastMessage';
import Toast from 'react-native-root-toast';

export const AddEmployeeScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [textInput, setTextInput] = useState('');
    const [numberInput, setNumberInput] = useState('');
    const [recentCreatedId, setRecentCreatedId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [toastVisible, setToastVisible] = useState(false);
    const navigation = useNavigation();

    const showToast = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
        }, Toast.durations.SHORT);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const apiUrl = `http://127.0.0.1:8000/myapp/users/`;

        const personalizedData = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: email,
            is_employee: true,
            company_number: 1
        };

        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${userToken}`
                },
                body: JSON.stringify(personalizedData)
            });
            const data = await response.json();
            if (response.ok) {
                showToast('Employee added successfully!', 'success');
                setRecentCreatedId(data.id);
            } else {
                showToast('Failed to add employee. Please try again.', 'error');
            }
        } catch (err) {
            showToast('An error occurred. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitAssign = async () => {
        if (!recentCreatedId) return;

        const apiUrl = `http://127.0.0.1:8000/myapp/employees/`;
        const supervisor_id = await AsyncStorage.getItem('user_id');

        const personalizedData = {
            user: recentCreatedId,
            position: textInput,
            building: numberInput,
            supervisor: supervisor_id
        };

        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${userToken}`
                },
                body: JSON.stringify(personalizedData)
            });
            const data = await response.json();
            if (response.ok) {
                showToast('Employee assigned successfully!', 'success');
                navigation.navigate('Team');
            } else {
                showToast('Failed to assign employee. Please try again.', 'error');
            }
        } catch (err) {
            showToast('An error occurred. Please try again.', 'error');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Icon name="user" type="font-awesome" size={20} color="gray" style={styles.icon} />
                <TextInput
                    value={firstName}
                    style={styles.input}
                    onChangeText={text => setFirstName(text)}
                    placeholder="Introduce el nombre"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="user" type="font-awesome" size={20} color="gray" style={styles.icon} />
                <TextInput
                    value={lastName}
                    style={styles.input}
                    onChangeText={text => setLastName(text)}
                    placeholder="Introduce el apellido"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="phone" type="font-awesome" size={20} color="gray" style={styles.icon} />
                <TextInput
                    value={phoneNumber}
                    style={styles.input}
                    onChangeText={text => setPhoneNumber(text)}
                    placeholder="Introduce el número de móvil"
                    keyboardType="phone-pad"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="envelope" type="font-awesome" size={20} color="gray" style={styles.icon} />
                <TextInput
                    value={email}
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                    placeholder="Introduce el email"
                    keyboardType="email-address"
                />
            </View>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: pressed ? '#0056b3' : '#007BFF' }
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting}
            >
                <Text style={styles.buttonText}>Crear Usuario</Text>
            </Pressable>

            <View style={styles.inputContainer}>
                <TextInput
                    value={textInput}
                    style={styles.input}
                    onChangeText={text => setTextInput(text)}
                    placeholder="Introduce el puesto"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={numberInput}
                    style={styles.input}
                    onChangeText={text => setNumberInput(text)}
                    placeholder="Introduce el edificio"
                    keyboardType="numeric"
                />
            </View>
            <Button
                title="Asignar"
                onPress={handleSubmitAssign}
                color="#007BFF"
                disabled={!recentCreatedId || isSubmitting}
            />
            
            {/* Toast Message Component */}
            <ToastMessage
                message={toastMessage}
                type={toastType}
                visible={toastVisible}
                onClose={() => setToastVisible(false)}
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
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
