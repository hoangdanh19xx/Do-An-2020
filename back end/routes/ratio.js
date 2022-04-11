var express = require('express');
var router = express.Router();
const db = require('../models');

router.post('/tile/diem', async (req, res, next) => {
    let {chuyenNganh} = req.body;
    
    try {
        const result = await db.Ratio.findOne({where : {chuyenNganh}});
        res.send(result);
    } catch (error) {
        console.log(error)
    }
});
//
router.post('/tile/set', async (req, res, next) => {
    let {chuyenNganh, gvhd, gvpb} = req.body;
    console.log('AAA', chuyenNganh, gvhd);
    try {
        const result = await db.Ratio.create({chuyenNganh: chuyenNganh, gvhd1: gvhd[0].lan1, gvhd2: gvhd[1].lan2, gvhd3: gvhd[2].lan3, gvhdtong: gvhd[3].tong, gvpb1: gvpb[0].lan1, gvpb2: gvpb[1].lan2, gvpb3: gvpb[2].lan3, gvpbtong: gvpb[3].tong});
        res.send(result);
    } catch (error) {
        console.log(error);
    }    
});

router.delete('/tile/delete', async (req, res, next) => {
    let {chuyenNganh} = req.body;
    try {
        const result = await db.Ratio.destroy({where : {chuyenNganh}});
        res.send('ok');
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;