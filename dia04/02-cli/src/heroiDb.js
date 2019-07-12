//10.10.0.165
//vamos instalar o modulo do mongodb
//nom instal mongodb



//Para listar bancos de dados 
//show dbs 

//alteramos o contexto para o banco selecionado
//se não existir um novo dado ele criara automaticamente 
//use nomedoBanco 
//usecaracteres

//para listar tabelas
// show collections

//para inserir um novo item
//db.nomedacolecao.insert({
    //nome: 'teste',
    //idade: 123
//})
// db.nomedaColecao.find()
// db.nomedaColecao.find({nome: 'teste' })

// for(i = 0; i < 1000; i++){
//     db.nomedaColecao.insert({ nome: 'teste' +i})
// }
// db.nomedaColecao.find()


const {
    MongoClient
} = require('mongodb')


class HeroiDB{
    async connect(){
        //para conectar como mongodb local
        //localhost:27017/dbName
        const mongodbString = 'mongodb://localhost:27017/heroi'
        const mongoClient = new MongoClient(mongodbString, { useNewUrlParser: true })
        const connection = await mongoClient.connect()
        const heroiCollection = await connection .db('caracteres').collection('heroi')

        //adicionamos o heroi para a instancia da classe
        this.heroiCollection = heroiCollection;

    }

    constructor(){
        this.heroiCollection = {}
    }
    async cadastrar(heroi){
        return this.heroiCollection.insertOne(heroi)
    }

    async listar(filtro){
        return this.heroiCollection.find(filtro).toArray()
    }

    async remover(id){
        return this.heroiCollection.deleteOne({ _id: id})
    }

    async atualizar(idHeroi, heroiAtualizado){
        //o primeiro parametro é o filtro
        //o segundo o que substituira o arquivo
        //se esquecer de mandar o operador VAI PERDER
        //$set: dado = ESQUECEU O SET = VAI PERDER
        return this.heroiCollection.update({
            _id: idHeroi
        }, {
            $set: heroiAtualizado
        })
    }
}


//exportamos o modulo
module.exports = HeroiDB;


//LEMBRAR DE COMENTAR
//     async function main(){
//         const heroi = new HeroiDB()
//         const { heroiCollection } = await heroi.connect()
//         await heroiCollection.insertOne({
//             nome: 'Flash',
//             poder: 'Velocidade',
//             idade: 20
//         })

//         const items = await heroiCollection.find().toArray()
//         console.log('items', items)
//     }

// main()