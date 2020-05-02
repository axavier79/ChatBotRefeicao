//Adicionando os pacotes
var restify = require('restify');
var builder = require('botbuilder');

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

//Request para o bot interagir com o usuário
var bot = new builder.UniversalBot(connector, function(session){
    session.send("Você disse: %s", session.message.text);
}).set('storage', inMemoryStorage);