import { create } from 'zustand';

import { toast } from '@/hooks/use-toast';

import axiosInstance from '../instences/axios';

export const useProductStore = create((set, get) => ({
  cache: {}, // Initialize cache in Zustand store
  product: null,
  totalPages: 0,
  currentPage: 1,
  products: [],

  setProducts: (products) => set({ products }),

  setProduct: (product) => set({ product }),
  createProduct: async (product) => {
    try {
      const response = await axiosInstance.post('/products/create', product);
      return response.data;
    } catch (error) {
      console.error('Error in createProduct hook:', error);
      throw error;
    }
  },

  getPaginatedProducts: async (page, limit, filters = {}) => {
    try {
      // Generate a unique cache key
      const cacheKey = JSON.stringify({ page, limit, filters });

      // Check cache
      const cache = get().cache;
      if (cache[cacheKey]) {
        const cachedData = cache[cacheKey];
        set({
          products: cachedData.products,
          totalPages: cachedData.totalPages,
          currentPage: page,
        });
        return cachedData;
      }

      // Build query string
      let queryString = `?page=${page}&limit=${limit}`;
      const { pricemin, pricemax, category, search, sortByPrice } = filters;

      if (pricemin) queryString += `&pricemin=${pricemin}`;
      if (pricemax) queryString += `&pricemax=${pricemax}`;
      if (category) queryString += `&category=${category}`;
      if (search) queryString += `&search=${search}`;
      if (sortByPrice) queryString += `&sortByPrice=${sortByPrice}`;

      // Fetch data from API
      const response = await axiosInstance.get(`/products/${queryString}`);

      // Update Zustand state and cache
      const responseData = response.data;
      set((state) => ({
        products: responseData.products,
        totalPages: responseData.totalPages,
        currentPage: page,
        cache: {
          ...state.cache,
          [cacheKey]: responseData, // Add new data to cache
        },
      }));

      return responseData;
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
        duration: 3000,
      });
      console.error('Error in getPaginatedProducts:', error);
      throw error;
    }
  },

  getSingleProduct: async (id) => {
    try {
      const response = await axiosInstance.get(`/products/get/${id}`);
      set({ product: response.data });
      return response.data;
    } catch (error) {
      console.error('Error in getSingleProduct hook:', error);
      throw error;
    }
  },
}));
