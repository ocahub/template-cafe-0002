<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing, page } = useRhSite()
const route = useRoute()
const inner = computed(() => route.path !== '/' && route.path !== '/_editor')
const title = computed(() => page(route.path)?.title)
const company = useRhCompany()
const stamp = computed(() => company.text(p.value.stampText || ''))
const uid = `fv-circ-${props.section.id}`
</script>

<template>
  <section class="hero">
    <div class="wrap">
      <div>
        <nav v-if="inner" class="crumbs" aria-label="Você está em"><NuxtLink to="/">Início</NuxtLink> / {{ title }}</nav>
        <RhText v-if="p.eyebrow || editing" tag="p" class="eyebrow" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
        <TTitle tag="h1" class="display" path="title" :value="p.title" />
        <RhText tag="p" class="lead" path="subtitle" :value="p.subtitle" ph="Texto" ml />
        <div class="hero-ctas">
          <TButton v-if="p.button || editing" class="btn btn-primary" :link="p.link"><RhText path="button" :value="p.button" ph="Botão" /></TButton>
          <TButton v-if="p.button2 || editing" class="btn btn-ghost" :link="p.link2"><RhText path="button2" :value="p.button2" ph="Botão" /></TButton>
        </div>
        <ul v-if="p.facts?.length" class="facts" aria-label="Destaques">
          <li v-for="(f, i) in p.facts" :key="i"><strong><RhText :path="`facts.${i}.title`" :value="f.title" ph="Destaque" /></strong><span><RhText :path="`facts.${i}.text`" :value="f.text" ph="Detalhe" /></span></li>
        </ul>
      </div>
      <div class="hero-media">
        <div class="arch"><img v-if="p.image" :src="p.image" :alt="p.imageAlt || ''"></div>
        <div v-if="stamp" class="hero-stamp" aria-hidden="true">
          <svg viewBox="0 0 200 200"><defs><path :id="uid" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
            <text font-family="var(--sans)" font-size="15.5" letter-spacing="5" fill="currentColor"><textPath :href="`#${uid}`">{{ stamp.toUpperCase() }} · </textPath></text></svg>
          <img v-if="p.stampImage" :src="p.stampImage" alt="">
        </div>
      </div>
    </div>
  </section>
</template>
