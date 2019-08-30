module.exports = {

    testEquals: () => {
        var assert = require('assert');

        var atual = atual;
        var esperado = esperado;

        try {
            assert.equal(esperado, atual, "os valores devem ser iguais");
        } catch (e) {
            console.log(e);
        }
    }
}