
import React, { useState, useCallback } from 'react';
import GlassmorphicCard from '../GlassmorphicCard';
import Button from '../Button';
import { Task } from '../../types';
import { INITIAL_TASKS } from '../../constants';
import { generateTaskSuggestions } from '../../services/geminiService';
import Loader from '../Loader';

interface BlinTasksProps {
  className?: string;
}

const BlinTasks: React.FC<BlinTasksProps> = ({ className }) => {
  // Fix: The type error here is resolved by explicitly typing INITIAL_TASKS in constants.ts
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const getTasksByStatus = useCallback((status: 'pending' | 'in-progress' | 'completed') => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  const moveTask = useCallback((id: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  }, []);

  const handleAISuggestion = async () => {
    setAiLoading(true);
    setAiSuggestion(null);
    try {
      const currentTasks = tasks.map(t => t.title).join(', ');
      const prompt = `Based on these tasks: ${currentTasks}. Suggest one new, simple task for a productivity application. Keep the suggestion concise, less than 15 words.`;
      const suggestion = await generateTaskSuggestions(prompt);
      setAiSuggestion(suggestion || 'No new task suggestion at this moment.');
    } catch (error) {
      console.error('Error fetching AI suggestion:', error);
      setAiSuggestion('Failed to get AI suggestion.');
    } finally {
      setAiLoading(false);
    }
  };

  const addTask = (title: string) => {
    const newTask: Task = {
      id: `t${tasks.length + 1}`,
      title,
      status: 'pending',
    };
    setTasks(prev => [...prev, newTask]);
    setAiSuggestion(null); // Clear suggestion after adding
  };

  return (
    <div className={`flex flex-col h-full text-white ${className}`}>
      <h3 className="text-xl font-semibold mb-4">BLIN Tareas</h3>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pending Tasks Column */}
        <GlassmorphicCard className="flex flex-col p-4">
          <h4 className="text-lg font-medium mb-3 border-b border-white/20 pb-2">Pendiente</h4>
          <div className="flex-grow space-y-3 overflow-y-auto custom-scrollbar pr-2">
            {getTasksByStatus('pending').map(task => (
              <div key={task.id} className="bg-white/10 p-3 rounded-lg flex items-center justify-between">
                <span className="text-sm">{task.title}</span>
                <Button variant="glass" className="text-xs px-2 py-1" onClick={() => moveTask(task.id, 'in-progress')}>
                  Start
                </Button>
              </div>
            ))}
          </div>
        </GlassmorphicCard>

        {/* In Progress Tasks Column */}
        <GlassmorphicCard className="flex flex-col p-4">
          <h4 className="text-lg font-medium mb-3 border-b border-white/20 pb-2">En Progreso</h4>
          <div className="flex-grow space-y-3 overflow-y-auto custom-scrollbar pr-2">
            {getTasksByStatus('in-progress').map(task => (
              <div key={task.id} className="bg-white/10 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{task.title}</span>
                    <Button variant="glass" className="text-xs px-2 py-1" onClick={() => moveTask(task.id, 'completed')}>
                        Done
                    </Button>
                </div>
                {task.progress !== undefined && (
                  <div className="w-full bg-blue-400/30 rounded-full h-2 mt-1">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                    <span className="text-xs opacity-70 mt-1 block text-right">{task.progress}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassmorphicCard>
      </div>

      {/* AI Assistance Section */}
      <GlassmorphicCard className="mt-4 p-4 flex flex-col items-start">
        <h4 className="text-lg font-medium mb-2">AI Task Assistance</h4>
        <Button variant="glass" onClick={handleAISuggestion} disabled={aiLoading}>
          {aiLoading ? 'Thinking...' : 'Suggest New Task'}
        </Button>
        {aiLoading && <Loader className="mt-2 p-2 w-full text-sm" message="Generating suggestion..." />}
        {aiSuggestion && (
          <div className="mt-3 bg-white/10 p-3 rounded-lg w-full flex items-center justify-between">
            <span className="text-sm italic">{aiSuggestion}</span>
            <Button variant="primary" className="text-xs px-2 py-1" onClick={() => addTask(aiSuggestion)}>
              Add Task
            </Button>
          </div>
        )}
      </GlassmorphicCard>
    </div>
  );
};

export default BlinTasks;
