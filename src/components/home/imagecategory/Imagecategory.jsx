import React from 'react'
import './Imagecategory.css'

import jbl from '../../../images/jbl.png'

const Imagecategory = () => {
    return (
        <div className='imagecategory-component'>
            <div className='imagecategory-component-container-one'>
                <p style={{color:'#00FF66'}}>Categories</p>
                <h1 style={{fontSize:'50px'}}>Enhance Your</h1>
                <h1 style={{fontSize:'50px'}}>Music Experience</h1>
                <div className='imagecategory-component-container-one-divison-one'>
                    <div>
                        <p style={{fontSize:'25px'}}>23</p>
                        <p style={{fontSize:'12px'}} >Hours</p>
                    </div>

                    <div>
                        <p style={{fontSize:'25px'}}>05</p>
                        <p style={{fontSize:'12px'}} >Days</p>
                    </div>

                    <div>
                        <p style={{fontSize:'25px'}}>59</p>
                        <p style={{fontSize:'12px'}} >Minutes</p>
                    </div>

                    <div>
                        <p style={{fontSize:'25px'}}>35</p>
                        <p style={{fontSize:'12px'}} >Seconds</p>
                    </div>
                </div>
                <div className='imagecategory-component-container-one-divison-two'>
                    <button>Buy Now</button>
                </div>
            </div>
            <div>
                <img src={jbl} alt="" width={"600px"} height={"530px"} />
            </div>
        </div>
    )
}

export default Imagecategory