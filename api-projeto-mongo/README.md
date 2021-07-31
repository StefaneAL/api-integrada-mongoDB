### On12 API-CRUD | Projeto Guiado

## Bem vinda ao {reprograma}trip
Uma api que permite você observar diferentes viagens de ônibus, controlando informações sobre o motorista e passageiros!<br />

Vamos fazer o CRUD obsevando as demandas de negócio :point_down:

### On12 API-CRUD | Projeto Guiado

## Bem vinda ao {reprograma}trip
Uma api que permite você observar diferentes viagens de ônibus, controlando informações sobre o motorista e passageiros!<br />

Vamos fazer o CRUD obsevando as demandas de negócio :point_down:

# Demandas de Negócio

- ver todas as viagens disponíveis<br />
- ver viagens por tempo de duração<br />
- ver viagens com número de passageiros<br />
- ordenar viagens com número de paradas<br />

- cadastrar novo passageiro em uma viagem enviando apenas nome, email e id da viagem<br />
- cadastrar todas as informações de um novo motorista em uma viagem<br />

- deletar uma viagem<br />
- deletar um passageiro no sistema<br />

- editar qualquer dado do motorista<br />
- substituir motorista<br />
- editar nome do passageiro no sistema<br />
- atualizar um passageiro no sistema<br />

# Orientações para requests (Contrato API)
Use o espaço abaixo para organizar as urls e respectivas ações do CRUD, relacionando com as demandas de negócio.<br />

## Em aula
REFERENTE À VIAGENS
- ver todas as viagens disponíveis<br />
{GET}/travels
const getAllTravels

- pesquisar uma viagem por id<br />
{GET}/travels/:id
const getTravelById



REFERENTE À PASSAGEIROS
- cadastrar novo passageiro em uma viagem enviando apenas nome, email e id da viagem<br />
{POST}/travel/:id/passenger/create
const createPassenger

{
    "id": automático,
    "name": String,
    "email": String,
    "documentNumber": String,
    "travelId": String
}

- deletar um passageiro do sistema<br />
{DELETE}/passenger/:id
const deletePassenger

- atualizar um passageiro no sistema<br />
{PUT}/passenger/:id
const updatePassenger

{
    "name": String,
    "email": String,
    "documentNumber": String
}

- editar nome passageiro no sistema<br />
{PATCH}/passenger/:id

{
    "name": String
}
 
### Para Casa
- ordenar viagens com número de passageiros<br />
- cadastrar todas as informações de um novo motorista em uma viagem<br />

- editar qualquer dado do motorista<br />
- substituir motorista<br />

- deletar uma viagem<br />

DESAFIO \o/<br />
- ver viagens por tempo de duração<br />
- ordenar viagens com número de paradas<br />

