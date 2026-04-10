"use client";

import { useState } from "react";
import { DollarSign, Calendar, CheckCircle, Download, CreditCard, Play, ChevronDown, ChevronUp, Lock, Zap } from "lucide-react";
import { Payment, BillingOverview } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button, Badge, Input, Select } from "@/components/ui";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerAnimation";
import DataTable from "@/components/tables/DataTable";
import type { Column } from "@/components/tables/DataTable";
import { MOCK_BILLING_OVERVIEW, MOCK_PAYMENT_HISTORY } from "@/features/payments/payments.mock";

export default function PaymentsPage() {
  // State management
  const [billingOverview] = useState<BillingOverview>(MOCK_BILLING_OVERVIEW);
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>(MOCK_PAYMENT_HISTORY);
  
  // Expandable card states
  const [makePaymentExpanded, setMakePaymentExpanded] = useState(false);
  const [autoPayExpanded, setAutoPayExpanded] = useState(false);
  
  // Form states
  const [selectedPolicy, setSelectedPolicy] = useState("POL-2024-123456");
  const [paymentAmount, setPaymentAmount] = useState("535");
  const [selectedMethod, setSelectedMethod] = useState("visa-4242");
  const [autoPayActive, setAutoPayActive] = useState(false);
  const [autoPayMethod, setAutoPayMethod] = useState("visa-4242");
  const [autoPayAuthorized, setAutoPayAuthorized] = useState(false);

  // Handlers
  const handleDownloadReceipt = async (paymentId: string) => {
    // Simulate download
    alert(`Downloading receipt for payment ${paymentId}`);
  };

  const handleMakePayment = () => {
    if (!selectedPolicy || !paymentAmount || !selectedMethod) {
      alert("Please fill in all fields");
      return;
    }
    
    // Generate invoice number
    const today = new Date();
    const year = today.getFullYear();
    const invoiceCount = paymentHistory.filter(p => p.invoiceNumber.includes(`INV-${year}`)).length + 1;
    const invoiceNumber = `INV-${year}-${String(invoiceCount).padStart(3, '0')}`;
    
    // Create new payment entry
    const newPayment: Payment = {
      id: `PAY-${Date.now()}`,
      invoiceNumber,
      amount: parseFloat(paymentAmount),
      method: selectedMethod.includes('visa') || selectedMethod.includes('mc') ? 'credit_card' : 'bank_account',
      status: "completed",
      description: `Monthly Premium - ${today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      dueDate: today.toISOString().split('T')[0],
      paidDate: today.toISOString().split('T')[0],
      createdAt: today.toISOString().split('T')[0],
    };
    
    // Add to payment history at the beginning
    setPaymentHistory([newPayment, ...paymentHistory]);
    
    alert(`Payment of ${formatCurrency(parseFloat(paymentAmount))} processed successfully!\nInvoice: ${invoiceNumber}`);
    setPaymentAmount("535");
    setSelectedMethod("visa-4242");
    setMakePaymentExpanded(false);
  };

  const handleToggleAutoPay = () => {
    if (!autoPayActive && (!autoPayMethod || !autoPayAuthorized)) {
      alert("Please select a payment method and authorize automatic deductions");
      return;
    }
    
    const newState = !autoPayActive;
    setAutoPayActive(newState);
    alert(`Auto Pay ${newState ? 'enabled' : 'disabled'} successfully!`);
    if (newState) {
      setAutoPayExpanded(false);
    }
  };


  
  const columns: Column<Payment>[] = [
    {
      header: "Invoice",
      accessor: "invoiceNumber",
      cell: (value: unknown) => <span className="font-medium text-gray-900">{value as string}</span>,
    },
    {
      header: "Description",
      accessor: "description",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      cell: (value: unknown) => formatDate(value as string),
    },
    {
      header: "Paid Date",
      accessor: "paidDate",
      cell: (value: unknown) => value ? formatDate(value as string) : "—",
    },
    {
      header: "Amount",
      accessor: "amount",
      cell: (value: unknown) => (
        <span className="font-semibold text-gray-900">{formatCurrency(value as number)}</span>
      ),
    },
    {
      header: "Method",
      accessor: "method",
      cell: (value: unknown) => (
        <span className="capitalize text-[14px]">{(value as string).replace("_", " ")}</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value: unknown) => (
        <Badge variant="status" status={value as string}>
          {value as string}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: "id",
      cell: (value: unknown) => (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleDownloadReceipt(value as string)}
        >
          <Download className="w-3.5 h-3.5 mr-1" />
          Receipt
        </Button>
      ),
    },
  ];
  
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payments & Billing</h1>
        <p className="text-[16px] text-gray-600 mt-1">
          Manage your payments, billing information, and payment methods
        </p>
      </div>

      <StaggerContainer className="space-y-5">
        {/* Payment Overview Cards */}
        <StaggerItem>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="card px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-50 rounded-xl">
                  <DollarSign className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-[15px] text-gray-600">Next Payment Due</p>
                  <p className="text-2xl font-bold text-gray-900 font-outfit">
                    {formatCurrency(billingOverview.nextPaymentDue)}
                  </p>
                  <p className="text-[14px] text-gray-500 mt-1">
                    Due on {formatDate(billingOverview.nextPaymentDate)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-50 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-[15px] text-gray-600">Last Payment</p>
                  <p className="text-2xl font-bold text-gray-900 font-outfit">
                    {formatCurrency(billingOverview.lastPayment)}
                  </p>
                  <p className="text-[14px] text-gray-500 mt-1">
                    Paid on {formatDate(billingOverview.lastPaymentDate)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-[15px] text-gray-600">Outstanding Balance</p>
                  <p className="text-2xl font-bold text-gray-900 font-outfit">
                    {formatCurrency(billingOverview.outstandingBalance)}
                  </p>
                  <p className="text-[14px] text-success mt-1">All caught up!</p>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>

        {/* Make a Payment & Auto Pay Setup */}
        <StaggerItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Make a Payment Card */}
            <div className={`card overflow-hidden transition-all duration-300 ${makePaymentExpanded ? 'ring-2 ring-ocean-mid' : ''}`}>
              <div className="px-4 py-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-gradient-to-br from-ocean-mid to-ocean-mid/80 rounded-lg shadow-sm">
                      <CreditCard className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Make a Payment</h2>
                      <p className="text-[12px] text-gray-600 mt-0.5">Quick & secure payment processing</p>
                    </div>
                  </div>
                  {makePaymentExpanded && (
                    <button
                      onClick={() => setMakePaymentExpanded(false)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="px-4 py-3 space-y-3">
                {!makePaymentExpanded ? (
                  <>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg p-3 space-y-2.5 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] text-gray-600 font-medium">Next Payment Due</span>
                        <span className="text-2xl font-bold text-gray-900 font-outfit">
                          {formatCurrency(billingOverview.nextPaymentDue)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-gray-600">Due Date</span>
                        <span className="font-medium text-gray-900 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          {formatDate(billingOverview.nextPaymentDate)}
                        </span>
                      </div>
                      {billingOverview.outstandingBalance > 0 && (
                        <div className="flex items-center justify-between pt-1.5 border-t border-gray-300">
                          <span className="text-[12px] text-gray-600">Outstanding Balance</span>
                          <span className="text-[13px] font-semibold text-warning">
                            {formatCurrency(billingOverview.outstandingBalance)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      variant="primary" 
                      className="w-full bg-ocean-mid hover:bg-ocean-mid/90 shadow-sm"
                      onClick={() => setMakePaymentExpanded(true)}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay Now
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-3">
                      <Select
                        label="Policy"
                        value={selectedPolicy}
                        onChange={(e) => setSelectedPolicy(e.target.value)}
                        options={[
                          { label: "POL-2024-123456 (Gold Premium)", value: "POL-2024-123456" },
                          { label: "POL-2024-123457 (Silver Plan)", value: "POL-2024-123457" },
                        ]}
                        required
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Amount (USD)
                        </label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          required
                        />
                      </div>

                      <Select
                        label="Payment Method"
                        value={selectedMethod}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        options={[
                          { label: "Visa ending in 4242", value: "visa-4242" },
                          { label: "Mastercard ending in 5678", value: "mc-5678" },
                          { label: "Bank Account ending in 9012", value: "bank-9012" },
                        ]}
                        required
                      />

                      <div className="flex items-center gap-2 text-[12px] text-gray-600 bg-blue-50 rounded-lg p-2 border border-blue-100">
                        <Lock className="w-3.5 h-3.5 text-ocean-mid flex-shrink-0" />
                        <span>Secured by 256-bit SSL encryption</span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 pt-1.5">
                      <Button 
                        variant="secondary" 
                        className="flex-1"
                        onClick={() => setMakePaymentExpanded(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        className="flex-1 bg-ocean-mid hover:bg-ocean-mid/90"
                        onClick={handleMakePayment}
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Pay {formatCurrency(parseFloat(paymentAmount || "0"))}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Auto Pay Setup Card */}
            <div className={`card overflow-hidden transition-all duration-300 ${autoPayExpanded ? 'ring-2 ring-success' : ''} ${autoPayActive ? 'bg-green-50/30' : ''}`}>
              <div className="px-4 py-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg shadow-sm ${autoPayActive ? 'bg-gradient-to-br from-success to-success/80' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
                      <Zap className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-lg font-semibold text-gray-900">Auto Pay</h2>
                        {autoPayActive && (
                          <Badge className="bg-success/10 text-success border-success/20 text-[10px] px-1.5 py-0.5">
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-[12px] text-gray-600 mt-0.5">
                        {autoPayActive ? 'Automatic payments enabled' : 'Set up automatic payments'}
                      </p>
                    </div>
                  </div>
                  {autoPayExpanded && (
                    <button
                      onClick={() => setAutoPayExpanded(false)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="px-4 py-3 space-y-3">
                {!autoPayExpanded ? (
                  <>
                    {autoPayActive ? (
                      <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg p-3 space-y-2.5 border border-green-200">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle className="w-4.5 h-4.5 text-success flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-[13px] font-semibold text-gray-900 mb-1.5">
                              Auto Pay is Active
                            </p>
                            <div className="space-y-1 text-[12px] text-gray-700">
                              <div className="flex items-center justify-between">
                                <span>Next Payment</span>
                                <span className="font-medium">{formatCurrency(billingOverview.nextPaymentDue)}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Payment Date</span>
                                <span className="font-medium">{formatDate(billingOverview.nextPaymentDate)}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Payment Method</span>
                                <span className="font-medium">Visa •••• 4242</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg p-3 border border-gray-200">
                        <div className="flex items-start gap-2.5">
                          <div className="p-1.5 bg-gray-200 rounded-lg">
                            <Zap className="w-3.5 h-3.5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-gray-900 mb-0.5">
                              Enable Auto Pay
                            </p>
                            <p className="text-[12px] text-gray-600">
                              Never miss a payment. Activate automatic monthly payments for hassle-free coverage.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      variant={autoPayActive ? "secondary" : "primary"}
                      className={`w-full ${!autoPayActive ? 'bg-success hover:bg-success/90 shadow-sm' : ''}`}
                      onClick={() => autoPayActive ? setAutoPayExpanded(true) : setAutoPayExpanded(true)}
                    >
                      {autoPayActive ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Manage Auto Pay
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Enable Auto Pay
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-3">
                      {!autoPayActive && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 flex items-start gap-2">
                          <div className="w-3.5 h-3.5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-[9px] font-bold">i</span>
                          </div>
                          <p className="text-[12px] text-blue-900">
                            Auto-payment is currently disabled
                          </p>
                        </div>
                      )}

                      <Select
                        label="Payment Method"
                        value={autoPayMethod}
                        onChange={(e) => setAutoPayMethod(e.target.value)}
                        options={[
                          { label: "Visa ending in 4242", value: "visa-4242" },
                          { label: "Mastercard ending in 5678", value: "mc-5678" },
                          { label: "Bank Account ending in 9012", value: "bank-9012" },
                        ]}
                        required
                      />

                      <label className="flex items-start gap-2.5 cursor-pointer p-2.5 rounded-lg border border-gray-200 hover:border-ocean-mid/50 transition-colors">
                        <input
                          type="checkbox"
                          checked={autoPayAuthorized}
                          onChange={(e) => setAutoPayAuthorized(e.target.checked)}
                          className="w-4 h-4 text-ocean-mid rounded border-gray-300 focus:ring-ocean-mid mt-0.5 flex-shrink-0"
                        />
                        <span className="text-[12px] text-gray-700">
                          I authorize automatic deductions for premium payments
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-2.5 pt-1.5">
                      <Button 
                        variant="secondary" 
                        className="flex-1"
                        onClick={() => setAutoPayExpanded(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        className={`flex-1 ${autoPayActive ? 'bg-gray-600 hover:bg-gray-700' : 'bg-success hover:bg-success/90'}`}
                        onClick={handleToggleAutoPay}
                      >
                        {autoPayActive ? (
                          <>
                            Disable Auto Pay
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Enable Auto Pay
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </StaggerItem>

        {/* Payment History */}
        <StaggerItem>
          <div className="card">
            <div className="px-5 py-2.5 border-b border-border">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
                <p className="text-[14px] text-gray-600 mt-0.5">View and download your payment receipts</p>
              </div>
            </div>

            <div className="px-5 py-4">
              <DataTable
                columns={columns}
                data={paymentHistory}
                emptyMessage="No payment history available"
              />
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
