"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, ChevronDown, ChevronUp, MessageCircle, Filter, Send, RotateCcw, ExternalLink, X, Upload, Download, FileText } from "lucide-react";
import { SupportTicket, FAQ, TicketMessage } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Button, Badge, Modal, Input, Select, Textarea } from "@/components/ui";
import DataTable from "@/components/tables/DataTable";
import type { Column } from "@/components/tables/DataTable";
import Link from "next/link";

type CaseMessage = {
  id: string;
  author: string;
  isStaff: boolean;
  message: string;
  createdAt: string;
};

type ClaimCase = {
  id: string;
  caseNumber: string;
  claimId: string;
  claimNumber: string;
  subject: string;
  status: "open" | "in_progress" | "waiting" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  lastMessage: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  messages?: CaseMessage[];
};

// Mock data
const mockFAQs: FAQ[] = [
  {
    id: "1",
    question: "How do I submit a claim?",
    answer: "You can submit a claim through the Claims page by clicking 'Submit New Claim' and filling out the required information. Make sure to attach all relevant documents like receipts and medical reports.",
    category: "claims",
    views: 1250,
  },
  {
    id: "2",
    question: "What is my deductible and how does it work?",
    answer: "Your deductible is the amount you pay out-of-pocket before your insurance starts covering expenses. You can view your deductible amount and usage on the Policy page.",
    category: "policy",
    views: 980,
  },
  {
    id: "3",
    question: "How do I find an in-network provider?",
    answer: "Use the Provider Search feature to find in-network doctors and facilities. You can filter by specialty, location, and other criteria to find the right provider for your needs.",
    category: "providers",
    views: 1100,
  },
  {
    id: "4",
    question: "When is my premium payment due?",
    answer: "Your premium payment is due on the first of each month. You can view upcoming payments and make payments through the Payments page.",
    category: "billing",
    views: 850,
  },
];

const mockTickets: SupportTicket[] = [
  {
    id: "1",
    ticketNumber: "TKT-2026-001",
    subject: "Question about claim status",
    category: "claims",
    priority: "medium",
    status: "open",
    description: "I need help understanding my claim status. I submitted a claim last week and haven't received any updates.",
    messages: [
      {
        id: "msg-1",
        ticketId: "1",
        message: "I submitted a claim last week (CLM-2026-001) and I can't see the status. Can you help me understand what's happening? I'm concerned about the delay.",
        isStaff: false,
        senderName: "You",
        createdAt: "2026-02-14T10:00:00Z",
      },
      {
        id: "msg-2",
        ticketId: "1",
        message: "Thank you for contacting us. I've reviewed your claim CLM-2026-001 and it's currently under review by our claims processing team. You should receive an update within 3-5 business days. I'll keep monitoring this for you.",
        isStaff: true,
        senderName: "John Smith",
        createdAt: "2026-02-14T14:30:00Z",
      },
    ],
    createdAt: "2026-02-14",
    updatedAt: "2026-02-14",
  },
  {
    id: "2",
    ticketNumber: "TKT-2026-002",
    subject: "Billing - Duplicate charge on premium",
    category: "billing",
    priority: "high",
    status: "in_progress",
    description: "I was charged twice for my premium payment this month. Need urgent assistance.",
    messages: [
      {
        id: "msg-1",
        ticketId: "2",
        message: "I was charged twice for my premium payment this month. Can you please look into this? The amounts are $250 each, charged on Feb 15.",
        isStaff: false,
        senderName: "You",
        createdAt: "2026-02-15T10:00:00Z",
      },
      {
        id: "msg-2",
        ticketId: "2",
        message: "I apologize for this inconvenience. I'm investigating this issue right away. Can you please provide the transaction IDs for both charges so I can expedite the refund?",
        isStaff: true,
        senderName: "David Lee",
        createdAt: "2026-02-15T15:00:00Z",
      },
      {
        id: "msg-3",
        ticketId: "2",
        message: "The transaction IDs are TXN-2026-001 and TXN-2026-002. Thank you for looking into this.",
        isStaff: false,
        senderName: "You",
        createdAt: "2026-02-16T09:00:00Z",
      },
      {
        id: "msg-4",
        ticketId: "2",
        message: "Thank you for providing those details. I've confirmed the duplicate charge and have processed a refund for TXN-2026-002. You should see the refund in your account within 3-5 business days. I've also added a note to prevent this from happening again.",
        isStaff: true,
        senderName: "David Lee",
        createdAt: "2026-02-16T14:00:00Z",
      },
    ],
    createdAt: "2026-02-15",
    updatedAt: "2026-02-16",
  },
  {
    id: "3",
    ticketNumber: "TKT-2026-003",
    subject: "Policy coverage question - Dental services",
    category: "policy",
    priority: "low",
    status: "resolved",
    description: "Questions about dental and vision coverage under my current plan.",
    messages: [
      {
        id: "msg-1",
        ticketId: "3",
        message: "What services are covered under my plan? I want to understand my dental and vision coverage details.",
        isStaff: false,
        senderName: "You",
        createdAt: "2026-02-10T09:00:00Z",
      },
      {
        id: "msg-2",
        ticketId: "3",
        message: "Your plan includes comprehensive dental and vision coverage:\n\n✓ Dental: Two cleanings per year, X-rays, fillings, and major procedures (subject to deductible)\n✓ Vision: Annual eye exam, frames/lenses every 12 months\n\nPlease check the Policy tab for detailed information about covered services and any copays.",
        isStaff: true,
        senderName: "Mary Johnson",
        createdAt: "2026-02-10T11:30:00Z",
      },
      {
        id: "msg-3",
        ticketId: "3",
        message: "Perfect! That's exactly what I needed. Thank you for the clear explanation.",
        isStaff: false,
        senderName: "You",
        createdAt: "2026-02-12T08:00:00Z",
      },
    ],
    createdAt: "2026-02-10",
    updatedAt: "2026-02-12",
    resolvedAt: "2026-02-12",
  },
];

const mockCases: ClaimCase[] = [
  {
    id: "case-1",
    caseNumber: "CASE-2026-001",
    claimId: "CLM-001",
    claimNumber: "CLM-2026-001",
    subject: "Additional documentation needed",
    status: "waiting",
    priority: "high",
    lastMessage: "Please provide the medical report from your visit.",
    createdAt: "2026-02-16",
    updatedAt: "2026-02-17",
    messageCount: 3,
    messages: [
      {
        id: "msg-1",
        author: "System",
        isStaff: true,
        message: "Case created automatically: Additional documentation is needed to process your claim.",
        createdAt: "2026-02-16T10:00:00Z",
      },
      {
        id: "msg-2",
        author: "Sarah Johnson (Claims Reviewer)",
        isStaff: true,
        message: "Please provide the medical report from your visit. We need this to complete the review of your claim.",
        createdAt: "2026-02-16T14:30:00Z",
      },
      {
        id: "msg-3",
        author: "You",
        isStaff: false,
        message: "I will upload the medical report by tomorrow. Do you need any other documents?",
        createdAt: "2026-02-17T09:15:00Z",
      },
    ],
  },
  {
    id: "case-2",
    caseNumber: "CASE-2026-002",
    claimId: "CLM-002",
    claimNumber: "CLM-2026-002",
    subject: "Claim review in progress",
    status: "in_progress",
    priority: "medium",
    lastMessage: "Your claim is being reviewed by our team.",
    createdAt: "2026-02-13",
    updatedAt: "2026-02-16",
    messageCount: 5,
    messages: [
      {
        id: "msg-1",
        author: "System",
        isStaff: true,
        message: "Case created: Your claim is under review.",
        createdAt: "2026-02-13T08:00:00Z",
      },
      {
        id: "msg-2",
        author: "You",
        isStaff: false,
        message: "How long will the review process take?",
        createdAt: "2026-02-14T11:00:00Z",
      },
      {
        id: "msg-3",
        author: "Mike Chen (Claims Specialist)",
        isStaff: true,
        message: "The review typically takes 5-7 business days. We'll update you as soon as we have a decision.",
        createdAt: "2026-02-14T15:30:00Z",
      },
      {
        id: "msg-4",
        author: "You",
        isStaff: false,
        message: "Thank you for the information.",
        createdAt: "2026-02-15T09:00:00Z",
      },
      {
        id: "msg-5",
        author: "Mike Chen (Claims Specialist)",
        isStaff: true,
        message: "Your claim is currently being reviewed by our medical team. We'll contact you if we need any additional information.",
        createdAt: "2026-02-16T10:00:00Z",
      },
    ],
  },
  {
    id: "case-3",
    caseNumber: "CASE-2026-003",
    claimId: "CLM-003",
    claimNumber: "CLM-2026-003",
    subject: "Provider information verification",
    status: "open",
    priority: "urgent",
    lastMessage: "We need to verify the provider NPI number.",
    createdAt: "2026-02-18",
    updatedAt: "2026-02-18",
    messageCount: 1,
    messages: [
      {
        id: "msg-1",
        author: "Lisa Anderson (Claims Specialist)",
        isStaff: true,
        message: "We need to verify the provider NPI number for your claim. The NPI provided doesn't match our records. Can you please confirm the correct NPI?",
        createdAt: "2026-02-18T13:45:00Z",
      },
    ],
  },
  {
    id: "case-4",
    caseNumber: "CASE-2026-004",
    claimId: "CLM-004",
    claimNumber: "CLM-2026-004",
    subject: "Claim processed successfully",
    status: "closed",
    priority: "low",
    lastMessage: "Your claim has been processed and approved.",
    createdAt: "2026-02-05",
    updatedAt: "2026-02-08",
    messageCount: 2,
    messages: [
      {
        id: "msg-1",
        author: "System",
        isStaff: true,
        message: "Case created: Your claim is being processed.",
        createdAt: "2026-02-05T10:00:00Z",
      },
      {
        id: "msg-2",
        author: "Claims Team",
        isStaff: true,
        message: "Your claim has been processed and approved. Payment will be issued within 5-7 business days.",
        createdAt: "2026-02-08T16:00:00Z",
      },
    ],
  },
];

export default function SupportPage() {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"tickets" | "cases">("tickets");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedCase, setSelectedCase] = useState<ClaimCase | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [newTicketMessage, setNewTicketMessage] = useState("");
  const [ticketFiles, setTicketFiles] = useState<File[]>([]);
  const [cases, setCases] = useState<ClaimCase[]>(mockCases);
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  
  // New ticket form state
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [newTicketCategory, setNewTicketCategory] = useState("");
  const [newTicketPriority, setNewTicketPriority] = useState("");
  const [newTicketDescription, setNewTicketDescription] = useState("");

  // Load cases from localStorage on mount and merge with mock data
  useEffect(() => {
    const loadCases = () => {
      const storedCases = JSON.parse(localStorage.getItem("claimCases") || "[]");
      if (storedCases.length > 0) {
        // Merge stored cases with mock cases, avoiding duplicates
        setCases((prevCases) => {
          const mockCaseIds = prevCases.map(c => c.id);
          const newCases = storedCases.filter((sc: any) => !mockCaseIds.includes(sc.id));
          return [...newCases, ...prevCases];
        });
      }
    };
    
    loadCases();
    
    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', loadCases);
    
    return () => {
      window.removeEventListener('storage', loadCases);
    };
  }, []);
  
  // Filter tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      if (statusFilter !== "all" && ticket.status !== statusFilter) return false;
      if (priorityFilter !== "all" && ticket.priority !== priorityFilter) return false;
      if (categoryFilter !== "all" && ticket.category !== categoryFilter) return false;
      return true;
    });
  }, [tickets, statusFilter, priorityFilter, categoryFilter]);

  // Filter cases
  const filteredCases = useMemo(() => {
    return cases.filter((caseItem) => {
      if (statusFilter !== "all" && caseItem.status !== statusFilter) return false;
      if (priorityFilter !== "all" && caseItem.priority !== priorityFilter) return false;
      return true;
    });
  }, [cases, statusFilter, priorityFilter]);

  const handleCreateTicket = () => {
    if (!newTicketSubject.trim() || !newTicketCategory || !newTicketPriority || !newTicketDescription.trim()) {
      return;
    }

    const newTicket: SupportTicket = {
      id: `ticket-${Date.now()}`,
      ticketNumber: `TCK-${String(tickets.length + 1).padStart(5, '0')}`,
      subject: newTicketSubject,
      description: newTicketDescription,
      category: newTicketCategory as "billing" | "claims" | "policy" | "technical" | "general",
      priority: newTicketPriority as "low" | "medium" | "high" | "urgent",
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderName: "John Member",
          isStaff: false,
          message: newTicketDescription,
          createdAt: new Date().toISOString(),
        }
      ],
    };

    setTickets([newTicket, ...tickets]);
    
    // Reset form
    setNewTicketSubject("");
    setNewTicketCategory("");
    setNewTicketPriority("");
    setNewTicketDescription("");
    setShowTicketModal(false);
  };

  const handleSendMessage = () => {
    if (!selectedCase || !newMessage.trim()) return;

    const updatedMessage: CaseMessage = {
      id: `msg-${Date.now()}`,
      author: "You",
      isStaff: false,
      message: newMessage.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedCases = cases.map((c) => {
      if (c.id === selectedCase.id) {
        const updatedMessages = [...(c.messages || []), updatedMessage];
        return {
          ...c,
          messages: updatedMessages,
          messageCount: updatedMessages.length,
          lastMessage: newMessage.trim(),
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });

    // Update localStorage for claim cases
    if (selectedCase.claimId) {
      const storedCases = JSON.parse(localStorage.getItem("claimCases") || "[]");
      const updatedStoredCases = storedCases.map((c: any) => {
        if (c.claimId === selectedCase.claimId) {
          return {
            ...c,
            messages: [...c.messages, updatedMessage],
            updatedAt: new Date().toISOString(),
          };
        }
        return c;
      });
      localStorage.setItem("claimCases", JSON.stringify(updatedStoredCases));
    }

    setCases(updatedCases);
    setSelectedCase({
      ...selectedCase,
      messages: [...(selectedCase.messages || []), updatedMessage],
      messageCount: (selectedCase.messages?.length || 0) + 1,
      lastMessage: newMessage.trim(),
      updatedAt: new Date().toISOString(),
    });
    setNewMessage("");
  };

  const handleReopenCase = () => {
    if (!selectedCase) return;

    const updatedCases = cases.map((c) => {
      if (c.id === selectedCase.id) {
        return {
          ...c,
          status: "open" as const,
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });

    // Update localStorage for claim cases
    if (selectedCase.claimId) {
      const storedCases = JSON.parse(localStorage.getItem("claimCases") || "[]");
      const updatedStoredCases = storedCases.map((c: any) => {
        if (c.claimId === selectedCase.claimId) {
          return {
            ...c,
            status: "open",
            updatedAt: new Date().toISOString(),
          };
        }
        return c;
      });
      localStorage.setItem("claimCases", JSON.stringify(updatedStoredCases));
    }

    setCases(updatedCases);
    setSelectedCase({
      ...selectedCase,
      status: "open",
      updatedAt: new Date().toISOString(),
    });
  };

  // Ticket handlers
  const handleSendTicketMessage = () => {
    if (!selectedTicket || !newTicketMessage.trim()) return;

    const updatedMessage: TicketMessage = {
      id: `msg-${Date.now()}`,
      ticketId: selectedTicket.id,
      message: newTicketMessage.trim(),
      isStaff: false,
      senderName: "You",
      createdAt: new Date().toISOString(),
    };

    const updatedTickets = tickets.map((t) => {
      if (t.id === selectedTicket.id) {
        const updatedMessages = [...t.messages, updatedMessage];
        return {
          ...t,
          messages: updatedMessages,
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    });

    setTickets(updatedTickets);
    setSelectedTicket({
      ...selectedTicket,
      messages: [...selectedTicket.messages, updatedMessage],
      updatedAt: new Date().toISOString(),
    });
    setNewTicketMessage("");
  };

  const handleCloseTicket = () => {
    if (!selectedTicket) return;

    const updatedTickets = tickets.map((t) => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          status: "closed" as const,
          resolvedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    });

    setTickets(updatedTickets);
    setSelectedTicket({
      ...selectedTicket,
      status: "closed",
      resolvedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleReopenTicket = () => {
    if (!selectedTicket) return;

    const updatedTickets = tickets.map((t) => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          status: "open" as const,
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    });

    setTickets(updatedTickets);
    setSelectedTicket({
      ...selectedTicket,
      status: "open",
      updatedAt: new Date().toISOString(),
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTicketFiles([...ticketFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setTicketFiles(ticketFiles.filter((_, i) => i !== index));
  };
  
  const ticketColumns: Column<SupportTicket>[] = [
    {
      header: "Ticket Number",
      accessor: "ticketNumber",
      cell: (value: unknown) => <span className="font-medium text-gray-900">{String(value)}</span>,
    },
    {
      header: "Subject",
      accessor: "subject",
    },
    {
      header: "Category",
      accessor: "category",
      cell: (value: unknown) => (
        <span className="capitalize text-[14px] text-gray-700">{String(value)}</span>
      ),
    },
    {
      header: "Priority",
      accessor: "priority",
      cell: (value: unknown) => (
        <span
          className={`capitalize text-[13px] font-semibold px-2.5 py-1 rounded-full ${
            value === "urgent"
              ? "bg-gray-900 text-white border border-gray-900"
              : value === "high"
              ? "bg-gray-700 text-white border border-gray-700"
              : value === "medium"
              ? "bg-gray-400 text-white border border-gray-400"
              : "bg-gray-200 text-gray-700 border border-gray-200"
          }`}
        >
          {String(value)}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value: unknown) => (
        <span
          className={`capitalize text-[13px] font-semibold px-2.5 py-1 rounded-full ${
            value === "open"
              ? "bg-ocean-mid text-white border border-ocean-mid"
              : value === "in_progress"
              ? "bg-ocean-mid/80 text-white border border-ocean-mid/80"
              : value === "waiting"
              ? "bg-gray-400 text-white border border-gray-400"
              : value === "resolved"
              ? "bg-gray-600 text-white border border-gray-600"
              : "bg-gray-300 text-gray-700 border border-gray-300"
          }`}
        >
          {String(value).replace("_", " ")}
        </span>
      ),
    },
    {
      header: "Created",
      accessor: "createdAt",
      cell: (value: unknown) => formatDate(value as string),
    },
  ];

  const caseColumns: Column<ClaimCase>[] = [
    {
      header: "Case Number",
      accessor: "caseNumber",
      cell: (value: unknown) => <span className="font-medium text-gray-900">{String(value)}</span>,
    },
    {
      header: "Claim Number",
      accessor: "claimNumber",
      cell: (value: unknown) => <span className="text-[14px] text-ocean-mid font-medium">{String(value)}</span>,
    },
    {
      header: "Subject",
      accessor: "subject",
    },
    {
      header: "Priority",
      accessor: "priority",
      cell: (value: unknown) => (
        <span
          className={`capitalize text-[13px] font-semibold px-2.5 py-1 rounded-full ${
            value === "urgent"
              ? "bg-gray-900 text-white border border-gray-900"
              : value === "high"
              ? "bg-gray-700 text-white border border-gray-700"
              : value === "medium"
              ? "bg-gray-400 text-white border border-gray-400"
              : "bg-gray-200 text-gray-700 border border-gray-200"
          }`}
        >
          {String(value)}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value: unknown) => (
        <span
          className={`capitalize text-[13px] font-semibold px-2.5 py-1 rounded-full ${
            value === "open"
              ? "bg-ocean-mid text-white border border-ocean-mid"
              : value === "in_progress"
              ? "bg-ocean-mid/80 text-white border border-ocean-mid/80"
              : value === "waiting"
              ? "bg-gray-400 text-white border border-gray-400"
              : value === "resolved"
              ? "bg-gray-600 text-white border border-gray-600"
              : "bg-gray-300 text-gray-700 border border-gray-300"
          }`}
        >
          {String(value).replace("_", " ")}
        </span>
      ),
    },
    {
      header: "Messages",
      accessor: "messageCount",
      cell: (value: unknown) => (
        <span className="text-[14px] text-gray-700">
          <MessageCircle className="w-4 h-4 inline mr-1" />
          {String(value)}
        </span>
      ),
    },
    {
      header: "Updated",
      accessor: "updatedAt",
      cell: (value: unknown) => formatDate(value as string),
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
        <p className="text-gray-600 mt-2">
          Get help and find answers to your questions
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="card p-4 hover:shadow-lg transition-shadow text-left">
          <div className="mb-2">
            <MessageCircle className="w-8 h-8 text-ocean-mid" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-0.5">Live Chat</h3>
          <p className="text-sm text-gray-600">
            Chat with our support team in real-time
          </p>
        </button>

        <button className="card p-4 hover:shadow-lg transition-shadow text-left">
          <div className="text-3xl mb-2">📞</div>
          <h3 className="text-base font-semibold text-gray-900 mb-0.5">Call Us</h3>
          <p className="text-sm text-gray-600">
            1-800-INSURE-ME<br />
            Mon-Fri, 8am-6pm EST
          </p>
        </button>

        <button className="card p-4 hover:shadow-lg transition-shadow text-left">
          <div className="text-3xl mb-2">📧</div>
          <h3 className="text-base font-semibold text-gray-900 mb-0.5">Email</h3>
          <p className="text-sm text-gray-600">
            support@memberconnect.com<br />
            Response within 24 hours
          </p>
        </button>
      </div>

      {/* FAQs */}
      <div className="card">
        <div className="px-5 py-2.5 border-b border-border">
          <h2 className="text-xl font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="px-5 py-4">
          <div className="space-y-3">
            {mockFAQs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {expandedFAQ === faq.id && (
                  <div className="px-4 pb-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {faq.views.toLocaleString()} people found this helpful
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Support Tickets & Cases */}
      <div className="card">
        <div className="px-5 py-2.5 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Support & Cases</h2>
            <Button variant="primary" onClick={() => setShowTicketModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-5 py-3 border-b border-border flex items-center gap-4">
          <button
            onClick={() => setActiveTab("tickets")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === "tickets"
                ? "bg-ocean-mid text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Support Tickets ({filteredTickets.length})
          </button>
          <button
            onClick={() => setActiveTab("cases")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === "cases"
                ? "bg-ocean-mid text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Claim Cases ({filteredCases.length})
          </button>
        </div>

        {/* Filters */}
        <div className="px-5 py-3 bg-gray-50 border-b border-border">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-mid"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="waiting">Waiting</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-mid"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {activeTab === "tickets" && (
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-mid"
              >
                <option value="all">All Categories</option>
                <option value="billing">Billing</option>
                <option value="claims">Claims</option>
                <option value="policy">Policy</option>
                <option value="technical">Technical</option>
                <option value="general">General</option>
              </select>
            )}

            {(statusFilter !== "all" || priorityFilter !== "all" || categoryFilter !== "all") && (
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setPriorityFilter("all");
                  setCategoryFilter("all");
                }}
                className="text-sm text-ocean-mid hover:text-ocean-dark font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
        
        <div className="px-5 py-4">
          {activeTab === "tickets" ? (
            <>
              <div className="mb-3 text-sm text-gray-600 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Click on any ticket row to view details, messages, and respond
              </div>
              <DataTable
                columns={ticketColumns}
                data={filteredTickets}
                emptyMessage="No support tickets found"
                onRowClick={(ticket) => setSelectedTicket(ticket)}
              />
            </>
          ) : (
            <>
              <div className="mb-3 text-sm text-gray-600 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Click on any case row to view details, messages, and respond
              </div>
              <DataTable
                columns={caseColumns}
                data={filteredCases}
                emptyMessage="No claim cases found"
                onRowClick={(caseItem) => setSelectedCase(caseItem)}
              />
            </>
          )}
        </div>
      </div>
      
      {/* Create Ticket Modal */}
      <Modal
        isOpen={showTicketModal}
        onClose={() => {
          setShowTicketModal(false);
          setNewTicketSubject("");
          setNewTicketCategory("");
          setNewTicketPriority("");
          setNewTicketDescription("");
        }}
        title="Create Support Ticket"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => {
              setShowTicketModal(false);
              setNewTicketSubject("");
              setNewTicketCategory("");
              setNewTicketPriority("");
              setNewTicketDescription("");
            }}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleCreateTicket}
              disabled={!newTicketSubject.trim() || !newTicketCategory || !newTicketPriority || !newTicketDescription.trim()}
            >
              Submit Ticket
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Subject"
            placeholder="Brief description of your issue"
            value={newTicketSubject}
            onChange={(e) => setNewTicketSubject(e.target.value)}
            required
          />
          
          <Select
            label="Category"
            value={newTicketCategory}
            onChange={(e) => setNewTicketCategory(e.target.value)}
            options={[
              { label: "Billing", value: "billing" },
              { label: "Claims", value: "claims" },
              { label: "Policy", value: "policy" },
              { label: "Technical", value: "technical" },
              { label: "General", value: "general" },
            ]}
            required
          />
          
          <Select
            label="Priority"
            value={newTicketPriority}
            onChange={(e) => setNewTicketPriority(e.target.value)}
            options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
              { label: "Urgent", value: "urgent" },
            ]}
            required
          />
          
          <Textarea
            label="Description"
            placeholder="Please provide detailed information about your issue..."
            value={newTicketDescription}
            onChange={(e) => setNewTicketDescription(e.target.value)}
            rows={6}
            required
          />
        </div>
      </Modal>

      {/* Case Detail Modal */}
      <Modal
        isOpen={!!selectedCase}
        onClose={() => {
          setSelectedCase(null);
          setNewMessage("");
        }}
        title=""
        size="full"
      >
        {selectedCase && (
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedCase(null);
                setNewMessage("");
              }}
              className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-6 h-[85vh] min-h-[600px]">
              {/* Main Content - Left Side */}
              <div className="flex-1 flex flex-col min-w-0">
                {/* Case Header */}
                <div className="pb-3 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h2 className="text-base font-bold text-gray-900">
                        Case {selectedCase.caseNumber}
                      </h2>
                      <span
                        className={`inline-block capitalize text-xs font-semibold px-2.5 py-1 rounded-md ${
                          selectedCase.status === "open"
                            ? "bg-ocean-mid text-white border border-ocean-mid"
                            : selectedCase.status === "in_progress"
                            ? "bg-ocean-mid/80 text-white border border-ocean-mid/80"
                            : selectedCase.status === "waiting"
                            ? "bg-gray-400 text-white border border-gray-400"
                            : selectedCase.status === "resolved"
                            ? "bg-gray-600 text-white border border-gray-600"
                            : "bg-gray-300 text-gray-700 border border-gray-300"
                        }`}
                      >
                        {selectedCase.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {selectedCase.subject}
                  </h3>
                  <Link
                    href={`/claims/${selectedCase.claimId}`}
                    className="text-sm text-ocean-mid hover:text-ocean-dark font-medium inline-flex items-center gap-1"
                  >
                    Related Claim: {selectedCase.claimNumber}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                {/* Messages Area - Scrollable */}
                <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-2">
                  {selectedCase.messages && selectedCase.messages.length > 0 ? (
                    selectedCase.messages.map((message) => (
                      <div key={message.id} className="flex gap-3">
                        {/* Avatar */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                            message.isStaff
                              ? "bg-ocean-mid text-white"
                              : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          {message.author.charAt(0).toUpperCase()}
                        </div>
                        
                        {/* Message Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-gray-900">
                              {message.author}
                            </span>
                            {message.isStaff && (
                              <span className="text-xs px-2 py-0.5 bg-ocean-mid/10 text-ocean-mid rounded-full font-medium">
                                Support Agent
                              </span>
                            )}
                            <span className="text-xs text-gray-500">
                              {formatDate(message.createdAt, "long")}
                            </span>
                          </div>
                          <div
                            className={`p-3 rounded-lg ${
                              message.isStaff
                                ? "bg-blue-50 border border-blue-100"
                                : "bg-gray-50 border border-gray-200"
                            }`}
                          >
                            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                              {message.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No messages yet</p>
                    </div>
                  )}
                </div>

                {/* Reply Section - Fixed at Bottom */}
                {selectedCase.status !== "closed" && selectedCase.status !== "resolved" ? (
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your reply..."
                        rows={3}
                        className="bg-white"
                      />
                      <div className="flex justify-end">
                        <Button
                          variant="primary"
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="text-sm"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-700 mb-3">
                        This case is {selectedCase.status}. You can reopen it if you need further assistance.
                      </p>
                      <Button
                        variant="secondary"
                        onClick={handleReopenCase}
                        className="text-sm"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reopen Case
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar - Case Properties */}
              <div className="w-72 border-l border-gray-200 pl-5 flex-shrink-0">
                <h3 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  Case Details
                </h3>
                <div className="space-y-3">
                  {/* Status */}
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                      Status
                    </label>
                    <span
                      className={`inline-block capitalize text-xs font-semibold px-2.5 py-1 rounded-md ${
                        selectedCase.status === "open"
                          ? "bg-ocean-mid text-white border border-ocean-mid"
                          : selectedCase.status === "in_progress"
                          ? "bg-ocean-mid/80 text-white border border-ocean-mid/80"
                          : selectedCase.status === "waiting"
                          ? "bg-gray-400 text-white border border-gray-400"
                          : selectedCase.status === "resolved"
                          ? "bg-gray-600 text-white border border-gray-600"
                          : "bg-gray-300 text-gray-700 border border-gray-300"
                      }`}
                    >
                      {selectedCase.status.replace("_", " ")}
                    </span>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                      Priority
                    </label>
                    <span
                      className={`inline-block capitalize text-xs font-semibold px-2.5 py-1 rounded-md ${
                        selectedCase.priority === "urgent"
                          ? "bg-gray-900 text-white border border-gray-900"
                          : selectedCase.priority === "high"
                          ? "bg-gray-700 text-white border border-gray-700"
                          : selectedCase.priority === "medium"
                          ? "bg-gray-400 text-white border border-gray-400"
                          : "bg-gray-200 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {selectedCase.priority}
                    </span>
                  </div>

                  {/* Claim Reference */}
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                      Claim Number
                    </label>
                    <Link
                      href={`/claims/${selectedCase.claimId}`}
                      className="text-xs text-ocean-mid hover:text-ocean-dark font-medium inline-flex items-center gap-1"
                    >
                      {selectedCase.claimNumber}
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 pt-3 mt-3">
                    {/* Created */}
                    <div className="mb-2">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                        Created
                      </label>
                      <p className="text-xs text-gray-900">
                        {formatDate(selectedCase.createdAt, "long")}
                      </p>
                    </div>

                    {/* Last Updated */}
                    <div className="mb-2">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                        Last Updated
                      </label>
                      <p className="text-xs text-gray-900">
                        {formatDate(selectedCase.updatedAt, "long")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Ticket Detail Modal - Professional Ticketing System Style */}
      <Modal
        isOpen={!!selectedTicket}
        onClose={() => {
          setSelectedTicket(null);
          setNewTicketMessage("");
          setTicketFiles([]);
        }}
        title=""
        size="full"
      >
        {selectedTicket && (
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedTicket(null);
                setNewTicketMessage("");
                setTicketFiles([]);
              }}
              className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-6 h-[85vh] min-h-[600px]">
            {/* Main Content - Left Side */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Ticket Header */}
              <div className="pb-3 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedTicket.ticketNumber}
                    </h2>
                    <span
                      className={`capitalize text-[13px] font-semibold px-2.5 py-1 rounded-full ${
                        selectedTicket.status === "open"
                          ? "bg-ocean-mid text-white border border-ocean-mid"
                          : selectedTicket.status === "in_progress"
                          ? "bg-ocean-mid/80 text-white border border-ocean-mid/80"
                          : selectedTicket.status === "waiting"
                          ? "bg-gray-400 text-white border border-gray-400"
                          : selectedTicket.status === "resolved"
                          ? "bg-gray-600 text-white border border-gray-600"
                          : "bg-gray-300 text-gray-700 border border-gray-300"
                      }`}
                    >
                      {selectedTicket.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {selectedTicket.subject}
                </h3>
                <p className="text-sm text-gray-600">{selectedTicket.description}</p>
              </div>

              {/* Messages Area - Scrollable */}
              <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-2">
                {selectedTicket.messages && selectedTicket.messages.length > 0 ? (
                  selectedTicket.messages.map((message, index) => (
                    <div key={message.id} className="flex gap-3">
                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                          message.isStaff
                            ? "bg-ocean-mid text-white"
                            : "bg-gray-300 text-gray-700"
                        }`}
                      >
                        {message.senderName.charAt(0).toUpperCase()}
                      </div>
                      
                      {/* Message Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">
                            {message.senderName}
                          </span>
                          {message.isStaff && (
                            <span className="text-xs px-2 py-0.5 bg-ocean-mid/10 text-ocean-mid rounded-full font-medium">
                              Support Agent
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {formatDate(message.createdAt, "long")}
                          </span>
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            message.isStaff
                              ? "bg-blue-50 border border-blue-100"
                              : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {message.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No messages yet</p>
                  </div>
                )}
              </div>

              {/* Reply Section - Fixed at Bottom */}
              {selectedTicket.status !== "closed" && selectedTicket.status !== "resolved" ? (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <Textarea
                      value={newTicketMessage}
                      onChange={(e) => setNewTicketMessage(e.target.value)}
                      placeholder="Type your reply..."
                      rows={3}
                      className="bg-white"
                    />
                    
                    {/* File Upload */}
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                        <span className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
                          <Upload className="w-3.5 h-3.5 mr-1.5" />
                          Attach Files
                        </span>
                      </label>
                    </div>
                    
                    {/* File List */}
                    {ticketFiles.length > 0 && (
                      <div className="space-y-1.5">
                        {ticketFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-700">{file.name}</span>
                              <span className="text-xs text-gray-400">
                                ({(file.size / 1024).toFixed(1)} KB)
                              </span>
                            </div>
                            <button
                              onClick={() => handleRemoveFile(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button
                        variant="primary"
                        onClick={handleSendTicketMessage}
                        disabled={!newTicketMessage.trim()}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-800 mb-3 font-medium">
                      ⓘ This ticket is {selectedTicket.status}
                    </p>
                    <p className="text-sm text-amber-700 mb-3">
                      The conversation on this ticket has been closed. You can reopen it to continue the discussion.
                    </p>
                    <Button
                      variant="secondary"
                      onClick={handleReopenTicket}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reopen Ticket
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Right Side - Ticket Properties */}
            <div className="w-72 border-l border-gray-200 pl-5 flex-shrink-0">
              <h3 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Ticket Details
              </h3>
              
              <div className="space-y-3">
                {/* Status */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Status
                  </label>
                  <span
                    className={`inline-block capitalize text-xs font-semibold px-2.5 py-1 rounded-md ${
                      selectedTicket.status === "open"
                        ? "bg-ocean-mid text-white border border-ocean-mid"
                        : selectedTicket.status === "in_progress"
                        ? "bg-ocean-mid/80 text-white border border-ocean-mid/80"
                        : selectedTicket.status === "waiting"
                        ? "bg-gray-400 text-white border border-gray-400"
                        : selectedTicket.status === "resolved"
                        ? "bg-gray-600 text-white border border-gray-600"
                        : "bg-gray-300 text-gray-700 border border-gray-300"
                    }`}
                  >
                    {selectedTicket.status.replace("_", " ")}
                  </span>
                </div>

                {/* Priority */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Priority
                  </label>
                  <span
                    className={`inline-block capitalize text-xs font-semibold px-2.5 py-1 rounded-md ${
                      selectedTicket.priority === "urgent"
                        ? "bg-gray-900 text-white border border-gray-900"
                        : selectedTicket.priority === "high"
                        ? "bg-gray-700 text-white border border-gray-700"
                        : selectedTicket.priority === "medium"
                        ? "bg-gray-400 text-white border border-gray-400"
                        : "bg-gray-200 text-gray-700 border border-gray-200"
                    }`}
                  >
                    {selectedTicket.priority}
                  </span>
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Category
                  </label>
                  <span className="text-xs text-gray-900 capitalize font-medium bg-gray-100 px-2.5 py-1 rounded-md inline-block">
                    {selectedTicket.category}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3">
                  {/* Created */}
                  <div className="mb-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                      Created
                    </label>
                    <p className="text-xs text-gray-900">
                      {formatDate(selectedTicket.createdAt, "long")}
                    </p>
                  </div>

                  {/* Last Updated */}
                  <div className="mb-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                      Last Updated
                    </label>
                    <p className="text-xs text-gray-900">
                      {formatDate(selectedTicket.updatedAt, "long")}
                    </p>
                  </div>

                  {/* Resolved Date */}
                  {selectedTicket.resolvedAt && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                        Resolved
                      </label>
                      <p className="text-xs text-gray-900">
                        {formatDate(selectedTicket.resolvedAt, "long")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {selectedTicket.status !== "closed" && selectedTicket.status !== "resolved" && (
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">
                      Actions
                    </label>
                    <Button
                      variant="secondary"
                      onClick={handleCloseTicket}
                      className="w-full text-sm"
                    >
                      Close Ticket
                    </Button>
                  </div>
                )}
              </div>
            </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
