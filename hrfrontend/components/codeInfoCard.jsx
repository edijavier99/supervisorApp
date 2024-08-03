import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export const CodeItemCard = ({color, name , letter})=>{
    return(
        <View style={[styles.codeView, { backgroundColor: `${color}` }]}>
            <Text style={styles.codeName}>{name}</Text>
            <Text style={styles.codeLetter}>{letter}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    codeView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
    },
    codeName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    codeLetter: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  