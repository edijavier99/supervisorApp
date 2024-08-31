import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import Toast from 'react-native-root-toast';

export const AddFloor = ({ onFloorAdded, totalSeccionsAvailable }) => {
  const [floorNumber, setFloorNumber] = useState('');
  const [sectionsCount, setSectionsCount] = useState('');

  const handleAddFloor = async () => {

    console.log("nooooo", totalSeccionsAvailable);
    if (!floorNumber || !sectionsCount) {
      Toast.show('Todos los campos son obligatorios.', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: 'red',
        textColor: 'white',
      });
      return;
    }

    if (parseInt(sectionsCount, 10) >= totalSeccionsAvailable) {
      Toast.show(`No puedes añadir más de ${totalSeccionsAvailable} secciones.`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: 'red',
        textColor: 'white',
      });
      return;
    }

    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const buildingId = await AsyncStorage.getItem("building_id");
      const response = await fetch('http://127.0.0.1:8000/building/floors/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`
        },
        body: JSON.stringify({
          floor_number: parseInt(floorNumber, 10),
          section_numbers: parseInt(sectionsCount, 10),
          building: buildingId
        }),
      });

      if (response.ok) {
        Toast.show('Piso añadido correctamente.', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: 'green',
          textColor: 'white',
        });

        // Llamar a la función onFloorAdded para refrescar el componente
        onFloorAdded();

        // Resetear los campos del formulario
        setFloorNumber('');
        setSectionsCount('');
      } else {
        Toast.show('No puedes añadir un piso menor del que ya hay.', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: 'red',
          textColor: 'white',
        });
      }
    } catch (error) {
      Toast.show('Error de red. Inténtalo de nuevo más tarde.', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: 'red',
        textColor: 'white',
      });
    }
  };

  return (
    <View>
      <Text style={styles.title}>Añadir Nuevo Piso</Text>

      <Text style={styles.label}>Número de planta</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Número de Planta"
        value={floorNumber}
        onChangeText={setFloorNumber}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Número de secciones</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Número de Secciones"
        value={sectionsCount}
        onChangeText={setSectionsCount}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddFloor}>
        <Text style={styles.buttonText}>Añadir Piso</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    minWidth: "100%",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
