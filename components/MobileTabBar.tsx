'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';

export default function MobileTabBar() {
  const t = useTranslations();
  const locale = useLocale() || 'hi'; // Default to Hindi if locale is undefined
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Web Speech API for voice recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = locale === 'en' ? 'en-US' : locale === 'kn' ? 'kn-IN' : 'hi-IN';

      recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        await handleVoiceCommand(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [locale]);

  // Strip all markdown symbols before speaking
  const cleanMarkdown = (text: string): string => {
    return text
      .replace(/\*\*/g, '') // bold
      .replace(/\*/g, '') // italic/bullets
      .replace(/##/g, '') // headers
      .replace(/#/g, '') // headers
      .replace(/\[|\]/g, '') // links
      .replace(/\(|\)/g, '') // links
      .replace(/^-\s*/gm, '') // bullet points
      .replace(/^\d+\.\s*/gm, '') // numbered lists
      .replace(/\n+/g, ' ') // newlines to spaces
      .trim();
  };

  const handleVoiceCommand = async (transcript: string) => {
    setIsLoading(true);
    try {
      console.log('Sending to chat API:', { transcript, locale });

      // Get AI response from Gemini
      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: transcript, locale }),
      });

      console.log('Chat API response status:', chatResponse.status);

      if (!chatResponse.ok) {
        const errorText = await chatResponse.text();

        // Check for quota/rate limit error in the error text
        if (errorText.includes('quota') || errorText.includes('RESOURCE_EXHAUSTED') || errorText.includes('429') || errorText.includes('limit')) {
          console.log('AI quota limit reached - showing friendly message');
          alert('⚠️ AI सीमा पूरी हो गई है\n\nयह फ्री टियर है जिसमें दैनिक 20 अनुरोधों की सीमा है। कृपया कल पुनः प्रयास करें।\n\n⚠️ AI Limit Reached\n\nThis free tier has 20 daily requests. Please try again tomorrow.');
        } else {
          console.log('API error - showing simple message');
          // For other errors, show a simple message
          alert('कुछ गलत हो गया। कृपया पुनः प्रयास करें।\n\nSomething went wrong. Please try again.');
        }
        setIsLoading(false);
        return;
      }

      const { response: aiResponse } = await chatResponse.json();
      console.log('AI response:', aiResponse);

      // Clean markdown before speaking
      const cleanText = cleanMarkdown(aiResponse);

      // Convert response to speech
      await speakResponse(cleanText);
    } catch (error) {
      console.error('Voice command error:', error);
      alert('Voice error: ' + (error instanceof Error ? error.message : 'Unknown error'));
      setIsLoading(false);
    }
  };

  const speakResponse = async (text: string) => {
    try {
      setIsSpeaking(true);
      setIsLoading(false);

      // First try ElevenLabs API
      try {
        const speechResponse = await fetch('/api/speech', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, locale }),
        });

        if (speechResponse.ok) {
          const audioBlob = await speechResponse.blob();
          const audioUrl = URL.createObjectURL(audioBlob);

          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = '';
          }

          audioRef.current = new Audio(audioUrl);
          audioRef.current.onended = () => {
            setIsSpeaking(false);
            URL.revokeObjectURL(audioUrl);
          };
          audioRef.current.onerror = () => {
            // Fallback to browser TTS if audio fails
            fallbackToBrowserTTS(text);
          };

          await audioRef.current.play();
          return;
        }
      } catch (elevenLabsError) {
        console.log('ElevenLabs failed, using browser TTS:', elevenLabsError);
      }

      // Fallback to browser's built-in speech synthesis
      fallbackToBrowserTTS(text);
    } catch (error) {
      console.error('Speech error:', error);
      setIsSpeaking(false);
      setIsLoading(false);
    }
  };

  const fallbackToBrowserTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = locale === 'en' ? 'en-US' : locale === 'kn' ? 'kn-IN' : 'hi-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1;

      // Try to find a Hindi voice
      const voices = speechSynthesis.getVoices();
      const hindiVoice = voices.find(voice =>
        voice.lang.includes('hi') || voice.name.includes('Hindi')
      );
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }

      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(false);
    }
  };

  const handleMicClick = () => {
    // If speaking, stop speech and start listening (interrupt)
    if (isSpeaking) {
      stopAllSpeech();
      setIsSpeaking(false);
      setIsLoading(false);

      // Immediately start listening
      startListening();
      return;
    }

    // If listening, stop listening
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      setIsListening(false);
      return;
    }

    // If loading, stop everything
    if (isLoading) {
      stopAllSpeech();
      setIsListening(false);
      setIsSpeaking(false);
      setIsLoading(false);
      return;
    }

    // If idle, start listening
    startListening();
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = locale === 'en' ? 'en-US' : locale === 'kn' ? 'kn-IN' : 'hi-IN';
      recognitionRef.current.start();
      setIsListening(true);
    } else {
      alert('Voice recognition is not supported in this browser. Please use Chrome or Edge.');
    }
  };

  const stopAllSpeech = () => {
    // Stop audio element
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }

    // Stop browser speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50 px-2 pb-safe pt-2">
      <div className="flex justify-between items-center h-[60px]">
        <a href="#" className="flex-1 flex flex-col items-center justify-center gap-1 text-brand-forest">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span className="text-[10px] font-bold">{t('nav_home')}</span>
        </a>
        <a href="#services" className="flex-1 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-brand-forest transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span className="text-[10px] font-bold">{t('nav_schemes')}</span>
        </a>
        <div className="flex-1 flex justify-center -mt-6">
          <button
            onClick={handleMicClick}
            disabled={isLoading}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg border-[3px] border-white transform transition active:scale-95 group relative ${
              isListening ? 'bg-red-500 animate-pulse' : isSpeaking ? 'bg-green-500' : isLoading ? 'bg-gray-400' : 'bg-brand-saffron'
            }`}
            aria-label="Voice assistant"
          >
            {/* Mic icon */}
            {!isListening && !isSpeaking && !isLoading && (
              <svg className="w-6 h-6 group-active:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
              </svg>
            )}

            {/* Recording waves */}
            {isListening && (
              <div className="flex gap-1">
                <span className="w-1 h-4 bg-white rounded-full animate-pulse"></span>
                <span className="w-1 h-6 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              </div>
            )}

            {/* Speaking waves */}
            {isSpeaking && (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}

            {/* Loading spinner */}
            {isLoading && (
              <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}

            {/* Ripple effect when active */}
            {(isListening || isSpeaking) && (
              <span className="absolute inset-0 rounded-full border-2 border-white opacity-50 animate-ping"></span>
            )}
          </button>
        </div>
        <a href="#gallery" className="flex-1 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-brand-forest transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span className="text-[10px] font-bold">{t('nav_gallery')}</span>
        </a>
        <a href="#helpline" className="flex-1 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-brand-forest transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          <span className="text-[10px] font-bold">{t('nav_contact')}</span>
        </a>
      </div>
    </nav>
  );
}
