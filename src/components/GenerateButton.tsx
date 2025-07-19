import React from 'react';
import { FileText, Download } from 'lucide-react';
import { InvoiceItem } from '../types';
import { generateInvoicePDF } from '../utils/pdfGenerator';
import { saveInvoice } from '../utils/storage';

interface GenerateButtonProps {
  clientName: string;
  invoiceDate: string;
  advance: string;
  items: InvoiceItem[];
  onClear: () => void;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  clientName,
  invoiceDate,
  advance,
  items,
  onClear
}) => {
  const handleGenerate = () => {
    if (!clientName.trim()) {
      alert('Client name is required');
      return;
    }

    if (items.length === 0) {
      alert('Add at least one item');
      return;
    }

    const advanceNum = advance ? parseInt(advance) : 0;
    if (advance && isNaN(advanceNum)) {
      alert('Advance must be a valid number');
      return;
    }

    const total = items.reduce((sum, item) => sum + item.amount, 0);
    const balance = total - advanceNum;

    const invoice = {
      client: {
        name: clientName.trim(),
        date: invoiceDate || new Date().toLocaleDateString('en-GB'),
        advance: advanceNum
      },
      items,
      total,
      balance
    };

    // Generate PDF
    generateInvoicePDF(invoice);
    
    // Save to history
    saveInvoice(invoice);
    
    // Clear form
    onClear();
    
    alert('Invoice generated successfully!');
  };

  const total = items.reduce((sum, item) => sum + item.amount, 0);
  const advanceNum = advance ? parseInt(advance) : 0;
  const balance = total - advanceNum;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <FileText className="mr-2 text-blue-600" size={24} />
        Invoice Summary
      </h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-semibold text-lg">{total} PKR</span>
        </div>
        
        {advanceNum > 0 && (
          <>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Advance:</span>
              <span className="font-semibold">{advanceNum} PKR</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Balance:</span>
              <span className="font-semibold text-lg text-blue-600">{balance} PKR</span>
            </div>
          </>
        )}
      </div>
      
      <button
        onClick={handleGenerate}
        disabled={!clientName.trim() || items.length === 0}
        className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
      >
        <Download className="mr-2" size={20} />
        Generate Invoice PDF
      </button>
    </div>
  );
};