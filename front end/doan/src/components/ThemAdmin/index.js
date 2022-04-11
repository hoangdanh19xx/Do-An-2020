import React, { useState } from 'react';
import axios from 'axios';

const ThemAdmin = (props) => {
    const [info, setInfo] = useState({email: '', ten: '', isGV: false});
        
    const addUser = (e) => {
        e.preventDefault();
        axios({
            method : 'POST',
            url : 'http://localhost:4000/users/dkAdmin',
            data : {
                email : info.email,
                ten : info.ten,
                isGV : info.isGV
            }
        }).then(res => {
            if(res.data === 'da ton tai')
             alert('Email đã đăng ký, vui lòng nhập email mới');
            else {
                alert('Thêm thành công');
                window.location.reload();
            }
        })
    }

    const onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setInfo({
            ...info,
            [name] : value
        })
    }

    return (
        <div className="row">
            <div className="col-xs- col-sm- col-md-8 col-lg- xl" > 
                <div className="panel panel-danger ml"style={{boxShadow: '0 0 10px rgba(0,0,0,1)'}}>
                    <div className="" style={{display: 'flex', flexDirection: 'column', padding: '10px 0'}}>
                        <input value={info.email} placeholder="Email" name="email" onChange={onChange} />
                        <input className="mt" value={info.ten} placeholder="Tên người dùng" name="ten" onChange={onChange} />
                        <div style={{display: 'flex'}}>
                            <input style={{margin: '15px'}} type="checkbox" value={info.isGV} defaultChecked={info.isGV} name="isGV" onChange={onChange} /><span>Giảng viên</span>
                        </div>
                        <button className="btn btn-info" onClick={addUser}>Thêm</button>
                    </div>
            
                </div>
            </div>  
        </div>
    );
}

export default ThemAdmin;