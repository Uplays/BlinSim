
import React from 'react';
import GlassmorphicCard from './GlassmorphicCard';
import { AppName, AppWindow } from '../types';
import { DOCK_APPS } from '../constants';
import { User } from '../types';
import Button from './Button';

interface DockProps {
  onAppClick: (appName: AppName) => void;
  activeApps: AppName[];
  loggedInUser: User | null;
  onLogout: () => void;
  minimizedWindows: AppWindow[];
  onRestore: (appId: string) => void;
  onStartMenuToggle: () => void;
}

const Dock: React.FC<DockProps> = ({ onAppClick, activeApps, loggedInUser, onLogout, minimizedWindows, onRestore, onStartMenuToggle }) => {
  const [showSystemTooltip, setShowSystemTooltip] = React.useState<string | null>(null);
  return (
    <div className="fixed bottom-6 left-0 right-0 z-[9999] flex justify-center pointer-events-none">
      <GlassmorphicCard className="pointer-events-auto px-3 py-2 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl mx-4 w-auto min-w-[600px] max-w-[95vw] transition-all duration-300 hover:bg-black/50 hover:border-white/20 hover:shadow-blue-500/10">

        {/* Left side - Start Button & System Icons */}
        <div className="flex items-center gap-3 w-1/3">
          {/* Start Button */}
          <button
            onClick={onStartMenuToggle}
            className="p-1.5 rounded-xl hover:bg-white/10 transition-all duration-300 group flex items-center gap-2 active:scale-95"
            title="Start Menu"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
              <span className="text-white font-bold text-[10px] tracking-widest">BLIN</span>
            </div>
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-white/10 mx-1"></div>

          {/* System Icons (Moved to Left) */}
          <div className="relative flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
            <button
              className="hover:scale-110 transition-transform"
              title="WiFi Connected"
              onMouseEnter={() => setShowSystemTooltip('wifi')}
              onMouseLeave={() => setShowSystemTooltip(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
            </button>
            <button
              className="hover:scale-110 transition-transform"
              title="Volume: 75%"
              onMouseEnter={() => setShowSystemTooltip('volume')}
              onMouseLeave={() => setShowSystemTooltip(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            </button>
            <button
              className="hover:scale-110 transition-transform"
              title="Battery: 85%"
              onMouseEnter={() => setShowSystemTooltip('battery')}
              onMouseLeave={() => setShowSystemTooltip(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line></svg>
            </button>

            {/* Tooltip */}
            {showSystemTooltip && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/95 text-white text-xs font-medium rounded-lg border border-white/10 shadow-xl backdrop-blur-sm whitespace-nowrap pointer-events-none">
                {showSystemTooltip === 'wifi' && 'WiFi: Connected'}
                {showSystemTooltip === 'volume' && 'Volume: 75%'}
                {showSystemTooltip === 'battery' && 'Battery: 85%'}
              </div>
            )}
          </div>
        </div>

        {/* Center - App Icons */}
        <div className="flex items-center justify-center gap-1.5 flex-1">
          {DOCK_APPS.map((app) => (
            <div
              key={app.name}
              className={`relative group p-2 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:-translate-y-1
              ${activeApps.includes(app.name) ? 'bg-white/5 shadow-inner' : ''}`}
              onClick={() => onAppClick(app.name)}
              title={app.name}
            >
              <div className="transform transition-transform duration-300 group-hover:scale-105 drop-shadow-md">
                {app.icon}
              </div>
              {activeApps.includes(app.name) && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,1)] transition-all duration-300 group-hover:w-4 group-hover:h-0.5 group-hover:rounded-full"></span>
              )}
              {/* Tooltip */}
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/90 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap border border-white/10 shadow-xl backdrop-blur-sm translate-y-2 group-hover:translate-y-0">
                {app.name}
              </span>
            </div>
          ))}

          {/* Separator if there are minimized windows */}
          {minimizedWindows.length > 0 && (
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2"></div>
          )}

          {/* Minimized Windows */}
          {minimizedWindows.map((win) => (
            <div
              key={win.id}
              className="relative group p-2 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-105"
              onClick={() => onRestore(win.id)}
              title={`Restore ${win.title}`}
            >
              <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                {win.icon && React.cloneElement(win.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, { className: 'w-6 h-6 text-white drop-shadow-sm' })}
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_5px_rgba(250,204,21,0.6)]"></span>
            </div>
          ))}
        </div>

        {/* Right side - Clock & User */}
        <div className="flex items-center justify-end gap-4 w-1/3">
          {/* Clock & Date */}
          <div className="hidden sm:flex flex-col items-end px-3 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-default group">
            <span className="text-sm font-medium text-white leading-none group-hover:text-blue-200 transition-colors">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="text-[10px] text-white/60 leading-none mt-1 group-hover:text-white/90 transition-colors">{new Date().toLocaleDateString()}</span>
          </div>

          {/* User Profile */}
          {loggedInUser && (
            <div className="flex items-center gap-3 pl-3 border-l border-white/10">
              <img
                src={loggedInUser.avatar}
                alt={loggedInUser.name}
                className="w-9 h-9 rounded-full border-2 border-white/20 cursor-pointer hover:border-blue-400 transition-all shadow-sm"
                title={loggedInUser.name}
              />
              <Button variant="glass" onClick={onLogout} className="text-xs p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-red-500/20 hover:text-red-200 hover:border-red-500/30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              </Button>
            </div>
          )}
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default Dock;
