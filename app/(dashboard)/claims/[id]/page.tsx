"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { ArrowLeft, Download, FileText, DollarSign, AlertTriangle, MessageCircle, UploadCloud, Send, Clock } from "lucide-react";
import { Claim, ClaimType } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ROUTES, CLAIM_TYPES } from "@/lib/constants";
import { Button, Badge, Input, Select, Textarea, FileUpload } from "@/components/ui";
import ClaimTimeline from "@/components/shared/ClaimTimeline";
import Modal from "@/components/shared/Modal";
import { claimsApi } from "@/features/claims/claims.api";

type CaseMessage = {
  id: string;
  author: string;
  message: string;
  date: string;
};

type ClaimCase = {
  caseNumber: string;
  reviewer: string;
  reason: string;
  lastUpdated: string;
  messages: CaseMessage[];
};

export default function ClaimDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ id: string }>();
  
  // State for fetched data
  const [claim, setClaim] = useState<Claim | null>(null);
  const [claimCase, setClaimCase] = useState<ClaimCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [caseMessages, setCaseMessages] = useState<CaseMessage[]>([]);
  const [messageText, setMessageText] = useState("");
  const [previewDocument, setPreviewDocument] = useState<Claim["attachments"][number] | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [formData, setFormData] = useState<{
    type: ClaimType;
    serviceDate: string;
    providerName: string;
    providerNPI: string;
    diagnosis: string;
    diagnosisCode: string;
    amountBilled: string;
    description: string;
  }>({
    type: "medical",
    serviceDate: "",
    providerName: "",
    providerNPI: "",
    diagnosis: "",
    diagnosisCode: "",
    amountBilled: "",
    description: "",
  });
  const [, setNewFiles] = useState<File[]>([]);

  // Fetch claim data on mount
  useEffect(() => {
    const fetchClaimData = async () => {
      try {
        setLoading(true);
        const claimData = await claimsApi.getById(params.id);
        setClaim(claimData);
        
        // Check localStorage for existing case
        const existingCases = JSON.parse(localStorage.getItem("claimCases") || "[]");
        const existingCase = existingCases.find((c: any) => c.claimId === params.id);
        
        if (existingCase) {
          // Load case from localStorage
          setClaimCase({
            caseNumber: existingCase.caseNumber,
            reviewer: "Support Team",
            reason: "",
            lastUpdated: existingCase.updatedAt,
            messages: [],
          });
          setCaseMessages(existingCase.messages.map((msg: any) => ({
            id: msg.id,
            author: msg.author,
            message: msg.message,
            date: msg.createdAt,
          })));
        } else {
          // Try to fetch from API
          try {
            const caseData = await claimsApi.getCaseByClaimId(params.id);
            setClaimCase(caseData);
            setCaseMessages(caseData?.messages ?? []);
          } catch (error) {
            // No case found, that's okay
            setClaimCase(null);
            setCaseMessages([]);
          }
        }
        
        // Set form data
        setFormData({
          type: claimData.type,
          serviceDate: claimData.serviceDate,
          providerName: claimData.providerName,
          providerNPI: claimData.providerNPI || "",
          diagnosis: claimData.diagnosis,
          diagnosisCode: claimData.diagnosisCode || "",
          amountBilled: claimData.amountBilled.toString(),
          description: claimData.description,
        });

        // Check if should start in edit mode
        setIsEditing(claimData.status === "submitted" && searchParams.get("edit") === "1");
      } catch (error) {
        console.error("Failed to fetch claim:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClaimData();
  }, [params.id, searchParams]);

  if (loading || !claim) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-600">Loading claim details...</div>
        </div>
      </div>
    );
  }

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const openPreview = (attachment: Claim["attachments"][number]) => {
    setPreviewDocument(attachment);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewDocument(null);
  };

  const handleWithdrawConfirm = async () => {
    if (!claim) return;
    try {
      const updated = await claimsApi.withdraw(claim.id);
      setClaim(updated);
    } catch (error) {
      console.error("Failed to withdraw claim:", error);
    } finally {
      setShowWithdrawConfirm(false);
    }
  };

  const fallbackDocuments: Claim["attachments"][number][] = [
    {
      id: "sample-claim-summary",
      fileName: "claim-summary.txt",
      fileUrl:
        "data:text/plain;charset=utf-8,Claim%20Summary%0A%0AProvider%3A%20Sample%20Provider%20Group%0AService%20Date%3A%202026-02-15%0AClaim%20Amount%3A%20%241%2C500.00%0AStatus%3A%20Submitted%0A%0AFor%20demo%20purposes%20only.",
      fileType: "text/plain",
      fileSize: 1240,
      uploadedAt: claim.submittedDate,
    },
    {
      id: "sample-provider-bill",
      fileName: "provider-bill.txt",
      fileUrl:
        "data:text/plain;charset=utf-8,Provider%20Bill%0A%0AItemized%20services%3A%0A-%20Consultation%3A%20%24200.00%0A-%20Procedure%3A%20%241%2C200.00%0A-%20Supplies%3A%20%24100.00%0A%0ATotal%3A%20%241%2C500.00%0A%0AFor%20demo%20purposes%20only.",
      fileType: "text/plain",
      fileSize: 980,
      uploadedAt: claim.submittedDate,
    },
    {
      id: "sample-document",
      fileName: "treatment-photo.svg",
      fileUrl:
        "data:image/svg+xml,%3Csvg%20width%3D%22900%22%20height%3D%221200%22%20viewBox%3D%220%200%20900%201200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22900%22%20height%3D%221200%22%20fill%3D%22%23ffffff%22/%3E%3Crect%20x%3D%2240%22%20y%3D%2240%22%20width%3D%22820%22%20height%3D%221120%22%20rx%3D%2224%22%20fill%3D%22%23f3f4f6%22/%3E%3Crect%20x%3D%2280%22%20y%3D%22120%22%20width%3D%22740%22%20height%3D%2280%22%20rx%3D%2212%22%20fill%3D%22%23e5e7eb%22/%3E%3Crect%20x%3D%2280%22%20y%3D%22240%22%20width%3D%22520%22%20height%3D%2224%22%20rx%3D%228%22%20fill%3D%22%23d1d5db%22/%3E%3Crect%20x%3D%2280%22%20y%3D%22300%22%20width%3D%22600%22%20height%3D%2224%22%20rx%3D%228%22%20fill%3D%22%23d1d5db%22/%3E%3Crect%20x%3D%2280%22%20y%3D%22360%22%20width%3D%22460%22%20height%3D%2224%22%20rx%3D%228%22%20fill%3D%22%23d1d5db%22/%3E%3Crect%20x%3D%2280%22%20y%3D%22460%22%20width%3D%22700%22%20height%3D%2224%22%20rx%3D%228%22%20fill%3D%22%23d1d5db%22/%3E%3Crect%20x%3D%2280%22%20y%3D%22520%22%20width%3D%22640%22%20height%3D%2224%22%20rx%3D%228%22%20fill%3D%22%23d1d5db%22/%3E%3Crect%20x%3D%2280%22%20y%3D%22580%22%20width%3D%22520%22%20height%3D%2224%22%20rx%3D%228%22%20fill%3D%22%23d1d5db%22/%3E%3Ctext%20x%3D%2280%22%20y%3D%22200%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2228%22%20fill%3D%22%23111827%22%3ESample%20Document%20Preview%3C/text%3E%3Ctext%20x%3D%2280%22%20y%3D%22680%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2218%22%20fill%3D%22%236b7280%22%3EFor%20demo%20purposes%20only%3C/text%3E%3C/svg%3E",
      fileType: "image/svg+xml",
      fileSize: 5600,
      uploadedAt: claim.submittedDate,
    },
  ];

  const documents = claim.attachments.length > 0 ? claim.attachments : fallbackDocuments;
  
  return (
    <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <button
            onClick={() => router.push(ROUTES.CLAIMS)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Claims
          </button>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[12px] uppercase tracking-widest text-text-soft">Claim</p>
          <Modal
            isOpen={isPreviewOpen}
            onClose={closePreview}
            title={previewDocument?.fileName ?? "Document Preview"}
            size="xl"
          >
            {previewDocument ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-[14px] text-gray-600">
                    {formatFileSize(previewDocument.fileSize)} • {formatDate(previewDocument.uploadedAt, "short")}
                  </div>
                  <a
                    href={previewDocument.fileUrl}
                    download
                    className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-1.5 text-[14px] font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </a>
                </div>

                {previewDocument.fileUrl === "#" ? (
                  <div className="h-[60vh] rounded-lg border border-border flex items-center justify-center text-gray-500">
                    Preview not available for this file.
                  </div>
                ) : previewDocument.fileType.startsWith("image/") ? (
                  <img
                    src={previewDocument.fileUrl}
                    alt={previewDocument.fileName}
                    className="max-h-[60vh] w-full object-contain rounded-lg border border-border"
                  />
                ) : previewDocument.fileType === "application/pdf" || previewDocument.fileType.startsWith("text/") ? (
                  <iframe
                    src={previewDocument.fileUrl}
                    title={previewDocument.fileName}
                    className="w-full h-[60vh] rounded-lg border border-border"
                  />
                ) : (
                  <div className="h-[60vh] rounded-lg border border-border flex items-center justify-center text-gray-500">
                    Preview not available for this file type.
                  </div>
                )}
              </div>
            ) : null}
          </Modal>
          <Modal
            isOpen={showWithdrawConfirm}
            onClose={() => setShowWithdrawConfirm(false)}
            title="Withdraw Claim"
            size="sm"
          >
            <div className="space-y-4">
              <p className="text-[15px] text-gray-600">
                Are you sure you want to withdraw this claim? This action will update the status to withdrawn.
              </p>
              <div className="flex items-center justify-end gap-2">
                <Button variant="secondary" size="sm" onClick={() => setShowWithdrawConfirm(false)}>
                  Cancel
                </Button>
                <Button variant="danger" size="sm" onClick={handleWithdrawConfirm}>
                  Yes, Withdraw
                </Button>
              </div>
            </div>
          </Modal>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold text-gray-900">{claim.claimNumber}</h1>
                <Badge variant="status" status={claim.status}>
                  {claim.status.replace("_", " ")}
                </Badge>
              </div>
              <p className="text-gray-600 mt-1">
                {claimCase ? `Case #${claimCase.caseNumber} · ` : ""}Submitted on {formatDate(claim.submittedDate, "long")}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => console.log("Download EOB")}
              >
                <Download className="w-4 h-4" />
                Download EOB
              </Button>
              {claim.status !== "paid" && claim.status !== "approved" && claim.status !== "withdrawn" && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setShowWithdrawConfirm(true)}
                >
                  Withdraw Claim
                </Button>
              )}
            </div>
          </div>

        </div>

        {claim.status === "rejected" && claimCase && (
          <div className="card border border-danger/30 bg-danger-light/30">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-danger font-semibold">
                  <AlertTriangle className="w-4 h-4" />
                  Rejected reason
                </div>
                <p className="text-[15px] text-text-mid mt-2">{claimCase.reason}</p>
                <p className="text-[13px] text-text-soft mt-2">Reviewer: {claimCase.reviewer}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card py-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-10 h-10 text-primary" />
              <div>
                <p className="text-[15px] text-gray-600">Amount Billed</p>
                <p className="text-2xl font-bold text-gray-900 font-outfit">
                  {formatCurrency(claim.amountBilled)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card py-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-10 h-10 text-success" />
              <div>
                <p className="text-[15px] text-gray-600">Amount Covered</p>
                <p className="text-2xl font-bold text-gray-900 font-outfit">
                  {formatCurrency(claim.amountCovered)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card py-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-10 h-10 text-warning" />
              <div>
                <p className="text-[15px] text-gray-600">Your Responsibility</p>
                <p className="text-2xl font-bold text-gray-900 font-outfit">
                  {formatCurrency(claim.patientResponsibility)}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Claim Details */}
          <div className="card space-y-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Claim Details</h2>
              {(claim.status === "submitted" || claim.status === "withdrawn") && !isEditing && (
                <Button variant="secondary" onClick={() => setIsEditing(true)}>
                  Edit Claim
                </Button>
              )}
            </div>

            {(claim.status === "submitted" || claim.status === "withdrawn") && isEditing ? (
              <div className="space-y-5">
                <Select
                  label="Claim Type"
                  options={CLAIM_TYPES}
                  value={formData.type}
                  onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as ClaimType }))}
                />
                <Input
                  label="Service Date"
                  type="date"
                  value={formData.serviceDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, serviceDate: e.target.value }))}
                />
                <Input
                  label="Provider Name"
                  value={formData.providerName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, providerName: e.target.value }))}
                />
                <Input
                  label="Provider NPI"
                  value={formData.providerNPI}
                  onChange={(e) => setFormData((prev) => ({ ...prev, providerNPI: e.target.value }))}
                />
                <Input
                  label="Diagnosis"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData((prev) => ({ ...prev, diagnosis: e.target.value }))}
                />
                <Input
                  label="Diagnosis Code"
                  value={formData.diagnosisCode}
                  onChange={(e) => setFormData((prev) => ({ ...prev, diagnosisCode: e.target.value }))}
                />
                <Input
                  label="Amount Billed"
                  type="number"
                  value={formData.amountBilled}
                  onChange={(e) => setFormData((prev) => ({ ...prev, amountBilled: e.target.value }))}
                />
                <Textarea
                  label="Description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                />

                <div className="border-t pt-5 space-y-3">
                  <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <UploadCloud className="w-4 h-4" />
                    Add missing documents
                  </div>
                  <FileUpload
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    maxSize={5}
                    onFilesChange={setNewFiles}
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    onClick={async () => {
                      if (!claim) return;
                      try {
                        const updated = await claimsApi.resubmit(claim.id);
                        setClaim(updated);
                        setIsEditing(false);
                      } catch (error) {
                        console.error("Failed to resubmit claim:", error);
                      }
                    }}
                  >
                    Resubmit Claim
                  </Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Save Draft
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-[15px] font-medium text-gray-600">Claim Type</p>
                  <p className="text-gray-900 capitalize mt-1">{claim.type}</p>
                </div>

                <div>
                  <p className="text-[15px] font-medium text-gray-600">Service Date</p>
                  <p className="text-gray-900 mt-1">{formatDate(claim.serviceDate, "long")}</p>
                </div>

                <div>
                  <p className="text-[15px] font-medium text-gray-600">Provider</p>
                  <p className="text-gray-900 mt-1">{claim.providerName}</p>
                </div>

                <div>
                  <p className="text-[15px] font-medium text-gray-600">Provider NPI</p>
                  <p className="text-gray-900 mt-1">{claim.providerNPI || "N/A"}</p>
                </div>

                <div>
                  <p className="text-[15px] font-medium text-gray-600">Diagnosis</p>
                  <p className="text-gray-900 mt-1">{claim.diagnosis}</p>
                </div>

                <div>
                  <p className="text-[15px] font-medium text-gray-600">Diagnosis Code</p>
                  <p className="text-gray-900 mt-1">{claim.diagnosisCode || "N/A"}</p>
                </div>

                <div>
                  <p className="text-[15px] font-medium text-gray-600">Amount Billed</p>
                  <p className="text-gray-900 mt-1">{formatCurrency(claim.amountBilled)}</p>
                </div>
              </div>
            )}

            {!isEditing && (
              <div>
                <p className="text-[15px] font-medium text-gray-600">Description</p>
                <p className="text-gray-900 mt-1">{claim.description}</p>
              </div>
            )}
          </div>

          <div className="space-y-4 lg:sticky lg:top-24 self-start">
            {/* Amount Breakdown */}
            <div className="card space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Amount Breakdown</h2>
              <div className="space-y-3 text-[14px]">
                <div className="flex items-center justify-between">
                  <span className="text-text-soft">Amount Billed</span>
                  <span className="font-semibold text-text-primary">{formatCurrency(claim.amountBilled)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-soft">Provider Discount</span>
                  <span className="font-semibold text-text-primary">-{formatCurrency(Math.round(claim.amountBilled * 0.1 * 100) / 100)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-soft">Deductible Applied</span>
                  <span className="font-semibold text-text-primary">-{formatCurrency(Math.min(150, claim.patientResponsibility))}</span>
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-text-soft">Amount Approved</span>
                  <span className="font-semibold text-success">{formatCurrency(claim.amountCovered)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-soft">Your Responsibility</span>
                  <span className="font-semibold text-warning">{formatCurrency(claim.patientResponsibility)}</span>
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-text-soft">Paid to Date</span>
                  <span className="font-semibold text-text-primary">{formatCurrency(claim.amountPaid)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-soft">Remaining Balance</span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(
                      Math.max(
                        claim.amountBilled - claim.amountCovered - claim.amountPaid,
                        0
                      )
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Submitted Documents */}
            <div className="card space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Submitted Documents</h2>
              {documents.length > 0 ? (
                <div className="space-y-3">
                  {documents.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between px-3 py-1.5 bg-gray-50 rounded-lg"
                    >
                      <button
                        type="button"
                        onClick={() => openPreview(attachment)}
                        className="flex items-center gap-2 text-left min-w-0"
                      >
                        <FileText className="w-4 h-4 text-gray-400" />
                        <p className="font-medium text-gray-900 text-[13px] hover:text-primary truncate">
                          {attachment.fileName}
                        </p>
                      </button>
                      <span className="text-[11px] text-gray-500 flex-shrink-0">
                        {formatFileSize(attachment.fileSize)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[14px] text-text-soft">No documents submitted yet.</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="card space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Claim Timeline</h2>
          <div className="relative">
            <ClaimTimeline claim={claim} isModal={false} />
          </div>
        </div>
        
        {/* Communication Section */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-ocean-base" />
              <h2 className="text-xl font-semibold text-gray-900">
                {claimCase || caseMessages.length > 0 ? "Case Communication" : "Communication"}
              </h2>
              {(claimCase || caseMessages.length > 0) && (
                <span className="text-[12px] font-medium text-ocean-base ml-2">
                  {claimCase?.caseNumber || `Case #${claim.id}-${Date.now()}`}
                </span>
              )}
            </div>
            <span className="text-[12px] text-text-soft">Last update {formatDate(claim.updatedAt, "long")}</span>
          </div>

          {/* Only show communication for non-paid claims */}
          {claim.status !== "paid" ? (
            <>
              {/* Messages */}
              {caseMessages.length > 0 && (
                <div className="space-y-3 mb-4">
                  {caseMessages.map((message) => (
                    <div key={message.id} className="rounded-lg border border-border/70 bg-gray-50 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-semibold text-text-primary">{message.author}</span>
                        <span className="text-[12px] text-text-soft">{formatDate(message.date, "long")}</span>
                      </div>
                      <p className="text-[14px] text-text-mid">{message.message}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Message Input */}
              <div className="rounded-lg border border-border/70 bg-gray-50 p-4 space-y-3">
                <Textarea
                  label="Send a message"
                  rows={3}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Ask a question or provide additional information..."
                />
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (!messageText.trim() || !claim) return;
                      
                      const newMessage = {
                        id: `msg-${Date.now()}`,
                        author: "You",
                        message: messageText.trim(),
                        date: new Date().toISOString(),
                      };
                      
                      // Check if case exists in localStorage
                      const existingCases = JSON.parse(localStorage.getItem("claimCases") || "[]");
                      const existingCaseIndex = existingCases.findIndex((c: any) => c.claimId === claim.id);
                      
                      if (existingCaseIndex >= 0) {
                        // Update existing case
                        existingCases[existingCaseIndex].messages.push({
                          id: newMessage.id,
                          author: newMessage.author,
                          isStaff: false,
                          message: newMessage.message,
                          createdAt: newMessage.date,
                        });
                        existingCases[existingCaseIndex].updatedAt = new Date().toISOString();
                      } else {
                        // Create new case
                        const newCase = {
                          id: `case-${Date.now()}`,
                          caseNumber: `CS-${String(Math.floor(Math.random() * 90000) + 10000)}`,
                          claimId: claim.id,
                          claimNumber: claim.claimNumber,
                          subject: `Question about ${claim.type} claim`,
                          priority: "medium" as const,
                          status: "open" as const,
                          createdAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString(),
                          messages: [
                            {
                              id: newMessage.id,
                              author: newMessage.author,
                              isStaff: false,
                              message: newMessage.message,
                              createdAt: newMessage.date,
                            }
                          ],
                        };
                        existingCases.unshift(newCase);
                        
                        // Set local case data
                        setClaimCase({
                          caseNumber: newCase.caseNumber,
                          reviewer: "Support Team",
                          reason: "",
                          lastUpdated: new Date().toISOString(),
                          messages: [],
                        });
                      }
                      
                      // Save to localStorage
                      localStorage.setItem("claimCases", JSON.stringify(existingCases));
                      
                      // Update local messages
                      setCaseMessages((prev) => [...prev, newMessage]);
                      setMessageText("");
                    }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="secondary">
                    <Clock className="w-4 h-4 mr-2" />
                    Request Callback
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4">
              <p className="text-[14px] text-green-700">
                ✓ This claim has been paid. You can view the full timeline above. Thank you for using our service!
              </p>
            </div>
          )}
        </div>
      </div>
  );
}
