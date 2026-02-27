import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your career guidance assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('career') || input.includes('job')) {
      return "I can help you explore various career paths! What are your interests? Are you more inclined towards Science, Commerce, or Arts?";
    } else if (input.includes('science') || input.includes('engineering')) {
      return "Science and Engineering offer exciting opportunities! You could consider careers in Software Development, Data Science, Mechanical Engineering, or Medical fields. Would you like to know more about any specific field?";
    } else if (input.includes('commerce') || input.includes('business')) {
      return "Commerce opens doors to Business, Finance, and Management careers. Popular options include Chartered Accountancy, MBA, Investment Banking, and Entrepreneurship. What interests you most?";
    } else if (input.includes('arts') || input.includes('humanities')) {
      return "Arts and Humanities offer diverse career paths in Law, Psychology, Journalism, Design, and Social Work. These fields combine creativity with analytical thinking. Would you like specific guidance?";
    } else if (input.includes('exam') || input.includes('entrance')) {
      return "For entrance exams, it depends on your chosen field. JEE for Engineering, NEET for Medical, CLAT for Law, and CUET for various undergraduate programs. Which field are you targeting?";
    } else {
      return "That's interesting! Could you tell me more about your academic interests and career goals? I'm here to help you find the right path.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] bg-gradient-to-b from-background via-accent/10 to-background flex flex-col">
      <div className="container mx-auto px-4 py-4 sm:py-6 flex-1 flex flex-col max-w-4xl">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Career Guidance Chatbot
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Ask me anything about careers, courses, and exams
          </p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 bg-card rounded-2xl border border-border shadow-soft overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                } animate-fade-in`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
                    message.sender === 'bot'
                      ? 'gradient-primary'
                      : 'bg-secondary'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[85%] sm:max-w-[75%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.sender === 'bot'
                      ? 'bg-accent text-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="bg-accent rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="border-t border-border p-4 bg-card">
            <div className="flex gap-2 sm:gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base min-h-[44px]"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="px-4 sm:px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:shadow-soft transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px] min-w-[44px]"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
