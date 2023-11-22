import { useState } from 'react';

import uploadIcon from '../assets/svg/upload.svg';
import uploadBlueIcon from '../assets/svg/upload-blue.svg';
import chevronLeftIcon from '../assets/svg/chevron-left.svg';
import closeIcon from '../assets/svg/close.svg';

import avatar from '../assets/images/ai.png';
import modalImg from '../assets/images/modal.png';

export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

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

            {
                // Modal Overlay
                isModalOpen && (
                    <div className='fixed top-0 left-0 w-full h-full bg-black opacity-20 z-10' />
                )
            }

            {
                // Popup Modal
                isModalOpen && (
                    <div
                        className='font-manrope fixed bottom-0 left-0 right-0 z-50 h-fit rounded-t-[60px] bg-white px-9
                        lg:w-[500px] lg:h-[500px] lg:rounded-[20px] lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2'
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
                            className='mx-auto -mb-14'
                        />

                        <h3 className='max-w-[360px] text-xl leading-8 text-center mx-auto'>
                            Send a saved version of this conversation to your
                            email address.
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
                    </div>
                )
            }
        </>
    );
}
