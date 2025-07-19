import { Invoice, InvoiceItem } from '../types';

const STORAGE_KEYS = {
  ITEMS: 'invoice_items',
  CLIENT: 'client_info',
  INVOICES: 'saved_invoices'
};

export const saveItems = (items: InvoiceItem[]): void => {
  localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
};

export const loadItems = (): InvoiceItem[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.ITEMS);
  return stored ? JSON.parse(stored) : [];
};

export const saveClientInfo = (client: any): void => {
  localStorage.setItem(STORAGE_KEYS.CLIENT, JSON.stringify(client));
};

export const loadClientInfo = (): any => {
  const stored = localStorage.getItem(STORAGE_KEYS.CLIENT);
  return stored ? JSON.parse(stored) : { name: '', date: '', advance: 0 };
};

export const saveInvoice = (invoice: Invoice): void => {
  const invoices = loadInvoices();
  invoices.push({ ...invoice, id: Date.now().toString() });
  localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
};

export const loadInvoices = (): (Invoice & { id: string })[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.INVOICES);
  return stored ? JSON.parse(stored) : [];
};

export const clearStorage = (): void => {
  localStorage.removeItem(STORAGE_KEYS.ITEMS);
  localStorage.removeItem(STORAGE_KEYS.CLIENT);
};