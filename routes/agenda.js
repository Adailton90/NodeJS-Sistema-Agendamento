const agendaRoutes = (app, fs) => {
    const dataService = require('./class');

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
            const data = await dataService.readAgenda();
            let test = 0;
            data.filter((obj) => {
                if (obj.day == req.params.day) {
                    test = 1;
                    let horarios = obj.intervals;
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
            const data = await dataService.readAgenda();
            let test;
            let datas = [];
            data.filter((obj) => {
                obj.intervals.filter(intervals => {
                    if (intervals.start == req.params.start && intervals.end == req.params.end) {
                        test = 1;
                        datas.push(obj.day);
                    }
                });
            });
            if (test != 1) {
                return res.json({ resposta: 'Não a data diponiveis para este intervalo de horário' });
            }
            let response = { status: 'Datas disponíveis para este intervalo de horário informado', datas };
            return res.send(response);

        } catch (error) {
            return res.status(400).json({ error: 'Erro ao tentar localizar evento na agenda.' });
        }
    });

    const bindToDate = (date) => {
            const [dia, mes, ano] = date.split('-');
            return new Date(ano, (mes - 1), dia, 0, 0, 0, 0);
        }
        //LIST RANGES BY DAYS - OK
    app.get('/listDateRanges/:data1/:data2', async(req, res) => {
        try {
            const nova_data1 = bindToDate(req.params.data1);
            const nova_data2 = bindToDate(req.params.data2);

            let aux;
            const data = await dataService.readAgenda();
            let test;
            let periodo = [];

            if (nova_data1 > nova_data2) {
                aux = nova_data1;
                nova_data1 = nova_data2;
                nova_data2 = aux;
            }
            data.filter((obj) => {
                const elemento = bindToDate(obj.day);
                if (elemento >= nova_data1 && elemento <= nova_data2) {
                    periodo.push(obj)
                    test = 1;
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
            let data = await dataService.readAgenda();
            let test = data.length;

            data = data.filter(obj => obj.day != req.params.day)
            if (test == data.length) {
                return res.status(400).json({ error: 'Não existe este registro!' });
            }
            dataService.saveAgenda(data);
            return res.send('Registro Deletado');

        } catch (error) {
            return res.status(400).json({ error: 'Erro ao tentar deletar.' });
        }
    });

    //CADASTRO
    app.post('/registerRule', async(req, res) => {
        try {
            const data = await dataService.readAgenda();
            let test = [];

            test = data.filter(obj => obj.day == req.body.day);
            if (test.length != 0) {
                return res.status(400).json({ error: 'Este item ja foi cadastrado anteriormente!' });
            }
            data.push(req.body);
            let retorno = await dataService.saveAgenda(data);
            return res.status(200).json({ sucesso: 'Registro cadastrado com suesso!' });

        } catch (error) {
            return res.status(400).json({ error: 'Erro ao tentar cadastrar' });
        }
    });
};


module.exports = agendaRoutes;