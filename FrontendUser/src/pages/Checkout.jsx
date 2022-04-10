import React, { Component } from 'react'
import Navbar from '../component/Navbar'

export default class Checkout extends Component {

    constructor() {
        super()
        this.state = {
            cart: [], // untuk menyimpan list cart
            user: "", // untuk menyimpan data nama user
            total: 0, // untuk menyimpan data total belanja
            isCart: false
        }

    }

    initCart = () => {
        // memanggil data cart pada localStorage
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        // memanggil data user pada localStorage
        let userName = localStorage.getItem("name")
        // kalkulasi total harga
        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += (item.price)
        })
        // memasukkan data cart, user, dan total harga pada state
        this.setState({
            cart: tempCart,
            user: userName,
            total: totalHarga
        })
    }

    componentDidMount() {
        this.initCart()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-5 py-5" >
                    <div className="row g-5">
                        <div className="col-md-12 col-lg-12 order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span id="t-dark">{this.state.user}'s cart</span>
                                <span className="badge rounded-pill" id="blue">{this.state.cart.length}</span>
                            </h4>
                            <ul className="list-group ">
                                {this.state.cart.map((item, index) =>
                                (
                                    <li className="list-group-item d-flex justify-content-between lh-xl">
                                        <div>
                                            <h6 className="my-0">{item.name_class}</h6>
                                            <span className="text-muted">{item.name} Category</span>
                                        </div>
                                        <span className="text-dark fst-normal">Rp {item.price},00</span>
                                    </li>
                                ))}

                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total (Rp)</span>
                                    <strong>Rp {this.state.total},00</strong>
                                </li>
                            </ul>

                            <div className="card p-2">
                                <button className="btn btn-dark btn-lg w-100" id="blue">Continue to checkout</button>
                                {/* <NavLink to="/success" className="btn btn-dark btn-lg w-100" id="light">Continue to checkout</NavLink> */}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}
