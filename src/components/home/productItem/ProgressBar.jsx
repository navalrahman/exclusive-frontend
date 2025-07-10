import React, { useState } from 'react'
import './ProgressBar.css'
import { useDispatch } from 'react-redux';
import { billingitem } from '../../../redux/billingSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const ProgressBar = ({
    addressData,
    productName,
    count,
    data,
    modal,
    setModal
}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [step, setStep] = useState(1); // 1: Address, 2: Payment
    const [addresses, setAddresses] = useState(addressData)
    const [addressId, setAddressId] = useState(null)
    const [formData, setFormData] = useState({
        firstName: '',
        companyName: 'XXX',
        streetAddress: '',
        appartment: 'XXX',
        city: '',
        phone: '',
        email: ''
    })


    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleAddNewAddress = () => {
        setAddresses(null)
    }

    const handleAddressSelect = (e) => {
        // console.log('selected', e.target.value);
        const id = e.target.value
        setAddressId(id)

    }

    const dataSelected = addressData.find((ele) => {
        return ele._id === addressId
    })
    console.log("data", dataSelected);

    const productNameAndCount = [
        {
            "productname": productName,
            "count": count,
            "price": data?.price
        }
    ]

    const [PaymentMethod, setPaymentMethod] = useState('')

    const handlePaymentByBank = () => {
        setPaymentMethod('bank')
    }

    const handlePaymentByCash = () => {
        setPaymentMethod('cash')
    }

    const handlePlaceOrder = () => {
        // console.log('clicked', dataSelected,formData, productNameAndCount);
        if (PaymentMethod === "cash") {
            const addressData = {
                formData: dataSelected || formData,
                productNameAndCount
            }
            // console.log('checkedData', addressData);
            dispatch(billingitem(addressData))
                .then((res) => {
                    console.log(res);
                    if (res.meta.requestStatus === "fulfilled") {
                        toast.success("Your order placed")
                        navigate('/orders')
                    }

                })

        } else if (PaymentMethod === 'bank') {
            const addressData = {
                formData: dataSelected || formData,
                productNameAndCount
            }
            navigate('/payment', {
                state: addressData
            }
            )
        } else {
            toast.error('please add address and choose payment method')
        }
    }


    const isPlaceOrderDisabled = () => {
        const requiredFieldsFilled =
            formData.firstName.trim() !== '' || dataSelected &&
            formData.streetAddress.trim() !== '' || dataSelected &&
            formData.city.trim() !== '' || dataSelected &&
            formData.phone.trim() !== '' || dataSelected &&
            formData.email.trim() !== '' || dataSelected;

        const paymentSelected = PaymentMethod === 'bank' || PaymentMethod === 'cash';

        return !(requiredFieldsFilled && paymentSelected);
    };

    return (

        <div className="modal">
            <div className="modal-content">
                {/* Progress Bar */}
                <div className="progress-bar-container">
                    <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>Address And Product Details</div>
                    <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>Payment</div>
                    <div>
                        <button onClick={() => setModal(!modal)}>x</button>
                    </div>
                </div>


                {/* Modal Body */}
                <div className="modal-body">
                    {step === 1 && (
                        <div className='modal-body-container-one'>
                            <div className='modal-body-container-one-sub-container-one'>
                                {/* <h2>SelectAddress</h2> */}
                                {
                                    addresses && addresses.length > 0 ?
                                        <>
                                            <select name="" id="" onChange={handleAddressSelect}>

                                                <option value="">Select saved Addresses</option>
                                                {
                                                    addressData.map((ele) => {
                                                        return (
                                                            <>
                                                                <option key={ele._id} value={ele._id} >
                                                                    {`${ele.firstName} - ${ele.streetAddress} - ${ele.email} - ${ele.phone}`}
                                                                </option>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <div className='modal-body-container-one-sub-container-one-button'>
                                                <button onClick={handleAddNewAddress}>Add new Address</button>
                                            </div>
                                        </>
                                        :
                                        <div className='add-new-address'>
                                            <label htmlFor="">FirstName</label>
                                            <input
                                                type="text"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            />

                                            <label htmlFor="">StreetAddress</label>
                                            <input
                                                type="text"
                                                value={formData.streetAddress}
                                                onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                                            />


                                            <label htmlFor="">City</label>
                                            <input
                                                type="text"
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            />

                                            <label htmlFor="">Phone</label>
                                            <input
                                                type="number"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />

                                            <label htmlFor="">Email</label>
                                            <input
                                                type="text"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                            {
                                                addressData.length > 0 ?
                                                    <>
                                                        <div className='modal-body-container-one-sub-container-one-button'>
                                                            <button onClick={() => setAddresses(addressData)}>Select from saved one</button>
                                                        </div>

                                                    </>
                                                    :
                                                    ''
                                            }

                                        </div>
                                }
                            </div>

                            <div className='modal-body-container-one-sub-container-two'>
                                <h2>Product Details</h2>
                                <div>
                                    <h3><strong>Product Name:</strong>  {productName}</h3>
                                    <h3><strong>Product Count:</strong> {count}</h3>
                                    <h3><strong>Product Amount:</strong> {data?.price}</h3>
                                    <h3><strong>Total Amount:</strong> {data.price * count}</h3>
                                </div>
                            </div>

                            {/* <h2>Enter Address</h2> */}
                            {/* Your Address Form Here */}
                            <div className='container-one-button-div'>
                                <button onClick={nextStep}>Next</button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <>
                            <h2>Select Payment Option</h2>
                            {/* Your Payment Option Form Here */}
                            <div className='select-payment-option'>
                                <div className='select-payment-radio'>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <input
                                            style={{ accentColor: '#DB4444' }}
                                            type="radio"
                                            checked={PaymentMethod === 'cash'}
                                            onChange={handlePaymentByCash}
                                        />
                                        <label htmlFor="">Cash on Delievery</label>
                                    </div>

                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <input
                                            style={{ accentColor: '#DB4444' }}
                                            type="radio"
                                            checked={PaymentMethod === 'bank'}
                                            onChange={handlePaymentByBank}
                                        />
                                        <label htmlFor="">Online Payment</label>
                                    </div>
                                </div>
                                <div className='payment-buttons'>
                                    <button onClick={prevStep}>Back</button>
                                    <button
                                        onClick={handlePlaceOrder}
                                        style={{
                                            cursor: isPlaceOrderDisabled() ? 'not-allowed' : 'pointer',
                                            opacity: isPlaceOrderDisabled() ? 0.5 : 1
                                        }} disabled={isPlaceOrderDisabled()}
                                    >Place Order</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>


    )
}

export default ProgressBar