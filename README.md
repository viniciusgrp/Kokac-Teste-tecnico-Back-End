Olá.

Esse é o back end do desafio técnico para a vaga de Desenvolvedor Full Stack da Kokac.

Para executar basta clonar o repositório para sua máquina e instalar as dependências digitando yarn no terminal e depois utilizar o comando yarn dev

Sobre os desafios:

1- Números palíndromos são aqueles que escritos da direita para esquerda ou da esquerda para
direita tem o mesmo valor. Exemplo: 929, 44, 97379.
Fazer um algoritmo que imprima todos os números palíndromos entre um intervalo que será
escolhido pelo usuário da aplicação.

A rota para solução do desafio 1 é a seguinte:
http://localhost:3000/palindromo

Método: POST

Sendo necessário enviar no body as informações necessárias no seguinte formato:
{
    "start": 10,
    "end": 100
}

O retorno esperado é um array contendo todos os números que são palindromos entre o intervalo informado.

[
	11,
	22,
	33,
	44,
	55,
	66,
	77,
	88,
	99
]


2- Suponha que um caixa disponha apenas de notas de 1, 10 e 100 reais. Considerando que
alguém está pagando uma compra, escreva um algoritmo que mostre o número mínimo de
notas que o caixa deve fornecer como troco.
Mostre também: o valor da compra, o valor do troco e a quantidade de cada tipo de nota do
troco. Suponha que o sistema monetário não utilize moedas.
O valor da compra e o valor de dinheiro entregue ao caixa deve ser informado pelo usuário.

A rota para a solução desse desafio é a seguinte:
http://localhost:3000/caixa

Método: POST

Sendo necessário enviar as informações no body como no exemplo a seguir:

{
    "valorPago": 100,
    "totalCompra": 11
}

O retorno esperado segue o seguinte formato:

{
	"troco": 89,
	"notas": {
		"nota10": 8,
		"nota1": 9
	}
}


3- Precisamos controlar melhor os dados de alguns veículos que ficam na nossa garagem e para
isso precisamos que seja feito o seguinte:
a) Crie a interface “Veiculo” com os seguintes atributos:
– Modelo
– Ano de fabricação
– Quantidade de Portas

Rua Martim de Carvalho, 703 - 2°Andar - Santo Agostinho - Belo Horizonte - Minas Gerais - CEP: 30190-090
 +55 31 3286-3190 |  contato@kukac.com.br | www.kukac.com.br
– Marca
b) Crie a classe “Carro”, que herda de Veículo e tem os seguintes atributos:
– Quantidade de Portas: entre 2 e 4
c) Crie a classe “Moto”, que herda de Veículo, e possui os seguintes atributos:
– Rodas: 2
– Passageiros: entre 1 e 2

Deve ser solicitado ao usuário que preencha as informações sobre o seu veículo, os dados devem ser
salvos em um arquivo JSON (para não precisar trabalhar com banco de dados, até porquê já vai ser
bem próximo de um banco NoSQL);


A rota para a solução do desafio é a seguinte:
http://localhost:3000/veiculos

Método: POST

Para criar o veículo é necessário enviar as informações no body seguindo o modelo:

{
    "tipo": "carro",
    "marca": "Renault",
    "modelo": "Logan",
    "quantidadePortas": 4,
    "anoFabricacao": 2018
}

Ou se for moto:

{
    "tipo": "moto",
    "marca": "Honda",
    "modelo": "CB500r",
    "anoFabricacao": 2018,
    "passageiros": 2
}

E o retorno esperado é um objeto seguindo o modelo:

{
	"tipo": "carro",
	"modelo": "Logan",
	"anoFabricacao": 2018,
	"quantidadePortas": 4,
	"marca": "Renault",
	"uuid": "8a8f87b5-2e39-4b4e-9b39-77a5a89e4397"
}

Existem também as rotas de GET:
http://localhost:3000/veiculos

Método: GET

Que retorna todos os veículos em um array, exemplo:

[
	{
		"tipo": "carro",
		"modelo": "Logan",
		"anoFabricacao": 2018,
		"quantidadePortas": 4,
		"marca": "Renault",
		"uuid": "8a8f87b5-2e39-4b4e-9b39-77a5a89e4397"
	}
]

Rota para pegar um veículo em específico:
http://localhost:3000/veiculos/uuid

O retorno esperado é um objeto seguindo o modelo:

{
	"tipo": "carro",
	"modelo": "Logan",
	"anoFabricacao": 2018,
	"quantidadePortas": 4,
	"marca": "Renault",
	"uuid": "8a8f87b5-2e39-4b4e-9b39-77a5a89e4397"
}

Rota para deletar um veículo em específico:
http://localhost:3000/veiculos/uuid

O retorno esperado é apenas um código 200

Rota para modificar um veículo existente:
http://localhost:3000/veiculos/uuid

Necessário enviar os campos que serão modificados no body, por exemplo:
{
    "marca": "Subaru",
    "modelo": "Impreza"
}

Exemplo de retorno:

{
	"tipo": "carro",
	"modelo": "Impreza",
	"anoFabricacao": 2018,
	"quantidadePortas": 4,
	"marca": "Subaru",
	"uuid": "47d52d29-5283-4ad3-b64b-b1a9367f129d"
}