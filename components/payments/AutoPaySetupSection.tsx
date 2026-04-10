"use client";

import { Calendar, CreditCard, AlertCircle } from "lucide-react";
import type { PaymentMethod } from "@/features/payments/payments.types";

interface AutoPaySetupSectionProps {
  isAutoPayEnabled: boolean;
  selectedMethodId?: string;
  paymentMethods: PaymentMethod[];
  nextPaymentDate: string;
  nextPaymentAmount: number;
  onToggleAutoPay: (enabled: boolean) => void;
  onSelectMethod: (methodId: string) => void;
}

export function AutoPaySetupSection({
  isAutoPayEnabled,
  selectedMethodId,
  paymentMethods,
  nextPaymentDate,
  nextPaymentAmount,
  onToggleAutoPay,
  onSelectMethod,
}: AutoPaySetupSectionProps) {
  const selectedMethod = paymentMethods.find((m) => m.id === selectedMethodId);

  return (
    <div className="card">
      <div className="px-5 py-3 border-b border-border">
        <h2 className="text-xl font-semibold text-gray-900">Auto-Payment Setup</h2>
        <p className="text-[14px] text-gray-600 mt-0.5">
          Automatically pay your premium on the due date
        </p>
      </div>

      <div className="px-5 py-5 space-y-4">
        {/* Toggle Switch */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${isAutoPayEnabled ? "bg-green-100" : "bg-gray-200"}`}>
              <Calendar className={`w-5 h-5 ${isAutoPayEnabled ? "text-green-600" : "text-gray-500"}`} />
            </div>
            <div>
              <p className="text-[15px] font-semibold text-gray-900">
                Auto-Pay {isAutoPayEnabled ? "Enabled" : "Disabled"}
              </p>
              <p className="text-[13px] text-gray-600">
                {isAutoPayEnabled
                  ? "Your payments will be processed automatically"
                  : "Enable to never miss a payment"}
              </p>
            </div>
          </div>
          <button
            onClick={() => onToggleAutoPay(!isAutoPayEnabled)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-mid focus:ring-offset-2 ${
              isAutoPayEnabled ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                isAutoPayEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {isAutoPayEnabled && (
          <>
            {/* Payment Method Selection */}
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              {paymentMethods.length === 0 ? (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] font-medium text-yellow-800">No payment methods available</p>
                    <p className="text-[13px] text-yellow-700 mt-1">
                      Please add a payment method to enable auto-pay
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => onSelectMethod(method.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        selectedMethodId === method.id
                          ? "border-ocean-mid bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          selectedMethodId === method.id ? "bg-ocean-mid/10" : "bg-gray-100"
                        }`}
                      >
                        <CreditCard
                          className={`w-5 h-5 ${
                            selectedMethodId === method.id ? "text-ocean-mid" : "text-gray-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-[15px] font-medium text-gray-900">
                          {method.brand?.toUpperCase() || method.type.replace("_", " ")} •••• {method.last4}
                        </p>
                        {method.expiryMonth && method.expiryYear && (
                          <p className="text-[13px] text-gray-600">
                            Expires {String(method.expiryMonth).padStart(2, "0")}/{method.expiryYear}
                          </p>
                        )}
                      </div>
                      {method.isDefault && (
                        <span className="text-[12px] font-semibold text-green-600 bg-green-100 px-2.5 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      {selectedMethodId === method.id && (
                        <div className="w-5 h-5 bg-ocean-mid rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Next Payment Info */}
            {selectedMethod && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-[14px] font-medium text-blue-900 mb-2">Next Auto-Payment</p>
                <div className="space-y-1.5 text-[13px] text-blue-800">
                  <p>
                    <span className="font-medium">Amount:</span> ${nextPaymentAmount.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(nextPaymentDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    <span className="font-medium">Method:</span> {selectedMethod.brand?.toUpperCase() || selectedMethod.type.replace("_", " ")} •••• {selectedMethod.last4}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
