import { useSigninStore } from '@/zustand/apis/SigninStore';

export const useSignin = () => {
  const { signin } = useSigninStore();

  const signinUser = async (data) => {
    try {
      const response = await signin(data);
      return response;
    } catch (error) {
      console.error('Error in useSignin hook:', error);
      throw error;
    }
  };

  return signinUser;
};
