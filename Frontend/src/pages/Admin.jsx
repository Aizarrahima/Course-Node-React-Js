import React from 'react';
import $ from 'jquery';
import Navbar from './Navbar';
import axios from 'axios';

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            admin: [],
            isModalOpen: false,
            token: "",
            id_user: 0,
            theimage: false,
            name: "",
            image: "",
            address: "",
            level: "",
            gender: "",
            age: 0,
            phone: "",
            email: "",
            password: "",
            search: ""
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        } else {
            window.location = '/signin'
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getAdmin = () => {
        let url = 'http://localhost:8000/admin/'
        axios.get(url)
            .then(res => {
                this.setState({
                    admin: res.data.data
                })
                console.log(this.state.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleDrop = (id) => {
        let url = "http://localhost:8000/admin/" + id
        if (window.confirm("Are you sure to delete this user ?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getAdmin()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    findAdmin = (event) => {
        let url = "http://localhost:8000/admin/find";
        if (event.keyCode === 13) {
            // menampung data keyword pencarian
            let form = {
                find: this.state.search
            }
            // mengakses api untuk mengambil data pegawai
            // berdasarkan keyword
            axios.post(url, form)
                .then(response => {
                    // mengisikan data dari respon API ke array pegawai
                    this.setState({ admin: response.data.result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    componentDidMount () {
        this.getAdmin()
    }

    

    render() {
        return (
            <div>
                <Navbar/>
            <div className="container my-2 py-5">
            <h1 className="display-6 fw-light text-left">Admin</h1>
                <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search Category..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findAdmin} />

                        </div>
                    </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Admin ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.admin.map((item, index) => {
                             return (
                                <tr key={index}>
                                    <td>{item.id_admin}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.age}</td>
                                    <td>{item.email}</td>

                                    <td>
                                        <button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.handleDrop(item.id_admin)}><i className="fa fa-trash"></i></button>
                                    </td>
                                </tr> 
                             )
                        })}
                     </tbody>
                </table>
                <br></br>


               
            </div>
            </div>
        );
    }
}

export default Admin;