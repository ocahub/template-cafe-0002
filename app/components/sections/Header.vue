<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const store = useRhStore()
const { menu, editing } = useRhSite()
const company = useRhCompany()
const logo = computed(() => p.value.logoImage || store.value?.logoUrl || '')
const name = computed(() => store.value?.name ?? '')
// Blog (00049): no menu quando o site tem post no ar.
const blog = useRhBlogInfo()
const links = computed(() => [
  ...(p.value.links ?? []).map((l: { label: string, link: string }) => ({ to: l.link || '/', label: company.text(l.label) })),
  ...menu.value.map(m => ({ to: m.slug, label: m.title })),
  ...(blog.enabled ? [{ to: blog.path, label: 'Blog' }] : []),
  { to: '/loja', label: company.text(p.value.shopLabel) || 'Loja' }
])
const route = useRoute()
const open = ref(false)
watch(() => route.fullPath, () => { open.value = false })
const current = (to: string) => (!to.includes('#') && to !== '/' && route.path.startsWith(to) ? 'page' : undefined)
</script>

<template>
  <div v-if="p.notice || editing" class="topbar"><RhText path="notice" :value="p.notice" ph="Faixa do topo" /></div>
  <header class="header">
    <div class="wrap">
      <NuxtLink to="/" class="brand" :aria-label="`${name}, início`">
        <img v-if="logo" :src="logo" :alt="name">
        <span v-else class="brand-text">{{ name }}</span>
      </NuxtLink>
      <nav id="nav" class="nav" :class="{ open }" aria-label="Principal">
        <NuxtLink v-for="l in links" :key="l.to + l.label" :to="l.to" :aria-current="current(l.to)">{{ l.label }}</NuxtLink>
      </nav>
      <div class="header-actions fv-tools">
        <RhAccountButton />
        <RhCartButton />
        <button class="icon-btn menu-btn" aria-controls="nav" :aria-expanded="open" aria-label="Abrir menu" @click="open = !open"><TIcon name="menu" /></button>
      </div>
    </div>
  </header>
</template>
