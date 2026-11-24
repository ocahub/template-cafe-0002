<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
</script>

<template>
  <section :id="p.anchor || undefined" class="section">
    <div class="wrap" style="max-width:860px">
      <RhText v-if="p.eyebrow || editing" tag="p" class="eyebrow" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
      <TTitle class="h2" style="margin-bottom:24px" path="title" :value="p.title" />
      <RhText tag="p" class="lead" style="white-space:pre-line;max-width:none" path="text" :value="p.text" ph="Texto" ml />
    </div>
  </section>
</template>
