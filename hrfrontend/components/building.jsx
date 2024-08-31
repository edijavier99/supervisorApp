import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView,Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddFloorModal } from './building/addFloorModal';
import { AddSectionModal } from './building/addSectionModal';

const columnColors = ['lightgray', '#f39c12', '#DCDCDC'];

export const Building = () => {
  const [buildingInformation, setBuildingInformation] = useState({
    name: "",
    total_hours: "",
    address: "",
    floors: [],
    sections: [],
  });
  const [userToken, setUserToken] = useState(null);
  const [sectionColors, setSectionColors] = useState([])

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
          console.log("aquioii",building.sections[0].section_color );
          const colors = building.sections.map(section => section.section_color);

          setBuildingInformation({
            name: building.name || "",
            total_hours: building.building_hours || "",
            address: building.address || "",
            floors: building.floors || [],
            sections: building.sections || [],
          });
          setSectionColors(colors)
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

  const handleSecctionPress = () =>{
    fetchBuildingInformation();
  }

  const renderFloor = (floor) => {
    const sectionCount = parseInt(floor.section_numbers, 10) || 0;
  
    // Crear un array con "Vacío" en todas las posiciones
    const sectionsArray = Array.from({ length: sectionCount }, (_, index) => ({
      position: index,
      content: 'Vacío',
    }));
  
    // Rellenar el array con los datos reales basados en specific_position
    floor.single_floor_sections.forEach(section => {
      if (section.specific_position < sectionCount) {
        sectionsArray[section.specific_position] = {
          position: section.specific_position,
          content: section.assigned_employee_name || 'Vacío',
        };
      }
    });
  
    return (
      <View key={floor.id} style={styles.floorContainer}>
        <Text style={styles.floorNumber}>Floor {floor.floor_number}</Text>
        <View style={styles.sectionsContainer}>
          {sectionsArray.map((section, index) => (
            <View 
              key={index} 
              style={[
                styles.sectionSquare, 
                { 
                  backgroundColor: sectionColors[index % sectionColors.length],
                  flexBasis: `${100 / sectionCount}%`, // Ajuste dinámico del tamaño
                }
              ]}
            >
              <AddSectionModal onSingleSectionAdded={handleSecctionPress} floorId={floor.id} positionId={index}/>
              <Text style={styles.sectionText}>
                {section.content}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };
  
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
          <Text>El edificio esta dividio en {buildingInformation.sections.length} secciones. Cada seccion costa de paleta de colors
          nombre y horas asignadas. 
          </Text>
          <AddFloorModal name="addSection" onSectionAdded={handleSectionAdded} />
          {showColorListItems()}
        </View>
        <View style={styles.floorContainer}>
          <AddFloorModal name="addFloor" totalFloors={totalFloors} totalSeccions={buildingInformation.sections.length} onFloorAdded={handleFloorAdded} />
          <Text>El edificion actualmente consta de {buildingInformation.floors.length} plantas</Text>
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
  title: {
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
    elevation: 3, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sectionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  sectionText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionSquare: {
    height: 60, 
    marginBottom: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  listItemContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    padding: 15,
    marginBottom: 8,
    marginTop: 8,
  },
  singleItemContainer: {
    alignItems: "center",
    height: 30,
    flexDirection: "row", 
    justifyContent: "space-between",
  },
  listItem: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
});
