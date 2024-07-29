import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SearchBar } from 'react-native-elements';
import { TeamCard } from "./teamCard";

export const Team = () => {
  const [search, setSearch] = useState("");

  const dummyEmployees = [
    {
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@gmail.com',
      mobile: '555-1234'
    },
    {
      firstName: 'María',
      lastName: 'García',
      email: 'maria.garcia@gmail.com',
      mobile: '555-5678'
    },
    {
      firstName: 'Luis',
      lastName: 'Rodríguez',
      email: 'luis.rodriguez@gmail.com',
      mobile: '555-9101'
    },
    {
      firstName: 'Ana',
      lastName: 'López',
      email: 'ana.lopez@gmail.com',
      mobile: '555-1122'
    },
    {
      firstName: 'Carlos',
      lastName: 'Martínez',
      email: 'carlos.martinez@gmail.com',
      mobile: '555-3344'
    }
  ];

  const [filteredEmployees, setFilteredEmployees] = useState(dummyEmployees);

  const updateSearch = (search) => {
    setSearch(search);
    if (search === "") {
      setFilteredEmployees(dummyEmployees);
    } else {
      setFilteredEmployees(
        dummyEmployees.filter(employee =>
          `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  const showFilteredEmployees = () => {
    return filteredEmployees.map((employee, index) => {
      return (
        <TeamCard employee={employee} key={index} />
      );
    });
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
      <Text style={styles.title}>Mi Equipo</Text>
      <View>
        {showFilteredEmployees()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
  },
  searchBarInputContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20
  },
});
