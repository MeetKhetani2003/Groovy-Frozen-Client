import { useProductStore } from '@/zustand/apis/ProductStore';

export const useProducts = () => {
  const {
    setProduct,
    getSingleProduct,
    createProduct,
    getPaginatedProducts,
    setProducts,
  } = useProductStore();
  const create = async (product) => {
    try {
      const response = await createProduct(product);
      return response.data;
    } catch (error) {
      console.error('Error in createProduct hook:', error);
      throw error;
    }
  };

  const getAllProductsPaginated = async (page, limit) => {
    try {
      const response = await getPaginatedProducts(page, limit);
      setProducts(response.data.products);
      return response.data;
    } catch (error) {
      console.error('Error in getPaginatedProducts hook:', error);
      throw error;
    }
  };

  const getOneProduct = async (id) => {
    try {
      const response = await getSingleProduct(id);
      setProduct(response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getSingleProduct hook:', error);
      throw error;
    }
  };

  return { create, getAllProductsPaginated, getOneProduct };
};
