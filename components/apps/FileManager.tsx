
import React from 'react';
import Input from '../Input';
import GlassmorphicCard from '../GlassmorphicCard';

interface FileManagerProps {
  className?: string;
}

const FileManager: React.FC<FileManagerProps> = ({ className }) => {
  const fileItems = [
    { id: 'f1', name: 'Project Aurora', type: 'folder', size: '', modified: '2024-09-15' },
    { id: 'f2', name: 'blin_os_setup.exe', type: 'file', size: '120MB', modified: '2025-10-20' },
    { id: 'f3', name: 'User Manual.pdf', type: 'file', size: '2.5MB', modified: '2025-10-25' },
    { id: 'f4', name: 'Vacation Photos', type: 'folder', size: '', modified: '2024-08-01' },
    { id: 'f5', name: 'blin-config.json', type: 'file', size: '1KB', modified: '2025-10-28' },
  ];

  const sidebarItems = [
    { name: 'Quick Access', icon: '⚡' },
    { name: 'Desktop', icon: '🖥️' },
    { name: 'Downloads', icon: '⬇️' },
    { name: 'Documents', icon: '📄' },
    { name: 'Cloud Drive', icon: '☁️' },
  ];

  return (
    <div className={`flex flex-col h-full text-white ${className}`}>
      <div className="flex items-center mb-4 space-x-2">
        <h3 className="text-xl font-semibold">BLIN Navigator</h3>
        <Input type="text" placeholder="Find project 'Aurora' files..." className="flex-grow max-w-sm" />
      </div>

      <div className="flex flex-grow bg-white/5 rounded-lg overflow-hidden">
        {/* Sidebar */}
        <GlassmorphicCard className="w-48 p-4 border-r border-white/20 rounded-none overflow-y-auto custom-scrollbar">
          <h4 className="font-semibold text-lg mb-4">Navigation</h4>
          <ul className="space-y-3">
            {sidebarItems.map(item => (
              <li key={item.name} className="flex items-center space-x-2 text-sm cursor-pointer hover:text-blue-300 transition-colors">
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </GlassmorphicCard>

        {/* Main content */}
        <div className="flex-grow p-4 overflow-y-auto custom-scrollbar">
          <h4 className="font-semibold text-lg mb-4">Current Folder: Desktop</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fileItems.map(item => (
              <GlassmorphicCard key={item.id} className="flex flex-col items-center p-3 text-center cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-4xl mb-2">{item.type === 'folder' ? '📁' : '📄'}</span>
                <p className="text-sm font-medium truncate w-full">{item.name}</p>
                {item.size && <p className="text-xs opacity-70">{item.size}</p>}
                <p className="text-xs opacity-50">Mod: {item.modified}</p>
              </GlassmorphicCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManager;
