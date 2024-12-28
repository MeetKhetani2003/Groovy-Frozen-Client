import { useNavigate } from 'react-router-dom';

import { assets } from '@/utils/AssetImport';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='relative'>
        <img
          className='w-full h-[70vh] md:h-[100vh]'
          src={assets.bgImg}
          alt='bg'
        />
        <div className='absolute top-[30%] md:top-[40%] text-center lg:top-24  left-0 lg:left-22 flex items-center justify-center px-6'>
          <div className='lg:w-2/4 hidden lg:block'>
            <img src={assets.veg} alt='veg' />
          </div>
          <div className='lg:w-2/4 lg:ml-12 lg:mb-28'>
            <p className='font-montserrat'>Welcome to</p>
            <span className='leading-none lg:flex-none flex justify-center'>
              <p className=' text-6xl md:text-8xl lg:text-[120px] font-serif'>
                Groovy{' '}
              </p>
              <p className=' text-6xl md:text-8xl lg:text-[120px] font-serif'>
                Foods{' '}
              </p>
            </span>
            <p className='text-lg font-montserrat mt-4 text-gray-800'>
              serving delicious ready-to-eat and frozen meals for over 20 years.
              Experience the perfect blend of convenience, taste, and quality in
              every bite!
            </p>

            <button
              onClick={() => navigate('/contact')}
              className='mt-4 bg-primaryBg border text-lg border-main shadow-lg hover:bg-main text-main hover:text-white  px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-primaryBg'
            >
              Inquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
