import React, { Component } from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios'
import { withRouter } from './../withRouter';


class Payment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transaction: [], // untuk menyimpan list cart
            user: "",
            id_user: 0,
            id_transaksi: 0,
            nomor_transaksi: null
        }

        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            this.state.user = localStorage.getItem('name')
            this.state.id_user = localStorage.getItem('id')
        } else {
            window.location = '/signin'
        }
        this.state.id_transaksi = this.props.params.id_transaksi
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleUpload = (e) => {
        e.preventDefault()
        let data = {
            nomor_transaksi : this.state.nomor_transaksi
        }
        let url = `http://localhost:8000/transaksi/bayar/${this.state.id_transaksi}`
        axios.put(url, data)
            .then(response => {
                window.alert(response.data.message)
                window.location = '/success'
            })
            .catch(error => {
                console.log(error);
            });
    }


   
    render() {
        return (
            <div>
                <Navbar />
                <div className="contain"><br /><br /><br /><br />


                    <div className="card mx-auto d-block" id="card-proof">
                        <div className="card-body">
                            <img src="/assets/techlog.png" className="mx-auto d-block mt-4 mb-4" alt="" id="logo" />

                            <h4 className='fs-2 fw-bold text-center'>Proof Of Transaction</h4>
                            <h5 className='fs-6 fw-light text-center mb-5'>Upload your proof of transaction here</h5>
                            <form onSubmit={(e) => this.handleUpload(e)} className='ms-5 me-5'>
                                <label htmlFor="" className='mb-2'>Transaction Number</label>
                                <input type="text" className='form-control' onChange={this.handleChange} value={this.state.nomor_transaksi} placeholder='Input your transaction number' name="nomor_transaksi" /><br />
                                <input type="submit" className='btn btn-dark w-100' id="blue" value="Pay" />
                            </form>
                        </div>
                    </div>



                </div>
            </div>
        )
    }
}

export default withRouter(Payment)