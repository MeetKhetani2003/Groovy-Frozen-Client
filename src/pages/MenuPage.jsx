/* eslint-disable simple-import-sort/imports */
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { debounce } from 'lodash'; // For debouncing search input
import { SearchIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { useCart } from '@/hooks/cartHook';
import { useProductStore } from '@/zustand/apis/ProductStore';
import MenuProductcard from '@/components/molicuels/MenuProductcard';

const Menu = () => {
  const { products, setProducts, totalProducts, getPaginatedProducts } =
    useProductStore();
  const [categories, setCategories] = useState(['All Categories']);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(8);
  const { addPacketToCart } = useCart();

  const [filters, setFilters] = useState({
    category: 'All Categories', // Default category
    pricemin: 0,
    pricemax: 1000,
    search: '',
  });
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  const debouncedSearchHandler = useCallback(
    debounce((value) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        search: value,
      }));
    }, 500),
    []
  );

  const handleSearchClick = () => {
    debouncedSearchHandler(debouncedSearch);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      debouncedSearchHandler(debouncedSearch);
    }
  };

  useEffect(() => {
    // Get category from URL if available
    const queryParams = new URLSearchParams(window.location.search);
    const initialCategory = queryParams.get('category') || 'All Categories';

    setFilters((prevFilters) => ({
      ...prevFilters,
      category: initialCategory,
    }));

    setCurrentPage(1); // Reset to first page when filters are initialized
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getPaginatedProducts(currentPage, pageLimit, {
          ...filters,
          ...(filters.category === 'All Categories'
            ? { category: undefined }
            : {}),
        });

        const uniqueCategories = [
          'All Categories',
          ...new Set(response.data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
        setProducts(response.data.products);
        console.log('Products fetched successfully:', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch products only if the category or page changes
    if (filters.category !== 'All Categories' || filters.search) {
      fetchProducts();
    }
  }, [currentPage, filters, getPaginatedProducts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1); // Reset to the first page on filter change
  };

  if (loading) {
    return <div className='text-center pt-24 text-xl'>Loading...</div>;
  }

  if (!products || products.length === 0) {
    return (
      <div className='text-center pt-24 text-xl'>No products available</div>
    );
  }

  const totalPages = Math.ceil(totalProducts / pageLimit);

  return (
    <div className='mx-8 lg:max-w-[1400px] lg:mx-auto pt-20 min-h-screen'>
      <div className='flex justify-between items-center mb-6'>
        <input
          type='text'
          name='search'
          value={debouncedSearch}
          onChange={(e) => setDebouncedSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className='w-full p-2 border rounded-md'
          placeholder='Search products'
        />
        <button
          onClick={handleSearchClick}
          className='ml-2 p-2 bg-blue-500 rounded-md text-white'
        >
          <SearchIcon className='h-5 w -5' />
        </button>
      </div>

      <div className='flex'>
        <div className='hidden lg:block w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg'>
          <h2 className='text-xl font-semibold mb-4'>Filters</h2>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Category</label>
            <select
              name='category'
              value={filters.category}
              onChange={handleFilterChange}
              className='w-full p-2 border rounded-md'
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='w-3/4 ml-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-20 mt-24'>
            {Array.isArray(products) &&
              products.map((product) => (
                <MenuProductcard
                  onAddToCart={() => addPacketToCart(product._id, 1)}
                  to={`/product/${product._id}`}
                  key={product._id}
                  img={product.thumbnail}
                  title={product.name}
                  heading={product.category}
                  price={`₹${product.packetPrice} / ${product.packetQuantity}${product.packetUnit}`}
                />
              ))}
          </div>
          <div className='flex justify-center mt-6'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index + 1}>
                    <PaginationLink
                      onClick={() => handlePageChange(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
