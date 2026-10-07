import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Phone,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { REPRESENTATIVE_INFO } from '../data/internetPlans';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const MauriceAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I am Arinde Maurice's digital assistant. How can I help you choose the right fast internet package today? You can ask about speeds, prices, router installation, or coverage areas!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = input.trim();
    if (!query || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: query }]);
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get answer');

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || "I'd be glad to help! Please call or WhatsApp Maurice directly for specific details." },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm currently unable to reach the AI engine, but you can chat with Maurice directly on WhatsApp: " +
            REPRESENTATIVE_INFO.whatsappDisplay +
            ' or call ' +
            REPRESENTATIVE_INFO.phoneDisplay +
            '.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            id="open-ai-chat-btn"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/40 hover:scale-105 transition-all"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs font-bold hidden sm:inline">Ask Maurice AI</span>
          </button>
        )}
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Maurice’s Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-[11px] text-slate-400">Internet & Speed Consultation</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    AI
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 items-center text-slate-400 text-xs py-2">
                <Bot className="w-4 h-4 animate-spin text-blue-500" />
                <span>Maurice AI is replying...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Pills */}
          <div className="px-3 py-2 bg-slate-100/80 border-t border-slate-200 flex gap-1.5 overflow-x-auto text-[11px] text-slate-600">
            <button
              onClick={() => {
                setInput('Which package is best for gaming and low ping?');
              }}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-300 shrink-0 hover:bg-slate-50"
            >
              🎮 Best for gaming?
            </button>
            <button
              onClick={() => {
                setInput('How much does home internet cost?');
              }}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-300 shrink-0 hover:bg-slate-50"
            >
              💰 Pricing details?
            </button>
            <button
              onClick={() => {
                setInput('How do I schedule installation?');
              }}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-300 shrink-0 hover:bg-slate-50"
            >
              📅 Schedule survey?
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about packages, speeds, WiFi..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-blue-600 text-white disabled:bg-slate-300 hover:bg-blue-500 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
