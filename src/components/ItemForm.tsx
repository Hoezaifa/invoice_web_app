import React, { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import { InvoiceItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ItemFormProps {
  onAddItem: (item: InvoiceItem) => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ onAddItem }) => {
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState('');
  const [rate, setRate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !qty || !rate) {
      alert('Please fill all fields');
      return;
    }

    const qtyNum = parseInt(qty);
    const rateNum = parseInt(rate);
    
    if (isNaN(qtyNum) || isNaN(rateNum) || qtyNum <= 0 || rateNum <= 0) {
      alert('Quantity and Rate must be positive numbers');
      return;
    }

    const newItem: InvoiceItem = {
      id: uuidv4(),
      description: description.trim(),
      qty: qtyNum,
      rate: rateNum,
      amount: qtyNum * rateNum
    };

    onAddItem(newItem);
    setDescription('');
    setQty('');
    setRate('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Package className="mr-2 text-blue-600" size={24} />
        Add Item
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            placeholder="Enter item description"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity *
            </label>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              placeholder="0"
              min="1"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rate (PKR) *
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              placeholder="0"
              min="1"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition-colors text-lg"
        >
          <Plus className="mr-2" size={20} />
          Add Item
        </button>
      </form>
    </div>
  );
};