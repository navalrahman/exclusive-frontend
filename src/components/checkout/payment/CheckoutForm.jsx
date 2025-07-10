import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { billingitem } from '../../../redux/billingSlice';
import { useDispatch } from 'react-redux';

const CheckoutForm = ({formData, productNameAndCount}) => {
  const stripe = useStripe(); // ✅ Add this
  const elements = useElements(); // ✅ Add this

  const dispatch = useDispatch()

  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [paymentError, setPaymentError] = useState(null); // ✅ You were using this without declaring it

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        throw new Error(error.message);
      }

      await handlePayment(token.id);
    } catch (error) {
      console.error(error);
      setPaymentError(error.message || 'An error occurred during payment.');
      setPaymentSuccess(null);
    }
  };

  const handlePayment = async (tokenId) => {
    try {
      const response = await axios.post('http://localhost:5080/payment', { token: tokenId });
      if (response.data.success) {
        setPaymentSuccess('Payment successful!');
        toast.success('Payment successful!',"Your order placed")
        setPaymentError(null);
        const addressData = {
                formData,
                productNameAndCount
            }
            // console.log('checkedData', addressData);
            dispatch(billingitem(addressData))
                .then((res) => {
                    console.log(res);
                    if (res.meta.requestStatus === "fulfilled") {
                        toast.success(paymentSuccess,"Your order placed")
                    }

                })
        // toast.success("your order placed")
        navigate('/orders')
      } else {
        setPaymentError('Payment failed. Please try again.');
        setPaymentSuccess(null);
      }
    } catch (error) {
      console.error(error);
      setPaymentError('An error occurred while processing your payment.');
      setPaymentSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <CardElement 
       //options={styles.cardElement} 
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#32325d',
            },
          },
        }}
      />
      <button
        type="submit"
        style={stripe ? styles.submitButton : { ...styles.submitButton, ...styles.disabledButton }}
        disabled={!stripe}
      >
        Pay
      </button>
      {/* {paymentError && <div style={styles.error}>{paymentError}</div>} */}
      {/* {paymentSuccess && <div style={styles.success}>{paymentSuccess}</div>} */}
    </form>
  );
};

export default CheckoutForm;

const styles = {
  form: {
    width: '400px',
    margin: 'auto',
  },
  cardElement: {
    fontSize: '16px',
    color: '#32325d',
  },
  submitButton: {
    marginTop: '16px',
    padding: '10px 15px',
    backgroundColor: '#5cb85c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  disabledButton: {
    backgroundColor: '#b3b3b3',
    cursor: 'not-allowed',
  },
  error: {
    color: 'red',
    marginTop: '8px',
  },
  success: {
    color: 'green',
    marginTop: '8px',
  },
};
