"use client";

import { useState } from "react";
import { User, Bell, Lock, CreditCard, Shield } from "lucide-react";
import { Input, Button, Select } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { STATES } from "@/lib/constants";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];
  
  return (
    <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-[16px] text-gray-600 mt-1">
            Manage your account settings and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-white"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="card space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    defaultValue={user?.firstName}
                  />
                  <Input
                    label="Last Name"
                    defaultValue={user?.lastName}
                  />
                </div>
                
                <Input
                  label="Email Address"
                  type="email"
                  defaultValue={user?.email}
                />
                
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="(555) 123-4567"
                />
                
                <Input
                  label="Date of Birth"
                  type="date"
                />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                  
                  <Input
                    label="Street Address"
                    placeholder="123 Main St"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="City" placeholder="Springfield" />
                    <Select
                      label="State"
                      options={STATES.map((state) => ({ label: state, value: state }))}
                    />
                    <Input label="ZIP Code" placeholder="62701" />
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4 border-t">
                  <Button variant="primary">Save Changes</Button>
                  <Button variant="secondary">Cancel</Button>
                </div>
              </div>
            )}
            
            {activeTab === "notifications" && (
              <div className="card space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-[15px] text-gray-600">Receive updates via email</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Claim Updates</p>
                      <p className="text-[15px] text-gray-600">Get notified about claim status changes</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Payment Reminders</p>
                      <p className="text-[15px] text-gray-600">Reminders for upcoming payments</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Wellness Tips</p>
                      <p className="text-[15px] text-gray-600">Health and wellness recommendations</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-gray-900">Marketing Communications</p>
                      <p className="text-[15px] text-gray-600">Promotional offers and news</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button variant="primary">Save Preferences</Button>
                </div>
              </div>
            )}
            
            {activeTab === "security" && (
              <div className="card space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                  
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="••••••••"
                  />
                  
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                  />
                  
                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="••••••••"
                  />
                  
                  <Button variant="primary">Update Password</Button>
                </div>
                
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-[15px] text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                  
                  <Button variant="secondary">Enable 2FA</Button>
                </div>
                
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-900">Active Sessions</h3>
                  <p className="text-[15px] text-gray-600">
                    Manage devices where you&apos;re currently logged in
                  </p>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Windows PC • Chrome</p>
                        <p className="text-[15px] text-gray-600">Current session • Springfield, IL</p>
                      </div>
                      <span className="text-[15px] text-success">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "payment" && (
              <div className="card space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
                
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-primary rounded flex items-center justify-center text-white text-[13px] font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                        <p className="text-[15px] text-gray-600">Expires 12/25</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-danger">Remove</Button>
                    </div>
                  </div>
                </div>
                
                <Button variant="secondary">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            )}
            
            {activeTab === "privacy" && (
              <div className="card space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Share Data for Research</p>
                      <p className="text-[15px] text-gray-600">Help improve healthcare through anonymized data</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Profile Visibility</p>
                      <p className="text-[15px] text-gray-600">Allow providers to see your profile</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="pt-6 border-t space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Data & Privacy</h3>
                  <Button variant="secondary">Download My Data</Button>
                  <Button variant="danger" className="ml-3">Delete Account</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
