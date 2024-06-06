const aqidb= require('../models/aqimodel');
const apiUrl = `https://api.api-ninjas.com/v1/airquality?city=`;
const apiKey = 't+O/4XAQnZ9NUcDswHrLnw==2f5ebMbPzv0PA47r';
const axios = require('axios') ;

const setCity= async (req, res) => {
// const City = await model();
    {

    const city = req.query.city;
    
    // res.json(city);
    
  
    if (!city) {
      return res.status(400).send({success: false, message: 'City is required', data:null });
    }
  
    try
     {
      const response = await axios.get(`${apiUrl}${city}`, {
        headers: {
          'X-Api-Key': apiKey
        }
      });
  
      const airQualityData = response.data;
      const data = response.data;
      let db =new  aqidb({
        cityName: city,
        CO: {
          concentration: data.CO.concentration,
          aqi: data.CO.aqi
        },
        NO2: {
          concentration: data.NO2.concentration,
          aqi: data.NO2.aqi
        },
        O3: {
          concentration: data.O3.concentration,
          aqi: data.O3.aqi
        },
        SO2: {
          concentration: data.SO2.concentration,
          aqi: data.SO2.aqi
        },
        PM2_5: {
          concentration: data['PM2.5'].concentration,
          aqi: data['PM2.5'].aqi
        },
        PM10: {
          concentration: data.PM10.concentration,
          aqi: data.PM10.aqi
        },
        overall_aqi: data.overall_aqi
      });
    // aqidb.cityName=city;
    console.log(db);
    await db.save();
    console.log('dataa saved');
    console.log('data._id',db._id);
    res.status(200).send({ success:true, message: 'city fetched with data', data:airQualityData, id:db._id});
    // res.send(airQualityData);
    
}
   catch (error) {
        console.error('Error fetching air quality data:', error);
        res.status(500).send({ success: false, message: 'Failed to fetch air quality data', data:null });
        }  
    }  
    
}
const getCity = async (req, res) => {
  try{

    // const city = req.query.city;
    console.log('getting city::::::::::::');
    let city = (req.params.id);
    console.log(city);
    
    let db =await  aqidb.findOne({_id: city});
    console.log(db);
    res.status(200).send({success: true, message:'user fetched successfully', data: db});

  }
  catch(err){
    console.log(err.message,': error');
    res.status(500).send({success: false, message:'user fetched UN-successful', data: null});

  }
}
const getHistory = async (req, res)=>{
  try{
    // let city = (req.params.id);
    let db =await  aqidb.find({});
    console.log('db data>>>',db);
    res.status(200).send({success: true, message:'History fetched successfully', data: db});
  }catch(err){
    console.log(err.message,': error');
    res.status(500).send({success: false, message:'Data fetching UN-successful', data: null});
  }
}
module.exports={
    getCity,
    setCity,
    getHistory,
}