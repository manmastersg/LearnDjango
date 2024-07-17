import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroceryList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:8000/api/grocery-items/');
    setItems(response.data);
  };

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addItem = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/grocery-items/', newItem);
    setNewItem({ name: '', quantity: '' });
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:8000/api/grocery-items/${id}/`);
    fetchItems();
  };

  const editItem = async (id, updatedItem) => {
    await axios.put(`http://localhost:8000/api/grocery-items/${id}/`, updatedItem);
    fetchItems();
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Grocery List</h1>
      <form onSubmit={addItem} className="mb-5">
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          placeholder="Item name"
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          name="quantity"
          value={newItem.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Item</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            <span>{item.name} - {item.quantity}</span>
            <div>
              <button onClick={() => editItem(item.id, { ...item, quantity: item.quantity + 1 })} className="bg-green-500 text-white p-1 rounded mr-2">+</button>
              <button onClick={() => editItem(item.id, { ...item, quantity: Math.max(0, item.quantity - 1) })} className="bg-yellow-500 text-white p-1 rounded mr-2">-</button>
              <button onClick={() => deleteItem(item.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;