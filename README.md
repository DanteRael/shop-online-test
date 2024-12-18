Como utilizar a shop-online: <br>
1°) faça pull request e instale o código no seu vsCode (ou qualquer app que utilizares) 
<br>
2°) comando para iniciar: quasar dev <br>
3°) Login: O login possue 2 usuários: user: (nome: user, senha: user) e admin (nome: admin; senha: admin) <br>
4°) o Admin tem a capacidade de adicionar, dar update, ou deletar produtos do banco de dados <br>
5°) o user pode apenas procurar por produtos <br>

6°) Funcionalidades prontas: <br>
-Login e autentificação <br>
-Logout <br>
-UI CRUD <br>
7°) funcionalidades não prontas: <br>
-carrinho <br>
-conexão back-end CRUD <br>
-pesquisa de produtos <br>

Resumo geral do desafio: A autentificação é a primeira parte do desafio. Para faze-lâ pensei em utilizar aderir "roles" para os usuários, porém não tenho controle do backend, então o jeito foi utilizar a biblioteca JWT para decodificar o Bearer Token e saber se o usuário é "admin" ou "user". O "admin" é mandado para uma outra versão da página normal onde ele tem acesso a adicionar, dar update, e deletar produtos, enquanto o "User" não pode fazer essas coisas. Para fazer isso, criei dois diferentes "MainLayouts". Um "MainLayoutAdm.vue", onde apenas Admins tem acesso ao CRUD to site, e o "MainLayout" onde users são direcionados.
