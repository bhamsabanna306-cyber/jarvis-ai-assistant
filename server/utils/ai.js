// AI Response Generator
// This handles simple responses without external APIs for Phase 2
// Can be extended with OpenAI/Groq when API keys are provided

const getChatResponse = async (message, conversationHistory = []) => {
  try {
    const lowerMessage = message.toLowerCase();

    // Simple pattern-based responses for Phase 2
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! I am JARVIS, your personal AI assistant. How can I help you today?';
    }

    if (lowerMessage.includes('what is your name') || lowerMessage.includes('who are you')) {
      return 'I am JARVIS, an intelligent personal AI assistant created by BHAMS. I am here to help you with tasks, reminders, chat, and much more!';
    }

    if (lowerMessage.includes('what can you do') || lowerMessage.includes('capabilities')) {
      return 'I can assist you with: task management, reminders, daily planning, trading journal tracking, learning progress tracking, web search, voice commands, and intelligent conversation. What would you like help with?';
    }

    if (lowerMessage.includes('current time') || lowerMessage.includes('what time')) {
      return `The current time is ${new Date().toLocaleTimeString()}.`;
    }

    if (lowerMessage.includes('today date') || lowerMessage.includes('what is today')) {
      return `Today is ${new Date().toLocaleDateString()}.`;
    }

    if (lowerMessage.includes('help')) {
      return 'I am here to help! You can ask me about your tasks, set reminders, chat about anything, or control your dashboard. What do you need?';
    }

    if (lowerMessage.includes('thank')) {
      return 'You\\'re welcome! I\\'m always happy to help. Is there anything else you need?';
    }

    // Check if OpenAI is available
    if (process.env.ENABLE_OPENAI === 'true' && process.env.OPENAI_API_KEY) {
      return await getOpenAIResponse(message);
    }

    // Check if Groq is available
    if (process.env.ENABLE_GROQ === 'true' && process.env.GROQ_API_KEY) {
      return await getGroqResponse(message);
    }

    // Default fallback response
    return `I understood: "${message}". For advanced AI responses, please configure OpenAI or Groq API keys. For now, I can help with basic tasks and reminders!`;
  } catch (error) {
    console.error('Error in getChatResponse:', error);
    return 'I encountered an error processing your message. Please try again.';
  }
};

const getOpenAIResponse = async (message) => {
  try {
    // This is a placeholder for OpenAI integration
    // Implementation will be added in future phases
    console.log('OpenAI API is not yet fully implemented');
    return `OpenAI response to: "${message}"`;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
};

const getGroqResponse = async (message) => {
  try {
    // This is a placeholder for Groq integration
    // Implementation will be added in future phases
    console.log('Groq API is not yet fully implemented');
    return `Groq response to: "${message}"`;
  } catch (error) {
    console.error('Error calling Groq:', error);
    throw error;
  }
};

export { getChatResponse, getOpenAIResponse, getGroqResponse };
