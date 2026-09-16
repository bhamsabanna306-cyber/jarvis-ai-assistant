import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, X } from 'lucide-react';
import api from '../services/api';
import voiceService from '../services/voice';

const ChatComponent = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize chat session on mount
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const newSessionId = await api.createChatSession();
        setSessionId(newSessionId);
      } catch (error) {
        console.error('Failed to create chat session:', error);
      }
    };

    if (isOpen) {
      initializeSession();
    }
  }, [isOpen]);

  // Setup voice service callbacks
  useEffect(() => {
    voiceService.onTranscriptChange = (text) => {
      setTranscript(text);
    };

    voiceService.onListeningChange = (listening) => {
      setIsListening(listening);
    };

    voiceService.onError = (error) => {
      console.error('Voice error:', error);
      setIsListening(false);
    };

    return () => {
      voiceService.onTranscriptChange = null;
      voiceService.onListeningChange = null;
      voiceService.onError = null;
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || !sessionId) return;

    const userMessage = messageText.trim();
    setInputValue('');
    setTranscript('');

    // Add user message to chat
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await api.sendChatMessage(userMessage, sessionId);
      
      // Add AI response to chat
      setMessages((prev) => [...prev, { role: 'assistant', content: response.aiResponse }]);

      // Speak the response
      if (voiceService.isSupported()) {
        voiceService.speak(response.aiResponse);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSendClick = () => {
    if (transcript.trim()) {
      handleSendMessage(transcript);
    } else if (inputValue.trim()) {
      handleSendMessage(inputValue);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      const finalTranscript = voiceService.stopListening();
      setTranscript(finalTranscript);
    } else {
      if (!voiceService.isSupported()) {
        alert('Speech Recognition is not supported in your browser');
        return;
      }
      voiceService.startListening();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Chat Modal */}
      <div className="relative w-full max-w-2xl h-96 md:h-[600px] flex flex-col glass-card border border-cyan-500/30 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-900/50">
          <div>
            <h2 className="jarvis-title text-xl font-bold glow-text text-cyan-400">JARVIS Chat</h2>
            <p className="text-xs text-cyan-300/60 mt-1">Personal AI Assistant</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-cyan-400 hover:text-cyan-300" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30">
                  <span className="text-3xl">⚡</span>
                </div>
                <p className="text-cyan-300/70 text-sm">Start a conversation with JARVIS</p>
                <p className="text-cyan-300/50 text-xs mt-2">Try saying "Hello" or "What can you do?"</p>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-100'
                      : 'bg-slate-700/40 border border-cyan-400/20 text-cyan-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-700/40 border border-cyan-400/20 px-4 py-3 rounded-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-cyan-500/20 bg-slate-900/50 p-4 md:p-6 space-y-3">
          {/* Transcript Display */}
          {(transcript || isListening) && (
            <div className="bg-slate-800/60 border border-cyan-400/30 rounded-lg p-3">
              <p className="text-xs text-cyan-400/70 mb-1">Voice Input:</p>
              <p className="text-sm text-cyan-300">{transcript || 'Listening...'}</p>
            </div>
          )}

          {/* Input Field */}
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={transcript || inputValue}
              onChange={(e) => !isListening && setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type message or use voice..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-cyan-100 placeholder-cyan-400/40 focus:outline-none focus:border-cyan-400/60 transition-colors disabled:opacity-50"
            />

            {/* Voice Button */}
            <button
              onClick={handleVoiceToggle}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 font-semibold text-sm ${
                isListening
                  ? 'bg-red-500/20 border border-red-400/50 text-red-400 hover:bg-red-500/30'
                  : 'bg-slate-700/50 border border-cyan-400/30 text-cyan-400 hover:bg-slate-700/70'
              } disabled:opacity-50`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span className="hidden sm:inline">Stop</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span className="hidden sm:inline">Voice</span>
                </>
              )}
            </button>

            {/* Send Button */}
            <button
              onClick={handleSendClick}
              disabled={isLoading || (!inputValue.trim() && !transcript.trim())}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 rounded-lg text-cyan-300 hover:text-cyan-200 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 flex items-center gap-2 font-semibold text-sm disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>

          {/* Helper Text */}
          <p className="text-xs text-cyan-300/40 text-center">
            Press Enter to send • Use microphone for voice input
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
