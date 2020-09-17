const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/userController');
const User = require('../models/user')
const jwtHelper = require('../config/jwtHelper');
router.get('/', (req, res, next) => {
  res.send("header");
});
const PATH = '../front_end/src/assets/images';
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});
let upload = multer({
  storage: storage
});
router.delete('/deleteMessage/:_id', ctrlUser.deleteMessage);

router.post('/register', ctrlUser.register);
router.post('/send', ctrlUser.sendMessage);
router.post('/sendMessage/:_id', ctrlUser.sendMessageAnalyst);
router.get('/user/:_id', ctrlUser.userDetails);
router.post('/addStock', ctrlUser.addStock);
router.delete('/deleteStock/:_id', ctrlUser.deleteStock);
router.get('/stocks', ctrlUser.getStocks);

router.get('/users', ctrlUser.getUsers);
router.post('/addArticle', ctrlUser.addArticle);
router.delete('/deleteArticle/:_id', ctrlUser.deleteArticle);
router.delete('/deleteUser/:_id', ctrlUser.deleteUser);
router.get('/article/:_id', ctrlUser.articleDetails);
router.get('/contacts', ctrlUser.getMessages);
router.get('/messages', ctrlUser.getMessagesAnalyst);
router.get('/stock/:_id', ctrlUser.stockDetails);

router.post('/addComment/:_id', ctrlUser.addComment);
router.get('/comment/:_id', ctrlUser.commentDetails);
router.delete('/deleteComment/:_id', ctrlUser.deleteComment);

router.get('/articles', ctrlUser.getArticles);
router.put('/updateArticle/:_id', ctrlUser.updateArticle)
router.put('/updateComment/:_id', ctrlUser.updateComment)
router.put('/updateStock/:_id', ctrlUser.updateStock)

router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.put('/update/:_id', ctrlUser.updateUser)
router.post('/uploadimage', upload.single('image'), ctrlUser.uploadImage)
router.get('/dashboard', (req, res)=> {
   let events = [
       {
         "_id": "1",
         "name": "Auto Expo",
         "description": "lorem ipsum",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "2",
         "name": "Auto Expo",
         "description": "lorem ipsum",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "3",
         "name": "Auto Expo",
         "description": "lorem ipsum",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "4",
         "name": "Auto Expo",
         "description": "lorem ipsum",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "5",
         "name": "Auto Expo",
         "description": "lorem ipsum",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "6",
         "name": "Auto Expo",
         "description": "lorem ipsum",
         "date": "2012-04-23T18:25:43.511Z"
       }
     ]
     res.json(events)
   
})

router.get('/stocks', (req, res)=> {
   let specialevents = [
       {
         "_id": "1",
         "name": "Stocks",
         "description": "lorem ipsum",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "2",
         "name": "Auto Expo",
         "description": "lorem ipsum",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "3",
         "name": "Auto Expo",
         "description": "lorem ipsum",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "4",
         "name": "Auto Expo",
         "description": "lorem ipsum",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "5",
         "name": "Auto Expo",
         "description": "lorem ipsum",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "6",
         "name": "Auto Expo",
         "description": "lorem ipsum",
         "date": "2012-04-23T18:25:43.511Z"
       }
     ]
     res.json(specialevents)
   
})

module.exports = router;