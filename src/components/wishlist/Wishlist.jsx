import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CiHeart } from 'react-icons/ci'

import './Wishlist.css'
import { IoEarOutline, IoEyeOutline } from 'react-icons/io5'
import { AiFillStar } from 'react-icons/ai'
import { wishlistDelete, wishlistitem } from '../../redux/wishlistSlice'
import Thismonth from '../home/thismonth/Thismonth'
import { RiDeleteBin5Line } from "react-icons/ri";
import toast from 'react-hot-toast'
import { addToCart, cartItems } from '../../redux/cartSlice'


const Wishlist = () => {

    const { wishlist } = useSelector(state => state.wishlist)
    // console.log("wishlist", wishlist);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(wishlistitem())
    }, [dispatch])
    const products = wishlist?.products || [];

    // const products = wishlist.products

    const handleWishlistDelete = (id) => {
        // console.log("safasfa", id);
        dispatch(wishlistDelete(id))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    toast.success(res.payload.message);
                    setTimeout(() => {
                        dispatch(wishlistitem())
                    }, 1000)

                } else {
                    toast.error('Failed to remove item from wishlist');
                }
            })
    }



    // const handleAddToCart = (id) => {
    //     // console.log('clicked', id);
    //     dispatch(addToCart(id))
    //         .then((res) => {
    //             console.log(res);
    //             if (res.meta.requestStatus === 'fulfilled') {
    //                 toast.success('item added to cart')
    //                 dispatch(cartItems())
    //                 console.log();

    //             }
    //         })

    //     // dispatch(wishlistDelete(id))
    //     // dispatch(wishlistitem())

    // }

    const handleAddToCart = (id) => {
  dispatch(addToCart(id))
    .then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Item added to cart');

        // ✅ Refresh cart
        dispatch(cartItems());

        // ✅ Now safely delete from wishlist
        dispatch(wishlistDelete(id))
          .then((res2) => {
            if (res2.meta.requestStatus === 'fulfilled') {
            //   toast.success('Item removed from wishlist');
              dispatch(wishlistitem()); // Optional: refresh wishlist
            } else {
              toast.error('Failed to remove from wishlist');
            }
          });

      } else {
        toast.error('Failed to add item to cart');
      }
    });
};


    return (
        <div className='wishlist-component'>
            <div className='wishlsit-component-container-one'>
                <h4>Wishlist
                    ({products.length})
                </h4>

                <button>Move All To Bag</button>
            </div>

            <div className='wishlist-component-container-two'>
                {
                    products.length > 0 && products.map((ele, index) => {
                        return (
                            <div className='wishlist-component-container-one-card' key={ele._id} >
                                {/* <img src={ele.} alt="" /> */}
                                <div className='card-container'>
                                    <div className='card-left'>

                                    </div>
                                    <div className='card-center' >
                                        <img src={ele.images?.[0]} alt="" width={"180px"} height={"180px"} Color={'#F5F5F5'} />
                                    </div>
                                    <div className='card-right'>
                                        {/* <CiHeart /> */}
                                        {/* <IoEyeOutline /> */}
                                        <RiDeleteBin5Line style={{ cursor: 'pointer' }} onClick={() => handleWishlistDelete(ele._id)} />
                                    </div>

                                    <button className="hover-button" onClick={() => handleAddToCart(ele._id)}>Add to Cart</button>
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

            <div>
                <Thismonth />
            </div>
        </div>
    )
}

export default Wishlist