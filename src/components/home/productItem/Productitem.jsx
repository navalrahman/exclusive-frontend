import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { productitem } from '../../../redux/productSlice';

import './Productitem.css'
import { ImHeart } from 'react-icons/im';
import { CiHeart } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbRefresh } from "react-icons/tb";
import { wishlistAdd, wishlistitem } from '../../../redux/wishlistSlice';
import toast from 'react-hot-toast';
import Flashsale from '../flashsale/Flashsale';
import { addresses } from '../../../redux/addressSlice';
import ProgressBar from './ProgressBar';



const Productitem = () => {

    const location = useLocation()
    const token = localStorage.getItem('token')
    // console.log(location.pathname.split("/")[2]);
    const id = location.pathname.split("/")[2]

    // console.log("id", id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productitem(id));
        dispatch(addresses())
    }, [dispatch, id])

    const { product, singleProduct, wishlist, loading, error } = useSelector(state => state.product || state.wishlist)
    const { address } = useSelector(state => state.address)

    const data = singleProduct?.product

    // console.log('data',address);

    const productName = data?.name;

    const [show, setShow] = useState(false)
    const [showImage, setShowImage] = useState()

    const handleMouseEnter = (img) => {
        setShowImage(img)
        setShow(true)
    }

    const handleMouseLeave = () => {
        setShow(false)
    }

    const [count, setCount] = useState(1)

    const navigate = useNavigate()

    const handleWishlist = (data) => {
        console.log(data);

        if (!token) {
            toast.error("Please log in to add items to your wishlist.");
            setTimeout(() => {
                navigate('/login');
            }, 4000)

            return; // prevent dispatch if not logged in
        }
        dispatch(wishlistAdd(data._id))
            .then((res) => {
                // console.log(res);
                toast.success(res.payload.message)
                dispatch(wishlistitem())
            })

    }

    const [modal, setModal] = useState(false)

    // const [steps, setSteps] = useState(1)
    // const [stepTwo, setSteptwo] = 


    const handleBuy = () => {
        if (!token) {

            toast.error('Please login to buy the product')
            setTimeout(() => {
                navigate('/login')
            }, 4000)
        } else {
            setModal(true)
        }


    }

    const addressData = address?.addressData?.data || []
    console.log("addressData", addressData);

    return (
        <div className='productitem-component'>
            <div className='productitem-component-container-one'>
                {`account / product / ${productName}`}
            </div>

            <div className='productitem-component-container-one'>
                {/* Left thumbnails */}
                <div className='productitem-component-container-one-subcontainer-one'>
                    {data?.images?.slice(1, 5).map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`thumb-${index}`}
                                onMouseEnter={() => handleMouseEnter(img)}
                                onMouseLeave={() => handleMouseLeave()} width='130px' height='130px'
                            />
                        </div>
                    ))}
                </div>

                {/* Main image with buttons */}
                <div className='productitem-component-container-one-subcontainer-two'>
                    {
                        show ?
                            <>
                                <img src={showImage} alt={`thumb`}
                                    width='500px' height='500px'
                                />

                            </>
                            :
                            <img src={data?.images?.[0]} alt="main" width='500px' height='500px' />
                    }

                </div>

                {/* Details section */}
                <div className='productitem-component-container-one-subcontainer-three'>
                    <h2>{data?.name}</h2>
                    <h4>Rating</h4>
                    <p>${data?.price}</p>
                    <p>{data?.description}</p>
                    <div style={{ borderBottom: '1px solid black' }}>

                    </div>
                    {
                        data?.sizes ? <p>{data?.sizes}</p> : ''
                    }

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', width: "45%" }}>
                            <button onClick={() => setCount(count - 1)} disabled={count === 1} style={{ width: '25%', height: '30px', border: 'none', backgroundColor: '#DB4444', color: 'white' }}>-</button>
                            <h2 style={{ width: "50%", textAlign: 'center', border: '1px solid black' }}>{count}</h2>
                            <button onClick={() => setCount(count + 1)} style={{ width: '25%', height: '30px', border: 'none', backgroundColor: '#DB4444', color: 'white' }}>+</button>
                        </div>
                        <div style={{ width: '45%', height: '30px' }}>
                            <button onClick={handleBuy} style={{ border: 'none', backgroundColor: '#DB4444', color: 'white' }}>Buy Now</button>
                            <div>
                                {modal &&  <ProgressBar addressData={addressData} modal={modal} setModal={setModal} productName={productName} count={count} data={data}/>  }
                            </div>

                        </div>
                        <div style={{ border: '1px solid black', height: "28px", width: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CiHeart style={{ cursor: 'pointer' }} onClick={() => handleWishlist(data)} />
                        </div>
                    </div>
                    <div className='fearurs-and-specailisation'>
                        <div className='fearurs-and-specailisation-container-one'>
                            {/* <div> */}
                            <CiDeliveryTruck className='fearurs-and-specailisation-container-one-icon' />
                            {/* </div> */}
                            <div>

                                <h4>Free Delievery</h4>
                                <p style={{ fontSize: '12px' }}>Enter your postal code for Delievery Avalilability</p>
                            </div>
                        </div>
                        <div>
                            <div className='fearurs-and-specailisation-container-one'>
                                {/* <div> */}
                                <TbRefresh className='fearurs-and-specailisation-container-one-icon' />
                                {/* </div> */}
                                <div>

                                    <h4>Retunrn Delievery</h4>
                                    <p style={{ fontSize: '12px' }}>Free 30 Days Delievery Return. details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {/* <Flashsale/> */}
            </div>
        </div>

    )
}

export default Productitem