import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from "./Pages/Home"
import Collection from './Pages/Collection'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Placeoreder from './Pages/Placeoreder'
import Orders from './Pages/Orders'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Searchbar from './Components/Searchbar'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Track from './Pages/Track'
import Verify from './Pages/Verify'


const App = () => {
   
  return (
    <div className='px-4 sm:px-[5vw] ms:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar/>
        <Searchbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/collection' element={<Collection/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/product/:productId' element={<Product/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<Login/>}/>
        <Route path='/place-order' element={<Placeoreder/>}/>
  <Route path='/orders' element={<Orders/>}/>
  <Route path='/track' element={<Track/>}/>
  <Route path='/verify' element={<Verify/>}/>
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App
