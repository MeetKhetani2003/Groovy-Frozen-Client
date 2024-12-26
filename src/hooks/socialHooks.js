import { variables } from '@/zustand/variables/variables';

export const useSocialLogin = () => {
  return {
    facebookLogin: () => {
      window.location.replace(`${variables.backend_url}/users/facebook`);
    },
    googleLogin: () => {
      window.location.replace(`${variables.backend_url}/users/google`);
    },
  };
};
