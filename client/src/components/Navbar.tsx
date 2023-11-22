import uploadIcon from '../assets/svg/upload.svg';
import uploadBlueIcon from '../assets/svg/upload-blue.svg';
import avatar from '../assets/images/ai.png';
import chevronLeftIcon from '../assets/svg/chevron-left.svg';

export default function Navbar() {
    return (
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

            <button className='lg:px-4 lg:py-2 lg:bg-white lg:flex gap-4 items-center lg:rounded-full'>
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
                    Click to save a version of this conversation to your email
                    address
                </span>
            </button>
        </nav>
    );
}
