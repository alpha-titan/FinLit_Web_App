const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Comment = require('./comment')
var articleSchema = new mongoose.Schema({
    id:{
    type:String
    },
    title: {
        type: String,
        required: 'Body can\'t be empty',
        unique: true
    },
    category: {
        type: String,
        
    },
    body: {
        type: String,
        required: 'Body can\'t be empty',
    },
    role: {
        type: String
    },
    image: {
        type: String,
        default:"in.png"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment', index: true
    }],

    saltSecret: String
});
mongoose.model('Article', articleSchema);