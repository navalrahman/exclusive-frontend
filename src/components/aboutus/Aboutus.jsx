import React from 'react'
import { useLocation } from 'react-router-dom'

import './Aboutus.css'

import about from '../../images/about.jpg'

import { CiShop } from "react-icons/ci";
import { CiDollar } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TbMoneybag } from "react-icons/tb";
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { RiLinkedinLine } from "react-icons/ri";


import image_one from '../../images/image_one.png'
import image_two from '../../images/image_two.png'
import image_three from '../../images/image_three.png'
import Services from '../services/Services';



const Aboutus = () => {

  const location = useLocation()

  // console.log(location.pathname);

  return (
    <div className='about-component'>
      <div className='about-component-container-one'>
        <p>home {location.pathname}</p>
      </div>
      <div className='about-component-container-two'>
        <div className='about-component-container-two-subdivision-one'>
          <div>
            <h1>Our Story</h1>
            <p>
              Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.
            </p>

            <p>
              Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
            </p>
          </div>
        </div>
        <div className='about-component-container-two-subdivision-two'>
          <img src={about} alt="" />
        </div>
      </div>
      <div className='about-component-container-three'>
        <div className='about-component-container-three-division-one'>
          <div>
            <CiShop className='about-component-container-three-division-one-icon' />
          </div>
          <h3>10.5k</h3>
          <p>Sallers active our site</p>
        </div>

        <div className='about-component-container-three-division-one'>
          <div>
            <CiDollar className='about-component-container-three-division-one-icon' />
          </div>
          <h3>33k</h3>
          <p>Mopnthly Produduct Sale</p>
        </div>

        <div className='about-component-container-three-division-one'>
          <div>
            <HiOutlineShoppingBag className='about-component-container-three-division-one-icon' />
          </div>
          <h3>45.5k</h3>
          <p>Customer active in our site</p>
        </div>

        <div className='about-component-container-three-division-one'>
          <div>
            <TbMoneybag className='about-component-container-three-division-one-icon' />
          </div>
          <h3>25k</h3>
          <p>Anual gross sale in our site</p>
        </div>
      </div>


      <div className='about-component-container-four'>
        <div className='about-component-container-four-subdivison-one'>
          <img src={image_one} alt="" width={"236px"} height={"391px"} />
          <div style={{backgroundColor:'white', padding:'20px'}}>
            <h2>Tom Cruise</h2>
            <p>Founder & Chairman</p>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <CiTwitter />
              <CiInstagram />
              <RiLinkedinLine />
            </div>
          </div>
        </div>

        <div className='about-component-container-four-subdivison-one'>
          <img src={image_two} alt="" width={"336px"} height={"391px"} />
          <div style={{backgroundColor:'white', padding:'20px'}}>
            <h2>Emma Watson</h2>
            <p>Manging Director</p>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <CiTwitter />
              <CiInstagram />
              <RiLinkedinLine />
            </div>
          </div>
        </div>

        <div className='about-component-container-four-subdivison-one'>
          <img src={image_three} alt="" width={"236px"} height={"391px"} />
          <div style={{backgroundColor:'white', padding:'20px'}}>
            <h2>Will Smith</h2>
            <p>Product Designer</p>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <CiTwitter />
              <CiInstagram />
              <RiLinkedinLine />
            </div>
          </div>
        </div>
      </div>


      <div className='about-component-container-five'>
        <Services />
      </div>
    </div>
  )
}

export default Aboutus