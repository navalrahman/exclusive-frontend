import React from 'react'

import './Category.css'

import { FaAngleRight } from "react-icons/fa6";
import { FaApple } from "react-icons/fa6";


import iphone from '../../../images/iphone.jpg'
import { Link } from 'react-router-dom';

const handleWomesFashion = () => {
    console.log("entered");
    
}

const Category = () => {
    return (
        <div className='category-component'>
            <div className='category-component-container-one'>
                <div onMouseEnter={handleWomesFashion} style={{cursor:'pointer', display:'flex', justifyContent:'space-between'}}><h3>Women's Fashinon</h3> <FaAngleRight/></div>
                <div style={{display:'flex', justifyContent:'space-between'}}> <h3>Men's Fashion</h3> <FaAngleRight/></div>
                <h3>Electronics</h3>
                <h3>Home & Lifestyle</h3>
                <h3>Meidicne</h3>
                <h3>Sports & Outdoor</h3>
                <h3>Baby's & Toys</h3>
                <h3>Groceries & Pets</h3>
                <h3>Health & Beauty</h3>
            </div>
            <div className='line-between'>

            </div>
            <div className='category-component-container-two'>
                <div className='category-component-container-two-image'>
                    <div className='category-component-container-two-image-text'>
                        <span style={{display:'flex', alignItems:'center', gap:'8px'}}><FaApple style={{color:'white', fontSize:'40px'}}/> <p>Iphone 14 series</p></span>
                        <h1>Up to 10%</h1>
                        <h1>off VOucher</h1>
                        <Link style={{color:'white'}}>Shop now</Link>
                    </div>
                    <div>
                        <img src={iphone} alt="" width={"496px"} height={"352px"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category