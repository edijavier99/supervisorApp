import React, { useState } from "react";
import { StyleSheet, Modal, View, Text, TouchableOpacity, Alert } from "react-native";
import { ListItem, Icon, Avatar } from 'react-native-elements';
import { Linking } from 'react-native';

export const TeamCard = ({ employee }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCall = (phoneNumber) => {
    let formattedNumber = phoneNumber.replace(/\s+/g, ''); // Eliminar espacios
    Linking.openURL(`tel:${formattedNumber}`).catch((err) => {
      console.error('Error:', err);
      Alert.alert('Error', 'No se pudo abrir la aplicación de teléfono.');
    });
  };

  // Función para obtener la inicial del nombre
  const getInitials = (name) => {
    return name.split(' ').map(part => part.charAt(0).toUpperCase()).join('');
  };

  const initials = getInitials(`${employee.firstName} ${employee.lastName}`);

  return (
    <View>
      <ListItem containerStyle={styles.cardContainer} bottomDivider>
        <ListItem.Content style={styles.cardInnerContainer}>
          <Avatar
            rounded
            size="medium"
            title={initials}
            containerStyle={styles.avatar}
            titleStyle={styles.avatarText}
          />
          <View>
            <ListItem.Title style={styles.employeeName}>{`${employee.firstName} ${employee.lastName}`}</ListItem.Title>
            <ListItem.Subtitle>{employee.mobile}</ListItem.Subtitle>
          </View>
        </ListItem.Content>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon type="material" color="#C8C8C8" name="more-vert" />
        </TouchableOpacity>
      </ListItem>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={[styles.button, styles.buttonRedirect]}
              onPress={() => {
                setModalVisible(!modalVisible);
                Alert.alert("Ir al perfil");
              }}>
              <Text style={styles.textStyle}>Perfil de {employee.firstName}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonRedirect]}
              onPress={() => {
                setModalVisible(!modalVisible);
                Alert.alert("Ir a horas");
              }}>
              <Text style={styles.textStyle}>Horas de {employee.firstName}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonRedirect]}
              onPress={() => {
                setModalVisible(!modalVisible);
                handleCall(employee.mobile);
              }}>
              <Text style={styles.textStyle}>Llamar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  cardInnerContainer:{
    flexDirection: "row",
    alignItems : "center",
    justifyContent: "flex-start"
  },
  employeeName: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 5
  },
  avatar: {
    marginRight: 10,
    backgroundColor : "grey",
  },
  avatarText: {
    color: 'white', // Color del texto en el Avatar
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    width: 180,
    elevation: 2,
    marginVertical: 5,
  },
  buttonRedirect: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: 'grey',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
