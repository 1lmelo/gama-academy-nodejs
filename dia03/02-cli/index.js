//Para instalar pacotes externos usamos a ferramenta NPM ou YARN

//Para iniciar um projeto NODEJS, precisamos de um arquivo que define os pacotes
//Quando outrs pessoa precisa acessar seu codigo, esse arquivo lhe ensina como instalar ou quais 
//versões são suportadas


//para iniciar um projeto
//npm init
// -> -y => não precisa de yizard 


//para trabalhar com programas de linha de comando usaremos o Commander 
//npm install commander 
//--save (É O KCT)
//--save-dev -> Ferramentas como transpiladores, testes, ferramentas para diminuir o tamanho do arquivo

const Heroi = require('./src/heroiEntidade')

const Commander = require('commander')
const commander = Commander
    .version('v1.0')
    //definimos opções para utilizar de acordo com a versão
    .option('-c, --cadastrar ', 'Deve cadastrar um heroi')
    .option('-a, --atualizar [value]', 'Deve atualizar um heroi')
    .option('-r, --remover ', 'Deve remover um heroi')
    .option('-l, --listar ', 'Deve listar um heroi')


    .option('-n, --nome [value]', 'O nome do Heroi')
    .option('-i, --idade [value]', 'A idade do Heroi')
    .option('-I, --id [value]', 'O id do Heroi')
    .option('-p, --poder [value]', 'O poder do Heroi')
    .parse(process.argv);

function main (){
    const heroi = new Heroi(commander)

    // node index.js --cadastrar
    // node index.js -c
    /**
     * node index.js
     *  --nome Flash \
     *  --poder Velocidade \
     *  --idade 80 \
     *  --cadastrar
     */


    if(commander.cadastrar){
        console.log('chamou cadastrar!', heroi);
        return;
    }

    if(commander.listar){
        console.log('chamou listar!', heroi);
        return;
    }

    if(commander.remover){
        console.log('chamou remover!', heroi);
        return;
    }

    if(commander.atualizar){
        console.log('chamou atualizar!', heroi);
        return;
    }
}


main();
