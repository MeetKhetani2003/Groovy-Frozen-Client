import { FacebookIcon, InstagramIcon } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { assets } from '@/utils/AssetImport';

import Logo from '../atoms/Logo';

const Footer = () => {
  return (
    <div>
      <div className=" relative mt-20">
        <img
          className=" max-h-80 w-screen object-cover"
          src={assets.footer}
          alt="footer"
        />
        <div className="absolute bottom-0  h-[15.6rem] lg:h-80 z-10 w-full bg-[#000000b6] p-6">
          <div className="flex items-center flex-col justify-center lg:gap-6 gap-5">
            <Logo />
            <div className="flex gap-6">
              <InstagramIcon
                size={20}
                className="hover:text-main text-xl text-white cursor-pointer hidden lg:block"
              />
              <FacebookIcon
                size={20}
                className="hover:text-main text-xl text-white cursor-pointer hidden lg:block"
              />
              <FaWhatsapp className="text-xl hover:text-main text-white cursor-pointer hidden lg:block" />
            </div>
            <div>
              <Link className="border-r border-white lg:px-8 px-2 hover:text-main text-white text-center font-montserrat">
                Home
              </Link>
              <Link className="border-r border-white lg:px-8 px-2 hover:text-main text-white text-center font-montserrat">
                Menu
              </Link>
              <Link className="border-r border-white lg:px-8 px-2 hover:text-main text-white text-center font-montserrat">
                About us
              </Link>
              <Link className=" px-2 lg:px-8 hover:text-main text-white text-center font-montserrat">
                Contact us
              </Link>
            </div>
            <div className="flex flex-col md:flex-col">
              <p className=" px-8 hover:text-main text-white text-center font-montserrat border-r border-white">
                Monday-Friday: 08:00-22:00
              </p>
              <p className=" px-8 hover:text-main text-white text-center font-montserrat ">
                Saturday-Sunday: 10:00-16:00
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-4 bg-orange-950">
        <p className="text-white text-center font-montserrat">
          © 2023 Groovy Cafe. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
