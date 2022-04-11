var express = require('express');
var router = express.Router();
const db = require('../models');

//Mời
router.post('/', async (req, res, next) => {
    let {idMoi, idNhan, idTopic, ip} = req.body;
    if((idMoi === 'admin') || (idMoi === 'adminPM') || (idMoi === 'adminM'))
      idMoi = null;
    try {
      const result = await db.Order.create({idMoi, idNhan, idTopic, ip});
      if(result !== null){
        res.send(result);
      }
    } catch (error) {
      console.log(error);
    }
  });

//Kiểm tra
router.post('/kt', async (req, res, next) => {
  let {idMoi, idNhan, idTopic} = req.body;
  if((idMoi === 'admin') || (idMoi === 'adminPM') || (idMoi === 'adminM')) {
    idMoi = null;
  }
  try {
    const result = await db.User_Topic.findOne({where: {userId: idNhan, topicId: idTopic}});
    if(result === null){
      const result1 = await db.Order.findOne({
        where : {idMoi, idNhan, idTopic}
      });
      if(result1 !== null){
        res.send('0');
      }
      else res.send('1');
    }
    else res.send('0');
  } catch (error) {
    console.log(error);
  }
});

//Thông báo
router.get('/', async (req, res, next) => {
    let idNhan = req.cookies.id;
    try {
      const result = await db.Order.findAll({
        where : {idNhan},
        include : [
          {model: db.Topic},
          {model: db.User}
        ]
      });

      if(result !== null){
        res.send(result);
      }
    } catch (error) {
      console.log(error);
    }
  });

//Thông báo 1
router.get('/tb', async (req, res, next) => {
  let idMoi= req.cookies.id;
  if((idMoi === 'admin') || (idMoi === 'adminPM') || (idMoi === 'adminM')) idMoi = null;
  try {
    const result = await db.Order.findAll({
      where : {idMoi},
      include : {
        model: db.Topic
        } 
    });
    if(result !== null){
       res.send(result);
      }
      
  } catch (error) {
    console.log(error);
  }
});

  //Xóa
  router.delete('/:id', async (req, res, next) => {
    let {id} = req.params;
    try {
      const result = await db.Order.destroy({where : {id}});
      res.json(result);
    } catch (error) {
      res.send(error);
    }
   });

   //Đồng ý
   router.put('/:id/dy', async (req, res, next) => {
    let {id} = req.params;
    let {idNhan1} = req.body;
    try {
      const result = await db.Order.update({idNhan : null, idNhan1: idNhan1, ck : 1},{where: {id}});
      res.send('s');
    } catch (error) {
      console.log(error);
    }
  });

  //Từ chối
  router.put('/:id/tc', async (req, res, next) => {
    let {id} = req.params;
    let {idNhan1} = req.body;
    try {
      const result = await db.Order.update({idNhan : null, idNhan1: idNhan1, ck : 0},{where: {id}});
      res.send('s');
    } catch (error) {
      console.log(error);
    }
  });

  module.exports = router;