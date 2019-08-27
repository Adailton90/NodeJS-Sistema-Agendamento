const agendaRoutes = require('./agenda');

const appRouter = (app, fs) =>{
	app.get('/', (req, res) => {
        res.send('Bem Vindo ao Sistema de Agendamento!!');
    });
	agendaRoutes(app, fs);
};

module.exports = appRouter;