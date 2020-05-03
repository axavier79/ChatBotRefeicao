const  mongoose  = require("mongoose");
mongoose.Promise  = require("bluebird");
const  connect  =  mongoose.connect('mongodb+srv://chatbot:Test123@cluster0-udmqo.mongodb.net/test?retryWrites=true&w=majority');
module.exports  =  connect;