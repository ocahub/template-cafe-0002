<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
</script>

<template>
  <section class="section-tight" aria-label="Fotos" style="padding-top:0">
    <div class="wrap gallery">
      <figure v-for="(it, i) in (p.items ?? []).filter((x: any) => x.image)" :key="i"><img :src="it.image" :alt="it.alt || ''" loading="lazy"></figure>
    </div>
  </section>
</template>
