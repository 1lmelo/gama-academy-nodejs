/*Vimos que o callback FUNCIONA, mas é mais complicado de manipular conforme a aplicação crescer. 

Para manipular funções de força assincrona temos a classe Promise

-> Trabalhos com estados
    -> Toda alteração retorna uma função

-> Quando criamos uma Promise
    -> Pending
-> Quando temos um erro
    -> Rejected
-> Quando temos um sucesso
    -> Sucess / Fullfiled
-> Uma promise sempre retorna outra Promise

promise = new Promise(function (resolve, reject) {
    return reject(VALOR) => erro
    return resolve(VALOR) => sucesso
})

para capturar resultados
promise
    -> resultado -> .then
    -> error -> .catch
    -> finally -> .finally
*/

// importamos o modulo interno do Node.js
// para converter callbacks para Promises
// IMPORTANTE: Caso a função que tenha callback não seguir a convenção (erro, sucesso), não vai conseguir realizar a conversao
//  const util = require('util')
//  util.promisify
//  util.log
//  util.isString
// para extrair somente o necessario
// de um OBJETO-> {nomeDaChave} = objeto
// Tecnica chama DESTRUCTURING
const { promisify } = require('util')

// convertemos a função obterTelefone
const obterTelefoneAsync = promisify(obterTelefone)

function buscarClientes(id) {
   // para simular uma função assincrona, usamos o setTimeout
   // retornamos um objeto Promise
   // para resolver depois
   return new Promise(function (resolve, reject) {
       setTimeout(function () {
           return resolve({
               id: id,
               nome: 'João da silva',
               idade: 70
           })
       }, 20)
   })

}

function buscarEndereco(idCliente) {
   return new Promise(function (resolve, reject) {
       setTimeout(function () {
           return resolve({
               id: 1,
               rua: 'dos bobos',
               numero: 0
           })
       }, 20);
   })
}

function obterTelefone(idCliente, callback) {
   setTimeout(() => {
       return callback(null, {
           id: 0,
           ddd: 11,
           numero: '4002-8900'
       })
   }, 30);
}

async function main() {
   try {
       const cliente = await buscarClientes("João");
       // const { rua, numero } = await buscarEndereco(cliente.id);
       // const telefone = await obterTelefoneAsync(cliente.id);
       // Com Promise.all executamos funcoes em 'paralelo' para melhorar performance
       const telefonePromise = obterTelefoneAsync(cliente.id)
       const enderecoPromise = buscarEndereco(cliente.id)

       const [telefone, endereco] = await Promise.all([telefonePromise, enderecoPromise]);


       console.log(`
       Nome: ${cliente.nome},
       Endereco: ${endereco.rua}, ${endereco.numero},
       Telefone: (${telefone.ddd}) ${telefone.numero}
       `)
   } catch (error) {
       console.error("DEU RUIM: " + error)
   }
}
main()