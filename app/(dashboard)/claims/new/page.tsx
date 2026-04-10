"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";

import { ROUTES, CLAIM_TYPES } from "@/lib/constants";
import { Button, Input, Select, Textarea, FileUpload } from "@/components/ui";

const claimSchema = z.object({
  type: z.enum(["medical", "dental", "vision", "prescription", "hospitalization"]),
  serviceDate: z.string().min(1, "Service date is required"),
  providerName: z.string().min(2, "Provider name is required"),
  providerNPI: z.string().optional(),
  diagnosis: z.string().min(3, "Diagnosis is required"),
  diagnosisCode: z.string().optional(),
  amountBilled: z.number().min(0, "Amount must be greater than 0"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type ClaimFormValues = z.infer<typeof claimSchema>;

export default function NewClaimPage() {
  const router = useRouter();
  const [, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimFormValues>({
    resolver: zodResolver(claimSchema),
  });
  
  const onSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API call
      // const formData = new FormData();
      // Object.entries(data).forEach(([key, value]) => {
      //   formData.append(key, value.toString());
      // });
      // files.forEach((file) => formData.append("attachments", file));
      
      // Mock submission
      setTimeout(() => {
        router.push(ROUTES.CLAIMS);
      }, 1000);
    } catch (error) {
      console.error("Failed to submit claim:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Claims
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Submit New Claim</h1>
          <p className="text-gray-600 mt-1">
            Fill out the form below to submit a new insurance claim
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="card space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Claim Information</h3>
            
            <Select
              label="Claim Type"
              options={CLAIM_TYPES}
              error={errors.type?.message}
              {...register("type")}
              required
            />
            
            <Input
              label="Service Date"
              type="date"
              error={errors.serviceDate?.message}
              {...register("serviceDate")}
              required
            />
            
            <Input
              label="Provider Name"
              placeholder="Enter provider or facility name"
              error={errors.providerName?.message}
              {...register("providerName")}
              required
            />
            
            <Input
              label="Provider NPI"
              placeholder="National Provider Identifier (optional)"
              error={errors.providerNPI?.message}
              {...register("providerNPI")}
            />
          </div>
          
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Medical Details</h3>
            
            <Input
              label="Diagnosis"
              placeholder="e.g., Annual Physical Exam"
              error={errors.diagnosis?.message}
              {...register("diagnosis")}
              required
            />
            
            <Input
              label="Diagnosis Code"
              placeholder="ICD-10 Code (optional)"
              error={errors.diagnosisCode?.message}
              {...register("diagnosisCode")}
            />
            
            <Input
              label="Amount Billed"
              type="number"
              step="0.01"
              placeholder="0.00"
              error={errors.amountBilled?.message}
              {...register("amountBilled", { valueAsNumber: true })}
              required
            />
            
            <Textarea
              label="Description"
              placeholder="Provide details about the service or treatment..."
              error={errors.description?.message}
              {...register("description")}
              required
              rows={4}
            />
          </div>
          
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Attachments</h3>
            <p className="text-[15px] text-gray-600">
              Upload relevant documents such as receipts, invoices, or medical reports
            </p>
            
            <FileUpload
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              maxSize={5}
              onFilesChange={setFiles}
            />
          </div>
          
          <div className="flex gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              className="flex-1"
            >
              Submit Claim
            </Button>
          </div>
        </form>
      </div>
  );
}
