import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { cartItems, incrementQuantity, decrementQuantity } from '../../redux/cartSlice'


import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Cart = () => {


    const { wishlist, loading, error } = useSelector(state => state.wishlist)
    const { cart } = useSelector(state => state.cart)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')


    useEffect(() => {
        if (token) {
            dispatch(cartItems());
        }
    }, [dispatch, token]);

    const data = cart?.products || []

    // console.log('data', data);


    const handleProcesstoCheckout = () => {
        navigate('/checkout')
    }


    const handleIncrement = (product) => {
        // console.log('product',product.quantity);
        dispatch(incrementQuantity(product.productId._id)).then(() => {
            dispatch(cartItems()); // Refresh cart
        });
    };

    const handleDecrement = (product) => {
        dispatch(decrementQuantity(product.productId._id)).then(() => {
            dispatch(cartItems()); // Refresh cart
        });
    };


    const totalAmount = data && data.length > 0 && data.reduce((sum, item) => {
        return sum + item.productId.price * item.quantity;
    }, 0);

    return (
        <div className='cart-component'>
            <div>
                <p>home {location.pathname}</p>
                {/* <p>({data.length})</p> */}
                 
            </div>
            {
                data?.length > 0 ?
                    <>
                        <div className='cart-component-container-two'>
                            <table className='cart-component-container-two-table'>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                {/* <tbody>
                        {data ?

                            data.products.map((ele) => {
                                return (
                                    <tr>
                                        <td>{ele.name}</td>
                                        <td>${ele.price}</td>
                                        <td style={{ display: 'flex' }}>
                                            <div style={{ width: '50px', display: 'flex', border: '1px solid black', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                                                {count}
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>

                                                    <IoIosArrowUp onClick={() => handleIncrement(ele)} />
                                                    <IoIosArrowDown onClick={() => handleDecrement(ele)} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>${ele.price * ele.qunatity}</td>
                                    </tr>
                                )
                            })
                            : 'NO Items added yet'
                        }
                    </tbody> */}

                                <tbody>
                                    {data && data.length > 0 ? (
                                        data.map((ele) => {
                                            const product = ele.productId;
                                            const quantity = ele.quantity;
                                            const subtotal = product.price * quantity;

                                            return (
                                                <tr key={ele._id}>
                                                    <td style={{ display: 'flex', gap: "15px", alignItems: 'center' }}><img src={product.images[0]} alt="" width={"30px"} height={"30px"} /> <p>{product.name}</p> </td>
                                                    <td>₹{product.price}</td>
                                                    <td>
                                                        <div style={{ width: '60px', display: 'flex', border: '1px solid black', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                                                            <span>{quantity}</span>
                                                            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                                                                <IoIosArrowUp onClick={() => handleIncrement(ele)} />
                                                                <IoIosArrowDown onClick={() => handleDecrement(ele)} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>₹{subtotal}</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No items added yet</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>
                        <div className='cart-component-container-three'>
                            <button>Return to top</button>
                            <button>Update Cart</button>
                        </div>

                        <div className='cart-component-container-four'>
                            <div className='cart-component-container-four-divison-one'>
                                <input type="text" placeholder='coupon code' />
                                <button>Apply Coupon</button>
                            </div>
                            <div className='cart-component-container-four-divison-two'>
                                <h4>Cart Total</h4>
                                <div>
                                    <p>Subtotal</p>
                                    <p>{(totalAmount || 0).toLocaleString('en-IN')}</p>
                                </div>
                                <div>
                                    <p>Shipping free</p>
                                    <p>Free</p>
                                </div>
                                <div>
                                    <p>total</p>
                                    <p>{(totalAmount || 0).toLocaleString('en-IN')}</p>
                                </div>
                                <div className='cart-button'>
                                    <button onClick={handleProcesstoCheckout}>Process to checkout</button>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid black', gap: '40px', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                            <h2>No Item Added yet</h2>
                            <h3>Please Add to see the cart page</h3>
                            <div>
                                <button
                                    style={{ padding: '10px', border: 'none', color: '#ffffff', backgroundColor: '#DB4444', borderRadius: '6px', cursor: 'pointer' }}
                                    onClick={() => navigate('/')}
                                >
                                    Home Page
                                </button>
                            </div>
                        </div>
                    </>
            }

        </div >
    )
}

export default Cart