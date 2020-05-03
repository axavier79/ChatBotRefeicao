const  mongoose  = require("mongoose");
mongoose.Promise  = require("bluebird");
const  connect  =  mongoose.connect('mongodb+srv://chatbot:Test123@cluster0-udmqo.mongodb.net/test?retryWrites=true&w=majority');
module.exports  =  connect;


// const mongoose = require("mongoose");
// mongoose.Promise = require("bluebird");

// const url = "mongodb://localhost:27017/chat";

// const connect = mongoose.connect(url, { useNewUrlParser: true });

// module.exports = connect;
