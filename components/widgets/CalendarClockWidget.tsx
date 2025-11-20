
import React, { useState, useEffect } from 'react';
import GlassmorphicCard from '../GlassmorphicCard';

interface CalendarClockWidgetProps {
  className?: string;
}

const CalendarClockWidget: React.FC<CalendarClockWidgetProps> = ({ className }) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedTime = dateTime.toLocaleTimeString('en-US', timeOptions);
  const formattedDate = dateTime.toLocaleDateString('en-US', dateOptions);

  return (
    <GlassmorphicCard className={`flex flex-col items-center justify-center text-white ${className}`}>
      <p className="text-5xl font-light mb-2">{formattedTime}</p>
      <p className="text-lg opacity-80 capitalize">{formattedDate}</p>
    </GlassmorphicCard>
  );
};

export default CalendarClockWidget;
