var express = require('express');
var router = express.Router();
const USER = require('../model/user');
const CAR = require('../model/car');
const inqq = require('../model/inquiry');
const RETING = require('../model/reting');
const bcrypt = require('bcrypt');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

/* GET home page. */
router.get('/', async function (req, res, next) {
  let car_infoo = await CAR.find()
  res.render('home', { c:car_infoo });
});

router.post('/inquiryy', async function (req, res, next) {
  console.log(req.body);

  await inqq.create(req.body);
  res.redirect('/inquiry')
  });

router.get('home', async function (req, res, next) {
  res.render('/', {});
});

router.post('retin', async function (req, res, next) {
  res.redirect('/')
});

router.get('/login', async function (req, res, next) {
  res.render('login', {});
  });
router.get('/shop', async function (req, res, next) {
  res.render('shop', {});
});
router.get('/signup', async function (req, res, next) {
  res.render('signup', {});
});
router.get('/about', async function (req, res, next) {
  res.render('about', {});
});
router.get('/homeuser', async function (req, res, next) {
  let car_infoo = await CAR.find()
  res.render('homeuser', { c:car_infoo ,username : req.cookies.username});
});
router.get('/inquiry', async function (req, res, next) {
  const carsdata = await CAR.find({},{_id:0,car_name:1});
  res.render('inquiry', {carsdata});
  });

  router.post('/inquiry', async function (req, res, next) {
    await inqq.create(req.body);
    res.cookie('name', req.body.name)
    res.redirect('/inquiry')
    });
  

router.get('/signup', async function (req, res, next) {
  res.render('index', {});
});

router.get('/updatecar', async function (req, res, next) {
  let data = {}
  if(req.query.uid){
    data = await CAR.findById(req.query.uid)
  }
  res.render('updatecar', {uid: req.query.uid, data: data});
});

router.post('/updatecar',upload.single('car_photo'), async function (req, res, next) {
  if(req.file && req.file.filename){
    req.body.car_photo = req.file.filename
  }
  await CAR.findByIdAndUpdate(req.body.uid, req.body) 
  let data = {}
  res.render('updatecar', {uid: req.query.uid, data: data});
});


router.post('/car_sell', upload.single('car_photo'),  async function (req, res, next) {

  req.body.car_photo = req.file.filename
  await CAR.create(req.body) 
  res.redirect('/darshan/italiya/8585/admin')
});

router.get('/darshan/italiya/8585/admin', async function (req, res, next) {
  let car_info = await CAR.find()
  let show = await USER.find()
  let inq = await inqq.find()

  if(req.query.qqid){
    await inqq.findByIdAndDelete(req.query.qqid)
    return res.redirect('admin')
  }

  if(req.query.did){
    await CAR.findByIdAndDelete(req.query.did)
    return res.redirect('admin')
  }

  if(req.query.ddid){
    await USER.findByIdAndDelete(req.query.ddid)
    return res.redirect('admin')
  }
  
  res.render('admin',{ a:show , b:car_info , c:inq });
});


  router.post('/signup', async function(req, res, next) {  
      await USER.create(req.body)
      res.cookie('username', req.body.name)
      res.redirect('/homeuser')
  });


router.post('/login', async function (req, res, next) {
  try {
    if(req.body.email == "bdc@gmail.com" && req.body.password === "admin@1919"){
      res.redirect('/darshan/italiya/8585/admin')
    }
    else{
      res.redirect('/login')
    }
  } catch (err) {
    res.send(err.message)
  }
});






module.exports = router;


