const Heroi = require("./src/heroiEntidade");

const HeroiDbArquivo = require('./src/heroiDbArquivo');
const HeroiMongoDB = require('./src/heroiDb');

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
    try {
        const heroi = new Heroi(commander);
        const dbMongo = new HeroiMongoDB()
        await dbMongo.connect()
        console.log('mongo conectado!')

        // node index.js --nome Flash --poder Velocidade --idade 30 --cadastrar
        if (commander.cadastrar) {
            await dbMongo.cadastrar(heroi);
            console.log("Heroi cadastrado com sucesso!");
            //falamos para o node que terminamos nossa tarefa 
            process.exit(0)
            return;
        }

        // node index.js --nome Fl --listar
        if (commander.listar) {
      
            const herois = await dbMongo.listar(filtro);
            console.log("Herois encontrados:\n", JSON.stringify(herois));
            process.exit(0)
            return;
        }

        // node index.js --id 123456 --remover
        if (commander.remover) {
            const id = heroi._id;
            if (!id) {
                throw new Error("Voce deve informar um ID");
            }
            await dbMongo.remover(id)
            console.log("Heroi removido com sucesso!");
            process.exit(0)
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
            const { _id } = heroi
            if(!_id){
                throw new Error('0 id é obrigatorio')
            }
            ////para nao atualizar com o _id
            delete heroi._id
            //gambeta do bem pra tirar as chaves undefined
            const heroiFinal = JSON.parse(JSON.stringify(heroi))
            await dbMongo.atualizar(_id, heroiFinal)
            console.log('Heroi atualizado com sucesso!')
            process.exit(0)
            return;
        }

    } catch (error) {
        console.error('DEU RUIM', error)
        process.exit(0)
    }
}

main();
