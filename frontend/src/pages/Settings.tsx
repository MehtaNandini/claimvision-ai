import React, { useState } from 'react';

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [theme, setTheme] = useState('dark');

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
            <button className="px-md py-sm bg-primary text-on-primary rounded-xl flex items-center gap-md hover:opacity-90 transition-opacity font-label-md">
              <span className="material-symbols-outlined text-[18px]">save</span>
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* Settings Sidebar */}
          <div className="lg:col-span-3 flex flex-col gap-sm">
            <button className="text-left px-md py-sm bg-primary-container/10 text-primary font-title-md rounded-lg border-l-2 border-primary">
              My Profile
            </button>
            <button className="text-left px-md py-sm text-on-surface-variant hover:bg-surface-container-highest transition-colors font-title-md rounded-lg border-l-2 border-transparent">
              Notifications
            </button>
            <button className="text-left px-md py-sm text-on-surface-variant hover:bg-surface-container-highest transition-colors font-title-md rounded-lg border-l-2 border-transparent">
              Security & Access
            </button>
            <button className="text-left px-md py-sm text-on-surface-variant hover:bg-surface-container-highest transition-colors font-title-md rounded-lg border-l-2 border-transparent">
              API Integrations
            </button>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-9 flex flex-col gap-xl">
            {/* Profile Section */}
            <div className="glass-panel rounded-xl p-xl">
              <h3 className="font-title-lg text-title-lg border-b border-outline-variant pb-sm mb-lg">Profile Information</h3>
              <div className="flex flex-col md:flex-row gap-xl items-start">
                <div className="flex flex-col items-center gap-md">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxrqwgNUJ6rAjZjEznBrHbESTinAAEk_SCAxadzuLFfhe8ARCu59NzPbt3UVBgBLEpLo8rJP3EPDO4egovqqpU51ZF2THMM_s22z88COObzrBT3sjbbxWAWmr0rIgvi1RZjCfN-DqjZSfy-5vlrufjK3bB0ZzebtUinsNGRCsQQ23qWxJvo6Z0iq9ISnTR_m5x7yfTAHKZ4RNc07lccVfUnjopBNyWI8WrBDRUAJilr0dPdWGMhyWu" 
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary/50"
                  />
                  <button className="text-primary font-label-md hover:underline">Change Photo</button>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-md w-full">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-on-surface-variant">Full Name</label>
                    <input type="text" defaultValue="Alex Rivera" className="bg-surface-container rounded-lg px-4 py-2 text-body-md focus:outline-none focus:ring-1 focus:ring-primary border border-transparent focus:border-primary/50" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-on-surface-variant">Role</label>
                    <input type="text" defaultValue="Senior Adjuster" disabled className="bg-surface-container/50 rounded-lg px-4 py-2 text-body-md text-on-surface-variant cursor-not-allowed border border-transparent" />
                  </div>
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="font-label-md text-on-surface-variant">Email Address</label>
                    <input type="email" defaultValue="arivera@claimvision.ai" className="bg-surface-container rounded-lg px-4 py-2 text-body-md focus:outline-none focus:ring-1 focus:ring-primary border border-transparent focus:border-primary/50" />
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="glass-panel rounded-xl p-xl">
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
                      className={`px-4 py-2 rounded-lg font-label-md border ${theme === 'dark' ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
                    >
                      Dark Theme
                    </button>
                    <button 
                      onClick={() => setTheme('light')}
                      className={`px-4 py-2 rounded-lg font-label-md border ${theme === 'light' ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
                    >
                      Light Theme
                    </button>
                    <button 
                      onClick={() => setTheme('system')}
                      className={`px-4 py-2 rounded-lg font-label-md border ${theme === 'system' ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
                    >
                      System Match
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="border border-error/30 bg-error/5 rounded-xl p-xl">
              <h3 className="font-title-lg text-error mb-sm">Danger Zone</h3>
              <p className="text-body-sm text-on-surface-variant mb-md">Permanently delete your account or wipe active session data.</p>
              <button className="px-md py-sm border border-error text-error hover:bg-error hover:text-white transition-colors rounded-lg font-label-md">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
