
# Recados

Foi uma honra ter participado da aula com vocês e espero que tenham aprendido bastante coisa. O conteúdo foi bem extenso, mas não se preocupem. Só seguir o passo a passo desse README que tudo vai se resolver no seu tempo. Não deixem te fazer o exercício dessa aula pois é de extrema importância. A descrição do exercício de casa está no final da página.

**Atenção**: Peço que para quem estiver lendo esse recado, compartilhe no Slack de vocês para que todas tenham acesso a essas mensagens importantes abaixo:

* Subi a pasta `api-projeto-mongo` com a api desse README já pronta (a que fizemos em aula) para utilizarem como modelo.
* Caso você tenha tido qualquer problema para configurar/instalar o mongo na sua máquina, não se preocupe. Criei um banco de dados virtual e o configurei no projeto que está na pasta `api-projeto-mongo`. Basta ir no arquivo `app.js` e descomentar a conexão que é feita com esse banco virtual para você passar a usar ele ;) Já testei na minha máquina e está funcionando \o/ Então pode desenvolver normalmente na api. Quando for criar seu database collections e tudo mais, sem problemas, você desenvolvendo o código da api, ele já vai fazer isso para você automaticamente (todas essas criações) sem você precisar ir lá no banco pelo robo 3t. Se tiver qualquer dúvida ou problema me mande um email para eu poder ajudar: `vanessamjansen@gmail.com`. Ps: alterei a senha do banco virtual que eu havia passado para `reprograma12`, caso precise.

Ps: Apenas para alinhar, na quarta-feira vou apagar o login e senha da url de conexão com o **mongo online** pois é uma *péssima prática* deixar exposto assim como deixei, conforme comentei em aula. Mas precisei deixar assim para que quem precisar consiga realizar a conexão.

-----

# Integração do Banco de Dados Mongo com API

## API Base

Para integrarmos o banco de dados mongo com uma api, primeiro vamos precisar de uma api. Vamos utilizar a mesma API da aula da semana 11. Deixei a mesma pronta na pasta `api-projeto-base`.

Com esse projeto na sua máquina, você deve inicialmente, via terminal, navegar até a pasta do projeto e rodar `npm install` para instalar as dependências necessárias do projeto. Ao rodar esse comando, a pasta `node_modules` será gerada automaticamente.

Com isso podemos rodar nossa api utilizando `npm start`.

### Testando a API Base via Postman

Com o nosso servidor rodando com a api, podemos testar as rotas da nossa API utilizando o Postman, para ver como ela está funcionando. Para facilitar, já deixei uma collection do Postman pronta na pasta `docs` do projeto base. Dentro dessa pasta você irá encontrar o arquivo *Reprograma-Trip.postman_collection.json*

Abra o programa Postman no seu computador e clique em "Importar":

![postman-import](https://i.imgur.com/CTrziuX.png)

Com isso irá aparecer uma janela onde você deverá importar um arquivo. Selecione o arquivo *Reprograma-Trip.postman_collection.json* e o importe para o postman. Feito isso a collection com todas as rotas da nossa api da aula da semana 11 estarão disponíveis para utilizarmos e testarmos.

## Banco de Dados na API

Se repararmos no nosso código da nossa api base, nossas informações estão sendos salvas em arquivos json dentro da pasta models. Temos o arquivo `passengers.json` que guarda informações de passageiros e o arquivo `travels.json` que guardam informações de viagens. Podemos evoluir nosso código e ao invés de utilizarmos arquivos para gravar nossos dados, por que não utilizar um banco de dados? E já que nossa api já está preparada para trabalhar com json, por que não utilizar um banco de dados de documentos Mongo onde as informações também ficam em json? :)

### Novo Database

Lembra que na aula passada da semana 12 aprendemos o que era um database, uma collection e documentos? Vamos então criar um novo database chamado `reprograma-trip` para começarmos a trabalhar. Lembra do comando que usamos para criar um novo database?

```
use reprograma-trip
```

### Novas Collections

Como mencionei anteriormente, na nossa api hoje temos dois arquivos dentro da pasta `models`: o arquivo `passengers.json` e o arquivo `travels.json`. Concorda que faz todo sentido criarmos uma collection `passengers` e uma collection `travels` no nosso database `reprograma-trip` para armazenarmos essas informações? Então vamos criá-las com os seguintes comandos:

```
db.createCollection('travels');
db.createCollection('passengers');
```

### Novos Documentos

Com nossas duas collections criadas e vazias, vamos inserir novos registros! Para isso utilize os comandos abaixo:

* Inserir passageiros:
```
db.passengers.insertMany([
    {
        "id": "F4fBusex3Kl6Di6GjABba7gK0",
        "name": "Joana Vieira",
        "email": "joanavieira@email.com",
        "documentNumber": "195737948",
        "travelId": "kD7fmA9JykldrmpJnusr"
    },
    {
        "id": "1cHefaj2axkp0EqHb0lfCqKus",
        "name": "Sophie Nascimento",
        "email": "sophienascimento@email.com",
        "documentNumber": "040080063",
        "travelId": "kD7fmA9JykldrmpJnusr"
    },
    {
        "id": "dzf6LDdqe5LBpudGErhkBCkk1",
        "name": "Maria Julia Oliveira",
        "email": "mariaoliveira@email.com",
        "documentNumber": "184553967",
        "travelId": "kD7fmA9JykldrmpJnusr"
    },
    {
        "id": "8jE_4qJFoFzsC3L4q9o5gzia1",
        "name": "Davi da Mata",
        "email": "davimata@email.com",
        "documentNumber": "208164566",
        "travelId": "kD7fmA9JykldrmpJnusr"
    },
    {
        "id": "uD15jjn40pk5lnp6EGcrqI4bs",
        "name": "Maria Clara Costa",
        "email": "mariacosta@email.com",
        "documentNumber": "280331726",
        "travelId": "kD7fmA9JykldrmpJnusr"
    },
    {
        "id": "0mi9506yivAGwKgvuh4",
        "name": "Paula Reis",
        "email": "paulinhareis@email.com",
        "documentNumber": "8473620492",
        "travelId": "kD7fmA9JykldrmpJnusr"
    },
    {
        "id": "wBqe97Ha1dyh5HtaEvawu5kEz",
        "name": "Arthur Moura",
        "email": "arthurmoura@email.com",
        "documentNumber": "387206719",
        "travelId": "9sbaspCe7oJvy-GKkjIL"
    },
    {
        "id": "E0IypgHI3HoE_kz0C41bEmxva",
        "name": "Maria Clara Dias",
        "email": "mariaclaradias@email.com",
        "documentNumber": "692461823",
        "travelId": "9sbaspCe7oJvy-GKkjIL"
    },
    {
        "id": "DBxl0rpBL9E_f89IGuAEeiF2w",
        "name": "Isabelly da Cunha",
        "email": "isabellycunha@email.com",
        "documentNumber": "120815289",
        "travelId": "9sbaspCe7oJvy-GKkjIL"
    },
    {
        "id": "tDxpl08frs88-jbjwb4aFhxgC",
        "name": "Enzo Gabriel da Rocha",
        "email": "enzorocha@email.com",
        "documentNumber": "721679670",
        "travelId": "9sbaspCe7oJvy-GKkjIL"
    },
    {
        "id": "snuEFfjq2i_mJbqi6_q4Gk4tb",
        "name": "Maria Vitória Martins",
        "email": "vitoriamartins@email.com",
        "documentNumber": "696204275",
        "travelId": "9sbaspCe7oJvy-GKkjIL"
    },
    {
        "id": "gvIlAfFiCbt5d9p5vu3s046He",
        "name": "Thales da Rosa",
        "email": "thalesrosa@email.com",
        "documentNumber": "145969881",
        "travelId": "jnHbd4mshsHte2wujfyI"
    },
    {
        "id": "FkfeFvr0p5xGhjLsGsp996F0F",
        "name": "Calebe Fernandes",
        "email": "calebefernandes@email.com",
        "documentNumber": "067503009",
        "travelId": "jnHbd4mshsHte2wujfyI"
    },
    {
        "id": "3Jti_C2EAJ0Clf3ppeEIJb1Bb",
        "name": "João Carvalho",
        "email": "joaocarvalho@email.com",
        "documentNumber": "218256813",
        "travelId": "jnHbd4mshsHte2wujfyI"
    },
    {
        "id": "dKzq4xh6hg9wJkJCv5uF06538",
        "name": "Laís Nascimento",
        "email": "laisnascimento@email.com",
        "documentNumber": "544412935",
        "travelId": "jnHbd4mshsHte2wujfyI"
    },
    {
        "id": "AluikBnfwH-JIKbdaxbB3DuA5",
        "name": "Vitor Hugo Pereira",
        "email": "vitorhugopereira@email.com",
        "documentNumber": "978479046",
        "travelId": "jnHbd4mshsHte2wujfyI"
    },
    {
        "id": "dagr4lqbwLhLvCtnyjqrv624B",
        "name": "Marcos Vinicius Moraes",
        "email": "marcosmoraes@email.com",
        "documentNumber": "962516161",
        "travelId": "an78aBc2u00D9qlartwv"
    },
    {
        "id": "gJaqeHoik8BHKdz0H5CBoLa0B",
        "name": "Alícia Correia",
        "email": "aliciacorreira@email.com",
        "documentNumber": "694592814",
        "travelId": "an78aBc2u00D9qlartwv"
    },
    {
        "id": "7Lqf0kfxvflz_a3ik6fEaeGqF",
        "name": "Isabella Moreira",
        "email": "isabellamoreira@email.com",
        "documentNumber": "480521741",
        "travelId": "an78aBc2u00D9qlartwv"
    },
    {
        "id": "bkh4yuyofdkwBf1dEpg5Ld3ma",
        "name": "Murilo Teixeira",
        "email": "muriloteixeira@email.com",
        "documentNumber": "691878892",
        "travelId": "an78aBc2u00D9qlartwv"
    },
    {
        "id": "bIIvKsHellbs61kKxFE27HAIb",
        "name": "Diogo Cardoso",
        "email": "diogocardoso@email.com",
        "documentNumber": "355588241",
        "travelId": "an78aBc2u00D9qlartwv"
    },
    {
        "id": "Xc1eC1jFir05cc742sD6zb2oq",
        "name": "Eloah das Neves",
        "email": "eloahneves @email.com",
        "documentNumber": "665853451",
        "travelId": "mLhzx89FdCq0lK54luyg"
    },
    {
        "id": "FzvZXlF2uwqltYzB7s93plk1b",
        "name": "João Santos",
        "email": "joaosantos@email.com",
        "documentNumber": "784150983",
        "travelId": "mLhzx89FdCq0lK54luyg"
    },
    {
        "id": "fjlD4Aok9mckDCi6u40t10Ct3",
        "name": "Mirella Costa",
        "email": "mirellacosta@email.com",
        "documentNumber": "375038047",
        "travelId": "mLhzx89FdCq0lK54luyg"
    },
    {
        "id": "BiunrDBCeh9cnhrodd39qv0mB",
        "name": "Maria Eduarda Carvalho",
        "email": "maducarvalho@email.com",
        "documentNumber": "812337953",
        "travelId": "mLhzx89FdCq0lK54luyg"
    },
    {
        "id": "ADjf3vYbXDFbs1fnq0XEXvkkq",
        "name": "Mariana Farias",
        "email": "marifarias@email.com",
        "documentNumber": "881695664",
        "travelId": "mLhzx89FdCq0lK54luyg"
    }
]);
```

* Inserir Viagens:

```
db.travels.insertMany([{
        "id": "jIan-LdcKJa2hj2zJ1m_",
        "durationPrediction": "08:27min",
        "stops": "1",
        "derpature": {
            "local": "São Paulo",
            "time": "Nov 02 2021 22:00:00"
        },
        "destination": {
            "local": "Rio de Janeiro",
            "time": "Nov 03 2021 06:27:00"
        },
        "busInfos": {
            "registerNumber": "979620",
            "capacity": "40"
        },
        "driverInfos": {
            "id": "iIt_aijKGGf-wibaF7i12m-hs",
            "name": "Gustavo Henrique Melo",
            "license": "41713-4219"
        },
        "passengersInfos": [
            {
                "id": "EfL80lA1y3gstpclKL9w-g-3u",
                "name": "Maria Cecília da Conceição",
                "email": "mariaconceicao@email.com",
                "documentNumber": "899439400"
            },
            {
                "id": "3bq-Kkvf8Cd3Ks08p_zhwj_gl",
                "name": "Catarina Mendes",
                "email": "catarinamendes@email.com",
                "documentNumber": "933097178"
            },
            {
                "id": "cedinAHGhyjjwGKulty_q1GqD",
                "name": "Pietro Pires",
                "email": "pietropires@email.com",
                "documentNumber": "974685470"
            },
            {
                "id": "p05z6iL-_hooI-9qxAe4wHFpJ",
                "name": "André da Luz",
                "email": "andreluz@email.com",
                "documentNumber": "547679013"
            },
            {
                "id": "L9oxoChtuLGhFzlhxwl6C190x",
                "name": "Camila Fernandes",
                "email": "camilafernandes@email.com",
                "documentNumber": "561205047"
            },
            {
                "id": "153p9rtjpa",
                "name": "Josélia Catarina",
                "email": "joseliacatarina@email.com",
                "documentNumber": "984763498",
                "travelId": "jIan-LdcKJa2hj2zJ1m_"
            },
            {
                "id": "vogf5o1hib8",
                "name": "Ana Catarina",
                "email": "anacatarina@email.com",
                "documentNumber": "4839483290",
                "travelId": "jIan-LdcKJa2hj2zJ1m_"
            },
            {
                "id": "1rn2v8moqug",
                "name": "Julia Catarina",
                "email": "juliacatarina@email.com",
                "documentNumber": "1923012937",
                "travelId": "jIan-LdcKJa2hj2zJ1m_"
            }
        ]
    },
    {
        "id": "xdb4oK_G9lkIAK7KFJD4",
        "durationPrediction": "08:10min",
        "stops": "1",
        "derpature": {
            "local": "Rio de Janeiro",
            "time": "Ago 10 2021 12:00:00"
        },
        "destination": {
            "local": "São Paulo",
            "time": "Ago 10 2021 20:10:00"
        },
        "busInfos": {
            "registerNumber": "2095852",
            "capacity": "50"
        },
        "driverInfos": {
            "id": "d5tezpEc9lk5uut6EDHcxuDfH",
            "name": "Emanuel Alves",
            "license": "8816-05419"
        },
        "passengersInfos": [
            {
                "id": "mhIf_2bmAxgx5nj7iIun6bzi",
                "name": "Henrique Barros",
                "email": "henriquebarros@email.com",
                "documentNumber": "528527554"
            },
            {
                "id": "7KBI7sHmkok9LkK3xo2_t_njr",
                "name": "Ana Clara Farias",
                "email": "anaclarafarias@email.com",
                "documentNumber": "528527554"
            },
            {
                "id": "hE0HJzshDGgC5gw_IlH4sBsdt",
                "name": "Luana Mendes",
                "email": "luanamendes@email.com",
                "documentNumber": "429201923"
            },
            {
                "id": "0_vrDqnCI49c_rBlK9g-dtmLy",
                "name": "Rebeca Pires",
                "email": "rebecapires@email.com",
                "documentNumber": "110633681"
            },
            {
                "id": "1g1bbycDuH3aC2GL4G6vGvEwH",
                "name": "Davi Luiz da Mota",
                "email": "daviluizdamota@email.com",
                "documentNumber": "347626322"
            }
        ]
    },
    {
        "id": "kD7fmA9JykldrmpJnusr",
        "durationPrediction": "52:00min",
        "stops": "4",
        "derpature": {
            "local": "Recife",
            "time": "Set 20 2021 10:00:00"
        },
        "destination": {
            "local": "São Paulo",
            "time": "Set 22 2021 14:38:00"
        },
        "busInfos": {
            "registerNumber": "9936939",
            "capacity": "50"
        },
        "driverInfos": {
            "id": "ADofCi2zC0kycwJj4rAA245ID",
            "name": "João Miguel Rodrigues",
            "license": "520-23-897"
        },
        "passengersInfos": [
            {
                "id": "F4fBusex3Kl6Di6GjABba7gK0",
                "name": "Joana Vieira",
                "email": "joanavieira@email.com",
                "documentNumber": "195737948"
            },
            {
                "id": "1cHefaj2axkp0EqHb0lfCqKus",
                "name": "Sophie Nascimento",
                "email": "sophienascimento@email.com",
                "documentNumber": "040080063"
            },
            {
                "id": "dzf6LDdqe5LBpudGErhkBCkk1",
                "name": "Maria Julia Oliveira",
                "email": "mariaoliveira@email.com",
                "documentNumber": "184553967"
            },
            {
                "id": "8jE_4qJFoFzsC3L4q9o5gzia1",
                "name": "Davi da Mata",
                "email": "davimata@email.com",
                "documentNumber": "208164566"
            },
            {
                "id": "uD15jjn40pk5lnp6EGcrqI4bs",
                "name": "Maria Clara Costa",
                "email": "mariacosta@email.com",
                "documentNumber": "280331726"
            }
        ]
    },
    {
        "id": "9sbaspCe7oJvy-GKkjIL",
        "durationPrediction": "52:27min",
        "stops": "4",
        "derpature": {
            "local": "São Paulo",
            "time": "Out 24 2021 22:00:00"
        },
        "destination": {
            "local": "Recife",
            "time": "Out 27 2021 02:27:00"
        },
        "busInfos": {
            "registerNumber": "8945740",
            "capacity": "55"
        },
        "driverInfos": {
            "id": "Ftfuuh4_-6Aa3pa3vbgqxFiLG",
            "name": "Marcos Vinicius Rodrigues",
            "license": "83019-7529"
        },
        "passengersInfos": [
            {
                "id": "wBqe97Ha1dyh5HtaEvawu5kEz",
                "name": "Arthur Moura",
                "email": "arthurmoura@email.com",
                "documentNumber": "387206719"
            },
            {
                "id": "E0IypgHI3HoE_kz0C41bEmxva",
                "name": "Maria Clara Dias",
                "email": "mariaclaradias@email.com",
                "documentNumber": "692461823"
            },
            {
                "id": "DBxl0rpBL9E_f89IGuAEeiF2w",
                "name": "Isabelly da Cunha",
                "email": "isabellycunha@email.com",
                "documentNumber": "120815289"
            },
            {
                "id": "tDxpl08frs88-jbjwb4aFhxgC",
                "name": "Enzo Gabriel da Rocha",
                "email": "enzorocha@email.com",
                "documentNumber": "721679670"
            },
            {
                "id": "snuEFfjq2i_mJbqi6_q4Gk4tb",
                "name": "Maria Vitória Martins",
                "email": "vitoriamartins@email.com",
                "documentNumber": "696204275"
            }
        ]
    },
    {
        "id": "jnHbd4mshsHte2wujfyI",
        "durationPrediction": "06:33min",
        "stops": "1",
        "derpature": {
            "local": "São Paulo",
            "time": "Jan 02 2022 22:00:00"
        },
        "destination": {
            "local": "Santa Cataria",
            "time": "Jan 03 2022 05:13:00"
        },
        "busInfos": {
            "registerNumber": "1242797",
            "capacity": "45"
        },
        "driverInfos": {
            "id": "bKDx6zaFtugIu7mlh4FpDLH1C",
            "name": "Alexandre Oliveira",
            "license": "2574-00410"
        },
        "passengersInfos": [
            {
                "id": "gvIlAfFiCbt5d9p5vu3s046He",
                "name": "Thales da Rosa",
                "email": "thalesrosa@email.com",
                "documentNumber": "145969881"
            },
            {
                "id": "FkfeFvr0p5xGhjLsGsp996F0F",
                "name": "Calebe Fernandes",
                "email": "calebefernandes@email.com",
                "documentNumber": "067503009"
            },
            {
                "id": "3Jti_C2EAJ0Clf3ppeEIJb1Bb",
                "name": "João Carvalho",
                "email": "joaocarvalho@email.com",
                "documentNumber": "218256813"
            },
            {
                "id": "dKzq4xh6hg9wJkJCv5uF06538",
                "name": "Laís Nascimento",
                "email": "laisnascimento@email.com",
                "documentNumber": "544412935"
            },
            {
                "id": "AluikBnfwH-JIKbdaxbB3DuA5",
                "name": "Vitor Hugo Pereira",
                "email": "vitorhugopereira@email.com",
                "documentNumber": "978479046"
            }
        ]
    }
]);
```

Com o banco de dados populado, caso você rode a consulta `db.getCollection('passengers').find({})` e a consulta `db.getCollection('travels').find({})` você verá que a mesma retornará informações, o que antes não acontecia com essas collections vazias.

## Banco de Dados populado, e agora?

Agora que temos nossa base de dados pronta para poder ser utilizada pela api, podemos começar a fazer alterações na mesma para parar de trabalhar com arquivos json e passar olhar para o nosso banco de dados que acabamos de preparar.

## MVC

Antes de começarmos as nossas alterações no código, vamos fixar o conceito de MCV:

![mvc](https://dkrn4sk0rn31v.cloudfront.net/uploads/2020/06/diagramaMVC.png)

A arquitetura padrão MVC é composta por Model, View e Controller, que representam:

```
    Model: parte da aplicação que que terá os contratos de para conexão com os bancos de dados ou com outras estruturas relacionadas.
    View: basicamente são as estruturas que o cliente verá, tudo aquilo que estará disponível para interação com o cliente.
    Controller: a lógica da aplicação, essa por sua vez faz a junção, entre o model e a view, pegando dados através dos models e direcionando-os a view, para interação com os usuários.
```

No nosso servidor, não teremos a estrutura View, porém teremos as nossas rotas que conterão as estruturas da nossa url para a chamada dos métodos HTTP. Agora que recordamos o conceito de MVC, podemos começar a fazer a nossa integração da API com o banco de dados, mas primeiramente precisamos conhecer o **Mongoose**.

## Mongoose

É a biblioteca do NodeJs que permite conexão com o banco de dados do MongoDB, criar modelos e esquemas, bem como utilizar comandos/consultas do mongo para manipulação dos dados.

![mongoose](https://miro.medium.com/max/594/1*vK4MHL_jpKKmUFGjE5H9jw.png)

Instalação do mongoose no projeto:

```
npm install mongoose --save
```

Após realizar a instalação, iremos utilizá-lo criando uma instância através da pasta app.js do projeto, desta forma:

```
const mongoose = require("mongoose")
```

Logo em seguida, precisaremos criar a string de conexão com o banco de dados Mongo:

```
//String de conexao
mongoose.connect("mongodb://localhost:27017/reprograma-trip", { // no nosso caso nao temos usuario e senha, mas caso tivessemos poderiamos seguir esse formato: mongodb://username:password@localhost:27017/reprograma-trip
    useNewUrlParser: true, // define que vai utilizar a nova url parse da string de conexao
    useUnifiedTopology: true // define que vai utilizar o novo mecanismo de gerenciamento de conexao do driver do mongodb
});
```
**Atenção**: Caso você **não tenha um mongo na sua máquina rodando** e precise usar o banco virtual que criei, utilize o código abaixo ao invés do acima:
```
mongoose.connect("mongodb://alunareprograma:reprograma12@cluster0-shard-00-00.kuokc.mongodb.net:27017,cluster0-shard-00-01.kuokc.mongodb.net:27017,cluster0-shard-00-02.kuokc.mongodb.net:27017/reprograma-trip?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true, // define que vai utilizar a nova url parse da string de conexao
    useUnifiedTopology: true // define que vai utilizar o novo mecanismo de gerenciamento de conexao do driver do mongodb
});
```

Agora que temos a conexão feita pelo `mongoose.connect` podemos colocar as tratativas abaixo, para que consigamos ter uma visibilidade de erros caso a conexão com o banco de dados falhe:

```
//Conexao com o mongo
let db = mongoose.connection;

//Captura de erro ou sucesso na conexão
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function () {
    console.log("conexão feita com sucesso.")
})
```
Agora podemos testar se a nossa conexão foi feita com sucesso dando um `npm start` no terminal e vendo se ele vai subir se conectando no banco de dados.

## Alterando os arquivos json para consultar direto do Banco de Dados

### Criação de Schemas

Com a conexão com o banco de dados feita na nossa api, podemos parar de consumir os arquivos json e fazer a comunicação direta com o banco de dados. Primeiro, vamos na pasta `models` onde estão nossos json e vamos criar dois novos arquivos: `passengers.js` e `travels.js`.

* No nosso novo arquivo `passengers` vamos criar o que chamamos de schema. Esse schema serve para validação e tipagem das propriedades do nosso documento:

```
const mongoose = require('mongoose');

//estrutura do seu model (atributos da sua entidade)
const passengersSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    email: { type: String },
    documentNumber: { type: String },
    travelId: { type: String }
}, {
    //gera por padrão uma versão para cada atualização do documento
    versionKey: false
});

// atribuindo o esquema a uma collection
// estou definindo o nome da collection que irei salvar no banco
const passengers = mongoose.model('passengers', passengersSchema);

// exportar o model para ser utilizado
module.exports = passengers;
```
* No nosso novo arquivo `travels.js` vamos também criar o schema:

```
const mongoose = require('mongoose');

//estrutura do seu model (atributos da sua entidade)
const travelsSchema = new mongoose.Schema({
    id: { type: String },
    durationPrediction: { type: String },
    stops: { type: String },
    destination: { type: Object },
    busInfos: { type: Object },
    driverInfos: { type: Object },
    passengersInfos: { type: Array }
}, {
    //gera por padrão uma versão para cada atualização do documento
    versionKey: false
});

travelsSchema.virtual('ticket').
    get(function () {
        return this.id + '-' + this.destination.local;
    }).
    set(function (v) {
        this.id = v.substr(0, v.indexOf('-'));
        this.destination.local = v.substr(v.indexOf('-') + 1);
    });

// atribuindo o esquema a uma collection
// estou definindo o nome da collection que irei salvar no banco
const travels = mongoose.model('travels', travelsSchema);

// exportar o model para ser utilizado
module.exports = travels;
```

#### Propriedade Virtual

Podemos reparar que no schema de travels temos uma **propriedade virtual** que chamamos de ticket. Essa propriedade virtual significa que temos essa propriedade, porém a mesma não está na nossa base de dados. No caso, ela serve para formatarmos alguma informação que temos do nosso objeto de travels, que no caso é o ticket dessa viagem, que é composto pelo id e o local de destino. Com isso criamos uma função de *get*, que traz o valor desse ticket (*id-local de destino*)  e criamos uma função de *set*, que nos permite receber um ticket (*id-local de destino*) e substituir nossas propriedades id e local de destino (que não são virtuais).

### Substituindo os arquivos json pelos schemas

Agora que já temos os schemas das nossas duas collections definidos (passengers e travels), precisamos ir no `Controller` e parar de utilizar os arquivos json e passar a utilizar nossos schemas.

* Primeiro vamos no arquivo `travelsController`:

1 - Comentamos (ou removemos) a linha onde importamos a informação do travels.json e passamos a importar o schema Travels:

```
// const travels = require("../models/travels.json"); // remover ou comentar essa linha
const travels = require("../models/travels"); // adicionar essa linha
```

2 - Alteramos as chamadas dos métodos HTTP dentro do Controller para consumir o banco de dados:

* Função **getAllTravels**:

```
const getAllTravels = (req, res) => {
    //Find sempre retorna uma lista
    travels.find(function (err, travelsFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (travelsFound && travelsFound.length > 0) {
                res.status(200).send(travelsFound);
            } else {
                res.status(204).send();
            }
        }
    })
};
```
* Função **getTravelById**:

```
const getTravelById = (req, res) => {
    const resquestId = req.params.id;
    //FindOne retorna um unico documento
    travels.findOne({ id: resquestId }, function (err, travelFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (travelFound) {
                res.status(200).send(travelFound.toJSON({ virtuals: true }));
            } else {
                res.status(204).send();
            }
        }
    })
};
```
Repare que ao utilizar o `travelFound.toJSON({ virtuals: true })` no retorno da nossa request, iremos retornar as propriedades do nosso schema, inclusive as virtuais, que no caso é o nosso ticket.

* Agora, vamos no arquivo `passengersController`:

1 - Comentamos (ou removemos) as linhas onde importamos a informação do `passengers.json` e `travels.json` e passamos a importar o schema `Passengers` e o schema `Travels`. Podemos também remover a importação do `fs` e do `utils` (inclusive podemos apagar essa pasta já que não iremos mais utilizar):

```
// const travels = require("../models/travels.json"); // comentar ou remover
// const passengers = require("../models/passengers.json"); // comentar ou remover
// const fs = require("fs"); // comentar ou remover
// const utils = require("../utils/travelsUtils"); // comentar ou remover (e remover pasta)
```
Podemos também apagar os arquivos `passengers.json` e o arquivo `traverls.json` já que não vamos mais utilizá-los.

2 - Alteramos as chamadas dos métodos HTTP dentro do Controller para consumir o banco de dados:

* Função **createPassenger**:
```
const createPassenger = (req, res) => {
    let { name, email, documentNumber } = req.body;
    let requiredId = req.params.id;
    let passenger = {
        "id": Math.random().toString(32).substr(2),
        name,
        email,
        documentNumber,
        travelId: requiredId
    }

    travels.findOne({ id: requiredId }, function (err, travelFound) { // achando a viagem solicitada na requisição
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (travelFound) { // verifico primeiro se a viagem existe na base de dados
                let newPassenger = new passengers(passenger)
                newPassenger.save(function (err) { // crio novo passageiro na collection de passageiros
                    if (err) {
                        // se deu erro ao salvar o passageiro na collection de passageiros
                        res.status(500).send({ message: err.message })
                    } else {
                        // se deu certo salvar o passageiro na collection de passageiros vou salvar na viagem tambem
                        travelFound.passengersInfos.push(passenger); // adicionando um passageiro à viagem solicitada
                        travels.updateOne({ id: requiredId }, { $set: { passengersInfos: travelFound.passengersInfos } }, function (err) { // atualizando os passageiros na viagem no banco de dados
                            if (err) {
                                res.status(500).send({ message: err.message }) //responder com o erro
                            }
                            res.status(201).send({
                                message: "Passageiro adicionado com sucesso!",
                                ...travelFound.toJSON()
                            });
                        });
                    }
                })
            } else {
                res.status(404).send({ message: "Viagem não encontrada para inserir passageiro!" });
            }
        }
    })
};
```

* Função **replacePassenger**:
```
// atualizar o passageiro
const replacePassenger = (req, res) => {
    const requiredId = req.params.id;
    passengers.findOne({ id: requiredId }, function (err, passengerFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (passengerFound) {
                passengers.updateOne({ id: requiredId }, { $set: req.body }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Registro alterado com sucesso" })
                    }
                })
            } else {
                res.status(404).send({ message: "Não há registro para ser atualizado com esse id" });
            }
        }
    })
};
```

* Função **updateName**:
```
// atualizar apenas o nome do passageiro
const updateName = (req, res) => {
    const requiredId = req.params.id;
    let newName = req.body.name;
    passengers.findOne({ id: requiredId }, function (err, passengerFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (passengerFound) {
                passengers.updateOne({ id: requiredId }, { $set: { name: newName } }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Nome alterado com sucesso" })
                    }
                })
            } else {
                res.status(404).send({ message: "Não há registro para ter o nome atualizado com esse id" });
            }
        }
    })
}
```

* Função **deletePassenger**:
```
const deletePassenger = (req, res) => {
    const requiredId = req.params.id;
    passengers.findOne({ id: requiredId }, function (err, passenger) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (passenger) {
                //deleteMany remove mais de um registro
                //deleteOne remove apenas um registro
                passengers.deleteOne({ id: requiredId }, function (err) {
                    if (err) {
                        res.status(500).send({
                            message: err.message,
                            status: "FAIL"
                        })
                    } else {
                        res.status(200).send({
                            message: 'Passageiro removido com sucesso',
                            status: "SUCCESS"
                        })
                    }
                })
            } else {
                res.status(404).send({ message: 'Não há passageiro para ser removido com esse id' })
            }
        }
    })
};
```

###  Métodos nativos do Mongoose

Atualizando as funções utilizamos alguns métodos nativos do Mongoose como o `save`, `find`, `findOne`, `updateOne` e `deleteOne`, mas temos diversos outros, como por exemplo:

1 - Para inserir (`save`, `create` e `insertMany`)
2 - Para consultar (`find`, `findById`, `findOne`)
3 - Para alterar (`update`, `updateOne`, `updateMany`)
4 - Para excluir (`deleteOne`, `deleteMany`, `remove`)

### Documentação do Mongoose

https://mongoosejs.com/docs/guide.html

## Exercício para Casa

![homework](https://44.media.tumblr.com/aa5ddc2f7674efb9c1f4ce37365ad5dd/tumblr_ns2v6ccj521sg05bjo4_500.gif)

*Opção 1*: Utilizando a base de dados criada no exercício que foi feito em casa, da semana 12, desenvolva uma nova API com pelo menos uma rota de cada: `POST`, `GET`, `PUT`, `PATCH` e `DELETE`, gravando e retornando informações do banco de dados. Testar a API utilizando o Postman, conforme fizemos em aula.

*Opção 2*: Utilize uma api que você já tenha criado que tenha pelo menos uma rota de cada: `POST`, `GET`, `PUT`, `PATCH` e `DELETE` e gravar e retornar informações do banco de dados ao invés de fazer isso com arquivo. Testar a API utilizando o Postman, conforme fizemos em aula.

*Opção 3*: Subi nesse repositório uma pasta `api-modelo-exercicio`. Você pode utilizar uma dessas apis já prontas, que gravam e recuperam registros de arquivo json, e passar a gravar e retornar informações do banco de dados. Testar a API utilizando o Postman, conforme fizemos em aula.

## Link da Apresentação da Aula

https://docs.google.com/presentation/d/1n5mGriCJ44pGN1xL40ytS1MaFc7gtGkodGBrkbpTTgU/edit#slide=id.g96d680acc6_0_0
