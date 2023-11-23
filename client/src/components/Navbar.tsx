import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import uploadIcon from '../assets/svg/upload.svg';
import uploadBlueIcon from '../assets/svg/upload-blue.svg';
import chevronLeftIcon from '../assets/svg/chevron-left.svg';
import closeIcon from '../assets/svg/close.svg';

import avatar from '../assets/images/ai.png';
import modalImg from '../assets/images/modal.png';

export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    // Update the width when the window is resized
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        // Attach the event listener on component mount
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <>
            <nav className='flex items-center justify-between py-6 px-4 bg-[#E8E3F3] lg:px-[150px] lg:py-6 lg:bg-[#E8E3F3]/50 font-manrope text-mono-dark '>
                <div className='flex gap-4 items-center'>
                    {/* Icon that displays only on Mobile View */}
                    <img
                        loading='lazy'
                        src={chevronLeftIcon}
                        alt=''
                        className='lg:hidden'
                    />

                    {/* Avatar that displays only on Desktop View */}
                    <img
                        loading='lazy'
                        src={avatar}
                        alt=''
                        className='hidden lg:block w-[60px] h-[50px]'
                    />

                    <div className='space-y-2'>
                        <h3 className='font-bold text-xl'>Diagnobuddy</h3>

                        <p className='hidden lg:block'>online</p>
                    </div>
                </div>

                <button
                    onClick={toggleModal}
                    className='lg:px-4 lg:py-2 lg:bg-white lg:flex gap-4 items-center lg:rounded-full'
                >
                    <img
                        loading='lazy'
                        src={uploadIcon}
                        alt=''
                        className='lg:hidden'
                    />

                    <img
                        loading='lazy'
                        src={uploadBlueIcon}
                        alt=''
                        className='hidden lg:block'
                    />

                    <p className='hidden lg:block font-bold'>Save Chat</p>

                    <span className='sr-only'>
                        Click to save a version of this conversation to your
                        email address
                    </span>
                </button>
            </nav>

            <AnimatePresence>
                {
                    // Modal Overlay
                    isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className='fixed top-0 left-0 w-full h-full bg-black z-10'
                        ></motion.div>
                    )
                }

                {
                    // Popup Modal
                    isModalOpen && (
                        <motion.div
                            initial={
                                windowWidth >= 1010
                                    ? { opacity: 0 }
                                    : { opacity: 0.8, y: 500 }
                            }
                            animate={
                                windowWidth >= 1010
                                    ? { opacity: 1 }
                                    : { opacity: 1, y: 0 }
                            }
                            exit={
                                windowWidth >= 1010
                                    ? { opacity: 0 }
                                    : { opacity: 0.8, y: 500 }
                            }
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className='font-manrope fixed bottom-0 left-0 right-0 z-50 h-fit rounded-t-[60px] bg-white px-9
                        lg:w-[500px] lg:h-[500px] lg:rounded-[20px] lg:m-auto lg:-top-1/2 lg:translate-y-1/2'
                        >
                            <button
                                onClick={toggleModal}
                                className='float-right lg:hidden'
                            >
                                <img src={closeIcon} alt='' className='mt-8' />

                                <span className='sr-only'>
                                    Click to close Modal
                                </span>
                            </button>

                            <img
                                loading='lazy'
                                src={modalImg}
                                alt=''
                                className='mx-auto -mb-14 w-[230px] h-[321px]'
                            />

                            <h3 className='max-w-[360px] text-xl leading-8 text-center mx-auto'>
                                Send a saved version of this conversation to
                                your email address.
                            </h3>

                            <div className='max-w-[250px] font-bold space-y-5 mx-auto mb-12 mt-8'>
                                <button
                                    onClick={toggleModal}
                                    className='py-4 bg-primary text-white w-full rounded-full'
                                >
                                    Yes, Please
                                </button>

                                <button
                                    onClick={toggleModal}
                                    className='py-4 bg-gray text-mono-dark w-full rounded-full'
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    );
}
