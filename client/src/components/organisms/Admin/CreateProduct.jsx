/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import Input from '@/components/atoms/Input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProducts } from '@/hooks/ProductHook';
import { useToast } from '@/hooks/use-toast';

const CreateProduct = () => {
  const { create } = useProducts();
  const [productData, setProductData] = useState({
    name: '',
    stockQuantity: 0,
    stockUnit: '',
    packetQuantity: 0,
    packetUnit: '',
    packetPrice: 0,
    boxQuantity: 0,
    boxUnit: '',
    category: '',
    description: '',
    thumbnail: null,
    detailedImages: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
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
    formData.append('name', productData.name);
    formData.append('stockQuantity', productData.stockQuantity);
    formData.append('stockUnit', productData.stockUnit);
    formData.append('packetQuantity', productData.packetQuantity);
    formData.append('packetUnit', productData.packetUnit);
    formData.append('packetPrice', productData.packetPrice);
    formData.append('boxQuantity', productData.boxQuantity);
    formData.append('boxUnit', productData.boxUnit);
    formData.append('category', productData.category);
    formData.append('description', productData.description);
    formData.append('thumbnail', productData.thumbnail);
    productData.detailedImages.forEach((image) =>
      formData.append('detailedImages', image)
    );

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
        packetUnit: '',
        packetPrice: 0,
        boxQuantity: 0,
        boxUnit: '',
        category: '',
        description: '',
        thumbnail: null,
        detailedImages: [],
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
    <Card className="w-full  mx-auto mt-8">
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter product name"
                value={productData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="stockQuantity">Stock Quantity</Label>
              <Input
                id="stockQuantity"
                name="stockQuantity"
                type="number"
                placeholder="Enter stock quantity"
                value={productData.stockQuantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="stockUnit">Stock Unit</Label>
              <Input
                id="stockUnit"
                name="stockUnit"
                placeholder="Enter stock unit (e.g., kg, piece)"
                value={productData.stockUnit}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="packetQuantity">Packet Quantity</Label>
              <Input
                id="packetQuantity"
                name="packetQuantity"
                type="number"
                placeholder="Enter packet quantity"
                value={productData.packetQuantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="packetUnit">Packet Unit</Label>
              <Input
                id="packetUnit"
                name="packetUnit"
                placeholder="Enter packet unit (e.g., kg, piece)"
                value={productData.packetUnit}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="packetPrice">Packet Price</Label>
              <Input
                id="packetPrice"
                name="packetPrice"
                type="number"
                placeholder="Enter packet price"
                value={productData.packetPrice}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="boxQuantity">Box Quantity</Label>
              <Input
                id="boxQuantity"
                name="boxQuantity"
                type="number"
                placeholder="Enter box quantity"
                value={productData.boxQuantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="boxUnit">Box Unit</Label>
              <Input
                id="boxUnit"
                name="boxUnit"
                placeholder="Enter box unit (e.g., kg, piece)"
                value={productData.boxUnit}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="Enter product category"
                value={productData.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter product description"
                value={productData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="col-span-2 lg:col-span-4">
              <Label htmlFor="detailedImages">Detailed Images</Label>
              <input
                className="px-4 w-full"
                id="detailedImages"
                name="detailedImages"
                type="file"
                accept="image/*"
                multiple={true} // Allows selecting multiple files
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-48 self-center bg-orange-200 text-main"
          >
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateProduct;
