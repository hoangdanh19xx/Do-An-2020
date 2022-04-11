var express = require('express');
var router = express.Router();
const db = require('../models');

//Hiển thị cho admin
router.get('/:id', async (req, res, next) => {
  let idUser = req.cookies.id;
  let chuyenNganh = req.cookies.cn;console.log('AAA',chuyenNganh);
  let {id} = req.params;
  if (id == 'DACS') {
    id = 'Đồ án cơ sở'
  } else {
    if (id == 'DACN') {
      id = 'Đồ án chuyên ngành'
    } else {
      if (id == 'DATN') {
        id = 'Đồ án tốt nghiệp'
      } else {
        id = 'Khóa luận'
      }
    }
  }  
  try {
    if(idUser === 'admin'){
      const result0 = await db.Topic.findAll({
        where : {loai : id, chuyenNganh : chuyenNganh},
        include : {
          model: db.User,
          as: 'user',
        }
      });
      res.send({data: result0, message: 'admin'});
    }
      if (idUser === 'adminPM') {
        const result0 = await db.Topic.findAll({
          where : {loai : id, chuyenNganh: 'Phần mềm'},
          include : {
            model: db.User,
            as: 'user',
          }
        });
        res.send({data: result0, message: 'adminPM'});
      }
        if (idUser === 'adminM') {
          const result0 = await db.Topic.findAll({
            where : {loai : id, chuyenNganh: 'Mạng'},
            include : {
              model: db.User,
              as: 'user',
            }
          });
          res.send({data: result0, message: 'adminM'});
        } 
        else {
          const result = await db.User.findOne({
            where : {id : idUser, isGV : true},
            include : {
              model: db.Topic,
              where : {loai : id, chuyenNganh : chuyenNganh},
              as: 'topic',
              include : {
                model: db.User,
                as: 'user'
              }
            }
          })
          if(result){
            res.send({data: result, message: result.ten});
          }
        }
  } catch (error) {
    console.log(error)
  }
 });

//Hiển thị ?
router.post('/:id', async (req, res, next) => {
  let idUser = req.cookies.id;
  let chuyenNganh = req.cookies.cn;console.log('AAA',chuyenNganh);
  let {id} = req.params;
  if (id == 'DACS') {
    id = 'Đồ án cơ sở'
  } else {
    if (id == 'DACN') {
      id = 'Đồ án chuyên ngành'
    } else {
      if (id == 'DATN') {
        id = 'Đồ án tốt nghiệp'
      } else {
        id = 'Khóa luận'
      }
    }
  }
  try {
    const result = await db.Topic.findAll({
      where : {loai : id, chuyenNganh : chuyenNganh},
      include : {
        model: db.User,
        as: 'user',
        //where: {isGV : 1},
      }
    });
    const result2 = await db.User.findOne({where : {id : idUser, isGV : true}})
    if(result2){
      res.send({ds: result, isGV : 1});
    }
    else res.send({ds: result, isGV : 0});
  } catch (error) {
    console.log(error)
  }
 });

 //Thông tin id
 router.post('/:id/TTID', async (req, res, next) => {
  let {id} = req.body;
  try {
    const result = await db.Topic.findOne({
      where: {id},
      include : {
        
          model: db.User,
          as: 'user',
          //where: {isGV : 1}
        
      }
    });
    if(result !== null){
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});


//Thêm
router.post('/Them/DoAn', async (req, res, next) => {
  let {tenDoAn, nenTang, loai, chuyenNganh, moTa, ngayNop, ngDK, SV} = req.body;
  let ngTao = req.cookies.id;
  let result;
  try {
    if((ngTao !== 'admin') && (ngTao !== 'adminPM') && (ngTao !== 'adminM')){
      result = await db.Topic.create({tenDoAn, nenTang, loai, chuyenNganh, moTa, ngayNop, ngDK, ngTao});
      const result1 = await db.User_Topic.create({userId: ngTao, topicId: result.id, important: 1});
      res.send(result);
    }
    else {
      result = await db.Topic.create({tenDoAn, nenTang, loai, chuyenNganh, moTa, ngayNop, ngDK});
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }

  if (SV.length !== 0) {
    for (let index = 0; index < SV.length; index++) {
      try {
        const kt = await db.User.findOne({where : {email : SV[index].email}});
          if(kt !== null) {
            const result1 = await db.User_Topic.create({userId: kt.id, topicId: result.id});
          }
          else {
            const newSV = await db.User.create({email : SV[index].email, password : '123', ten : SV[index].ten, isGV: 0, isAdmin: 0});    
            const result2 = await db.User_Topic.create({userId: newSV.id, topicId: result.id});
          }
      } catch (error) {
        console.log(error);
      }
    }
  }
});

//Thêm giảng viên
router.post('/:id/ThemGV/:ip', async (req, res, next) => {
  let {id, ip} = req.params;
  let idUser = req.cookies.id;
  try {
    const result = await db.User_Topic.create({userId: idUser, topicId: id, important: ip});
    res.send(result);
  } catch (error) {
    res.send(error);
  }
 });

//Lấy giá trị để sửa
router.get('/:id/edit', async (req, res, next) => {
  let {id} = req.params;
  console.log(id);
  try {
    const result = await db.Topic.findOne({where : {id}});
    res.send(result);
  } catch (error) {
    console.log(error)
  }
 });

 //Sửa 
 router.put('/:id/edit', async (req, res, next) => {
  let {id} = req.params;
  let {tenDoAn, nenTang, loai, chuyenNganh, moTa, ngayNop, ngDK} = req.body;
  try {
    const result = await db.Topic.update({tenDoAn, nenTang, loai, chuyenNganh, moTa, ngayNop, ngDK},{where: {id}});
    res.send('s');
  } catch (error) {
    console.log(error);
  }
});

//Sửa điểm 
router.put('/diem', async (req, res, next) => {
  let {idUser, idTopic,  lan, diem} = req.body;
  try {
    if(lan == 1){
      const result = await db.User_Topic.update({lan1:diem},{where: {userId: idUser, topicId: idTopic}});
      res.send('s');
    }
    if(lan == 2){
      const result = await db.User_Topic.update({lan2:diem},{where: {userId: idUser, topicId: idTopic}});
      res.send('s');
    }
    if(lan == 3){
      const result = await db.User_Topic.update({lan3:diem},{where: {userId: idUser, topicId: idTopic}});
      res.send('s');
    }

  } catch (error) {
    console.log(error);
  }
});

//Sửa ngày
router.put('/', async (req, res, next) => {
  let {ngayNop, id, phong} = req.body;
  try {
    const result = await db.Topic.update({ngayNop, phong}, {where: {id}});
     res.send('s');
  } catch (error) {
    console.log(error);
  }
});

//Thêm link
router.put('/link', async (req, res, next) => {
  let {id, link} = req.body;
  try {
    const result = await db.Topic.update({link}, {where: {id}});
     res.send('s');
  } catch (error) {
    console.log(error);
  }
});

//Sửa ngày theo loại đồ án
router.put('/ngay', async (req, res, next) => {
  let {ngayNop, loai} = req.body;
  try {
    const result = await db.Topic.update({ngayNop}, {where: {loai}});
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//Sửa phong 
router.put('/p', async (req, res, next) => {
  let {id, phong} = req.body;
  try {
    const result = await db.Topic.update({phong}, {where: {id}});
     res.send('s');
  } catch (error) {
    console.log(error);
  }
});

//Sửa phong theo loại đồ án
router.put('/phong', async (req, res, next) => {
  let {loai, phong} = req.body;
  try {
    const result = await db.Topic.update({phong}, {where: {loai}});
    res.send('s');
  } catch (error) {
    console.log(error);
  }
});

//Xóa
router.delete('/:id/:id', async (req, res, next) => {
  let {id} = req.params;
  try {
    const result = await db.Topic.destroy({where : {id}});
    res.json(result);
  } catch (error) {
    res.send(error);
  }
 });

 //Kiểm tra trước khi xóa
 router.get('/:id', async (req, res, next) => {
  let {id} = req.params;
  try {
    const result = await db.User_Topic.findAll({where : {topicId : id}});
    res.json(result);
  } catch (error) {
    res.send(error);
  }
 });

 //Đăng ký đề tài
 router.post('/dkda/:id', async (req, res, next) => {
  let {id} = req.body;
  let idUser = req.cookies.id;
  try {
    const result = await db.User_Topic.findOne({where : {userId: idUser}});
    if(result){
      res.send('0');
    }
    else{
      const result1 = await db.User_Topic.create({userId: idUser, topicId: id});
      res.send(result1);
    } 
    if(result) {
      console.log(result);
    }

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});




module.exports = router;