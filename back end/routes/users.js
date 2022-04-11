var express = require('express');
var router = express.Router();
const db = require('../models');
var nodemailer =  require('nodemailer');
require('dotenv').config();



//Đăng ký
router.post('/dk', async (req, res, next) => {
  let {email, password, ten, isGV, isAdmin, ma, maGV} = req.body;
  if ((ten !== 'admin') && (ten !== 'adminPM') && (ten !== 'adminM')) {
  try {
    const code = await db.Code.findOne({where : {email : email}});
    if(ma === code.code){
      await db.Code.destroy({where : {email : email}});
      const kt = await db.User.findOne({where : {email : email}});
      if(kt !== null) {
        res.send('da ton tai');
      }
      else {
        if(isGV === true){
          if(maGV === 'ABC'){
            const result = await db.User.create({email, password, ten, isGV, isAdmin});
            res.send({result: result, message: '1'});
          }
          else res.send('sai maGV');
        }
        else 
        {
          const result = await db.User.create({email, password, ten, isGV, isAdmin});
          res.send(result);
        }
      }
    }
    else {
      if(ma === '')
        res.send('nhap ma');
      else {
        if(ma != maa)
          res.send('ma sai');
      }
    }
  } catch (error) {
    console.log(error);
  }}
});

//Đăng ký admin
router.post('/dkAdmin', async (req, res, next) => {
  let {email, ten, isGV} = req.body;
  if ((ten !== 'admin') && (ten !== 'adminPM') && (ten !== 'adminM')) {
    try {
      const kt = await db.User.findOne({where : {email : email}});
        if(kt !== null) {
          res.send('da ton tai');
        }
        else {
          const result = await db.User.create({email, password : '123', ten, isGV, isAdmin: 0});
          res.send(result);
        }
    } catch (error) {
      console.log(error);
    }
  }
});


//Đăng nhập
router.post('/', async (req, res, next) => {
  let {email, password} = req.body;
  try {
    const kt = await db.User.findOne({where : {email : email}});
    if(kt === null){
      res.send('0');
    }    
    else {
      const result = await kt.validPassword(password);
      if(result === true){
        if(kt.isAdmin === true){
          res.send({admin : 'admin', message: '/LuaChon'});
        }
          if (kt.isAdminPM === true) {
            res.send({admin : 'adminPM', message : '/LuaChon'})
          }
            if (kt.isAdminM === true) {
              res.send({admin : 'adminM', message : '/LuaChon'});
            }
            else {
              const kt3 = await db.User.findOne({where : {id : kt.id, isGV : true}})
              if(kt3){
                res.send({kt: kt.id, isGV : 1, message: '/LuaChon'});
              }
              else{
                const kt2 = await db.User_Topic.findOne({where : {UserId : kt.id}});
                if(kt2) {
                  res.send({kt: kt.id, message: '/ThongTin'});
                }
                else {
                  res.send({kt: kt.id, message: '/ChuyenNganh'});
                }
              }
            }
      }
      else {
        res.send('1')
      }
    }
    //res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//Thong tin
router.get('/TT', async (req, res, next) => {
  let idUser = req.cookies.id;
  try {
    const result = await db.User.findAll({
      where: {id: idUser},
      include : {
        model: db.Topic,
        as: 'topic',
        include: {
          model: db.User,
          as: 'user',
          //where: {isGV : 1}
        }
      }
    });
    if(result.length !== 0){
      res.send({admin: 0, result});
    } else{
      res.send({admin: 1, ten: idUser})
    }
  } catch (error) {
    console.log(error);
  }
});

//Thong tin id
router.post('/TTID', async (req, res, next) => {
  let {id} = req.body;
  try {
    const result = await db.User.findAll({
      where: {id: id},
      include : {
        model: db.Topic,
        as: 'topic',
        include: {
          model: db.User,
          as: 'user',
          //where: {isGV : 1}
        }
      }
    });
    if(result !== null){
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

//Lấy tên
router.post('/Ten', async (req, res, next) => {
  let {idUser} = req.body;
  try {
    const result = await db.User.findAll({
      where: {id: idUser},
    });
    if(result !== null){
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

//isGV
router.get('/isGV', async (req, res, next) => {
  try {
    const kt = await db.User.findAll({
      where : {isGV : 1},
      include : {
        model: db.Topic,
        as: 'topic' 
      }
    });
    res.send(kt);
  } catch (error) {
    console.log(error);
  }
});

router.get('/allUser', async (req, res, next) => {
  try {
    const kt = await db.User.findAll({
      include : {
        model: db.Topic,
        as: 'topic' 
      }
    });
    res.send(kt);
  } catch (error) {
    console.log(error);
  }
});

//Xóa giáo viên
router.delete('/:id', async (req, res, next) => {
  let {id} = req.params;
  let {idTopic} = req.body;
  try {
    const result = await db.User_Topic.destroy({where : {userID : id, topicID : idTopic}});
    res.json(result);
  } catch (error) {
    res.send(error);
  }
 });


 //Gửi mail
 router.post('/send', async (req, res, next) => {
   let {email} = req.body;
   const kt = await db.User.findOne({where : {email : email}});
   const code = await db.Code.findOne({where : {email}});
    if (code !== null) {
      await db.Code.destroy({where : {email}});
    }
    if(kt !== null) {
      res.send('da ton tai');
    }
    else {
      maa = Math.floor(Math.random() * Math.floor(1000));
      var transporter =  nodemailer.createTransport(
        {
          service: 'gmail',
          auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
          }
        }
      );
      var mainOptions = { 
          from: 'DoAn',
          to: email,
          subject: 'Mã đăng ký',
          text: 'Chào bạn' + email,
          html: '<p>Mã xác nhận của bạn là: </b>' + maa,
      }
      transporter.sendMail(mainOptions, function(err, info){
          if (err) {
              console.log(err);
              res.redirect('/');
          } else {
              console.log('Message sent: ' +  info.response);
              db.Code.create({email, code: maa});
              res.send('1');
          }
      });
    }
});

module.exports = router;