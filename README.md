# Reserva de Veículos - Frontend

Clone o repositório usando o comando abaixo:

```sh
git clone https://github.com/momanhaes/reserva-de-veiculos-frontend
```

O projeto foi desenvolvido com o framework Angular.

Caso queria acessar o projeto por uma URL pública, abra [https://reserva-de-veiculos.netlify.app](https://reserva-de-veiculos.netlify.app) em seu navegador.

Caso prefira rodar localmente na sua máquina, siga os procedimentos abaixo.

## Inicialização da SPA

Instale as dependências do projeto rodando o comando abaixo:

```sh
npm install
```

Suba o projeto rodando o comando abaixo:

```sh
npm start
```

Abra [http://localhost:4200](http://localhost:4200) em seu navegador.

## Documentação das Features

### Cadastro

`/register`

* Página de formulário de cadastro de usuários com validação de email e match de senhas.

`/login`

* Página de formulário de login com validação e resposta de erro genérica.

### Reservas

`/home`

* Página de reserva de veículos. 
* É permitida somente uma reserva por usuário.
* Nessa página você pode ver outras reservas, fazer ou cancelar uma reserva.
* É possível clicar no svg da lupa na parte superior da página e fazer uma buscar de veículos por nome, descrição, status, categoria, ano e conservação.

### Veículos

`/vehicle-register`

* Página de formulário de cadastro de veículos. 
* Por enquanto todos os usuários podem cadastrar veículos, mas em breve será implementado um fluxo de navegação por token usando JWT onde somentes usuários administradores poderão incluir veículos.

### Informações gerais

* Foram implmentadas guardas de rotas para que, por exemplo, usuários não autorizados não acessem o conteúdo interno da aplicação.
* Foi implementada uma página default para erros 404 (not found) a fim lidar com rotas não programadas do sistema.
* Todas as páginas foram desenvolvidas visando responsividade e usabilidade.
* Todas as páginas possuem animações feitas a partir do módulo nativo do Angular para tornar a navegação do usuário mais fluida.


