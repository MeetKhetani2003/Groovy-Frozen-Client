import { Toaster } from '@/components/ui/toaster';
import { useSignup } from '@/hooks/signpHooks'; // Correct import

import SignupCard from './SignupCard';

const SignupContainer = () => {
  const signupFunc = useSignup();
  const handleSignup = async (data) => {
    try {
      const response = await signupFunc(data);
      return response;
    } catch (error) {
      throw new Error('Signup failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <SignupCard submitFunc={handleSignup} />
      <Toaster />
    </div>
  );
};

export default SignupContainer;
