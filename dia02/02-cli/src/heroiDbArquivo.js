//importando modulo para trabalhar com arquivo
const {
    exists,
    promises: {
        writeFile,
        readFile,
    },
} = require('fs');

// o existis não existe na promises api, precisamos converter manualmente
//O existes não segue o padrão callback, então não conseguimos usar o primisify nele 

// 1 importar o exists padrao
// 2 converter para promisses 

const existsAsync = (parametro) => new Promise((resolve, reject) => {
    return exists(parametro, (existe) => resolve(existe))
})

class HeroiDbArquivo {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async _obterArquivo() {
        //verificando se o arquivo existe ante de acessar seu conteudo 
        if (! await existsAsync(this.NOME_ARQUIVO)) {
            return [];
        }

        //lemos o arquivo no direto e convertemos para JSON
        const texto = await readFile(this.NOME_ARQUIVO);
        return JSON.parse(texto);

    }

    async _escreverArquivo(dado){
        //Pegamos o dado no formato objeto js
        //e convertemos para texto com a funcão abaixo
        const dadoTexto = JSON.stringify(dado);
        await  writeFile(this.NOME_ARQUIVO, dadoTexto)
        return;
    }


    async cadastrar(heroi) {
        //obtemos os herois
        const herois = await this.listar();

        //criar um id baseado na hora
        heroi.id = Date.now()
        herois.push(heroi);
        await this._escreverArquivo(herois)
        return;
    }


    //vamos definir que o filtro é opcional 
   async listar(filtro = {}) {
       //caso o cliente não tiver dados retornamos todos os idens
       if(!Object.keys(filtro).length){
           return await this._obterArquivo()
        }
           
           const dados = await this._obterArquivo();
           
           //para entrar em cada item da lista
           //para cada item, chamarem uma função
           //caso a asserção for verdadeira ele continua no array
           
           const dadosFiltrados = dados.filter(heroi => {
               return ~heroi.nome.toLowerCase()
                    .indexOf(filtro.nome.toLowerCase());
                    
                });
               
            
            
            return dadosFiltrados;                               
            
         }
    
    async remover(idHeroi){
        const dados = await this._obterArquivo()
        const dadosFiltrados = dados.filter(( { id } ) => id !== parseInt(idHeroi))

        return await this._escreverArquivo(dadosFiltrados)
    }

        
    }

// //testamos a classe
// //LEMBRAR DE COMENTAR DEPOIS

// async function main() {  
    
//     const minhaClasse = new HeroiDbArquivo();
//     // await minhaClasse.cadastrar({
//     //     nome: 'Flash',
//     //     poder: 'Velocidade'
//     // });
//     const dado = await minhaClasse.listar({
//         nome: 'Fl'
//     });
//     // console.log('dado', dado)
//     return dado;
// }

// main();

module.exports = HeroiDbArquivo;