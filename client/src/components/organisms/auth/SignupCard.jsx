import { Facebook, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '@/components/atoms/Input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSocialLogin } from '@/hooks/socialHooks';
// import { useFacebookLogin } from '@/hooks/facebookLogin';
import { assets } from '@/utils/AssetImport';

const SignupCard = ({ submitFunc }) => {
  const { facebookLogin, googleLogin } = useSocialLogin();
  // const { loginWithFacebook } = useFacebookLogin();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitFunc) {
      submitFunc(formData);
    }
    navigate('/auth/login');
  };

  const handleFbLogin = () => {
    facebookLogin();
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div>
        <img
          src={assets.foodSignup}
          alt="signup"
          className=" w-full h-full brightness-75 blur-lg"
        />
      </div>
      <Card className="max-w-96 absolute bg-[#ffffff6c] backdrop-blur-3xl p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full">
              <Input
                className="w-56"
                name="username"
                onChange={handleChange}
                value={formData.username}
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="w-full">
              <Input
                className="w-56"
                name="email"
                onChange={handleChange}
                value={formData.email}
                type="email"
                placeholder="Email"
              />
            </div>
            <div>
              <Input
                className="w-full"
                name="password"
                onChange={handleChange}
                value={formData.password}
                type="password"
                placeholder="Password"
              />
            </div>
            <Button onClick={handleSubmit} type="submit" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Sign up with Email
            </Button>
          </form>
          <Separator />
          <Button onClick={handleFbLogin} variant="outline" className="w-full">
            <Facebook className="mr-2 h-4 w-4" />
            Sign up with Facebook
          </Button>
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full"
          >
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign up with Google
          </Button>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupCard;
