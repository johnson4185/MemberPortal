"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, ChevronDown, LogOut, Settings, X, Trash2, Archive, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { ROUTES } from "@/lib/constants";

interface NavbarProps {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const notifications = [
    {
      id: 1,
      title: "Claim Approved",
      message: "Your claim #CLM-2024-001 has been approved",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Payment Due",
      message: "Your monthly premium payment is due in 3 days",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "New Message",
      message: "Support team replied to your ticket",
      time: "1 day ago",
      unread: false,
    },
  ];
  
  const unreadCount = notifications.filter((n) => n.unread).length;
  
  const getInitials = () => {
    if (!user) return "U";
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };
  
  return (
    <header className="sticky top-0 z-50 h-[60px] bg-background/90 backdrop-blur-[14px] border-b border-border flex items-center justify-between px-7 gap-4">
      {/* Search */}
      <div className="flex-1 max-w-[420px]">
        <div className="relative h-11 bg-card border border-border rounded-lg flex items-center px-4 gap-2.5 transition-all focus-within:border-ocean-bright focus-within:shadow-[0_0_0_3px_rgba(14,165,216,0.12)]">
          <Search className="w-4 h-4 text-text-secondary flex-shrink-0" />
          <input
            type="text"
            placeholder="Search claims, policies, providers…"
            className="flex-1 border-none outline-none bg-transparent text-[15px] text-text-primary placeholder:text-text-secondary"
          />
        </div>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center gap-2.5">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <motion.button
            onClick={() => setShowNotifications(!showNotifications)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-11 h-11 rounded-lg bg-card border border-border flex items-center justify-center text-text-soft text-[14px] cursor-pointer transition-all hover:border-ocean-bright hover:text-ocean-base"
          >
            <Bell className="w-[17px] h-[17px]" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-[7px] right-[7px] w-[7px] h-[7px] bg-danger rounded-full border-2 border-card"
              />
            )}
          </motion.button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-card rounded-xl shadow-lg border border-border py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-border">
                  <h3 className="font-semibold text-text-primary">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "px-4 py-3 hover:bg-background cursor-pointer transition-colors",
                        notification.unread && "bg-info/5"
                      )}
                    >
                      <p className="font-medium text-[16px] text-text-primary">
                        {notification.title}
                      </p>
                      <p className="text-[15px] text-text-secondary mt-1">
                        {notification.message}
                      </p>
                      <p className="text-[14px] text-text-secondary mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-border flex items-center justify-between">
                  <button 
                    onClick={() => {
                      setShowAllNotifications(true);
                      setShowNotifications(false);
                    }}
                    className="text-[15px] text-primary hover:text-primary-dark font-medium"
                  >
                    View all notifications
                  </button>
                  <button 
                    className="text-[13px] text-text-soft hover:text-ocean-base font-medium flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <motion.button
            onClick={() => setShowUserMenu(!showUserMenu)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 h-11 pl-1.5 pr-3 bg-card border border-border rounded-lg cursor-pointer transition-colors hover:border-ocean-bright"
          >
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                width={32}
                height={32}
                className="rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 min-w-[32px] min-h-[32px] bg-gradient-to-br from-ocean-base to-ocean-bright rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[12px] font-bold text-white leading-none">{getInitials()}</span>
              </div>
            )}
            <div className="text-left hidden lg:block min-w-0">
              <p className="text-[13px] font-medium text-text-primary truncate leading-tight">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-[11px] text-text-soft truncate mt-0.5">{user?.email}</p>
            </div>
            <ChevronDown className="w-2.5 h-2.5 text-text-muted ml-0.5 hidden lg:block flex-shrink-0" />
          </motion.button>
          
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-lg border border-border py-2 z-50"
              >
                <Link
                  href={ROUTES.SETTINGS}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-background transition-colors"
                >
                  <Settings className="w-[19px] h-[19px] text-text-secondary" />
                  <span className="text-[16px] text-text-primary">Settings</span>
                </Link>
                <div className="border-t border-border my-2" />
                <button
                  onClick={() => {
                    logout();
                    router.push(ROUTES.LOGIN);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-background transition-colors w-full text-left"
                >
                  <LogOut className="w-[19px] h-[19px] text-text-secondary" />
                  <span className="text-[16px] text-text-primary">Sign out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Full Notifications Modal */}
      <AnimatePresence>
        {showAllNotifications && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAllNotifications(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-[70] flex items-start justify-center pt-20 p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-2xl max-h-[calc(100vh-120px)] flex flex-col pointer-events-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
                  <div>
                    <h2 className="text-xl font-bold text-text-primary">All Notifications</h2>
                    <p className="text-[14px] text-text-soft mt-0.5">{unreadCount} unread</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllNotifications(false);
                    }}
                    className="w-9 h-9 rounded-lg hover:bg-background flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 text-text-soft" />
                  </button>
                </div>
                
                {/* Actions Bar */}
                <div className="flex items-center gap-2 px-6 py-3 border-b border-border bg-background/50 flex-shrink-0">
                  <button className="text-[13px] text-ocean-base hover:text-ocean-dark font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-ocean-mist transition-colors">
                    <CheckCheck className="w-4 h-4" />
                    Mark all as read
                  </button>
                  <button className="text-[13px] text-text-soft hover:text-danger font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-danger/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Delete all
                  </button>
                  <button className="text-[13px] text-text-soft hover:text-text-mid font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-background transition-colors">
                    <Archive className="w-4 h-4" />
                    Archive all
                  </button>
                </div>
                
                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "px-6 py-4 border-b border-border hover:bg-background transition-colors group",
                        notification.unread && "bg-info/5"
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-[16px] text-text-primary">
                              {notification.title}
                            </p>
                            {notification.unread && (
                              <span className="w-2 h-2 bg-ocean-base rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-[15px] text-text-secondary mt-1">
                            {notification.message}
                          </p>
                          <p className="text-[13px] text-text-soft mt-2">
                            {notification.time}
                          </p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="w-8 h-8 rounded-lg hover:bg-danger/10 flex items-center justify-center transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-danger" />
                          </button>
                          <button
                            className="w-8 h-8 rounded-lg hover:bg-background flex items-center justify-center transition-colors"
                            title="Archive"
                          >
                            <Archive className="w-4 h-4 text-text-soft" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
