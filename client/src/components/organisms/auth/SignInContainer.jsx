import { Toaster } from '@/components/ui/toaster';
import { useSignin } from '@/hooks/signinHook';

import SigninCard from './SignInCard';

const SigninContainer = () => {
  const signupFunc = useSignin();
  const handleSignin = async (data) => {
    try {
      const response = await signupFunc(data);
      console.log('Signup successful:', response);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <SigninCard submitFunc={handleSignin} />
      <Toaster />
    </div>
  );
};

export default SigninContainer;
