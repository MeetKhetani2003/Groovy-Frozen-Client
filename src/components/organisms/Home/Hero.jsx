import { Button } from '@/components/ui/button';
import { assets } from '@/utils/AssetImport';

const Hero = () => {
  return (
    <div>
      <div className="relative">
        <img className="w-full h-[100vh]" src={assets.bgImg} alt="bg" />
        <div className="absolute top-[40%] text-center lg:top-24  left-6 lg:left-24 flex items-center justify-center">
          <div className="lg:w-2/4 hidden lg:block">
            <img src={assets.veg} alt="veg" />
          </div>
          <div className="lg:w-2/4 lg:ml-12 lg:mb-28">
            <p className="font-montserrat">Welcome to</p>
            <span className="leading-none lg:flex-none flex justify-center">
              <p className=" text-6xl md:text-8xl lg:text-[120px] font-serif">
                Groovy{' '}
              </p>
              <p className=" text-6xl md:text-8xl lg:text-[120px] font-serif">
                Foods{' '}
              </p>
            </span>
            <p className="text-lg font-montserrat mt-4 text-gray-800">
              serving delicious ready-to-eat and frozen meals for over 20 years.
              Experience the perfect blend of convenience, taste, and quality in
              every bite!
            </p>

            <Button className="mt-4 bg-primaryBg border border-main shadow-lg hover:bg-main text-main hover:text-white lg:px-6 lg:py-4 hover:shadow-lg hover:shadow-primaryBg">
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
