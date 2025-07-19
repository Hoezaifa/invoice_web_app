import React from 'react';
import { User, Calendar, DollarSign } from 'lucide-react';

interface ClientFormProps {
  clientName: string;
  setClientName: (name: string) => void;
  invoiceDate: string;
  setInvoiceDate: (date: string) => void;
  advance: string;
  setAdvance: (advance: string) => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({
  clientName,
  setClientName,
  invoiceDate,
  setInvoiceDate,
  advance,
  setAdvance
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <User className="mr-2 text-blue-600" size={24} />
        Client Information
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            M/s (Client Name) *
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            placeholder="Enter client name"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline mr-1" size={16} />
              Date
            </label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="inline mr-1" size={16} />
              Advance (PKR)
            </label>
            <input
              type="number"
              value={advance}
              onChange={(e) => setAdvance(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};