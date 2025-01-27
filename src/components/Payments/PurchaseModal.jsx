import React from 'react';
import Swal from 'sweetalert2';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function PurchaseModal({ isOpen, onClose, selectedProperty, onConfirmPurchase }) {
  if (!isOpen) return null;

  const handlePayment = async() => {
    Swal.fire({
      title: 'Processing Payment...',
      text: 'Please wait while we process your payment.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      // 1. Call your backend to create PaymentIntent and get the client secret
      const response = await fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: selectedProperty.offerAmount }),
      });

      if (!response.ok) throw new Error('Failed to create payment intent');
      const { clientSecret } = await response.json();

      // 2. Confirm the payment using Stripe's client secret
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        Swal.close();
        Swal.fire('Error', error.message, 'error');
        return;
      }

      // 3. Success, paymentIntent is successfully confirmed
      const transactionId = paymentIntent.id; // Get transaction ID from paymentIntent
      Swal.close();
      Swal.fire('Success', 'Payment completed successfully!', 'success');

      // 4. Call backend to update the offer status with the transaction ID
      const res = await fetch(`${import.meta.env.VITE_API_URL}/update-status/${selectedProperty._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'bought', // New status
          transactionId, // Actual transaction ID from Stripe
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update offer status');
      }

      const updatedOffer = await res.json();
      // console.log('Offer status updated:', updatedOffer);

      // Close the modal and notify parent component
      onConfirmPurchase();
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'There was an error processing your payment.', 'error');
    }


  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirm Your Purchase</h2>
        <div className="mb-4">
          <p><strong>Item:</strong> {selectedProperty.propertyTitle}</p>
          <p><strong>Price:</strong> ${selectedProperty.offerAmount}</p>
        </div>

        {/* CheckOut Form */}
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>

        <div className="flex justify-end space-x-4">
          <button
            className="btn bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handlePayment}
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseModal;
