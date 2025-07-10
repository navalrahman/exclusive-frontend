import React, { useEffect, useState } from 'react'
import './Flashsale.css'


import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";


import { productsList } from '../../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addToCart, cartItems } from '../../../redux/cartSlice';
import toast from 'react-hot-toast';
import { wishlistAdd, wishlistitem } from '../../../redux/wishlistSlice';
wishlistAdd
const Flashsale = () => {

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const target = new Date();
        target.setDate(target.getDate() + 5); // 3 days from now

        const timer = setInterval(() => {
            const now = new Date();
            const difference = target - now;

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);



    const location = useLocation(); // Detects route changes
    const navigate = useNavigate()
    const { product, loading, error, lastFetched } = useSelector(state => state.product)
    const dispatch = useDispatch()


    const now = Date.now();
    const shouldRefetch = !lastFetched || now - lastFetched > 10000; // refetch after 30s

    useEffect(() => {
        if (shouldRefetch) {
            dispatch(productsList());
        }
    }, [dispatch, shouldRefetch]);

    const products = Array.isArray(product?.products) ? product.products.slice(0, 4) : [];

    // console.log('component', product);
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
        // console.log("clicked", data);

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
        <div className='flashsale-component'>
            <div className='flashsale-component-container-one'>
                <div></div>
                <p style={{ color: '#DB4444' }}>Today's </p>
            </div>
            <div style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>
                <h2>Flash Sales</h2>
                <h2 style={{display:'flex', gap:'10px'}}>
                    <span>
                        <p style={{ fontSize: '8px' }}>Days</p>
                        <h4>{String(timeLeft.days).padStart(2, '0')} :</h4>
                    </span> 
                    <span>
                        <p style={{ fontSize: '8px' }}>Hours</p>
                        <h4>{String(timeLeft.hours).padStart(2, '0')} :</h4>
                    </span> 
                    <span>
                        <p style={{ fontSize: '8px' }}>Minutes</p>
                        <h4>{String(timeLeft.minutes).padStart(2, '0')} :</h4>
                    </span> 
                    <span>
                        <p style={{ fontSize: '8px' }}>Seconds</p>
                        {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                </h2>
            </div>
            <div className='flashsale-component-container-three'>
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
                                        <img src={ele.images?.[0]} alt="" width={"180px"} height={"180px"} color={'#F5F5F5'} />
                                    </div>
                                    <div className='card-right'>
                                        <CiHeart style={{ cursor: 'pointer' }} onClick={() => handleAddToWishList(ele)} />
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

export default Flashsale