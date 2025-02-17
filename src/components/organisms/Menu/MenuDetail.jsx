import { useState, useEffect } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import { useParams } from 'react-router-dom';

import { useProductStore } from '@/zustand/apis/ProductStore';

import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

const DetailedImages = () => {
  const { getSingleProduct, product, setProduct } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const { id } = useParams();
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await getSingleProduct(id);
      setProduct(response.data);

      // Ensure that detailedImages exist before setting mainImage
      if (
        response.data.detailedImages &&
        response.data.detailedImages.length > 0
      ) {
        setMainImage(response.data.detailedImages[0]);
      }
      console.log('Product fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Assuming we want the first product from the API response
  // const product = product?.[0] || null;
  // const detailedImages = product?.photos || []; // Using API field for images

  // useEffect(() => {
  //   if (detailedImages.length > 0) {
  //     setMainImage(detailedImages[0]); // Set first image as default
  //   }
  // }, [detailedImages]);

  if (loading) {
    return (
      <p className='text-center py-10 text-lg font-semibold'>
        Loading product details...
      </p>
    );
  }

  if (!product) {
    return (
      <p className='text-center py-10 text-lg font-semibold text-red-500'>
        No product found.
      </p>
    );
  }

  return (
    <div className='max-w-7xl mx-auto p-5 sm:p-10'>
      <div className='flex flex-col lg:flex-row gap-8 pt-28'>
        {/* Product Images Section */}
        <div className='flex flex-col sm:flex-row gap-4 w-full lg:w-1/2'>
          {/* Thumbnails - scrollable on mobile */}
          <div className='flex sm:flex-col gap-2 sm:gap-4 order-2 sm:order-1 overflow-x-auto sm:overflow-visible whitespace-nowrap sm:whitespace-normal'>
            {Array.isArray(product.detailedImages) &&
              product.detailedImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  onMouseEnter={() => setMainImage(image)}
                  className={`w-16 h-16 sm:w-[100px] sm:h-[100px] object-cover cursor-pointer border-2 flex-shrink-0 ${
                    mainImage === image ? 'border-black' : 'border-transparent'
                  }`}
                />
              ))}
          </div>

          {/* Main Image */}
          <div className='w-full flex-1 order-1 sm:order-2'>
            <InnerImageZoom
              src={mainImage}
              zoomSrc={mainImage}
              zoomType='click'
              zoomScale={1.8}
              moveType='drag'
              fullscreenOnMobile={true}
              mobileBreakpoint={640}
              className='w-full max-w-lg h-auto'
              fadeDuration={150}
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className='w-full lg:w-1/2'>
          {/* Product Title */}
          <h1 className='text-4xl font-bold mb-6 text-gray-900'>
            {product.name}
          </h1>

          {/* Price and Category */}
          <div className='flex items-center gap-4 mb-8'>
            <p className='text-3xl font-semibold text-gray-900'>
              {` ₹ ${product.packetPrice} / KG`}
            </p>
            <p className='text-lg text-gray-600 bg-gray-100 px-3 py-1 rounded-full'>
              {product.category}
            </p>
          </div>

          {/* Add to Cart and Wishlist Buttons */}
          <div className='flex gap-4 mb-8'>
            <button className='bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600'>
              Add to Cart
            </button>
            <button className='bg-gray-200 text-gray-900 px-6 py-2 rounded-full hover:bg-gray-300'>
              Add to Wishlist
            </button>
          </div>

          {/* Description */}
          <div className='mb-10'>
            <h2 className='text-2xl font-semibold mb-6 text-gray-900'>
              {product.detailedDescription || 'Product Details'}
            </h2>
            <p className='text-gray-700 leading-relaxed'>
              {product.description}
            </p>
          </div>
          <div className='mb-10'>
            <h3 className='text-2xl font-semibold mb-6 text-gray-900'>
              Product Details
            </h3>
            <table className='min-w-full bg-white'>
              <tbody>
                <tr>
                  <td className='border px-4 py-2 font-semibold'>Box Size</td>
                  <td className='border px-4 py-2'>12 Packets</td>
                </tr>
                <tr>
                  <td className='border px-4 py-2 font-semibold'>
                    Packeging Type
                  </td>
                  <td className='border px-4 py-2'>Jar</td>
                </tr>
                <tr>
                  <td className='border px-4 py-2 font-semibold'>Self Life</td>
                  <td className='border px-4 py-2'>6 Months</td>
                </tr>
                <tr>
                  <td className='border px-4 py-2 font-semibold'>
                    Storage Method
                  </td>
                  <td className='border px-4 py-2'>Refridgerator</td>
                </tr>
                <tr>
                  <td className='border px-4 py-2 font-semibold'>Temprature</td>
                  <td className='border px-4 py-2'>+4°C or Below</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='mt-16'>
        <h2 className='text-3xl font-bold mb-8 text-gray-900'>
          Suggested Products
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {Array(4)
            .fill(product) // Using the same product as placeholder for now
            .map((suggestedProduct, index) => (
              <div
                key={index}
                className='border p-4 rounded-lg shadow-sm hover:shadow-lg transition duration-200'
              >
                <img
                  src={suggestedProduct.detailedImages?.[0] || mainImage}
                  alt={suggestedProduct.name}
                  className='w-full h-48 object-cover mb-4 rounded-lg'
                />
                <h3 className='text-lg font-semibold text-gray-900'>
                  {suggestedProduct.name}
                </h3>
                <p className='text-gray-600 text-sm'>
                  {suggestedProduct.category}
                </p>
                <p className='text-lg font-semibold text-gray-900 mt-2'>{`₹ ${suggestedProduct.packetPrice} / KG`}</p>
                <button className='mt-4 w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600'>
                  View Details
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedImages;
