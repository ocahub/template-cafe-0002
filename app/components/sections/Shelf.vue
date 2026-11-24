<script setup lang="ts">
/** Vitrine: os produtos da loja, atuais (o kit le a API publica quando a secao aparece). */
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
</script>

<template>
  <section :id="p.anchor || undefined" class="section">
    <div class="wrap">
      <div class="section-head">
        <RhText v-if="p.eyebrow || editing" tag="p" class="eyebrow" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
        <TTitle class="h2" path="title" :value="p.title" />
        <RhText v-if="p.lead || editing" tag="p" class="lead" path="lead" :value="p.lead" ph="Texto" ml />
      </div>
      <RhProductShowcase kind="produtos" :count="p.count" :layout="p.layout">
        <template #empty><p v-if="editing" class="muted">Nenhum produto à venda na loja. No site, esta vitrine não aparece.</p></template>
      </RhProductShowcase>
      <div v-if="p.button || editing" class="hero-ctas" style="margin-top:40px;justify-content:center"><NuxtLink to="/loja" class="btn btn-ghost"><RhText path="button" :value="p.button" ph="Botão" /></NuxtLink></div>
    </div>
  </section>
</template>
