/* eslint-disable simple-import-sort/imports */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { jwtDecode } from 'jwt-decode';
import { FacebookIcon, InstagramIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { RiMenu4Line } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';

import { useUser } from '@/zustand/apis/userState';
import Logo from '@/components/atoms/Logo';

import LinkAtom from '../atoms/LinkAtom';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import Distributor from './Distributor';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const { userData, setUserData } = useUser();
  // const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getToken = localStorage.getItem('authToken');

    if (getToken) {
      try {
        const user = jwtDecode(getToken);
        setUserData(user);
        setIsLoggedin(true);
      } catch (error) {
        console.error('Invalid token', error);
        localStorage.removeItem('authToken');
        setIsLoggedin(false);
      }
    } else {
      setIsLoggedin(false);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setUserData]);

  // const handleCartClick = () => {
  //   if (!isLoggedin) {
  //     navigate('/signin');
  //     return;
  //   }
  //   navigate('/checkout');
  // };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-primaryBg shadow-md' : 'bg-transparent'
      }`}
    >
      <div className='flex items-center mx-5 lg:mx-12 justify-between p-4'>
        <div className='space-x-8 hidden lg:block'>
          <LinkAtom
            title={'Home'}
            url={'/'}
            className={isActive('/') ? 'text-main font-bold' : ''}
          />
          <LinkAtom
            title={'Our Products'}
            url={'/menu'}
            className={isActive('/menu') ? 'text-main font-bold' : ''}
          />
          <LinkAtom
            title={'About us'}
            url={'/about'}
            className={isActive('/about') ? 'text-main font-bold' : ''}
          />
          <LinkAtom
            title={'Contact us'}
            url={'/contact'}
            className={isActive('/contact') ? 'text-main font-bold' : ''}
          />
          <Dialog>
            <DialogTrigger asChild>
              <button className='font-montserrat font-medium hover:text-main transition-all duration-300'>
                Become a distributor
              </button>
            </DialogTrigger>
            <DialogContent className='p-0 max-w-md'>
              <Distributor />
            </DialogContent>
          </Dialog>
        </div>
        <div className='lg:-ml-28'>
          <Logo />
        </div>

        <div className='flex items-center space-x-8'>
          <InstagramIcon className='hover:text-main cursor-pointer hidden lg:block' />
          <FacebookIcon className='hover:text-main cursor-pointer hidden lg:block' />
          <FaWhatsapp className='text-2xl hover:text-main cursor-pointer hidden lg:block' />
          {/* <ShoppingBag
            onClick={handleCartClick}
            className={`hover:text-main cursor-pointer ${
              isLoggedin ? 'block' : 'hidden'
            }`}
          /> */}
          <div className='hidden lg:block'>
            {isLoggedin ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer'>
                    {userData?.avatar ? (
                      <img
                        src={userData.avatar}
                        alt='Avatar'
                        className='w-full h-full rounded-full object-cover'
                      />
                    ) : (
                      <span className='text-gray-700 font-bold'>M</span>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-primaryBg border border-gray-200 p-2 rounded-lg shadow-lg mt-2'>
                  <DropdownMenuItem
                    onClick={() => localStorage.clear()}
                    className='hover:bg-red-600'
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <LinkAtom title='Login' url='/auth/login' />
            )}
          </div>

          {/* Mobile Screen - Dropdown */}
          <div className='block lg:hidden'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='w-10 h-10 rounded-full flex items-center justify-center cursor-pointer'>
                  <span className='text-gray-700 text-2xl font-bold'>
                    <RiMenu4Line />
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-primaryBg  border border-gray-200 px-4 py-2 gap-3 rounded-lg shadow-lg mt-2'>
                {!isLoggedin ? (
                  <div className='space-y-3'>
                    <DropdownMenuItem>
                      <LinkAtom title='Home' url='/' />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LinkAtom title='Our Products' url='/menu' />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LinkAtom title='About us' url='/about' />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LinkAtom title='Contact us' url='/contact' />
                    </DropdownMenuItem>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className='font-montserrat font-medium hover:text-main transition-all duration-300'>
                          Become a distributor
                        </button>
                      </DialogTrigger>
                      <DialogContent className='p-0 max-w-md'>
                        <Distributor />
                      </DialogContent>
                    </Dialog>
                    <DropdownMenuItem>
                      <LinkAtom title='Login' url='/auth/login' />
                    </DropdownMenuItem>
                  </div>
                ) : (
                  <div className='space-y-3'>
                    <DropdownMenuItem>
                      <LinkAtom title='Home' url='/' />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LinkAtom title='Our Products' url='/menu' />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LinkAtom title='About us' url='/about' />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LinkAtom title='Contact us' url='/contact' />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => localStorage.clear()}
                      className='hover:bg-red-600'
                    >
                      Logout
                    </DropdownMenuItem>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
