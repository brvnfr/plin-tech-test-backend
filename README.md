# 📋 Desafio Back-End - Plin Tech

💻 **Sobre o Desafio**
Olá candidato(a)! Parabéns por passar nas etapas anteriores! Nesta
etapa, teremos um desafio prático para avaliar como você se sai nas
diversas demandas que terá como um programador na Plin.
Para começar, você deverá criar uma aplicação, no formato REST
API, utilizando o NestJS.
Sobre o funcionamento da aplicação:
• Imagine que essa aplicação será para expor produtos por meio
de cardápios. Você deverá criar dois cardápios, um cardápio
para o turno noturno, e outro para o turno diurno.
• Haverá uma entidade de produtos, na qual, obrigatoriamente,
deverá conter as informações: Preço, nome do produto,
imagem e uma breve descrição. Atenção: Você poderá
adicionar outras informações, caso deseje. Isso é um plus, por
sinal.
• Os produtos deverão ser organizados por categorias.
• Deverá haver um crud para o cardápio, categorias e produtos.
• Deverá haver um endpoint que retorne o cardápio de acordo
com a hora atual. Caso seja à noite, este endpoint deverá
retornar o cardápio noturno, caso seja dia, o diurno.
• Deverá haver um endpoint onde você consiga obter detalhes
de um único produto.
• Deverá haver um endpoint onde você consiga obter detalhes
de uma única categoria, incluindo os produtos que esta
categoria pertença.

Critérios de avaliação:
• Utilização correta do PrismaORM (1,0 pts)
• Clean code e boas práticas (4,0 pts)
• Requisitos funcionais atendidos (3,0 pts)
• Organização de arquivos e diretórios (1,0 pts)
• Aplicação do conceito REST (1,0 pts)

Orientações:
Após a realização do desafio, suba o desafio em um repositório do
GitHub. Crie um arquivo DESAFIO.md e responda as seguintes questões:
• Qual foi a maior dificuldade que você enfrentou ao realizar o teste?
• Descreva a funcionalidade e o por quê da utilização das bibliotecas
escolhidas por você para concluir o desafio.
• Como você se vê daqui a 5 anos?

Recomendações:
• Utilize um banco de dados remoto. Você poderá utilizar o MongoDB
para isso.
---

## ✅ **Requisitos Funcionais**
1. **Produtos**
   - Cada produto deve conter obrigatoriamente:
     - Nome
     - Descrição
     - Preço
     - URL da Imagem
     - ID da Categoria à qual pertence
   - Produtos podem conter campos adicionais como diferencial.

2. **Categorias**
   - Os produtos devem estar organizados em categorias.
   - Cada categoria pertence a um cardápio específico.

3. **Cardápios**
   - Dois cardápios principais: **Diurno** e **Noturno**.
   - Cada cardápio contém uma ou mais categorias.

4. **Endpoints da API**
   - **Cardápio:**
     - `GET /menus/daily` → Retorna o cardápio conforme o horário atual (Diurno ou Noturno).
   - **Produto:**
     - `POST /products` → Cria um produto.
     - `GET /products/{id}` → Retorna os detalhes de um produto específico.
     - `PUT /products/{id}` → Atualiza um produto.
     - `DELETE /products/{id}` → Remove um produto.
   - **Categoria:**
     - `POST /categories` → Cria uma categoria.
     - `GET /categories/{id}` → Retorna os detalhes de uma categoria, incluindo seus produtos.
     - `PUT /categories/{id}` → Atualiza uma categoria.
     - `DELETE /categories/{id}` → Remove uma categoria.

---

## 📝 **Critérios de Avaliação**
- **Utilização correta do Prisma ORM** (1,0 pt)
- **Clean Code e Boas Práticas** (4,0 pts)
- **Requisitos Funcionais Atendidos** (3,0 pts)
- **Organização de Arquivos e Diretórios** (1,0 pt)
- **Aplicação do Conceito REST** (1,0 pt)

---

## 💡 **Tecnologias Utilizadas**
- **NestJS** para o desenvolvimento da API.
- **Prisma ORM** para a interação com o banco de dados.
- **MongoDB Atlas** como banco de dados remoto.
- **Swagger** para a documentação dos endpoints.

---

## 🗂️ **Estrutura de Diretórios**
```plaintext
src
├── app.module.ts
├── main.ts
├── config
│   └── swagger.config.ts
├── core
│   ├── domain
│   │   ├── entities
│   │   │   ├── category.entity.ts
│   │   │   ├── menu.entity.ts
│   │   │   ├── product.entity.ts
│   │   │   └── user.entity.ts
│   │   ├── repositories
│   │   │   ├── category.repository.ts
│   │   │   ├── menu.repository.ts
│   │   │   ├── product.repository.ts
│   │   │   └── user.repository.ts
│   │   ├── services
│   │   │   ├── category.service.ts
│   │   │   ├── menu.service.ts
│   │   │   ├── product.service.ts
│   │   │   └── user.service.ts
│   └── use-cases
│       ├── category
│       ├── menu
│       ├── product
│       └── user
├── infrastructure
│   ├── auth
│   │   ├── dtos
│   │   │   ├── auth.dto.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── jwt-auth.guard.ts
│   │   ├── jwt-payload.interface.ts
│   │   ├── jwt.strategy.ts
│   ├── database
│   │   ├── repositories
│   │   │   ├── category.repository.ts
│   │   │   ├── menu.repository.ts
│   │   │   ├── product.repository.ts
│   │   │   └── user.repository.ts
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── http
│   │   ├── controllers
│   │   │   ├── category.controller.ts
│   │   │   ├── menu.controller.ts
│   │   │   ├── product.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── dtos
│   │   │   ├── category.dto.ts
│   │   │   ├── menu.dto.ts
│   │   │   ├── product.dto.ts
│   │   │   └── user.dto.ts
│   ├── user.module.ts
├── app.module.ts
└── main.ts

```

---

## ⚙️ **Execução do Projeto**

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/plin-tech-test-backend.git
```

### 2. Acesse o Diretório do Projeto
```bash
cd plin-tech-test-backend
```

### 3. Instale as Dependências
```bash
npm install
```

### 4. Configure as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```env
DATABASE_URL="mongodb+srv://seu-usuario:senha@cluster.mongodb.net/plin-tech?retryWrites=true&w=majority"
PORT=3000
```

### 5. Gere o Prisma Client
```bash
npx prisma generate
```

### 6. Inicie o Servidor
```bash
npm run start:dev
```

---

## ⚙️ **Execução do Projeto**

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/plin-tech-test-backend.git
```

### 2. Acesse o Diretório do Projeto
```bash
cd plin-tech-test-backend
```

### 3. Instale as Dependências
```bash
npm install
```

### 4. Configure as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```env
DATABASE_URL="mongodb+srv://seu-usuario:senha@cluster.mongodb.net/plin-tech?retryWrites=true&w=majority"
PORT=3000
JWT_SECRET="S3CR3TK3Y"
```

### 5. Gere o Prisma Client
```bash
npx prisma generate
```

### 6. Inicie o Servidor
```bash
npm run start:dev
```

---

## 🌐 **Acessando a Documentação Swagger**
Após iniciar o servidor, acesse a documentação Swagger em:
👉 [http://localhost:3000/api](http://localhost:3000/api)

### 🔑 **Testando a Autenticação no Swagger**
1. Crie um usuário em **POST /users**.
2. Faça login em **POST /auth/login** para obter o token JWT.
3. Clique em **Authorize** no Swagger (canto superior direito) e insira o token, sem o prefixo Bearer:
```plaintext
SEU_TOKEN_AQUI
```
4. Agora você pode testar as rotas protegidas!

---
