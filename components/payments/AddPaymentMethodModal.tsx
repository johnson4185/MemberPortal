"use client";

import { useState } from "react";
import { Modal, Input, Select, Button } from "@/components/ui";
import type { AddPaymentMethodPayload, PaymentMethodType } from "@/features/payments/payments.types";

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: AddPaymentMethodPayload) => Promise<void>;
}

export function AddPaymentMethodModal({
  isOpen,
  onClose,
  onAdd,
}: AddPaymentMethodModalProps) {
  const [type, setType] = useState<PaymentMethodType>("credit_card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload: AddPaymentMethodPayload = {
        type,
        ...(type === "credit_card" || type === "debit_card"
          ? {
              cardNumber,
              expiryMonth: parseInt(expiryMonth),
              expiryYear: parseInt(expiryYear),
              cvv,
            }
          : {
              accountNumber,
              routingNumber,
            }),
      };
      await onAdd(payload);
      onClose();
      // Reset form
      setCardNumber("");
      setExpiryMonth("");
      setExpiryYear("");
      setCvv("");
      setAccountNumber("");
      setRoutingNumber("");
    } catch (error) {
      console.error("Failed to add payment method:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Payment Method"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Payment Method"}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Select
          label="Payment Method Type"
          value={type}
          onChange={(e) => setType(e.target.value as PaymentMethodType)}
          options={[
            { label: "Credit Card", value: "credit_card" },
            { label: "Debit Card", value: "debit_card" },
            { label: "Bank Account", value: "bank_account" },
          ]}
        />

        {(type === "credit_card" || type === "debit_card") && (
          <>
            <Input
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, "");
                if (/^\d*$/.test(value) && value.length <= 16) {
                  setCardNumber(value);
                }
              }}
              maxLength={16}
            />

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Expiry Month"
                placeholder="MM"
                value={expiryMonth}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 2) {
                    const month = parseInt(value);
                    if (value === "" || (month >= 1 && month <= 12)) {
                      setExpiryMonth(value);
                    }
                  }
                }}
                maxLength={2}
              />
              <Input
                label="Expiry Year"
                placeholder="YYYY"
                value={expiryYear}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 4) {
                    setExpiryYear(value);
                  }
                }}
                maxLength={4}
              />
              <Input
                label="CVV"
                placeholder="123"
                type="password"
                value={cvv}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 4) {
                    setCvv(value);
                  }
                }}
                maxLength={4}
              />
            </div>
          </>
        )}

        {type === "bank_account" && (
          <>
            <Input
              label="Account Number"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <Input
              label="Routing Number"
              placeholder="Enter routing number"
              value={routingNumber}
              onChange={(e) => setRoutingNumber(e.target.value)}
            />
          </>
        )}

        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-[14px] text-gray-700">
            🔒 Your payment information is encrypted and secure. We use industry-standard security
            measures to protect your data.
          </p>
        </div>
      </div>
    </Modal>
  );
}
