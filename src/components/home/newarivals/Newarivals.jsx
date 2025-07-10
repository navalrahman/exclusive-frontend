import React from 'react'
import './Newarrivals.css'

import one from '../../../images/new_arrival_one.png'
import two from '../../../images/new_arrival_two.jpg'

import three from '../../../images/new_arrival_three.png'

import four from '../../../images/new_arrival_four.png'
import { Link } from 'react-router-dom'


const Newarivals = () => {
    return (
        <div className='newarrivals-component'>
            <div className='newarrivals-component-container-one'>
                <div></div>
                <p style={{ color: '#DB4444' }}>Featured</p>
            </div>
            <div>
                <h3>New Arrivals</h3>
            </div>
            {/* images goes here */}
            <div className='newarrivals-component-container-three'>
                {/* <div className='newarrivals-component-container-three-divison-one'>
                    <img src={one} alt="" width={"511px"} height={"511px"} />
                    <div style={{color:'white', display:'flex', flexDirection:'column', gap:'10px'}}>
                        <h2>Play station 5</h2>
                        <p>Black and White version of the PS5 coming out on sale.</p>
                        <Link>Shop now</Link>
                    </div>
                </div> */}
                <div className='newarrivals-component-container-three-divison-one'>
                    <img src={one} alt="" width="511px" height="511px" />
                    <div className='text-overlay'>
                        <h2>Play Station 5</h2>
                        <p>Black and White version of the PS5 coming out on sale.</p>
                        <Link style={{color:'white'}}>Shop now</Link>
                    </div>
                </div>

                <div className='newarrivals-component-container-three-divison-two'>
                    <div className='three-division-two-one'>
                        <div>
                            <h3>Women's collection</h3>
                            <p>Featured woman collections that give you another vibe.</p>
                            <Link style={{color:'white'}}>shop now</Link>
                        </div>
                        <img src={two} alt="" width={"282px"} height={"286px"} />
                    </div>
                    <div className='three-division-two-two'>
                        <div>
                            <div className='text-inside-image'>
                                <h2>Speakers</h2>
                                <p>Amazon wireless speakers</p>
                                <Link style={{color:'white'}}>shop now</Link>
                            </div>
                            <img src={three} alt="" width={"190px"} height={"221px"} />
                        </div>
                        <div>
                            <div className='text-inside-image'>
                                <h2>Speakers</h2>
                                <p>Amazon wireless speakers</p>
                                <Link style={{color:'white'}}>shop now</Link>
                            </div>
                            <img src={four} alt="" width={"190px"} height={"221px"} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newarivals