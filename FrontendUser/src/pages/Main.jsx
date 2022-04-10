import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import Catalog from './Catalog';
import Signup from './Signup';
import SignIn from './SignIn';
import Profile from './Profile';
import Category from './Category';
import ForgotPass from './ForgotPass';
import Contact from './Contact';
import About from './About';
import Cart from './Cart';
import Checkout from './Checkout';

const Main = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            {/* di sini menggunakan "id" untuk mengakses id category */}
            <Route path="/category/:id" element={<Catalog/>}/> 
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/category" element={ <Category/>}/>
            <Route path="/forgotPassword" element={ <ForgotPass/>}/>
            <Route path="/contact" element={ <Contact/>}/>
            <Route path="/about" element={ <About/>}/>
            <Route path="/cart" element={ <Cart/>}/>
            <Route path="/checkout" element={ <Checkout/>}/>
        </Routes>
    );
};

export default Main;