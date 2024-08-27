import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

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
  const [buildingInformation, setBuildingInformation] = useState({
    name: "",
    total_hours: "",
    address: "",
  })
  const [floor,SetFloor] = useState()
  const [userToken, setUserToken] = useState(null);
  const retrieveToken = async () => {
    const token = await AsyncStorage.getItem("userToken");
    setUserToken(token);
};

  useEffect(() => {
    if (userToken) {
        const retrieveBuilding = async () => {
            const apiUrl = "http://127.0.0.1:8000/building/buildings/";
            try {
                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${userToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                if (Array.isArray(data) && data.length > 0) {
                  const building = data[0];
                  setBuildingInformation({
                      name: building.name || "",
                      total_hours: building.building_hours || "",
                      address: building.address || "",
                  });
              }
            } catch (error) {
                console.error("Fetch error:", error.message);
            }
        };
        retrieveBuilding();
    } else {
        retrieveToken(); // Retrieve the token if not already available
    }
}, [userToken]);

  // let i = 0;
  // while (i < floors.length) {
  //   const floorKey = floors[i];
  //   const floorNumber = floorKey.replace('floor', ''); // Extraer el número del piso de la clave
  //   floorComponents.push(
  //     <Floor key={floorKey} data={dummyData[floorKey]} floorNumber={floorNumber} />
  //   );
  //   i++;
  // }

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
        <Text style={styles.title}>{buildingInformation.name}</Text>
        <Text style={styles.title}>{buildingInformation.address}</Text>
        <Text style={styles.title}>Building total hours {buildingInformation.total_hours}</Text>
        <View style={styles.listItemContainer}>
          {showColorListItems()}
        </View>
        {floorComponents}
        <View style={styles.floorContainer}>
        <Icon name="plus" type="font-awesome" size={20} color="green" style={styles.icon} />

        </View>
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
