import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CodeItemCard } from './codeInfoCard';

export const CodesInfo = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.codesTitle}>Sheets Codes</Text>
        <CodeItemCard letter={"H"} name="Holiday request" color="#B9FBC0" />
        <CodeItemCard letter={"S"} name="Sickness leave (Full Day)" color="#A9D4F2" /> 
        <CodeItemCard letter={"M"} name="Maternity or Paternity" color="#F3C1A4" /> 
        <CodeItemCard letter={"U"} name="Leave without pay" color="#D4A6A0" /> 
        <CodeItemCard letter={"A"} name="Absence without Pay" color="#F5A8A8" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },
  codesTitle:{
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20
  },
});
