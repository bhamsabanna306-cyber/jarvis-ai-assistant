import React from 'react';
import { MessageSquare, Send, Zap, Search } from 'lucide-react';

const QuickActions = ({ setAiActive }) => {
  const actions = [
    { id: 1, label: 'Chat', icon: MessageSquare, action: () => setAiActive(true) },
    { id: 2, label: 'Quick Search', icon: Search },
    { id: 3, label: 'Commands', icon: Zap },
    { id: 4, label: 'Send Report', icon: Send },
  ];

  return (
    <div className="glass-card p-6 rounded-lg border border-cyan-500/20">
      <p className="text-cyan-400/60 text-xs uppercase tracking-wider mb-4">Quick Actions</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.action}
              className="flex flex-col items-center gap-2 px-4 py-3 rounded-lg bg-slate-700/30 border border-cyan-400/20 hover:border-cyan-400/50 hover:bg-slate-700/50 transition-all duration-300 group"
            >
              <Icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <span className="text-xs text-cyan-300 group-hover:text-cyan-200 transition-colors text-center">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
