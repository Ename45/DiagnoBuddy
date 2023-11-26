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
        if (messages.length > 0 && messages[messages.length - 1].text) {
            containerRef.current?.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [messages]);

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

        try {
            // Check if a session ID exists in sessionStorage
            let sessionId = sessionStorage.getItem('sessionId');
            let expirationTime = sessionStorage.getItem('expirationTime');

            // If no session ID or it has expired, make the API call to get a new one
            if (!sessionId || isSessionExpired(expirationTime)) {
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
                    throw new Error('Error getting session ID from the API');
                }

                const data: { sessionId: string } = await response.json();

                // Extract the session ID and set a fixed expiration time (e.g., 5 minutes from now)
                sessionId = data.sessionId;
                expirationTime = (Date.now() + 5 * 60 * 1000).toString(); // 5 minutes in milliseconds

                // Store the new session ID and expiration time in sessionStorage
                sessionStorage.setItem('sessionId', sessionId);
                sessionStorage.setItem('expirationTime', expirationTime);
            }

            // Check if the session has expired before making the API call
            if (isSessionExpired(expirationTime)) {
                throw new Error('Session has expired');
            }

            const apiResponse = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Session-Id': sessionId!,
                },
                body: JSON.stringify({
                    email: userEmail,
                    message: message,
                }),
            });

            if (!apiResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await apiResponse.json();

            console.log(responseData);

            deleteLastMessage(); // Remove the loading animation

            // Add chatbot's response to the chat using Zustand
            addMessage({
                id: 'thiinsdg',
                sender: BOT,
                text: responseData.data.AI_out,
                time: getCurrentTime(), // Assuming getCurrentTime is defined somewhere in your component
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
                time: getCurrentTime(), // Assuming getCurrentTime is defined somewhere in your component
                isUser: false,
            });
        } finally {
            // Enable the send button and textarea after the request is completed
            setIsSending(false);
        }
    };

    // Function to check if the session has expired
    const isSessionExpired = (expirationTime: string | null) => {
        if (!expirationTime) {
            return true;
        }

        return Date.now() > parseInt(expirationTime, 10);
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
        <div className='flex flex-col h-full'>
            <Navbar />

            <main className='font-manrope text-mono-dark bg-gray-light h-[100.1vh]'>
                <div className='px-4 pt-9 lg:px-[150px] lg:pt-24 max-width flex-1 w-full relative flex flex-col'>
                    <Greeting />

                    {/* Messages Container */}
                    <section
                        aria-label='messages-container'
                        className='flex-1 overflow-hidden space-y-6 lg:space-y-8'
                    >
                        {messages.map((message, index) => (
                            <Message key={index} data={message} />
                        ))}
                        <div ref={containerRef}></div>
                    </section>

                    <div className='sticky bottom-0 mt-6 pb-9 bg-gray-light rounded-t-[1.8rem] lg:left-[150px] lg:right-[150px] lg:pb-[50px]'>
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
                                className={`rounded-full h-10 w-10 py-1 pl-1 flex-shrink-0 ${
                                    isSending || message.trim().length < 3
                                        ? 'bg-[#878787]'
                                        : 'bg-primary primary-btn'
                                }`}
                                disabled={
                                    isSending || message.trim().length < 3
                                } // Disable the send button conditionally
                            >
                                <img
                                    src={sendIcon}
                                    alt=''
                                    className='mx-auto'
                                />

                                <span className='sr-only'>Send message</span>
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
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
                <span className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-medium text-sm px-4 bg-gray-light lg:text-base lg:px-8'>
                    {getCurrentDate()}
                </span>
            </div>
        </div>
    );
}
