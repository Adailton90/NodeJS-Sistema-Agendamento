const fs = require('fs');
const agendaPath = './data/agenda.json';

module.exports = {
    saveAgenda: (data) => {
        return new Promise((resolve, reject) => {
            try {
                fs.writeFile(
                    agendaPath,
                    JSON.stringify(data), 'utf8',
                    (err) => {
                        if (err)
                            reject(null);
                        resolve(true);
                    });
            } catch (error) {
                reject(error);
            }
        });
    },

    redyAgenda: () => {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(agendaPath, (err, data) => {
                    if (!err)
                        resolve(JSON.parse(data));
                    reject(null);
                });
            } catch (error) {
                reject(error);
            }

        })

    }
}