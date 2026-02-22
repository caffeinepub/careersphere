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
      text: "Hi! I'm your Career Guidance Assistant. I'm here to help you explore your skills and find the perfect career path. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
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

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('skill') || lowerInput.includes('strength')) {
      return "Great question! To identify your skills, think about: What subjects do you excel in? What activities make you lose track of time? What do friends ask you for help with? Would you like to take our skill assessment quiz?";
    } else if (lowerInput.includes('career') || lowerInput.includes('job')) {
      return "I can help you explore various career options! Are you interested in Science, Commerce, or Arts? Or would you like to know about specific careers like Engineering, Medicine, Business, or Creative fields?";
    } else if (lowerInput.includes('stream') || lowerInput.includes('subject')) {
      return "Choosing the right stream is crucial! I recommend taking our Stream Selector Quiz. It will help you discover whether Science, Commerce, or Arts is the best fit for you based on your interests and strengths.";
    } else if (lowerInput.includes('exam') || lowerInput.includes('entrance')) {
      return "There are many entrance exams depending on your field: JEE for Engineering, NEET for Medicine, CLAT for Law, CAT for MBA, and many more. Which field interests you?";
    } else if (lowerInput.includes('abroad') || lowerInput.includes('foreign')) {
      return "Studying abroad can be a great opportunity! Check out our India vs Abroad comparison tool to understand the costs, benefits, and opportunities. Would you like to know about specific countries?";
    } else {
      return "That's interesting! I'm here to help with career guidance, skill assessment, stream selection, and educational planning. Feel free to ask me about any of these topics, or explore our other modules for detailed information!";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="py-8 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4 h-[calc(100vh-12rem)]">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="text-center mb-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Career Assistant
              </span>
            </h1>
            <p className="text-muted-foreground">Ask me anything about your career and skills</p>
          </div>

          <div className="flex-1 bg-card rounded-2xl border border-border shadow-soft-lg flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 animate-fade-in ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'gradient-primary text-white'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className="w-5 h-5" />
                    ) : (
                      <Bot className="w-5 h-5" />
                    )}
                  </div>
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-foreground'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border p-4 bg-gradient-card">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:shadow-soft transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
