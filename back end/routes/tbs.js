var express = require('express');
var router = express.Router();
const db = require('../models');
var nodemailer =  require('nodemailer');

//Thông báo
router.get('/', async (req, res, next) => {
    try {
      const result = await db.TB.findAll();
      if(result !== null){
        res.send(result);
      }
    } catch (error) {
      console.log(error);
    }
});

router.post('/', async (req, res, next) => {
  let {tieuDe, noiDung} = req.body;
  try {
    const result = await db.TB.create({tieuDe, noiDung});
    const allUser = await db.User.findAll();
    if(result !== null){
      var transporter =  nodemailer.createTransport(
        {
          service: 'gmail',
          auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
          }
        }
      );
      for (i = 0; i < allUser.length; i++) {
        var mainOptions = { 
          from: 'DoAn',
          to: allUser[i].email,
          subject: tieuDe,
          text: 'Chào bạn' + allUser[i].email,
          html: noiDung,
      }
      transporter.sendMail(mainOptions, function(err, info){
          if (err) {
              console.log(err);
              res.redirect('/');
          } else {
              console.log('Message sent: ' +  info.response);
          }
      });
      }
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

  module.exports = router;