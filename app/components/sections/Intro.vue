<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing, page } = useRhSite()
const route = useRoute()
const title = computed(() => page(route.path)?.title)
</script>

<template>
  <section class="hero intro">
    <div class="wrap">
      <div>
        <nav class="crumbs" aria-label="Você está em"><NuxtLink to="/">Início</NuxtLink> / {{ title }}</nav>
        <RhText v-if="p.eyebrow || editing" tag="p" class="eyebrow" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
        <TTitle tag="h1" class="display" path="title" :value="p.title" />
        <RhText tag="p" class="lead" path="lead" :value="p.lead" ph="Texto" ml />
      </div>
      <div v-if="p.image" class="terroir-media"><img :src="p.image" :alt="p.imageAlt || ''"></div>
    </div>
  </section>
</template>
