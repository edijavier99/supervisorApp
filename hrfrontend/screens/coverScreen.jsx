import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View, FlatList, TextInput, Alert } from 'react-native';
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
  const [totalAvailableHours, setTotalAvailableHours] = useState(3); // Total de horas disponibles
  const [inputVisible, setInputVisible] = useState(false); // Estado para manejar la visibilidad del campo de entrada
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null); // Estado para manejar el empleado actual al que se le asignarán horas

  // Función para calcular el total de horas asignadas
  const calculateAssignedHours = () => {
    return employees.reduce((sum, employee) => sum + parseInt(employee.hours || '0'), 0);
  };

  // Función para manejar la asignación de horas
  const handleAssignHours = (id) => {
    setCurrentEmployeeId(id);
    setInputVisible(!inputVisible);
  };

  // Función para manejar los cambios en el campo de entrada
  const handleInputChange = (text) => {
    // Filtra la entrada para permitir solo números
    const filteredText = text.replace(/[^0-9]/g, '');
    const newTotalAssignedHours = calculateAssignedHours() - (employees.find(e => e.id === currentEmployeeId)?.hours || 0) + parseInt(filteredText || '0');
    
    // Verifica si el total asignado excede las horas disponibles
    if (newTotalAssignedHours > totalAvailableHours) {
      Alert.alert(
        "Error",
        "La cantidad total de horas asignadas no puede exceder las horas disponibles.",
        [{ text: "OK", style: "cancel" }]
      );
    } else {
      setEmployees(employees.map(employee =>
        employee.id === currentEmployeeId ? { ...employee, hours: filteredText } : employee
      ));
    }
  };

  // Función para manejar la eliminación de un empleado
  const handleDeleteClick = (itemId) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que quieres eliminar este empleado?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () => {
            setEmployees(employees.filter(employee => employee.id !== itemId));
          }
        }
      ]
    );
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
      <TouchableOpacity style={styles.asignBtn} onPress={() => handleAssignHours(item.id)}>
        <Text style={styles.asignBtnText}>Asignar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleDeleteClick(item.id)}>
        <Icon
          name="minus"
          type="font-awesome" // O el tipo de icono que prefieras
          size={20}
          color={"red"}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.coverHoursAvailable}>{totalAvailableHours} horas disponibles para cubrir</Text>
      <View style={styles.selectEmployeeBtnContainer}>
        <TouchableOpacity style={styles.selectEmployeeBtn}>
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
      <TouchableOpacity style={styles.saveCoverBtn}>
        <Text style={{ color: "white" }}>Guardar cover</Text>
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
    width: "15%"
  },
  asignBtn: {
    backgroundColor: "green",
    padding: 7,
    borderRadius: 5,
  },
  asignBtnText: {
    color: 'white',
    fontSize: 16,
  },
  saveCoverBtn: {
    backgroundColor: "green",
    borderRadius: 5,
    padding: 10,
    marginTop: 20
  }
});
