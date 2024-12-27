/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Dairy Products',
  'Sauce',
  'Gravy',
  'Dal',
  'Snacks',
  'Starter',
  'Tava Special',
  'Spices And Masala',
];

const Menu = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle category click and redirect
  const handleCategoryRedirect = (category) => {
    navigate({
      pathname: '/menu',
      search: `?category=${category}`, // Set the category as a query parameter
    });
  };

  if (loading) {
    return <div className='text-center mt-24 text-xl'>Loading...</div>;
  }

  return (
    <div className='mx-8 lg:max-w-[1400px] lg:mx-auto mt-20'>
      <h1 className='text-5xl uppercase font-semibold font-serif text-center'>
        Our Categories
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-24'>
        {categories.map((category, index) => (
          <div
            key={index}
            className='cursor-pointer bg-gray-200 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300'
            onClick={() => handleCategoryRedirect(category)}
          >
            <img
              src={`https://via.placeholder.com/300x200.png?text=${category}`} // Placeholder image (replace with actual images)
              alt={category}
              className='w-full h-[200px] object-cover'
            />
            <div className='p-4'>
              <h3 className='text-xl font-semibold text-center'>{category}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent redirect when button is clicked
                  handleCategoryRedirect(category);
                }}
                className='mt-4 bg-main hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full'
              >
                Explore More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
