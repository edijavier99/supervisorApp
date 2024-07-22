import React from "react";
import { Alert, StyleSheet } from "react-native";
import { ListItem, Icon } from 'react-native-elements';

export const TeamCard = ({ employee }) => {

    const showMessage = ()=>{
        Alert.alert("holaaaa")
    }
  return (
    <ListItem containerStyle={styles.cardContainer} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{`${employee.firstName} ${employee.lastName}`}</ListItem.Title>
        <ListItem.Subtitle>{employee.mobile}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon type="material" color="#C8C8C8" name="more-vert" onPress={showMessage} />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
});
