import React from 'react'

import './Productlist.css'

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

import { IoIosPhonePortrait } from "react-icons/io";
import { RiComputerLine } from "react-icons/ri";
import { BsSmartwatch } from "react-icons/bs";
import { CiCamera } from "react-icons/ci";
import { PiHeadphones } from "react-icons/pi";
import { VscGame } from "react-icons/vsc";


const Productslist = () => {
    return (
        <div className='productlist-component'>
            <div className='productlist-component-container-one'>
                <div></div>
                <p style={{ color: '#DB4444' }}>Categories</p>
            </div>
            <div className='productlist-component-container-two'>
                <div>
                    <h3>Browse By Category</h3>
                </div>

                <div className='productlist-component-container-two-arrows'>
                    <FaArrowLeft style={{backgroundColor:'#F5F5F5', width:'20px', height:'20px', padding:'5px', borderRadius:'50%'}} />
                    <FaArrowRight style={{backgroundColor:'#F5F5F5', width:'20px', height:'20px', padding:'5px', borderRadius:'50%'}} />
                </div>
            </div>
            {/* images goes here */}
            <div className='productlist-component-container-three'>

                <div>
                    <IoIosPhonePortrait style={{fontSize:'50px'}}/>
                    <h4>Phones</h4>
                </div>
                
                <div>
                    <RiComputerLine style={{fontSize:'50px'}} />
                    <h4>Computers</h4>
                </div>
                
                <div>
                    <BsSmartwatch style={{fontSize:'50px'}} />
                    <h4>SmartWatch</h4>
                </div>
                
                <div>
                    <CiCamera style={{fontSize:'50px'}}/>
                    <h4>Camera</h4>
                </div>
                
                <div>
                    <PiHeadphones style={{fontSize:'50px'}} />
                    <h4>HeadPhones</h4>
                </div>
                
                <div>
                    <VscGame style={{fontSize:'50px'}}/>
                    <h4>Gaming</h4>
                </div>
            </div>
        </div>
    )
}

export default Productslist