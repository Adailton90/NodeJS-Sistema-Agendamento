const agendaRoutes = (app, fs) => {
    const dataService = require('./class');

    //lIST-ALL
    app.get('/listAll', async(req, res) => {
        try {
            const data = await dataService.readAgenda();
            return res.send(data);

        } catch (error) {
            return res.status(400).json({ error: 'Erro nos reistros da Agenda' });
        }

    });


    //LIST-BY-ID
    app.get('/listByID/:id', async(req, res) => {
        try {
            const busca = req.params.id;
            const data = await dataService.readAgenda();
            var test = 0;
            data.forEach(function(elemento) {
                var intervalo = elemento.intervals;
                intervalo.forEach(function(index) {
                    if (index.id == busca) {
                        test = 1;
                        res.send(index);
                    }
                });

            });
            if (test != 1) {
                res.send('ID informado não é validao');
            }
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao tentar localizar horario na agenda' });
        }
    });

    //LIST-BY-DAY
    app.get('/listByDay/:day', async(req, res) => {
        try {
            const busca = req.params.day;
            const data = await dataService.readAgenda();
            var test = 0;

            data.forEach(function(elemento) {
                if (elemento.day == busca) {
                    test = 1;
                    let horarios = elemento.intervals;
                    let response = { status: 'Horários disponíveis para esta data', horarios };
                    res.send(response);
                }

            });
            if (test != 1) {
                var msg = 'Não a horários disponíveis para esta data';
                res.send(msg);
            }
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao tentar localizar evento na agenda' });
        }
    });

    app.get('/listAllByHours/:start/:end', async(req, res) => {
        try {
            const busca1 = req.params.start;
            const busca2 = req.params.end;
            const data = await dataService.readAgenda();
            var test;
            var datas = [];
            data.forEach(function(elemento) {
                var intervalo = elemento.intervals;
                intervalo.forEach(function(index) {
                    if (index.start == busca1 && index.end == busca2) {
                        test = 1;
                        let day = elemento.day;
                        datas.push(day);
                    }
                });
            });
            if (test != 1) {
                res.send('Não a data disponível nesse intervalo de horário.');
            }
            let response = { status: 'Datas disponíveis para o intervalo de horário informado', datas };
            return res.send(response);

        } catch (error) {
            return res.status(400).json({ error: 'Erro ao tentar localizar evento na agenda.' });
        }
    });

    app.get('/listDateRanges/:data1/:data2', async(req, res) => {
        try {
            const busca1 = req.params.data1;
            const busca2 = req.params.data2;
            const data = await dataService.readAgenda();
            var test;
            var periodo = [];
            var valorData = data.day.substring(0,1);
            console.log(valorData);
            
            data.forEach(function(elemento) {
                if (elemento.day == busca1 || elemento.day == busca2) {
                    test = 1;
                    console.log(elemento);
                    periodo.push(elemento);
                }
            });
            if (test != 1) {
                res.send('Sem horário disponivel para este período!');
            }
            let response = { status: 'Período disponível', periodo };
            return res.send(response);

        } catch (error) {
            return res.status(400).json({ error: 'Erro ao tentar localizar evento na agenda.' });
        }
    });



    //DELETE
    app.delete('/deleteByID/:id', async(req, res) => {
        try {
            const busca = req.params.id;
            const data = await dataService.readAgenda();

            // 
            data.forEach(function(elemento) {
                var intervalo = elemento.intervals;
                intervalo.forEach(function(index) {
                    if (index.id == busca) {
                        res.send('evento deletado!!');
                    };
                });

            });

        } catch (error) {
            return res.status(400).json({ error: 'Erro ao tentar cadastrar.' });
        }


    });

    //CADASTRO
    app.post('/sistemaDeAgendamento', async(req, res) => {
        try {
            const { body: data } = req;
            const agendaAtual = await dataService.readAgenda();

            agendaAtual.push(data);

            const retorno = await dataService.saveAgenda(agendaAtual);
            return res.send('horário inserido na agenda!');

        } catch (error) {
            return res.status(400).json({ error: 'Erro ao tentar cadastrar' });
        }
    });

};


module.exports = agendaRoutes;