import React, { act, useEffect, useState } from 'react'

// importing router
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'

// importing css
import './Header.css'

// importing icons
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { RiShoppingBag3Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { wishlistitem } from '../../redux/wishlistSlice';
import toast from 'react-hot-toast';
import { cartItems } from '../../redux/cartSlice';
import { productsList } from '../../redux/productSlice';


const Header = () => {


    const { wishlist, loading, error } = useSelector(state => state.wishlist)
    const { cart } = useSelector(state => state.cart)
    const { product } = useSelector(state => state.product)

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    const [showDropdown, setShowDropdown] = useState(false)

    // console.log("cartLength", cart);
    console.log("wishlist", wishlist);


    let cartLength = cart?.products?.length
    if (cartLength == null) {
        cartLength = 0
    }

    console.log(cartLength);
    

    useEffect(() => {
        // if (token) {
            dispatch(wishlistitem());
            dispatch(cartItems());
            dispatch(productsList())
        // }
    }, []);

    const handleClick = () => {
        setShowDropdown(prev => !prev)
        // setTimeout(() => {
        //     setShowDropdown(false)
        // }, 4000)
        if (!token) {
            navigate('/login')
        }
    }

    const handleAccount = () => {
        navigate('/account')
    }

    const handleCartClick = () => {
        const token = localStorage.getItem('token')

        if (token) {
            // dispatch(wishlistitem());
            // navigate('/wishlist')
            navigate('/cart')
        } else {
            toast.error('you have to login')
            // navigate('/login')
        }

    }

    const handleWishlistClick = () => {
        const token = localStorage.getItem('token')

        if (token) {
            // dispatch(wishlistitem());
            navigate('/wishlist')
        } else {
            toast.error('you have to login')
            // navigate('/login')
        }
    }

    // console.log("cart", cart);


    const handleLogout = () => {
        navigate('/')
        window.location.reload()
        localStorage.clear()
    }

    const handleOrders = () => {
        navigate('/orders')
    }

    const [search, setSearch] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([]);

    
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        console.log(value);

        setSearch(value);

        if (!product?.products || !Array.isArray(product.products)) {
            setFilteredProducts([]);
            return;
        }

        if (value.trim() === '') {
            setFilteredProducts([]);
            return;
        }

        const filtered = product.products.filter((ele) => {
            return (
                ele.name.toLowerCase().includes(value) ||
                ele.category.toLowerCase().includes(value)
            );
        });

        setFilteredProducts(filtered);
    };

    const handleSearchClick = (id) => {
        setSearch('');
        setFilteredProducts([]);
        // dispatch(productsList())
        navigate(`/productdetails/${id}`)
    }

    return (
        <div className='header-component'>
            <div className='header-container-one'>
                <h2>EXCLUSIVE</h2>
            </div>
            <div className='header-container-two'>
                {/* <p>Home</p> */}
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    Contact
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    About
                </NavLink>

                {
                    token ? '' : <NavLink
                        to="/signup"
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                        Signup
                    </NavLink>
                }

            </div>
            <div className='header-container-three'>
                <div className='header-container-three-subdivison-one'>
                    <input type="text" placeholder='What are you looking for?' value={search} onChange={handleSearch} />
                    <IoIosSearch />

                    {search && filteredProducts.length > 0 && (
                        <ul className="search-suggestion-list">
                            {filteredProducts.map((item) => (
                                <li
                                    key={item._id}
                                    className="search-suggestion-item"
                                    onClick={() => handleSearchClick(item._id)}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {wishlist?.products
                    ?
                    <span style={{ display: 'flex' }}>
                        <CiHeart
                            onClick={handleWishlistClick}
                            style={{ cursor: 'pointer' }}
                        />
                        <p onClick={handleWishlistClick} style={{ cursor: 'pointer', marginLeft: '-10px', marginTop: '-5px', display: 'flex', justifyContent: 'center', color: 'white', fontSize: '10px', backgroundColor: '#DB4444', width: '15px', height: '15px', alignItems: 'center', borderRadius: '50%' }}>{wishlist.products.length}</p>
                    </span> :
                    <CiHeart
                        onClick={handleWishlistClick}
                        style={{ cursor: 'pointer' }}
                    />
                }

                {
                    cart?.products
                        ?
                        <span style={{ display: 'flex' }}>
                            <IoCartOutline
                                onClick={handleCartClick} style={{ cursor: 'pointer' }}
                            />
                            <p onClick={handleCartClick} style={{ cursor: 'pointer', marginLeft: '-10px', marginTop: '-5px', display: 'flex', justifyContent: 'center', color: 'white', fontSize: '10px', backgroundColor: '#DB4444', width: '15px', height: '15px', alignItems: 'center', borderRadius: '50%' }}>{cartLength}</p>
                        </span> :
                        <IoCartOutline
                            onClick={handleCartClick}
                            style={{ cursor: 'pointer' }}
                        />
                }




                <div className="user-icon-wrapper" style={{ position: 'relative' }}>
                    <FiUser 
                        onClick={handleClick}
                        on
                        style={{ cursor: 'pointer', backgroundColor: token ? "#DB4444" :'', padding:'6px', borderRadius:'50px', color: token ? 'white': '#000000' }}
                    />
                    {token && showDropdown && (
                        <div className="user-dropdown"  onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)} >
                            <ul>
                                <li onClick={handleAccount}> <FiUser /> Manage My Account</li>
                                <li onClick={handleOrders}> <RiShoppingBag3Line /> My Orders</li>
                                <li> <MdOutlineCancel /> My Cancelations</li>
                                <li> <CiStar /> My Reviews</li>
                                <li onClick={handleLogout}> <TbLogout2 />    Logout</li>
                            </ul>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Header