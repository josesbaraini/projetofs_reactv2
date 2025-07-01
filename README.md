# MyGym - Sistema de Gestão de Treinos (Frontend)

Este projeto é uma aplicação frontend abrangente, desenvolvida com **Next.js** e **React**, que simula um sistema de gestão para academias. O foco principal é demonstrar uma arquitetura de software robusta, utilizando componentes reutilizáveis e princípios de design responsivo, ideal para ambientes corporativos.

## ✨ Funcionalidades Principais

*   **Autenticação de Usuários:**
    *   Fluxo completo de Cadastro e Login com validação de formulário.
    *   Gerenciamento de sessão do usuário.
*   **Gestão de Treinos:**
    *   Criação de treinos personalizados com múltiplos passos (exercícios, séries, repetições, peso).
    *   Visualização, pesquisa, ordenação e exclusão de treinos.
*   **Programação de Atividades:**
    *   Visualização de calendários anuais, mensais e semanais para eventos e treinos.
*   **Notificações:**
    *   Sistema de exibição e gerenciamento de notificações para o usuário.
*   **Perfil do Usuário:**
    *   Visualização e edição de informações pessoais e métricas corporais.
*   **Componentização:**
    *   Arquitetura modular baseada em componentes React reutilizáveis para facilitar a manutenção e escalabilidade.
*   **Design Responsivo:**
    *   Interface adaptável para proporcionar uma experiência de usuário consistente em diferentes dispositivos e tamanhos de tela.

## 🚀 Tecnologias Utilizadas

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Biblioteca UI:** [React.js](https://react.dev/)
*   **Estilização:** CSS Modules
*   **Linguagem:** JavaScript (ES6+)
*   **Gerenciamento de Estado:** React Context API
*   **Manipulação de Datas:** [Day.js](https://day.js.org/)
*   **Roteamento:** Next.js Router
*   **Comunicação com API:** Fetch API

## ⚙️ Configuração e Instalação

Para configurar e executar o projeto localmente, siga os passos abaixo:

1.  **Pré-requisitos:**
    *   Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18 ou superior) e o `npm` instalados em sua máquina.

2.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/seu-usuario/MyGym_projeto.git
    ```
    (Substitua `https://github.com/seu-usuario/MyGym_projeto.git` pelo URL real do seu repositório)

3.  **Navegue até o Diretório do Projeto:**
    ```bash
    cd MyGym_projeto
    ```

4.  **Instale as Dependências:**
    ```bash
    npm install
    ```

5.  **Configuração do Backend:**
    Este projeto frontend foi desenvolvido para interagir com um backend que expõe uma API em `http://localhost:8000/api`. Para que todas as funcionalidades operem corretamente, é necessário que o backend correspondente esteja configurado e em execução.

6.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```

    O aplicativo estará acessível em `http://localhost:3000` no seu navegador.

## 💡 Como Usar

Após iniciar o servidor de desenvolvimento:

1.  Acesse `http://localhost:3000` no seu navegador.
2.  Você pode criar uma nova conta na página de **Cadastro** ou fazer login se já possuir credenciais.
3.  Explore as diversas funcionalidades, como a gestão de treinos, a programação de atividades e a edição do perfil do usuário.

## 📂 Estrutura do Projeto (Visão Geral)

```
MyGym_projeto/
├───src/
│   ├───app/             # Páginas principais da aplicação e suas rotas (Next.js App Router)
│   ├───components/      # Componentes React reutilizáveis (Header, Footer, Modals, etc.)
│   ├───hooks/           # Hooks personalizados para lógica de estado e efeitos colaterais (e.g., useTreinos)
│   └───utils/           # Funções utilitárias (rotas de API, validações, formatação de datas)
├───public/              # Ativos estáticos (imagens, ícones)
├───package.json         # Dependências do projeto e scripts npm
├───next.config.mjs      # Configuração do Next.js
└───jsconfig.json        # Configuração de aliases de importação para caminhos absolutos
```