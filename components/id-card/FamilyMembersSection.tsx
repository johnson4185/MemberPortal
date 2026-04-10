"use client";

import { Download, User } from "lucide-react";
import { Button } from "@/components/ui";
import type { Dependent } from "@/features/id-card/id-card.types";

interface FamilyMembersSectionProps {
  dependents: Dependent[];
  onDownloadId: (memberId: string, memberName: string) => void;
}

export function FamilyMembersSection({ dependents, onDownloadId }: FamilyMembersSectionProps) {
  if (dependents.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <div className="px-5 py-3 border-b border-border">
        <h2 className="text-xl font-semibold text-gray-900">Family Member ID Cards</h2>
        <p className="text-[14px] text-gray-600">Download ID cards for covered dependents</p>
      </div>
      <div className="px-5 py-3 space-y-2">
        {dependents.map((dependent) => (
          <div key={dependent.id} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{dependent.name}</div>
                <div className="text-[13px] text-gray-600">
                  {dependent.relationship} · {dependent.id}
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDownloadId(dependent.id, dependent.name)}
            >
              <Download className="w-4 h-4 mr-1.5" />
              Download ID
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
