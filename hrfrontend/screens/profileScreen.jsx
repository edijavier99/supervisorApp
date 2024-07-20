import React from "react";
import { StyleSheet, Text, View,Image } from 'react-native';
import { TabNavigator } from "../navigation/navigation";

export const ProfileScreen = () =>{
    return(
        <View style={styles.container}>
        <TabNavigator />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
