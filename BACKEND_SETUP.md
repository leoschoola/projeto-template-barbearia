# Setup e Deploy - Backend FahCortes

## Alterações Feitas

### Arquivos Modificados
- `src/main/java/com/barbearia/fahcortes/infra/security/DadosTokenJWT.java`
- `src/main/java/com/barbearia/fahcortes/infra/controller/usuario/AuthController.java`

### Mudanças Principais
1. **DadosTokenJWT** agora inclui campo `tipo` (role do usuário)
2. **AuthController.efetuarLogin()** extrai e retorna o tipo do usuário

---

## Como Compilar

```bash
cd /caminho/para/FahCortes
mvn clean install
```

## Como Testar o Endpoint /login

Com o backend rodando em `http://localhost:8080`:

```bash
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "senha": "123456"}'
```

### Resposta Esperada
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tipo": "ADMIN"
}
```

ou

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tipo": "USER"
}
```

---

## Possíveis Erros

### 1. `getTipo()` retorna null
- **Causa:** Coluna `tipo` não existe na tabela `usuario` ou user não tem role associada
- **Solução:** Verificar schema do banco:
  ```sql
  SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
  WHERE TABLE_NAME='usuario' AND COLUMN_NAME='tipo';
  ```

### 2. Enum value inválido
- **Causa:** `getTipo()` retorna valor que não mapeia para enum ADMIN/USER/BARBEIRO
- **Solução:** Verificar valores salvos no banco e validação na entidade `Usuario`

### 3. CORS error no frontend (localhost:3000)
- **Causa:** Backend configura CORS apenas para localhost:5173
- **Solução:** Atualizar `application.properties`:
  ```properties
  cors.allowed-origins=http://localhost:3000,http://localhost:8080
  ```

---

## Próximas Implementações Necessárias

Após confirmar que login retorna `tipo`, implementar:

### 1. Endpoints de Serviço ✅ (já existe no master)
- GET /servico (listar) — requer ADMIN
- GET /servico/{id}
- POST /servico (criar) — requer ADMIN
- DELETE /servico/{id} — requer ADMIN
- PUT /servico/{id} (atualizar) — ainda não existe

### 2. CRUDs faltantes
- Barbeiro
- Agendamento
- Produto
- Unidade
- Plano

Seguir o mesmo padrão implementado em Serviço (Clean Architecture, UseCase, Repository, etc).

---

## Integração Frontend

O frontend já espera:
- POST `/login` retornar `{token: string, tipo: 'ADMIN' | 'USER' | 'BARBEIRO'}`
- GET `/servico` retornar array de `{id, nome, preco, duracao}`
- Todos os endpoints usam header `Authorization: Bearer <token>`

Arquivos que integram com o backend:
- `src/api/config.ts` — wrapper de fetch com Authorization header
- `src/api/servico.ts` — chamadas tipadas para /servico
- `src/context/AuthContext.tsx` — login e persistência de perfil

---

## Checklist de Deploy

- [ ] Compilar backend com `mvn clean install`
- [ ] Testar POST /login retorna tipo
- [ ] Validar CORS para localhost:3000 (ou origin da produção)
- [ ] Rodar frontend com `npm start`
- [ ] Login com email/senha válido
- [ ] Verificar localStorage: `fahcortes_perfil` armazena tipo corretamente
- [ ] Botão "Adicionar Serviço" aparece para ADMIN
- [ ] AgendarPage carrega serviços do endpoint GET /servico
- [ ] Build para produção com `npm run build` e deploy em GitHub Pages

---

## Documentação Adicional

- `CLAUDE.md` — Documentação do projeto completa
- `src/api/config.ts` — Configuração de API e types
- `src/api/servico.ts` — Exemplo de API layer para replicar em outras entidades
