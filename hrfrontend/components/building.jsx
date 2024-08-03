import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Floor = ({ floorNumber }) => {
  return (
    <View style={styles.floorContainer}>
      <View style={[styles.section, styles.leftSection]}>
        <Text style={styles.sectionText}>Left</Text>
      </View>
      <View style={[styles.section, styles.rightSection]}>
        <Text style={styles.sectionText}>Right</Text>
      </View>
    </View>
  );
};

export const Building = () => {
  return (
    <View style={styles.buildingContainer}>
      <Text style={styles.title}>Building</Text>
      <Floor floorNumber={1} />
      <Floor floorNumber={2} />
      <Floor floorNumber={3} />
    </View>
  );
};

const styles = StyleSheet.create({
  buildingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  floorContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    marginVertical: 5,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  leftSection: {
    backgroundColor: '#8e44ad',
  },
  rightSection: {
    backgroundColor: '#3498db',
  },
  sectionText: {
    color: '#fff',
    fontSize: 18,
  },
});
