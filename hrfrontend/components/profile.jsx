import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { CodesInfo } from "./codesInfo";

export const Profile = ({ employee }) => {
    const [showTimeGreeting, setShowTimeGreeting] = useState("");

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

    return (
        <ScrollView style={styles.profileScreen}>
            <View style={styles.personalInformation}>
                <View style={styles.personalInfoHeader}>
                    <View>
                        <Text style={styles.firstTitle}>Dashboard</Text>
                        <Text style={styles.subTitle}>{showTimeGreeting}</Text>
                    </View>
                    <Image 
                        source={{ uri: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
                        style={styles.profileImage}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Nombre:</Text>
                    <Text style={styles.infoValue}>Edison Javier</Text>
                    <Text style={styles.infoLabel}>Móvil:</Text>
                    <Text style={styles.infoValue}>647383464</Text>
                    <Text style={styles.infoLabel}>Correo Electrónico:</Text>
                    <Text style={styles.infoValue}>edijavier10@gmail.com</Text>
                </View>
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

                <CodesInfo/>
            </View>
        </ScrollView>
    );
}

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
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
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
});
