/** O que os cartoes do site usam do produto da vitrine (o kit nao exporta os tipos do runtime). */
export interface ShelfProduct {
  id: string
  slug: string
  name: string
  manufacturer: string | null
  manufacturerSlug?: string | null
  priceFrom: number
  priceTo: number
  currency: string
  image: { thumb: { url: string } | null, full: { url: string } | null } | null
}
