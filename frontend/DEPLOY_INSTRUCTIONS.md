# Instruções para Deploy no Render.com

## Configuração da URL da API

### 1. Obter a URL do seu deploy no Render.com
Após fazer o deploy do backend no Render.com, você receberá uma URL como:
```
https://seu-app.onrender.com
```

### 2. Atualizar a configuração
Edite o arquivo `frontend/js/config.js` e substitua a URL de exemplo pela sua URL real:

```javascript
// Linha 8 - Substitua pela sua URL real do Render.com
return 'https://seu-app.onrender.com';
```

**Exemplo:**
```javascript
// Se sua URL for: https://gestao-financeira-api.onrender.com
return 'https://gestao-financeira-api.onrender.com';
```

### 3. Como funciona a detecção automática

O sistema detecta automaticamente o ambiente:

- **Desenvolvimento local** (`localhost` ou `127.0.0.1`): 
  - Usa: `http://127.0.0.1:3333`

- **Produção** (qualquer outro domínio):
  - Usa: A URL configurada no `config.js`

### 4. Deploy do Frontend

Após configurar a URL, faça o deploy do frontend em qualquer serviço:
- GitHub Pages
- Netlify
- Vercel
- Render.com (static site)

### 5. Verificação

Para verificar se está funcionando:
1. Abra o console do navegador (F12)
2. Verifique se não há erros de CORS
3. Teste as funcionalidades de CRUD

### 6. Troubleshooting

**Erro de CORS:**
- Certifique-se de que o backend no Render.com está configurado para aceitar requisições do domínio do frontend

**URL não encontrada:**
- Verifique se a URL no `config.js` está correta
- Teste a URL diretamente no navegador

**Erro 404:**
- Verifique se o backend está rodando no Render.com
- Confirme se as rotas estão corretas 