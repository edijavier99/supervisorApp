import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable,TextInput } from "react-native";
import Toast from 'react-native-root-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ColorPalette from 'react-native-color-palette';

export const AddSection = ({ onSectionAdded }) => {
  const [sectionName, setSectionName] = useState("");
  const [sectionHours, setSectionsHours] = useState('');
  const [sectionColor, setSectionColor] = useState("");

  const handleAddSection = async () => {
    if (!sectionName || !sectionHours || !sectionColor) {
      Toast.show('Todos los campos son obligatorios.', {
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

      const response = await fetch('http://127.0.0.1:8000/building/floor-sections/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`
        },
        body: JSON.stringify({
            section_name: sectionName,
            section_hours: sectionHours,
            section_color: sectionColor,
            building: buildingId
        }),
      });

      if (response.ok) {
        Toast.show('Sección añadida correctamente.', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: 'green',
          textColor: 'white',
        });

        if (onSectionAdded) {
          onSectionAdded();
        }

        // Resetear los campos del formulario
        setSectionName('');
        setSectionsHours('');
        setSectionColor('');
      } else {
        Toast.show('Hubo un problema al añadir la sección.', {
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
      <Text style={styles.title}>Crear Nueva Sección</Text>

      <Text style={styles.label}>Nombre de la sección</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la sección"
        value={sectionName}
        onChangeText={setSectionName}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Número de horas</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Cantidad de horas para la sección"
        value={sectionHours}
        onChangeText={setSectionsHours}
        placeholderTextColor="#999"
      />

      <ColorPalette
        onChange={color => setSectionColor(color)}
        value={sectionColor}
        colors={[ '#2196F3', '#4CAF50', '#FFEB3B', '#FF9800']}
        title={"Elige un color para la seccion:"}
        icon={<Text>✔</Text>} // Opcional: icono de selección
      />

      <Pressable style={styles.button} onPress={handleAddSection}>
        <Text style={styles.buttonText}>Crear sección</Text>
      </Pressable>
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
