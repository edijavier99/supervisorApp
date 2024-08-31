// EmployeeDropdown.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EmployeeDropdown = ({ onSelect }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAllEmployeesAvailable();
  }, []);

  const fetchAllEmployeesAvailable = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const supervisor_id = await AsyncStorage.getItem('user_id');
      
      if (userToken && supervisor_id) {
        const response = await fetch(`http://127.0.0.1:8000/myapp/supervisor/${supervisor_id}/employees/filtered/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${userToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const employees = await response.json();
          // Transform the employees data into the format required by Dropdown
          const dropdownData = employees.map(employee => ({
            label: `${employee.first_name} ${employee.last_name}`,
            value: employee.id.toString(),
          }));
          console.log(employees);
          setData(dropdownData);
        } else {
          console.error('Failed to fetch employees');
        }
      } else {
        console.error('User token or supervisor ID not found');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Selecciona empleado' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onSelect(item.value); // Call the callback with the selected value
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="user"
            size={20}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: "100%",
    marginBottom: 10,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
