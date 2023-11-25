import { useState, useEffect, useRef } from 'react';

import { getCurrentDate, getCurrentTime } from '../utils/dateUtils';
import useChatStore from '../store/chatStore';

import Navbar from '../components/Navbar';
import Message from '../components/Message';

import sendIcon from '../assets/svg/send.svg';
import avatar from '../assets/images/ai.png';

export default function Chat() {
    const { userName, userEmail, messages, addMessage, deleteLastMessage } =
        useChatStore();
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false); // Track if a request is being sent

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messages.length)
            containerRef.current?.scrollIntoView({
                behavior: 'smooth',
            });
    }, [messages.length]);

    const BOT = 'DiagnoBuddy';
    const apiURL =
        'https://diagnobuddyserver-production.up.railway.app/api/v1/diagnoBuddy/chats';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Disable the send button and textarea during the request
        setIsSending(true);

        // Add user's message to the chat using Zustand
        addMessage({
            id: 'thiing',
            sender: userName,
            text: message,
            time: getCurrentTime(),
            isUser: true,
        });

        // Clear the input field
        setMessage('');

        // Display chatbot response with loading animation
        addMessage({
            id: 'thinking',
            sender: BOT,
            text: 'Typing...',
            time: getCurrentTime(),
            isUser: false,
        });

        try {
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    message: message,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            deleteLastMessage(); // Remove the loading animation

            // Add chatbot's response to the chat using Zustand
            addMessage({
                id: 'thiinsdg',
                sender: 'DiagnoBuddy',
                text: data.AI_out,
                time: getCurrentTime(),
                isUser: false,
            });
        } catch (error) {
            console.error('Error calling API:', error);

            deleteLastMessage(); // Remove the loading animation

            // Display an error message in the chat if the API call fails
            addMessage({
                id: 'bonks',
                sender: BOT,
                text: 'Oops! Something went wrong. Please try again.',
                time: getCurrentTime(),
                isUser: false,
            });
        } finally {
            // Enable the send button and textarea after the request is completed
            setIsSending(false);
        }
    };

    // Update the message state as the user types in the textarea
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    // Handle key events in the textarea, specifically preventing new lines on Enter without Shift
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevents a new line in the textarea

            return message.trim().length < 3 ? null : handleSubmit(e); // Prevents sending a message if it's less than 3 characters
        }
    };

    return (
        <main className='flex flex-col h-full'>
            <Navbar />

            <main className='px-4 pt-9 font-manrope text-mono-dark bg-gray-light lg:bg-white lg:px-[150px] lg:pt-24 max-width flex-1 w-full relative flex flex-col'>
                <Greeting />

                {/* Messages Container */}
                <section
                    aria-label='messages-container'
                    className='flex-1 overflow-hidden'
                >
                    {messages.map((message, index) => (
                        <Message key={index} data={message} />
                    ))}
                    <div className='pb-6' ref={containerRef}></div>
                </section>

                <div className='sticky bottom-0 pt-6 pb-9 bg-gray-light rounded-t-[1.8rem] lg:left-[150px] lg:right-[150px] lg:pb-[50px] lg:bg-white'>
                    <form
                        onSubmit={handleSubmit}
                        className=' bg-gray px-4 py-2 leading-6 flex items-center gap-4 rounded-full '
                    >
                        <textarea
                            rows={1}
                            value={message}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder='Type your message...'
                            className='w-full py-2 placeholder:text-mono-dark bg-transparent outline-none resize-none h-auto max-h-[260px]'
                            disabled={isSending} // Disable the textarea during the request
                        />
                        <button
                            type='submit'
                            className='bg-primary rounded-full h-10 w-10 py-1 pl-1 flex-shrink-0'
                            disabled={isSending || message.trim().length < 3} // Disable the send button conditionally
                        >
                            <img src={sendIcon} alt='' className='mx-auto' />

                            <span className='sr-only'>Send message</span>
                        </button>
                    </form>
                </div>
            </main>
        </main>
    );
}

function Greeting() {
    return (
        <div className='lg:text-center'>
            <img
                loading='lazy'
                src={avatar}
                alt=''
                className='w-[120px] h-[102px] lg:w-[200px] lg:h-[170px] lg:mx-auto'
            />

            <h1 className='font-bold text-2xl mt-5 mb-4 lg:mt-9 lg:mb-7'>
                Diagnobuddy
            </h1>

            <p className='font-medium text-mono-dark/60 max-w-[675px] lg:text-lg lg:text-mono-light lg:leading-8 lg:mx-auto'>
                Thank you for chatting with Diagnobuddy. Whatever advice you
                receive should not be substituted for professional medical
                diagnosis.
            </p>

            <div className='relative h-[1px] w-full bg-mono-dark/60 mt-9 mb-6 lg:mt-16 lg:mb-14'>
                <span className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-medium text-sm px-4 bg-gray-light lg:text-base lg:px-8 lg:bg-white'>
                    {getCurrentDate()}
                </span>
            </div>
        </div>
    );
}
