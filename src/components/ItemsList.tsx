import React from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';
import { InvoiceItem } from '../types';

interface ItemsListProps {
  items: InvoiceItem[];
  onRemoveItem: (id: string) => void;
}

export const ItemsList: React.FC<ItemsListProps> = ({ items, onRemoveItem }) => {
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <ShoppingCart className="mr-2 text-blue-600" size={24} />
          Items List
        </h2>
        <div className="text-center py-8 text-gray-500">
          <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">No items added yet</p>
          <p className="text-sm">Add items using the form above</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <ShoppingCart className="mr-2 text-blue-600" size={24} />
        Items List ({items.length})
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">S.No</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Description</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Qty</th>
              <th className="border border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Rate</th>
              <th className="border border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Amount</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-3">{item.description}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">{item.qty}</td>
                <td className="border border-gray-300 px-4 py-3 text-right">{item.rate} PKR</td>
                <td className="border border-gray-300 px-4 py-3 text-right font-semibold">{item.amount} PKR</td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-blue-50">
              <td colSpan={4} className="border border-gray-300 px-4 py-3 text-right font-bold text-gray-700">
                Total:
              </td>
              <td className="border border-gray-300 px-4 py-3 text-right font-bold text-blue-600 text-lg">
                {total} PKR
              </td>
              <td className="border border-gray-300"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};