const express= require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const axios = require('axios');
const Cors = require('cors');
const routes=require('./routes/router');
const connect = require('./connection');
const {errorMiddleware} = require('./middleware/error');
const apiUrl = "https://api.api-ninjas.com/v1/airquality?city=";
const apiKey = 't+O/4XAQnZ9NUcDswHrLnw==2f5ebMbPzv0PA47r';

connect();

app.use(Cors({origin: 'http://localhost:8080', // Replace with your frontend URL
credentials: true})); // Allow credentials (cookies, authorization headers, etc.));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(routes);



app.listen(3000, (error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("server is running on port 3000");
    }
})