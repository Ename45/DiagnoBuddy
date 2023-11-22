import { useState } from 'react';

import { getCurrentDate } from '../utils/dateUtils';

import Navbar from '../components/Navbar';
import Message from '../components/Message';

import sendIcon from '../assets/svg/send.svg';
import avatar from '../assets/images/ai.png';

export default function Chat() {
    const [messages, setMessages] = useState([
        { text: 'Hello there...', time: '7:23 AM', isUser: true },
        {
            text: 'Good morning nice to meet you. \n What is your name? Thank you for chatting with Diagnobuddy. Whatever advice you receive should not be substituted for professional medical diagnosis.',
            time: '7:23 AM',
            isUser: false,
        },
    ]);

    return (
        <main>
            <Navbar />

            <main className='px-4 pt-9 pb-28 font-manrope text-mono-dark bg-gray-light lg:bg-white lg:px-[150px] lg:pt-24 lg:pb-40 min-h-[90svh]'>
                <Greeting />

                <section aria-label='messages-container'>
                    {messages.map((message, index) => (
                        <Message key={index} data={message} />
                    ))}
                </section>

                <div className='max-w-[1440px] fixed left-4 right-4 bottom-0 pb-9 bg-gray-light rounded-t-[1.8rem] lg:left-[150px] lg:right-[150px] lg:pb-[50px] lg:bg-white'>
                    <form className=' bg-gray px-4 py-2 leading-6 flex items-center gap-4 rounded-full '>
                        <textarea
                            rows={1}
                            name='userInput'
                            placeholder='Type your message...'
                            className='w-full py-2 placeholder:text-mono-dark bg-transparent outline-none resize-none h-auto max-h-[260px]'
                        />
                        <button
                            type='submit'
                            className='bg-primary rounded-full h-10 w-10 py-1 pl-1 flex-shrink-0'
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
