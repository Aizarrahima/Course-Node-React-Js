import React, { Component } from 'react'
import Card from './component/Card'
import $, { get } from 'jquery'
import Navbar from './Navbar'
import PropTypes from 'prop-types';

 class Catalog extends Component {

    
    constructor() {
        
        super()
        this.state = {
            catalog: [],
            isModalOpen: false,
            token: "",
            adminName: "",
            id_class : 0,
            name: "",
            image: "",
            description: "",
            price: 0,
        }
        
       
    }

    render() {
        return (
            <div>
                <Navbar/>
                
            <div className="container mb-5">
                <h4 className="display-6 fw-light mt-5">
                    Hello, 
                </h4>
                <h5 className="display-6 fw-lighter fs-5 mb-5">Explore and get your new book collection with the best price</h5>
                <div className="tombol">
                    <div className='tambah'>
                        <button type="button" className='btn btn-dark' id="blue" onClick="" data-toggle="modal" data-target="#modal"><i className="fa fa-plus me-2"></i>Add Book</button>
                    </div>
                    <div className="input">
                        <input type="text" className="form-control my-2 rounded mb-3" id="search" placeholder="Explore your favourite books here"
                            value=""
                            onChange=""
                            onKeyUp=""
                        />
                    </div>

                </div>

                </div>
            </div>

        )
    }
}

export default Catalog