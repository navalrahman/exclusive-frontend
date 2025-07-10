import React from 'react'

import { CiDeliveryTruck } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { VscWorkspaceTrusted } from "react-icons/vsc";

import './Services.css'

const Services = () => {
    return (
        <div className='sercvice-compoent'>
            <div className='sercvice-compoent-container-one'>
                <div className='sercvice-compoent-container-one-icon'>
                    <CiDeliveryTruck className='service-icon' />
                </div>
                <h3>Free and Fast Delievery</h3>
                <p>Free Delievery for all orders above $140</p>
            </div>
            
            <div className='sercvice-compoent-container-one'>
                <div className='sercvice-compoent-container-one-icon'>
                    <BiSupport className='service-icon' />
                </div>
                <h3>24/7 CUSTOMER SERVICE</h3>
                <p>Friendly 24/7 customer support</p>
            </div>

            <div className='sercvice-compoent-container-one'>
                <div className='sercvice-compoent-container-one-icon'>
                    <VscWorkspaceTrusted className='service-icon' />
                </div>
                <h3>MONEY BACK GUARANTEE</h3>
                <p>We reurn money within 30 days</p>
            </div>
        </div>
    )
}

export default Services