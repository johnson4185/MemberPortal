"use client";

import { useState } from "react";
import { Activity, Heart, Footprints, Award, TrendingUp, Scale, Ruler, Thermometer, Droplets, Zap, Target, Calendar, Plus, ChevronDown, ChevronUp, Calculator, Play, X, Trophy, Crown, Gift } from "lucide-react";
import { WellnessMetric, WellnessArticle } from "@/lib/types";
import { Button, Badge } from "@/components/ui";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerAnimation";
import Modal from "@/components/shared/Modal";
import { formatDate } from "@/lib/utils";

// Vitals data
interface VitalReading {
  id: string;
  type: string;
  value: string;
  unit: string;
  status: "normal" | "warning" | "critical";
  date: string;
  icon: string;
}

interface HealthGoal {
  id: string;
  title: string;
  progress: number;
  target: string;
  note: string;
}

const initialVitals: VitalReading[] = [
  { id: "1", type: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal", date: "2026-02-19", icon: "heart" },
  { id: "2", type: "Heart Rate", value: "72", unit: "bpm", status: "normal", date: "2026-02-19", icon: "activity" },
  { id: "3", type: "Weight", value: "75.5", unit: "kg", status: "normal", date: "2026-02-18", icon: "scale" },
  { id: "4", type: "Temperature", value: "36.8", unit: "°C", status: "normal", date: "2026-02-19", icon: "thermometer" },
  { id: "5", type: "Blood Glucose", value: "95", unit: "mg/dL", status: "normal", date: "2026-02-18", icon: "droplets" },
  { id: "6", type: "Oxygen Level", value: "98", unit: "%", status: "normal", date: "2026-02-19", icon: "zap" },
];

const initialGoals: HealthGoal[] = [
  { id: "1", title: "Lose 5kg", progress: 60, target: "March 31, 2026", note: "Target: March 31, 2026" },
  { id: "2", title: "10,000 steps daily", progress: 85, target: "Ongoing", note: "21 days streak" },
  { id: "3", title: "8 hours sleep", progress: 45, target: "Ongoing", note: "Average: 7.2 hours" },
];

const wellnessVideos = [
  { id: "1", title: "10-Minute Morning Yoga", videoId: "v7AYKMP6rOE", category: "Exercise", duration: "10:23" },
  { id: "2", title: "Heart ❤️ Meditation", videoId: "fNLPZnUE1rg", category: "Mental Health", duration: "15:00" },
  { id: "3", title: "Guided Meditation for Relaxation", videoId: "inpok4MKVLM", category: "Mental Health", duration: "12:15" },
];

// Mock data
const mockMetrics: WellnessMetric[] = [
  {
    id: "1",
    title: "Steps Today",
    value: 8500,
    goal: 10000,
    unit: "steps",
    icon: "footprints",
    color: "primary",
  },
  {
    id: "2",
    title: "Active Minutes",
    value: 45,
    goal: 60,
    unit: "minutes",
    icon: "activity",
    color: "success",
  },
  {
    id: "3",
    title: "Heart Rate",
    value: 72,
    goal: 80,
    unit: "bpm",
    icon: "heart",
    color: "danger",
  },
  {
    id: "4",
    title: "Wellness Points",
    value: 1250,
    goal: 2000,
    unit: "points",
    icon: "award",
    color: "warning",
  },
];

const mockArticles: WellnessArticle[] = [
  {
    id: "1",
    title: "The Science of Better Sleep: 10 Proven Strategies",
    excerpt: "Transform your sleep quality with evidence-based techniques. Learn how circadian rhythm optimization and sleep hygiene can improve your health, mood, and productivity. Discover why consistency matters more than duration.",
    category: "Sleep Health",
    coverImage: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=250&fit=crop",
    readTime: 5,
    publishedAt: "2026-02-18",
    slug: "tips-better-sleep"
  },
  {
    id: "2",
    title: "Nutrition Guide: Foods That Support Heart Health",
    excerpt: "Dive into the world of heart-healthy eating with our comprehensive guide. From omega-3 rich foods to plant-based proteins, learn which nutrients matter most for cardiovascular wellness. Include practical meal planning tips and delicious recipes.",
    category: "Nutrition",
    coverImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=250&fit=crop",
    readTime: 7,
    publishedAt: "2026-02-17",
    slug: "heart-health-nutrition"
  },
  {
    id: "3",
    title: "Mindfulness & Stress Relief: 5-Minute Daily Practices",
    excerpt: "Master the art of mindfulness with our practical guide. Learn simple techniques that fit into your busy schedule. From breathing exercises to meditation, discover how just 5 minutes daily can significantly reduce stress and improve mental clarity.",
    category: "Mental Health",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=250&fit=crop",
    readTime: 6,
    publishedAt: "2026-02-16",
    slug: "mindfulness-stress"
  },
];

export default function WellnessPage() {
  // BMI Calculator state
  const [bmiExpanded, setBmiExpanded] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string; color: string } | null>(null);
  
  // Vitals state
  const [vitalsExpanded, setVitalsExpanded] = useState(false);
  const [vitals, setVitals] = useState<VitalReading[]>(initialVitals);
  const [showVitalModal, setShowVitalModal] = useState(false);
  const [newVitalType, setNewVitalType] = useState("");
  const [newVitalValue, setNewVitalValue] = useState("");

  // Goals state
  const [goals, setGoals] = useState<HealthGoal[]>(initialGoals);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");

  // Video player state
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  
  // Rewards modal state
  const [showRewardsModal, setShowRewardsModal] = useState(false);

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("Please enter both height and weight");
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    let category = "";
    let color = "";
    
    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-600";
    } else if (bmi < 25) {
      category = "Normal weight";
      color = "text-success";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "text-warning";
    } else {
      category = "Obese";
      color = "text-danger";
    }
    
    setBmiResult({ bmi: parseFloat(bmi.toFixed(1)), category, color });
  };

  const handleAddVital = () => {
    if (!newVitalType || !newVitalValue) {
      alert("Please fill in all fields");
      return;
    }

    const vitalTypes: Record<string, { unit: string; icon: string }> = {
      "Blood Pressure": { unit: "mmHg", icon: "heart" },
      "Heart Rate": { unit: "bpm", icon: "activity" },
      "Weight": { unit: "kg", icon: "scale" },
      "Temperature": { unit: "°C", icon: "thermometer" },
      "Blood Glucose": { unit: "mg/dL", icon: "droplets" },
      "Oxygen Level": { unit: "%", icon: "zap" },
    };

    const newVital: VitalReading = {
      id: Date.now().toString(),
      type: newVitalType,
      value: newVitalValue,
      unit: vitalTypes[newVitalType]?.unit || "",
      status: "normal",
      date: new Date().toISOString().split('T')[0],
      icon: vitalTypes[newVitalType]?.icon || "activity",
    };

    setVitals([newVital, ...vitals]);
    setShowVitalModal(false);
    setNewVitalType("");
    setNewVitalValue("");
    alert("Vital reading logged successfully!");
  };

  const handleAddGoal = () => {
    if (!newGoalTitle || !newGoalTarget) {
      alert("Please fill in all fields");
      return;
    }

    const newGoal: HealthGoal = {
      id: Date.now().toString(),
      title: newGoalTitle,
      progress: 0,
      target: newGoalTarget,
      note: `Target: ${newGoalTarget}`,
    };

    setGoals([...goals, newGoal]);
    setShowGoalModal(false);
    setNewGoalTitle("");
    setNewGoalTarget("");
    alert("Health goal added successfully!");
  };

  const getVitalIcon = (iconName: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      heart: Heart,
      activity: Activity,
      scale: Scale,
      thermometer: Thermometer,
      droplets: Droplets,
      zap: Zap,
    };
    return icons[iconName] || Activity;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "normal": return "bg-success/10 text-success border-success/20";
      case "warning": return "bg-warning/10 text-warning border-warning/20";
      case "critical": return "bg-danger/10 text-danger border-danger/20";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };
  
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Wellness Center</h1>
        <p className="text-[16px] text-gray-600 mt-1">
          Track your health metrics, vitals, and achieve your wellness goals
        </p>
      </div>

      <StaggerContainer className="space-y-5">
        {/* Quick Stats */}
        <StaggerItem>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {mockMetrics.map((metric) => {
              const IconComponent = metric.icon === "footprints" ? Footprints : metric.icon === "activity" ? Activity : metric.icon === "heart" ? Heart : Award;
              return (
                <div key={metric.id} className="card px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className="w-4 h-4 text-gray-600" />
                    <p className="text-[13px] font-medium text-gray-600">{metric.title}</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-2 font-outfit">
                    {metric.value.toLocaleString()}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        metric.color === "primary" ? "bg-ocean-mid"
                          : metric.color === "success" ? "bg-success"
                          : metric.color === "warning" ? "bg-warning"
                          : "bg-danger"
                      }`}
                      style={{ width: `${(metric.value / metric.goal) * 100}%` }}
                    />
                  </div>
                  <p className="text-[12px] text-gray-500 mt-1">
                    Goal: {metric.goal} {metric.unit}
                  </p>
                </div>
              );
            })}
          </div>
        </StaggerItem>

        {/* BMI Calculator & Vitals */}
        <StaggerItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* BMI Calculator Card */}
            <div className={`card overflow-hidden transition-all duration-300 ${bmiExpanded ? 'ring-2 ring-ocean-mid' : ''}`}>
              <div className="px-4 py-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-gradient-to-br from-ocean-mid to-ocean-mid/80 rounded-lg shadow-sm">
                      <Calculator className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">BMI Calculator</h2>
                      <p className="text-[12px] text-gray-600 mt-0.5">Calculate your Body Mass Index</p>
                    </div>
                  </div>
                  {bmiExpanded && (
                    <button
                      onClick={() => setBmiExpanded(false)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="px-4 py-3 space-y-3">
                {!bmiExpanded ? (
                  <>
                    {bmiResult ? (
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg p-3 border border-gray-200">
                        <div className="text-center">
                          <p className="text-[13px] text-gray-600 mb-1">Your BMI</p>
                          <p className={`text-3xl font-bold font-outfit mb-1 ${bmiResult.color}`}>
                            {bmiResult.bmi}
                          </p>
                          <Badge className={`${bmiResult.color.replace('text-', 'bg-')}/10 ${bmiResult.color} border-0`}>
                            {bmiResult.category}
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg p-3 border border-gray-200 text-center">
                        <Scale className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-[13px] text-gray-600">Calculate your BMI to track your health</p>
                      </div>
                    )}
                    
                    <Button 
                      variant="primary" 
                      className="w-full bg-ocean-mid hover:bg-ocean-mid/90 shadow-sm"
                      onClick={() => setBmiExpanded(true)}
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate BMI
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Height (cm)
                        </label>
                        <input
                          type="number"
                          placeholder="170"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-mid focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Weight (kg)
                        </label>
                        <input
                          type="number"
                          placeholder="70"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-mid focus:border-transparent"
                        />
                      </div>

                      <div className="bg-blue-50 rounded-lg p-2 text-[12px] text-gray-700">
                        <p><strong>BMI Categories:</strong></p>
                        <p>• &lt;18.5: Underweight</p>
                        <p>• 18.5-24.9: Normal weight</p>
                        <p>• 25-29.9: Overweight</p>
                        <p>• ≥30: Obese</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 pt-1.5">
                      <Button 
                        variant="secondary" 
                        className="flex-1"
                        onClick={() => setBmiExpanded(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        className="flex-1 bg-ocean-mid hover:bg-ocean-mid/90"
                        onClick={calculateBMI}
                      >
                        Calculate
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Health Goals Card */}
            <div className="card px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-gradient-to-br from-success to-success/80 rounded-lg shadow-sm">
                    <Target className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Health Goals</h2>
                    <p className="text-[12px] text-gray-600 mt-0.5">Track your progress</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2.5">
                {goals.map((goal) => (
                  <div key={goal.id} className="bg-gray-50 rounded-lg p-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-medium text-gray-900">{goal.title}</span>
                      <span className={`text-[12px] font-medium ${goal.progress >= 75 ? 'text-success' : goal.progress >= 50 ? 'text-warning' : 'text-gray-600'}`}>{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${goal.progress >= 75 ? 'bg-success' : goal.progress >= 50 ? 'bg-warning' : 'bg-gray-400'}`} 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-[11px] text-gray-600 mt-1">{goal.note}</p>
                  </div>
                ))}

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={() => setShowGoalModal(true)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add New Goal
                </Button>
              </div>
            </div>
          </div>
        </StaggerItem>

        {/* Vitals Tracking */}
        <StaggerItem>
          <div className="card">
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-gradient-to-br from-danger to-danger/80 rounded-lg shadow-sm">
                    <Activity className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Vital Signs</h2>
                    <p className="text-[12px] text-gray-600 mt-0.5">Monitor your health metrics</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setVitalsExpanded(!vitalsExpanded)}
                >
                  {vitalsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="px-4 py-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {vitals.slice(0, vitalsExpanded ? vitals.length : 3).map((vital) => {
                  const IconComponent = getVitalIcon(vital.icon);
                  return (
                    <div key={vital.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-white rounded-lg">
                            <IconComponent className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-gray-900">{vital.type}</p>
                            <p className="text-[11px] text-gray-500">{formatDate(vital.date)}</p>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(vital.status)} text-[10px] px-1.5 py-0.5`}>
                          {vital.status}
                        </Badge>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900 font-outfit">{vital.value}</span>
                        <span className="text-[13px] text-gray-600">{vital.unit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button 
                variant="primary" 
                size="sm" 
                className="w-full mt-3 bg-ocean-mid hover:bg-ocean-mid/90"
                onClick={() => setShowVitalModal(true)}
              >
                <Plus className="w-4 h-4 mr-1" />
                Log New Reading
              </Button>
            </div>
          </div>
        </StaggerItem>

        {/* Wellness Videos */}
        <StaggerItem>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg shadow-sm">
                  <Play className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Wellness Videos</h2>
                  <p className="text-[13px] text-gray-600">Expert guides for healthy living</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {wellnessVideos.map((video) => (
                <div key={video.id} className="card group cursor-pointer hover:shadow-lg transition-shadow px-0 py-0 overflow-hidden">
                  <div 
                    className="relative w-full h-48 bg-gray-900 cursor-pointer"
                    onClick={() => setSelectedVideoId(video.videoId)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 bg-ocean-mid rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] px-2 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="px-4 py-3 space-y-1.5">
                    <Badge className="bg-purple-100 text-purple-700 border-0 text-[11px]">{video.category}</Badge>
                    <h3 className="font-semibold text-gray-900 text-[15px] group-hover:text-ocean-mid transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </StaggerItem>

        {/* Wellness Articles */}
        <StaggerItem>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg shadow-sm">
                  <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Health & Wellness Articles</h2>
                  <p className="text-[13px] text-gray-600">Expert advice for a healthier you</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-ocean-mid">View All →</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockArticles.map((article) => (
                <div key={article.id} className="card group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 px-0 py-0 overflow-hidden">
                  <div className="w-full h-40 bg-gradient-to-br from-ocean-mid via-ocean-mid/90 to-ocean-mid/80 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="px-4 py-3 space-y-2">
                    <Badge className="bg-ocean-mid/10 text-ocean-mid border-0 text-[11px] font-medium">{article.category}</Badge>
                    <h3 className="font-semibold text-gray-900 text-[15px] leading-tight group-hover:text-ocean-mid transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-[13px] text-gray-600 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-[12px] text-gray-500">
                        <span>📖 {article.readTime} min</span>
                        <span>•</span>
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                      <span className="text-ocean-mid text-[12px] font-medium group-hover:translate-x-1 transition-transform inline-block">Read →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </StaggerItem>
        
        {/* Rewards Program */}
        <StaggerItem>
          <div className="card bg-gradient-to-br from-ocean-mid via-ocean-mid to-ocean-mid/95 text-white px-4 py-3 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-xl shadow-lg">
                    <Trophy className="w-6 h-6 text-yellow-900" />
                  </div>
                  <div>
                    <p className="text-cyan-300 text-[11px] uppercase tracking-widest font-semibold">WELLNESS REWARDS</p>
                    <h2 className="text-lg font-bold text-white">Wellness Rewards Program</h2>
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-ocean-mid hover:from-yellow-200 hover:to-yellow-300 font-semibold shadow-lg hover:shadow-xl transition-all flex-shrink-0"
                  onClick={() => setShowRewardsModal(true)}
                >
                  <Gift className="w-3.5 h-3.5 mr-1" />
                  Rewards
                </Button>
              </div>
              <p className="text-white mb-2.5 text-[13px] leading-snug">
                Earn points for healthy activities and unlock exclusive rewards!
              </p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-2 border border-white/20">
                  <p className="text-[10px] text-cyan-300 uppercase tracking-wide font-semibold mb-1">Points</p>
                  <p className="text-xl font-bold text-white">1,250</p>
                  <p className="text-[10px] text-white/70 mt-0.5">+150 week</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-2 border border-white/20">
                  <p className="text-[10px] text-cyan-300 uppercase tracking-wide font-semibold mb-1">Rank</p>
                  <p className="text-base font-semibold text-white">Gold</p>
                  <p className="text-[10px] text-white/70 mt-0.5">Top 15%</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-2 border border-white/20">
                  <p className="text-[10px] text-cyan-300 uppercase tracking-wide font-semibold mb-1">Next</p>
                  <p className="text-base font-semibold text-white">250 pts</p>
                  <p className="text-[10px] text-white/70 mt-0.5">Platinum</p>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* Video Player Modal */}
      {selectedVideoId && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedVideoId(null)}
          title=""
          size="xl"
        >
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
              title="Wellness Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </Modal>
      )}

      {/* Add Vital Modal */}
      <Modal
        isOpen={showVitalModal}
        onClose={() => setShowVitalModal(false)}
        title="Log New Vital Reading"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Vital Type
            </label>
            <select
              value={newVitalType}
              onChange={(e) => setNewVitalType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-mid focus:border-transparent"
            >
              <option value="">Select vital type</option>
              <option value="Blood Pressure">Blood Pressure</option>
              <option value="Heart Rate">Heart Rate</option>
              <option value="Weight">Weight</option>
              <option value="Temperature">Temperature</option>
              <option value="Blood Glucose">Blood Glucose</option>
              <option value="Oxygen Level">Oxygen Level</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Value
            </label>
            <input
              type="text"
              placeholder="e.g., 120/80, 72, 36.5"
              value={newVitalValue}
              onChange={(e) => setNewVitalValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-mid focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={() => setShowVitalModal(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              className="flex-1 bg-ocean-mid hover:bg-ocean-mid/90"
              onClick={handleAddVital}
            >
              Log Reading
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Goal Modal */}
      <Modal
        isOpen={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        title="Add New Health Goal"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Goal Title
            </label>
            <input
              type="text"
              placeholder="e.g., Drink 8 glasses of water daily"
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-mid focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Target Date (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., March 31, 2026 or Ongoing"
              value={newGoalTarget}
              onChange={(e) => setNewGoalTarget(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-mid focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={() => setShowGoalModal(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              className="flex-1 bg-success hover:bg-success/90"
              onClick={handleAddGoal}
            >
              Add Goal
            </Button>
          </div>
        </div>
      </Modal>

      {/* Rewards Catalog Modal */}
      <Modal
        isOpen={showRewardsModal}
        onClose={() => setShowRewardsModal(false)}
        title="Wellness Rewards Catalog"
        size="xl"
      >
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-ocean-mid to-ocean-mid/90 text-white rounded-xl px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-white/80">Available Points</p>
                <p className="text-3xl font-bold font-outfit">1,250</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] text-white/80">Member Status</p>
                <p className="text-xl font-semibold">Gold Member</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                      🎯
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Fitness Tracker</h4>
                      <p className="text-[12px] text-gray-600">Premium smartwatch</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 border-0">500 pts</Badge>
                </div>
                <p className="text-[13px] text-gray-600 mb-3">Track your steps, heart rate, and more with this premium fitness tracker.</p>
                <Button variant="primary" size="sm" className="w-full bg-ocean-mid hover:bg-ocean-mid/90" disabled>
                  Need 500 more points
                </Button>
              </div>

              <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                      🧘
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Yoga Class Pass</h4>
                      <p className="text-[12px] text-gray-600">10 classes included</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-0">300 pts</Badge>
                </div>
                <p className="text-[13px] text-gray-600 mb-3">Unlimited yoga classes at partner studios for one month.</p>
                <Button variant="primary" size="sm" className="w-full bg-ocean-mid hover:bg-ocean-mid/90" disabled>
                  Need 300 more points
                </Button>
              </div>

              <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                      💊
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Vitamin Bundle</h4>
                      <p className="text-[12px] text-gray-600">3-month supply</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 border-0">200 pts</Badge>
                </div>
                <p className="text-[13px] text-gray-600 mb-3">Premium multivitamin and supplement package for optimal health.</p>
                <Button variant="primary" size="sm" className="w-full bg-ocean-mid hover:bg-ocean-mid/90" disabled>
                  Need 200 more points
                </Button>
              </div>

              <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl">
                      🎁
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Gift Card</h4>
                      <p className="text-[12px] text-gray-600">$50 value</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 border-0">150 pts</Badge>
                </div>
                <p className="text-[13px] text-gray-600 mb-3">Use at partner health stores and online wellness retailers.</p>
                <Button variant="primary" size="sm" className="w-full bg-ocean-mid hover:bg-ocean-mid/90" disabled>
                  Need 150 more points
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">💡 How to Earn More Points</h4>
            <ul className="space-y-1 text-[13px] text-gray-600">
              <li>• Complete health assessments: +50 points</li>
              <li>• Log daily activities: +10 points per day</li>
              <li>• Attend preventive care visits: +100 points</li>
              <li>• Participate in wellness challenges: +200 points</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
}
