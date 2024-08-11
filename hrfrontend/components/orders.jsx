import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Solo importamos el ícono necesario
import { AddProduct } from './addProducts';

export const ShowNewCuantity = ({initialQuantity}) =>{
    return (
        <View style={{marginTop: 5}}>
            <Text>Nueva cantidad a pedir : {initialQuantity} </Text>
        </View>
    )
  }// Dummy data

const initialCategories = [
  {
    id: '1',
    title: 'Productos Baño',
    products: [
      { id: '1-1', name: 'Jabón', quantity: 10 },
      { id: '1-2', name: 'Shampoo', quantity: 5 },
    ],
  },
  {
    id: '2',
    title: 'Productos Suelo',
    products: [
      { id: '2-1', name: 'Detergente para suelos', quantity: 8 },
      { id: '2-2', name: 'Limpiador multiusos', quantity: 12 },
    ],
  },
  {
    id: '3',
    title: 'Productos Oficinas',
    products: [
      { id: '3-1', name: 'Papel de oficina', quantity: 20 },
      { id: '3-2', name: 'Bolígrafos', quantity: 30 },
    ],
  },
];

export const Orders = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [newQuantities, setNewQuantities] = useState({}); // Estado para cantidades específicas de productos
  const [activateNewOrder , setActivateNewOrder] = useState(false)

  const handlePress = (categoryId) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId], // Toggle the current category
    }));
  };

  const handleAddProduct = (categoryId, productName, quantity) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              products: [
                ...category.products,
                { id: `${categoryId}-${Date.now()}`, name: productName, quantity: parseInt(quantity) },
              ],
            }
          : category
      )
    );
  };

  const handleQuantityChange = (productId, delta) => {
    setNewQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) + delta, 0), // Prevent negative quantities
    }));
  };

  const handleCreateOrder = () => {
    // Implement logic for creating a new order
    console.log('New quantities:', newQuantities);
    setNewQuantities({}); // Clear quantities after creating order
  };

  const ActivateOrderInputs = () =>{
    console.log(activateNewOrder);
    setActivateNewOrder(true)
    console.log(activateNewOrder);

  }

  return (
    <>
    <View style={styles.container}>
      {categories.map((category) => (
        <View key={category.id} style={styles.categoryContainer}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <AddProduct categoryId={category.id} categoryTitle={category.title} onAddProduct={handleAddProduct} />
            <TouchableOpacity onPress={() => handlePress(category.id)}>
              <MaterialIcons
                name={expandedCategories[category.id] ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {expandedCategories[category.id] && (
            <FlatList
              data={category.products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.productContainer}>
                    <View>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productQuantity}>Cantidad: {item.quantity}</Text>
                        {newQuantities[item.id] !== undefined && <ShowNewCuantity initialQuantity={newQuantities[item.id]} />}
                    </View>

                    {activateNewOrder ? ( 
                      <View style={styles.addBtnsContainer}>
                        <TouchableOpacity
                          onPress={() => handleQuantityChange(item.id, -1)}
                          disabled={(newQuantities[item.id] || 0) <= 0}
                        >
                          <MaterialIcons
                            name="remove"
                            size={24}
                            color="white"
                            backgroundColor="red"
                            style={styles.removeBtn}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => handleQuantityChange(item.id, 1)}
                        >
                          <MaterialIcons
                            name="add"
                            size={24}
                            color="white"
                            backgroundColor="green"
                            style={styles.addBtn}
                          />
                        </TouchableOpacity>
                      </View>
                    ):
                    ""}
                </View>
              )}
            />
          )}
        </View>
      ))}
    </View>
    <TouchableOpacity 
        style={styles.createDeliveryBtn}
        onPress={()=> ActivateOrderInputs()}
    >
        <Text style={{color: "white"}}>Crear nuevo pedido</Text>
    </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    width: "75%",
  },
  productContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between"
  },
 
  productName: {
    fontSize: 16,
    fontWeight: '500',
  },
  productQuantity: {
    fontSize: 14,
    color: '#666',
  },
  createDeliveryBtn:{
    backgroundColor: "green",
    padding: 10,
    marginBottom: 20,
    width: "40%",
    borderRadius: 10,
    alignSelf: "center"
  },
//   CSS PARA LOS BOTONES DE AÑADIR CANTIDAD AL PEDIDO
    addBtnsContainer:{
        flexDirection: "row",
        width: "20%",
        justifyContent: "space-between",
    },
});
