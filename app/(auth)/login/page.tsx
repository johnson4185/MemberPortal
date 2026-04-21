"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Lock, Mail, LockKeyholeOpen, ArrowRight, Send, X, KeyRound
} from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import { ROUTES } from "@/lib/constants";

const loginSchema = z.object({
  identifier: z.string().optional(),
  password: z.string().optional(),
  otp: z.string().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(0);
  const [loginMode, setLoginMode] = useState<"standard" | "corporate" | "otp">("standard");

  const { register, handleSubmit, control } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const identifierValue = useWatch({ control, name: "identifier" });

  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpTimer]);

  const handleSendOTP = () => {
    setLoginMode("otp");
    setOtpSent(true);
    setOtpValues(["", "", "", "", "", ""]);
    setOtpTimer(600);
  };

  const handleCancelOTP = () => {
    setOtpSent(false);
    setOtpValues(["", "", "", "", "", ""]);
    setOtpTimer(0);
  };

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const onSubmit = async (data: LoginForm) => {
    setLoginError("");

    try {
      if (loginMode === "otp") {
        if (!otpSent || otpValues.join("") !== "123456") {
          setLoginError("Invalid one-time code. Try 123456 in demo mode.");
          return;
        }

        await login(data.identifier || "otp-user", "demo-password");
        router.push(ROUTES.DASHBOARD);
        return;
      }

      if (loginMode === "corporate") {
        if (!data.identifier) {
          setLoginError("Enter phone, email, or company ID.");
          return;
        }

        await login(data.identifier, "demo-password");
        router.push(ROUTES.DASHBOARD);
        return;
      }

      if (!data.identifier || !data.password) {
        setLoginError("Enter both identifier and password.");
        return;
      }

      await login(data.identifier, data.password);
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      console.error("Login submit failed:", error);
      setLoginError("Sign in failed. In Vercel, set NEXT_PUBLIC_USE_MOCK=true unless your backend is live.");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
        className="relative z-10 w-full max-w-[1100px] mx-auto flex flex-row flex-nowrap rounded-[20px] overflow-hidden shadow-2xl"
        style={{ minHeight: "600px" }}
      >
        {/* Left Panel */}
        <div className="w-[420px] flex-shrink-0 bg-gradient-to-br from-ocean-mid via-ocean-dark to-ocean-deep p-12 flex flex-col relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-ocean-bright/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-ocean-base/30 blur-3xl" />
          
          <div className="flex items-center gap-3 mb-12 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-base to-ocean-bright flex items-center justify-center shadow-lg shadow-ocean-bright/40">
              <Lock className="w-5 h-5 text-white" strokeWidth={2.5} />
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
        <div className="flex-1 bg-white p-12 flex flex-col">
          <div className="mb-8">
            <h1 className="text-[26px] font-dm-sans font-extrabold text-text-primary tracking-tight mb-1.5">
              Welcome back
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[13px] font-semibold text-text-mid">
                  Sign in as
                </label>
                <div className="inline-flex rounded-full border border-border bg-white p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setLoginMode("standard")}
                    className={`px-3 py-1 rounded-full font-semibold transition-all ${
                      loginMode === "standard"
                        ? "bg-ocean-base text-white"
                        : "text-text-muted hover:text-text-mid"
                    }`}
                  >
                    Member
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMode("corporate")}
                    className={`px-3 py-1 rounded-full font-semibold transition-all ${
                      loginMode === "corporate"
                        ? "bg-ocean-base text-white"
                        : "text-text-muted hover:text-text-mid"
                    }`}
                  >
                    Corporate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                  {loginMode === "corporate"
                    ? "Phone, Email, or Company ID"
                    : "Email, Phone, or Member ID"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                  <input
                    type="text"
                    {...register("identifier")}
                    autoComplete="username"
                    placeholder={
                      loginMode === "corporate"
                        ? "Enter phone, email, or company ID"
                        : "Enter your email, phone, or member ID"
                    }
                    className="w-full h-[46px] pl-11 pr-3.5 bg-white border-[1.5px] border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Password Option */}
            <div className="mb-3">
              <label className="block text-[13px] font-semibold text-text-mid mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  autoComplete="current-password"
                  placeholder="Enter your password"
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
            </div>

            <div className="flex items-center justify-between mb-5">
              <label className="flex items-center gap-2 text-[13px] text-text-soft cursor-pointer">
                <input type="checkbox" className="w-[15px] h-[15px] accent-ocean-base" />
                Remember me
              </label>
              <button type="button" className="text-[13px] font-medium text-ocean-base hover:text-ocean-bright transition-colors">
                Forgot password?
              </button>
            </div>

            {loginError && (
              <p className="mb-4 rounded-lg border border-danger/25 bg-danger-light px-3 py-2 text-[13px] text-danger">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              onClick={() => setLoginMode(loginMode === "otp" ? "standard" : loginMode)}
              className="w-full h-12 bg-gradient-to-r from-ocean-base to-ocean-bright text-white rounded-xl text-[14.5px] font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-ocean-base/30 hover:-translate-y-0.5 transition-all shadow-md shadow-ocean-base/20 mb-6"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              Sign In
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-text-muted font-medium">OR USE ONE-TIME CODE</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* OTP Section */}
            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={!identifierValue?.trim()}
                className="w-full h-12 bg-white border-[1.5px] border-border rounded-xl text-sm font-semibold text-text-mid hover:border-ocean-base hover:text-ocean-base hover:bg-ocean-mist/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                Send verification code
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4"
              >
                <div className="bg-ocean-mist/50 border border-ocean-base/20 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-ocean-base animate-pulse" />
                    <p className="text-xs text-ocean-mid">
                      Code sent! Expires in <span className="font-semibold">{formatTime(otpTimer)}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCancelOTP}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ocean-mid hover:text-ocean-base hover:bg-ocean-mist/80 transition-colors"
                    aria-label="Close verification"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-text-mid mb-2">
                    Enter 6-digit code
                  </label>
                  <div className="grid grid-cols-6 gap-2 w-full max-w-[360px]">
                    {otpValues.map((val, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength={1}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        value={val}
                        onChange={(e) => handleOTPChange(idx, e.target.value)}
                        className="h-[52px] text-center text-xl font-dm-sans font-bold border-[1.5px] border-border rounded-xl bg-white text-text-primary focus:border-ocean-bright focus:ring-4 focus:ring-ocean-bright/12 transition-all outline-none caret-ocean-base"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={otpTimer > 540}
                    className="text-ocean-base hover:text-ocean-bright font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Resend code
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelOTP}
                    className="text-text-soft hover:text-text-mid"
                  >
                    Cancel
                  </button>
                </div>

                <button
                  type="submit"
                  onClick={() => setLoginMode("otp")}
                  className="w-full h-12 bg-gradient-to-r from-ocean-base to-ocean-bright text-white rounded-xl text-[14.5px] font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-ocean-base/30 hover:-translate-y-0.5 transition-all shadow-md shadow-ocean-base/20"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                  Verify & Sign In
                </button>
              </motion.div>
            )}

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-text-muted">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button
              type="button"
              className="w-full h-[46px] bg-transparent border-[1.5px] border-border rounded-xl text-[13.5px] font-medium text-text-mid hover:border-ocean-bright hover:text-ocean-base hover:bg-ocean-mist transition-all flex items-center justify-center gap-2 mb-5"
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="text-center text-[13px] text-text-soft mt-5">
              New to MemberConnect?{" "}
              <button
                type="button"
                onClick={() => router.push(ROUTES.REGISTER)}
                className="font-semibold text-ocean-base hover:text-ocean-bright transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
