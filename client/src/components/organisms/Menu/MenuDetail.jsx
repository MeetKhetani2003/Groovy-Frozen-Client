import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/cartHook';
import { useProducts } from '@/hooks/ProductHook';
import { useProductStore } from '@/zustand/apis/ProductStore';

const MenuDetail = () => {
  const { getOneProduct } = useProducts();
  const { product } = useProductStore();
  const { id } = useParams();
  const { addPacketToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState('');

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

  const handleImageChange = (image) => {
    setSelectedImage(image); // Update the selected image when a thumbnail is clicked
  };

  return (
    <div className="container pt-20 mx-auto px-4 py-8 flex md:flex-row flex-col max-w-7xl">
      <div className="flex flex-col gap-6 md:gap-8 w-1/2">
        {/* Large Product Image */}
        <div className="w-full">
          <img
            src={selectedImage || product?.data?.detailedImages[0]} // Default to first image if none selected
            alt="Product"
            className="md:min-w-[600px] object-cover rounded-lg"
          />
        </div>

        {/* Small Thumbnail Carousel */}
        <div className="w-full">
          <Carousel
            selectedItem={product?.detailedImages?.indexOf(selectedImage)} // Highlight the selected thumbnail
            onChange={(index) =>
              handleImageChange(product?.detailedImages[index])
            } // Update large image when a thumbnail is clicked
            infiniteLoop
            showThumbs={false} // Hide the default thumbnails in the carousel itself
            showStatus={false} // Hide status text (e.g., "1 of 5")
            dynamicHeight={false}
            showIndicators={false} // Hide carousel dots (indicators)
            thumbWidth={80} // Adjust the width of the thumbnails
            thumbHeight={80} // Adjust the height of the thumbnails
            centerMode
            centerSlidePercentage={33.33} // Show 3 images at once (33.33% each)
            swipeable
            emulateTouch
            useKeyboardArrows
            interval={3000} // Optionally set an auto-scroll interval
            autoPlay={true} // Enable auto-scroll for carousel images
          >
            {product?.detailedImages?.map((image, index) => (
              <div key={index} className="p-2">
                <img
                  src={image}
                  alt={`Product Thumbnail ${index + 1}`}
                  className={`rounded-lg cursor-pointer max-h-52  transition-transform transform hover:scale-105 
                    ${
                      selectedImage === image ? 'border-4 border-blue-500' : ''
                    }`} // Highlight selected image with border
                  onClick={() => handleImageChange(image)} // Make images selectable
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mt-8 text-center md:text-left ml-10">
        <h2 className="text-3xl font-semibold text-gray-800">
          {product?.name}
        </h2>
        <p className="mt-2 text-gray-600">{product?.description}</p>

        {/* Price Section */}
        <div className="mt-4">
          <span className="text-lg font-semibold text-main">{`₹${product?.packetPrice} / ${product?.packetQuantity}${product?.packetUnit}`}</span>
        </div>

        {/* Product Category */}
        <div className="mt-2">
          <span className="text-sm text-gray-500">
            Category: {product?.category}
          </span>
        </div>

        {/* Stock Availability */}
        <div className="mt-2">
          <span
            className={`text-sm ${
              product?.stockQuantity > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {product?.stockQuantity > 0 ? 'available' : 'Out of stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-6">
          <Button
            className="bg-main text-white px-6 py-2 rounded-lg shadow-md hover:bg-hoverCardBg"
            onClick={() => addPacketToCart(product._id, 1)}
          >
            Add packets to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
