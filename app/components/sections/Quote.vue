<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
const bg = computed(() => ({ kraft: 'on-kraft', claro: 'on-white', escuro: 'on-basalto' } as Record<string, string>)[p.value.background] ?? '')
</script>

<template>
  <section class="section-tight" :class="bg" aria-label="Manifesto">
    <div class="wrap manifesto">
      <img v-if="p.image" :src="p.image" alt="">
      <RhText tag="blockquote" path="text" :value="p.text" ph="Frase" ml />
      <RhText v-if="p.cite || editing" tag="cite" path="cite" :value="p.cite" ph="Quem diz / onde" />
    </div>
  </section>
</template>
