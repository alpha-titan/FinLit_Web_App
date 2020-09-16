const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var stockSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: 'Name can\'t be empty',
    },

    description: {
        type: String,
    },
  
    saltSecret: String
});
mongoose.model('Stock', stockSchema);