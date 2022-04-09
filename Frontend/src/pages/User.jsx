import React from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';


class User extends React.Component {
    constructor() {
        super();
        this.state = {
            user: [],
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
            window.location = '/login'
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    getUser = () => {
        let url = 'http://localhost:8000/user/'
        axios.get(url)
            .then(res => {
                this.setState({
                    user: res.data.data
                })
                console.log(this.state.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleDrop = (id) => {
        let url = "http://localhost:8000/user/" + id
        if (window.confirm("Are you sure to delete this user ?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getUser()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    findUser = (event) => {
        let url = "http://localhost:8000/user/find";
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
                    this.setState({ user: response.data.result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            name: item.name,
            image: item.image,
            address: item.address,
            gender: item.gender,
            age: item.age,
            phone: item.phone,
            email: item.email,
            id_user: item.id_user,
            action: "update"
        })
    }

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            name: "",
            image: null,
            address: "",
            gender: "",
            age: "",
            phone: "",
            email: "",
            password: "",
            action: "insert"
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        let form = new FormData()

        form.append("name", this.state.name)
        form.append("image", this.state.image)
        form.append("address", this.state.address)
        form.append("gender", this.state.gender)
        form.append("age", this.state.age)
        form.append("phone", this.state.phone)
        form.append("email", this.state.email)
        form.append("password", this.state.password)

        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8000/user/"
            axios.post(url, form)
                .then(res => {
                    this.getUser()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            url = "http://localhost:8000/user/" + this.state.id_user
            axios.put(url, form)
                .then(res => {
                    this.getUser()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    componentDidMount() {
        this.getUser()
    }



    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className="display-6 fw-light text-left">User</h1>
                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search Category..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findUser} />

                        </div>
                        <div className="col-3 mt-5">
                            <button className="btn btn-dark" id="btn-blue" onClick={() => this.handleAdd()}>Add Data</button>
                        </div>
                    </div>


                    <table className="table">
                        <thead>
                            <tr>
                                <th>User ID</th>
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
                            {this.state.user.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id_user}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.age}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button className="btn btn-sm btn-dark m-1" id="light" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.handleDrop(item.id_user)}><i className="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <br></br>



                </div>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Input name"
                                    value={this.state.name} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" placeholder="Input address"
                                    value={this.state.address} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select type="text" name="gender" onChange={this.handleChange} >
                                    <option value={this.state.gender}>{this.state.gender}</option>
                                    <option value="P">Female</option>
                                    <option value="L">Male</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" name="age" placeholder="Input Age"
                                    value={this.state.age} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phone" placeholder="Input phonenumber" value={this.state.phone}
                                    onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" name="image" placeholder="Input image"
                                    onChange={this.handleFile} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={this.state.email} placeholder="Masukkan gambar"
                                    onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} placeholder="Masukkan password"
                                    onChange={this.handleChange} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" type="submit" id="blue">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default User;