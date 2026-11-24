<script setup lang="ts">
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
      </div>
      <ol class="steps" :style="{ '--n': Math.min(4, p.items?.length || 4) }">
        <li v-for="(it, i) in p.items" :key="i"><span class="num">{{ String(Number(i) + 1).padStart(2, '0') }}</span><RhText tag="h3" :path="`items.${i}.title`" :value="it.title" ph="Etapa" /><RhText tag="p" :path="`items.${i}.text`" :value="it.text" ph="Texto" ml /></li>
      </ol>
    </div>
  </section>
</template>
