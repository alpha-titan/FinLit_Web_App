const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const path = require('path');
const { forEach } = require('lodash');
multer = require('multer')
bodyParser = require('body-parser');
const User = mongoose.model('User');
const Article = mongoose.model('Article');
const Comment = mongoose.model('Comment');

const Contact = mongoose.model('Contact');

var unirest = require("unirest");

module.exports.register = (req, res, next) => {
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.image=req.body.image;
    user.role=req.body.role;


    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}
module.exports.sendMessage = (req, res, next) => {
    var contact = new Contact();
    contact.name = req.body.name;
    contact.phoneNumber = req.body.phoneNumber;

    contact.email = req.body.email;
    contact.query = req.body.query;

  

    contact.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}
module.exports.deleteArticle=(req,res,next)=>{
    Article.findByIdAndDelete(
        req.params._id,
        function (error, result) {
            if (error) {
                throw error;
            } else {
                res.status(200).json(result);
            }
        }
    );
}
module.exports.deleteUser=(req,res,next)=>{
    User.findByIdAndDelete(
        req.params._id,
        function (error, result) {
            if (error) {
                throw error;
            } else {
                res.status(200).json(result);
            }
        }
    );
}
module.exports.deleteComment=(req,res,next)=>{
    Comment.findByIdAndDelete(
        req.params._id,
        function (error, result) {
            if (error) {
                throw error;
            } else {
                res.status(200).json(result);
            }
        }
    );
}
module.exports.getArticles=(req,res,next)=>{
    Article.find({})
    .exec(function (err, articles) {

        var articleMap = [];

        articles.forEach(function (article) {

            articleMap.push(article);
        });

        res.send(articleMap);

    });
}
module.exports.getMessages=(req,res,next)=>{
    Contact.find({})
    .exec(function (err, contacts) {

        var contactMap = [];

        contacts.forEach(function (contact) {

            contactMap.push(contact);
        });

        res.send(contactMap);

    });
}
module.exports.addArticle = (req, res, next) => {
    var article = new Article();
    article.title = req.body.title;
    article.image=req.body.image;
    article.category = req.body.category;
    article.body=req.body.body;
    article.role=req.body.role;
    article.id=req.body.id;


    article.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Error.']);
            else
                return next(err);
        }

    });
}
module.exports.getUsers = (req, res, next) => {
    User.find({})
        .exec(function (err, users) {

            var userMap = [];

            users.forEach(function (user) {

                userMap.push(user);
            });

            res.send(userMap);

        });
}


module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err)
            return res.status(400).json(err);
        // registered user
        else if (user) {
            return res.status(200).json({ "token": user.generateJwt() });
        }
        // unknown user or wrong password
        else
            return res.status(404).json(info);
    })(req, res);

}
module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id })
        .exec(function (err, user) {
            if (!user) {
                console.log(req._id)

                return res.status(404).json({ status: false, message: 'User record not found.', err: err, id: req._id });
            }
            else {

                return res.status(200).json({ status: true, user: _.pick(user, ['role','_id', 'email','image']) });
            }
        }
        );
}
module.exports.updateUser = (req, res, next) => {
    const id = req.params._id;
    const newUserData = req.body;
   
    User.findByIdAndUpdate(id, { $set: newUserData }, (err, doc) => {
        if (err) return res.send(err.message)
        if (doc) return res.send(doc);
    })
}
module.exports.addComment = (req, res, next) => {
    var comment = new Comment()
    comment.username = req.body.username
    comment.body = req.body.body
    comment.save((err, doc) => {
        if (!err) {
            Article.findOne({ _id: req.params._id },
                (err, article) => {
                    if (!article) {

                    }
                    else {

                        Article.findByIdAndUpdate(req.params._id, { $push: { comments: comment } }, (err, doc) => {
                            if (err) return res.send(err.message)
                            if (doc) return res.send(doc);
                        })
                    }
                }
            );
        }
        else {

            return next(err);
        }

    });

}

module.exports.updateComment = (req, res, next) => {
    const id = req.params._id;
    const newCommentData = req.body;
   
    Comment.findByIdAndUpdate(id, { $set: newCommentData }, (err, doc) => {
        if (err) return res.send(err.message)
        if (doc) return res.send(doc);
    })
}
module.exports.updateArticle = (req, res, next) => {
    const id = req.params._id;
    const newArticleData = req.body;
   
    Article.findByIdAndUpdate(id, { $set: newArticleData }, (err, doc) => {
        if (err) return res.send(err.message)
        if (doc) return res.send(doc);
    })
}
module.exports.articleDetails = (req, res, next) => {
    Article.findOne({ _id: req.params._id }).populate('comments')
        .exec(function (err, article) {
            if (!article) {

                return res.status(404).json({ status: false, message: 'User record not found.', err: err, id: req._id });
            }
            else {
                return res.status(200).json({ status: true, article: _.pick(article, ['comments','_id', 'title', 'body', 'category']) });
            }
        }
        );
}
module.exports.commentDetails = (req, res, next) => {
    Comment.findOne({ _id: req.params._id })
        .exec(function (err, comment) {
            if (!comment) {

                return res.status(404).json({ status: false, message: 'User record not found.', err: err, id: req._id });
            }
            else {
                return res.status(200).json({ status: true, comment: _.pick(comment, ['body','username', '_id']) });
            }
        }
        );
}


const PATH = './';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './images/'))
    },
    filename: (req, file, cb) => {
        cb(null, file.user.username)
    }

});
let upload = multer({
    storage: storage
});

module.exports.uploadImage = (req, res) => {
    if (!req.file) {
        console.log("No file is available!");
        return res.send({
            success: false
        });

    } else {
        console.log('File is available!');
        return res.send({
            success: true
        })
    }
}
    const finnhub = require('finnhub');
 
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "bt78he748v6ppe5nvfsg" // Replace this
    const finnhubClient = new finnhub.DefaultApi()
     
    // Stock candles
    finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591852249, {}, (error, data, response) => {
        console.log(data)
    });
     
   
     
 
     
 