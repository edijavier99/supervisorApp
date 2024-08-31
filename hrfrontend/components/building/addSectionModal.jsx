import React, { useState, useCallback } from "react";
import { View, Pressable, StyleSheet, Text, Modal, Alert } from "react-native";
import { Icon } from 'react-native-elements';
import { EmployeeDropdown } from "./employeeDropdown";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AddSectionModal = ({ floorId, positionId,onSingleSectionAdded }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const fetchUserToken = useCallback(async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Alert.alert('Error', 'User token not found');
      return null;
    }
    return token;
  }, []);

  const createSectionWithEmployee = useCallback(async () => {
    const userToken = await fetchUserToken();
    if (!userToken || !selectedEmployeeId) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/building/single-floor-section/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${userToken}`
        },
        body: JSON.stringify({
          floor: floorId,
          assigned_employee: selectedEmployeeId,
          specific_position: positionId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Failed to Create Section', errorData.detail || 'Unknown error');
        return;
      }

      const data = await response.json();
      Alert.alert('Success', 'Section created successfully');
    } catch (err) {
      Alert.alert('Error', 'Error creating section: ' + err.message);
    }
  }, [fetchUserToken, floorId, selectedEmployeeId]);

  const handleOpenModal = () => setModalVisible(true);

  const handleCloseModal = () => {
    setModalVisible(false);
    setDropdownVisible(false);
  };

  const handleAddEmployee = () => setDropdownVisible(true);

  const handleSave = () => {
    if (selectedEmployeeId) {
      createSectionWithEmployee();
      onSingleSectionAdded();
    } else {
      Alert.alert('Error', 'Please select an employee');
    }
  };

  const handleEmployeeSelect = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setDropdownVisible(false);
  };

  const handleEditEmployee = () => {
    setDropdownVisible(true);
    // Add logic for editing employee here
  };

  const handleDeleteEmployee = () => {
    setDropdownVisible(false);
    // Add logic for deleting employee here
    Alert.alert('Action Required', 'Please implement delete logic');
  };

  return (
    <View style={styles.container}>
      <Icon
        name="ellipsis-h"
        onPress={handleOpenModal}
        type="font-awesome"
        size={24}
        color="white"
        style={styles.icon}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Manage Employees</Text>

            <Pressable style={styles.button} onPress={handleAddEmployee}>
              <Text style={styles.buttonText}>Añadir Empleado</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={handleEditEmployee}>
              <Text style={styles.buttonText}>Cambiar Empleado</Text>
            </Pressable>

            {/* Dropdown visibility */}
            {dropdownVisible && <EmployeeDropdown onSelect={handleEmployeeSelect} />}

            <Pressable style={[styles.button, styles.deleteButton]} onPress={handleDeleteEmployee}>
              <Text style={styles.buttonText}>Borrar Empleado</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Guardar</Text>
            </Pressable>
            <Pressable style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "90%",
    padding: 25,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF4D4D",
  },
  closeButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#333",
    fontSize: 16,
  },
  icon: {
    alignSelf: "flex-end",
  }
});
