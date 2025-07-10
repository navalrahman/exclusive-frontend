import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import './Account.css'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails, userDetailsUpdate } from '../../redux/userSlice'
import toast from 'react-hot-toast'
import { addAddress, addresses, deleteAddress, updateAddress } from '../../redux/addressSlice'
import { addToCart } from '../../redux/cartSlice'
import { FaDeleteLeft } from 'react-icons/fa6'
import { MdDelete, MdEdit } from 'react-icons/md'

const Account = () => {

    const [profile, setProfile] = useState(true)
    const [addressState, setAddress] = useState(false)


    const [editAddressData, setEditAddressData] = useState(null);
    const [editmode, setEditMode] = useState(false)

    const location = useLocation();

    const handleProfile = () => {
        setProfile(true)
        setAddress(false)
    }

    const handleAddress = () => {
        setProfile(false)
        setAddress(true)
    }

    const { user, loading, error } = useSelector(state => state.user)
    const { address } = useSelector(state => state.address)
    // console.log('user', address);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addresses())
        dispatch(userDetails())
    }, [dispatch])


    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        address: '',
        password: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [data, setData] = useState({
        firstName: '',
        companyName: '',
        streetAddress: '',
        appartment: '',
        city: '',
        phone: "",
        email: ''
    })

    useEffect(() => {
        if (user?.data) {
            setFormData(prev => ({
                ...prev,
                name: user.data.name || '',
                lastName: user.data.lastName || '',
                email: user.data.email || '',
                address: user.data.address || ''
            }))
        }
    }, [user])


    const validateInput = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[6-9]\d{9}$/; // for Indian mobile numbers

        if (emailRegex.test(value)) {
            return 'email';
        } else if (phoneRegex.test(value)) {
            return 'phone';
        } else {
            return null;
        }
    };

    const validatePassword = (newPassword, confirmPassword) => {
        return newPassword === confirmPassword
    }

    const handleDetailsSubmit = (e) => {
        e.preventDefault()
        const passwordCheck = validatePassword(formData.newPassword, formData.confirmPassword)
        if (!passwordCheck) {
            toast.error('new password and confirm password is incorrect');
            return;
        }
        const type = validateInput(formData.email);
        if (!type) {
            toast.error('Please enter a valid email or phone number');
            return;
        }

        dispatch(userDetailsUpdate(formData))
            .then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    toast.success('Account updated successfully!');
                    //  dispatch(userDetails())
                    // Optional: Reset password fields only
                    setFormData(prev => ({
                        ...prev,
                        password: '',
                        newPassword: '',
                        confirmPassword: ''
                    }));
                }
            });
    }

    const addressData = address?.addressData?.data
    // .address?.data
    console.log(addressData);

    const [modal, setModal] = useState(false)
    const [editId, setEditId] = useState(null)
    const handleAddNewAddress = () => {
        setModal(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('clicked', data);
        dispatch(addAddress(data))
            .then((res) => {
                console.log(res);
                toast.success(res.payload.message)
                dispatch(addresses())
                setData({
                    firstName: '',
                    companyName: '',
                    streetAddress: '',
                    appartment: '',
                    city: '',
                    phone: "",
                    email: ''
                });
                setEditMode(false);
                setEditId(null);
                setEditAddressData(null);
                setModal(false);
                // setModal(false)
            })
    }

    const handleEdit = (e) => {
        e.preventDefault()
        console.log('clickededit', data);
        dispatch(updateAddress({ data, id: editId }))
            .then((res) => {
                console.log(res);
                toast.success(res.payload.message)
                dispatch(addresses())
                setData({
                    firstName: '',
                    companyName: '',
                    streetAddress: '',
                    appartment: '',
                    city: '',
                    phone: "",
                    email: ''
                });
                setModal(false)
            })
    }

    const handleAddressDelte = (id) => {
        console.log(id);
        dispatch(deleteAddress(id))
            .then((res) => {
                console.log(res);
                toast.success(res.payload.message)
                // dispatch()
                dispatch(addresses())

            })

    }


    const handleAddressEdit = (data) => {
        setEditAddressData(data)
        setModal(true)
        setEditMode(true)
        setEditId(data._id)
    }

    useEffect(() => {
        if (editAddressData) {
            setData(prev => ({
                ...prev,
                firstName: editAddressData.firstName || '',
                companyName: editAddressData.companyName || '',
                streetAddress: editAddressData.streetAddress || '',
                appartment: editAddressData.appartment || '',
                city: editAddressData.city || '',
                phone: editAddressData.phone || "",
                email: editAddressData.email || ''
            }));
        }
    }, [editAddressData])

    return (
        <div className='account-component'>
            <div className='account-component-container-one'>
                <p>Home {location.pathname}</p>
                <p>welcome <span style={{ color: '#DB4444' }}>{formData.name}</span></p>
            </div>
            <div className='account-component-container-two'>
                <div className='account-component-container-two-division-one'>
                    {/* <div className='account-component-container-two-division-one-list'> */}
                    <h2>Manage My Account</h2>
                    <div className='account-component-container-two-division-one-list'>
                        <p onClick={handleProfile} style={profile ? { color: '#DB4444', cursor: 'pointer' } : { cursor: 'pointer' }}>My Profile</p>
                        <p onClickCapture={handleAddress} style={addressState ? { color: '#DB4444', cursor: 'pointer' } : { cursor: 'pointer' }} >Address Book</p>
                        <p>My Payment options</p>
                    </div>
                    {/* </div> */}
                    {/* <div> */}
                    <h2>My Orders</h2>
                    <div className='account-component-container-two-division-one-list'>
                        <p>My Returns</p>
                        <p>My Cancelation</p>
                    </div>
                    {/* </div> */}
                    {/* <div> */}
                    <h2>My Wishlist</h2>
                    <div className='account-component-container-two-division-one-list'>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                    {/* </div> */}
                </div>
                <div className='account-component-container-two-division-two'>
                    {profile && (
                        <div className='account-form'>
                            <h3>Edit Your Profile</h3>
                            <form action="" className='account-component-container-two-division-two-form' onSubmit={handleDetailsSubmit}>
                                <div className='divison-two-form-details'>
                                    <div>
                                        <label htmlFor="">First Name</label>
                                        <input
                                            type="text"
                                            className='input-tag-details'
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Last Name</label>
                                        <input
                                            type="text"
                                            className='input-tag-details'
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className='divison-two-form-details'>
                                    <div>
                                        <label htmlFor="">Email / Phone</label>
                                        <input
                                            type="text"
                                            className='input-tag-details'
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Address</label>
                                        <input
                                            type="text"
                                            className='input-tag-details'
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className='password-tag'>
                                    <label htmlFor="">Password changes</label>
                                    <input
                                        type="password"
                                        className='password-tag-details'
                                        placeholder='Current password'
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    <input
                                        type="password"
                                        className='password-tag-details'
                                        placeholder='New password'
                                        value={formData.newPassword}
                                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        className='password-tag-details'
                                        placeholder='Confirm password'
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}

                                    />
                                </div>
                                <div className='buttons-form'>
                                    <button className='button-form-cancel'>Cancel</button>
                                    <button className='button-form-save'>Save Changes</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {addressState && (
                        <div className='address-content'>
                            <div className='address-content-button'>
                                <button onClick={handleAddNewAddress}>Add New Address</button>
                                <div>
                                    {modal && (
                                        <div className="modal-overlay">
                                            <div className="modal-container">
                                                <button className="close-button" onClick={() => setModal(false)}>×</button>
                                                <form action=""
                                                    style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                                                    onSubmit={editmode ? handleEdit : handleSubmit}>
                                                    <label style={{ color: '#000000' }} >First Name <span style={{ color: 'red' }}>*</span></label>
                                                    <input
                                                        type="text"
                                                        className='checkout-input'
                                                        value={data.firstName}
                                                        onChange={(e) => setData({ ...data, firstName: e.target.value })}
                                                        required
                                                    />

                                                    <label htmlFor="" style={{ color: '#000000' }}>Company Name </label>
                                                    <input
                                                        type="text"
                                                        className='checkout-input'
                                                        value={data.companyName}
                                                        onChange={(e) => setData({ ...data, companyName: e.target.value })}
                                                    />

                                                    <label htmlFor="" style={{ color: '#000000' }}>Street Address<span style={{ color: 'red' }} >*</span></label>
                                                    <input
                                                        type="text"
                                                        className='checkout-input'
                                                        value={data.streetAddress}
                                                        onChange={(e) => setData({ ...data, streetAddress: e.target.value })}
                                                        required
                                                    />

                                                    <label htmlFor="" style={{ color: '#000000' }}>Apartment, floor, etc (optional) </label>
                                                    <input
                                                        type="text"
                                                        className='checkout-input'
                                                        value={data.appartment}
                                                        onChange={(e) => setData({ ...data, appartment: e.target.value })}
                                                    />

                                                    <label htmlFor="" style={{ color: '#000000' }}>Town / City <span style={{ color: 'red' }}>*</span></label>
                                                    <input
                                                        type="text"
                                                        className='checkout-input'
                                                        value={data.city}
                                                        onChange={(e) => setData({ ...data, city: e.target.value })}
                                                        required
                                                    />

                                                    <label htmlFor="" style={{ color: '#000000' }}>Phone Number <span style={{ color: 'red' }}>*</span></label>
                                                    <input
                                                        type="number"
                                                        className='checkout-input'
                                                        value={data.phone}
                                                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                                                        required
                                                    />

                                                    <label htmlFor="" style={{ color: '#000000' }}>Email Address <span style={{ color: 'red' }}>*</span></label>
                                                    <input
                                                        type="email"
                                                        className='checkout-input'
                                                        value={data.email}
                                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                                        required
                                                    />

                                                    <input
                                                        type="submit"
                                                        style={{ backgroundColor: '#DB4444', color: '#ffffff', borderRadius: '6px', cursor: 'pointer' }}
                                                        className='checkout-input'
                                                        value={editmode ? "Update Address" : "Add Address"}
                                                    />
                                                </form>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>

                            <div className='address-content-details-card'>
                                {
                                    addressData && addressData.length > 0 ?
                                        <div className='address-content-details-card-one' >
                                            {
                                                addressData.map((ele) => {
                                                    return (
                                                        <div className='address-content-details-card-one-div'>
                                                            <p><strong>Name: </strong> {ele.firstName}</p>
                                                            <p><strong>Street: </strong> {ele.streetAddress}</p>
                                                            <p><strong>Apartment: </strong> {ele.appartment}</p>
                                                            <p><strong>City: </strong> {ele.city}</p>
                                                            <p><strong>Phone: </strong> {ele.phone}</p>
                                                            <p><strong>Email: </strong> {ele.email}</p>
                                                            <p><strong>Company Name: </strong> {ele.companyName}</p>
                                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '40px', padding: '10px', position: 'static' }}>
                                                                <MdDelete style={{ cursor: 'pointer' }} onClick={() => handleAddressDelte(ele._id)} />
                                                                <MdEdit style={{ cursor: 'pointer' }} onClick={() => handleAddressEdit(ele)} />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        :
                                        <div>
                                            No address found, please add your address
                                        </div>
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Account