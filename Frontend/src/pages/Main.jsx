import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import Catalog from './Catalog';
import User from './User';
import Signup from './Signup';
import SignIn from './SignIn';
import Profile from './Profile';
import Category from './Category';
import Admin from './Admin';
import Mentor from './Mentor';

const Main = () => {
    
    
   
    return (
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            {/* di sini menggunakan "id" untuk mengakses id category */}
            <Route exact path="/category/:id" element={<Catalog/>}/> 
            <Route exact path="/user" element={<User/>}/>
            <Route exact path="/admin" element={<Admin/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/signin" element={<SignIn/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path="/category" element={ <Category/>}/>
            <Route exact path="/mentor" element={ <Mentor/>}/>
        </Routes>
    );
};

export default Main;