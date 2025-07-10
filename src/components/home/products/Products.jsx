import React, { useEffect, useState } from 'react'

// import '/Products.css'

import './products.css'


import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";

// import productDetails from '../../productDetails/productDetails';

import { productsList } from '../../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Productitem from '../productItem/Productitem';
import { useNavigate } from 'react-router-dom';


import { addToCart } from '../../../redux/cartSlice';
import toast from 'react-hot-toast';
import { wishlistAdd, wishlistitem } from '../../../redux/wishlistSlice';

const Products = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch()


    const { product, loading, error, lastFetched } = useSelector(state => state.product)


    const now = Date.now();
    const shouldRefetch = !lastFetched || now - lastFetched > 10000; // refetch after 30s

    useEffect(() => {
        if (shouldRefetch) {
            dispatch(productsList());
        }
    }, [dispatch, shouldRefetch]);

    // const products = product?.products.slice(8, 12) || [];
    const products = Array.isArray(product?.products) ? product.products.slice(0, 12) : [];


    // useEffect(() => {
    //     dispatch(productsList());
    // }, [dispatch])

    // const { product, loading, error } = useSelector(state => state.product)

    // const products = product?.products.slice(0, 8) || [];
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
            toast.error("Please log in to add items to your cart.");
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
        <div className='products-component'>
            <div className='products-component-container-one'>
                <div></div>
                <p style={{ color: '#DB4444' }}>Our Products</p>
            </div>
            <div className='products-component-container-two'>
                <div>
                    <h3>Explore Our Products</h3>
                </div>
                <div>
                    {/* <div className='productlist-component-container-two-arrows'> */}
                    <FaArrowLeft style={{ backgroundColor: '#F5F5F5', width: '20px', height: '20px', padding: '5px', borderRadius: '50%' }} />
                    <FaArrowRight style={{ backgroundColor: '#F5F5F5', width: '20px', height: '20px', padding: '5px', borderRadius: '50%' }} />
                    {/* </div> */}
                </div>
            </div>

            <div className='products-component-container-three'>
                {
                    products.length > 0 && products.map((ele, index) => {
                        return (
                            <div className='products-component-container-three-card' key={ele._id} >
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
                                        <CiHeart style={{ cursor: 'pointer' }} onClick={() => handleAddToWishList(ele) } />
                                        <IoEyeOutline />
                                    </div>

                                    {hoveredIndex === index && (
                                        <button onClick={() => handleAddToCart(ele._id)} className="hover-button">Add to Cart</button>
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

            <div className='products-component-container-four'>
                <button>View All Products</button>
            </div>
        </div>
    )
}

export default Products