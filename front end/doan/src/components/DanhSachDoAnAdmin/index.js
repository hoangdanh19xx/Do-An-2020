import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';


class DanhSachDoAnAdmin extends Component{
  constructor(props){
    super(props);
    const cookie = new Cookies();
    const idAll = cookie.get('id');
      if (idAll !== 'admin' && idAll !== 'adminPM' && idAll !== 'adminM') {
        this.id = true;
      } else this.id = false;
    this.id1 = cookie.get('id');
    this.state = {
    }
  }

  onDelete = (id, ngTao) => {
    if(confirm('Bạn có chắc chắn muốn xóa đề tài không ?')){ //eslint-disable-line
      this.props.onDelete(id, ngTao);
    }
  }

  onClick2 = (id) => {
    this.props.onClickI(id);
  }

  onChange = ({target}) => {
    this.setState({
      [target.name] : target.value
  })
  }

  onDeleteGV = (idGV, id, ngTao) => {
    console.log(this.id1, idGV);
    const {ds} = this.props;
    if(ngTao === null){
      if(this.id1 == idGV || !this.id){
        if(confirm('Bạn có chắc chắn muốn xóa không ?')){ //eslint-disable-line
          axios({
            method : 'DELETE',
            url : `http://localhost:4000/users/${idGV}`,
            data : {
              idTopic : id,
            }
          }).then(res => {
            if(res.status === 200){
              let index = this.findId(ds.user, idGV);
              console.log(index);
              if(index !== -1){
                ds.user.splice(index, 1);
                this.setState({
                  ds : this.ds
                })
              }
            }
          })
          window.location.reload(false);
        }
      }
      else alert('Bạn không thể xóa');
    }
    else {
      if(ngTao !== idGV || !this.id){
        if(confirm('Bạn có chắc chắn muốn xóa không ?')){ //eslint-disable-line
          axios({
            method : 'DELETE',
            url : `http://localhost:4000/users/${idGV}`,
            data : {
              idTopic : id,
            }
          }).then(res => {
            if(res.status === 200){
              let index = this.findId(ds.user, idGV);
              console.log(index);
              if(index !== -1){
                ds.user.splice(index, 1);
                this.setState({
                  ds : this.ds
                })
              }
            }
          })
          window.location.reload(false);
        }
      }
      else alert('Bạn không thể xóa');
    }
  }

  findId = (danhsach, id) => {
    let resuft = -1;
    danhsach.forEach((ds, index) => {
      if(ds.id === id){
        resuft = index;
      }
    });
    return resuft;
  }


  render() {
    var {ds, index, idLoai} = this.props;
    return (
      <tr>
            <td onClick={() => this.onClick2(ds.id)} style={{textAlign: 'center'}}>{index + 1}</td>
            <td onClick={() => this.onClick2(ds.id)} style={{textAlign: 'center'}}>{ds.tenDoAn}</td>
            <td onClick={() => this.onClick2(ds.id)} style={{textAlign: 'center'}}>{ds.nenTang}</td>
            <td onClick={() => this.onClick2(ds.id)} style={{textAlign: 'center'}}>{ds.loai}</td>
            <td onClick={() => this.onClick2(ds.id)} style={{textAlign: 'center'}}>{ds.moTa}</td>
            <td onClick={() => this.onClick2(ds.id)} style={{textAlign: 'center'}}>{ds.ngDK}</td>
            {
              this.id ? '' :
              <td onClick={() => this.onClick2(ds.id)} style={{textAlign: 'center'}}>
                {ds.ngayNop}
              </td>
            }
            {
              this.id ? '' :
              <td onClick={() => this.onClick2(ds.id)} style={{textAlign: 'center'}}>
                {ds.phong}
              </td>
            }
            <td onClick={() => this.onClick2(ds.id)}>{ds.user.map((item, index) => {
                    if(item.isGV === true){
                    return  <p className="ml-10 mt-5" key={item.id}>{item.ten}, Email: {item.email}</p>
                    }
                })}
            </td>
            <td style={{textAlign:'center', width: '150px'}}>
            <Link  to={`/${idLoai}/${ds.id}/edit`}type="button" className="btn btn-success" >Sửa</Link>
            <button style={{width:'52px',height: '40px'}} type="button" className="btn btn-danger ml-10" onClick={() => this.onDelete(ds.id, ds.ngTao)}>Xóa</button>
            </td>
      </tr>
    );
  }
  
}

export default DanhSachDoAnAdmin;
