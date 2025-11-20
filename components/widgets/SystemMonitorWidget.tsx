
import React, { useState, useEffect } from 'react';
import GlassmorphicCard from '../GlassmorphicCard';
import { SystemStats } from '../../types';
import Notification from '../Notification';

interface SystemMonitorWidgetProps {
  className?: string;
}

const SystemMonitorWidget: React.FC<SystemMonitorWidgetProps> = ({ className }) => {
  const [stats, setStats] = useState<SystemStats>({
    cpuUsage: 15,
    ramUsage: 30,
    gpuUsage: 10,
  });
  const [showGpuWarning, setShowGpuWarning] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCpu = Math.floor(Math.random() * (70 - 10 + 1)) + 10; // 10-70%
      const newRam = Math.floor(Math.random() * (85 - 20 + 1)) + 20; // 20-85%
      const newGpu = Math.floor(Math.random() * (95 - 5 + 1)) + 5; // 5-95%

      setStats({
        cpuUsage: newCpu,
        ramUsage: newRam,
        gpuUsage: newGpu,
      });

      if (newGpu > 75) {
        setShowGpuWarning(true);
      } else {
        setShowGpuWarning(false);
      }
    }, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const getUsageColor = (usage: number) => {
    if (usage > 70) return 'text-red-400';
    if (usage > 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <GlassmorphicCard className={`relative flex flex-col text-white ${className}`}>
      <h3 className="text-lg font-semibold mb-3">System Monitor</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span>CPU Usage:</span>
          <span className={`${getUsageColor(stats.cpuUsage)} font-bold`}>{stats.cpuUsage}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className={`h-full rounded-full ${stats.cpuUsage > 70 ? 'bg-red-500' : stats.cpuUsage > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${stats.cpuUsage}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center text-sm mt-4">
          <span>RAM Usage:</span>
          <span className={`${getUsageColor(stats.ramUsage)} font-bold`}>{stats.ramUsage}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className={`h-full rounded-full ${stats.ramUsage > 70 ? 'bg-red-500' : stats.ramUsage > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${stats.ramUsage}%` }}
          ></div>
        </div>

        {stats.gpuUsage !== undefined && (
          <>
            <div className="flex justify-between items-center text-sm mt-4">
              <span>GPU Usage:</span>
              <span className={`${getUsageColor(stats.gpuUsage)} font-bold`}>{stats.gpuUsage}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className={`h-full rounded-full ${stats.gpuUsage > 70 ? 'bg-red-500' : stats.gpuUsage > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${stats.gpuUsage}%` }}
              ></div>
            </div>
          </>
        )}
      </div>
      {showGpuWarning && (
        <Notification
          message="High GPU usage detected! Consider closing heavy applications."
          type="warning"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 md:w-full mt-4"
        />
      )}
    </GlassmorphicCard>
  );
};

export default SystemMonitorWidget;
