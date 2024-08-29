import React, { useState } from "react";
import { View, Button, Modal, StyleSheet, Text } from "react-native";
import { AddFloor } from "./addFloor";
import { AddSection } from "./addSection";
import { Icon } from 'react-native-elements';

export const AddFloorModal = ({ name, onFloorAdded, onSectionAdded, totalFloors }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const renderModalContent = () => {
    if (name === "addFloor") {
      return <AddFloor totalFloors={totalFloors} onFloorAdded={onFloorAdded} />;
    } else if (name === "addSection") {
      return <AddSection onSectionAdded={onSectionAdded} />;
    }
    return null; // En caso de que `name` no coincida con ninguno
  };

  return (
    <View style={styles.container}>
      <Icon 
        name="plus" 
        onPress={handleOpenModal} 
        type="font-awesome" 
        size={20} 
        color="green" 
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
            {renderModalContent()}
            <Button title="Close" onPress={handleCloseModal} />
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "95%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
