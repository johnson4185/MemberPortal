export interface WellnessMetric {
  id: string;
  title: string;
  value: number;
  goal: number;
  unit: string;
  icon: string;
  color: string;
}

export interface WellnessArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  readTime: number;
  publishedAt: string;
  slug: string;
}

export interface TelemedicineProvider {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  availability: string;
  languages: string[];
  consultationFee: number;
}

export interface WellnessReward {
  id: string;
  title: string;
  description: string;
  points: number;
  earned: boolean;
  earnedDate?: string;
}

export interface HealthGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  status: "not_started" | "in_progress" | "completed";
}
