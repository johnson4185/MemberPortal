"use client";

import { CreditCard, Plus, Trash2, Check } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import type { PaymentMethod } from "@/features/payments/payments.types";

interface PaymentMethodsSectionProps {
  paymentMethods: PaymentMethod[];
  onAddMethod: () => void;
  onRemoveMethod: (methodId: string) => void;
  onSetDefault: (methodId: string) => void;
}

export function PaymentMethodsSection({
  paymentMethods,
  onAddMethod,
  onRemoveMethod,
  onSetDefault,
}: PaymentMethodsSectionProps) {
  return (
    <div className="card">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
          <p className="text-[14px] text-gray-600 mt-0.5">Manage your saved payment methods</p>
        </div>
        <Button variant="secondary" onClick={onAddMethod}>
          <Plus className="w-4 h-4 mr-1.5" />
          Add Method
        </Button>
      </div>

      <div className="px-5 py-5">
        {paymentMethods.length === 0 ? (
          <div className="text-center py-6">
            <CreditCard className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-[14px] text-gray-600 mb-3">No payment methods saved</p>
            <Button variant="secondary" onClick={onAddMethod}>
              <Plus className="w-4 h-4 mr-1.5" />
              Add Your First Payment Method
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[15px] font-medium text-gray-900">
                        {method.brand?.toUpperCase() || method.type.replace("_", " ")} •••• {method.last4}
                      </p>
                      {method.isDefault && (
                        <Badge variant="status" status="completed" className="text-[11px] px-2 py-0.5">
                          <Check className="w-3 h-3 mr-1" />
                          Default
                        </Badge>
                      )}
                    </div>
                    {method.expiryMonth && method.expiryYear && (
                      <p className="text-[13px] text-gray-600 mt-0.5">
                        Expires {String(method.expiryMonth).padStart(2, "0")}/{method.expiryYear}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!method.isDefault && (
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
        )}
      </div>
    </div>
  );
}
