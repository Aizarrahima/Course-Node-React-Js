import React, { Component } from 'react'
import axios from 'axios'


export default class Signup extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      email: "",
      password: ""
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
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
                <input type="text" name="name" id="name" className='form' value={this.state.name} onChange={this.handleChange}/>
              </div>
              <div className="input-group">
                <h5 className='form-text' id="sign-text">Email</h5>
                <input type="email" name="email" id="email" className='form' value={this.state.email} onChange={this.handleChange}/>
              </div>
              <div className="input-group">
                <h5 className='form-text' id="sign-text">Password</h5>
                <input type="password" name="password" id="password" className='form' value={this.state.password} onChange={this.handleChange}/>
              </div>
              <div className='input-group text-center' id="sign-text">
                <button type="submit" className='button-sign btn btn-dark' id="light">Sign Up</button>
              </div>
              </form>
            </div>
          </div>




          <br/><br/><br/><br/>

        </div>
      </div>
    )
  }
}
