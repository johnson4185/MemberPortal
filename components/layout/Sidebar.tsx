"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  FileCheck,
  Hospital,
  CreditCard,
  HeadphonesIcon,
  Heart,
  Settings,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { useAuthStore } from "@/lib/store/authStore";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const mainNavigation = [
  { name: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: "Claims", href: ROUTES.CLAIMS, icon: FileText },
  { name: "Policy", href: ROUTES.POLICY, icon: FileCheck },
  { name: "Providers", href: ROUTES.PROVIDERS, icon: Hospital },
  { name: "ID Card", href: ROUTES.ID_CARD, icon: BadgeCheck },
  { name: "Telemedicine", href: ROUTES.TELEMEDICINE, icon: Video },
  { name: "Payments", href: ROUTES.PAYMENTS, icon: CreditCard },
];

const helpNavigation = [
  { name: "Support", href: ROUTES.SUPPORT, icon: HeadphonesIcon },
  { name: "Wellness", href: ROUTES.WELLNESS, icon: Heart },
  { name: "Settings", href: ROUTES.SETTINGS, icon: Settings },
];

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  
  const getInitials = () => {
    if (!user) return "U";
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };
  
  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 70 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-ocean-mid z-40 flex flex-col border-r border-ocean-bright/10 overflow-hidden"
    >
      <div className="h-full overflow-y-auto flex flex-col">
        {/* Logo */}
        <div className="flex items-center justify-start px-5 py-6 border-b border-white/[0.06]">
          <motion.span
            initial={{ opacity: 1 }}
            animate={{
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : "auto",
            }}
            transition={{ duration: 0.2 }}
            className="font-syne text-[18px] font-bold text-white tracking-tight whitespace-nowrap overflow-hidden"
          >
            MemberConnect
          </motion.span>
        </div>
      
      {/* Main Navigation */}
      <nav className="flex-1 px-3 pt-5 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: isCollapsed ? 0 : 1, height: isCollapsed ? 0 : "auto" }}
          transition={{ duration: 0.2 }}
          className="px-3 pb-3 pt-2 overflow-hidden"
        >
          <span className="text-[12px] uppercase tracking-wider text-white/20 font-semibold">Menu</span>
        </motion.div>
        <ul className="space-y-1">
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(255,255,255,.06)" }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-all relative",
                      isActive
                        ? "bg-gradient-to-r from-ocean-bright/20 to-ocean-bright/[0.06] text-white font-medium"
                        : "text-white/45 hover:text-white/80",
                      isCollapsed && "justify-center"
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    {isActive && !isCollapsed && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-ocean-bright rounded-r-full" 
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                    <motion.span 
                      initial={{ opacity: 1 }}
                      animate={{ 
                        opacity: isCollapsed ? 0 : 1,
                        width: isCollapsed ? 0 : "auto"
                      }}
                      transition={{ duration: 0.2 }}
                      className="text-[16px] whitespace-nowrap overflow-hidden"
                    >
                      {item.name}
                    </motion.span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Help Section */}
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: isCollapsed ? 0 : 1, height: isCollapsed ? 0 : "auto" }}
          transition={{ duration: 0.2 }}
          className="px-3 pb-3 pt-6 overflow-hidden"
        >
          <span className="text-[12px] uppercase tracking-wider text-white/20 font-semibold">Help</span>
        </motion.div>
        <ul className="space-y-1">
          {helpNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(255,255,255,.06)" }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "flex items-center gap-2.5 px-3.5 py-2 mx-2 rounded-lg transition-all relative",
                      isActive
                        ? "bg-gradient-to-r from-ocean-bright/20 to-ocean-bright/[0.06] text-white font-medium"
                        : "text-white/45 hover:text-white/80",
                      isCollapsed && "justify-center"
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    {isActive && !isCollapsed && (
                      <div className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-ocean-bright rounded-r-full" />
                    )}
                    <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                    <motion.span 
                      initial={{ opacity: 1 }}
                      animate={{ 
                        opacity: isCollapsed ? 0 : 1,
                        width: isCollapsed ? 0 : "auto"
                      }}
                      transition={{ duration: 0.2 }}
                      className="text-[15px] whitespace-nowrap overflow-hidden"
                    >
                      {item.name}
                    </motion.span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* User Profile */}
      <div className="mt-auto border-t border-white/[0.06] p-4">
        <motion.div
          whileHover={{ backgroundColor: "rgba(255,255,255,.06)" }}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors",
            isCollapsed && "justify-center px-2"
          )}
        >
          <div className="w-[36px] h-[36px] bg-gradient-to-br from-ocean-base to-ocean-bright rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-[14px] font-bold text-white tracking-wide">{getInitials()}</span>
          </div>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ 
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : "auto"
            }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-w-0 overflow-hidden"
          >
            <div className="text-[15px] font-medium text-white truncate">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-[13px] text-white/35 truncate">{user?.email}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <MoreVertical className="w-3.5 h-3.5 text-white/25 flex-shrink-0" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Toggle Button - Bottom Right */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(14, 165, 216, 1)" }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-6 right-4 w-8 h-8 bg-ocean-base rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50 border border-ocean-bright/20"
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </motion.div>
      </motion.button>
      </div>
    </motion.div>
  );
}
