import React from 'react';
import { SafeAreaView, StyleSheet,TouchableOpacity,Text,View } from 'react-native';
import { CoverEmployeeForm } from '../forms/coverEmployeeForm';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements'


export const CoverScreen = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
        {/* <CoverEmployeeForm/> */}
        <Text>3 horas disponibles para cubrir </Text>
        <View style={styles.selectEmployeeBtnContainer}>
          <TouchableOpacity
                style={[styles.selectEmployeeBtn ]}
                >
                <Text style={styles.textStyle}>Seleccionar empleado</Text>
          </TouchableOpacity>
          <Icon
              name="chevron-right"
              onPress={() => {
                navigation.navigate('AllEmployeesList'); // Navegar a la pantalla 'AnotherScreen'
              }}        type="font-awesome" // O el tipo de icono que prefieras
              size={20}
            />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  selectEmployeeBtnContainer:{
    backgroundColor: "lightgray",
    width: "90%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 13,
  },
});

