// PaymentComponent.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import './PaymentComponent.css'
import { useLocation } from 'react-router-dom';

//Create a Stripe promise (stripePromise) using the loadStripe function. This promise is used to load the Stripe.js script asynchronously.
const stripePromise = loadStripe('pk_test_51RgmDBCGpoRMo9ohgghqAtcX5mG4oKqfw7UMk2QrrTNU8tkB9pcruFYkrBUGmja9p08ooOk7mxFf91WiDporM44t00yzpaE7fM');
const PaymentComponent = () => {
    const location = useLocation();
    const { formData, productNameAndCount } = location.state || {};
    console.log('sfasfasfaga', productNameAndCount);
    
    const totalAmount = productNameAndCount && productNameAndCount.length > 0 && productNameAndCount.reduce((sum, item) => {
        return sum + item.price * item.count;
    }, 0);

    console.log(totalAmount);
    
    return (
        <div className='payment-component'>
            <div className='payment-component-container'>
                <h1>Payment Widnow</h1>
                {/* Wrap the CheckoutForm component with the Elements component and provide the Stripe promise */}
                <div className='payment-component-container-one'>
                    <h3>Total Amount : {totalAmount}</h3>

                    <h3>Add your Card Details here </h3>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm  formData={formData} productNameAndCount={productNameAndCount}/>
                    </Elements>
                </div>

            </div>
        </div>
    );
};
export default PaymentComponent;