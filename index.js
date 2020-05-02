/** * Author: Anderson Xavier * Data: 02/05/2020 * Descrição: Desenvolvimento de um Bot via Bot Emulator. **/
//Adicionando os pacotes
var restify = require('restify');
var builder = require('botbuilder');
var mongoose = require('mongoose');

//MongoDB
var url = 'mongodb+srv://chatbot:Test0205@cluster0-udmqo.mongodb.net/test?retryWrites=true&w=majority';
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log('Conectado ao banco de dados.')
});
mongoose.connect(url);


//Configurando a porta onde o projeto responderá
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
    console.log('%s listening to %s', server.name, server.url);
});

//Necessário criar uma "custom state client" para o robô, pois o padrão está depreciado
var inMemoryStorage = new builder.MemoryBotStorage();
 
//Configurando o conector para o robô
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

//Método POST para receber mensagens do usuário
server.post('/api/messages', connector.listen());

// Bloco de Dialogs: 
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send("Bem vindo(a) a opção de montar sua refeição.");
        builder.Prompts.text(session, "Por favor escolha sua Proteína entre: Frango, Carne vermelha ou Peixe.");
    },
    function (session, results) {
        session.dialogData.proteina = results.response;
        builder.Prompts.text(session, "Por favor escolha seu Carboidrato: Arroz, Batata ou Mandioca.");
    },
    function (session, results) {
        session.dialogData.carboidrato = results.response;
        builder.Prompts.text(session, "Por favor escolha sua Salada entre: Alface, Tomate, Cenoura, Beterraba ou  Mix (escolha de até 3 opções).");
    },
    function (session, results) {
        session.dialogData.salada = results.response;

        // Process request and display reservation details
        session.send(`Montagem da refeição concluída. Proteína: ${session.dialogData.proteina} - Carboidrato: ${session.dialogData.carboidrato} - Salada: ${session.dialogData.salada}`);
        session.endDialog();
    }
]).set('storage', inMemoryStorage); // Register in-memory storage 