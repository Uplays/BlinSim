
import React, { useState, useEffect } from 'react';
import GlassmorphicCard from '../GlassmorphicCard';
import { Task } from '../../types';
import { INITIAL_TASKS } from '../../constants';

interface TasksWidgetProps {
  className?: string;
}

const TasksWidget: React.FC<TasksWidgetProps> = ({ className }) => {
  // Fix: The type error here is resolved by explicitly typing INITIAL_TASKS in constants.ts
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const toggleTaskStatus = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
  };

  const pendingTasks = tasks.filter(task => task.status !== 'completed');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <GlassmorphicCard className={`flex flex-col text-white ${className}`}>
      <h3 className="text-lg font-semibold mb-3">Mis Tareas</h3>
      <div className="space-y-2 flex-grow overflow-y-auto custom-scrollbar pr-2">
        {pendingTasks.length > 0 ? (
          pendingTasks.map(task => (
            <div key={task.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={task.status === 'completed'}
                onChange={() => toggleTaskStatus(task.id)}
                className="form-checkbox h-4 w-4 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-blue-500"
              />
              <span className={`text-sm ${task.status === 'completed' ? 'line-through opacity-60' : ''}`}>
                {task.title}
                {task.progress !== undefined && task.status === 'in-progress' && (
                  <span className="ml-2 text-xs opacity-70">({task.progress}%)</span>
                )}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm opacity-70">No pending tasks.</p>
        )}
        {completedTasks.length > 0 && (
          <>
            <h4 className="text-md mt-4 pt-2 border-t border-white/20">Completadas</h4>
            {completedTasks.map(task => (
              <div key={task.id} className="flex items-center space-x-2 opacity-60">
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  onChange={() => toggleTaskStatus(task.id)}
                  className="form-checkbox h-4 w-4 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-blue-500"
                />
                <span className="text-sm line-through">
                  {task.title}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </GlassmorphicCard>
  );
};

export default TasksWidget;
