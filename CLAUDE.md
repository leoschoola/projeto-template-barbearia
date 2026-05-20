# Barbearia Fah Cortes — Template

React SPA para barbearia, com deploy no GitHub Pages via `gh-pages`.

## Stack

- **React 19** + **TypeScript**
- **react-router-dom v7** — roteamento SPA com `BrowserRouter` e `basename="/projeto-template-barbearia"`
- **react-icons** — ícones (ex: `AiFillCloseCircle` do pacote `ai`)
- **Font Awesome** — ícones via CDN no `public/index.html`
- **CRA (react-scripts 5)** — build e dev server

## Estrutura

```
src/
  App.tsx                  # Raiz: AuthProvider + ToastProvider + BrowserRouter + AppContent
  index.tsx                # Entry point

  context/
    AuthContext.tsx         # Auth global: token, perfil, login(), logout(), simularAdmin()
    ToastContext.tsx        # Notificações: mostrarToast(msg, tipo?)
    Toast.css              # Estilos do toast

  pages/
    Home.tsx
    LoginPage.tsx          # Form de login conectado ao POST /login
    CadastroPage.tsx       # Cadastro de usuário (chama POST /usuarios, inclui select de perfil)
    BarberPage.tsx         # Barbeiros + likes + admin controls + modal adicionar
    AgendarPage.tsx        # Abas: "Novo Agendamento" | "Meus Agendamentos" (localStorage)
    PlanosPage.tsx         # Planos + admin controls + modal adicionar
    UnidadesPage.tsx       # Unidades + mapa iframe + admin controls + modal adicionar
    ProductsPage.tsx       # Produtos sem avaliação + admin controls + modal adicionar

  components/
    Header/
    Header-navigation/     # NavLink + suporte a button.cabecalho__link para logout
    Menu/
    Footer/
    Main/
    Services/
    TituloTextoPadrao/
    Cards/
    Contact-card/
    Barber-card/           # Props: curtidas, jaCurtiu, isAdmin, aoCurtir, aoDeletar, img (data URL ou filename)
    Plans-card/            # Props: isAdmin, aoDeletar — botão "Remover plano" inline
    Form/                  # Formulário de agendamento (AgendamentoData exportado)
    Local/                 # Props: mapaUrl (iframe Google Maps), isAdmin, aoDeletar
    Search/
    Products/              # Sem avaliação. Props: isAdmin, aoDeletar, img (data URL ou filename)
    Modal/                 # Modal reutilizável: titulo, onFechar, children
```

## Rotas

| Rota | Página | Acesso |
|---|---|---|
| `/` | Home | Todos |
| `/barbeiros` | BarberPage | Todos |
| `/agendar` | AgendarPage | Todos |
| `/planos` | PlanosPage | Todos |
| `/unidades` | UnidadesPage | Todos |
| `/produtos` | ProductsPage | Todos |
| `/login` | LoginPage | Todos |
| `/cadastro` | CadastroPage | Todos |

## Sistema de Autenticação

### AuthContext (`src/context/AuthContext.tsx`)
- **Tipo `Perfil`:** `'ADMIN' | 'USER' | 'BARBEIRO'`
- **Estado persistido no localStorage:**
  - `fahcortes_token` — JWT retornado pelo backend
  - `fahcortes_perfil` — perfil do usuário logado
- **Funções:**
  - `login(email, senha)` — chama `POST /login`, salva token e tipo
  - `logout()` — limpa localStorage e estado
  - `simularAdmin()` — **apenas desenvolvimento** — seta perfil ADMIN sem backend
- **Hook:** `useAuth()` disponível em qualquer componente dentro do `AuthProvider`

### Fluxo de login
1. `POST /login` com `{email, senha}`
2. Backend retorna `{token, tipo}` ← **`tipo` ainda não implementado no backend atual**
3. Token e tipo salvos no localStorage
4. Nav mostra botão "Sair" quando `isLogado === true`

### Botão dev (simular admin)
- Botão vermelho fixo no canto inferior direito, visível **somente em desenvolvimento**
- `process.env.NODE_ENV === 'development'` — removido automaticamente no build
- Clicando nele → `perfil = 'ADMIN'` sem precisar do backend

## Sistema de Notificações (Toast)

### ToastContext (`src/context/ToastContext.tsx`)
- **`mostrarToast(mensagem, tipo?)`** — tipos: `'sucesso'` (verde) | `'removido'` (laranja) | `'erro'` (vermelho)
- Auto-remove após 3,5s; botão X para fechar manualmente
- Toasts se empilham, aparecem centralizados na parte inferior
- Usado em todas as páginas com ações CRUD

## Controles de Admin

Padrão aplicado em **todas** as páginas de entidades:
- Botão "Adicionar X" visível apenas quando `perfil === 'ADMIN'`
- Ícone de deletar (`AiFillCloseCircle`) visível apenas quando `isAdmin`
- Modal com formulário abre ao clicar em "Adicionar X"
- Toast de sucesso ao adicionar, toast 'removido' ao deletar

### Upload de imagem (Barbeiro e Produto)
- Campo `<input type="file" accept="image/*">` no modal de adição
- `FileReader.readAsDataURL()` converte para base64
- Preview da imagem mostrado antes de salvar (`modal__imagem-previa`)
- Componente detecta se `img` é data URL ou filename:
  ```tsx
  const imgSrc = img.startsWith('data:') || img.startsWith('http')
    ? img
    : `${process.env.PUBLIC_URL}/imagens/${img}.jpg`;
  ```

## Sistema de Likes (Barbeiros)

- `curtidas: number` em cada barbeiro (começa com valores reais)
- `curtidasLocais: Set<number>` persistido em `localStorage` (`fahcortes_curtidas`)
- Botão de coração visível para não-admins; desabilitado após curtir
- Botão "Mais curtidos" ordena lista em tempo real por `curtidas` desc
- Toast ao curtir: `"Você curtiu [Nome]!"`

## Agendamentos

- Salvos em `localStorage` como `fahcortes_agendamentos`
- Interface `Agendamento` estende `AgendamentoData` com `id`, `status`
- Status: `'confirmado'` | `'cancelado'`
- Aba "Meus Agendamentos" em `/agendar` lista do mais recente ao mais antigo
- Badge numérico na aba mostra quantos estão confirmados
- Botão "Cancelar agendamento" atualiza status e mostra toast

## Google Maps nas Unidades

- Função `gerarUrlMapa(endereco)` em `UnidadesPage.tsx` cria URL de embed do Google Maps
- Prop `mapaUrl` passada ao componente `Local`
- Iframe aparece dentro do card de cada unidade (`height: 200px`)

## Padrões TypeScript

- Interfaces de props definidas no próprio arquivo do componente
- Props opcionais com `?`
- `AgendamentoData` exportada de `src/components/Form/index.tsx`
- Handlers tipados: `React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>`
- `useCallback` no `mostrarToast` para evitar re-renders

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "react-jsx",
    "noEmit": true,
    "isolatedModules": true
  }
}
```

## Imagens

Todas em `public/imagens/`. Referenciadas via `process.env.PUBLIC_URL` ou como data URL (upload):
```tsx
src={`${process.env.PUBLIC_URL}/imagens/capa1.jpg`}
```

## Backend

- **Repositório:** https://github.com/viniciusprogr/FahCortes
- **Stack:** Spring Boot 3.4.2 + Java 25 + MySQL + JWT (Auth0) + Clean Architecture
- **Base URL dev:** `http://localhost:8080`

### Endpoints implementados
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/login` | Público | Retorna `{token}` — **falta retornar `tipo`** |
| POST | `/usuarios` | Público | Cadastrar usuário |
| GET | `/usuarios` | Auth | Listar usuários |
| GET | `/usuarios/{id}` | Auth | Buscar por ID |
| GET | `/usuarios/email?email=` | Auth | Buscar por email |
| PUT | `/usuarios/{id}` | Auth | Atualizar usuário |
| DELETE | `/usuarios/{id}` | Auth | Deletar usuário |

### Bugs críticos no backend
1. `LoginResponseDto` não retorna `tipo` → frontend não sabe o perfil do usuário
2. `atualizarUsuario()` salva senha sem `BCrypt` (texto puro)
3. Segredo JWT hardcoded: `minha-chave-secreta`
4. CORS fixo para `localhost:5173` (frontend usa porta 3000)

### Domínios que precisam ser criados no backend
- `Servico` (corte, barba, combo, etc.)
- `Agendamento`
- `Barbeiro` (separado de Usuario)
- `Produto`
- `Unidade`
- `Plano`

## Deploy

```bash
npm run deploy   # build + gh-pages -d build
```

## Pendências conhecidas

- Busca por CEP em `Search` sem lógica real
- Botões "Agendar Aqui", "Adicionar ao Carrinho", "Ver Todos os Produtos" sem `onClick`
- Botão "Assinar Plano X" sem ação
- Footer: links do Facebook e Twitter apontam para o Instagram
- Prop com typo: `distacia` (falta o "n") no componente `Local` — mantido para não quebrar chamadas existentes
- Dados (barbeiros, produtos, unidades, planos) hardcoded — sem integração com API real
- Backend não retorna `tipo` no login → sistema de perfil funciona apenas via `simularAdmin()` por enquanto
- Backend não tem endpoints de CRUD para Servico, Agendamento, Barbeiro, Produto, Unidade, Plano
