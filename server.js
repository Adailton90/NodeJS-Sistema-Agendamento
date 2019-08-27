var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(function(req, res, next){
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
 res.setHeader("Access-Control-Allow-Headers", "content-type");
 res.setHeader("Content-Type", "application/json");
 res.setHeader("Access-Control-Allow-Credentials", true);
 next();
});

app.listen(80, function(){ console.log('Sistema de Agendamento disponivel na porta 80') });

//API's


app.get('/api', function(req, res){
	fs.readFile('agenda.json', 'utf8', function(err, data){
		if(err){
			var response = {status: 'falha', resultado: err};
			res.json(response);
		}else{
			var obj = JSON.parse(data);
			var result = 'Nenhum evento encontrado';

			obj.agenda.forEach(function(agenda){
				if(agenda != null){
						result = agenda;
				}
			});

			var response = {status: 'sucesso', resultado: result};
			res.json(response);

		}
	});
});
