# BHAMS JARVIS - Personal AI Assistant

A futuristic, voice-controlled personal AI assistant with a sleek JARVIS-style dashboard. Built with React, Node.js, and Tailwind CSS.

## 🌟 Features (Planned)

### PHASE 1 - Dashboard UI ✅
- [x] Futuristic dark JARVIS dashboard
- [x] Sidebar navigation
- [x] Central JARVIS AI orb with voice control UI
- [x] Real-time date/time widget
- [x] AI system status monitoring
- [x] Quick action buttons
- [x] Today's tasks widget
- [x] Daily progress tracking
- [x] Recent activity feed
- [x] Responsive PC/mobile layout
- [x] Smooth futuristic animations

### PHASE 2 - Backend & Voice (Coming Soon)
- [ ] Node.js backend setup
- [ ] WebSocket integration for real-time communication
- [ ] Voice input/output (Web Speech API + TTS)
- [ ] AI chat engine (OpenAI/Groq integration)
- [ ] Persistent data storage (MongoDB)

### PHASE 3 - Core Features (Coming Soon)
- [ ] Task management system
- [ ] Daily planner with calendar integration
- [ ] Reminder system with notifications
- [ ] Trading journal with analytics
- [ ] Learning tracker and progress reports
- [ ] Web search integration
- [ ] Memory system (context awareness)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bhamsabanna306-cyber/jarvis-ai-assistant.git
   cd jarvis-ai-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

### Project Structure

```
jarvis-ai-assistant/
├── public/                 # Static files
│   ├── index.html         # Main HTML file
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # React components
│   │   ├── Sidebar.js     # Navigation sidebar
│   │   ├── Dashboard.js   # Main dashboard
│   │   ├── JarvisOrb.js   # AI orb with voice control
│   │   ├── DateTimeWidget.js
│   │   ├── AIStatus.js
│   │   ├── QuickActions.js
│   │   ├── TasksWidget.js
│   │   ├── DailyProgress.js
│   │   └── RecentActivity.js
│   ├── App.js             # Main App component
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── package.json           # Project dependencies
└── README.md              # This file
```

## 🎨 Design & Styling

- **Color Scheme**: Cyan (#00d4ff) and dark blue gradient
- **Font**: Orbitron (titles) + Space Mono (body)
- **Effects**: Glassmorphism cards, glow effects, smooth animations
- **Responsive**: Mobile-first design with Tailwind CSS

## 🎯 Next Steps (PHASE 2)

1. Set up Node.js backend server
2. Create API endpoints for:
   - Chat/AI responses
   - Task management
   - User data persistence
3. Integrate Web Speech API for voice input/output
4. Connect to LLM APIs (OpenAI/Groq)
5. Add WebSocket for real-time communication

## 📝 Environment Variables

Create a `.env` file based on `.env.example`:

```bash
REACT_APP_API_URL=http://localhost:5000
REACT_APP_OPENAI_API_KEY=your_key_here
REACT_APP_ENABLE_VOICE=true
```

## 🛠️ Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests

## 📜 License

MIT License - See LICENSE file for details

## 👤 Author

**BHAMS** - [@bhamsabanna306-cyber](https://github.com/bhamsabanna306-cyber)

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

**Status**: PHASE 1 Complete ✅ | PHASE 2 In Progress 🚀
