import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx';
import base64 from 'base-64';

export const Shifts = () => {
  // Función para generar un archivo Excel
  const generateExcel = async () => {
    // Datos de ejemplo
    const data = [
      { Name: 'John Doe', Age: 30, Email: 'john@example.com' },
      { Name: 'Jane Smith', Age: 25, Email: 'jane@example.com' },
    ];

    // Convertir los datos a una hoja de cálculo
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generar el archivo en formato binary
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    // Convertir el archivo binario a un array de bytes
    const buf = new Uint8Array(wbout.length);
    for (let i = 0; i < wbout.length; i++) buf[i] = wbout.charCodeAt(i) & 0xff;

    // Convertir el array de bytes a base64 usando base-64
    const base64String = base64.encode(String.fromCharCode(...buf));

    // Ruta para guardar el archivo en el dispositivo
    const path = `${FileSystem.documentDirectory}example.xlsx`;

    // Escribir el archivo en el sistema de archivos
    try {
      await FileSystem.writeAsStringAsync(path, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Compartir el archivo
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(path);
      } else {
        Alert.alert('No disponible', 'La función de compartir no está disponible en este dispositivo.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el archivo.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Generar y Compartir Excel" onPress={generateExcel} />
    </View>
  );
};

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

