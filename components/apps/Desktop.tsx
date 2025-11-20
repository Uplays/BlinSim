
import React, { useState, useCallback, useMemo } from 'react';
import { User, AppWindow, AppName } from '../../types';
import Dock from '../Dock';
import WeatherWidget from '../widgets/WeatherWidget';
import TasksWidget from '../widgets/TasksWidget';
import CalendarClockWidget from '../widgets/CalendarClockWidget';
import SystemMonitorWidget from '../widgets/SystemMonitorWidget';
import GlassmorphicCard from '../GlassmorphicCard';
import FileManager from './FileManager';
import BlinTasks from './BlinTasks';
import BlinAIAssistant from './BlinAIAssistant';
import Button from '../Button';
import Notification from '../Notification';
import StartMenu from '../StartMenu';
import { DOCK_APPS } from '../../constants';

interface DesktopProps {
  loggedInUser: User | null;
  onLogout: () => void;
}

const Desktop: React.FC<DesktopProps> = ({ loggedInUser, onLogout }) => {
  const [activeWindows, setActiveWindows] = useState<AppWindow[]>([]);
  const [globalNotification, setGlobalNotification] = useState<string | null>(
    "Welcome to BLIN OS! Click the AI helper for assistance."
  );
  const [showAIHelp, setShowAIHelp] = useState<boolean>(false);
  const [aiHelpContent, setAIHelpContent] = useState<string>('');
  const [draggingWindowId, setDraggingWindowId] = useState<string | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState<boolean>(false);

  const openApp = useCallback((appName: AppName) => {
    if (activeWindows.some((win) => win.id === appName)) {
      // Bring to front if already open
      setActiveWindows((prev) => [
        ...prev.filter((win) => win.id !== appName),
        prev.find((win) => win.id === appName)!,
      ]);
      return;
    }

    let appComponent: React.ReactNode;
    let appIcon = DOCK_APPS.find(app => app.name === appName)?.icon;
    let width = 'md:w-[800px] w-[95vw]';
    let height = 'md:h-[600px] h-[80vh]';

    switch (appName) {
      case AppName.Navigator:
        appComponent = <FileManager />;
        break;
      case AppName.Browser:
        appComponent = (
          <div className="flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-4 text-white">BLIN Browser</h3>
            <GlassmorphicCard className="flex-grow flex items-center justify-center text-white/70">
              <p>Welcome to BLIN Browser!</p>
            </GlassmorphicCard>
          </div>
        );
        break;
      case AppName.BlinTasks:
        appComponent = <BlinTasks />;
        break;
      case AppName.BlinAIAssistant:
        appComponent = <BlinAIAssistant />;
        width = 'md:w-[600px] w-[95vw]';
        height = 'md:h-[700px] h-[80vh]';
        break;
      case AppName.BlinMusicPlayer:
        appComponent = (
          <div className="flex flex-col h-full items-center justify-center">
            <h3 className="text-xl font-semibold mb-4 text-white">BLIN Music Player</h3>
            <img src="https://picsum.photos/200/200" alt="Album Art" className="rounded-lg mb-4" />
            <p className="text-white text-lg">Now Playing: Future Synth Anthem</p>
            <p className="text-white/70 text-sm">Artist: BLIN Beats</p>
            <div className="flex space-x-4 mt-4">
              <Button variant="glass" className="p-2">⏮</Button>
              <Button variant="glass" className="p-2 text-2xl">▶</Button>
              <Button variant="glass" className="p-2">⏭</Button>
            </div>
          </div>
        );
        break;
      case AppName.Settings:
        appComponent = (
          <div className="flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-4 text-white">BLIN Settings</h3>
            <GlassmorphicCard className="flex-grow flex items-center justify-center text-white/70">
              <p>Configure your BLIN OS experience here.</p>
            </GlassmorphicCard>
          </div>
        );
        break;
      default:
        appComponent = <p>App not found.</p>;
        break;
    }

    const newWindow: AppWindow = {
      id: appName,
      title: appName,
      component: appComponent,
      icon: appIcon,
      width,
      height,
      x: undefined, // Center horizontally
      y: undefined, // Center vertically
    };
    setActiveWindows((prev) => [...prev, newWindow]);
  }, [activeWindows]); // eslint-disable-next-line react-hooks/exhaustive-deps

  const closeApp = useCallback((appId: string) => {
    setActiveWindows((prev) => prev.filter((win) => win.id !== appId));
  }, []);

  const minimizeApp = useCallback((appId: string) => {
    setActiveWindows((prev) =>
      prev.map((win) =>
        win.id === appId ? { ...win, isMinimized: true } : win
      )
    );
  }, []);

  const maximizeApp = useCallback((appId: string) => {
    setActiveWindows((prev) =>
      prev.map((win) =>
        win.id === appId ? { ...win, isMaximized: !win.isMaximized } : win
      )
    );
  }, []);

  const restoreApp = useCallback((appId: string) => {
    setActiveWindows((prev) =>
      prev.map((win) =>
        win.id === appId ? { ...win, isMinimized: false } : win
      )
    );
  }, []);

  const activeAppNames = useMemo(() => activeWindows.map((win) => win.id as AppName), [activeWindows]);

  const handleDragStart = useCallback((e: React.MouseEvent, appId: string) => {
    e.preventDefault();
    const windowElement = document.getElementById(`app-window-${appId}`);
    const container = windowElement?.parentElement;
    if (!windowElement || !container) return;

    // Get initial positions
    const initialMouseX = e.clientX;
    const initialMouseY = e.clientY;

    // Get window's current position relative to container
    const rect = windowElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const initialWindowX = rect.left - containerRect.left;
    const initialWindowY = rect.top - containerRect.top;

    // Add dragging class for visual feedback
    windowElement.style.cursor = 'grabbing';
    windowElement.style.userSelect = 'none';
    setDraggingWindowId(appId);

    const onMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();

      const dx = moveEvent.clientX - initialMouseX;
      const dy = moveEvent.clientY - initialMouseY;

      // Calculate new position
      let newX = initialWindowX + dx;
      let newY = initialWindowY + dy;

      // Get container and window dimensions
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
      const windowWidth = rect.width;
      const windowHeight = rect.height;

      // Apply boundaries - keep window within container
      const minX = 0;
      const minY = 0;
      const maxX = containerWidth - windowWidth;
      const maxY = containerHeight - windowHeight;

      // Clamp position to boundaries
      newX = Math.max(minX, Math.min(newX, maxX));
      newY = Math.max(minY, Math.min(newY, maxY));

      setActiveWindows((prev) =>
        prev.map((win) =>
          win.id === appId
            ? { ...win, x: newX, y: newY }
            : win
        )
      );
    };

    const onMouseUp = () => {
      windowElement.style.cursor = 'grab';
      windowElement.style.userSelect = '';
      setDraggingWindowId(null);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  const bringToFront = useCallback((appId: string) => {
    setActiveWindows((prev) => {
      const windowToFront = prev.find(win => win.id === appId);
      if (windowToFront) {
        return [...prev.filter(win => win.id !== appId), windowToFront];
      }
      return prev;
    });
  }, []);

  const getAIHelp = useCallback((appName?: AppName) => {
    const helpMessages: Record<string, string> = {
      [AppName.Navigator]: "📁 Navigator Help:\n\n• Browse your files and folders\n• Create new folders with the + button\n• Double-click to open files\n• Right-click for more options\n• Drag and drop to move files",
      [AppName.Browser]: "🌐 Browser Help:\n\n• Enter URLs in the address bar\n• Use bookmarks for quick access\n• Open multiple tabs\n• Ctrl+T for new tab\n• Ctrl+W to close tab",
      [AppName.BlinTasks]: "✅ Tasks Help:\n\n• Create new tasks with the + button\n• Mark tasks as complete\n• Set priorities and due dates\n• Filter by status\n• Drag to reorder tasks",
      [AppName.BlinAIAssistant]: "🤖 AI Assistant Help:\n\n• Ask me anything!\n• I can help with coding\n• Explain complex topics\n• Generate ideas\n• Just type your question",
      [AppName.BlinMusicPlayer]: "🎵 Music Player Help:\n\n• Play/pause with spacebar\n• Skip tracks with arrow keys\n• Create playlists\n• Shuffle and repeat modes\n• Volume control on the right",
      [AppName.Settings]: "⚙️ Settings Help:\n\n• Customize your desktop\n• Change themes and colors\n• Manage notifications\n• Privacy settings\n• System preferences"
    };

    const currentApp = activeWindows.find(win => !win.isMinimized);
    const helpText = appName
      ? helpMessages[appName] || "👋 Welcome to BLIN OS!\n\nClick on any app in the taskbar to get started. I'm here to help you navigate the system!"
      : currentApp
        ? helpMessages[currentApp.id as AppName] || "Need help? Select an app to get specific assistance."
        : "👋 Welcome to BLIN OS!\n\nClick on any app in the taskbar to get started. I'm here to help you navigate the system!";

    setAIHelpContent(helpText);
    setShowAIHelp(true);
  }, [activeWindows]);


  return (
    <div
      className="h-screen w-screen overflow-hidden bg-cover bg-center relative selection:bg-blue-500/30"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80')`,
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

      {/* Desktop Content */}
      <div className="relative z-10 h-full w-full p-4 md:p-6 flex flex-col pb-20"></div>

      {/* Widgets Area - Left Side */}
      <div className="absolute top-4 left-4 z-40 flex flex-col space-y-3 w-72 max-w-[calc(50vw-2rem)] pointer-events-none">
        <WeatherWidget className="h-32 w-full pointer-events-auto" />
        <TasksWidget className="h-40 w-full pointer-events-auto overflow-y-auto" />
      </div>

      {/* Widgets Area - Right Side */}
      <div className="absolute top-4 right-4 z-40 flex flex-col space-y-3 w-72 max-w-[calc(50vw-2rem)] pointer-events-none">
        <CalendarClockWidget className="h-32 w-full pointer-events-auto" />
        <SystemMonitorWidget className="h-32 w-full pointer-events-auto" />
      </div>

      {/* Global AI Notification */}
      {globalNotification && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-80 md:w-96 max-w-[90vw]">
          <Notification
            message={globalNotification}
            type="info"
            onClose={() => setGlobalNotification(null)}
            className="pointer-events-auto"
          />
          <div className="flex justify-around mt-4">
            <Button variant="glass" onClick={() => getAIHelp()} className="text-sm px-3 py-1">
              Get Help
            </Button>
            <Button variant="glass" onClick={() => setGlobalNotification(null)} className="text-sm px-3 py-1">
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* AI Help FAB (Floating Action Button) */}
      <button
        onClick={() => getAIHelp()}
        className="fixed bottom-16 right-4 md:bottom-20 md:right-6 z-[9998] w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center text-white"
        title="AI Help Assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <line x1="9" y1="10" x2="15" y2="10"></line>
          <line x1="12" y1="7" x2="12" y2="13"></line>
        </svg>
      </button>

      {/* AI Help Modal */}
      {showAIHelp && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4" onClick={() => setShowAIHelp(false)}>
          <GlassmorphicCard className="w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                AI Assistant
              </h3>
              <button onClick={() => setShowAIHelp(false)} className="text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="text-white/90 whitespace-pre-line text-sm leading-relaxed">
              {aiHelpContent}
            </div>
          </GlassmorphicCard>
        </div>
      )}

      {/* App Windows */}
      {activeWindows.filter(win => !win.isMinimized).map((appWindow, index) => (
        <GlassmorphicCard
          key={appWindow.id}
          id={`app-window-${appWindow.id}`}
          className={`absolute flex flex-col ${draggingWindowId === appWindow.id ? '' : 'transition-all duration-300'}
            ${appWindow.isMaximized
              ? 'inset-0 md:inset-4 !w-auto !h-auto'
              : `${appWindow.width || 'w-[90vw] md:w-[800px]'} ${appWindow.height || 'h-[70vh] md:h-[550px]'}`
            }
            `}
          style={appWindow.isMaximized ? { zIndex: 50 + index } : {
            left: appWindow.x !== undefined ? `${appWindow.x}px` : '50%',
            top: appWindow.y !== undefined ? `${appWindow.y}px` : '45%',
            transform: appWindow.x === undefined && appWindow.y === undefined ? 'translate(-50%, -50%)' : 'none',
            zIndex: 50 + index,
          }}
          onClick={() => bringToFront(appWindow.id)}
        >
          <div
            className="flex items-center justify-between px-3 py-3 bg-white/10 rounded-t-lg cursor-grab select-none"
            onMouseDown={(e) => !appWindow.isMaximized && handleDragStart(e, appWindow.id)}
          >
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              {appWindow.icon && React.cloneElement(appWindow.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, { className: 'w-5 h-5 text-white flex-shrink-0' })}
              <span className="text-white text-sm font-semibold truncate">{appWindow.title}</span>
            </div>
            <div className="flex space-x-2 ml-2">
              {/* Minimize */}
              <button
                className="w-6 h-6 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors flex items-center justify-center shadow-sm"
                title="Minimize"
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeApp(appWindow.id);
                }}
              >
                <span className="text-[10px] text-yellow-900 font-bold">−</span>
              </button>
              {/* Maximize/Restore */}
              <button
                className="w-6 h-6 rounded-full bg-green-400 hover:bg-green-500 transition-colors flex items-center justify-center shadow-sm"
                title={appWindow.isMaximized ? "Restore" : "Maximize"}
                onClick={(e) => {
                  e.stopPropagation();
                  maximizeApp(appWindow.id);
                }}
              >
                <span className="text-[10px] text-green-900 font-bold">{appWindow.isMaximized ? '◱' : '□'}</span>
              </button>
              {/* Close */}
              <button
                className="w-6 h-6 rounded-full bg-red-400 hover:bg-red-500 transition-colors flex items-center justify-center shadow-sm"
                title="Close"
                onClick={(e) => {
                  e.stopPropagation();
                  closeApp(appWindow.id);
                }}
              >
                <span className="text-[10px] text-red-900 font-bold">×</span>
              </button>
            </div>
          </div>
          <div className="flex-grow p-4 overflow-auto custom-scrollbar">
            {appWindow.component}
          </div>
        </GlassmorphicCard>
      ))}

      {/* Start Menu */}
      <StartMenu 
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onAppClick={(appName) => {
          openApp(appName);
          setIsStartMenuOpen(false);
        }}
      />

      {/* Dock (always visible) - Windows-style taskbar */}
      <Dock
        onAppClick={openApp}
        activeApps={activeAppNames}
        loggedInUser={loggedInUser}
        onLogout={onLogout}
        minimizedWindows={activeWindows.filter(win => win.isMinimized)}
        onRestore={restoreApp}
        onStartMenuToggle={() => setIsStartMenuOpen(!isStartMenuOpen)}
      />
    </div>
  );
};

export default Desktop;
