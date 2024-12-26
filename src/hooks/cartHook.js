import { useCartStore } from '@/zustand/apis/CartStore';

import { useToast } from './use-toast';

export const useCart = () => {
  const { toast } = useToast();
  const { addItemToCart } = useCartStore();
  const addPacketToCart = async (productId, quantity) => {
    try {
      const response = await addItemToCart(productId, quantity, toast);
      return response;
    } catch (error) {
      console.error('Error in addPacketToCart hook:', error);
      throw error;
    }
  };
  const addBoxToCart = async (productId, quantity) => {
    try {
      const response = await addItemToCart(productId, quantity, toast);
      return response;
    } catch (error) {
      console.error('Error in addBoxToCart hook:', error);
      throw error;
    }
  };
  return { addPacketToCart, addBoxToCart };
};
