// Voice Service for Web Speech API
// Handles speech recognition and text-to-speech

class VoiceService {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = SpeechRecognition ? new SpeechRecognition() : null;
    this.isListening = false;
    this.isSpeaking = false;
    this.transcript = '';
    this.onTranscriptChange = null;
    this.onListeningChange = null;
    this.onError = null;

    if (this.recognition) {
      this.setupRecognition();
    }
  }

  setupRecognition() {
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
      this.transcript = '';
      if (this.onListeningChange) this.onListeningChange(true);
    };

    this.recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          this.transcript += transcript + ' ';
        } else {
          interim += transcript;
        }
      }
      if (this.onTranscriptChange) {
        this.onTranscriptChange(this.transcript + interim);
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (this.onError) this.onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.onListeningChange) this.onListeningChange(false);
    };
  }

  startListening() {
    if (!this.recognition) {
      if (this.onError) this.onError('Speech Recognition not supported');
      return;
    }
    this.transcript = '';
    this.recognition.start();
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
    }
    return this.transcript.trim();
  }

  async speak(text) {
    if (!('speechSynthesis' in window)) {
      console.error('Text-to-speech not supported');
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    this.isSpeaking = true;

    utterance.onend = () => {
      this.isSpeaking = false;
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      this.isSpeaking = false;
      if (this.onError) this.onError(event.error);
    };

    speechSynthesis.speak(utterance);
  }

  isSupported() {
    return (
      (window.SpeechRecognition || window.webkitSpeechRecognition) &&
      'speechSynthesis' in window
    );
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }
}

export default new VoiceService();
