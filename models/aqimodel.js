// models/AqiData.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps= require('mongoose-timestamps');

// Define the nested schema for pollutant data
const pollutantSchema = new Schema({
  concentration: { type: Number,  },
  aqi: { type: Number,  }
}, { _id: false });

// Define the main schema for AQI data
const aqidbSchema = new Schema({
  cityName: { type: String,  },
  CO: { type: pollutantSchema,  },
  NO2: { type: pollutantSchema, },
  O3: { type: pollutantSchema,  },  
  SO2: { type: pollutantSchema, },
  PM2_5: { type: pollutantSchema,  }, // PM2.5 renamed to PM2_5 to avoid dot notation issues
  PM10: { type: pollutantSchema, },
  overall_aqi: { type: Number,},
  createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('aqidb', aqidbSchema);