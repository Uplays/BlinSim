import React from 'react';
import { User, AppName, Task } from './types';

// Icons for the dock and apps (using simple SVG for demonstration)
const FolderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-6 h-6" },
    React.createElement('path', { d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 4.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" })
  )
);

const BrowserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-6 h-6" },
    React.createElement('circle', { cx: "12", cy: "12", r: "10" }),
    React.createElement('line', { x1: "2", y1: "12", x2: "22", y2: "12" }),
    React.createElement('path', { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })
  )
);

const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-6 h-6" },
    React.createElement('circle', { cx: "12", cy: "12", r: "3" }),
    React.createElement('path', { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 .51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })
  )
);

const TasksIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-6 h-6" },
    React.createElement('path', { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }),
    React.createElement('rect', { x: "8", y: "2", width: "8", height: "4", rx: "1", ry: "1" }),
    React.createElement('line', { x1: "12", y1: "11", x2: "12", y2: "17" }),
    React.createElement('line', { x1: "9", y1: "14", x2: "15", y2: "14" })
  )
);

const AIIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-6 h-6" },
    React.createElement('path', { d: "M12 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-4z" }),
    React.createElement('path', { d: "M12 14v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-6z" }),
    React.createElement('path', { d: "M2 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6z" })
  )
);

const MusicIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-6 h-6" },
    React.createElement('path', { d: "M9 18V5l12-2v13" }),
    React.createElement('circle', { cx: "6", cy: "18", r: "3" }),
    React.createElement('circle', { cx: "18", cy: "16", r: "3" })
  )
);

export const DEFAULT_USER: User = {
  id: 'user-1',
  name: 'Alex Chen',
  avatar: 'https://picsum.photos/40/40',
};

// Fix: Explicitly type INITIAL_TASKS as Task[] to ensure type consistency
export const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Complete BLIN OS documentation', status: 'in-progress', progress: 60 },
  { id: 't2', title: 'Implement Glassmorphism UI components', status: 'completed' },
  { id: 't3', title: 'Integrate AI Assistant (Gemini API)', status: 'pending' },
  { id: 't4', title: 'Review security protocols', status: 'pending' },
];

export const DOCK_APPS = [
  // Fix: The previous errors prevented these components from being correctly identified.
  // After fixing the SVG component definitions, these uses should now be valid.
  { name: AppName.Navigator, icon: React.createElement(FolderIcon, { className: "w-8 h-8 text-white" }) },
  { name: AppName.Browser, icon: React.createElement(BrowserIcon, { className: "w-8 h-8 text-white" }) },
  { name: AppName.BlinTasks, icon: React.createElement(TasksIcon, { className: "w-8 h-8 text-white" }) },
  { name: AppName.BlinAIAssistant, icon: React.createElement(AIIcon, { className: "w-8 h-8 text-white" }) },
  { name: AppName.BlinMusicPlayer, icon: React.createElement(MusicIcon, { className: "w-8 h-8 text-white" }) },
  { name: AppName.Settings, icon: React.createElement(SettingsIcon, { className: "w-8 h-8 text-white" }) },
];

export const BLIN_OS_INFO = {
  version: '1.0',
  date: 'October 29, 2025',
};

// Gemini Model Configuration
export const GEMINI_MODEL = 'gemini-2.5-flash';