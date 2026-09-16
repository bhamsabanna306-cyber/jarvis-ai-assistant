import React from 'react';
import { MessageSquare, CheckCircle, Bell, BarChart3 } from 'lucide-react';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    const iconProps = { className: 'w-4 h-4' };
    switch (type) {
      case 'chat':
        return <MessageSquare {...iconProps} />;
      case 'task':
        return <CheckCircle {...iconProps} />;
      case 'reminder':
        return <Bell {...iconProps} />;
      case 'analysis':
        return <BarChart3 {...iconProps} />;
      default:
        return <MessageSquare {...iconProps} />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'chat':
        return 'text-blue-400';
      case 'task':
        return 'text-green-400';
      case 'reminder':
        return 'text-yellow-400';
      case 'analysis':
        return 'text-purple-400';
      default:
        return 'text-cyan-400';
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg border border-cyan-500/20">
      <p className="text-cyan-400/60 text-xs uppercase tracking-wider mb-4">Recent Activity</p>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/20 hover:bg-slate-700/40 transition-all duration-300 border border-cyan-500/10 hover:border-cyan-500/30"
          >
            <div className={`flex-shrink-0 mt-1 ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-cyan-300 truncate">{activity.message}</p>
              <p className="text-xs text-cyan-300/50 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 rounded-lg bg-slate-700/30 border border-cyan-400/20 hover:border-cyan-400/50 text-cyan-400 hover:text-cyan-300 text-xs uppercase font-semibold transition-all duration-300">
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivity;
