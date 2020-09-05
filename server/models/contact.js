const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var contactSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: 'Name can\'t be empty',
    },
    email: {
        type: String,
        required: 'Email can\'t be empty'
        
    },
    phoneNumber: {
        type: String
        },
    query: {
        type: String,
    },
  
    saltSecret: String
});
mongoose.model('Contact', contactSchema);