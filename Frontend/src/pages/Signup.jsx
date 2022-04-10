import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'


export default class Signup extends Component {
  constructor() {
    super()
    this.state = {
      name_admin: "",
      email_admin: "",
      password_admin: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegister = (e) =>{
    e.preventDefault()
    let data = {
      name_admin: this.state.name_admin,
      email_admin: this.state.email_admin,
      password_admin: this.state.password_admin
    }
    let url = "http://localhost:8000/admin/"
    axios.post(url, data)
    .then(res => {
        window.alert("Success to register")
        window.location = '/signin'
    })
    .catch(err => {
      console.log(err)
    })
  }
  render() {
    return (
      <div className="dashboard">
        <div className='ms-5'>
          <br></br><br></br><br></br><br></br>
          <div className='card mb-4' id="sign-card">
            <div className="card-body">
              <h3 className='display-7 fw-bolder mb-4 mt-2 text-center' id="title-sign">Sign Up</h3>
              <form onSubmit={(e) => this.handleRegister(e)}>
              <div className="input-group">
                <h5 className='form-text' id="sign-text">Name</h5>
                <input type="text" name="name_admin" id="name" className='form' value={this.state.name_admin} onChange={this.handleChange}/>
              </div>
              <div className="input-group">
                <h5 className='form-text' id="sign-text">Email</h5>
                <input type="email" name="email_admin" id="email" className='form' value={this.state.email_admin} onChange={this.handleChange}/>
              </div>
              <div className="input-group">
                <h5 className='form-text' id="sign-text">Password</h5>
                <input type="password" name="password_admin" id="password" className='form' value={this.state.password_admin} onChange={this.handleChange}/>
              </div>
              <div className='input-group text-center' id="sign-text">
                <button type="submit" className='button-sign btn btn-dark' id="light">Sign Up</button>
              </div>
              </form>
              <p className='text-center' id="confirm">Already have an account? <NavLink to='/signin' id="cr-account">Sign in here!</NavLink></p>

            </div>

          </div>




          <br/><br/><br/><br/>

        </div>
      </div>
    )
  }
}
