export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type PaymentMethod = "credit_card" | "debit_card" | "bank_account" | "paypal";

export interface Payment {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  description: string;
  dueDate: string;
  paidDate?: string;
  createdAt: string;
}

export interface PaymentHistory {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  invoiceNumber: string;
}

export interface BillingOverview {
  totalDue: number;
  lastPayment: number;
  lastPaymentDate: string;
  nextPaymentDue: number;
  nextPaymentDate: string;
  outstandingBalance: number;
}

export interface PaymentFormData {
  amount: number;
  method: PaymentMethod;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}
