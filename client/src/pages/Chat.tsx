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

    // Function to scroll to the bottom of the messages container
    const scrollToBottom = () =>
        containerRef.current?.scrollIntoView({
            behavior: 'smooth',
        });

    useEffect(() => {
        if (messages.length) scrollToBottom();
    }, [messages]);

    const BOT = 'DiagnoBuddy';
    const apiURL =
        'https://cors-anywhere.herokuapp.com/https://diagnobuddyserver-production.up.railway.app/api/v1/diagnoBuddy/chats';

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

            // Scroll to the bottom after the new message has been added
            setTimeout(scrollToBottom, 2000);
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
        <div className='flex flex-col'>
            <Navbar />

            <main className='font-manrope text-mono-dark bg-gray-light lg:bg-white'>
                <div className='px-4 pt-9 lg:px-[150px] lg:pt-24 max-width flex-1 w-full relative flex flex-col min-h-screen'>
                    <Greeting />

                    {/* Messages Container */}
                    <section
                        aria-label='messages-container'
                        className='flex-1 overflow-hidden space-y-6 lg:space-y-8'
                    >
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                data={message}
                                action={scrollToBottom}
                            />
                        ))}
                        <div ref={containerRef}></div>
                    </section>

                    <div className='sticky bottom-0 pb-9 bg-gray-light rounded-t-[1.8rem] lg:left-[150px] lg:right-[150px] lg:pb-[50px] lg:bg-white'>
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
                className='w-[100px] h-[85px] lg:w-[200px] lg:h-[170px] lg:mx-auto'
            />

            <h1 className='font-bold text-lg lg:text-2xl mt-6 mb-2 lg:mt-9 lg:mb-8'>
                Diagnobuddy
            </h1>

            <p className='font-medium text-mono-dark/60 max-w-[675px] text-sm leadeing-6 lg:text-lg lg:text-mono-light lg:leading-8 lg:mx-auto'>
                Thank you for chatting with Diagnobuddy. Whatever advice you
                receive should not be substituted for professional medical
                diagnosis.
            </p>

            <div className='mt-9 mb-6 lg:mt-16 lg:mb-14 font-medium text-sm px-4 lg:text-base lg:px-8 flex items-center justify-center '>
                {getCurrentDate()}
            </div>
        </div>
    );
}
