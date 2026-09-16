import React from 'react';
import { CheckSquare, Square, Trash2 } from 'lucide-react';

const TasksWidget = ({ tasks, setTasks }) => {
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const priorityColors = {
    high: 'text-red-400 bg-red-500/10',
    medium: 'text-yellow-400 bg-yellow-500/10',
    low: 'text-green-400 bg-green-500/10',
  };

  return (
    <div className="glass-card p-6 rounded-lg border border-cyan-500/20">
      <div className="flex items-center justify-between mb-4">
        <p className="text-cyan-400/60 text-xs uppercase tracking-wider">Today's Tasks</p>
        <span className="text-xs bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 px-2 py-1 rounded">
          {tasks.filter(t => !t.completed).length}/{tasks.length}
        </span>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/20 hover:bg-slate-700/40 transition-all duration-300 group"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className="flex-shrink-0 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {task.completed ? (
                <CheckSquare className="w-5 h-5" />
              ) : (
                <Square className="w-5 h-5" />
              )}
            </button>

            <div className="flex-1">
              <p className={`text-sm ${
                task.completed
                  ? 'text-cyan-300/50 line-through'
                  : 'text-cyan-300'
              }`}>
                {task.title}
              </p>
              <span className={`text-xs px-2 py-0.5 rounded inline-block mt-1 ${priorityColors[task.priority]}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              className="flex-shrink-0 text-cyan-400/0 group-hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksWidget;
