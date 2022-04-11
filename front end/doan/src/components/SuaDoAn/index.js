import React, { Component } from 'react';
import axios from 'axios';
//import moment from 'moment';



class SuaDoAn extends Component{
    constructor(props){
        super(props);
        this.state = {
            tenDoAn : '',
            nenTang : '',
            loai : '',
            chuyenNganh : '',
            moTa : '',
            ngDK : '',
        }
    }

    componentDidMount(){
        let {match} = this.props;
        let {id} = match.params;
        axios({
            method : 'GET',
            url : `http://localhost:4000/topics/${id}/edit`,
            data : null,
        }).then(res => {
            this.setState({
                tenDoAn : res.data.tenDoAn,
                nenTang : res.data.nenTang,
                loai : res.data.loai,
                chuyenNganh : res.data.chuyenNganh,
                moTa : res.data.moTa,
                //ngayNop : moment(res.data.ngayNop, "DD-MM-YYYY").format("YYYY-MM-DD"),
                ngDK : res.data.ngDK,
            })
        })
    }

    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name] : value
        })
    }
    
    onSubmit = (e) => {
        console.log(this.state.ngayNop);
        e.preventDefault();
        let {history} = this.props;
        let {match} = this.props;
        let {id} = match.params;
        axios({
            method : 'PUT',
            url : `http://localhost:4000/topics/${id}/edit`,
            data : {
                tenDoAn : this.state.tenDoAn,
                nenTang : this.state.nenTang,
                loai : this.state.loai,
                chuyenNganh : this.state.chuyenNganh,
                moTa : this.state.moTa,
                ngDK : this.state.ngDK,
            }
        }).then(res => {
            if(res.data === 's'){
                alert('Sửa đồ án thàng công');
                history.goBack();
            }
            else alert('Có lỗi xảy ra, xin thử lại');
        })
    }
  render() {
    return (
        <div>
            <div className="center">    
            <div className="container"> 
                <div className="text">Sửa Đề Tài</div>
                <form onSubmit={this.onSubmit}>
                    <div className="data">
                        <label>Tên đề tài</label>
                        <input type="text" placeholder="Nhập tên đề tài" name="tenDoAn" value={this.state.tenDoAn} required onChange={this.onChange}/>
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
                        <select className="form-control" name="chuyenNganh" onChange={this.onChange} value={this.state.chuyenNganh}>
                            <option value="Phần mềm">Phần mềm</option>
                            <option value="Mạng">Mạng</option>
                        </select>
                    </div>
                    <div className="data">
                        <label>Mô tả</label>
                        <textarea type="text" placeholder="Mô tả" name="moTa" value={this.state.moTa} onChange={this.onChange} />
                    </div>
                    <div className="data">
                        <label>Số lượng</label>
                        <input type="number" min='1' max='3' className="form-control" value={this.state.ngDK} name="ngDK" onChange={this.onChange}/>
                    </div>
                    <div className="btn">
                        <div className="inner" />
                        <button className="submit-button" type="submit" >Sửa</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
  }
  
}

export default SuaDoAn;