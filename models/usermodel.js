const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps= require('mongoose-timestamps');
const userdbSchema = new Schema({
    firstName: { type: String,  },
    lastName: { type: String,  },
    city: { type: String,  },
    phone:{ type: String,  },  
    password:{ type: String,  },
    email: { type: String,  },// PM2.5 renamed to PM2_5 to avoid dot notation issues
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  
  });
  
  module.exports = mongoose.model('userdb', userdbSchema);