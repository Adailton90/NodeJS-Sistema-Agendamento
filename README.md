# NodeJS-Sistema-Agendamento

Este projeto se trata de uma API REST para facilitar o gerenciamento de horários de uma "clínica"!
Os dados cadastrados são armazenados em u marquivo ".JSON", <b>os
endpoints podem ser usados através de um clinet rest como Postman (https://www.getpostman.com/) collection ou por qualquer outro sistema capaz de consumir API REST.

<h2>Relação de requisições.</h3>

<b><h3>Requisição: /listAll</h3></b> 

Através do verbo http 'GET' a requisção /listALL retorna todos dias e horários salvos no arquivo 'agenda.json' que esta dentra da pasta 'data' do projeto.

<b><h3>Requisição: /listByDay/:day</h3></b> 

Através do verbo http 'GET' a requisição /listByDay/:day retorna todos os intervalos de horário disponíveis para atendimento salvos no arquivo 'agenda.json' baseado na data (Ex.:23-10-2019) passada no campo "VALUE" da aba "Params" do Posman.

<b><h3>Requisição: /listAllByHours/:start/:end</h3></b> 

Através do verbo http 'GET' a requisição /listAllByHours/:start/ retorna todos os dias disponíveis para atendimento salvos no arquivo 'agenda.json' baseado em um intervalo de horário(Ex.: de 13:30 as 14:40) passados nos campos "VALUE" da aba "Params" do Posman, sendo "start" a hora inicial e "end" a hora final do intervalo.


<b><h3>Requisição: /listDateRanges/:data1/:data2</h3></b>

Através do verbo http 'GET' a requisição /listDateRanges/:data1/:data2 retorna os dias e horários disponíveis salvos no arquivo 'agenda.json' dentro de um intervalo de datas(Ex.: de 20-10-2019 a 25-10-2019) passadas nos campos "VALUE" da aba "Params" do Posman, sendo "data1" a data inicial e "data2" a data final.

<b><h3>Requisição: /deleteRegister/:day/:start/:end</h3></b>

Através do verbo http 'DELETE' a requisição /deleteRegister/:day deleta um registro salvo no arquivo 'agenda.json baseado na data passada no campo "VALUE" da aba "Params" do Posman, sendo "day" a data.

<b><h3>Requisição: /registerRule</h3></b>

Através do verbo http 'POST' a requisição /registerRule é salvo o registro no arquivo 'agenda.json' baseado nos parametros passados na aba "Body" preenchendo no formato JSON as chaves e valores. <br>Exemplo.:<br>{
        "day": "02-10-2019",
        "intervals": [
            {
                "start": "15:37",
                "end": "5:00"
            },
            {
                "id": "4",
                "start": "4:10",
                "end": "5:30"
            }
        ]
    } .
