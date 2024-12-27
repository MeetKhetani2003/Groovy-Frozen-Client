import { useEffect, useState } from 'react';

import { useCart } from '@/hooks/cartHook';
import { useProducts } from '@/hooks/ProductHook';
import { useProductStore } from '@/zustand/apis/ProductStore';
import MenuProductcard from '@/components/molicuels/MenuProductcard';

const OfferContainer = () => {
  const { products } = useProductStore(); // Access products from Zustand
  const { getAllProductsPaginated } = useProducts();
  const [loading, setLoading] = useState(true);
  const { addPacketToCart } = useCart();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        if (!products || products.length === 0) {
          await getAllProductsPaginated(1, 8); // Fetch only once
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchProducts();
  }, [getAllProductsPaginated]); // Dependency on `getAllProductsPaginated` ensures function stability

  if (loading) {
    return <div className='text-center mt-24 text-xl'>Loading...</div>;
  }

  if (!products || products.length === 0) {
    return (
      <div className='text-center mt-24 text-xl'>No products available</div>
    );
  }

  return (
    <div className='mx-8 lg:max-w-[1400px] lg:mx-auto mt-20'>
      <h1 className='text-5xl uppercase font-semibold font-serif text-center'>
        Our Products
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-32 mt-24'>
        {Array.isArray(products) &&
          products.map((product) => (
            <MenuProductcard
              onAddToCart={() => addPacketToCart(product._id, 1)}
              to={`/product/${product._id}`}
              key={product._id}
              img={product.thumbnail}
              title={product.category}
              heading={product.name}
              price={`₹${product.packetPrice} / ${product.packetQuantity}${product.packetUnit}`}
            />
          ))}
      </div>
    </div>
  );
};

export default OfferContainer;
