/* eslint-disable simple-import-sort/imports */
import {
  FaUsers,
  FaUserTie,
  FaHourglass,
  FaHandHoldingUsd,
} from 'react-icons/fa';
import { FlaskConicalOff, HandPlatter, Microscope, Sprout } from 'lucide-react';
import React from 'react';
import { CiNoWaitingSign } from 'react-icons/ci';
import { TbChefHatOff } from 'react-icons/tb';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { assets } from '@/utils/AssetImport';

// Sample benefits data with mixed SVG and icon components
const benefits = [
  { icon: assets.iso, title: 'ISO Certified Products' }, // SVG
  { icon: assets.fssai, title: 'FSSAI Approved' }, // Icon
  { icon: <Microscope />, title: 'Lab Tested' }, // Icon
  { icon: <TbChefHatOff />, title: 'No Master Cook Dependency' }, // Icon
  { icon: <FaUsers />, title: 'Manpower Saving' }, // Icon
  { icon: <HandPlatter />, title: 'Easy to Use' }, // Icon
  { icon: <FaUserTie />, title: 'Training by Master Chef' }, // Icon
  { icon: <FlaskConicalOff />, title: 'No Preservatives' }, // SVG
  { icon: <CiNoWaitingSign />, title: 'No Color' }, // SVG
  { icon: <Sprout />, title: 'Natural Products' }, // SVG
  { icon: <FaHourglass />, title: 'Long Life Products' }, // Icon
  { icon: <FaHandHoldingUsd />, title: 'Cost Effective' }, // Icon
];

const Benifits = () => {
  return (
    <div className='mt-20 max-w-7xl mx-auto'>
      <h1 className='text-5xl uppercase font-semibold font-serif text-center'>
        Our Benifits
      </h1>
      <section className='flex flex-wrap gap-8 justify-center p-8'>
        {benefits.map((benefit, index) => (
          <Card
            key={index}
            className='max-w-xs shadow-lg rounded-xl p-6 bg-white transform transition duration-300 hover:scale-105'
          >
            <CardHeader className='text-center'>
              {/* Render either SVG or Icon based on the type */}
              {typeof benefit.icon === 'string' ? (
                <img
                  src={benefit.icon}
                  alt={benefit.title}
                  className='w-16 h-16 mx-auto p-2 bg-yellow-100 rounded-full'
                />
              ) : (
                <div className='flex justify-center items-center w-16 h-16 bg-yellow-100 rounded-full'>
                  {React.cloneElement(benefit.icon, { className: 'w-12 h-12' })}
                </div>
              )}
            </CardHeader>
            <CardContent className='text-center font-medium text-xl mt-4'>
              {benefit.title}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Benifits;
