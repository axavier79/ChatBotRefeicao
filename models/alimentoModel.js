var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var alimentoModel = new Schema({
      grupo : String,
      nome : String,
      descricao : String,
      preco : Number,
      tipo : String
});
module.exports = mongoose.model("Alimento", alimentoModel);
