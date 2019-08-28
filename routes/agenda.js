const agendaRoutes = (app, fs) => {
    const dataService = require('./class');

    //lIST-ALL
    app.get('/sistemaDeAgendamento', async(req, res) => {
        try {
            const data = await dataService.redyAgenda();
            return res.send(data);

        } catch (error) {
            return res.status(400).send({error: 'Erro nos reistros da Agenda'});
        }
        
    });


    //LIST-BY-ID
    app.get('/sistemaDeAgendamento/:id', async(req, res) => {
        try {
            const busca = req.params.id;
            const data = await dataService.redyAgenda();
            var test = 0;
            data.forEach(function(elemento){
                var intervalo = elemento.intervals;
                intervalo.forEach(function(index){
                    if(index.id == busca){     
                        test = 1;
                        res.send(index);         
                    }                 
                });                                   
                 
            });
            if(test != 1){
                res.send('ID informado nao é validao');
            }
        } catch (error) {
            return res.status(400).send({error: 'Erro ao tentar localizar horario na agenda'});
        }
    });

    //LIST-BY-DAY
    app.get('/listByDay/:day', async(req, res) => {
        try {
            const busca = req.params.day;
            const data = await dataService.redyAgenda();
            var test = 0;

            data.forEach(function(elemento){
                if(elemento.day == busca){
                    test = 1; 
                    var horarios =  elemento.intervals; 
                    var response = {status: 'Horários disponíveis para esta data', horarios};                 
                    res.send(response);
                }                        
                
            });   
            if(test != 1){
                res.send('Todos horários estão livre para esta data, deseja agendar?');
            }            
        } catch (error) {
            return res.status(400).send({error: 'Erro ao tentar localizar evento na agenda'});
        }
    });

    app.get('/listAllByHours/:start&end', async(req, res) => {
        try {
            const busca1 = req.params.start;
            //const busca2 = req.params.end;
            const data = await dataService.redyAgenda();
            var test;
            console.log(busca1);
            /*
            data.forEach(function(elemento){
                var intervalo = elemento.intervals;
                intervalo.forEach(function(index){
                    if(index.start == busca.start &&  index.end == busca.end){     
                        test = 1;
                        console.log(index);         
                    }                 
                });                 
                
            });  
            res.send(busca1);
            if(test != 1){
                res.send('Todos horários estão livre para esta data, deseja agendar?');
            }    */        
        } catch (error) {
            return res.status(400).send({error: 'Erro ao tentar localizar evento na agenda'});
        }
    });

     //DELETE
     app.delete('/sistemaDeAgendamento/:id', async(req, res) => {
        try {
            const busca = req.params.id;
            const data = await dataService.redyAgenda();
            
           // 
           data.forEach(function(elemento){
               var intervalo = elemento.intervals;
               intervalo.forEach(function(index){
                   if(index.id === busca){     
                        res.send('evento deletado');                   
                   };                    
               });                                      
                
            });   
              

        } catch (error) {
            return res.status(400).send({error: 'Erro ao tentar cadastrar'});
        }
        
        
    });

    

    //CADASTRO
    app.post('/sistemaDeAgendamento', async(req, res) => {
        try {
            const { body: data } = req;
            const agendaAtual = await dataService.redyAgenda();
            agendaAtual.push(data);

            const retorno = await dataService.saveAgenda(agendaAtual);
            //var response = {status:'horário inserido na agenda!', resultado: retorno}
            return res.send('horário inserido na agenda!');

        } catch (error) {
            return res.status(400).send({error: 'Erro ao tentar cadastrar'});
        }
        
        
    });

};


module.exports = agendaRoutes;