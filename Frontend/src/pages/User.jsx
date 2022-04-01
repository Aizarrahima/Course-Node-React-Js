import React from 'react';
import $ from 'jquery';
import Navbar from './Navbar';

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            user: [
                { id: "202212 1 001", nama: "Leivy Nesyra", alamat: "Jl Ahmad Basuki 19, Jakarta Pusat", telepon: "082003449111" },
                { id: "202212 1 002", nama: "Chessta Raynend", alamat: "Jl Ir Soekarno 33, Jakarta Selatan", telepon: "085601538025" },
                { id: "202212 1 003", nama: "Zee Jeyna", alamat: " Jl Tri Kartini 07, Bekasi", telepon: "081950999661" },
            ],
            id: "",
            nama: "",
            alamat: "",
            telepon: "",
            action: ""
        }
        this.state.filterUser = this.state.user
    }

    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    SaveUser = (event) => {
        event.preventDefault();
        let temp = this.state.user;

        if (this.state.action === "insert") {
            temp.push({
                id: this.state.id,
                nama: this.state.nama,
                alamat: this.state.alamat,
                telepon: this.state.telepon
            });
        } else if (this.state.action === "update") {
            let index = temp.findIndex(item => item.id === this.state.id);
            temp[index].nama = this.state.nama;
            temp[index].alamat = this.state.alamat;
            temp[index].telepon = this.state.telepon;
        }

        this.setState({ user: temp });
        $("#modal").hide()
    }

    Add = () => {
        $("#modal").show()
        this.setState({
            id: "",
            nama: "",
            alamat: "",
            telepon: "",
            action: "insert"
        });
    }

    Edit = (item) => {
        $("#modal").show()
        this.setState({
            id: item.id,
            nama: item.nama,
            alamat: item.alamat,
            telepon: item.telepon,
            action: "update"
        });
    }

    Drop = (index) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Apakah anda yakin ingin menghapus data petugas ini?")) {
            // menghapus data
            let temp = this.state.user;
            // hapus data
            temp.splice(index, 1);
            this.setState({ user: temp });
        }
    }

    searching = event => {
        if (event.keyCode === 13) {
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempUser = this.state.user
            let result = tempUser.filter(item => {
                return item.id.toLowerCase().includes(keyword) ||
                    item.nama.toLowerCase().includes(keyword) ||
                    item.alamat.toLowerCase().includes(keyword) ||
                    item.telepon.toLowerCase().includes(keyword)
            })
            this.setState({ filterUser: result })
        }
    }

    Close = () => {
        $("#modal").hide()
    }

  


    render() {
        return (
            <div>
                <Navbar/>
            <div className="container mb-4"> <br></br>
                <h4 className="d-flex justify-content-between align-items-center">
                    <span className="display-6 fw-light mt-5">User's Data</span>
                </h4><br></br>
                <div className="tombol mb-5">
                    <div className='pegawai'>
                        <button type="button" className='btn btn-dark' id="blue" onClick={() => this.Add()} data-toggle="modal" data-target="#modal"><i className="fa fa-plus me-2"></i>Add User</button>
                    </div>
                    <div className="input">
                    <input type="text" className="form-control my-2" id="search" placeholder="Search Admin" value={this.state.keyword} onChange={ev => this.setState({ keyword: ev.target.value })} onKeyUp={ev => this.searching(ev)} />                    </div>
                </div>


                <table className="table">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filterUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.alamat}</td>
                                    <td>{item.telepon}</td>
                                    <td>
                                        <button className="btn btn-sm btn-dark m-1" data-toggle="modal" data-target="#modal" onClick={() => this.Edit(item)} id="light"><i className="fa fa-pencil" ></i></button>
                                        <button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.Drop(item.id)}><i className="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <br></br>


                {/* component modal sbg control manipulasi data */}
                <div className="modal modal" id="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title"><b>Customer's Data</b></h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => this.Close()}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.SaveUser}>
                                    ID
                                    <input type="text" name="id" value={this.state.id} onChange={this.bind} className="form-control mb-2" required />
                                    Name
                                    <input type="text" name="nama" value={this.state.nama} onChange={this.bind} className="form-control mb-2" required />
                                    Address
                                    <input type="text" name="alamat" value={this.state.alamat} onChange={this.bind} className="form-control mb-2" required />
                                    Telephone Number
                                    <input type="text" name="telepon" value={this.state.telepon} onChange={this.bind} className="form-control mb-2" required />
                                    <button className="btn btn-dark btn-block" id="blue" type="submit">
                                        Save
                                    </button>
                                </form>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default User;