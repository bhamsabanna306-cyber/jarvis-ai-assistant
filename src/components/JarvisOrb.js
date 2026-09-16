import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

const JarvisOrb = ({ isActive, setIsActive }) => {
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Orb Container */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer rings */}
        <div className="absolute w-48 h-48 border-2 border-cyan-500/30 rounded-full animate-pulse"></div>
        <div className="absolute w-40 h-40 border border-cyan-400/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute w-32 h-32 border border-cyan-300/15 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>

        {/* Main Orb */}
        <div
          className={`relative w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
            isActive
              ? 'bg-gradient-to-br from-cyan-400/80 to-blue-500/60 shadow-2xl'
              : 'bg-gradient-to-br from-cyan-500/40 to-blue-600/30 hover:from-cyan-500/60 hover:to-blue-600/50'
          } pulse-glow`}
          onClick={() => setIsActive(!isActive)}
        >
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-300/40 to-transparent"></div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">
            {isActive ? (
              <>
                <Mic className="w-12 h-12 text-cyan-900 animate-pulse" />
                <p className="text-xs text-cyan-900 font-bold mt-2">LISTENING</p>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-cyan-200 rounded-full"></div>
                <p className="text-xs text-cyan-300 font-semibold mt-2">READY</p>
              </>
            )}
          </div>

          {/* Scan line effect */}
          {isActive && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent scan-line"></div>
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 jarvis-title ${
            isActive
              ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/50'
              : 'bg-slate-700/50 border border-cyan-400/30 text-cyan-400 hover:bg-slate-700/70'
          }`}
        >
          {isActive ? 'STOP' : 'START'}
        </button>

        <button
          onClick={() => setIsListening(!isListening)}
          className="px-6 py-2 rounded-lg font-semibold text-sm bg-slate-700/50 border border-cyan-400/30 text-cyan-400 hover:bg-slate-700/70 transition-all duration-300 flex items-center gap-2 jarvis-title"
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          {isListening ? 'MUTE' : 'VOICE'}
        </button>
      </div>

      {/* Status Text */}
      <p className="text-xs text-cyan-400/70 text-center">
        {isActive ? 'AI System Active' : 'Click orb to activate'}
      </p>
    </div>
  );
};

export default JarvisOrb;
