const mongoose = require('mongoose');
const connect = async() => {
    try {
        let connection = await mongoose.connect(`mongodb+srv://dujjwalsingh:rB2f44t2sShmJrWn@aqiproject.1tbndce.mongodb.net/?retryWrites=true&w=majority&appName=aqiproject`, 
        {   useNewUrlParser: true,
            socketTimeoutMS: 5000 // 45 seconds
        });
        console.log("Data base connected...");
    } catch(error) {
        console.log(error)
    }
}
module.exports = connect;


