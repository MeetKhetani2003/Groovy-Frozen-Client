/* eslint-disable no-unused-vars */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProducts } from '@/hooks/ProductHook';
import { useToast } from '@/hooks/use-toast';
import Input from '@/components/atoms/Input';

const categories = [
  'Dairy Products',
  'Sauce',
  'Gravy',
  'Dal',
  'Snacks',
  'Starter',
  'Tava Special',
  'Spices And Masala',
];

const CreateProduct = () => {
  const { create } = useProducts();
  const [productData, setProductData] = useState({
    name: '',
    stockQuantity: 0,
    stockUnit: '',
    packetQuantity: 0,
    soldPackets: 0,
    packetUnit: '',
    packetPrice: 0,
    boxQuantity: 0,
    category: '',
    description: '',
    thumbnail: null,
    detailedImages: [],
    packagingType: '',
    friesType: '',
    feature: '',
    selfLife: '',
    storageMethod: '',
    temprature: '',
    usageApplication: '',
    refrigerationRequired: false,
    countryOfOrigin: '',
    application: '',
    frozenTemprature: '',
    ingrediants: '',
    form: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: name === 'thumbnail' ? files[0] : Array.from(files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form behavior
    setIsSubmitting(true);

    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      if (key === 'detailedImages') {
        value.forEach((image) => formData.append(key, image));
      } else {
        formData.append(key, value);
      }
    });

    try {
      await create(formData); // API call to create the product
      toast({
        title: 'Success!',
        description: 'Product created successfully!',
        variant: 'success',
      });
      // Clear form after submission
      setProductData({
        name: '',
        stockQuantity: 0,
        stockUnit: '',
        packetQuantity: 0,
        soldPackets: 0,
        packetUnit: '',
        packetPrice: 0,
        boxQuantity: 0,
        category: '',
        description: '',
        thumbnail: null,
        detailedImages: [],
        packagingType: '',
        friesType: '',
        feature: '',
        selfLife: '',
        storageMethod: '',
        temprature: '',
        usageApplication: '',
        refrigerationRequired: false,
        countryOfOrigin: '',
        application: '',
        frozenTemprature: '',
        ingrediants: '',
        form: '',
      });
    } catch (error) {
      toast({
        title: 'Error!',
        description: 'Failed to create product. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className='w-full mx-auto mt-8'>
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {Object.entries(productData).map(([key, value]) => {
              if (key === 'thumbnail') {
                return (
                  <div key={key}>
                    <Label htmlFor={key}>Thumbnail</Label>
                    <Input
                      id={key}
                      name={key}
                      type='file'
                      accept='image/*'
                      onChange={handleFileChange}
                      required={key === 'thumbnail'}
                    />
                  </div>
                );
              }
              if (key === 'detailedImages') {
                return (
                  <div
                    key={key}
                    className='col-span-2 lg:col-span-4 max-w-60 border-none outline-none p-4'
                  >
                    <Label htmlFor={key}>Detailed Images</Label>
                    <input
                      id={key}
                      name={key}
                      type='file'
                      accept='image/*'
                      multiple
                      onChange={handleFileChange}
                      className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none'
                    />
                  </div>
                );
              }
              if (key === 'category') {
                return (
                  <div key={key}>
                    <Label htmlFor={key}>Category</Label>
                    <select
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      required
                      className='border p-2 rounded'
                    >
                      <option value=''>Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              if (typeof value === 'boolean') {
                return (
                  <div key={key}>
                    <Label htmlFor={key}>{key}</Label>
                    <input
                      id={key}
                      name={key}
                      type='checkbox'
                      checked={value}
                      onChange={handleInputChange}
                    />
                  </div>
                );
              }

              if (typeof value === 'number') {
                return (
                  <div key={key}>
                    <Label htmlFor={key}>{key}</Label>
                    <Input
                      id={key}
                      name={key}
                      type='number'
                      placeholder={`Enter ${key}`}
                      value={value}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                );
              }

              return (
                <div key={key}>
                  <Label htmlFor={key}>{key}</Label>
                  {key === 'description' ? (
                    <Textarea
                      id={key}
                      name={key}
                      placeholder={`Enter ${key}`}
                      value={value}
                      onChange={handleInputChange}
                      required
                    />
                  ) : (
                    <Input
                      id={key}
                      name={key}
                      placeholder={`Enter ${key}`}
                      value={value}
                      onChange={handleInputChange}
                      required
                    />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button
            type='submit'
            variant='primary'
            disabled={isSubmitting}
            className='w-48 self-center bg-yellow-100 text-main'
          >
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateProduct;
