# template-cafe-0002

Template de site de café de origem da plataforma (atividade 00058), feito a partir do
site do **Flor do Vulcão**: papel, kraft, tinta marrom e cereja, Fraunces + Jost, a foto
em arco com o selo girando, o manifesto, as duas palavras do nome, a origem em fundo
escuro com curvas de nível, o café em destaque com a ficha sensorial e do pé à xícara.

Para lojas que **vendem**: o `template.json` pede `sales:CreateProduct`. A tenant
escolhe o template em **Loja › Site** e monta as páginas em **Editar páginas**: textos,
imagens, ordem das seções, páginas novas, cores e fontes. O build lê a versão
**publicada** no cloud-management.

## Como funciona

- **`template.json`**: as seções, as aparências (3 paletas, 2 pares de fontes), o
  conteúdo padrão (genérico, com ilustrações: o repositório é público e qualquer loja
  pode escolher o template) e as páginas prontas: Início e Sobre nós.
- **`app/components/sections/`**: um componente por tipo (`spotlight` → `SectionSpotlight`).
- **Títulos com destaque**: nos títulos, o que estiver entre `*asteriscos*` sai em
  itálico na cor de destaque (`TTitle`).
- **O café em destaque** (`spotlight`): a ficha é texto do editor; o preço é o atual do
  produto escolhido (endereço do produto, ou o primeiro da loja), lido na API pública
  quando a seção aparece (`useShopProducts`).
- **Rodapé**: tem sempre o link **Preferências de cookies** do kit (LGPD, 00057).
- **O resto da loja vem do `@ocahub/kit`**: `/loja`, produto (com o perfil Café),
  `/produtor/{slug}`, carrinho, checkout, conta e pedidos.
- **Variáveis da empresa** nos textos: `{empresa}`, `{whatsapp}`, `{telefone}`,
  `{email}`, `{endereco}` e `{instagram}` (Loja › Dados da loja › Contatos do site).
- **Âncoras**: `/#cafe`, `/#historia`, `/#origem`, `/#processo`, `/#contato` (campo
  "Âncora" de cada seção).

## Desenvolvimento

```bash
npm install
npm run dev   # http://localhost:3025, com o sales-api do dev
```
