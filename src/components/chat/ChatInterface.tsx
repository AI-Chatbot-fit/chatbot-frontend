import { useState } from 'react';
import { Paper, TextInput, Button, ScrollArea, Text } from '@mantine/core';
import { FaPaperPlane } from 'react-icons/fa';
import ChatMessage from './ChatMessage';
import { Message } from '../../types/chat';
import { useUserStore } from '../../store/userStore';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const role = useUserStore((state) => state.role);

  const getInitialMessage = () => {
    if (role === 'student') {
      return 'Xin chào! Tôi là chatbot HCMUTE. Tôi có thể giúp bạn tìm hiểu thông tin về điểm số, lịch học, và các vấn đề liên quan đến sinh viên. Bạn cần hỗ trợ gì?';
    }
    return 'Xin chào! Tôi là chatbot HCMUTE. Tôi có thể giúp bạn tìm hiểu thông tin về tuyển sinh, ngành học và các hoạt động của trường. Bạn cần hỗ trợ gì?';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // TODO: Integrate with chatbot API
    try {
      const botMessage: Message = {
        id: Date.now() + 1,
        content: getInitialMessage(),
        sender: 'bot',
        timestamp: new Date(),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  // Hiển thị tin nhắn chào mừng khi không có tin nhắn nào
  if (messages.length === 0) {
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: Date.now(),
        content: getInitialMessage(),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }, 500);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <Paper className="flex-1 p-4 mb-4 relative">
        <ScrollArea h="100%" type="always">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="text-gray-500 text-sm">Chatbot đang nhập...</div>
            )}
          </div>
        </ScrollArea>
      </Paper>

      <div className="flex gap-2">
        <TextInput
          className="flex-1"
          placeholder="Nhập tin nhắn của bạn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <Button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          leftSection={<FaPaperPlane size={16} />}
        >
          Gửi
        </Button>
      </div>
    </div>
  );
} 