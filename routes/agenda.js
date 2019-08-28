const agendaRoutes = (app, fs) => {
    const dataService = require('./class');
    //const agendaPath = './data/agenda.json';

    //lISTAGEM
    app.get('/sistemagendamento', async(req, res) => {
        const data = await dataService.redyAgenda();
        return res.send(data);
    });


    //CADASTRO
    app.post('/sistemagendamento', async(req, res) => {
        const { body: data } = req;
        const agendaAtual = await dataService.redyAgenda();

        agendaAtual.push(data);
        const retorno = await dataService.saveAgenda(agendaAtual);
        return res.send(retorno);
    });





    //DELETE
    app.delete('/sistemagendamento/', (req, res) => {
        fs.readFile(agendaPath, 'utf8', (err, data) => {
            if (err) {
                console.log("Erro ao ler arquivo");
            } else {
                var obj = JSON.parse(data);
                delete obj.agenda[(req.body.id - 1)];

                fs.writeFile(agendaPath, JSON.stringify(obj), function(err) {
                    if (err) {
                        console.log("Erro ao tentar salvar arquivo");
                    } else {
                        var response = { status: 'Sucesso', resultado: 'Excluido com sucesso' };
                        res.json(response);
                    }
                });
            }
        });
    });
};


module.exports = agendaRoutes;