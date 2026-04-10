"use client";

import { MapPin, Edit2 } from "lucide-react";
import { Button } from "@/components/ui";

interface BillingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface BillingAddressSectionProps {
  address: BillingAddress;
  onEdit: () => void;
}

export function BillingAddressSection({
  address,
  onEdit,
}: BillingAddressSectionProps) {
  return (
    <div className="card">
      <div className="px-5 py-2.5 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Billing Address</h2>
          <p className="text-[14px] text-gray-600 mt-0.5">Your billing information</p>
        </div>
        <Button variant="secondary" onClick={onEdit}>
          <Edit2 className="w-4 h-4 mr-1.5" />
          Edit
        </Button>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <div className="p-2 bg-ocean-mid/10 rounded-lg">
            <MapPin className="w-5 h-5 text-ocean-mid" />
          </div>
          <div className="flex-1">
            <p className="text-[14px] text-gray-700 leading-relaxed">{address.street}</p>
            <p className="text-[14px] text-gray-700 leading-relaxed">
              {address.city}, {address.state} {address.zipCode}
            </p>
            <p className="text-[14px] text-gray-700 leading-relaxed">{address.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
