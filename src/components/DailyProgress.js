import React from 'react';
import { TrendingUp } from 'lucide-react';

const DailyProgress = ({ tasks }) => {
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  const dayProgress = 40; // 40% through the day (9 AM - 10 PM)
  const productivityScore = Math.round((progressPercentage + dayProgress) / 2);

  return (
    <div className="glass-card p-6 rounded-lg border border-cyan-500/20">
      <div className="flex items-center justify-between mb-6">
        <p className="text-cyan-400/60 text-xs uppercase tracking-wider">Daily Progress</p>
        <TrendingUp className="w-4 h-4 text-cyan-400" />
      </div>

      <div className="space-y-6">
        {/* Task Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-cyan-300">Tasks Completed</span>
            <span className="text-sm font-bold text-cyan-400">{progressPercentage}%</span>
          </div>
          <div className="bg-slate-900/50 rounded-full h-2 overflow-hidden border border-cyan-500/20">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Day Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-cyan-300">Day Progress</span>
            <span className="text-sm font-bold text-cyan-400">{dayProgress}%</span>
          </div>
          <div className="bg-slate-900/50 rounded-full h-2 overflow-hidden border border-cyan-500/20">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${dayProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Productivity Score */}
        <div className="bg-slate-700/30 rounded-lg p-4 border border-cyan-500/20 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-cyan-300">Productivity Score</span>
            <span className="text-2xl font-bold text-cyan-400">{productivityScore}</span>
          </div>
          <div className="text-xs text-cyan-300/60 mt-2">
            Great work! Keep it up.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyProgress;
