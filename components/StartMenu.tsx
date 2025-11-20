import React from 'react';
import GlassmorphicCard from './GlassmorphicCard';
import { AppName } from '../types';

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onAppClick: (appName: AppName) => void;
}

const MENU_APPS = [
    { name: 'Navigator' as AppName, icon: '🌐', description: 'Browse the web' },
    { name: 'Terminal' as AppName, icon: '💻', description: 'Command line interface' },
    { name: 'File Manager' as AppName, icon: '📁', description: 'Manage your files' },
    { name: 'Settings' as AppName, icon: '⚙️', description: 'System settings' },
    { name: 'BLIN AI' as AppName, icon: '🤖', description: 'AI Assistant' },
];

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onAppClick }) => {
    if (!isOpen) return null;

    const handleAppClick = (appName: AppName) => {
        onAppClick(appName);
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[9998]"
                onClick={onClose}
            />

            {/* Start Menu */}
            <GlassmorphicCard className="fixed bottom-20 left-6 z-[9999] w-96 max-w-[90vw] p-4 bg-black/60 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="mb-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xs tracking-widest">BLIN</span>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg">BLIN OS</h3>
                            <p className="text-white/60 text-xs">Your Digital Workspace</p>
                        </div>
                    </div>
                </div>

                {/* Apps Grid */}
                <div className="space-y-1 mb-4">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2 px-2">Applications</p>
                    {MENU_APPS.map((app) => (
                        <button
                            key={app.name}
                            onClick={() => handleAppClick(app.name)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group text-left active:scale-95"
                        >
                            <span className="text-2xl group-hover:scale-110 transition-transform">{app.icon}</span>
                            <div className="flex-1">
                                <p className="text-white font-medium text-sm group-hover:text-blue-200 transition-colors">{app.name}</p>
                                <p className="text-white/50 text-xs">{app.description}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/30 group-hover:text-white/60 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M1 12h6m6 0h6M5.8 5.8l4.2 4.2m0 6l-4.2 4.2"></path>
                        </svg>
                        Settings
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/20 transition-colors text-white/70 hover:text-red-200 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Power
                    </button>
                </div>
            </GlassmorphicCard>
        </>
    );
};

export default StartMenu;
