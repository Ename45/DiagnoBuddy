import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import uploadIcon from '../assets/svg/upload.svg';
import uploadBlueIcon from '../assets/svg/upload-blue.svg';
import chevronLeftIcon from '../assets/svg/chevron-left.svg';
import closeIcon from '../assets/svg/close.svg';

import avatar from '../assets/images/ai.png';
import modalImg from '../assets/images/folder.png';

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
            <nav className=' bg-[#E8E3F3] font-manrope text-mono-dark sticky top-0 z-10'>
                <div className='flex items-center justify-between py-6 px-4 lg:px-[150px] lg:py-6 max-width lg:bg-white/50'>
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
                </div>
            </nav>

            <AnimatePresence>
                {isModalOpen && (
                    <div className='grid place-items-center fixed inset-0 z-50'>
                        {/* // Modal Overlay */}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className='fixed top-0 left-0 w-full h-full bg-black z-10'
                        />

                        {/* Modal */}
                        <motion.div
                            initial={
                                windowWidth >= 1010
                                    ? { opacity: 0, scale: 0.6 }
                                    : { opacity: 0.8, y: 500 }
                            }
                            animate={
                                windowWidth >= 1010
                                    ? { opacity: 1, scale: 1 }
                                    : { opacity: 1, y: 0 }
                            }
                            exit={
                                windowWidth >= 1010
                                    ? { opacity: 0, scale: 0.6 }
                                    : { opacity: 1, y: 500 }
                            }
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className='font-manrope fixed bottom-0 left-0 right-0 z-50 h-fit rounded-t-[60px] bg-white px-9
                        lg:w-[500px] lg:h-[500px] lg:rounded-[20px] lg:static'
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
                                width={120}
                                height={98}
                                className='mx-auto mt-[95px]'
                            />

                            <h3 className='max-w-[255px] text-lg font-medium leading-8 text-center mx-auto my-8 lg:text-xl lg:max-w-[374px] lg:mt-7'>
                                Send a saved version of this conversation to
                                your email address.
                            </h3>

                            <div className='max-w-[210px] font-bold space-y-5 mx-auto mb-20 lg:text-xl lg:max-w-[250px]'>
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
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
