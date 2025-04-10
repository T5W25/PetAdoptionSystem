'use client';

import React from 'react';
import styles from './MessageHistory.module.css';

type Message = {
  id: string;
  sender: 'shelter' | 'caregiver';
  content: string;
  timestamp: string;
};

interface Props {
  messages: Message[];
}

const MessageHistory: React.FC<Props> = ({ messages }) => {
  return (
    <div className={styles.historyContainer}>
      <h3>Message History</h3>
      <div className={styles.chatBox}>
        {messages.length === 0 ? (
          <p className={styles.noMessages}>No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${
                msg.sender === 'shelter' ? styles.shelter : styles.caregiver
              }`}
            >
              <div className={styles.meta}>
                <strong>{msg.sender === 'shelter' ? 'Shelter Staff' : 'Foster Caregiver'}</strong>
                <span className={styles.time}>
                  {new Date(msg.timestamp).toLocaleString()}
                </span>
              </div>
              <p className={styles.content}>{msg.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageHistory;
