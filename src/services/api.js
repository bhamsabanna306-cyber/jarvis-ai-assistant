// API Service for JARVIS Backend
// Handles all communication with the Node.js backend server

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class JarvisAPI {
  // ==================== HEALTH ====================
  async checkHealth() {
    try {
      const response = await fetch(`${API_URL}/api/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { success: false, error: 'Backend server is not running' };
    }
  }

  // ==================== CHAT ====================
  async createChatSession() {
    try {
      const response = await fetch(`${API_URL}/api/chat/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error?.message || 'Failed to create session');
      return data.data.sessionId;
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw error;
    }
  }

  async sendChatMessage(message, sessionId) {
    try {
      const response = await fetch(`${API_URL}/api/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error?.message || 'Failed to send message');
      return data.data;
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw error;
    }
  }

  async getChatHistory(sessionId) {
    try {
      const response = await fetch(`${API_URL}/api/chat/history/${sessionId}`);
      const data = await response.json();
      if (!data.success) throw new Error(data.error?.message || 'Failed to fetch history');
      return data.data;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  }

  async clearChatHistory(sessionId) {
    try {
      const response = await fetch(`${API_URL}/api/chat/history/${sessionId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error?.message || 'Failed to clear history');
      return data;
    } catch (error) {
      console.error('Error clearing chat history:', error);
      throw error;
    }
  }

  // ==================== VOICE ====================
  async processVoiceInput(transcript) {
    try {
      const response = await fetch(`${API_URL}/api/voice/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error?.message || 'Failed to process voice input');
      return data.data;
    } catch (error) {
      console.error('Error processing voice input:', error);
      throw error;
    }
  }

  async getTTSConfig(text) {
    try {
      const response = await fetch(`${API_URL}/api/voice/tts-config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error?.message || 'Failed to get TTS config');
      return data.data;
    } catch (error) {
      console.error('Error getting TTS config:', error);
      throw error;
    }
  }

  // ==================== TASKS ====================
  async getTasks() {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      const data = await response.json();
      if (!data.success) throw new Error(data.error?.message || 'Failed to fetch tasks');
      return data.data.tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async createTask(title, priority = 'medium') {
    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, priority }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error?.message || 'Failed to create task');
      return data.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(taskId, updates) {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error?.message || 'Failed to update task');
      return data.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(taskId) {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error?.message || 'Failed to delete task');
      return data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}

export default new JarvisAPI();
