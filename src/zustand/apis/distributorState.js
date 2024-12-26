import { create } from 'zustand';

export const useDistributor = create((set) => {
  return {
    distributor: {
      name: '',
      mobileNo: '',
      email: '',
      address: '',
      message: '',
    },
    setDistributor: (data) => set({ distributor: data }),
  };
});
