const express = require("express");
const router = require('./routers');
const client = require("../config/db");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

//Aumentar o limite de tamanho de carga util para soMB
app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));

app.use(express.json());

// Configuração do CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(router);

client.query("select 1").then(()=>{
    console.log("Conectado com sucesso!");
    app.listen(8085, function(){
        console.log("Servidor rodando na url:http://localhost:8085")
    });
})
.catch(erro => console.log("connection failed \n"+erro));