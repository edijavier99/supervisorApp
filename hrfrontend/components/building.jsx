import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView,Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddFloorModal } from './building/addFloorModal';

const columnColors = ['lightgray', '#f39c12', '#DCDCDC'];

export const Building = () => {
  const [buildingInformation, setBuildingInformation] = useState({
    name: "",
    total_hours: "",
    address: "",
    floors: [],
    sections: []
  });
  const [userToken, setUserToken] = useState(null);

  const retrieveToken = async () => {
    const token = await AsyncStorage.getItem("userToken");
    setUserToken(token);
  };


  const fetchBuildingInformation = async () => {
    if (userToken) {
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
          await AsyncStorage.setItem('building_id', JSON.stringify(building.id));
          setBuildingInformation({
            name: building.name || "",
            total_hours: building.building_hours || "",
            address: building.address || "",
            floors: building.floors || [],
            sections: building.sections || [],
          });
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    }
  };

  useEffect(() => {
    retrieveToken();
  }, []);

  useEffect(() => {
    if (userToken) {
      fetchBuildingInformation();
    }
  }, [userToken]);

  const handleFloorAdded = () => {
    fetchBuildingInformation(); // Refresh building information after adding a new floor
  };

  const handleSectionAdded = () =>{
    fetchBuildingInformation(); // Refresh building information after adding a new floor
  };

  const handlePress = (index) =>{
    console.log(index);
  }

  const renderFloor = (floor) => {
    const sectionCount = parseInt(floor.section_numbers, 10) || 0;

    return (
      <View key={floor.id} style={styles.floorContainer}>
        <Text style={styles.floorNumber}>Floor {floor.floor_number}</Text>
        <View style={styles.sectionsContainer}>
          {[...Array(sectionCount)].map((_, index) => (
            <Pressable 
            key={index} 
            style={({ pressed }) => [
              styles.sectionSquare, 
              { 
                backgroundColor: columnColors[index % columnColors.length],
                opacity: pressed ? 0.5 : 1,  // Esto es opcional, pero muestra una animación cuando se presiona
              }
            ]} 
            onPress={() => handlePress(index)}  // Aquí llamas a la función que maneja el evento onPress
          >
            <Text style={styles.sectionText}>Section {index + 1}</Text>
          </Pressable>
          
          ))}
        </View>
      </View>
    );
  };

  const colorListItems = [
    { name: 'Eagle Area', color: 'lightgray', hours: "5" },
    { name: 'Holborn Area', color: '#f39c12' , hours: "5"},
    { name: 'West Eagle Area', color: '#DCDCDC', hours: "5"},
  ];
  
  const showColorListItems = () => {
    return buildingInformation.sections.map((item, index) => (
      <View key={index} style={styles.singleItemContainer}>
        <View key={index} style={[styles.listItem, { backgroundColor: item.section_color }]}></View>
        <Text>{item.section_name}</Text>
        <Text>{item.section_hours} Horas</Text>
      </View>
    ));
  };

  const totalFloors = buildingInformation.floors.length;

  return (
    <ScrollView style={styles.buildingContainer}>
        <Text style={styles.title}>{buildingInformation.name}</Text>
        <Text style={styles.title}>{buildingInformation.address}</Text>
        <Text style={styles.title}>Building total hours {buildingInformation.total_hours}</Text>
        <View style={styles.listItemContainer}>
          <AddFloorModal name="addSection" onSectionAdded={handleSectionAdded} />
          {showColorListItems()}
        </View>
        <View style={styles.floorContainer}>
          <AddFloorModal name="addFloor" totalFloors={totalFloors}  onFloorAdded={handleFloorAdded} />
          {buildingInformation.floors.map(renderFloor)}
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
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sectionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Distribute space evenly between items
    alignItems: 'center', // Center items vertically within the container
  },
  sectionText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionSquare: {
    width: '30%', // Adjust width to fit 3 items per row (e.g., 30% for 3 items with some margin)
    height: 60, 
    marginBottom: 10, // Margin at the bottom of each square
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
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
