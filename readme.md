# Sistema de Locação de Imóveis 🏠🔑

Este é um projeto de API REST para gerenciamento de locação de imóveis, desenvolvido com Node.js e Next.js. Ele permite o cadastro e controle de imóveis, clientes, contratos de aluguel e os respectivos registros de aluguéis. 📄⚙️

## Funcionalidades Principais ✨

O sistema oferece as seguintes funcionalidades através de endpoints REST:

### 1. Gerenciamento de Clientes 🧑‍💼
* ✅ **Cadastrar Cliente:** Permite registrar novos clientes no sistema.
* ✅ **Listar Clientes:** Permite visualizar todos os clientes cadastrados.
* ✅ **Buscar Cliente por ID:** Permite buscar um cliente específico pelo seu identificador.
* ✅ **Atualizar Cliente:** Permite modificar os dados de um cliente existente.
* ✅ **Deletar Cliente:** Permite remover um cliente do sistema.

### 2. Gerenciamento de Imóveis 🏢
* ✅ **Cadastrar Imóvel:** Permite registrar novos imóveis para locação.
* ✅ **Listar Imóveis:** Permite visualizar todos os imóveis cadastrados.
* ✅ **Buscar Imóvel por ID:** Permite buscar um imóvel específico pelo seu identificador.
* ✅ **Atualizar Imóvel:** Permite modificar os dados de um imóvel existente.
* ✅ **Deletar Imóvel:** Permite remover um imóvel do sistema.

### 3. Gerenciamento de Contratos de Aluguel 📝
* ✅ **Criar Contrato de Aluguel:** Permite gerar um novo contrato de aluguel, associando um cliente a um imóvel, com datas de início, fim e valor.
* ✅ **Listar Contratos:** Permite visualizar todos os contratos de aluguel registrados.
* ✅ **Buscar Contrato por ID:** Permite buscar um contrato específico pelo seu identificador.
* ✅ **Atualizar Contrato:** Permite modificar os detalhes de um contrato existente.
* ✅ **Deletar Contrato:** Permite remover um contrato do sistema.

### 4. Gerenciamento de Aluguéis (Registros de Locação) 🗓️
* ✅ **Registrar Aluguel:** Permite criar um registro de aluguel, vinculando um contrato, cliente e imóvel, e especificando o período e o status do pagamento.
* ✅ **Listar Aluguéis:** Permite visualizar todos os registros de aluguéis.
* ✅ **Buscar Aluguel por ID:** Permite buscar um registro de aluguel específico.
* ✅ **Atualizar Aluguel:** Permite modificar os dados de um registro de aluguel.
* ✅ **Deletar Aluguel:** Permite remover um registro de aluguel.
