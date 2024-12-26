import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/zustand/apis/CartStore';
import usePaymentStore from '@/zustand/apis/RazorPayStore';
import { useUser } from '@/zustand/apis/userState';
import { variables } from '@/zustand/variables/variables';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const { userData } = useUser();
  const { getCart } = useCartStore();
  const navigate = useNavigate();
  const { initiateCheckout } = usePaymentStore();
  useEffect(() => {
    const fetchCartDetails = async () => {
      const cartId = userData?.cart || userData?.user?.cart;
      if (!cartId) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCart(cartId);
        console.log(response);

        if (response?.cart?.products) {
          console.log(response.cart.products);

          setCartItems(response.cart.products);
          calculateTotalPrice(response.cart.products);
        }
      } catch (error) {
        console.error('Error fetching cart details:', error);
      } finally {
        setLoading(false);
      }
    };
    console.log();

    fetchCartDetails();
  }, [getCart, userData]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.totalAmt, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (index, newQuantity, isBoxQuantity) => {
    const newCartItems = [...cartItems];
    const item = newCartItems[index];
    const boxMultiplier = item.productId.boxQuantity || 1;

    if (isBoxQuantity) {
      item.quantity = newQuantity;
      item.totalAmt = item.productId.packetPrice * boxMultiplier * newQuantity;
      item.quantity = boxMultiplier * newQuantity;
    } else {
      item.quantity = newQuantity;
      item.totalAmt = newQuantity * item.productId.packetPrice;
    }
    console.log(item);

    newCartItems[index] = item;
    setCartItems(newCartItems);
    calculateTotalPrice(newCartItems);
  };

  const handleBoxQuantityChange = (index) => {
    const item = cartItems[index];
    const isBoxQuantitySelected = !item.isBoxQuantity;
    item.isBoxQuantity = isBoxQuantitySelected;

    handleQuantityChange(index, 1, isBoxQuantitySelected);
  };

  const handleQuantityAdjustment = (index, adjustment, isBoxQuantity) => {
    const item = cartItems[index];
    const newQuantity = item.quantity + adjustment;

    if (newQuantity < 1) return;

    handleQuantityChange(index, newQuantity, isBoxQuantity);
  };
  const openRazorpayPaymentWindow = (order) => {
    const options = {
      key: order.key,
      amount: order.amount,
      currency: 'INR',
      name: 'Meet',
      description: 'Test Transaction',
      image: 'https://avatars.githubusercontent.com/u/147489256?v=4',
      order_id: order.id,
      callback_url: `${variables.backend_url}/pay/payment-verify`,
      prefill: {
        name: 'Meet',
        email: 'meet@gmail.com',
        contact: '9000090000',
      },

      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    if (window.Razorpay) {
      const razor = new window.Razorpay(options);
      razor.open();
    } else {
      console.error('Razorpay is not loaded.');
    }
  };
  const handleCheckout = async () => {
    try {
      const cartData = {
        totalAmt: totalPrice,
        products: cartItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          totalAmt: item.totalAmt,
        })),
      };
      localStorage.setItem('cartData', JSON.stringify(cartData));

      console.log('Checkout successful', cartData);
      await initiateCheckout(totalPrice, openRazorpayPaymentWindow);
      //   window.location.reload();
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto py-8 pt-20">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          className="mr-4"
          onClick={() => navigate('/')}
        >
          <FaArrowLeft className="mr-2" />
          Back to Shop
        </Button>
        <h2 className="text-2xl font-semibold">Checkout</h2>
      </div>

      <div className="space-y-6">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty</div>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={item.productId._id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex space-x-4">
                <img
                  src={item.productId.thumbnail}
                  alt={item.productId.name}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h3 className="font-medium">{item.productId.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.productId.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.productId.description}
                  </p>
                </div>
              </div>
              <div className="flex space-x-4 items-center">
                <input
                  type="checkbox"
                  checked={item.isBoxQuantity || false}
                  onChange={() => handleBoxQuantityChange(index)}
                  className="w-5 h-5"
                />
                <span className="text-sm text-gray-500">Box of 20 packets</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityAdjustment(index, -1, item.isBoxQuantity)
                    }
                    className="px-2 py-1 border rounded-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        index,
                        parseInt(e.target.value, 10),
                        item.isBoxQuantity
                      )
                    }
                    className="w-16 p-2 border rounded-lg"
                  />
                  <button
                    onClick={() =>
                      handleQuantityAdjustment(index, 1, item.isBoxQuantity)
                    }
                    className="px-2 py-1 border rounded-lg"
                  >
                    +
                  </button>
                </div>
                <p className="text-lg font-medium">
                  ₹{item.totalAmt.toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
        <div className="flex justify-between mt-8 text-xl font-semibold">
          <span>Total Price:</span>
          <span>₹{totalPrice.toLocaleString()}</span>
        </div>
        <div className="mt-8">
          <Button
            onClick={handleCheckout}
            className="w-full py-3 bg-blue-600 text-white rounded-lg"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
