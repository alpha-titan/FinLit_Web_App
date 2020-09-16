const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Comment = require('./comment')
var articleSchema = new mongoose.Schema({
 
    title: {
        type: String,
        required: 'Body can\'t be empty',
        unique: true
    },  
     id:{
        type:String
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