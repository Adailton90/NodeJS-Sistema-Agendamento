const agendaRoutes = (app, fs) =>{
	const agendaPath = './data/agenda.json';

	//lISTAGEM
	app.get('/sistemagendamento', (req, res) =>{

		fs.readFile(agendaPath, 'utf8', (err, data)=>{
			if(err){
				console.log("Erro ao ler arquivo");
			}
			res.send(JSON.parse(data));			
		});
	});

	//CADASTRO
	app.post('/sistemagendamento', (req, res) => {
		var data = req.body;
		fs.readFile(agendaPath, 'utf8', (err, data)=>{
			if(err){
				var response = {status: 'falha', resultado: err}
				res.json(response);
			}else{
				var obj = JSON.parse(data);
				req.body.id = obj.agenda.length +1;

				obj.agenda.push(data);

				fs.writeFile(agendaPath, JSON.stringify(obj), function(err){
					if(err){
						console.log("Erro ao tentar salvar arquivo");
					}else{
						var response = {status: 'Sucesso', resultado: 'Salva com sucesso'};
						res.json(response);
					}
				});
			}
    	});
	});

	//DELETE
	app.delete('/sistemagendamento/', (req, res) => {
		fs.readFile(agendaPath, 'utf8', (err, data)=>{
			if(err){
				console.log("Erro ao ler arquivo");
			}else{
				var obj = JSON.parse(data);
				delete obj.agenda[(req.body.id -1)];

				fs.writeFile(agendaPath, JSON.stringify(obj), function(err){
					if(err){
						console.log("Erro ao tentar salvar arquivo");
					}else{
						var response = {status: 'Sucesso', resultado: 'Excluido com sucesso'};
						res.json(response);
					}
				});
			}
    	});
	});
};


module.exports = agendaRoutes;