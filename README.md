# Sistema de Agendamento

Sistema de agendamentos com Cadastro e autenticação de usuários;

Ess sistema tem como objeto aplicar alguns conceitos de nodejs, são eles:
- Entender e aplicar o conceito de APIRest utilizando o protocolo http
- Utilizar um container em docker para o banco de dados
- aprender a utilizar o elephantSQL e Postbird onde é criado o banco de dados
- Utilizar o sequelize para todo o tratamento com os dados em objetos mapeiando-os em entidades no banco de dados
- Utilizar o migrate do sequelize para criação das tabelas no banco de dados
- Controle de usuários através do Thunder cliente com protocolo http.
- Aplicar todos os métodos do protocolo http (GET, POST, PUT, PATCH, DELETE )
- Utilizando bcrypt para criação de hash para segurança das senhas do usuário utilizando o hook beforeSave para salvar o valor do password no hash aṕos tratamento com a lib bcrypt
- Realizar autenticação do usuário através da lib jwt
- Validação do usuário através da lib yup
- Atualização de usuários
- Adicionando imagem e vinculado ao usuário com multer, sequelize e migration para inserir no banco de dados.
- Agendamento do colaborador através do id do usuário.
- Valida data de agendamento com lib data-fns
- Adiciona banco de dados mongoDB para armazenar notificação de agendamentos
- Listagem de notificação de agendamentos e marcando notificação como lida


Desenvolvido com NODEJS.

Para instalar com NPM: `npm i`

Para instalar com YARN: `yarn`

Para iniciar em modo de desenvolvimento com NPM ` npm run dev `

Para iniciar em modo de desenvolvimento com YARN ` yarn dev `

Aconselhado o uso com o Node V14.x.x 
