import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import './Checkout.css'

import visa from '../../images/visa.png'
import bkash from '../../images/bkash.png'
import mastercard from '../../images/mastercard.png'
import hindi from '../../images/hindi.png'
import { useDispatch, useSelector } from 'react-redux'
import { cartItems } from '../../redux/cartSlice'
import { billingitem } from '../../redux/billingSlice'
import toast from 'react-hot-toast'
import { addresses } from '../../redux/addressSlice'

const Checkout = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cart } = useSelector(state => state.cart)
    const { address } = useSelector(state => state.address)


    useEffect(() => {
        dispatch(cartItems())
        dispatch(addresses())
    }, [dispatch])

    console.log("address", address);

    const addressData = address?.addressData?.data

    const data = cart?.products
    console.log('data', addressData);

    const totalAmount = data && data.length > 0 && data.reduce((sum, item) => {
        return sum + item.productId.price * item.quantity;
    }, 0);

    const [PaymentMethod, setPaymentMethod] = useState('')

    const handlePaymentByBank = () => {
        setPaymentMethod('bank')
    }

    const handlePaymentByCash = () => {
        setPaymentMethod('cash')
    }

    const [formData, setFormData] = useState({
        firstName: '',
        companyName: '',
        streetAddress: '',
        appartment: '',
        city: '',
        phone: '',
        email: ''
    })
    const [ischecked, setIsChecked] = useState(false)

    const handleCheckboxChanges = (e) => {
        setIsChecked(e.target.checked)
    }

    const productNameAndCount = data?.map((ele) => {
        const product = ele.productId;
        const quantity = ele.quantity;
        return (
            {
                productname: product.name,
                count: quantity,
                price: product.price
            }
        )
    })

    const isPlaceOrderDisabled = () => {
        const requiredFieldsFilled =
            formData.firstName.trim() !== '' &&
            formData.streetAddress.trim() !== '' &&
            formData.city.trim() !== '' &&
            formData.phone.trim() !== '' &&
            formData.email.trim() !== '';

        const paymentSelected = PaymentMethod === 'bank' || PaymentMethod === 'cash';

        return !(requiredFieldsFilled && paymentSelected);
    };


    const handlePlaceTheOrder = () => {
        if (ischecked || !ischecked && PaymentMethod === "cash") {
            const addressData = {
                formData,
                productNameAndCount,
                ischecked
            }
            console.log('checkedData', addressData);
            dispatch(billingitem(addressData))
                .then((res) => {
                    console.log(res);
                    if (res.meta.requestStatus === "fulfilled") {
                        toast.success("Your order placed")
                        navigate('/orders')
                    }

                })

        } else if (!ischecked || ischecked && PaymentMethod === 'bank') {
            const addressData = {
                formData,
                productNameAndCount,
                ischecked
            }
            navigate('/payment', {
                state: addressData
            }
            )
        } else {
            toast.error('please add address and choose payment method')
        }
    }

    const [addressChecked, setAddressChecked] = useState(null)

    const handleAddressSelect = (data) => {
        setAddressChecked(data)
    }

    useEffect(() => {
        if (addressChecked) {
            setFormData({
                firstName: addressChecked.firstName || '',
                companyName: addressChecked.companyName || '',
                streetAddress: addressChecked.streetAddress || '',
                appartment: addressChecked.appartment || '',
                city: addressChecked.city || '',
                phone: addressChecked.phone || '',
                email: addressChecked.email || ''
            });
        }
    }, [addressChecked])

    return (
        <div className='checkout-component'>
            <div>
                <p>Account / My account / product / view cart {location.pathname}</p>
            </div>
            <div className='checkout-component-container-two'>
                <div className='checkout-component-container-two-subdivison-one'>
                    <h1>Billing Details</h1>
                    <form action="">
                        {/* <div> */}
                        <label style={{ color: '#ddd' }} >First Name <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="text"
                            className='checkout-input'
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                        />
                        {/* <div> */}
                        <label htmlFor="" style={{ color: '#ddd' }}>Company Name </label>
                        <input
                            type="text"
                            className='checkout-input'
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        />
                        {/* </div> */}

                        {/* <div> */}
                        <label htmlFor="" style={{ color: '#ddd' }}>Street Address<span style={{ color: 'red' }} >*</span></label>
                        <input
                            type="text"
                            className='checkout-input'
                            value={formData.streetAddress}
                            onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                            required
                        />
                        {/* </div> */}


                        {/* <div> */}
                        <label htmlFor="" style={{ color: '#ddd' }}>Apartment, floor, etc (optional) </label>
                        <input
                            type="text"
                            className='checkout-input'
                            value={formData.appartment}
                            onChange={(e) => setFormData({ ...formData, appartment: e.target.value })}
                        />
                        {/* </div> */}

                        {/* <div> */}
                        <label htmlFor="" style={{ color: '#ddd' }}>Town / City <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="text"
                            className='checkout-input'
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            required
                        />
                        {/* </div> */}

                        {/* <div> */}
                        <label htmlFor="" style={{ color: '#ddd' }}>Phone Number <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="number"
                            className='checkout-input'
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                        />
                        {/* </div> */}

                        {/* <div> */}
                        <label htmlFor="" style={{ color: '#ddd' }}>Email Address <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="email"
                            className='checkout-input'
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        {/* </div> */}
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <input
                                type="checkbox"
                                style={{ accentColor: "#DB4444" }}
                                checked={ischecked}
                                onChange={handleCheckboxChanges}
                            />
                            <label htmlFor="">Save this information for faster check-out next time</label>
                        </div>
                    </form>
                </div>

                <div className='checkout-component-container-two-subdivison-two'>

                    {
                        data?.map((item) => {
                            const product = item.productId;
                            return (
                                <div
                                    key={item._id}
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            width="50px"
                                            height="50px"
                                            style={{ marginRight: '10px' }}
                                        />
                                        {product.name}
                                    </div>
                                    <p>₹{product.price.toLocaleString('en-IN')}</p>
                                </div>
                            );
                        })
                    }

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', paddingBottom: '6px' }}>
                        <p>Subtotal</p>
                        <p>{(totalAmount || 0).toLocaleString('en-IN')}</p>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', paddingBottom: '6px' }}>
                        <p>Shipping</p>
                        <p>{(totalAmount > 20000 ? 'Free' : 500)}</p>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                        <p>Total</p>
                        <p>{(totalAmount < 20000 ? totalAmount + 500 : totalAmount || 0).toLocaleString('en-IN')}</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }} >
                            <input
                                style={{ accentColor: '#DB4444' }}
                                type="radio"
                                checked={PaymentMethod === 'bank'}
                                onChange={handlePaymentByBank}
                            />
                            <label htmlFor="">Bank</label>
                        </div>
                        <div>
                            <img src={bkash} alt="" width={'39px'} height={"18px"} />
                            <img src={visa} alt="" width={'39px'} height={"18px"} />
                            <img src={mastercard} alt="" width={'39px'} height={"18px"} />
                            <img src={hindi} alt="" width={'39px'} height={"18px"} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '5px' }}>
                        <input
                            style={{ accentColor: '#DB4444' }}
                            type="radio"
                            checked={PaymentMethod === 'cash'}
                            onChange={handlePaymentByCash}
                        />
                        <label htmlFor="">cash on delievery</label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <input type="text" className='coupon-text' placeholder='Coupon Code' />
                        <button className='coupon-button'>Apply Coupon</button>
                    </div>

                    <div>
                        <button className='order-button' style={{
                            cursor: isPlaceOrderDisabled() ? 'not-allowed' : 'pointer',
                            opacity: isPlaceOrderDisabled() ? 0.5 : 1
                        }} disabled={isPlaceOrderDisabled()} onClick={handlePlaceTheOrder}>Place order</button>
                    </div>
                </div>
                <div className="checkout-component-container-two-subdivison-three">
                    <div className="address-heading">
                        {addressData?.length > 0 ? 'Saved Address' : 'No Address Saved Yet'}
                    </div>
                    <div className='address-details'>
                        {
                            addressData?.length > 0
                                ?
                                <>
                                    {addressData.slice(0, 4).map((ele) => {
                                        const isSelected = addressChecked && addressChecked._id === ele._id;
                                        return (
                                            <div className='address-details-container'>
                                                <div>
                                                    <h4>Name: {ele.firstName}</h4>
                                                    <p>Email: {ele.email}</p>
                                                    <p>Phone: {ele.phone}</p>
                                                    <p>Address: {ele.streetAddress}</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                                    <input
                                                        type="radio"
                                                        // checked={ }
                                                        style={{ accentColor: "#DB4444" }}
                                                        name='addressChecked'
                                                        // value={ele.id}
                                                        checked={isSelected}
                                                        onChange={() => handleAddressSelect(ele)}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                                :
                                <p>Please Add your address</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;