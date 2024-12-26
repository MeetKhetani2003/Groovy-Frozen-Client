import { jwtDecode } from 'jwt-decode';
import { FacebookIcon, InstagramIcon, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Logo from '@/components/atoms/Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/zustand/apis/userState';

import LinkAtom from '../atoms/LinkAtom';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const { userData, setUserData } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    const getToken = localStorage.getItem('authToken');

    if (getToken) {
      try {
        const user = jwtDecode(getToken); // Decode only if the token exists
        setUserData(user);
        setIsLoggedin(true);
      } catch (error) {
        console.error('Invalid token', error);
        // Handle invalid token, possibly redirect to login
        localStorage.removeItem('authToken'); // Remove invalid token
        setIsLoggedin(false); // Set logged in state to false
      }
    } else {
      setIsLoggedin(false); // If no token is found, ensure logged out state
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setUserData]);

  const handleCartClick = () => {
    if (!isLoggedin) {
      navigate('/signin');
      return;
    }
    navigate('/checkout');
  };

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-primaryBg shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center mx-5 lg:mx-16 justify-between p-4">
        <div className="space-x-8 hidden lg:block">
          <LinkAtom title={'Home'} url={'/'} />
          <LinkAtom title={'Menu'} url={'/menu'} />
          <LinkAtom title={'About us'} url={'/about'} />
          <LinkAtom title={'Contact us'} url={'/contact'} />
        </div>
        <div className="lg:-ml-28">
          <Logo />
        </div>

        <div className="flex items-center space-x-8">
          <InstagramIcon className="hover:text-main cursor-pointer hidden lg:block" />
          <FacebookIcon className="hover:text-main cursor-pointer hidden lg:block" />
          <FaWhatsapp className="text-2xl hover:text-main cursor-pointer hidden lg:block" />

          <ShoppingBag
            onClick={handleCartClick}
            className={`hover:text-main cursor-pointer ${
              isLoggedin ? 'block' : 'hidden'
            }`}
          />
          {!isLoggedin ? (
            <>
              <LinkAtom title={'Login'} url={'/auth/login'} />
              <LinkAtom title={'Signup'} url={'/auth/signup'} />
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                  {userData?.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-700 font-bold">M</span>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-primaryBg border border-gray-200 p-2 rounded-lg shadow-lg mt-2">
                <DropdownMenuItem className="text-gray-800 hover:bg-hoverBg">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-800 hover:bg-hoverBg md:hidden">
                  <LinkAtom
                    title={'Home'}
                    className="text-gray-800"
                    url={'/'}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-800 hover:bg-hoverBg md:hidden">
                  <LinkAtom
                    title={'Menu'}
                    className="text-gray-800"
                    url={'/menu'}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-800 hover:bg-hoverBg md:hidden">
                  <LinkAtom
                    title={'About us'}
                    className="text-gray-800"
                    url={'/about'}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-800 hover:bg-hoverBg md:hidden">
                  <LinkAtom
                    title={'Contact us'}
                    className="text-gray-800"
                    url={'/contact'}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className=" hover:bg-red-600">
                  <LinkAtom
                    onClick={() => {
                      localStorage.removeItem('authToken');
                      setUserData(null);
                      setIsLoggedin(false);
                    }}
                    title={'Logout'}
                    type="danger"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Cart Dialog */}
      {/* <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cart Details</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            {cartDetails.length > 0 ? (
              cartDetails.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col p-4 border-b space-y-2"
                >
                  <div className="flex justify-between">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">${item.totalAmt}</p>
                  </div>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                  <p className="text-sm">Unit Type: {item.unitType}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Your cart is empty</p>
            )}
            {cartDetails.length > 0 && (
              <button
                className="mt-4 bg-main text-white px-4 py-2 rounded-lg"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog> */}
    </nav>
  );
};

export default NavBar;
