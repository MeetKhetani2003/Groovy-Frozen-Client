/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import axiosInstance from '../instences/axios';

export const useCartStore = create((set, get) => ({
  getCart: async (id) => {
    try {
      const response = await axiosInstance.get(`/cart/get/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error in getCart hook:', error);
      throw error;
    }
  },
  addItemToCart: async (productId, quantity, toast) => {
    try {
      const response = await axiosInstance.post(
        `/cart/add/${productId}`,
        {
          quantity,
        },
        {
          headers: {
            'x-access-token': localStorage.getItem('authToken'),
          },
        }
      );
      toast({
        variant: 'success',
        title: 'Item added to cart',
      });
      return response.data;
    } catch (error) {
      console.error('Error in addItemToCart hook:', error);
      toast({
        variant: 'destructive',
        title:
          'Item not added to cart error from server we are appologizing for the inconvenience',
      });
      throw error;
    }
  },
  checkoutCart: async (data, openPaymentWindow) => {
    try {
      const response = await axiosInstance.post('/cart/checkout', data, {
        headers: { 'x-access-token': localStorage.getItem('authToken') },
      });
      return response.data;
    } catch (error) {
      console.error('Error in checkoutCart:', error);
      throw error;
    }
  },
}));
