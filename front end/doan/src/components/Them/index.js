import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';



class ThemDoAn extends Component{
    constructor(props){
        super(props);
        this.state = {
            tenDoAn : '',
            nenTang : '',
            loai : 'Đồ án cơ sở',
            chuyenNganh : 'Phần mềm',
            moTa : '',
            ngDK : 0,
            setSV : false,
            SV : [],
            ten : '',
            email : '',
        }
        const cookie = new Cookies();
        this.idAll = cookie.get('id');
        this.sv = [];
    }

    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name] : value
        })
    } 

    onChangeS = (e, index) => {
        const { name, value} = e.target;
        const listSV = this.state.SV;
        listSV[index] = {...listSV[index], [name]: value}
        this.setState({SV: listSV})
        
    }

    onClick = () => {
        this.setState({
            setSV : !this.state.setSV
        })
    }

    onSave = () => {
        this.setState({
            SV : this.sv
        })
        alert('Đã lưu...');
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const {history, match} = this.props;
        let {id} = match.params;
        e.preventDefault();
        axios({
            method : 'POST',
            url : 'http://localhost:4000/topics/Them/DoAn',
            data : {
                tenDoAn : this.state.tenDoAn,
                nenTang : this.state.nenTang,
                loai : this.state.loai,
                chuyenNganh : this.state.chuyenNganh,
                moTa : this.state.moTa,
                ngDK : this.state.ngDK,
                SV : this.state.SV,
            },
            withCredentials: true
        }).then(res => {
            if(res.data){
                alert('Thêm đồ án thàng công');
                history.push('/LuaChon');
            }
            else alert('Có lỗi xảy ra, xin thử lại');
        })
    }


  render() {
    const listSVElm= [];
    for(let i = 0 ;i< this.state.ngDK; i ++) {

        let Elm =  <div>
                    <div className="data">
                    <label>Tên</label>
                    <input type="text" placeholder="Nhập tên" name="ten"  required onChange={(e) => this.onChangeS(e,i)}/>
                    </div>
                    <div className="data">
                        <label>Email</label>
                        <input type="text" placeholder="Nhập Email" name="email" required onChange={(e) => this.onChangeS(e,i)}/>
                    </div>
                </div>;
        listSVElm.push(Elm)
    }
    return (
        <div>
        {this.state.setSV 
                ? 
                <div class="modal-dialog modal-dialog-centered  modal display-block">
                    
                    <div class="modal-content">
                        <div class="modal-header">
                        <h3 class="modal-title">Sinh viên đăng ký</h3>
                        </div>
                        <div class="modal-body">
                        <form onSubmit={this.onSubmit}>
                            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            {
                                listSVElm
                            }
                            </div>                            
                        </form>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-default"onClick={this.onClick}>Close</button>
                        </div>
                    </div>
                    
                </div>
                
                : ''
            }
        <div className="center">    
        <div className="container"> 
            <div className="text">Thêm Đề Tài</div>
            <form onSubmit={this.onSubmit}>
                <div className="data">
                    <label>Tên đề tài</label>
                    <input type="text" placeholder="Nhập tên đề tài" name="tenDoAn" value={this.state.tenDoAn}  required onChange={this.onChange}/>
                </div>
                <div className="data">
                    <label>Nền tảng</label>
                    <input type="text" placeholder="Nhập nền tảng" name="nenTang" value={this.state.nenTang} required onChange={this.onChange}/>
                </div>
                <div className="data">
                    <label>Loại đồ án</label>
                    <select className="form-control" name="loai" onChange={this.onChange} value={this.state.loai}>
                        <option value="Đồ án cơ sở">Đồ án cơ sở</option>
                        <option value="Đồ án chuyên ngành">Đồ án chuyên ngành</option>
                        <option value="Đồ án tốt nghiệp">Đồ án tốt nghiệp</option>
                        <option value="Khóa luận">Khóa luận</option>
                    </select>
                </div>
                <div className="data">
                    <label>Chuyên ngành</label>
                    {
                        this.idAll === 'admin' ?
                        <select className="form-control" name="chuyenNganh" onChange={this.onChange} value={this.state.chuyenNganh}>
                            <option value="Phần mềm">Phần mềm</option>
                            <option value="Mạng">Mạng</option>
                        </select>
                        : this.idAll === 'adminPM' ?
                        <select className="form-control" name="chuyenNganh" value={this.state.chuyenNganh}>
                            <option value="Phần mềm" selected={this.state.chuyenNganh = 'Phần mềm'}>Phần mềm</option>
                        </select>
                        : <select className="form-control" name="chuyenNganh" value={this.state.chuyenNganh}>
                            <option value="Mạng" selected={this.state.chuyenNganh = 'Mạng'} >Mạng</option>
                        </select>
                    }
                    
                </div>
                <div className="data">
                    <label>Mô tả</label>
                    <textarea type="text" placeholder="Mô tả" name="moTa" value={this.state.moTa} onChange={this.onChange}/>
                </div>
                <div className="data">
                    <label>Số lượng</label>
                    <div style={{display: 'flex'}}>
                    <input type="number" min='1' max='3' className="form-control" name="ngDK" value={this.state.ngDK} onChange={this.onChange}/>
                    {
                        this.state.ngDK !== 0 && this.state.ngDK <= 3
                        ? <button style={{height: '35px'}} type="button" onClick={this.onClick} >*</button>
                        : ''
                    }
                    </div>
                </div>
                <div className="btn">
                    <div className="inner" />
                    <button className="submit-button" type="submit" >Thêm</button>
                </div>
            </form>
        </div>
        </div>
    </div>
    );
  }
  
}

export default ThemDoAn;