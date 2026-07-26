import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';

export default function Settings() {
  const { user, setUser } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  // Profile State
  const [profile, setProfile] = useState(user);

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    // Simulate API call
    setTimeout(() => {
      setUser(profile); // Update global state
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1200);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar pt-4 bg-background">
      <div className="p-xl max-w-[1600px] mx-auto pb-[100px]">
        {/* Page Header */}
        <div className="mb-xl flex items-end justify-between">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-background">System Settings</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Manage your profile, preferences, and platform integrations.</p>
          </div>
          <div className="flex gap-sm">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`px-md py-sm rounded-xl flex items-center gap-md transition-all font-label-md ${
                saveSuccess 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                  : 'bg-primary text-on-primary hover:opacity-90'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${isSaving ? 'animate-spin' : ''}`}>
                {isSaving ? 'autorenew' : saveSuccess ? 'check' : 'save'}
              </span>
              {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* Settings Sidebar */}
          <div className="lg:col-span-3 flex flex-col gap-sm">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`text-left px-md py-sm font-title-md rounded-lg border-l-2 transition-colors ${
                activeTab === 'profile' 
                  ? 'bg-primary-container/10 text-primary border-primary' 
                  : 'text-on-surface-variant hover:bg-surface-container-highest border-transparent'
              }`}
            >
              My Profile
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`text-left px-md py-sm font-title-md rounded-lg border-l-2 transition-colors ${
                activeTab === 'notifications' 
                  ? 'bg-primary-container/10 text-primary border-primary' 
                  : 'text-on-surface-variant hover:bg-surface-container-highest border-transparent'
              }`}
            >
              Notifications & Theme
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`text-left px-md py-sm font-title-md rounded-lg border-l-2 transition-colors ${
                activeTab === 'security' 
                  ? 'bg-primary-container/10 text-primary border-primary' 
                  : 'text-on-surface-variant hover:bg-surface-container-highest border-transparent'
              }`}
            >
              Security & Access
            </button>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-9 flex flex-col gap-xl">
            
            {activeTab === 'profile' && (
              <div className="glass-panel rounded-xl p-xl animate-fade-in">
                <h3 className="font-title-lg text-title-lg border-b border-outline-variant pb-sm mb-lg">Profile Information</h3>
                <div className="flex flex-col md:flex-row gap-xl items-start">
                  <div className="flex flex-col items-center gap-md">
                    <img 
                      src={profile.photo} 
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-primary/50"
                    />
                    <label className="text-primary font-label-md hover:underline cursor-pointer">
                      Change Photo
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setProfile({ ...profile, photo: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }} 
                      />
                    </label>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-md w-full">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-md text-on-surface-variant">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={profile.name} 
                        onChange={handleProfileChange}
                        className="bg-surface-container rounded-lg px-4 py-2 text-body-md focus:outline-none focus:ring-1 focus:ring-primary border border-transparent focus:border-primary/50 transition-colors" 
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-label-md text-on-surface-variant">Role</label>
                      <input 
                        type="text" 
                        name="role"
                        value={profile.role} 
                        onChange={handleProfileChange}
                        className="bg-surface-container rounded-lg px-4 py-2 text-body-md focus:outline-none focus:ring-1 focus:ring-primary border border-transparent focus:border-primary/50 transition-colors" 
                      />
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="font-label-md text-on-surface-variant">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={profile.email} 
                        onChange={handleProfileChange}
                        className="bg-surface-container rounded-lg px-4 py-2 text-body-md focus:outline-none focus:ring-1 focus:ring-primary border border-transparent focus:border-primary/50 transition-colors" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="glass-panel rounded-xl p-xl animate-fade-in">
                <h3 className="font-title-lg text-title-lg border-b border-outline-variant pb-sm mb-lg">Preferences</h3>
                <div className="flex flex-col gap-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-title-md">Email Notifications</h4>
                      <p className="text-body-sm text-on-surface-variant">Receive daily digests and high-risk alerts via email.</p>
                    </div>
                    <button 
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${emailNotifications ? 'bg-primary' : 'bg-surface-variant'}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${emailNotifications ? 'left-7' : 'left-1'}`}></span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-title-md">SMS Alerts</h4>
                      <p className="text-body-sm text-on-surface-variant">Immediate text message for critical system errors.</p>
                    </div>
                    <button 
                      onClick={() => setSmsAlerts(!smsAlerts)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${smsAlerts ? 'bg-primary' : 'bg-surface-variant'}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${smsAlerts ? 'left-7' : 'left-1'}`}></span>
                    </button>
                  </div>
                  
                  <div className="h-px bg-outline-variant/30 my-2"></div>

                  <div className="flex flex-col gap-sm">
                    <h4 className="font-title-md">Interface Theme</h4>
                    <div className="flex gap-md">
                      <button 
                        onClick={() => setTheme('dark')}
                        className={`px-4 py-2 rounded-lg font-label-md border transition-all ${theme === 'dark' ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
                      >
                        Dark Theme
                      </button>
                      <button 
                        onClick={() => setTheme('light')}
                        className={`px-4 py-2 rounded-lg font-label-md border transition-all ${theme === 'light' ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
                      >
                        Light Theme
                      </button>
                      <button 
                        onClick={() => setTheme('system')}
                        className={`px-4 py-2 rounded-lg font-label-md border transition-all ${theme === 'system' ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
                      >
                        System Match
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="animate-fade-in flex flex-col gap-xl">
                <div className="glass-panel rounded-xl p-xl">
                  <h3 className="font-title-lg text-title-lg border-b border-outline-variant pb-sm mb-lg">Access Management</h3>
                  <div className="flex flex-col gap-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-title-md text-on-surface">Password</h4>
                        <p className="text-body-sm text-on-surface-variant">Last changed 90 days ago.</p>
                      </div>
                      <button className="px-md py-sm bg-surface-container hover:bg-surface-container-highest transition-colors rounded-lg font-label-md text-primary border border-primary/30">
                        Update Password
                      </button>
                    </div>
                    <div className="h-px bg-outline-variant/30 my-1"></div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-title-md text-on-surface">Two-Factor Authentication</h4>
                        <p className="text-body-sm text-on-surface-variant">Protect your account with an extra layer of security.</p>
                      </div>
                      <button className="px-md py-sm bg-primary text-on-primary hover:opacity-90 transition-colors rounded-lg font-label-md">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="border border-error/30 bg-error/5 rounded-xl p-xl">
                  <h3 className="font-title-lg text-error mb-sm">Danger Zone</h3>
                  <p className="text-body-sm text-on-surface-variant mb-md">Permanently delete your account or wipe active session data.</p>
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to deactivate your account? This action cannot be undone.')) {
                        alert('Account deactivation initiated.');
                      }
                    }}
                    className="px-md py-sm border border-error text-error hover:bg-error hover:text-white transition-colors rounded-lg font-label-md"
                  >
                    Deactivate Account
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
