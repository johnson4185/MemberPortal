"use client";

import { useState, useEffect } from "react";
import { MembersCarousel, DocumentsSection, MedicalHistorySection, AuthorizationLettersSection, CustomLettersRequestSection, DocumentPreviewModal } from "@/components/id-card";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerAnimation";
import idCardApi from "@/features/id-card/id-card.api";
import type { Member, Document, MedicalDocument, AuthorizationLetter, CustomLetterType } from "@/features/id-card/id-card.types";

export default function IDCardPage() {
  const [member, setMember] = useState<Member | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [medicalDocuments, setMedicalDocuments] = useState<MedicalDocument[]>([]);
  const [authorizations, setAuthorizations] = useState<AuthorizationLetter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    documentId: string;
    documentName: string;
    documentType: string;
    documentDate: string;
    documentCategory: "medical" | "authorization" | "policy";
    currentIndex: number;
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [memberData, documentsData, medicalDocsData, authorizationsData] = await Promise.all([
          idCardApi.getMember(),
          idCardApi.getDocuments(),
          idCardApi.getMedicalDocuments(),
          idCardApi.getAuthorizationLetters(),
        ]);
        setMember(memberData);
        setDocuments(documentsData);
        setMedicalDocuments(medicalDocsData);
        setAuthorizations(authorizationsData);
      } catch (error) {
        console.error("Failed to load ID card data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDownloadId = async (memberId: string, memberName: string) => {
    try {
      const blob = await idCardApi.downloadMemberIdCard(memberId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${memberName}_ID_Card.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download ID card:", error);
    }
  };

  const handleDownloadDocument = async (docId: string, docName: string) => {
    try {
      const blob = await idCardApi.downloadDocument(docId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${docName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download document:", error);
    }
  };

  const handleShareId = async () => {
    if (!member) return;
    try {
      const result = await idCardApi.shareMemberId(member.id);
      // Copy URL to clipboard
      navigator.clipboard.writeText(result.shareUrl);
      alert("Share link copied to clipboard!");
    } catch (error) {
      console.error("Failed to share ID card:", error);
    }
  };

  const handlePrintId = async () => {
    if (!member) return;
    try {
      await idCardApi.printMemberId(member.id);
    } catch (error) {
      console.error("Failed to print ID card:", error);
    }
  };

  const handleAddToAppleWallet = async (memberId: string) => {
    try {
      await idCardApi.addToAppleWallet(memberId);
    } catch (error) {
      console.error("Failed to add to Apple Wallet:", error);
    }
  };

  const handleAddToGoogleWallet = async (memberId: string) => {
    try {
      await idCardApi.addToGoogleWallet(memberId);
    } catch (error) {
      console.error("Failed to add to Google Wallet:", error);
    }
  };

  const handleDownloadMedicalDocument = async (docId: string, docName: string) => {
    try {
      const blob = await idCardApi.downloadMedicalDocument(docId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${docName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download medical document:", error);
    }
  };

  const handleDownloadAuthorization = async (authId: string, authNumber: string) => {
    try {
      const blob = await idCardApi.downloadAuthorizationLetter(authId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Authorization_${authNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download authorization letter:", error);
    }
  };

  const handleRequestCustomLetter = async (type: CustomLetterType) => {
    try {
      const result = await idCardApi.requestCustomLetter({ type });
      alert(result.message);
    } catch (error) {
      console.error("Failed to request custom letter:", error);
      alert("Failed to submit your request. Please try again.");
    }
  };

  const handleViewMedicalDocument = (documentId: string) => {
    const doc = medicalDocuments.find((d) => d.id === documentId);
    if (doc) {
      setPreviewModal({
        isOpen: true,
        documentId: doc.id,
        documentName: doc.name,
        documentType: doc.type,
        documentDate: doc.date,
        documentCategory: "medical",
        currentIndex: medicalDocuments.findIndex((d) => d.id === documentId),
      });
    }
  };

  const handleViewPolicyDocument = (documentId: string) => {
    const doc = documents.find((d) => d.id === documentId);
    if (doc) {
      setPreviewModal({
        isOpen: true,
        documentId: doc.id,
        documentName: doc.name,
        documentType: doc.category,
        documentDate: doc.uploadedAt,
        documentCategory: "policy",
        currentIndex: documents.findIndex((d) => d.id === documentId),
      });
    }
  };

  const handleViewAuthorization = (authorizationId: string) => {
    const auth = authorizations.find((a) => a.id === authorizationId);
    if (auth) {
      setPreviewModal({
        isOpen: true,
        documentId: auth.id,
        documentName: auth.serviceType,
        documentType: "Authorization",
        documentDate: auth.effectiveDate,
        documentCategory: "authorization",
        currentIndex: authorizations.findIndex((a) => a.id === authorizationId),
      });
    }
  };

  const handleClosePreview = () => {
    setPreviewModal(null);
  };

  const handlePreviewDownload = async () => {
    if (!previewModal) return;
    
    if (previewModal.documentCategory === "medical") {
      await handleDownloadMedicalDocument(previewModal.documentId, previewModal.documentName);
    } else if (previewModal.documentCategory === "policy") {
      await handleDownloadDocument(previewModal.documentId, previewModal.documentName);
    } else if (previewModal.documentCategory === "authorization") {
      await handleDownloadAuthorization(previewModal.documentId, previewModal.documentName);
    }
  };

  const handlePreviewNext = () => {
    if (!previewModal) return;
    
    if (previewModal.documentCategory === "medical") {
      const nextIndex = previewModal.currentIndex + 1;
      if (nextIndex < medicalDocuments.length) {
        const nextDoc = medicalDocuments[nextIndex];
        setPreviewModal({
          isOpen: true,
          documentId: nextDoc.id,
          documentName: nextDoc.name,
          documentType: nextDoc.type,
          documentDate: nextDoc.date,
          documentCategory: "medical",
          currentIndex: nextIndex,
        });
      }
    } else if (previewModal.documentCategory === "policy") {
      const nextIndex = previewModal.currentIndex + 1;
      if (nextIndex < documents.length) {
        const nextDoc = documents[nextIndex];
        setPreviewModal({
          isOpen: true,
          documentId: nextDoc.id,
          documentName: nextDoc.name,
          documentType: nextDoc.category,
          documentDate: nextDoc.uploadedAt,
          documentCategory: "policy",
          currentIndex: nextIndex,
        });
      }
    } else if (previewModal.documentCategory === "authorization") {
      const nextIndex = previewModal.currentIndex + 1;
      if (nextIndex < authorizations.length) {
        const nextAuth = authorizations[nextIndex];
        setPreviewModal({
          isOpen: true,
          documentId: nextAuth.id,
          documentName: nextAuth.serviceType,
          documentType: "Authorization",
          documentDate: nextAuth.effectiveDate,
          documentCategory: "authorization",
          currentIndex: nextIndex,
        });
      }
    }
  };

  const handlePreviewPrevious = () => {
    if (!previewModal) return;
    
    if (previewModal.documentCategory === "medical") {
      const prevIndex = previewModal.currentIndex - 1;
      if (prevIndex >= 0) {
        const prevDoc = medicalDocuments[prevIndex];
        setPreviewModal({
          isOpen: true,
          documentId: prevDoc.id,
          documentName: prevDoc.name,
          documentType: prevDoc.type,
          documentDate: prevDoc.date,
          documentCategory: "medical",
          currentIndex: prevIndex,
        });
      }
    } else if (previewModal.documentCategory === "policy") {
      const prevIndex = previewModal.currentIndex - 1;
      if (prevIndex >= 0) {
        const prevDoc = documents[prevIndex];
        setPreviewModal({
          isOpen: true,
          documentId: prevDoc.id,
          documentName: prevDoc.name,
          documentType: prevDoc.category,
          documentDate: prevDoc.uploadedAt,
          documentCategory: "policy",
          currentIndex: prevIndex,
        });
      }
    } else if (previewModal.documentCategory === "authorization") {
      const prevIndex = previewModal.currentIndex - 1;
      if (prevIndex >= 0) {
        const prevAuth = authorizations[prevIndex];
        setPreviewModal({
          isOpen: true,
          documentId: prevAuth.id,
          documentName: prevAuth.serviceType,
          documentType: "Authorization",
          documentDate: prevAuth.effectiveDate,
          documentCategory: "authorization",
          currentIndex: prevIndex,
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ID Card & Documents</h1>
          <p className="text-[16px] text-gray-600 mt-1">
            View and download your insurance ID card, policy documents, and medical records
          </p>
        </div>
        <div className="card text-center py-12">
          <p className="text-[15px] text-gray-600">Loading your documents...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ID Card & Documents</h1>
          <p className="text-[16px] text-gray-600 mt-1">
            View and download your insurance ID card, policy documents, and medical records
          </p>
        </div>
        <div className="card text-center py-12">
          <p className="text-[15px] text-gray-600">Failed to load member data. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ID Card & Documents</h1>
        <p className="text-[16px] text-gray-600 mt-1">
          View and download your insurance ID card, policy documents, and medical records
        </p>
      </div>

      <StaggerContainer className="space-y-5">
          {/* Members Carousel - All members in one carousel */}
          <StaggerItem>
            <MembersCarousel
              primaryMember={member}
              onDownload={handleDownloadId}
              onShare={handleShareId}
              onPrint={handlePrintId}
              onAddToAppleWallet={handleAddToAppleWallet}
              onAddToGoogleWallet={handleAddToGoogleWallet}
            />
          </StaggerItem>

          {/* Documents */}
          <StaggerItem>
            <DocumentsSection
              documents={documents}
              onViewDocument={handleViewPolicyDocument}
              onDownloadDocument={handleDownloadDocument}
            />
          </StaggerItem>

          {/* Medical History & Documents */}
          <StaggerItem>
            <MedicalHistorySection
              documents={medicalDocuments}
              onViewDocument={handleViewMedicalDocument}
              onDownloadDocument={handleDownloadMedicalDocument}
            />
          </StaggerItem>

          {/* Authorization Letters */}
          <StaggerItem>
            <AuthorizationLettersSection
              authorizations={authorizations}
              onViewAuthorization={handleViewAuthorization}
              onDownloadAuthorization={handleDownloadAuthorization}
            />
          </StaggerItem>

          {/* Request Custom Letters */}
          <StaggerItem>
            <CustomLettersRequestSection
              onRequestLetter={handleRequestCustomLetter}
            />
          </StaggerItem>
      </StaggerContainer>

      {/* Document Preview Modal */}
      {previewModal && (
        <DocumentPreviewModal
          isOpen={previewModal.isOpen}
          onClose={handleClosePreview}
          documentName={previewModal.documentName}
          documentType={previewModal.documentType}
          documentDate={new Date(previewModal.documentDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          onDownload={handlePreviewDownload}
          onNext={handlePreviewNext}
          onPrevious={handlePreviewPrevious}
          currentIndex={previewModal.currentIndex}
          totalDocuments={
            previewModal.documentCategory === "medical" ? medicalDocuments.length :
            previewModal.documentCategory === "policy" ? documents.length :
            previewModal.documentCategory === "authorization" ? authorizations.length :
            undefined
          }
        />
      )}
    </div>
  );
}

