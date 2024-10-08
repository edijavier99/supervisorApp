import React from 'react';
import { View, Button, Alert, StyleSheet, FlatList, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { utils, write } from 'xlsx'; // Importa métodos específicos de 'xlsx'
import { encode } from 'base-64';

export const Shifts = () => {
  const data = [
    // Datos de ejemplo
    ["Employee Number", "Nombre", "Apellido", "Lugar de Trabajo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Total Hours"],
    ["E001", "John", "Doe", "Oficina A", 2, 2, 2, 2, 2, 2, 2, 14],
    ["E002", "Jane", "Smith", "Oficina B", 2, 2, 0, 2, 2, 2, 2, 12],
    ["E003", "Michael", "Johnson", "Oficina C", 2, 2, 2, 2, 2, 2, 0, 12],
    ["E004", "Emily", "Davis", "Oficina D", 2, 2, 2, 2, 2, 0, 2, 12],
    ["E005", "Daniel", "Brown", "Oficina E", 2, 2, 2, 2, 2, 2, 2, 14],
    ["E006", "Olivia", "Wilson", "Oficina F", 2, 0, 2, 2, 2, 2, 0, 8],
    ["E007", "Ethan", "Moore", "Oficina G", 2, 2, 2, 2, 2, 2, 2, 14],
    ["E008", "Sophia", "Taylor", "Oficina H", 2, 2, 0, 2, 2, 2, 2, 12],
    ["E009", "Liam", "Anderson", "Oficina I", 2, 2, 2, 2, 0, 2, 2, 12],
    ["E010", "Isabella", "Thomas", "Oficina J", 2, 2, 2, 2, 2, 2, 2, 14],
    ["E011", "Noah", "Jackson", "Oficina K", 2, 2, 2, 0, 2, 2, 2, 12],
  ];

  const generateExcel = async () => {
    // Convertir los datos a una hoja de cálculo
    const ws = utils.aoa_to_sheet(data);
    
    // Crear un nuevo libro de trabajo y agregar la hoja
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generar el archivo en formato binario
    const wbout = write(wb, { bookType: 'xlsx', type: 'binary' });

    // Convertir el archivo binario a un array de bytes
    const buf = new Uint8Array(wbout.length);
    for (let i = 0; i < wbout.length; i++) buf[i] = wbout.charCodeAt(i) & 0xff;

    // Convertir el array de bytes a base64
    const base64String = encode(String.fromCharCode(...buf));

    // Ruta para guardar el archivo en el dispositivo
    const path = `${FileSystem.documentDirectory}example.xlsx`;

    try {
      // Escribir el archivo en el sistema de archivos
      await FileSystem.writeAsStringAsync(path, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Compartir el archivo si la función está disponible
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
      {/* Mostrar datos en la pantalla */}
      <FlatList
        data={data.slice(1)} // Excluir encabezado para mostrar solo datos
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item[0]}</Text>
            <Text style={styles.itemText}>{item[1]}</Text>
            <Text style={styles.itemText}>{item[2]}</Text>
            <Text style={styles.itemText}>{item[11]}</Text>
          </View>
        )}
      />
      <Button title="Generar y Compartir Excel" onPress={generateExcel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    flex: 1,
    textAlign: 'center',
  },
});
