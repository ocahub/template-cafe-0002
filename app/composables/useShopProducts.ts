import type { ShelfProduct } from '~/types'

/**
 * Os produtos da loja para as secoes (00048): o retrato do build no HTML e os
 * atuais, direto da API publica, quando a secao aparece na tela. A mesma chave
 * da vitrine do kit: uma leitura para a pagina toda.
 */
export function useShopProducts() {
  const api = useRhPublic()
  const live = useRhLive('sales:products:1:48', () => api.get<{ items: ShelfProduct[] }>('sales', '/products', { page: 1, size: 48 }))
  const items = computed(() => live.data.value?.items ?? [])
  return { ...live, items }
}

/** "produtor" = com fabricante; "sem-produtor" = os outros; "todos". */
export function shopFilter(items: ShelfProduct[], source: string | undefined, count: unknown) {
  const n = Math.max(1, Number(count) || 4)
  const list = source === 'produtor' ? items.filter(p => p.manufacturer) : source === 'sem-produtor' ? items.filter(p => !p.manufacturer) : items
  return list.slice(0, n)
}
