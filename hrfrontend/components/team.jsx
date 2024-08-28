import React, { useState, useCallback,useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SearchBar, Icon } from 'react-native-elements';
import { TeamCard } from "./teamCard";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importar AsyncStorage

export const Team = () => {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]); // Estado para almacenar los empleados
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigation = useNavigation(); // Hook para acceder a la navegación

  // Función para obtener el equipo desde la API
  const fetchTeam = useCallback(async () => {
    const userToken = await AsyncStorage.getItem("userToken");  // Obtener el token del AsyncStorage
    const supervisor_id = await AsyncStorage.getItem("user_id"); // Obtener el ID del supervisor
    const apiUrl = `http://127.0.0.1:8000/myapp/supervisor/${supervisor_id}/employees/`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${userToken}`  // Usar el token en la solicitud
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEmployees(data); // Actualizar el estado con los datos de la API
      } else {
        console.error('Error en la respuesta:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTeam(); // Llamar a la función para obtener los datos cuando la pantalla recibe el foco
    }, [fetchTeam])
  );

  useEffect(() => {
    // Filtrar empleados en base a la búsqueda
    if (search === "") {
      setFilteredEmployees(employees);
    } else {
      setFilteredEmployees(
        employees.filter(employee =>
          `${employee.user.first_name} ${employee.lastName}`.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, employees]); // Dependencias del useEffect

  const updateSearch = (text) => {
    setSearch(text);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        lightTheme
      />
      <View style={styles.addContainer}>
        <Text style={styles.title}>Mi Equipo</Text>
        <Icon
          name="plus"
          onPress={() => navigation.navigate('AddEmployee')} // Navegar a la pantalla 'AddEmployee'
          type="font-awesome"
          size={30}
          color="green"
          style={styles.plusIcon}
        />
      </View>
      <View>
        {filteredEmployees.map((employee, index) => (
          <TeamCard employee={employee} key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  searchBarContainer: {
    backgroundColor: '#fff',
  },
  searchBarInputContainer: {
    backgroundColor: '#eee',
  },
  addContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  plusIcon: {
    padding: 5,
  },
});
