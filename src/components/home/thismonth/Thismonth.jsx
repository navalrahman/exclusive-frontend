import React, { useEffect, useState } from 'react'

import './Thismonth.css'


import { productsList } from '../../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';


import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { addToCart, cartItems } from '../../../redux/cartSlice';
import toast from 'react-hot-toast';
import { wishlistAdd, wishlistitem } from '../../../redux/wishlistSlice';

const Thismonth = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(productsList());
    // }, [dispatch])

    const { product, loading, error, lastFetched } = useSelector(state => state.product)


    const now = Date.now();
    const shouldRefetch = !lastFetched || now - lastFetched > 10000; // refetch after 30s

    useEffect(() => {
        if (shouldRefetch) {
            dispatch(productsList());
        }
    }, [dispatch, shouldRefetch]);

    // const products = product?.products.slice(8, 12) || [];
    const products = Array.isArray(product?.products) ? product.products.slice(8, 12) : [];

    // console.log('component', products);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleProductClick = (id) => {
        navigate(`/productdetails/${id}`);
    };

    const handleAddToCart = (id) => {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error("Please log in to add items to your wishlist.");
            setTimeout(() => {
                navigate('/login');
            }, 4000)

            return; // prevent dispatch if not logged in
        }
        // console.log('clicked', id);
        dispatch(addToCart(id))
            .then((res) => {
                console.log(res);
                if (res.meta.requestStatus === 'fulfilled') {
                    toast.success('item added to cart')
                    dispatch(cartItems())
                }
            })
    }

    
    const handleAddToWishList = (data) => {
        console.log("clicked", data);
        
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error("Please log in to add items to your wishlist.");
            setTimeout(() => {
                navigate('/login');
            }, 4000)

            return; // prevent dispatch if not logged in
        }
        dispatch(wishlistAdd(data._id))
            .then((res) => {
                console.log(res);
                toast.success(res.payload.message)
                dispatch(wishlistitem())
            })

    }

    return (
        <div className='thismonth-component'>
            <div className='thismonth-component-container-one'>
                <div></div>
                <p style={{ color: '#DB4444' }}>This Month</p>
            </div>
            <div className='thismonth-component-container-two'>
                <div>
                    <h3>Best Selling Products</h3>
                </div>
                <div>
                    <button className='thismonth-button'>View All</button>
                </div>
            </div>

            <div className='products-component-container-three'>
                {
                    products.length > 0 && products.map((ele, index) => {
                        return (
                            <div className='products-component-container-three-card' key={ele._id}>
                                {/* <img src={ele.} alt="" /> */}
                                <div
                                    className='card-container'
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}>
                                    <div className='card-left'>

                                    </div>
                                    <div className='card-center' onClick={() => handleProductClick(ele._id)}>
                                        <img src={ele.images?.[0]} alt="" width={"180px"} height={"180px"} Color={'#F5F5F5'} />
                                    </div>
                                    <div className='card-right'>
                                        <CiHeart style={{cursor:'pointer'}} onClick={() => handleAddToWishList(ele)} />
                                        <IoEyeOutline />
                                    </div>

                                    {hoveredIndex === index && (
                                        <button className="hover-button" onClick={() => handleAddToCart(ele._id)}>Add to Cart</button>
                                    )}
                                </div>
                                <p>{ele.name}</p>
                                <span style={{ display: 'flex', gap: '10px' }}>
                                    <p>$ {ele.price}</p>
                                    <div style={{ display: 'flex', color: 'gold' }}>
                                        {Array(ele.rating).fill().map((_, index) => (
                                            <AiFillStar key={index} />
                                        ))}

                                    </div>
                                </span>

                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default Thismonth