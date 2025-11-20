
import React from 'react';
import GlassmorphicCard from './GlassmorphicCard';

interface NotificationProps {
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  onClose?: () => void;
  className?: string;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  onClose,
  className,
}) => {
  let typeStyles = '';
  switch (type) {
    case 'info':
      typeStyles = 'text-blue-200 border-blue-400';
      break;
    case 'warning':
      typeStyles = 'text-yellow-200 border-yellow-400';
      break;
    case 'error':
      typeStyles = 'text-red-200 border-red-400';
      break;
    case 'success':
      typeStyles = 'text-green-200 border-green-400';
      break;
  }

  return (
    <GlassmorphicCard
      className={`p-3 pr-8 relative flex items-center space-x-2 ${typeStyles} ${className}`}
    >
      <span className="text-xl">
        {type === 'info' && 'ⓘ'}
        {type === 'warning' && '⚠'}
        {type === 'error' && '✖'}
        {type === 'success' && '✔'}
      </span>
      <p className="text-white text-sm">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          &times;
        </button>
      )}
    </GlassmorphicCard>
  );
};

export default Notification;
