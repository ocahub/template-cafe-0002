<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
const items = computed(() => (p.value.items ?? []).slice(0, 2))
</script>

<template>
  <section :id="p.anchor || undefined" class="section">
    <div class="wrap">
      <div class="section-head center">
        <RhText v-if="p.eyebrow || editing" tag="p" class="eyebrow" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
        <TTitle class="h2" path="title" :value="p.title" />
      </div>
      <div class="name-grid">
        <template v-for="(it, i) in items" :key="i">
          <div v-if="i === 1" class="name-divider" aria-hidden="true"><img v-if="p.image" :src="p.image" alt=""></div>
          <div class="name-card">
            <RhText tag="p" class="word" :class="{ cereja: i === 1 }" :path="`items.${i}.word`" :value="it.word" ph="Palavra" />
            <RhText tag="p" :path="`items.${i}.text`" :value="it.text" ph="Texto" ml />
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
