import { Button } from '../ui/button';

const OfferCard = ({ img, title, heading, className, object }) => {
  return (
    <div
      className={`relative max-h-80 flex flex-col md:flex-row items-center ${className} p-4 md:p-6 rounded-lg shadow-lg hover:shadow-custom transition-shadow duration-300 overflow-hidden`}
    >
      {/* Image Section */}
      <div className="w-full md:w-1/2 md:h-56 hidden lg:block mb-4 md:mb-0 relative overflow-hidden rounded-lg">
        <img
          src={img}
          alt="offer"
          className={`w-full h-full object-cover ${
            object ? object : 'object-center'
          } transform hover:scale-105 transition-transform duration-300 `}
        />
      </div>

      {/* Content Section */}
      <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-center items-center md:items-start text-center md:text-left w-full md:w-1/2">
        <p className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-widest">
          {title}
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold whitespace-nowrap font-montserrat mt-2">
          {heading}
        </h2>
        <Button className="mt-4  w-24 md:w-28 bg-main text-white font-medium rounded-full shadow-md hover:bg-primaryBg hover:text-main hover:shadow-lg transition-all duration-300">
          Order Now
        </Button>
      </div>
    </div>
  );
};

export default OfferCard;
