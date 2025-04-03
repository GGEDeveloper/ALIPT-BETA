# Documentação: Restrição de Preços e Estoque para Usuários Logados

## Visão Geral

Este documento descreve a implementação da funcionalidade de restrição de preços e informações de estoque, que só são exibidos para usuários autenticados na plataforma ALIPT.

**Data de Implementação:** Abril 2023

## Contexto e Motivação

Para criar uma experiência que incentive a criação de cadastros e o engajamento dos usuários, a plataforma foi modificada para que informações comerciais como preços, disponibilidade de estoque e opções de compra só sejam visíveis após o login do usuário. Essa estratégia também permite:

- Proteger informações comerciais sensíveis
- Coletar dados de usuários para marketing e análises
- Melhorar a conversão de visitantes em usuários registrados

## Componentes Modificados

### 1. Contexto de Autenticação

Foi criado um novo contexto para gerenciar o estado de autenticação em toda a aplicação:

**Arquivo:** `/context/AuthContext.tsx`

Este contexto implementa:
- `isLoggedIn`: Estado que indica se o usuário está autenticado
- `isAdmin`: Estado que indica se o usuário é administrador
- `user`: Objeto com informações do usuário logado
- `login()`: Função para autenticar o usuário
- `logout()`: Função para encerrar a sessão

O contexto mantém o estado de autenticação persistente utilizando `localStorage`.

### 2. Cartões de Produto

**Arquivo:** `/components/ProductCard.tsx`

Modificações:
- Adição de verificação `isLoggedIn` para exibir ou ocultar preços
- Implementação de um botão "Login para ver preço" quando o usuário não está autenticado
- Ocultação de indicadores de desconto e estoque para usuários não autenticados
- Ocultação de botões de compra para usuários não autenticados

### 3. Página de Detalhes do Produto

**Arquivo:** `/app/produto/[slug]/page.tsx`

Modificações:
- Verificação de autenticação para exibir preços, disponibilidade de estoque e opções de compra
- Adição de uma seção destacada com botão de login quando o usuário não está autenticado
- Manutenção da exibição de informações gerais do produto (descrição, especificações) mesmo para usuários não autenticados

### 4. Página do Carrinho

**Arquivo:** `/app/carrinho/page.tsx`

Modificações:
- Restrição de acesso à página completa do carrinho apenas para usuários autenticados
- Implementação de uma tela explicativa com botão de login para usuários não autenticados
- Redirecionamento suave com mensagem informativa

## Funcionamento do Login

O sistema utiliza dois tipos de login:

1. **Login Regular**: Disponível no cabeçalho e em modais nas áreas restritas
2. **Login de Desenvolvimento**: Botões especiais para teste rápido com dois perfis:
   - **DevLogin-User**: Login como cliente regular
   - **DevLogin-Admin**: Login como administrador

Os botões de desenvolvimento estão disponíveis:
- No cabeçalho do site (visíveis em telas médias ou maiores)
- No modal de login

## Fluxo do Usuário

1. Usuário não autenticado navega pela loja e vê produtos sem preços
2. Ao clicar em um produto, vê detalhes básicos, mas não preços ou disponibilidade
3. Botões de "Login para ver preço" são exibidos nos lugares onde normalmente apareceriam preços
4. Ao autenticar-se, todos os preços, informações de estoque e botões de compra são revelados
5. Usuário pode então adicionar produtos ao carrinho e finalizar compras

## Implementação Técnica

A implementação utiliza:
- React Context API para gerenciamento de estado de autenticação
- Hooks personalizados (`useAuth`) para acessar o estado em componentes
- Renderização condicional baseada no estado de autenticação
- `localStorage` para persistência do login entre sessões

## Como Testar

Para testar a funcionalidade:

1. Acesse o site sem estar logado - observe a ausência de preços e informações de estoque
2. Utilize o botão "DevLogin-User" no cabeçalho ou modal de login
3. Observe que os preços, informações de estoque e botões de compra agora são visíveis
4. Faça logout e verifique que as informações foram novamente ocultadas

## Considerações Futuras

Possíveis melhorias para esta funcionalidade:

1. Implementação de diferentes níveis de visualização baseados em tipos de conta (cliente regular, cliente premium, parceiro comercial)
2. Personalização de preços baseado em histórico e perfil do cliente
3. Integração com sistemas de desconto por nível de fidelidade 