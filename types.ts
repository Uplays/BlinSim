
export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress?: number;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string; // URL or icon class
}

export interface SystemStats {
  cpuUsage: number; // percentage
  ramUsage: number; // percentage
  gpuUsage?: number; // percentage, optional
}

export interface AppWindow {
  id: string;
  title: string;
  component: React.ReactNode;
  icon: React.ReactNode;
  width?: string;
  height?: string;
  x?: number;
  y?: number;
  isMinimized?: boolean;
  isMaximized?: boolean;
}

export enum AppName {
  Navigator = 'Navigator',
  Browser = 'Browser',
  Settings = 'Settings',
  FileManager = 'File Manager',
  BlinTasks = 'BLIN Tasks',
  BlinAIAssistant = 'BLIN AI Assistant',
  BlinMusicPlayer = 'Music Player'
}
