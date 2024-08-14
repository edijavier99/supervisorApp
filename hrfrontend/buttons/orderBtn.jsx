import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const OrderBtn = ({ BtnName, backColor, onPress }) => {
    return (
        <TouchableOpacity 
            style={[styles.button, {backgroundColor: backColor}]} // Combine default and custom styles
            onPress={onPress} // Call the function directly
        >
            <Text style={styles.text}>{BtnName}</Text>
        </TouchableOpacity>
    );
};

// Define default styles for the button and text
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
        width: "40%",
        borderRadius: 10,
        alignSelf: "center"
    },
    text: {
        color: 'white',
        fontSize: 16,
    }
});
