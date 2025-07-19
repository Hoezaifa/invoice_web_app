import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Invoice } from '../types';

export const generateInvoicePDF = (invoice: Invoice): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('AL HUZAIFA PRINTERS', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Professional Printing Services', pageWidth / 2, 30, { align: 'center' });
  
  // Client info
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`M/s: ${invoice.client.name}`, 20, 50);
  doc.text(`Date: ${invoice.client.date}`, pageWidth - 20, 50, { align: 'right' });
  
  // Items table
  const tableData = invoice.items.map((item, index) => [
    (index + 1).toString(),
    item.description,
    item.qty.toString(),
    `${item.rate} PKR`,
    `${item.amount} PKR`
  ]);
  
  autoTable(doc, {
    head: [['S.No', 'Description', 'Qty', 'Rate', 'Amount']],
    body: tableData,
    startY: 65,
    theme: 'grid',
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: 'bold'
    },
    styles: {
      fontSize: 10,
      cellPadding: 5
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 20 },
      1: { halign: 'left', cellWidth: 80 },
      2: { halign: 'center', cellWidth: 25 },
      3: { halign: 'right', cellWidth: 35 },
      4: { halign: 'right', cellWidth: 35 }
    }
  });
  
  // Summary
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total: ${invoice.total} PKR`, pageWidth - 20, finalY, { align: 'right' });
  
  if (invoice.client.advance > 0) {
    doc.text(`Advance: ${invoice.client.advance} PKR`, pageWidth - 20, finalY + 10, { align: 'right' });
    doc.text(`Balance: ${invoice.balance} PKR`, pageWidth - 20, finalY + 20, { align: 'right' });
  }
  
  // Footer
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const footerY = doc.internal.pageSize.height - 30;
  doc.text('Shop # 50, Al Momin Plaza Burns Road Karachi, 03332054452', pageWidth / 2, footerY, { align: 'center' });
  doc.text('Email: huzaifariaz1234@gmail.com', pageWidth / 2, footerY + 10, { align: 'center' });
  
  // Download
  const fileName = `${invoice.client.name.replace(/\s+/g, '_')}_${invoice.client.date.replace(/\//g, '-')}.pdf`;
  doc.save(fileName);
};