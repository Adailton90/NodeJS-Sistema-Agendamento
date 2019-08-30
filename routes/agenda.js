const agendaRoutes = (app, fs) => {
    const dataService = require('./class');

    //convertendo para poder comparar 
    function tranformaData(data) {
        return parseInt(data.split("-")[2].toString() + data.split("-")[1].toString() + data.split("-")[0].toString());
    }

    //lIST ALL - OK
    app.get('/listAll', async(req, res) => {
        try {
            const data = await dataService.readAgenda();
            return res.send(data);

        } catch (error) {
            return res.status(400).json({ error: 'Erro nos reistros da Agenda' });
        }

    });

    //LIST BY DAY - OK
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
                    return res.json(response);
                }

            });
            if (test != 1) {
                let response = { status: 'Não a horários disponíveis para esta data' };
                return res.send(response);
            }
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao tentar localizar evento na agenda' });
        }
    });

    //LIST DAYS BY HOURS - OK
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
                        var day = elemento.day;
                        datas.push(day);
                    }
                });
            });
            if (test != 1) {
                return res.json({ resposta: 'Não a data diponiveis para este intervalo de horário' });
            }
            let response = { status: 'Datas disponíveis para o intervalo de horário informado', datas };
            return res.send(response);

        } catch (error) {
            return res.status(400).json({ error: 'Erro ao tentar localizar evento na agenda.' });
        }
    });

    //LIST RANGES BY DAYS - OK
    app.get('/listDateRanges/:data1/:data2', async(req, res) => {
        try {
            var busca1 = req.params.data1;
            var busca2 = req.params.data2;

            var nova_data1 = tranformaData(busca1);
            var nova_data2 = tranformaData(busca2);

            var aux;
            const data = await dataService.readAgenda();
            var test;
            var periodo = [];

            if (nova_data1 > nova_data2) {
                aux = nova_data1;
                nova_data1 = nova_data2;
                nova_data2 = aux;
            }


            data.forEach(function(elemento) {
                var dayElemet = elemento.day;
                var new_dayElemento = tranformaData(dayElemet);
                if (new_dayElemento == nova_data1 || new_dayElemento == nova_data2) {
                    test = 1;
                    periodo.push(elemento);
                }
                if (new_dayElemento > nova_data1 && new_dayElemento < nova_data2) {
                    test = 1;
                    periodo.push(elemento);
                }
            });
            if (test != 1) {
                return res.json({ resposta: 'Sem horário disponivel para este intervalo de datas!' });
            }
            let response = { status: 'Período disponível', periodo };
            return res.send(response);

        } catch (error) {
            return res.status(400).json({ error: 'Erro ao tentar localizar evento na agenda.' });
        }
    });

    //DELETE's - OK
    app.delete('/deleteRegister/:day', async(req, res) => {
        try {
            const buscaDay = req.params.day;
            const buscaStart = req.params.start;
            const buscaEnd = req.params.end;
            var data = await dataService.readAgenda();

            data = data.filter(obj => obj.day != buscaDay);
            dataService.saveAgenda(data);

            return res.send('Registro Deletado');
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao tentar cadastrar.' });
        }
    });

    //CADASTRO
    app.post('/registerRule', async(req, res) => {
        try {
            const { body: register } = req;
            const data = await dataService.readAgenda();
            var test = [];

            test = data.filter(obj => obj.day == register.day);
            if (test.length != 0) {
                res.status(400).json({ error: 'Este item ja foi cadastrado anteriormente!' });
            };
            data.push(register);
            const retorno = await dataService.saveAgenda(data);
            return res.status(200).json({ sucesso: 'Registro cadastrado com suesso!' });

        } catch (error) {
            return res.status(400).json({ error: 'Erro ao tentar cadastrar' });
        }
    });
};


module.exports = agendaRoutes;