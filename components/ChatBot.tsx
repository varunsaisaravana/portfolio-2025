import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { Chat, GenerateContentResponse } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi there! I'm Varun's AI Portfolio Assistant. I can help you explore his projects, explain how to use the AI Lab tools, or get in touch with him. How can I help you today?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session on Mount
  useEffect(() => {
    try {
      chatSessionRef.current = createChatSession();
    } catch (error) {
      console.error("Failed to initialize chat:", error);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading || !chatSessionRef.current) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const result: GenerateContentResponse = await chatSessionRef.current.sendMessage({ 
        message: userMessage.text 
      });
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: result.text || "I'm sorry, I couldn't generate a response."
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I apologize, but I'm having trouble connecting right now. Please try again later."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-indigo-500/40 hover:scale-110 transition-all duration-300 group"
        aria-label="Open Chat Assistant"
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white"></span>
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div 
        className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        onClick={() => setIsMinimized(false)}
      >
        <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
          <Bot size={20} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Portfolio Assistant
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
          className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full"
        >
          <X size={16} className="text-slate-500" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[400px] h-[500px] max-h-[80vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-cyan-600 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Portfolio Assistant</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-indigo-100 text-xs">Online with Gemini</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsMinimized(true)} 
            className="p-2 text-indigo-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Minimize"
          >
            <Minimize2 size={18} />
          </button>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 text-indigo-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' 
                ? 'bg-slate-200 dark:bg-slate-700' 
                : 'bg-indigo-100 dark:bg-indigo-900/30'
            }`}>
              {msg.role === 'user' ? (
                <User size={16} className="text-slate-600 dark:text-slate-300" />
              ) : (
                <Sparkles size={16} className="text-indigo-600 dark:text-indigo-400" />
              )}
            </div>
            
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-indigo-600 text-white rounded-tr-none'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none shadow-sm'
            }`}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
               <Loader2 size={16} className="text-indigo-600 dark:text-indigo-400 animate-spin" />
             </div>
             <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-none p-3 shadow-sm">
               <div className="flex gap-1">
                 <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                 <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Varun or the AI tools..."
            disabled={isLoading}
            className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none transition-all disabled:opacity-50"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className={`p-3 rounded-xl transition-all ${
              !inputText.trim() || isLoading
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <div className="text-center mt-2">
           <p className="text-[10px] text-slate-400 dark:text-slate-600">
             Powered by Gemini 3.0 Pro. AI may make mistakes.
           </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;