import { create } from 'zustand';

import axiosInstance from '../instences/axios';

// Define the Zustand store
const usePaymentStore = create((set) => ({
  paymentDetails: null,
  loading: false,
  error: null,
  amount: 0,

  setAmount: (amount) => set({ amount }),

  // Action to initiate a checkout
  initiateCheckout: async (amount, openRazorpayPaymentWindow) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        '/pay/checkout',
        { amount },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Checkout Response:', response.data); // Log the response data
      const data = response.data;
      if (data.success) {
        set({ paymentDetails: data.order, loading: false });
        // Open Razorpay payment window here
        openRazorpayPaymentWindow(data.order);
      } else {
        set({ error: 'Failed to create order', loading: false });
      }
    } catch (error) {
      console.error('Checkout Error:', error); // Log any errors
      set({ error: 'Failed to create order', loading: false });
    }
  },

  // Action to verify a payment
  verifyPayment: async (orderId, paymentId, signature) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        '/pay/payment-verification',
        {
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Payment Verification Response:', response.data); // Log the response data
      const data = response.data;
      if (data.success) {
        set({ paymentDetails: null, loading: false });
      } else {
        set({ error: 'Payment verification failed', loading: false });
      }
    } catch (error) {
      console.error('Payment Verification Error:', error); // Log any errors
      set({ error: 'Failed to verify payment', loading: false });
    }
  },

  // Function to open Razorpay payment window
  openRazorpayPaymentWindow: (order) => {
    const options = {
      key: order.key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits
      currency: 'INR',
      name: 'Meet',
      description: 'Test Transaction',
      image: 'https://avatars.githubusercontent.com/u/147489256?v=4',
      order_id: order.id, // Order ID obtained from the response
      callback_url: 'http://localhost:3000/api/v1/pay/payment-verification',
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9000090000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    // Ensure Razorpay script is loaded
    if (window.Razorpay) {
      const razor = new window.Razorpay(options);
      razor.open();
    } else {
      console.error('Razorpay is not loaded.');
    }
  },

  // Reset state
  resetState: () => set({ paymentDetails: null, loading: false, error: null }),
}));

export default usePaymentStore;
