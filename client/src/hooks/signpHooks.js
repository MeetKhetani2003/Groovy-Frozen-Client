import { useSignupStore } from '@/zustand/apis/SignupStore';

import { useToast } from './use-toast';

export const useSignup = () => {
  const { signup } = useSignupStore();
  const toast = useToast();
  const signupUser = async (data) => {
    try {
      const response = await signup(data);
      toast({
        title: 'Signup successful',
        description: ' You have successfully signed up',
      });
      return response;
    } catch (error) {
      console.error('Error in useSignup hook:', error);
      toast({
        title: 'Signup failed',
        description: error.message,
      });
      throw error;
    }
  };

  return signupUser;
};
