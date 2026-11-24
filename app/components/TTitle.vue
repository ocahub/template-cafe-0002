<script setup lang="ts">
/**
 * Titulo com destaque: o que estiver entre *asteriscos* sai em italico na cor de
 * destaque ("Cafe nascido na terra de um *vulcao*."). No editor, o texto cru.
 */
const props = withDefaults(defineProps<{ path: string, value?: string | null, tag?: string, ph?: string }>(), { value: '', tag: 'h2', ph: 'Título' })
const { editing } = useRhSite()
const company = useRhCompany()
const parts = computed(() => company.text(props.value).split(/\*([^*]+)\*/).map((text, i) => ({ text, em: i % 2 === 1 })).filter(p => p.text))
</script>

<template>
  <RhText v-if="editing" :tag="tag" :path="path" :value="value" :ph="ph" />
  <component :is="tag" v-else><template v-for="(p, i) in parts" :key="i"><em v-if="p.em">{{ p.text }}</em><template v-else>{{ p.text }}</template></template></component>
</template>
