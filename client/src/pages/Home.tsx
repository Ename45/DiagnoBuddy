import logoIcon from '../assets/svg/logo.svg';
import homeImg from '../assets/images/home.png';

export default function Home() {
    return (
        <div className='pt-11 px-7 lg:px-[150px] lg:pt-14 relative mask h-[100svh] overflow-hidden'>
            {/* Logo Icon */}
            <div className='flex items-center justify-center gap-2 lg:justify-start'>
                <img
                    loading='lazy'
                    src={logoIcon}
                    alt="DiagnoBuddy's logo"
                    className='w-6 h-6 lg:w-10 lg:h-10'
                />
                <span className='font-mansalva text-xl lg:text-2xl text-mono-dark'>
                    diagnobuddy
                </span>
            </div>

            <main className='lg:grid grid-cols-2 mt-11 lg:mt-[60px]'>
                <div className='font-manrope text-center text-mono-dark mb-[75px] lg:mb-0 lg:text-left'>
                    <h1 className='text-[2.5rem] font-extrabold leading-[52px] max-w-[316px] mx-auto lg:text-[4rem] lg:leading-[80px] lg:max-w-[560px] lg:mx-0'>
                        Feeling sick, tired or unwell?
                    </h1>

                    <p className='text-2xl my-8 lg:my-10 lg:text-[2rem]'>
                        Diagnobuddy is here to help.{' '}
                    </p>

                    <button className='py-4 w-[200px] rounded-full bg-primary text-white font-bold text-lg lg:w-[315px] lg:text-xl'>
                        Say hello
                    </button>
                </div>

                <img
                    loading='lazy'
                    src={homeImg}
                    alt=''
                    width={558}
                    height={497}
                    className='mx-auto'
                />
            </main>
        </div>
    );
}
