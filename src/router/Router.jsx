
// ------------------------------

import React from 'react'
import Header from '../components/header/Header'
import Subheader from '../components/subhead/Subheader'
import Footer from '../components/footer/Footer'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../components/home/Home'
import Signup from '../components/signup/Signup'
import Aboutus from '../components/aboutus/Aboutus'
import Login from '../components/login/Login'
import Contact from '../components/contact/Contact'
import Account from '../components/account/Account'
import Cart from '../components/cart/Cart'
import Checkout from '../components/checkout/Checkout'
import Productitem from '../components/home/productItem/Productitem'
import Wishlist from '../components/wishlist/Wishlist'
// import ProtectedRoute from '../components/ProtectedRoute' // ✅ Import it
import ProtectedRoute from '../router/ProtectedRoute'
import Orders from '../components/orders/Orders'
import PaymentComponent from '../components/checkout/payment/PaymentComponent'
import Notfound from '../Notfound'

const Router = () => {
  const token = localStorage.getItem('token')

  return (
    <div>
      <Subheader />
      <Header /> 

      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={token ? <Navigate to='/' /> : <Signup />} />
        <Route path='/login' element={token ? <Navigate to='/' /> : <Login />} />
        <Route path='/about' element={<Aboutus />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/productdetails/:id' element={<Productitem />} />

        {/* Protected routes */}
        <Route path='/account' element={
          <ProtectedRoute><Account /></ProtectedRoute>
        } />
        <Route path='/cart' element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />
        <Route path='/checkout' element={
          <ProtectedRoute><Checkout /></ProtectedRoute>
        } />
        <Route path='/wishlist' element={
          <ProtectedRoute><Wishlist /></ProtectedRoute>
        } />
        {/* <Route path='/productdetails/:id' element={
          <ProtectedRoute><Productitem /></ProtectedRoute>
        } /> */}
        <Route path='/orders' element={
          <ProtectedRoute><Orders /></ProtectedRoute>
        } />

        
        <Route path='/payment' element={
          <ProtectedRoute><PaymentComponent /></ProtectedRoute>
        } />
        <Route path="*" element={<Notfound/>} />
      </Routes>

      <Footer />
    </div>
  )
}

export default Router
