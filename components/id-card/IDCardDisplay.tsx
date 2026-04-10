"use client";

import { Download, Share2, Printer, BadgeCheck, Phone, MapPin, QrCode } from "lucide-react";
import { Button } from "@/components/ui";
import type { Member } from "@/features/id-card/id-card.types";
import { COPAY_LABELS } from "@/features/id-card/id-card.constants";

interface IDCardDisplayProps {
  member: Member;
  onDownload: () => void;
  onShare: () => void;
  onPrint: () => void;
}

export function IDCardDisplay({ member, onDownload, onShare, onPrint }: IDCardDisplayProps) {
  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BadgeCheck className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">Digital ID Card</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onShare}>
            <Share2 className="w-4 h-4 mr-1.5" />
            Share
          </Button>
          <Button variant="ghost" size="sm" onClick={onPrint}>
            <Printer className="w-4 h-4 mr-1.5" />
            Print
          </Button>
          <Button variant="secondary" size="sm" onClick={onDownload}>
            <Download className="w-4 h-4 mr-1.5" />
            Download
          </Button>
        </div>
      </div>

      {/* Front of Card */}
      <div className="p-6">
        <div className="bg-gradient-to-br from-ocean-base via-ocean-mid to-ocean-dark text-white rounded-xl p-6 shadow-lg aspect-[1.586/1] max-w-[500px] mx-auto">
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold tracking-tight">MemberConnect</h3>
                <p className="text-[13px] text-ocean-glow mt-1">{member.planName}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold">{member.planType}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-ocean-glow/70">Member Name</div>
                <div className="text-[18px] font-bold mt-0.5">{member.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-ocean-glow/70">Member ID</div>
                  <div className="text-[15px] font-semibold mt-0.5">{member.id}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-ocean-glow/70">Group #</div>
                  <div className="text-[15px] font-semibold mt-0.5">{member.groupNumber}</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 pt-2 border-t border-white/10">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ocean-glow/70">{COPAY_LABELS.primaryCare}</div>
                  <div className="text-[14px] font-bold mt-0.5">{member.copays.primaryCare}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ocean-glow/70">{COPAY_LABELS.specialist}</div>
                  <div className="text-[14px] font-bold mt-0.5">{member.copays.specialist}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ocean-glow/70">{COPAY_LABELS.emergency}</div>
                  <div className="text-[14px] font-bold mt-0.5">{member.copays.emergency}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ocean-glow/70">{COPAY_LABELS.urgentCare}</div>
                  <div className="text-[14px] font-bold mt-0.5">{member.copays.urgentCare}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <CardBack member={member} />
      </div>
    </div>
  );
}

interface CardBackProps {
  member: Member;
}

function CardBack({ member }: CardBackProps) {
  return (
    <div className="mt-6 bg-gray-50 rounded-xl p-6 max-w-[500px] mx-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-[15px] font-semibold text-gray-900">Contact Information</h4>
          <QrCode className="w-12 h-12 text-gray-400" />
        </div>

        <div className="space-y-2.5 text-[13px]">
          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900">Member Services</div>
              <div className="text-gray-600">{member.phone.member}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900">Provider Services</div>
              <div className="text-gray-600">{member.phone.provider}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900">Address</div>
              <div className="text-gray-600">{member.address}</div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200 text-[11px] text-gray-500">
          <p>Present this card to your healthcare provider. For questions about benefits, claims, or coverage, call Member Services.</p>
        </div>
      </div>
    </div>
  );
}
