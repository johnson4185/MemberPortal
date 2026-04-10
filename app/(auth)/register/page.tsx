"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Lock, ArrowRight, ArrowLeft,
  Check, CreditCard, Calendar, Globe, User, Smartphone,
  Mail, LockKeyholeOpen
} from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import { ROUTES } from "@/lib/constants";

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [password, setPassword] = useState("");
  
  const [formData, setFormData] = useState({
    nationalId: "",
    dob: "",
    nationality: "",
    policyId: "",
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    phoneCountry: "+1",
    email: "",
    language: "English",
    username: "",
    password: "",
    confirmPassword: "",
    terms: false,
    hipaa: false,
    communications: true,
  });

  const totalSteps = 4;
  const stepProgress = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const completeRegistration = () => {
    setCurrentStep(5); // Success screen
  };

  const goToDashboard = () => {
    login(formData.email, formData.password);
    router.push(ROUTES.DASHBOARD);
  };

  const checkPasswordStrength = (pwd: string) => {
    const checks = {
      length: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
    };
    const score = Object.values(checks).filter(Boolean).length;
    return { checks, score };
  };

  const pwdStrength = checkPasswordStrength(password);

  const getBarClass = (index: number) => {
    if (index >= pwdStrength.score) return "bg-border";
    if (pwdStrength.score === 4) return "bg-success";
    if (pwdStrength.score >= 2) return "bg-warning";
    return "bg-danger";
  };

  return (
    <div className="min-h-screen bg-ocean-deep flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-deep via-ocean-dark to-ocean-mid">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(14,165,216,.04) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(14,165,216,.04) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-ocean-base/25 blur-[80px] -top-24 -left-24"
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.05, 0.95, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-ocean-bright/25 blur-[80px] -bottom-20 -right-16"
          animate={{ x: [0, -30, 20, 0], y: [0, 15, -20, 0], scale: [1, 0.95, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: -3 }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-ocean-mid/30 blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ x: [0, 20, -15, 0], y: [0, -15, 20, 0], scale: [1, 1.05, 0.95, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: -5 }}
        />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row rounded-[20px] overflow-hidden shadow-2xl"
        style={{ minHeight: "640px" }}
      >
        {/* Left Panel */}
        <div className="hidden lg:flex w-[380px] flex-shrink-0 bg-gradient-to-br from-ocean-mid via-ocean-dark to-ocean-deep p-10 flex-col relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-ocean-bright/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-ocean-base/30 blur-3xl" />
          
          <div className="flex items-center gap-3 mb-12 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-base to-ocean-bright flex items-center justify-center shadow-lg shadow-ocean-bright/40">
              <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-dm-sans font-extrabold text-white tracking-tight">
              MemberConnect
            </span>
          </div>

          <div className="mb-auto relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-px bg-ocean-light" />
              <span className="text-xs font-bold text-ocean-light tracking-[0.15em] uppercase">
                OUR PROMISE
              </span>
            </div>
            <h2 className="text-[56px] font-dm-sans font-extrabold leading-[1.05] tracking-tight mb-8">
              <span className="text-white/40">Peace</span><br />
              <span className="text-white/40">of mind</span><br />
              <span className="text-white/40">isn&apos;t</span><br />
              <span className="text-white/40">a luxury.</span><br />
              <span className="text-ocean-light">It&apos;s</span><br />
              <span className="text-white">covered.</span>
            </h2>
            <div className="w-12 h-px bg-white/20 mb-6" />
            <p className="text-sm text-white/50 leading-relaxed max-w-[280px]">
              Your health is the one thing that should never wait. We make sure it doesn&apos;t.
            </p>
          </div>

          <div className="relative z-10">
            <p className="text-[11px] text-white/30">
              © 2026 MemberConnect
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white p-6 sm:p-8 lg:p-10 flex flex-col overflow-y-auto" style={{ maxHeight: "680px" }}>
          <div className="mb-6">
            <h1 className="text-[26px] font-dm-sans font-extrabold text-text-primary tracking-tight mb-1.5">
              Create Your Account
            </h1>
            <p className="text-[13.5px] text-text-soft">
              Join thousands of members managing their health insurance online
            </p>
          </div>

          {/* Stepper */}
          {currentStep <= totalSteps && (
            <div className="mb-7">
              <div className="relative flex items-center w-full max-w-[480px] mx-auto">
                <div className="absolute top-[18px] left-[12.5%] right-[12.5%] h-0.5 bg-border/70 z-0 overflow-hidden rounded-full">
                <div
                  className="h-full bg-ocean-base transition-all duration-500 ease-out"
                  style={{ width: `${stepProgress}%` }}
                />
                </div>
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex-1 flex flex-col items-center relative z-10">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-dm-sans font-bold border-2 transition-all duration-300 ease-out ${
                        step < currentStep
                          ? "bg-ocean-base border-ocean-base text-white"
                          : step === currentStep
                          ? "bg-ocean-base border-ocean-base text-white shadow-lg shadow-ocean-bright/20"
                          : "bg-white border-border text-text-muted"
                      } ${
                        step === currentStep
                          ? "scale-105"
                          : step < currentStep
                          ? "scale-100"
                          : "scale-95"
                      }`}
                    >
                      {step < currentStep ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : step}
                    </div>
                    <div
                      className={`text-[11px] font-medium mt-2 text-center transition-colors ${
                        step < currentStep
                          ? "text-success"
                          : step === currentStep
                          ? "text-ocean-base font-semibold"
                          : "text-text-muted"
                      }`}
                    >
                      {[
                        "Identity",
                        "Contact",
                        "Credentials",
                        "Confirm",
                      ][step - 1]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step Panels */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {/* Step 1: Identity */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-base font-dm-sans font-bold text-text-primary">
                      Identity Verification
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-ocean-mist text-ocean-base tracking-wider">
                      STEP 1 OF 4
                    </span>
                  </div>

                  <div className="flex gap-2.5 items-start bg-ocean-mist border border-border rounded-xl p-3 mb-5">
                    <Shield className="w-[15px] h-[15px] flex-shrink-0 mt-0.5 text-ocean-base" />
                    <p className="text-[12.5px] text-ocean-mid">
                      We use your ID to match you with your insurance policy and verify your eligibility.
                    </p>
                  </div>

                  <div className="space-y-4 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                        National ID / Iqama / Passport
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type="text"
                          value={formData.nationalId}
                          onChange={(e) => updateField("nationalId", e.target.value)}
                          placeholder="Enter your ID number"
                          className="w-full h-[46px] pl-11 pr-3.5 bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                          Date of Birth
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="date"
                            value={formData.dob}
                            onChange={(e) => updateField("dob", e.target.value)}
                            className="w-full h-[46px] pl-11 pr-3.5 bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                          Nationality
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="text"
                            value={formData.nationality}
                            onChange={(e) => updateField("nationality", e.target.value)}
                            placeholder="e.g. Indian"
                            className="w-full h-[46px] pl-11 pr-3.5 bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                        Policy / Member ID <span className="font-normal text-text-muted ml-1">(if available)</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type="text"
                          value={formData.policyId}
                          onChange={(e) => updateField("policyId", e.target.value)}
                          placeholder="e.g. MEM-123456 or POL-2024-XXXX"
                          className="w-full h-[46px] pl-11 pr-3.5 bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr] sm:items-center">
                    <button
                      onClick={prevStep}
                      className="h-[46px] w-full px-5 bg-transparent border-[1.5px] border-border rounded-xl text-[13.5px] font-medium text-text-mid hover:border-ocean-bright hover:text-ocean-base transition-all flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="h-[46px] w-full bg-gradient-to-r from-ocean-base to-ocean-bright text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-ocean-base/30 hover:-translate-y-0.5 transition-all"
                    >
                      Continue
                      <ArrowRight className="w-[15px] h-[15px]" strokeWidth={2.5} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contact */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-base font-dm-sans font-bold text-text-primary">
                      Contact Information
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-ocean-mist text-ocean-base tracking-wider">
                      STEP 2 OF 4
                    </span>
                  </div>

                  <div className="space-y-4 mb-5">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => updateField("firstName", e.target.value)}
                            placeholder="Joshua"
                            className="w-full h-[46px] pl-11 pr-3.5 bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                          Last Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => updateField("lastName", e.target.value)}
                            placeholder="Jaison"
                            className="w-full h-[46px] pl-11 pr-3.5 bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={formData.phoneCountry}
                          onChange={(e) => updateField("phoneCountry", e.target.value)}
                          className="h-[46px] w-[110px] px-3 bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none cursor-pointer"
                          aria-label="Country code"
                        >
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+91">+91</option>
                          <option value="+971">+971</option>
                        </select>
                        <div className="relative flex-1">
                          <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => updateField("mobile", e.target.value)}
                            placeholder="Phone number"
                            className="w-full h-[46px] pl-11 pr-[90px] bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none"
                          />
                          <button
                            type="button"
                            className="absolute right-0 top-0 bottom-0 px-3.5 bg-ocean-base text-white rounded-r-xl text-xs font-semibold hover:bg-ocean-bright transition-colors"
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                      <div className="text-[11.5px] text-text-soft mt-1.5">
                        We&apos;ll send an OTP to verify your number
                      </div>
                    </div>


                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                          Gender
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                          <select
                            value={formData.gender}
                            onChange={(e) => updateField("gender", e.target.value)}
                            className="w-full h-[46px] pl-11 pr-3.5 bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none cursor-pointer"
                          >
                            <option value="">Select gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="nonbinary">Non-binary</option>
                            <option value="prefer-not">Prefer not to say</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                          Preferred Language <span className="font-normal text-text-muted ml-1">(for communications)</span>
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                          <select
                            value={formData.language}
                            onChange={(e) => updateField("language", e.target.value)}
                            className="w-full h-[46px] pl-11 pr-3.5 bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none cursor-pointer"
                          >
                            <option>English</option>
                            <option>Arabic</option>
                            <option>Hindi</option>
                            <option>Tagalog</option>
                            <option>Urdu</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="joshua.jaison@company.com"
                          className="w-full h-[46px] pl-11 pr-3.5 bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr] sm:items-center">
                    <button
                      onClick={prevStep}
                      className="h-[46px] w-full px-5 bg-transparent border-[1.5px] border-border rounded-xl text-[13.5px] font-medium text-text-mid hover:border-ocean-bright hover:text-ocean-base transition-all flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="h-[46px] w-full bg-gradient-to-r from-ocean-base to-ocean-bright text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-ocean-base/30 hover:-translate-y-0.5 transition-all"
                    >
                      Continue
                      <ArrowRight className="w-[15px] h-[15px]" strokeWidth={2.5} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Credentials */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-base font-dm-sans font-bold text-text-primary">
                      Create Your Credentials
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-ocean-mist text-ocean-base tracking-wider">
                      STEP 3 OF 4
                    </span>
                  </div>

                  <div className="space-y-4 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                        Username
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type="text"
                          value={formData.username}
                          onChange={(e) => updateField("username", e.target.value)}
                          placeholder="Choose a username"
                          className="w-full h-[46px] pl-11 pr-3.5 bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => {
                            updateField("password", e.target.value);
                            setPassword(e.target.value);
                          }}
                          placeholder="Create a strong password"
                          className="w-full h-[46px] pl-11 pr-11 bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-ocean-base transition-colors"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <LockKeyholeOpen className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </button>
                      </div>

                      <div className="mt-2">
                        <div className="flex gap-1 mb-1.5">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={`flex-1 h-[3px] rounded-full transition-colors ${getBarClass(i)}`} />
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-1 gap-x-3">
                          {[
                            { key: "length", label: "8+ characters" },
                            { key: "upper", label: "Uppercase letter" },
                            { key: "number", label: "Number" },
                            { key: "special", label: "Special character" },
                          ].map(({ key, label }) => (
                            <div
                              key={key}
                              className={`text-[11.5px] flex items-center gap-1.5 transition-colors ${
                                pwdStrength.checks[key as keyof typeof pwdStrength.checks] ? "text-success" : "text-text-muted"
                              }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                  pwdStrength.checks[key as keyof typeof pwdStrength.checks] ? "bg-success" : "bg-border"
                                }`}
                              />
                              {label}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type={showConfirmPwd ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => updateField("confirmPassword", e.target.value)}
                          placeholder="Re-enter your password"
                          className="w-full h-[46px] pl-11 pr-11 bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-ocean-base transition-colors"
                          aria-label={showConfirmPwd ? "Hide password" : "Show password"}
                        >
                          {showConfirmPwd ? <LockKeyholeOpen className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr] sm:items-center">
                    <button
                      onClick={prevStep}
                      className="h-[46px] w-full px-5 bg-transparent border-[1.5px] border-border rounded-xl text-[13.5px] font-medium text-text-mid hover:border-ocean-bright hover:text-ocean-base transition-all flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="h-[46px] w-full bg-gradient-to-r from-ocean-base to-ocean-bright text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-ocean-base/30 hover:-translate-y-0.5 transition-all"
                    >
                      Continue
                      <ArrowRight className="w-[15px] h-[15px]" strokeWidth={2.5} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirm */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-base font-dm-sans font-bold text-text-primary">
                      Review & Confirm
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-ocean-mist text-ocean-base tracking-wider">
                      STEP 4 OF 4
                    </span>
                  </div>

                  <div className="bg-surface-alt border border-border rounded-xl p-3.5 max-h-[120px] overflow-y-auto text-xs text-text-soft leading-relaxed mb-3.5">
                    <strong className="text-text-primary">MemberConnect Terms of Service</strong>
                    <br /><br />
                    By creating an account you agree to our terms. Your health data is protected under applicable privacy laws including HIPAA. We collect only necessary information to verify your identity and connect you with your insurance benefits.
                    <br /><br />
                    You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately of any unauthorized access. We may update these terms, and continued use constitutes acceptance.
                    <br /><br />
                    Your personal data will not be shared with third parties except as required for claims processing and as permitted by law.
                  </div>

                  <div className="space-y-3 mb-5">
                    <label className="flex items-start gap-2.5 text-[13px] text-text-mid cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.terms}
                        onChange={(e) => updateField("terms", e.target.checked)}
                        className="w-[15px] h-[15px] accent-ocean-base flex-shrink-0 mt-0.5"
                      />
                      <span>
                        I have read and agree to the{" "}
                        <a href="#" className="text-ocean-base font-medium hover:text-ocean-bright">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-ocean-base font-medium hover:text-ocean-bright">
                          Privacy Policy
                        </a>
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 text-[13px] text-text-mid cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hipaa}
                        onChange={(e) => updateField("hipaa", e.target.checked)}
                        className="w-[15px] h-[15px] accent-ocean-base flex-shrink-0 mt-0.5"
                      />
                      <span>
                        I consent to the collection and processing of my health information under HIPAA guidelines
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 text-[13px] text-text-mid cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.communications}
                        onChange={(e) => updateField("communications", e.target.checked)}
                        className="w-[15px] h-[15px] accent-ocean-base flex-shrink-0 mt-0.5"
                      />
                      <span>
                        Send me claim updates, policy reminders, and wellness tips via SMS & email
                      </span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr] sm:items-center">
                    <button
                      onClick={prevStep}
                      className="h-[46px] w-full px-5 bg-transparent border-[1.5px] border-border rounded-xl text-[13.5px] font-medium text-text-mid hover:border-ocean-bright hover:text-ocean-base transition-all flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
                      Back
                    </button>
                    <button
                      onClick={completeRegistration}
                      disabled={!formData.terms || !formData.hipaa}
                      className="h-[46px] w-full bg-gradient-to-r from-ocean-base to-ocean-bright text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-ocean-base/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      <Check className="w-[15px] h-[15px]" strokeWidth={2.5} />
                      Complete Registration
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Success Screen */}
              {currentStep === 5 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center py-5"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className="w-[72px] h-[72px] rounded-full bg-success/10 flex items-center justify-center mb-5"
                  >
                    <Check className="w-9 h-9 text-success" strokeWidth={2.5} />
                  </motion.div>

                  <h2 className="text-[22px] font-dm-sans font-extrabold text-text-primary mb-2">
                    You&apos;re all set! 🎉
                  </h2>
                  <p className="text-[13.5px] text-text-soft leading-relaxed max-w-[320px] mb-5">
                    Your MemberConnect account has been created. Here&apos;s what happens next:
                  </p>

                  <div className="bg-surface-alt border border-border rounded-xl p-4 w-full text-left mb-5">
                    {[
                      { num: 1, title: "Verification email sent", text: "Click the link in your inbox to confirm your email address" },
                      { num: 2, title: "Policy linking", text: "We'll match your ID with your insurer within 24 hours" },
                      { num: 3, title: "Access your benefits", text: "Submit claims, find providers, and view your coverage" },
                    ].map(({ num, title, text }) => (
                      <div key={num} className="flex gap-3 items-start mb-3 last:mb-0">
                        <div className="w-6 h-6 rounded-full bg-ocean-base text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                          {num}
                        </div>
                        <div className="text-[13px] text-text-mid leading-snug">
                          <strong className="text-text-primary">{title}</strong> — {text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={goToDashboard}
                    className="w-full max-w-[300px] h-12 bg-gradient-to-r from-ocean-base to-ocean-bright text-white rounded-xl text-[14.5px] font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-ocean-base/30 hover:-translate-y-0.5 transition-all"
                  >
                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    Go to My Dashboard
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="text-center text-[13px] text-text-soft mt-4 pt-4 border-t border-border">
            Already have an account?{" "}
            <button
              onClick={() => router.push(ROUTES.LOGIN)}
              className="font-semibold text-ocean-base hover:text-ocean-bright transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
