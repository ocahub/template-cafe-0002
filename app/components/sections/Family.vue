<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
</script>

<template>
  <section :id="p.anchor || undefined" class="section on-white">
    <div class="wrap family">
      <div class="family-media">
        <div class="photo"><img v-if="p.image" :src="p.image" :alt="p.imageAlt || ''" loading="lazy"></div>
        <div v-if="p.badgeTitle || editing" class="years"><strong><RhText path="badgeTitle" :value="p.badgeTitle" ph="40+" /></strong><RhText tag="span" path="badgeText" :value="p.badgeText" ph="anos" /></div>
      </div>
      <div>
        <RhText v-if="p.eyebrow || editing" tag="p" class="eyebrow" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
        <TTitle class="h2" path="title" :value="p.title" />
        <RhText tag="p" class="family-text" style="margin-top:24px;white-space:pre-line" path="text" :value="p.text" ph="Texto" ml />
        <p v-if="p.signature || editing" class="signature"><RhText path="signature" :value="p.signature" ph="Assinatura" /><RhText tag="span" class="role" path="role" :value="p.role" ph="Quem é" /></p>
      </div>
    </div>
  </section>
</template>
