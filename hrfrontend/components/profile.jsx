import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { CodesInfo } from "./codesInfo";
import { Badge, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Profile = ({ employee }) => {
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState('');
    const [showTimeGreeting, setShowTimeGreeting] = useState("");
    const [dataUser, setDataUser] = useState({});

    useEffect(() => {
        const nowTime = new Date().getHours();
        if (nowTime < 12) {
            setShowTimeGreeting("Buenos Días");
        } else if (nowTime < 18) {
            setShowTimeGreeting("Buenas Tardes");
        } else {
            setShowTimeGreeting("Buenas Noches");
        }
    }, []);

    const fetchSingleUser = async () => {
        const apiUrl = `http://127.0.0.1:8000/myapp/user/`;

        try {
            const userToken = await AsyncStorage.getItem("userToken");  // Obtener el token del AsyncStorage
            if (!userToken) {
                throw new Error("No se encontró el token de usuario");
            }

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${userToken}`  // Usar el token en la solicitud
                }
            });

            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }

            const data = await response.json();
            await AsyncStorage.setItem('user_id', data.id.toString()); // Asegurarse de que el ID esté en formato de cadena
            console.log(data);
            setDataUser(data);
        } catch (error) {
            setErrorMessage(error.message || 'Error desconocido');
        }
    };

    useEffect(() => {
        fetchSingleUser();
    }, []);

    const showUserDetails = () => {
        if (!dataUser || Object.keys(dataUser).length === 0) {
            return <Text>No user data available</Text>;
        }
    
        return (
            <View>
                <Text style={styles.infoLabel}>Nombre:</Text>
                <Text style={styles.infoValue}>{dataUser.first_name} {dataUser.last_name}</Text>
                <Text style={styles.infoLabel}>Móvil:</Text>
                <Text style={styles.infoValue}>647383464</Text>
                <Text style={styles.infoLabel}>Correo Electrónico:</Text>
                <Text style={styles.infoValue}>{dataUser.email}</Text>
            </View>
        );
    }
    

    return (
        <ScrollView style={styles.profileScreen}>
            <View style={styles.personalInformation}>
                <View style={styles.personalInfoHeader}>
                    <View>
                        <Text style={styles.firstTitle}>Dashboard</Text>
                        <Text style={styles.subTitle}>{showTimeGreeting}</Text>
                    </View>
                 
                    <Pressable
                        style={styles.button}
                        onPress={() => navigation.navigate("Notification")}
                    >
                        <Icon name="inbox" type="feather" color="#fff" size={24} />
                        <Text style={styles.buttonText}>Inbox</Text>
                        <Badge
                            status="error"
                            value="99"
                            containerStyle={styles.badgeContainer}
                            badgeStyle={styles.badge}
                        />
                    </Pressable>
                </View>
                {showUserDetails()}
            </View>
            <View style={styles.teamInfoContainer}>
                <View style={styles.teamInfo}>
                    <Text style={styles.teamTitle}>Equipo</Text>
                    <Text style={styles.teamValue}>4 miembros</Text>
                </View>
                <View style={styles.managerInfo}>
                    <Text style={styles.managerTitle}>Manager</Text>
                    <Text style={styles.managerValue}>Roberto</Text>
                </View>

                <CodesInfo />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    profileScreen: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    personalInformation: {
        backgroundColor: "white",
        width: "100%",
        padding: 20,
        paddingTop: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    personalInfoHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 15
    },
    firstTitle: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#333",
    },
    subTitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    infoLabel: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#333",
    },
    infoValue: {
        fontSize: 16,
        color: "#555",
        marginBottom: 10,
    },
    teamInfoContainer: {
        backgroundColor: "#ffffff",
        width: "100%",
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        marginTop: 10,
    },
    teamInfo: {
        backgroundColor: "#e0e0e0",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: "center",
    },
    managerInfo: {
        backgroundColor: "#e0e0e0",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    teamTitle: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#333",
    },
    teamValue: {
        fontSize: 16,
        color: "#555",
    },
    managerTitle: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#333",
    },
    managerValue: {
        fontSize: 16,
        color: "#555",
    },
    // CSS PARA EL BTN DE INBOX
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 16,
    },
    badgeContainer: {
        position: 'absolute',
        top: -7,
        right: -4,
    },
    badge: {
        backgroundColor: '#dc3545',
    },
});
