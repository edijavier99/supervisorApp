import React from "react";
import { StyleSheet, Text, View,Image } from 'react-native';

export const Profile = () =>{
    return(
        <View style={styles.profileScreen}>
            <View style={styles.perfonalInformation}>
                <View style={styles.perfonalInfoHeader}>
                    <View>
                        <Text style ={styles.firstTitle}>Dashboard</Text>
                        <Text  style ={styles.subTitle}>Good Afternoon</Text>
                    </View>
                    <Image 
                        source={{uri :"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}}
                        style={styles.profileImage}
                    />
                </View>
            </View>          
        </View>
    )
}



const styles = StyleSheet.create({
    profileScreen:{
        flex: 1,
        alignItems: "center"
    },
    perfonalInformation:{
        backgroundColor: "gray",
        width: "100%",
        minHeight: 250,
    },
    perfonalInfoHeader:{
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    firstTitle:{
        fontWeight: "800",
        fontSize: 24
    },
    subTitle:{
        fontSize: 14,
        color: "gray",
        paddingTop: 3
    },
    profileImage:{
        width: 70,
        height: 70,
        borderRadius: "50%",
    }
})