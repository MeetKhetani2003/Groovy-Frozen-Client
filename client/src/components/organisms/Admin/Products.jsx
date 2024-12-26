/* eslint-disable no-unused-vars */

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { useProducts } from '@/hooks/ProductHook';
import { useProductStore } from '@/zustand/apis/ProductStore';

const Products = () => {
  const { products } = useProductStore(); // Access products from Zustand
  const { getAllProductsPaginated } = useProducts();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        if (!products || products.length === 0) {
          await getAllProductsPaginated(1, 8); // Fetch only once
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchProducts();
  }, [getAllProductsPaginated]); // Dependency on `getAllProductsPaginated` ensures function stability

  useEffect(() => {
    // Filter products based on the search query
    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleDeleteClick = (productId) => {
    // Implement delete functionality here
    console.log('Delete product with ID:', productId);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setCurrentProduct(null);
  };

  const handleSaveChanges = () => {
    // Implement save changes functionality here
    console.log('Save changes for product:', currentProduct);
    handleCloseDialog();
  };

  if (loading) {
    return <div className="text-center mt-24 text-xl">Loading...</div>;
  }

  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div className="text-center mt-24 text-xl">No products available</div>
    );
  }

  return (
    <Paper>
      <h1 className="text-3xl font-semibold mb-6">Product List</h1>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TableContainer style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ whiteSpace: 'nowrap' }}>SR No.</TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>
                Product Name
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>
                Stock Quantity
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>
                Packet Quantity
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>Thumbnail</TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>Price</TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>
                Sold Packets
              </TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {product.stockQuantity} {product.stockUnit}
                  </TableCell>
                  <TableCell>
                    {product.packetQuantity} {product.packetUnit}
                  </TableCell>
                  <TableCell>
                    <img
                      src={product.thumbnail}
                      alt="Product Thumbnail"
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                      }}
                    />
                  </TableCell>
                  <TableCell>{product.packetPrice}</TableCell>
                  <TableCell>{product.soldPackets}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(product)}>
                      <Pencil />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(product._id)}>
                      <Trash2 />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[8, 16, 24]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            fullWidth
            margin="normal"
            value={currentProduct?.name || ''}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, name: e.target.value })
            }
          />
          <TextField
            label="Stock Quantity"
            fullWidth
            margin="normal"
            type="number"
            value={currentProduct?.stockQuantity || ''}
            onChange={(e) =>
              setCurrentProduct({
                ...currentProduct,
                stockQuantity: e.target.value,
              })
            }
          />
          <TextField
            label="Packet Quantity"
            fullWidth
            margin="normal"
            type="number"
            value={currentProduct?.packetQuantity || ''}
            onChange={(e) =>
              setCurrentProduct({
                ...currentProduct,
                packetQuantity: e.target.value,
              })
            }
          />
          <TextField
            label="Price"
            fullWidth
            margin="normal"
            type="number"
            value={currentProduct?.packetPrice || ''}
            onChange={(e) =>
              setCurrentProduct({
                ...currentProduct,
                packetPrice: e.target.value,
              })
            }
          />
          {/* Add more fields as necessary */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Products;
