const mongoose = require('mongoose');
const Mentions = mongoose.model('Alimento');

// list
exports.listAlimentos = async (req, res) => {
  try {
    const data = await Alimento.find({});
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os alimentos.'});
  }
};