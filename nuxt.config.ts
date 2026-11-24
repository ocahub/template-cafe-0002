// Template de site de cafe 0002 · Origem (00058), feito a partir do site do Flor do
// Vulcao: cafe de origem de um produtor, com a historia da familia, o terroir, o
// cafe em destaque e o caminho do pe a xicara. O conteudo (paginas, secoes, textos
// e imagens) a tenant edita no painel em Loja › Site › Editar páginas; o build le a
// versao publicada no cloud-management. A loja (prateleira, produto, produtor,
// carrinho, conta, checkout) vem do @ocahub/kit.
export default defineNuxtConfig({
  modules: ['@ocahub/kit'],
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },

  rhfactor: {
    storeId: process.env.RHFACTOR_STORE_ID ?? '',
    apiBase: process.env.RHFACTOR_API_BASE ?? 'http://localhost:8085',
    iamBase: process.env.RHFACTOR_IAM_BASE ?? 'http://localhost:8080',
    contractsBase: process.env.RHFACTOR_CONTRACTS_BASE ?? 'http://localhost:8082',
    paymentsBase: process.env.RHFACTOR_PAYMENTS_BASE ?? 'http://localhost:8089',
    // A inicial e do template; a prateleira do kit fica na Loja, e o fabricante e o "produtor".
    pages: { shelf: '/loja', manufacturer: '/produtor' },
    siteContent: true
  },

  // Cada tipo de secao e um componente global Section{Tipo}: o kit monta a pagina pelo tipo.
  components: [
    { path: '~/components/sections', prefix: 'Section', global: true },
    '~/components'
  ],

  css: ['~/assets/css/template.css', '~/assets/css/loja.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..600,0..100,0..1;1,9..144,300..600,0..100,0..1&family=Jost:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap' }
      ]
    }
  }
})
