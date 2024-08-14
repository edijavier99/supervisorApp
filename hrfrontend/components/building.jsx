import React from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';

// Dummy data con empleados únicos en cada columna y piso
const dummyData = {
  floor1: {
    left: [
      { employeeName: 'Alice Johnson', employeeNumber: 'E001' },
    ],
    center: [
      { employeeName: 'David Brown', employeeNumber: 'E004' },
    ],
    right: [
      { employeeName: 'Grace Lee', employeeNumber: 'E007' },
    ],
  },
  floor2: {
    left: [
      { employeeName: 'Jack Martin', employeeNumber: 'E010' },
    ],
    center: [
      { employeeName: 'Liam Walker', employeeNumber: 'E013' },
    ],
    right: [
      { employeeName: 'Olivia Young', employeeNumber: 'E016' },
    ],
  },
  floor3: {
    left: [
      { employeeName: 'Rachel Turner', employeeNumber: 'E019' },
    ],
    center: [
      { employeeName: 'Ursula Phillips', employeeNumber: 'E022' },
    ],
    right: [
      { employeeName: 'Xander Moore', employeeNumber: 'E025' },
    ],
  },
  floor4: {
    left: [
      { employeeName: 'Alice Cooper', employeeNumber: 'E028' },
    ],
    center: [
      { employeeName: 'Brian Adams', employeeNumber: 'E031' },
    ],
    right: [
      { employeeName: 'Claire Foster', employeeNumber: 'E034' },
    ],
  },
  floor5: {
    left: [
      { employeeName: 'Daniel Evans', employeeNumber: 'E037' },
    ],
    center: [
      { employeeName: 'Eva Johnson', employeeNumber: 'E040' },
    ],
    right: [
      { employeeName: 'Frank Martinez', employeeNumber: 'E043' },
    ],
  },
  floor6: {
    left: [
      { employeeName: 'Grace Brown', employeeNumber: 'E046' },
    ],
    center: [
      { employeeName: 'Henry Clark', employeeNumber: 'E049' },
    ],
    right: [
      { employeeName: 'Ivy Lewis', employeeNumber: 'E052' },
    ],
  },
  floor7: {
    left: [
      { employeeName: 'Jack Wilson', employeeNumber: 'E055' },
    ],
    center: [
      { employeeName: 'Kara Adams', employeeNumber: 'E058' },
    ],
    right: [
      { employeeName: 'Liam King', employeeNumber: 'E061' },
    ],
  },
  floor8: {
    left: [
      { employeeName: 'Mia Davis', employeeNumber: 'E064' },
    ],
    center: [
      { employeeName: 'Nathan Scott', employeeNumber: 'E067' },
    ],
    right: [
      { employeeName: 'Olivia Harris', employeeNumber: 'E070' },
    ],
  },
  floor9: {
    left: [
      { employeeName: 'Paul Walker', employeeNumber: 'E073' },
    ],
    center: [
      { employeeName: 'Quinn Roberts', employeeNumber: 'E076' },
    ],
    right: [
      { employeeName: 'Rachel Lee', employeeNumber: 'E079' },
    ],
  },
};

const columnColors = ['lightgray', '#f39c12', '#DCDCDC']; // Puedes ajustar los colores aquí
const columnNames = ['left', 'center', 'right'];

const Floor = ({ data, floorNumber }) => {
  return (
    <View style={styles.floorContainer}>
      <View style={styles.windowContainer}>
        {columnNames.map((column, index) => (
          <View key={index} style={styles.windowColumn}>
            {data[column].map((windowData, i) => (
              <View key={i} style={[styles.window, { backgroundColor: columnColors[index] }]}>
                <Text style={styles.windowText}>{windowData.employeeName}</Text>
                <Text style={styles.windowText}>{windowData.employeeNumber}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <Text style={styles.floorNumber}>Floor {floorNumber}</Text>
    </View>
  );
};

export const Building = () => {
  const floors = Object.keys(dummyData);
  const floorComponents = [];

  let i = 0;
  while (i < floors.length) {
    const floorKey = floors[i];
    const floorNumber = floorKey.replace('floor', ''); // Extraer el número del piso de la clave
    floorComponents.push(
      <Floor key={floorKey} data={dummyData[floorKey]} floorNumber={floorNumber} />
    );
    i++;
  }

  const colorListItems = [
    { name: 'Eagle Area', color: 'lightgray', hours: "5" },
    { name: 'Holborn Area', color: '#f39c12' , hours: "5"},
    { name: 'West Eagle Area', color: '#DCDCDC', hours: "5"},
  ];
  
  const showColorListItems = () => {
    return colorListItems.map((item, index) => (
      <View key={index} style={styles.singleItemContainer}>
        <View key={index} style={[styles.listItem, { backgroundColor: item.color }]}></View>
        <Text>{item.name}</Text>
        <Text>{item.hours} Horas</Text>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.buildingContainer}>
        <Text style={styles.title}>Uncommon Building</Text>
        <Text style={styles.title}>SE5 8D2 Appleshaw House</Text>
        <Text style={styles.title}>Building total hours 200</Text>
        <View style={styles.listItemContainer}>
          {showColorListItems()}

        </View>
        {floorComponents}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buildingContainer: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 20,
  },
  title:{
    fontSize: 16,
    marginBottom: 5,
  },
  floorContainer: {
    width: '100%',
    marginVertical: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  windowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  windowColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    paddingVertical: 5,
  },
  window: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
    height: 70,
  },
  windowText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  floorNumber: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  listItemContainer:{
    borderRadius: 10,
    backgroundColor: "white",
    padding:15,
    marginBottom: 8,
    marginTop: 8
  },
  singleItemContainer:{
    alignItems: "center",
    height: 30,
    flexDirection: "row", 
    justifyContent: "space-between"
  },
  listItem:{
    height: 20,
    width: 20,
    marginRight: 20
  }
});
