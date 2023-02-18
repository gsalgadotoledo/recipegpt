import React from 'react';

type ChatBubbleProps = {
  text: string;
  isUser: boolean;
  generatedImage?: string | undefined
};

const ChatBubble = ({ text, isUser, generatedImage }: ChatBubbleProps) => {
  const classes = isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900';
  return <div
    className={`py-2 px-4 my-2 rounded-lg whitespace-pre-wrap ${classes}`}
  >{generatedImage && <img src={generatedImage} alt="Generated Image" />}{text}</div>;
};

export default ChatBubble;
