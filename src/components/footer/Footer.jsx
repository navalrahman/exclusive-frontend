import React from 'react'

// importing css
import './Footer.css'

// importing icons
import { IoSendOutline } from "react-icons/io5";
import { BsQrCode } from "react-icons/bs";

import apple from '../../images/apple.png'
import google from '../../images/google-play.png'


const Footer = () => {
    return (
        <div className='footer-component'>
            <div className='footer-component-container-one'>
                <h3 style={{ fontSize: '24px' }}>Exclusive</h3>
                <p style={{ fontSize: '20px' }}>Subsribe</p>
                <p style={{ fontSize: '16px' }}>Get 10% off your first order</p>
                <div className='footer-component-container-one-subdivision-one'>
                    <input type="text" placeholder='Enter your email' />
                    <IoSendOutline />
                </div>
            </div>

            <div className='footer-component-container-two'>
                <h3 style={{ fontSize: '20px' }}>Support</h3>
                <p style={{ fontSize: '16px' }}>111 Bijoy sarani, Dhaka,<br />  DH 1515, Banglades</p>
                <p style={{ fontSize: '16px' }}>exclusive@gmail.com</p>
                <p style={{ fontSize: '16px' }}>+88015-88888-9999</p>
            </div>

            <div className='footer-component-container-three'>
                <h3 style={{ fontSize: '20px' }}>Account</h3>
                <p style={{ fontSize: '16px' }}>My Account</p>
                <p style={{ fontSize: '16px' }}>Login / Register</p>
                <p style={{ fontSize: '16px' }}>Cart</p>
                <p style={{ fontSize: '16px' }}>Whishlist</p>
                <p style={{ fontSize: '16px' }}>Shop</p>
            </div>

            <div className='footer-component-container-four'>
                <h3 style={{ fontSize: '20px' }}>Quick Link</h3>
                <p style={{ fontSize: '16px' }}>Privacy Policy</p>
                <p style={{ fontSize: '16px' }}>Terms of Use</p>
                <p style={{ fontSize: '16px' }}>Faq</p>
                <p style={{ fontSize: '16px' }}>Contact</p>
            </div>

            <div className='footer-component-container-five'>
                <h3 style={{ fontSize: '20px' }}>Download App</h3>
                <p style={{ fontSize: '12px' }}>Save $3 with App New User Only</p>
                <div className='footer-component-container-five-subdivison-one'>
                    <div className='footer-component-container-five-subdivison-one-qrcode'>
                        <BsQrCode className='qr-code' />

                    </div>
                    <div className='footer-component-container-five-subdivison-one-appstore-playstore'>
                        <div className='playstore'>
                            <img src={google} alt="" />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p style={{ fontSize: '10px' }}>Get it on</p>
                                <p style={{ fontSize: '12px' }}>Google play</p>
                            </div>
                        </div>

                        <div className='playstore'>
                            <img src={apple} alt="" style={{backgroundColor:'white'}} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p style={{ fontSize: '8px' }}>Download on the</p>
                                <p style={{ fontSize: '12px' }}>App store</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer