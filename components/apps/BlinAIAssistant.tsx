
import React, { useState, useRef, useEffect, useCallback } from 'react';
import GlassmorphicCard from '../GlassmorphicCard';
import Input from '../Input';
import Button from '../Button';
import Loader from '../Loader';
import { generateTextResponse } from '../../services/geminiService';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

interface BlinAIAssistantProps {
  className?: string;
}

const BlinAIAssistant: React.FC<BlinAIAssistantProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await generateTextResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse || 'Sorry, I could not generate a response.',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'An error occurred while fetching the response. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full text-white ${className}`}>
      <h3 className="text-xl font-semibold mb-4">BLIN AI Assistant</h3>

      <GlassmorphicCard className="flex-grow p-4 mb-4 overflow-y-auto custom-scrollbar flex flex-col-reverse">
        <div ref={messagesEndRef} />
        {messages.slice().reverse().map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} mb-3`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-xl ${
                msg.sender === 'user' ? 'bg-blue-600/50' : 'bg-white/20'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start mb-3">
                 <Loader className="p-2 w-auto" message="AI is typing..." />
            </div>
        )}
      </GlassmorphicCard>

      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Ask BLIN AI anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !isLoading) handleSendMessage();
          }}
          className="flex-grow"
        />
        <Button onClick={handleSendMessage} disabled={isLoading || input.trim() === ''}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default BlinAIAssistant;
