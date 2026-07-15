import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiChatSmile3Line, RiCloseLine, RiSendPlane2Line, RiRobotLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am Healthie, your Book a Doctor virtual assistant. How can I help you today?",
      isBot: true,
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: 'Cardiology Specialist', action: '/doctors?specialization=Cardiology' },
    { label: 'How to Book?', text: 'How do I book an appointment?' },
    { label: 'Emergency Contact', text: 'I need emergency contact details.' },
    { label: 'Upload Medical Report', text: 'How do I upload medical reports?' }
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      text,
      isBot: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I'm sorry, I didn't quite catch that. Try using one of our quick helper options or searching our Doctors index!";
      const query = text.toLowerCase();

      if (query.includes('book') || query.includes('how to')) {
        botResponse = "To book an appointment, go to the 'Doctors' tab in the navbar. Search or filter for your specialist, choose a date & time slot, and click 'Confirm Appointment'. It is completely free!";
      } else if (query.includes('cardio') || query.includes('heart')) {
        botResponse = "I can guide you to our Cardiologists! Click the link below to filter our doctors by Cardiology specialization.";
        // Offer link trigger
        setTimeout(() => {
          navigate('/doctors?specialization=Cardiology');
        }, 1500);
      } else if (query.includes('emergency') || query.includes('phone') || query.includes('contact')) {
        botResponse = "For medical emergencies, please call our 24/7 Helpline: +91 1800-425-9999 immediately. Or visit our 'Contact' page.";
      } else if (query.includes('upload') || query.includes('report') || query.includes('record')) {
        botResponse = "You can upload reports in two ways: 1. During booking inside the slot picker form, or 2. On your 'Patient Dashboard' under 'Medical Reports'.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: botResponse,
          isBot: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-premium rounded-full flex items-center justify-center text-white shadow-2xl hover:opacity-90 focus:outline-none"
      >
        {isOpen ? <RiCloseLine className="w-7 h-7" /> : <RiChatSmile3Line className="w-7 h-7 animate-pulse" />}
      </motion.button>

      {/* Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[380px] h-[500px] bg-card dark:bg-card-dark rounded-custom shadow-2xl border border-borderColor dark:border-borderColor-dark flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-premium px-5 py-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-white/20 rounded-full">
                  <RiRobotLine className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Healthie Assistant</h4>
                  <p className="text-[10px] text-teal-100 flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 inline-block animate-ping"></span>
                    Online & Ready
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <RiCloseLine className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-900/30">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[75%] rounded-custom px-4 py-2.5 text-xs shadow-sm ${
                    msg.isBot
                      ? 'bg-card dark:bg-card-dark text-darkText dark:text-darkText-dark border border-borderColor dark:border-borderColor-dark rounded-tl-none'
                      : 'bg-primary text-white rounded-tr-none'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className={`block text-[9px] text-right mt-1 ${msg.isBot ? 'text-lightText' : 'text-blue-100'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom rounded-tl-none px-4 py-3 text-xs shadow-sm">
                    <div className="flex space-x-1">
                      <span className="w-2 h-2 bg-lightText rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-lightText rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-lightText rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="p-3 bg-white dark:bg-card-dark border-t border-borderColor dark:border-borderColor-dark overflow-x-auto whitespace-nowrap flex space-x-2 scrollbar-none">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => p.action ? navigate(p.action) : handleSend(p.text)}
                  className="inline-block text-[10px] font-semibold bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-dark px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all border border-primary/20"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-card dark:bg-card-dark border-t border-borderColor dark:border-borderColor-dark flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about slots, doctors, reports..."
                className="flex-grow bg-slate-100 dark:bg-slate-800 text-xs px-3.5 py-2.5 rounded-custom outline-none text-darkText dark:text-darkText-dark"
              />
              <button
                onClick={() => handleSend()}
                className="p-2.5 bg-primary hover:bg-primary-hover text-white rounded-custom transition-colors"
              >
                <RiSendPlane2Line className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingChat;
