import React, { useState, useEffect } from 'react';
import JarvisOrb from './JarvisOrb';
import DateTimeWidget from './DateTimeWidget';
import AIStatus from './AIStatus';
import QuickActions from './QuickActions';
import TasksWidget from './TasksWidget';
import DailyProgress from './DailyProgress';
import RecentActivity from './RecentActivity';

const Dashboard = () => {
  const [aiActive, setAiActive] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', completed: false, priority: 'high' },
    { id: 2, title: 'Review code changes', completed: true, priority: 'medium' },
    { id: 3, title: 'Meeting with team', completed: false, priority: 'high' },
    { id: 4, title: 'Update documentation', completed: false, priority: 'low' },
  ]);

  const [activities, setActivities] = useState([
    { id: 1, type: 'chat', message: 'Started conversation about AI architecture', time: '10 mins ago' },
    { id: 2, type: 'task', message: 'Marked "Review code changes" as completed', time: '25 mins ago' },
    { id: 3, type: 'reminder', message: 'Reminder set for team meeting', time: '1 hour ago' },
    { id: 4, type: 'analysis', message: 'Daily trading analysis complete', time: '2 hours ago' },
  ]);

  return (
    <div className="min-h-screen p-4 md:p-8 overflow-y-auto">
      {/* Top Section - JARVIS Orb and Status */}
      <div className="mb-8">
        <div className="text-center mb-8">
          <h1 className="jarvis-title text-4xl md:text-5xl font-bold glow-text text-cyan-400 mb-2">
            BHAMS JARVIS
          </h1>
          <p className="text-cyan-300/60 text-sm">Personal AI Intelligence System</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - JARVIS Orb */}
          <div className="lg:col-span-1">
            <JarvisOrb isActive={aiActive} setIsActive={setAiActive} />
          </div>

          {/* Center-Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date/Time and Status Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DateTimeWidget />
              <AIStatus isActive={aiActive} />
            </div>

            {/* Quick Actions */}
            <QuickActions setAiActive={setAiActive} />
          </div>
        </div>
      </div>

      {/* Bottom Section - Tasks, Progress, Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks */}
        <div className="lg:col-span-1">
          <TasksWidget tasks={tasks} setTasks={setTasks} />
        </div>

        {/* Daily Progress */}
        <div className="lg:col-span-1">
          <DailyProgress tasks={tasks} />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <RecentActivity activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
