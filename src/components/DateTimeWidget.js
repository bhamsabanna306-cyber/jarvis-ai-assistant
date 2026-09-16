import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

const DateTimeWidget = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const dayName = dateTime.toLocaleDateString('en-US', { weekday: 'long' });
  const date = dateTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const time = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="glass-card p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-cyan-400/60 text-xs uppercase tracking-wider mb-2">Current Time</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <p className="jarvis-title text-2xl font-bold text-cyan-300">{time}</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <p className="text-cyan-300/80">{dayName}, {date}</p>
            </div>
          </div>
        </div>
        <div className="text-3xl opacity-20">🕐</div>
      </div>
    </div>
  );
};

export default DateTimeWidget;
