import React from 'react'
import { Link } from 'react-router-dom'

// importing css
import './Subheader.css'

const Subheader = () => {
    return (
        <div className='subheader-component'>
            <div className='subheader-container-one'>
                <p>
                    Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                </p>
                <Link style={{color:'white'}}>
                    ShopNow
                </Link>
            </div>
            <div className='subheader-container-two'>
                <select name="" id="">
                    <option value="">English</option>
                </select>
            </div>
        </div>
    )
}

export default Subheader