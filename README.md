# Projeto NestJS - Sistema com GraphQL, JWT, Auth e Logs

<p align="center">
  <a href="https://seusite.com" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<p align="center">
  Backend desenvolvido em NestJS com TypeScript, PostgreSQL, TypeORM, GraphQL, autenticação JWT, cookies HTTPOnly, serviços de logs e auditoria.
</p>

---

## Sumário

- [Descrição do Projeto](#descrição-do-projeto)  
- [Tecnologias Utilizadas](#tecnologias-utilizadas)  
- [Estrutura do Projeto](#estrutura-do-projeto)  
  - [Entities](#entities)  
  - [Modules](#modules)  
  - [Services](#services)  
  - [Resolvers GraphQL](#resolvers-graphql)  
  - [Guards e Autenticação JWT](#guards-e-autenticação-jwt)  
  - [Logs e Auditoria](#logs-e-auditoria)  
- [Banco de Dados](#banco-de-dados)  
- [Clonando o Projeto](#clonando-o-projeto)  
- [Executando Localmente](#executando-localmente)  
- [Links Úteis](#links-úteis)  
- [Licença](#licença)  

---

## Descrição do Projeto

Este projeto é um backend construído com NestJS, que oferece funcionalidades completas de:  

- Gerenciamento de usuários e clientes.  
- Autenticação via JWT com cookies HTTPOnly.  
- GraphQL com resolvers separados para `create`, `update` e `delete` de entidades.  
- Registro de sessões dos usuários em tabela separada.  
- Logs de ações e auditoria.  
- Banco de dados PostgreSQL com TypeORM e migrations.  

---

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)  
- [GraphQL](https://graphql.org/)  
- [TypeORM](https://typeorm.io/)  
- [PostgreSQL](https://www.postgresql.org/)  
- JWT para autenticação  
- Cookies HTTPOnly para segurança  
- Node.js e TypeScript  

---

## Estrutura do Projeto

### Entities
- `Users` → informações do usuário (login, senha, perfil).  
- `Customers` → clientes, com status, imagens e informações pessoais.  
- `AuthSessionUser` → registra sessões ativas e revogadas, com `access_token` e `refresh_token`.  
- `Logs` → registra ações de usuários para auditoria e monitoramento.

### Modules
Cada módulo contém:  
- `Service` → lógica de negócio.  
- `Resolver` → endpoints GraphQL.  
- `Entity` → estrutura da tabela no banco.  
- `Module` → organiza o serviço e o resolver para importação.

Exemplo de módulo: `CustomersModule`:
```ts
@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  providers: [
    CustomersCreateResolver,
    CustomersUpdateResolver,
    CustomersDeleteResolver,
    CustomersCreateService,
    CustomersUpdateService,
    CustomersDeleteService,
  ],
})
export class CustomersModule {}
```

## Services

- Implementam toda a lógica de CRUD, autenticação e auditoria.
- Tratam verificações, validações e comunicação com o banco via TypeORM.
- Ex.: `CustomersUpdateService`, `AuthLogoutService`, `LogsService`.

## Resolvers GraphQL

- Separam as operações por entidade e tipo de ação (create, update, delete).
- Ex.: `CustomersUpdateResolver`, `UsersPostResolver`, `AuthLogoutResolver`.
- Pegam `id` e dados do usuário logado diretamente do JWT via `context.req.user`.

## Guards e Autenticação JWT

- Guardas NestJS protegem rotas e resolvers, verificando token JWT válido.
- Tokens de acesso e refresh token armazenados em cookies HTTPOnly para maior segurança.
- Ex.: `JwtAuthGuard` implementa validação antes de qualquer resolver.

## Logs e Auditoria

- Todas as ações importantes são registradas em tabela de logs: `Logs`.
- Sessões de login/logout registradas em `AuthSessionUser`.
- Possibilidade de interceptors para monitoramento de actions (ex.: logout interceptor).

## Banco de Dados

- PostgreSQL
- Configuração via TypeORM (`ormconfig.json` ou `DataSource`)
- Migrations usadas para criar tabelas e manter versão do schema.

### Tabelas principais

| Tabela               | Função                                 |
|----------------------|---------------------------------------|
| `tb_users`              | Usuários do sistema                    |
| `tb_users_sessions`  | Sessões JWT e status de revogação      |
| `tb_customers`          | Clientes cadastrados                   |
| `tb_logs`               | Registro de ações dos usuários         |
| `tb_roles`               | Registro de permissões dos usuários   |

## Clonando o Projeto

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
```

# Instalar dependências

```bash
npm install
```

## Executando Localmente

```bash
# Executar em modo desenvolvimento
npm run start:dev
```

# Rodar migrations do TypeORM

```bash
npm run typeorm:migration:run
```

# Testes unitários

```bash
npm run test
```

# Testes e2e

```bash
npm run test:e2e
```

O GraphQL Playground estará disponível em [http://localhost:3000/graphql](http://localhost:3000/graphql)

## Links Úteis

- [Documentação NestJS](https://docs.nestjs.com/)  
- [GraphQL Playground](http://localhost:3000/graphql)  
- [PostgreSQL](https://www.postgresql.org/)  
- [Site do projeto](https://sinka.vercel.app/) (abre ao clicar)

## Licença

MIT License