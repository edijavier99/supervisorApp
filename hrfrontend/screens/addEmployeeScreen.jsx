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

        setIsSubmitting(true);  // Indicate that an assignment is in progress
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
        } finally {
            setIsSubmitting(false);  // Reset the submitting state
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Icon name="user" type="font-awesome" size={20} color="#4A4A4A" style={styles.icon} />
                <TextInput
                    value={firstName}
                    style={styles.input}
                    onChangeText={text => setFirstName(text)}
                    placeholder="First Name"
                    placeholderTextColor="#A9A9A9"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="user" type="font-awesome" size={20} color="#4A4A4A" style={styles.icon} />
                <TextInput
                    value={lastName}
                    style={styles.input}
                    onChangeText={text => setLastName(text)}
                    placeholder="Last Name"
                    placeholderTextColor="#A9A9A9"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="phone" type="font-awesome" size={20} color="#4A4A4A" style={styles.icon} />
                <TextInput
                    value={phoneNumber}
                    style={styles.input}
                    onChangeText={text => setPhoneNumber(text)}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    placeholderTextColor="#A9A9A9"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="envelope" type="font-awesome" size={20} color="#4A4A4A" style={styles.icon} />
                <TextInput
                    value={email}
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                    placeholder="Email"
                    keyboardType="email-address"
                    placeholderTextColor="#A9A9A9"
                />
            </View>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: pressed ? '#0A84FF' : '#007AFF' }
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting}
            >
                <Text style={styles.buttonText}>Create User</Text>
            </Pressable>

            <View style={[styles.inputContainer, styles.extraMargin]}>
                <TextInput
                    value={textInput}
                    style={styles.input}
                    onChangeText={text => setTextInput(text)}
                    placeholder="Position"
                    placeholderTextColor="#A9A9A9"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={numberInput}
                    style={styles.input}
                    onChangeText={text => setNumberInput(text)}
                    placeholder="Building"
                    keyboardType="numeric"
                    placeholderTextColor="#A9A9A9"
                />
            </View>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: pressed ? '#34C759' : '#28A745' }
                ]}
                onPress={handleSubmitAssign}
                disabled={!recentCreatedId || isSubmitting}  // Disable until an employee is created
            >
                <Text style={styles.buttonText}>Assign</Text>
            </Pressable>

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
        margin: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    extraMargin: {
        marginTop: 20,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 45,
        fontSize: 16,
        color: '#333',
    },
    button: {
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
