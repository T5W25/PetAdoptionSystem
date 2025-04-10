import React from 'react';
import MessageHistory from '@/components/MessageHistory/MessageHistory';

type Message = {
  id: string;
  sender: 'shelter' | 'caregiver';
  content: string;
  timestamp: string;
};

const sampleMessages: Message[] = [
  {
    id: '1',
    sender: 'shelter',
    content: 'Hi, how is Max doing today?',
    timestamp: '2025-04-08T10:30:00Z',
  },
  {
    id: '2',
    sender: 'caregiver',
    content: 'Max is doing great! He ate all his food.',
    timestamp: '2025-04-08T10:45:00Z',
  },
  {
    id: '3',
    sender: 'shelter',
    content: 'Awesome to hear! Let us know if you need supplies.',
    timestamp: '2025-04-08T11:00:00Z',
  },
];

const MessageHistoryTestPage = () => {
  return (
    <main className="p-6 min-h-screen bg-slate-100">
      <h1 className="text-2xl font-semibold text-center mb-6">Message History Test</h1>
      <MessageHistory messages={sampleMessages} />
    </main>
  );
};

export default MessageHistoryTestPage;
