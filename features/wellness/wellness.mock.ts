/**
 * Wellness Feature - Mock Data
 * ---------------------------------------
 * Mock data for wellness feature during development.
 * 
 * Usage:
 * - Used when NEXT_PUBLIC_USE_MOCK=true
 * - Replace with real API calls in wellness.api.ts
 * 
 * Removal Instructions:
 * - Set NEXT_PUBLIC_USE_MOCK=false in .env.local
 * - This file can be deleted once backend is integrated
 * 
 * @module features/wellness/wellness.mock
 */

import { WellnessMetric, WellnessArticle, TelemedicineProvider } from "./wellness.types";

/**
 * Mock wellness metrics for development
 */
export const MOCK_WELLNESS_METRICS: WellnessMetric[] = [
  {
    id: "1",
    title: "Steps Today",
    value: 8542,
    goal: 10000,
    unit: "steps",
    icon: "activity",
    color: "primary",
  },
  {
    id: "2",
    title: "Water Intake",
    value: 6,
    goal: 8,
    unit: "glasses",
    icon: "droplet",
    color: "blue",
  },
  {
    id: "3",
    title: "Sleep",
    value: 7.5,
    goal: 8,
    unit: "hours",
    icon: "moon",
    color: "indigo",
  },
  {
    id: "4",
    title: "Active Minutes",
    value: 45,
    goal: 60,
    unit: "min",
    icon: "zap",
    color: "orange",
  },
];

/**
 * Mock wellness articles for development
 */
export const MOCK_WELLNESS_ARTICLES: WellnessArticle[] = [
  {
    id: "1",
    title: "10 Tips for Better Sleep Hygiene",
    category: "Sleep Health",
    excerpt:
      "Discover simple strategies to improve your sleep quality and wake up feeling refreshed.",
    readTime: 5,
    coverImage: "/wellness/sleep.jpg",
    publishedAt: "2024-01-15",
    slug: "10-tips-better-sleep-hygiene",
  },
  {
    id: "2",
    title: "Stress Management Techniques",
    category: "Mental Health",
    excerpt:
      "Learn effective ways to manage stress and maintain emotional well-being in daily life.",
    readTime: 7,
    coverImage: "/wellness/stress.jpg",
    publishedAt: "2024-01-10",
    slug: "stress-management-techniques",
  },
  {
    id: "3",
    title: "Nutrition Guide for Busy Professionals",
    category: "Nutrition",
    excerpt:
      "Quick and healthy meal ideas that fit into your busy schedule without compromising nutrition.",
    readTime: 6,
    coverImage: "/wellness/nutrition.jpg",
    publishedAt: "2024-01-05",
    slug: "nutrition-guide-busy-professionals",
  },
];

/**
 * Mock telemedicine providers for development
 */
export const MOCK_TELEMEDICINE_PROVIDERS: TelemedicineProvider[] = [
  {
    id: "1",
    name: "Dr. Emily Rodriguez",
    specialty: "Primary Care",
    avatar: "/avatars/emily-rodriguez.jpg",
    rating: 4.9,
    availability: "Available Now",
    languages: ["English", "Spanish"],
    consultationFee: 50,
  },
  {
    id: "2",
    name: "Dr. James Wilson",
    specialty: "Mental Health",
    avatar: "/avatars/james-wilson.jpg",
    rating: 4.8,
    availability: "Today, 2:00 PM",
    languages: ["English"],
    consultationFee: 75,
  },
  {
    id: "3",
    name: "Dr. Lisa Chen",
    specialty: "Pediatrics",
    avatar: "/avatars/lisa-chen.jpg",
    rating: 4.7,
    availability: "Available Now",
    languages: ["English", "Mandarin"],
    consultationFee: 60,
  },
];
