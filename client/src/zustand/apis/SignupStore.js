/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import axiosInstance from '../instences/axios';

export const useSignupStore = create((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),

  signup: async (data) => {
    console.log(data);

    try {
      const response = await axiosInstance.post('/users/signup', data);
      localStorage.setItem('token', response.data.token);
      console.log('Signup successful:', response.data);

      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },
}));
