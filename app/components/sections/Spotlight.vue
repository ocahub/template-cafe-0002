<script setup lang="ts">
/**
 * O cafe em destaque: a ficha (notas, torra, sensorial) e o preco atual. O produto
 * e o do endereco escolhido no painel; vazio, o primeiro da loja.
 */
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
const shop = useShopProducts()
const liveEl = shop.el
const links = useRhLinks()
const format = useRhFormat()
const slug = computed(() => String(p.value.product ?? '').trim().replace(/^.*\/produto\//, '').replace(/^\/+|\/+$/g, ''))
const product = computed(() => (slug.value ? shop.items.value.find(x => x.slug === slug.value) : null) ?? shop.items.value[0] ?? null)
const productLink = computed(() => (product.value ? links.product(product.value.slug) : '/loja'))
const roast = computed(() => Math.min(5, Math.max(0, Number(p.value.roast) || 0)))
</script>

<template>
  <section :id="p.anchor || undefined" ref="liveEl" class="section">
    <div class="wrap product">
      <div class="product-media">
        <div class="main"><img v-if="p.image" :src="p.image" :alt="p.imageAlt || ''" loading="lazy"></div>
      </div>
      <div>
        <RhText v-if="p.eyebrow || editing" tag="p" class="eyebrow" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
        <TTitle class="h2" path="title" :value="p.title" />
        <RhText v-if="p.tagline || editing" tag="p" class="tagline" path="tagline" :value="p.tagline" ph="Linha de apoio" />
        <p v-if="product && p.price !== 'nao'" class="price">
          <small v-if="product.priceTo > product.priceFrom" style="margin:0 8px 0 0">a partir de</small>{{ format.price(product.priceFrom, product.currency) }}
        </p>
        <dl class="spec">
          <div v-if="p.notes?.length" class="spec-row">
            <dt><RhText path="notesLabel" :value="p.notesLabel" ph="Notas" /></dt>
            <dd class="chips">
              <span v-for="(n, i) in p.notes" :key="i" class="chip"><i :style="{ background: n.color || 'var(--kraft)' }" /><RhText :path="`notes.${i}.name`" :value="n.name" ph="Nota" /></span>
            </dd>
          </div>
          <div v-if="roast" class="spec-row">
            <dt><RhText path="roastLabel" :value="p.roastLabel" ph="Torra" /></dt>
            <dd class="roast"><span class="roast-bar" aria-hidden="true"><span v-for="i in 5" :key="i" :class="{ on: i <= roast }" /></span><RhText path="roastText" :value="p.roastText" ph="Média" /></dd>
          </div>
          <div v-for="(r, i) in p.rows ?? []" :key="i" class="spec-row">
            <dt><RhText :path="`rows.${i}.label`" :value="r.label" ph="Item" /></dt>
            <dd><RhText :path="`rows.${i}.text`" :value="r.text" ph="Texto" /></dd>
          </div>
        </dl>
        <div class="hero-ctas">
          <NuxtLink v-if="!p.link" :to="productLink" class="btn btn-primary"><RhText path="button" :value="p.button" ph="Botão" /></NuxtLink>
          <TButton v-else class="btn btn-primary" :link="p.link"><RhText path="button" :value="p.button" ph="Botão" /></TButton>
          <TButton v-if="p.button2 || editing" class="btn btn-ghost" :link="p.link2 || '/loja'"><RhText path="button2" :value="p.button2" ph="Botão" /></TButton>
        </div>
      </div>
    </div>
  </section>
</template>
