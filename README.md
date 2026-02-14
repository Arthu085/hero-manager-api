# Hero Manager API

API REST para o sistema de gestão de projetos heroicos da **HeroForce**, desenvolvida com NestJS, TypeScript, TypeORM e PostgreSQL.

## Sobre o Projeto

O Hero Manager é uma plataforma completa de gestão de projetos onde heróis (usuários) podem criar, gerenciar e acompanhar projetos baseados em 6 métricas fundamentais da cultura organizacional:

- **Agilidade** - Velocidade de execução
- **Encantamento** - Qualidade da experiência
- **Eficiência** - Otimização de recursos
- **Excelência** - Padrão de qualidade
- **Transparência** - Clareza na comunicação
- **Ambição** - Visão e objetivos

### Sistema de Progressão Automática

Quando você atualiza as métricas de um projeto, o sistema:

1. **Calcula automaticamente** o `completionPercentage` baseado na média das 6 métricas
2. **Atualiza automaticamente** o status do projeto:
   - `0%` → **PENDING** (Pendente)
   - `1-99%` → **IN_PROGRESS** (Em Progresso)
   - `100%` → **COMPLETED** (Concluído)

## Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript tipado
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript/JavaScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - Autenticação com tokens
- **[Swagger](https://swagger.io/)** - Documentação interativa da API
- **[Docker](https://www.docker.com/)** - Containerização
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação de DTOs
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Hash de senhas

## Pré-requisitos

### Com Docker:

- [Docker](https://docs.docker.com/get-docker/) (20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (2.0+)

### Sem Docker:

- [Node.js](https://nodejs.org/) (18+)
- [PostgreSQL](https://www.postgresql.org/download/) (14+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Como Rodar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/Arthu085/hero-manager-api.git
cd hero-manager-api
```

### 🔧 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

**Utilize o env.example**

### Opção 1: Executar COM Docker (Recomendado)

#### Iniciar os containers:

```bash
docker-compose up -d
```

Isso irá:

- Criar container do PostgreSQL
- Criar container da API
- Instalar dependências
- Configurar a rede entre containers
- Rodar migrations
- Rodar seeds

#### Verificar logs:

```bash
docker-compose logs -f api
```

#### Parar os containers:

```bash
docker-compose down
```

#### Remover volumes (limpar banco):

```bash
docker-compose down -v
```

---

### Opção 2: Executar SEM Docker

#### 1. Instalar dependências:

```bash
npm install
```

#### 2. Criar banco de dados PostgreSQL:

**Crie um banco PostgreSQL local ou em produção**

#### 3. Executar migrations:

```bash
npm run migration:run
```

#### 4. Executar seeds:

```bash
npm run seed:run
```

#### 5. Iniciar aplicação:

```bash
# Desenvolvimento (com hot-reload)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

A API estará disponível em: **http://localhost:3000**

## Documentação da API (Swagger)

A documentação interativa da API está disponível através do **Swagger UI**.

### Acessar o Swagger:

Após iniciar a aplicação, acesse:

```
http://localhost:3000/api/docs
```

### Arquitetura Clean Architecture

O projeto segue os princípios de **Clean Architecture**:

- **Application Layer**: Use Cases e DTOs
- **Domain Layer**: Entidades, Value Objects, Regras de Negócio
- **Infrastructure Layer**: Controllers, Repositories, Frameworks

## Comandos do TypeORM

```bash
# Gerar nova migration
npm run migration:generate --name=nome-da-migration

# Executar migrations pendentes
npm run migration:run

# Reverter última migration
npm run migration:revert

# Executar seeds
npm run seed:run
```

## Usuário de Teste

Após executar os seeds, você terá:

**Admin:**

```
Email: admin@gmail.com
Senha: 123456
Personagem: Superman
```

### Roles (Perfis):

- **ADMIN** - Acesso total (criar, editar, deletar projetos e usuários)
- **USUARIO** - Visualizar projetos

## Desenvolvido por

**Arthur Ghizi** - [GitHub](https://github.com/Arthu085)
