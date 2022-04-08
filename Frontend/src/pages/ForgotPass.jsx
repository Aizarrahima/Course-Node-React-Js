import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'

export default class ForgotPass extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",

        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        if (window.confirm("Are you sure to change password?")) {
            axios.put("http://localhost:8000/admin/", data)
                .then(res => {
                    window.location = '/signin'
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        return (
            <div className="dashboard1">
                <div className='ms-5'>
                    <br></br><br></br><br></br><br></br>
                    <div className='card mb-5 mt-1' id="sign-card">
                        <div className="card-body">
                            <img src="/assets/techlog.png" className="mx-auto d-block mt-4 mb-5" alt="" id="logo" />
                            <form onSubmit={(e) => this.handleSave(e)}>
                                <div className="input-group">
                                    <h5 className='form-text' id="sign-text">Email</h5>
                                    <input type="email" name="email" id="typeEmailX" className='form' value={this.state.email} onChange={this.handleChange} placeholder='Your email here' required />
                                </div>
                                <div className="input-group">
                                    <h5 className='form-text' id="sign-text">Password</h5>
                                    <input type="password" name="password" id="typePasswordX" value={this.state.password} onChange={this.handleChange} className='form' placeholder='Your password here' required />
                                </div>
                                <div className='input-group text-center mb-4' id="sign-text">
                                    <button type="submit" className='button-sign btn btn-dark' id="blue">Change Password</button>
                                </div>
                            </form>
                        </div>
                    </div>




                    <br /><br /><br />

                </div>

            </div>
        )
    }
}
