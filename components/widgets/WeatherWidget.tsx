
import React, { useState, useEffect } from 'react';
import GlassmorphicCard from '../GlassmorphicCard';
import { WeatherData } from '../../types';

interface WeatherWidgetProps {
  className?: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ className }) => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 16,
    condition: 'Cloudy',
    icon: '☁️', // Using emoji for simplicity
  });

  useEffect(() => {
    // Simulate fetching weather data
    const interval = setInterval(() => {
      const newTemp = Math.floor(Math.random() * (25 - 10 + 1)) + 10; // 10-25°C
      const conditions = ['Cloudy', 'Sunny', 'Rainy', 'Windy'];
      const newCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const icons = {
        'Cloudy': '☁️',
        'Sunny': '☀️',
        'Rainy': '🌧️',
        'Windy': '🌬️',
      };
      setWeather({
        temperature: newTemp,
        condition: newCondition,
        icon: icons[newCondition] || '☁️',
      });
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <GlassmorphicCard className={`flex flex-col items-center justify-center text-white ${className}`}>
      <div className="text-5xl mb-2">{weather.icon}</div>
      <p className="text-6xl font-light">{weather.temperature}°C</p>
      <p className="text-lg opacity-80">{weather.condition}</p>
    </GlassmorphicCard>
  );
};

export default WeatherWidget;
