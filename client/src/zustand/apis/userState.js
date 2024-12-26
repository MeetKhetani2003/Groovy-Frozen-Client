import { create } from 'zustand';

import axiosInstance from '../instences/axios';

export const useUser = create((set) => ({
  userData: [],
  setUserData: (userData) => set({ userData }),
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get('/users/getall');
      set({ userData: response.data.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
}));
