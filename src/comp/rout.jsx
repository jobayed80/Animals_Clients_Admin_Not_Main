import React from 'react'

import { Routes, Route} from 'react-router';
import Home from './home';
import Shop from './shop';
import Cart from './cart';
import Contact from './contact';
import About from './about';
import Extra from './extra';
import Admin from '../admin/default';
import ProductDetails from './productDetails';

import Signup from '../auth/signup';

const Rout = ({shop, Filter, allcatefilter, addtocart, cart, setCart}) => {
  return (
    <>
    <Routes>
       
        <Route path='/' element={<Home  addtocart={addtocart} />}/>
        <Route path='/cart' element={<Cart cart={cart} setCart ={setCart}/>} />
        <Route path='shop' element={<Shop shop={shop} Filter={Filter} allcatefilter={allcatefilter} addtocart={addtocart}/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/extra' element={<Extra />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/proddduct_details' element={<ProductDetails  addtocart={addtocart}  />} />
    </Routes>
    </>
  )
}
 
export default Rout