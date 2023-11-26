import { useState, useEffect } from 'react';

import aiAvatar from '../assets/images/ai.png';
import userAvatar from '../assets/images/user.png';

interface MessageProps {
    data: {
        text: string;
        time: string;
        isUser: boolean;
    };

    action?: () => void;
}

type AnimationProps = {
    text: string;
    scrollToBottom: () => void;
};

const TypingAnimation = ({ text, scrollToBottom }: AnimationProps) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let currentTextIndex = 0;
        let intervalId: number | null = null;

        const updateText = () => {
            setDisplayText((prevText) =>
                currentTextIndex < text.length
                    ? text.slice(0, currentTextIndex + 1)
                    : prevText
            );

            currentTextIndex += 1;

            // Check if the current character is a newline
            const isNewline =
                currentTextIndex < text.length &&
                text[currentTextIndex] === '\n';

            if (isNewline) {
                // Scroll to the bottom when a newline is encountered
                scrollToBottom();
            }

            if (currentTextIndex >= text.length) {
                // Scroll to the bottom when the typing animation is complete
                scrollToBottom();

                // Clear the interval when the animation is complete
                clearInterval(intervalId!);
                intervalId = null;
            }
        };

        // Clear any existing interval before setting a new one
        clearInterval(intervalId!);

        // Set interval dynamically based on the length of the text
        const intervalDuration = Math.max(20, Math.floor(1000 / text.length));

        // Set up the new interval
        intervalId = setInterval(updateText, intervalDuration);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(intervalId!);
        };
    }, [text]);

    return <span>{displayText}</span>;
};

export default function Message({ data, action }: MessageProps) {
    return (
        <div
            className={`px-2 py-4 font-manrope flex items-start gap-2 w-full lg:p-4 relative lg:w-fit ${
                data.isUser
                    ? ''
                    : 'bg-primary-light/40 rounded-r-[30px] rounded-bl-[30px]'
            }`}
        >
            <img
                src={`${data.isUser ? userAvatar : aiAvatar}`} // Shows userAvatar to match with the user's text
                alt=''
                className='w-12 h-10 lg:w-[60px] lg:h-[51px]'
            />

            <div>
                <div className='flex items-center gap-2 lg:text-lg'>
                    <h2 className='font-bold'>
                        {data.isUser ? 'You' : 'Diagnobuddy'}
                    </h2>
                    <span className='font-medium text-xs text-[#6C6C6C] lg:mt-0.5'>
                        {data.time}
                    </span>
                </div>

                <div className='leading-6 lg:text-lg max-w-[550px] whitespace-pre-wrap break-words'>
                    {data.isUser ? (
                        data.text
                    ) : (
                        <TypingAnimation
                            text={data.text}
                            scrollToBottom={action ? action : () => {}}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
