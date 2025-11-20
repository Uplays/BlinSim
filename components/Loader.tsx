
import React from 'react';
import GlassmorphicCard from './GlassmorphicCard';

interface LoaderProps {
  message?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Loading...', className }) => {
  return (
    <GlassmorphicCard className={`flex flex-col items-center justify-center p-6 space-y-3 ${className}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-blue-200 border-t-white"></div>
      <p className="text-white text-lg">{message}</p>
    </GlassmorphicCard>
  );
};

export default Loader;
