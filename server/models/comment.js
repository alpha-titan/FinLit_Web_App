const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var commentSchema = new mongoose.Schema({
   
    username: {
        type: String
    },
    body: {
        type: String        
    },
    
  
    saltSecret: String
});
mongoose.model('Comment', commentSchema);