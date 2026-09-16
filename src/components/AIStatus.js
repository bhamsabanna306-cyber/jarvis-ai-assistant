import React from 'react';
import { Zap, Activity, Network } from 'lucide-react';

const AIStatus = ({ isActive }) => {
  return (
    <div className="glass-card p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
      <p className="text-cyan-400/60 text-xs uppercase tracking-wider mb-4">System Status</p>
      
      <div className="space-y-4">
        {/* AI Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">AI Engine</span>
          </div>
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
            isActive 
              ? 'bg-green-500/20 border border-green-400/50 text-green-400' 
              : 'bg-slate-600/30 border border-slate-400/30 text-slate-300'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isActive ? 'bg-green-400 animate-pulse' : 'bg-slate-400'
            }`}></div>
            {isActive ? 'ACTIVE' : 'IDLE'}
          </div>
        </div>

        {/* Memory Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Memory</span>
          </div>
          <div className="text-xs text-cyan-400">8.4 GB / 16 GB</div>
        </div>

        {/* Uptime */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Uptime</span>
          </div>
          <div className="text-xs text-cyan-400">12h 34m</div>
        </div>

        {/* Status Bar */}
        <div className="mt-4 pt-4 border-t border-cyan-500/20">
          <div className="bg-slate-900/50 rounded-full h-2 overflow-hidden border border-cyan-500/20">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full w-3/4 rounded-full"></div>
          </div>
          <p className="text-xs text-cyan-300/60 mt-2">System Operating at 75% capacity</p>
        </div>
      </div>
    </div>
  );
};

export default AIStatus;
