import { Link } from 'react-router-dom';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const MenuProductCard = ({ img, title, heading, price, to, onAddToCart }) => {
  return (
    <div className="relative bg-cardBg hover:bg-hoverCardBg min-h-72 flex flex-col items-center px-2 py-6 rounded-lg shadow-md">
      {/* Image Section */}
      <div className="relative w-full rounded-lg">
        <Link to={to}>
          <img
            className="w-full absolute -top-24 max-h-60 object-contain transition-transform duration-300 transform hover:scale-95 drop-shadow-md hover:drop-shadow-2xl"
            src={img}
            alt="food1"
          />
        </Link>
      </div>

      {/* Content Section */}
      <div className="mt-72 md:mt-56 lg:mt-44 font-montserrat w-full text-center space-y-3 z-10">
        <Link to={to}>
          <p className="text-xl font-semibold text-gray-800">{title}</p>
          <Separator className="bg-primaryBg" />
          <p className="text-md text-gray-600">{heading}</p>
        </Link>

        <div className="flex justify-between space-x-4 mt-2 items-center">
          <Link to={to}>
            <span className="text-main font-semibold text-lg">{price}</span>
          </Link>

          {/* Add to Cart Button */}
          <Button
            className="bg-main rounded-full w-8 h-8 text-3xl flex pb-3 pr-4 items-center justify-center"
            onClick={onAddToCart} // This triggers the add-to-cart action
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuProductCard;
