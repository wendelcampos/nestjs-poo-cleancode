# Projeto Forum Nest

Este projeto foi desenvolvido utilizando o framework [NestJS](https://nestjs.com/), seguindo princípios de arquitetura limpa (Clean Architecture), Domain-Driven Design (DDD) e Test-Driven Development (TDD) para garantir escalabilidade, manutenibilidade e testabilidade.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **NestJS**: Framework para construção de APIs robustas e escaláveis.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Prisma ORM**: Mapeamento objeto-relacional para acesso ao banco de dados.
- **Vitest**: Ferramenta moderna de testes utilizada em conjunto para testes rápidos e eficientes.
- **Zod**: Biblioteca para validação e tipagem de dados de forma declarativa e segura.

## Técnicas e Padrões de Programação

### 1. Clean Architecture

- **Separação de camadas**: O projeto está dividido em camadas (Domain, Application, Infrastructure, Presentation), isolando regras de negócio da lógica de infraestrutura.
- **Inversão de dependências**: Utilização de interfaces e injeção de dependências para desacoplar implementações.
- **Use Cases**: Cada caso de uso do sistema é implementado como um serviço independente, facilitando testes e manutenção.

### 2. Domain-Driven Design (DDD)

- **Modelagem de domínio**: O domínio do negócio é centralizado, com entidades, agregados e value objects bem definidos.
- **Ubiquitous Language**: Utilização de uma linguagem comum entre desenvolvedores e stakeholders para descrever o domínio.

### 3. Princípios SOLID

- **Single Responsibility Principle**: Cada classe tem uma única responsabilidade.
- **Open/Closed Principle**: Classes são abertas para extensão, mas fechadas para modificação.
- **Dependency Inversion Principle**: Depende-se de abstrações, não de implementações concretas.

### 4. Test-Driven Development (TDD) e Testes Automatizados

- **Desenvolvimento orientado a testes (TDD)**: Funcionalidades são implementadas a partir de testes.
- **Testes unitários**: Cobrem regras de negócio e casos de uso.
- **Testes de integração**: Garantem o funcionamento correto entre módulos e com o banco de dados.
- **Jest e Vitest**: Utilizados para garantir a qualidade e confiabilidade do código.

### 5. DTOs e Validação

- **Data Transfer Objects (DTOs)**: Utilizados para validação e tipagem dos dados de entrada e saída das rotas.
- **Pipes de validação**: Garantem integridade dos dados recebidos pela API.
- **Zod**: Utilizado para validação e definição de esquemas de dados, proporcionando segurança e clareza na manipulação das informações.

### 6. Repository Pattern

- **Repositórios**: Abstraem o acesso ao banco de dados, facilitando a troca de tecnologias de persistência.

## Estrutura de Pastas

```text
src/
├── core/
│   ├── entities/
│   ├── errors/
│   ├── repositories/
│   └── types/
├── domain/
│   ├── forum/
│   │   ├── application/
│   │   │   ├── cryptography/
│   │   │   ├── repositories/
│   │   │   ├── storage/
│   │   │   └── useCases/
│   │   └── enterprise/
│   │       ├── entities/
│   │       │   └── value-objects/
│   │       └── events/
│   └── notification/
│       ├── application/
│       │   ├── repositories/
│       │   ├── subscribers/
│       │   └── useCases/
│       └── enterprise/
│           └── entities/
├── events/
├── infra/
│   ├── auth/
│   ├── cryptography/
│   ├── database/
│   │   └── prisma/
│   ├── env/
│   ├── http/
│   │   ├── controllers/
│   │   ├── pipes/
│   │   ├── presenters/
│   │   └── storage/
│   └── storage/
└── test/
    ├── cryptography/
    ├── e2e/
    ├── factories/
    ├── repositories/
    ├── storage/
    └── utils/
```

**Resumo da Estrutura:**

- `core/`: Componentes centrais reutilizáveis (entidades, erros, repositórios, tipos).
- `domain/`: Lógica de negócio dividida por contexto (ex: forum, notification), separando aplicação e domínio empresarial.
- `events/`: Gerenciamento de eventos do sistema.
- `infra/`: Implementações de infraestrutura (autenticação, banco de dados, HTTP, variáveis de ambiente).
- `test/`: Estrutura para testes unitários, de integração, mocks e utilitários.

Essa organização facilita a escalabilidade, manutenção e testes do projeto, seguindo os princípios de Clean Architecture e DDD.

## Como Executar

1. Instale as dependências:
     ```bash
     npm install
     ```
2. Configure o banco de dados no arquivo `.env`.
3. Rode as migrations:
     ```bash
     npx prisma migrate dev
     ```
4. Inicie o servidor:
     ```bash
     npm run start:dev
     ```

---

Este projeto serve como base para aplicações Node.js modernas, aplicando as melhores práticas de arquitetura, desenvolvimento orientado ao domínio e testes automatizados.