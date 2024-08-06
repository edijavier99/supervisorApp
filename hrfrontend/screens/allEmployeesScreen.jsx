import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Icon } from "react-native-elements";

const dummyEmployees = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Alice Johnson' }
];

export const AllEmployeesScreen = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const toggleSelection = (id) => {
    setSelectedEmployees(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(employeeId => employeeId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.employeeItem}
      onPress={() => toggleSelection(item.id)}
    >
      <Icon
        name={selectedEmployees.includes(item.id) ? "check-circle" : "circle-o"}
        type="font-awesome"
        size={24}
        color={selectedEmployees.includes(item.id) ? "green" : "gray"}
      />
      <Text style={styles.employeeName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyEmployees}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  employeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  employeeName: {
    marginLeft: 10,
    fontSize: 16,
  },
});
