import React from 'react';
import { Menu, X, MessageSquare, CheckSquare, Calendar, TrendingUp, BookOpen, Bell, Settings, Home } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'planner', label: 'Planner', icon: Calendar },
    { id: 'trading', label: 'Trading Journal', icon: TrendingUp },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors md:hidden"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-cyan-400" />
        ) : (
          <Menu className="w-6 h-6 text-cyan-400" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen glass-card border-r border-cyan-500/20 p-6 transition-all duration-300 z-40 md:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="mb-8 hidden md:block">
          <h1 className="jarvis-title text-xl font-bold glow-text text-cyan-400">
            ⚡ JARVIS
          </h1>
          <p className="text-xs text-cyan-300/60 mt-1">BHAMS Personal AI</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mt-12 md:mt-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  if (window.innerWidth < 768) setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activePage === item.id
                    ? 'bg-cyan-500/20 border border-cyan-400/50 glow-border text-cyan-300'
                    : 'text-cyan-300/70 hover:text-cyan-300 hover:bg-slate-700/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6 text-xs text-cyan-300/40 border-t border-cyan-500/10 pt-4">
          <p>v1.0.0</p>
          <p className="mt-2">© 2026 BHAMS</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
