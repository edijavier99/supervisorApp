import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

export const CoverScreen = () => {
  const navigation = useNavigation();

  // Estado para manejar la lista de empleados
  const [employees, setEmployees] = useState([
    { id: '1', name: 'John Doe', hours: '0' },
    { id: '2', name: 'Jane Smith', hours: '0' },
    { id: '3', name: 'Alice Johnson', hours: '0' }
  ]);

  const [inputVisible, setInputVisible] = useState(false); // Estado para manejar la visibilidad del campo de entrada
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null); // Estado para manejar el empleado actual al que se le asignarán horas

  const handleAssignHours = (id) => {
    setCurrentEmployeeId(id);
    setInputVisible(!inputVisible);
  };

  const handleInputChange = (text) => {
    setEmployees(employees.map(employee =>
      employee.id === currentEmployeeId ? { ...employee, hours: text } : employee
    ));
  };

  const renderEmployee = ({ item }) => (
    <View style={styles.employeeContainer}>
      <Text style={styles.employeeName}>{item.name}</Text>
      {currentEmployeeId === item.id && inputVisible ? (
        <TextInput
          style={styles.textInput}
          keyboardType='numeric'
          value={item.hours}
          onChangeText={handleInputChange}
        />
      ) : (
        <Text>{item.hours} horas</Text>
      )}
      <Icon
        name="close"
        type="font-awesome" // O el tipo de icono que prefieras
        size={20}
      />
      <TouchableOpacity onPress={() => handleAssignHours(item.id)}>
        <Text>Asignar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.coverHoursAvailable}>3 horas disponibles para cubrir</Text>
      <View style={styles.selectEmployeeBtnContainer}>
        <TouchableOpacity
          style={styles.selectEmployeeBtn}
        >
          <Text style={styles.textStyle}>Seleccionar empleado</Text>
        </TouchableOpacity>
        <Icon
          name="chevron-right"
          onPress={() => {
            navigation.navigate('AllEmployeesList'); // Navegar a la pantalla 'AllEmployeesList'
          }}
          type="font-awesome" // O el tipo de icono que prefieras
          size={18}
        />
      </View>

      <FlatList
        data={employees}
        renderItem={renderEmployee}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
      <TouchableOpacity style={styles.asignBtn} onPress={() => handleAssignHours(null)}>
        <Text style={styles.asignBtnText}>Asignar Horas</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  coverHoursAvailable: {
    marginTop: 20,
    marginBottom: 20
  },
  selectEmployeeBtnContainer: {
    backgroundColor: "lightgray",
    width: "90%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 13,
    marginBottom: 20, // Agregué un margen para separar del FlatList
  },
  selectEmployeeBtn: {
    // Asegúrate de agregar estilos aquí si es necesario
  },
  textStyle: {
    // Asegúrate de agregar estilos aquí si es necesario
  },
  flatList: {
    width: '100%', // Asegúrate de que la FlatList tenga el ancho suficiente
  },
  employeeContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  employeeName: {
    width: "40%",
  },
  textInput: {
    width: "40%",
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    textAlign: 'center',
  },
  asignBtn: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  asignBtnText: {
    color: 'white',
    fontSize: 16,
  }
});
