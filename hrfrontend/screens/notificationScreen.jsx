import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureDetector } from 'react-native-gesture-handler';

// Datos de ejemplo
const notifications = [
  {
    id: '1',
    description: "Tu pedido ha sido enviado.",
    time: "10:45 AM",
    date: "11 Ago",
  },
  {
    id: '2',
    description: "Tu paquete está en camino.",
    time: "3:30 PM",
    date: "11 Ago",
  },
];

export const NotificationScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="bell" size={24} color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
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
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  notificationContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  iconContainer: {
    backgroundColor: '#007bff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});
