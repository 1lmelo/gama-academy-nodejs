const Heroi = require("./src/heroiEntidade");

const HeroiDbArquivo = require('./src/heroiDbArquivo');

const Commander = require("commander");
const commander = Commander
  .version('v1.0')
  .option('-c, --cadastrar', 'Deve cadastrar um Heroi')
  .option('-i, --idade [value]', 'Idade do Heroi')
  .option('-I, --id [value]', 'ID do Heroi')
  .option('-p, --poder [value]', 'Poder do Heroi')
  .option('-n, --nome [value]', 'Nome do Heroi')
  .option('-a, --atualizar [value]', 'Atualiza o Heroi')
  .option('-r, --remover', 'Remove os Herois')
  .option('-l, --listar', 'Lista os Herois')
  .parse(process.argv);

async function main() {
  const heroi = new Heroi(commander);

  const heroiDbArquivo = new HeroiDbArquivo();

  // node index.js --nome Flash --poder Velocidade --idade 30 --cadastrar
  if (commander.cadastrar) {
     await heroiDbArquivo.cadastrar(heroi);
     console.log("Heroi cadastrado com sucesso!");
     return;
  }

  // node index.js --nome Fl --listar
  if (commander.listar) {
     let filtro = {};

     if(heroi.nome){
        filtro = { nome: heroi.nome }
     }

     const herois = await heroiDbArquivo.listar(filtro);
     console.log("Herois encontrados:\n", JSON.stringify(herois));
     return;
  }

  // node index.js --id 123456 --remover
  if (commander.remover) {
     const id = heroi.id;
     if(!id) {
        throw new Error("Voce deve informar um ID");
     }
     await heroiDbArquivo.remover(id)
     console.log("Heroi removido com sucesso!");
     return;
  }

  /**
   * node index.js
   * --nome Flash
   * --poder Forca
   * --id 
   * --atualizar
   * 
   */

  if (commander.atualizar) {
    const { id } = heroi
    //para nao atualizar o id, vamos remover
    delete heroi.id
    await HeroiDbArquivo.atualizar(id, heroi)
    console.log('Heroi atualizado com sucesso!')
    return;
  }
}

main();
