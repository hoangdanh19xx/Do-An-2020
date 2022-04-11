import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';



class DanhSachGiaoVien extends Component{
    constructor(props){
        super(props);
        this.state = {
            isGV : [],
            idLoai : ''
        }
        const cookie = new Cookies();
        this.idMoi = cookie.get('id');
    }

    componentDidMount(){
        const {history, match} = this.props;
        let {idd} = match.params;
        this.setState({
            idLoai : idd
        })
        axios({
            method : 'GET',
            url : 'http://localhost:4000/users/isGV',
            data : null,
        }).then(res => {
            console.log(res);
            this.setState({
                isGV : res.data,
            })
        })
    }

    onClick = (idu, ten) => {
        let {match} = this.props;
        let {id, ip} = match.params;
        axios({
            method : 'POST',
            url : 'http://localhost:4000/orders/kt',
            data : {
                idNhan : idu,
                idMoi : this.idMoi,
                idTopic : id,
            }
        }).then(res => {
            if(res.data === 0){
                alert('Không thực hiện được');
            }
            else
            {
                axios({
                    method : 'POST',
                    url : 'http://localhost:4000/orders',
                    data : {
                        idNhan : idu,
                        idMoi : this.idMoi,
                        idTopic : id,
                        ip : ip,
                    }
                }).then(res => {
                    console.log(res.data);
                    alert("Đã gửi lời mời tham gia hướng dẫn đồ án cho giáo viên " + ten);
                })
            }

        })
    }
  render() {
    return (
        <div className="row">
        <div className="col-xs- col-sm- col-md-8 col-lg- xl" > 
            <div className="panel panel-danger ml mt"style={{boxShadow: '0 0 10px rgba(0,0,0,1)'}}>
                <div className="panel-heading">
                        <h3 className="panel-title mc" style={{fontSize: '30px'}}>Danh sách giáo viên</h3>
                </div>
                <div className="panel-body"style={{margin:'15px'}}>
                    
                    <table className="table table-hover" >
                        <thead>
                            <tr>
                                <th>Tên giáo viên</th>
                                <th>Tên đề tài hướng dẫn</th>
                                <th>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.isGV.map((item, index) => {
                                return <tr  key={index}>
                                            <td>{item.ten}</td>
                                            <td>
                                                {this.state.isGV[index].topic.map((item, index) => {
                                                    return <p key={index}>- {item.tenDoAn}</p>
                                                })}
                                            </td>
                                            <td style={{textAlign:'center'}}>
                                                <button type="button"  className="btn btn-warning" onClick={() => this.onClick(this.state.isGV[index].id, this.state.isGV[index].ten)}>Chọn</button>
                                            </td>
                                        </tr>
                            })}
                        </tbody>
                    </table>
                    <Link to={`/QuanLyDoAn/${this.state.idLoai}`} type="button" className="btn btn-success btc" style={{margin:'0 45%'}}>Quay lại</Link>
                </div>
            </div>
        </div>  
    </div>
    );
  }
  
}

export default DanhSachGiaoVien;