import { useState } from 'react';
import { createImage, generateMessage } from '../utils/contentGenerator';
import ChatBubble from './ChatBubble';

type Message = {
  text: string;
  isUser: boolean;
  generatedImage?: string | undefined
};

type ChatProps = {
  title: string;
};

const sufix = 'give it in one line'

const questions = [
  {
    question: 'Are you a vegan?',
    no: 'I\'m not a vegan',
    yes: 'I\'m a vegan'
  },
  {
    question: 'Are you a keto diet?',
    no: 'I\'m not a keto',
    yes: 'I\'m a keto'
  },
  {
    question: 'Are you a traditional diet?',
    no: 'I\'m not a traditional diet',
    yes: 'I\'m a traditional diet'
  },
]

export const Chat = ({ title }: ChatProps) => {
  const [input, setInput] = useState(`Give me a recipe for a meal today, ${sufix}`);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const handleAnswers = (answer: string) => {
    
    // Dynamic access to the questions object
    // @ts-ignore
    const answers = questions[currentQuestion][answer];
    setInput(prevInput => prevInput.replace(sufix, `${answers} ${sufix}`))
    setCurrentQuestion(prevCurrentQuestion => prevCurrentQuestion + 1)
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true)
    const response = await generateMessage(input);
    const generatedImage: string | undefined = await createImage(response);
    
    setMessages([
      ...messages,
      { text: input, isUser: true },
      { text: response, isUser: false, generatedImage }
    ]);
    setLoading(false)
    setCurrentQuestion(0)
    setInput('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="w-96 mx-auto border shadow h-screen fixed bottom-0 max-h-full">
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-lg text-center font-medium">{title}</h2>
      </div>
      <div className="p-4 overflow-y-auto h-screen bottom-0 max-h-full">
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            text={message.text}
            isUser={message.isUser}
            generatedImage={message.generatedImage}
          />
        ))}
        <form onSubmit={handleSubmit} className="mt-4">
          {loading && 'Cooking a recipe for you 🍳 🍚 👨‍🍳 👩‍🍳 🧑🏽‍🍳 🧑🏿‍🍳 ...'}
          {!loading && (
            <>
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1"
              />
                <span className="py-1 inline-block flex justify-end">
                  {questions[currentQuestion] && (
                    <>
                      <span className="text-blue-900 pr-2">{questions[currentQuestion]?.question}</span>
                      <a className="text-blue-600 hover:text-blue-800" onClick={(event) => { event.preventDefault(); handleAnswers('yes') }} href="">Yes 👍</a> 
                      <a className="text-blue-600 hover:text-blue-800" onClick={(event) => { event.preventDefault(); handleAnswers('no') }} href="">No 🙅‍♀️</a>
                    </>
                  )}
                  {!questions[currentQuestion] && (
                    <button
                      className='mt-1 text-xs px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded' type='submit'>
                        I'm hungry! a recipe please! 😋
                    </button>
                  )}
                </span>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
