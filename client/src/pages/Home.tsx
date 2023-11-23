import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import logoIcon from '../assets/svg/logo.svg';
import homeImg from '../assets/images/home.png';
import chevronLeftIcon from '../assets/svg/chevron-left.svg';
import welcomeImg from '../assets/images/welcome.png';

// Custom Framer Motion Variants

const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
};

const fadeWithScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.3,
            type: 'spring',
            duration: 0.6,
            ease: 'easeInOut',
        },
    },
};

export default function Home() {
    const [view, setView] = useState(false);

    const toggleView = () => setView(!view); // Assuming true means 'HomePage' and false means 'WelcomePage'

    return (
        <div
            className={`px-5 lg:px-[150px] lg:pt-14 relative min-h-[100svh] ${
                view ? '' : 'mask'
            }`}
        >
            {/* Conditional rendering based on the 'view' state */}
            <AnimatePresence mode='wait'>
                {!view ? (
                    <HomePage action={toggleView} />
                ) : (
                    <WelcomePage action={toggleView} />
                )}
            </AnimatePresence>
        </div>
    );
}

interface PageProps {
    action: () => void;
}

function HomePage({ action }: PageProps) {
    return (
        <>
            {/* Logo Icon */}
            <header className='flex items-center justify-center gap-2 lg:justify-start pt-8 lg:pt-0'>
                <img
                    loading='lazy'
                    src={logoIcon}
                    alt="DiagnoBuddy's logo"
                    className='w-6 h-6 lg:w-10 lg:h-10'
                />
                <span className='font-mansalva text-xl lg:text-2xl text-mono-dark'>
                    diagnobuddy
                </span>
            </header>

            <motion.main className='lg:grid grid-cols-2 mt-8 mb-14 lg:mt-[60px]'>
                <div className='font-manrope text-center text-mono-dark mb-[75px] lg:mb-0 lg:text-left'>
                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.1,
                            type: 'spring',
                            duration: 0.6,
                        }}
                        className='text-[2.5rem] font-extrabold leading-[52px] max-w-[316px] mx-auto lg:text-[4rem] lg:leading-[80px] lg:max-w-[560px] lg:mx-0'
                    >
                        Feeling sick, tired or unwell?
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.1,
                            type: 'spring',
                            duration: 0.8,
                        }}
                        className='text-xl my-6 lg:my-10 lg:text-[2rem]'
                    >
                        Diagnobuddy is here to help.{' '}
                    </motion.p>

                    <motion.button
                        variants={fadeWithScale}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        onClick={action}
                        className='py-4 w-[200px] rounded-full bg-primary text-white font-bold lg:w-[315px] lg:text-xl'
                        aria-label='Click to go to Welcome Page'
                    >
                        Say hello
                    </motion.button>
                </div>

                <motion.img
                    variants={fadeRight}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    loading='lazy'
                    src={homeImg}
                    alt=''
                    width={558}
                    height={497}
                    className='mx-auto'
                />
            </motion.main>
        </>
    );
}

// interface FormData {
//     name: string;
//     email: string;
// }

function WelcomePage({ action }: PageProps) {
    const navigate = useNavigate();
    // const [formData, setFormData] = useState<FormData>({
    //     name: '',
    //     email: '',
    // });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Redirect to the chat page
        navigate('/chat', { replace: true });
    };

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target;
    // setFormData((prevData) => ({
    //     ...prevData,
    //     [name]: value,
    // }));
    // };
    return (
        <>
            {/* Logo Icon */}
            <header className='items-center justify-center gap-2 lg:justify-start hidden lg:flex'>
                <img
                    loading='lazy'
                    src={logoIcon}
                    alt="DiagnoBuddy's logo"
                    className='w-6 h-6 lg:w-10 lg:h-10'
                />
                <span className='font-mansalva text-xl lg:text-2xl text-mono-dark'>
                    diagnobuddy
                </span>
            </header>

            {/* Button toogles Page view */}
            <button
                onClick={action}
                className='float-left mt-4 -ml-3 lg:hidden'
            >
                <img
                    loading='lazy'
                    src={chevronLeftIcon}
                    alt='Click to go back'
                />
                <span className='sr-only'>Click to return to homepage</span>
            </button>

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className='lg:grid grid-cols-2 -mx-3 items-end justify-between lg:mx-0'
            >
                <div className='font-manrope text-mono-dark text-center lg:text-left'>
                    <h1 className='font-bold text-[2rem] my-[60px] lg:mb-[50px] lg:text-[4rem] lg:font-extrabold'>
                        Hello, <br /> Welcome!
                    </h1>

                    <form onSubmit={handleSubmit} className='lg:max-w-[460px]'>
                        {[
                            {
                                label: 'Your Name',
                                placeholder: 'John Doe',
                                type: 'text',
                            },
                            {
                                label: 'Email address',
                                placeholder: 'johndoe@gmail.com',
                                type: 'email',
                            },
                        ].map(({ label, placeholder, type }, index) => (
                            <motion.div
                                initial={{ opacity: 0, translateY: 50 }}
                                whileInView={{
                                    opacity: 1,
                                    translateY: 0,
                                    transition: {
                                        duration: 0.3,
                                        ease: 'easeIn',
                                        delay: index * 0.1, // Add a delay to stagger the animations
                                    },
                                }}
                                viewport={{ once: true, amount: 0.1 }}
                                key={label}
                                className='flex flex-col gap-4 mb-10 text-left lg:mb-8'
                            >
                                <label
                                    htmlFor={label}
                                    className='text-black font-semibold text-lg'
                                >
                                    {label}
                                </label>

                                <input
                                    type={type}
                                    name={label}
                                    id={label}
                                    // value={formData[name]}
                                    // onChange={handleInputChange}
                                    placeholder={placeholder}
                                    className='border border-[#878787] rounded-full py-[18px] px-4 placeholder:text-mono-dark bg-transparent lg:text-lg lg:py-4'
                                    required
                                />
                            </motion.div>
                        ))}

                        <motion.button
                            variants={fadeWithScale}
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            type='submit'
                            className='font-bold text-lg py-4 w-[250px] rounded-full bg-primary text-white mt-[81px] lg:w-full lg:mt-2 lg:text-xl'
                        >
                            Start Consultation
                        </motion.button>
                    </form>
                </div>

                <motion.img
                    variants={fadeRight}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    loading='lazy'
                    src={welcomeImg}
                    alt=''
                    width={558}
                    height={497}
                    className='hidden lg:block'
                />
            </motion.main>
        </>
    );
}
