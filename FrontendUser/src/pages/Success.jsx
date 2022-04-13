import React, { Component } from 'react'
import Navbar from '../component/Navbar'
import { NavLink } from 'react-router-dom'

export default class Success extends Component {
    constructor (){
        super()
        this.state = {
          token: "",
          userName: ""
        }
        
        if(localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
            this.state.userName = localStorage.getItem('name')
          }else{
            window.location = '/signin'
          }
    }
    render() {
        return (
            <div>
                <Navbar/>
                <div className='mt-5 text-center py-4 my-5'>
                    <img src="https://cdn.dribbble.com/users/614270/screenshots/14575431/media/4907a0869e9ed2ac4e2d1c2beaf9f012.gif" alt="Illus" height="440px" width="540px" className='mx-auto d-block' /><br />
                    <h2 className='fs-4 fw-bold'>Payment success</h2>
                    <NavLink className="btn btn-dark" id="blue" to="/myclass">
                        Go to your class
                    </NavLink>
                </div>
            </div>
        )
    }
}
