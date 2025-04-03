# Exemplos de Uso do Sistema de Autenticação

Este documento fornece exemplos práticos de como utilizar o contexto de autenticação (`AuthContext`) em diferentes componentes da aplicação ALIPT.

## Importação e Uso Básico

Para utilizar o contexto de autenticação em qualquer componente:

```tsx
'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';

function MeuComponente() {
  // Obtenha acesso ao contexto de autenticação
  const { isLoggedIn, user, isAdmin, login, logout } = useAuth();

  // Exemplo de renderização condicional baseada no estado de login
  return (
    <div>
      {isLoggedIn ? (
        <p>Bem-vindo, {user?.name}!</p>
      ) : (
        <p>Faça login para acessar recursos exclusivos</p>
      )}
    </div>
  );
}
```

## Exemplos de Casos de Uso

### 1. Exibição Condicional de Preços (ProductCard)

```tsx
function ProductCard({ product }) {
  const { isLoggedIn } = useAuth();
  
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      
      {isLoggedIn ? (
        <div className="price">
          <span>€{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <span className="original-price">€{formatCurrency(product.originalPrice)}</span>
          )}
        </div>
      ) : (
        <button className="login-button">
          <FiUser /> Login para ver preço
        </button>
      )}
    </div>
  );
}
```

### 2. Proteção de Rota (Carrinho)

```tsx
function CartPage() {
  const { isLoggedIn } = useAuth();
  const { items, totalPrice } = useCart();
  
  // Se não estiver logado, exiba uma mensagem alternativa
  if (!isLoggedIn) {
    return (
      <div className="login-required-message">
        <h2>Acesso Restrito</h2>
        <p>Faça login para acessar seu carrinho</p>
        <LoginButton />
      </div>
    );
  }
  
  // Caso contrário, exiba o conteúdo normal do carrinho
  return (
    <div className="cart">
      <h1>Seu Carrinho ({items.length} itens)</h1>
      {/* Resto do conteúdo do carrinho */}
    </div>
  );
}
```

### 3. Verificação de Permissão de Administrador

```tsx
function Header() {
  const { isLoggedIn, isAdmin } = useAuth();
  
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/produtos">Produtos</Link>
        
        {isLoggedIn && (
          <Link href="/minha-conta">Minha Conta</Link>
        )}
        
        {isAdmin && (
          <Link href="/admin" className="admin-link">
            Painel Admin
          </Link>
        )}
      </nav>
    </header>
  );
}
```

### 4. Implementando o Login

```tsx
function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Em uma aplicação real, isso seria uma chamada à API
    // Aqui vamos simular um login bem-sucedido
    login({
      id: '123',
      name: 'João Silva',
      email: email,
      isAdmin: false
    });
    
    // Redirecionar ou exibir mensagem de sucesso
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Senha" 
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
```

### 5. Implementando o Logout

```tsx
function UserMenu() {
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    // Redirecionar para a página inicial após logout
    window.location.href = '/';
  };
  
  return (
    <div className="user-menu">
      <p>Olá, {user?.name}</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
```

### 6. Botões de Login Rápido para Desenvolvimento

```tsx
function DevLoginButtons() {
  const { login } = useAuth();
  
  const loginAsUser = () => {
    login({
      id: 'dev-user',
      name: 'Usuário Teste',
      email: 'usuario@teste.com',
      isAdmin: false
    });
  };
  
  const loginAsAdmin = () => {
    login({
      id: 'dev-admin',
      name: 'Admin Teste',
      email: 'admin@teste.com',
      isAdmin: true
    });
  };
  
  return (
    <div className="dev-buttons">
      <button onClick={loginAsUser} className="dev-button user">
        DevLogin-User
      </button>
      <button onClick={loginAsAdmin} className="dev-button admin">
        DevLogin-Admin
      </button>
    </div>
  );
}
```

## Observações Importantes

1. Sempre importe `useAuth` do contexto para acessar as funcionalidades de autenticação.
2. Use o valor `isLoggedIn` para exibir conteúdo condicionalmente com base no estado de login.
3. Use o valor `isAdmin` para controlar acesso a recursos administrativos.
4. O objeto `user` contém informações do usuário logado (nome, email, etc).
5. A função `login(user)` recebe um objeto com os dados do usuário e atualiza o estado de autenticação.
6. A função `logout()` limpa o estado de autenticação.

## Dicas para Testes em Desenvolvimento

Durante o desenvolvimento, você pode usar os botões DevLogin para alternar rapidamente entre estados de autenticação:

1. Clique em "DevLogin-User" para simular um usuário normal logado
2. Clique em "DevLogin-Admin" para simular um administrador logado
3. Use o botão de Logout para voltar ao estado não autenticado

Isso facilita o teste de diferentes estados da interface sem precisar implementar um sistema completo de autenticação durante o desenvolvimento. 