import React, { useEffect } from 'react'
import Services from '../services/Services'
import Newarivals from './newarivals/Newarivals'

import './Home.css'
import Category from './category/Category'
import Productslist from './productslist/Productslist'
import Imagecategory from './imagecategory/Imagecategory'
import { useDispatch, useSelector } from 'react-redux'
import { productsList } from '../../redux/productSlice'
import Products from './products/Products'
import Thismonth from './thismonth/Thismonth'
import Flashsale from './flashsale/Flashsale'


const Home = () => {

  // const dispatch = useDispatch()

  // useEffect(() => {
  //    dispatch(productsList());
  // },[dispatch, ])

  //  const {product, loading, error} = useSelector(state => state.product)

  //  console.log("product", product);
   

  return (
    <div className='home-component'>
      <div>
        <Category />
      </div>

      <div>
        <Flashsale/>
      </div>

      <div>
        <Productslist/>
      </div>

      <div>
        <Thismonth/>
      </div>

      <div>
        <Imagecategory/>
      </div>

      <div>
        <Products />
      </div>

      <div>
        <Newarivals/>
      </div>
      <div>
        <Services/>
      </div>
    </div>
  )
}

export default Home