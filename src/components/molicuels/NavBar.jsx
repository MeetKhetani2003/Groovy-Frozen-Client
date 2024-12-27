/* eslint-disable simple-import-sort/imports */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { jwtDecode } from 'jwt-decode';
import { FacebookIcon, InstagramIcon, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import { useUser } from '@/zustand/apis/userState';
import Logo from '@/components/atoms/Logo';

import LinkAtom from '../atoms/LinkAtom';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import Distributor from './Distributor';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const { userData, setUserData } = useUser();
  const navigate = useNavigate();
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

  const handleCartClick = () => {
    if (!isLoggedin) {
      navigate('/signin');
      return;
    }
    navigate('/checkout');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-primaryBg shadow-md' : 'bg-transparent'
      }`}
    >
      <div className='flex items-center mx-5 lg:mx-16 justify-between p-4'>
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
                <DropdownMenuItem className='text-gray-800 hover:bg-hoverBg'>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className='text-gray-800 hover:bg-hoverBg md:hidden'>
                  <LinkAtom
                    title={'Home'}
                    className='text-gray-800'
                    url={'/'}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className='text-gray-800 hover:bg-hoverBg md:hidden'>
                  <LinkAtom
                    title={'Our Products'}
                    className='text-gray-800'
                    url={'/menu'}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className='text-gray-800 hover:bg-hoverBg md:hidden'>
                  <LinkAtom
                    title={'About us'}
                    className='text-gray-800'
                    url={'/about'}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className='text-gray-800 hover:bg-hoverBg md:hidden'>
                  <LinkAtom
                    title={'Contact us'}
                    className='text-gray-800'
                    url={'/contact'}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className=' hover:bg-red-600'>
                  <LinkAtom
                    onClick={() => {
                      localStorage.removeItem('authToken');
                      setUserData(null);
                      setIsLoggedin(false);
                    }}
                    title={'Logout'}
                    type='danger'
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
