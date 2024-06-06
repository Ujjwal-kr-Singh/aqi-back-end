const express = require('express');
const router =express.Router();
const cookieParser = require('cookie-parser');

const auth= require('../middleware/auth');
const apiController= require('../controllers/aqiController');
const userController= require('../controllers/userController');

router.use(cookieParser());
router.use(express.urlencoded({extended:false}));


router.post('/airquality/', async (req, res) => {
    apiController.setCity(req,res);
        
});
router.get('/get/:id', async (req, res) => {
    apiController.getCity(req,res);
        
});
router.post('/user/create', async (req, res) => {
    userController.createUser(req,res);
        
});
router.get('/searchistory', auth ,async (req, res) => {
    
        apiController.getHistory(req,res);
        
        
});
router.get('/login/:username/:password', async (req, res) =>{
    userController.login(req,res);
});





module.exports = router;