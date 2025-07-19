export interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface ClientInfo {
  name: string;
  date: string;
  advance: number;
}

export interface Invoice {
  client: ClientInfo;
  items: InvoiceItem[];
  total: number;
  balance: number;
}