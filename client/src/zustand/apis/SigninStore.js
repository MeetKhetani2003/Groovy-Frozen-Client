/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import axiosInstance from '../instences/axios';

export const useSigninStore = create((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),

  signin: async (data) => {
    console.log(data);
    try {
      const response = await axiosInstance.post('/users/signin', data);
      localStorage.setItem('authToken', response.data.data.token);
      console.log('Signin successful:', response.data.data.token);
      return response.data;
    } catch (error) {
      console.error('Signin error:', error);
      throw error;
    }
  },
}));
