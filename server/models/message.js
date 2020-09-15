const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var messageSchema = new mongoose.Schema({
   
    name: {
        type: String,
    },
    email: {
        type: String,
        required: 'Email can\'t be empty'
        
    },
    id:{
        type:String

    },

    phoneNumber: {
        type: String
        },
    query: {
        type: String,
    },
  
    saltSecret: String
});
mongoose.model('Message', messageSchema);