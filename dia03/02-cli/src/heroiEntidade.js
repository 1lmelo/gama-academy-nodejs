const {ObjectID} = require('mongodb')

class Heroi {
    constructor({ id, nome, idade, poder}){
        //caso o id venha preenchido, convertemos para o formato do bd e caso não venha mantemos o padrao 
        this._id = id ? ObjectID(id) : id 
        this.nome = nome
        this.idade = idade
        this.poder = poder
    }
}

//exportamos a classe para o MUNDO

module.exports = Heroi