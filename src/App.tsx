import React, { useState, useEffect } from 'react';
import { Printer, Trash2 } from 'lucide-react';
import { ClientForm } from './components/ClientForm';
import { ItemForm } from './components/ItemForm';
import { ItemsList } from './components/ItemsList';
import { GenerateButton } from './components/GenerateButton';
import { InvoiceItem } from './types';
import { saveItems, loadItems, saveClientInfo, loadClientInfo, clearStorage } from './utils/storage';

function App() {
  const [clientName, setClientName] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [advance, setAdvance] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedItems = loadItems();
    const savedClient = loadClientInfo();
    
    setItems(savedItems);
    setClientName(savedClient.name || '');
    setInvoiceDate(savedClient.date || new Date().toISOString().split('T')[0]);
    setAdvance(savedClient.advance ? savedClient.advance.toString() : '');
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    saveItems(items);
  }, [items]);

  useEffect(() => {
    saveClientInfo({ name: clientName, date: invoiceDate, advance: advance ? parseInt(advance) : 0 });
  }, [clientName, invoiceDate, advance]);

  const handleAddItem = (item: InvoiceItem) => {
    setItems(prev => [...prev, item]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClear = () => {
    setClientName('');
    setInvoiceDate(new Date().toISOString().split('T')[0]);
    setAdvance('');
    setItems([]);
    clearStorage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Printer className="text-blue-600 mr-3" size={40} />
            <h1 className="text-3xl font-bold text-gray-800">Al Huzaifa Printers</h1>
          </div>
          <p className="text-gray-600 text-lg">Professional Invoice Generator</p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleClear}
              className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-600 transition-colors"
            >
              <Trash2 className="mr-2" size={16} />
              Clear All
            </button>
          </div>
        </div>

        {/* Client Form */}
        <ClientForm
          clientName={clientName}
          setClientName={setClientName}
          invoiceDate={invoiceDate}
          setInvoiceDate={setInvoiceDate}
          advance={advance}
          setAdvance={setAdvance}
        />

        {/* Item Form */}
        <ItemForm onAddItem={handleAddItem} />

        {/* Items List */}
        <ItemsList items={items} onRemoveItem={handleRemoveItem} />

        {/* Generate Button */}
        <GenerateButton
          clientName={clientName}
          invoiceDate={invoiceDate}
          advance={advance}
          items={items}
          onClear={handleClear}
        />

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Shop # 50, Al Momin Plaza Burns Road Karachi</p>
          <p>Phone: 03332054452 | Email: huzaifariaz1234@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default App;