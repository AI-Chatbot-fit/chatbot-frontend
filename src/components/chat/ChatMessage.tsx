import { Paper, Avatar } from '@mantine/core';
import { FaUser, FaRobot } from 'react-icons/fa';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Message } from '../../types/chat';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      <Avatar color={isBot ? 'blue' : 'gray'} radius="xl">
        {isBot ? <FaRobot size={20} /> : <FaUser size={20} />}
      </Avatar>
      <div className={`flex flex-col ${isBot ? '' : 'items-end'} max-w-[80%]`}>
        <Paper
          className={`p-3 ${
            isBot ? 'bg-primary-50' : 'bg-gray-100'
          } break-words`}
          radius="md"
        >
          {isBot ? (
            <ReactMarkdown className="prose prose-sm max-w-none">
              {message.content}
            </ReactMarkdown>
          ) : (
            message.content
          )}
        </Paper>
        <span className="text-xs text-gray-500 mt-1">
          {format(message.timestamp, 'HH:mm', { locale: vi })}
        </span>
      </div>
    </div>
  );
} 