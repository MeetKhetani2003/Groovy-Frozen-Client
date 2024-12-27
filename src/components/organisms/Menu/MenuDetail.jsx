import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'; // Import ShadCN Carousel components
import { useEffect, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/cartHook';
import { useProducts } from '@/hooks/ProductHook';
import { useProductStore } from '@/zustand/apis/ProductStore';
import { Card, CardContent } from '@/components/ui/card'; // Import ShadCN Card components

const MenuDetail = () => {
  const { getOneProduct } = useProducts();
  const { product } = useProductStore();
  const { id } = useParams();
  const { addPacketToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState('');
  const [activeIndex, setActiveIndex] = useState(0); // Store the active carousel index

  const fetchProduct = async () => {
    try {
      if (product === null) {
        await getOneProduct(id);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
    if (product?.detailedImages?.length > 0) {
      setSelectedImage(product.detailedImages[0]); // Set default image to the first image in the list
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= product?.detailedImages?.length) {
          return 0; // Loop back to the first image
        }
        return nextIndex;
      });
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [product?.detailedImages?.length]);

  useEffect(() => {
    if (product?.detailedImages?.length > 0) {
      setSelectedImage(product.detailedImages[activeIndex]);
    }
  }, [activeIndex, product?.detailedImages]);

  const handleImageChange = (image) => {
    setSelectedImage(image); // Update the selected image when a thumbnail is clicked
  };

  return (
    <div>
      <div className='container pt-20 mx-auto px-4 py-8 flex md:flex-row flex-col max-w-7xl'>
        {/* Left Section: Image Carousel */}
        <div className='flex flex-col gap-6 md:gap-8 w-1/2'>
          <div className='w-full'>
            <img
              src={selectedImage || 'No image available'}
              alt='Product'
              className='md:min-w-[600px] object-contain rounded-lg max-h-80 mx-auto'
            />
          </div>

          <div className='w-full flex justify-start gap-4'>
            {product?.detailedImages?.map((image, index) => (
              <div key={index} className='w-20'>
                <Card>
                  <CardContent className='flex items-center justify-center p-2'>
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`rounded-lg cursor-pointer object-contain max-h-32 transition-transform transform hover:scale-105 ${
                        selectedImage === image
                          ? 'border-3 border-blue-500'
                          : ''
                      }`}
                      onClick={() => handleImageChange(image)}
                    />
                  </CardContent>
                </Card>
              </div>
            ))}
            {/* <div className='w-20 h-32'> 
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: 'Image Zoom',
                    src: selectedImage || 'No image available',
                    isFluidWidth: true,
                  },
                  largeImage: {
                    src: selectedImage || 'No image available',
                    width: 1200,
                    height: 800,
                  },
                }}
              />
            </div> */}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className='mt-8 text-center md:text-left ml-10'>
          <h2 className='text-3xl font-semibold text-gray-800'>
            {product?.name}
          </h2>
          <p className='mt-2 text-gray-600'>{product?.description}</p>

          <div className='mt-4'>
            <span className='text-lg font-semibold text-main'>{`₹${product?.packetPrice} / ${product?.packetQuantity}${product?.packetUnit}`}</span>
          </div>

          <div className='mt-2'>
            <span className='text-sm text-gray-500'>
              Category: {product?.category}
            </span>
          </div>

          <div className='mt-2'>
            <span
              className={`text-sm ${
                product?.stockQuantity > 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {product?.stockQuantity > 0 ? 'Available' : 'Out of stock'}
            </span>
          </div>

          <div className='mt-6'>
            <Button
              className='bg-main text-white px-6 py-2 rounded-lg shadow-md hover:bg-hoverCardBg'
              onClick={() => addPacketToCart(product._id, 1)}
            >
              Add packets to cart
            </Button>
          </div>
        </div>
      </div>

      {/* Details Table */}
      <div className='container mt-10 max-w-7xl mx-auto px-4'>
        <h3 className='text-xl font-semibold text-gray-800 mb-6'>
          Product Details
        </h3>
        <div className='overflow-auto'>
          <table className='table-auto w-full text-left text-gray-700'>
            <tbody>
              {[
                { label: 'Packaging Type', value: product?.packagingType },
                { label: 'Fries Type', value: product?.friesType },
                { label: 'Feature', value: product?.feature },
                { label: 'Self Life', value: product?.selfLife },
                { label: 'Storage Method', value: product?.storageMethod },
                { label: 'Temperature', value: product?.temprature },
                {
                  label: 'Usage Application',
                  value: product?.usageApplication,
                },
                {
                  label: 'Refrigeration Required',
                  value: product?.refrigerationRequired ? 'Yes' : 'No',
                },
                { label: 'Country of Origin', value: product?.countryOfOrigin },
                { label: 'Application', value: product?.application },
                {
                  label: 'Frozen Temperature',
                  value: product?.frozenTemprature,
                },
                { label: 'Ingredients', value: product?.ingrediants },
                { label: 'Form', value: product?.form },
              ].map(({ label, value }, index) => (
                <tr key={index} className='border-b'>
                  <td className='py-2 px-4 font-medium'>{label}</td>
                  <td className='py-2 px-4'>{value || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
