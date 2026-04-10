"use client";

import { CreditCard, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui";
import type { PaymentMethod } from "@/features/payments/payments.types";

interface PaymentMethodsAndAutoPaySectionProps {
  paymentMethods: PaymentMethod[];
  isAutoPayEnabled: boolean;
  autoPayMethodId?: string;
  nextPaymentDate: string;
  nextPaymentAmount: number;
  onAddMethod: () => void;
  onRemoveMethod: (methodId: string) => void;
  onSetDefault: (methodId: string) => void;
  onToggleAutoPay: (enabled: boolean) => void;
  onSetAutoPayMethod: (methodId: string) => void;
}

export function PaymentMethodsAndAutoPaySection({
  paymentMethods,
  isAutoPayEnabled,
  autoPayMethodId,
  nextPaymentDate,
  nextPaymentAmount,
  onAddMethod,
  onRemoveMethod,
  onSetDefault,
  onToggleAutoPay,
  onSetAutoPayMethod,
}: PaymentMethodsAndAutoPaySectionProps) {
  const autoPayMethod = paymentMethods.find((m) => m.id === autoPayMethodId);

  return (
    <div className="card">
      <div className="px-5 py-2.5 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
          <p className="text-[14px] text-gray-600 mt-0.5">Manage your saved payment methods</p>
        </div>
        <Button variant="secondary" onClick={onAddMethod}>
          <Plus className="w-4 h-4 mr-1.5" />
          Add Method
        </Button>
      </div>

      <div className="px-5 py-4">{paymentMethods.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <CreditCard className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-[14px] text-gray-600 mb-3">No payment methods saved</p>
            <Button variant="secondary" size="sm" onClick={onAddMethod}>
              <Plus className="w-4 h-4 mr-1.5" />
              Add Your First Method
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Auto-Pay Setting */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[15px] font-semibold text-gray-900">Automatic Payments</p>
                  <p className="text-[13px] text-gray-600 mt-0.5">
                    {isAutoPayEnabled && autoPayMethod
                      ? `$${nextPaymentAmount.toFixed(2)} on ${new Date(nextPaymentDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })} using •••• ${autoPayMethod.last4}`
                      : "Enable to automatically pay your premium each month"}
                  </p>
                </div>
                <button
                  onClick={() => onToggleAutoPay(!isAutoPayEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-mid focus:ring-offset-2 ${
                    isAutoPayEnabled ? "bg-ocean-mid" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isAutoPayEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Payment Methods List */}
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[15px] font-medium text-gray-900">
                          {method.brand?.toUpperCase() || method.type.replace("_", " ")} •••• {method.last4}
                        </p>
                        {method.isDefault && (
                          <span className="text-[11px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                        {isAutoPayEnabled && autoPayMethodId === method.id && (
                          <span className="text-[11px] font-medium text-ocean-mid bg-ocean-mid/5 px-2 py-0.5 rounded-full">
                            Auto-Pay
                          </span>
                        )}
                      </div>
                      {method.expiryMonth && method.expiryYear && (
                        <p className="text-[13px] text-gray-500 mt-0.5">
                          Expires {String(method.expiryMonth).padStart(2, "0")}/{method.expiryYear}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isAutoPayEnabled && autoPayMethodId !== method.id && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onSetAutoPayMethod(method.id)}
                      >
                        Use for Auto-Pay
                      </Button>
                    )}
                    {!isAutoPayEnabled && !method.isDefault && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onSetDefault(method.id)}
                      >
                        Set Default
                      </Button>
                    )}
                    <button
                      onClick={() => onRemoveMethod(method.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove payment method"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
