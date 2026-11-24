<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
</script>

<template>
  <section :id="p.anchor || undefined" class="section on-basalto terroir">
    <svg v-if="p.contours !== 'nao'" class="contours" viewBox="0 0 800 800" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">
      <ellipse cx="400" cy="400" rx="380" ry="330" transform="rotate(-12 400 400)" />
      <ellipse cx="405" cy="395" rx="330" ry="285" transform="rotate(-9 400 400)" />
      <ellipse cx="410" cy="392" rx="280" ry="240" transform="rotate(-6 400 400)" />
      <ellipse cx="414" cy="388" rx="230" ry="196" transform="rotate(-3 400 400)" />
      <ellipse cx="418" cy="385" rx="180" ry="152" />
      <ellipse cx="420" cy="382" rx="130" ry="108" transform="rotate(4 400 400)" />
      <ellipse cx="422" cy="380" rx="82" ry="66" transform="rotate(8 400 400)" />
      <ellipse cx="423" cy="379" rx="38" ry="30" transform="rotate(12 400 400)" />
    </svg>
    <div class="wrap terroir-grid">
      <div>
        <RhText v-if="p.eyebrow || editing" tag="p" class="eyebrow" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
        <TTitle class="h2" path="title" :value="p.title" />
        <RhText tag="p" class="lead" style="margin-top:22px" path="lead" :value="p.lead" ph="Texto" ml />
        <ul v-if="p.items?.length" class="terroir-list">
          <li v-for="(it, i) in p.items" :key="i"><strong><RhText :path="`items.${i}.title`" :value="it.title" ph="Título" /></strong><RhText tag="span" :path="`items.${i}.text`" :value="it.text" ph="Texto" ml /></li>
        </ul>
      </div>
      <div class="terroir-media"><img v-if="p.image" :src="p.image" :alt="p.imageAlt || ''" loading="lazy"></div>
    </div>
  </section>
</template>
