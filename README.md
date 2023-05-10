# **Controle de instalações de empresas - HubLocal**

A ideia inicial do projeto é oferecer para o usuário a possibilidade de controlar, de forma simples, os locais onde suas empresas estão, e, posteriormente, usá-los para inserir suas marcas nos principais mapas e listas da internet. Neste reposítório você encontra o código da interface utilizada pela aplicação, que dispõe de uma tela inicial de cadastro e acesso, e um dashboard disponível somente para usuários autenticados, onde ele poderá manipular suas empresas e seus respectivos locais.

## **Lista de linguagens, tecnologias e frameworks utilizados**
- React
- Next JS
- Redux
- Redux Persist
- Material UI
- Axios
- React Hook Form
- Styled Components
- React Toastify

## **Instalação e uso do projeto**
O setup da aplicação é simples, basta instalar as dependências e levantar a aplicação manualmente.

Porém, antes disso, será necessário a criação de um arquivo ***.env.local*** que deve seguir o template do arquivo ***.env.local.template*** que se encontra na raíz do projeto. Feito isso podemos iniciar a instalação do projeto.

Primeiro, será necessário instalar as dependências do projeto, abra um terminal e vá até o diretório raíz do repositório, onde está o arquivo package.json e rode um dos comandos abaixo

```bash
npm install
yarn
```
E pronto, já está tudo preparado para levantar o projeto, basta iniciar o servidor em modo desenvolvimento usando um dos comandos abaixo

```bash
npm run dev
yarn dev
```

O projeto possui um fluxo de uso simples e intuitivo, a tela inicial é a de sign in, nela você irá encontrar um botão **"Registrar"** que te levará para a tela de sign up onde você poderá criar seu usuário. 
Uma vez criado o usuário, basta fazer o login que você será redirecionado para o dashboard onde poderá criar e manipular suas empresas e seus respectivos locais.

> <div style="padding: 8px 0">This is a challenge by <a href="https://coodesh.com/" target="_blank">Coodesh</a></div>