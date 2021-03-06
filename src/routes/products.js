// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// ************ Controller Require ************
const productsController = require('../controllers/productsController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname + '../../../public/images/products'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
   
var upload = multer({ storage: storage })

/*** GET ALL PRODUCTS ***/ 


/*** CREATE ONE PRODUCT ***/ 
router.get('/:id/', productsController.create); 
router.post('/', upload.single("image"), productsController.store); 

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id/', productsController.edit); 
router.post('/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.post('/delete/:id', productsController.destroy); 


module.exports = router;
