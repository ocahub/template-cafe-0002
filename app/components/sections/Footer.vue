<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing, menu } = useRhSite()
const store = useRhStore()
const company = useRhCompany()
const v = computed(() => company.values.value)
const logo = computed(() => p.value.logoImage || store.value?.logoUrl || '')
const wa = computed(() => company.whatsappUrl())
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <img v-if="logo" class="logo" :class="{ invert: p.invertLogo !== 'nao' }" :src="logo" :alt="v.empresa">
          <p v-else class="brand-text">{{ v.empresa }}</p>
          <RhText tag="p" style="margin-top:20px;max-width:22em" path="text" :value="p.text" ph="Texto" ml />
        </div>
        <div>
          <h4>Loja</h4>
          <ul>
            <li><NuxtLink to="/loja">{{ company.text(p.shopLabel) || 'Loja' }}</NuxtLink></li>
            <li><NuxtLink to="/minha-conta">Minha conta</NuxtLink></li>
            <li><NuxtLink to="/minha-conta/pedidos">Meus pedidos</NuxtLink></li>
          </ul>
        </div>
        <div>
          <RhText tag="h4" path="linksTitle" :value="p.linksTitle" ph="Título" />
          <ul>
            <li v-for="(l, i) in p.links ?? []" :key="i"><NuxtLink :to="l.link || '/'"><RhText :path="`links.${i}.label`" :value="l.label" ph="Link" /></NuxtLink></li>
            <li v-for="m in menu" :key="m.slug"><NuxtLink :to="m.slug">{{ m.title }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4>Contato</h4>
          <ul>
            <li v-if="company.instagramUrl.value"><a :href="company.instagramUrl.value" target="_blank" rel="noopener">Instagram {{ v.instagram }}</a></li>
            <li v-if="wa"><a :href="wa" target="_blank" rel="noopener">WhatsApp {{ v.whatsapp }}</a></li>
            <li v-if="v.email"><a :href="`mailto:${v.email}`">{{ v.email }}</a></li>
            <li v-if="p.place || editing"><RhText tag="span" style="white-space:pre-line" path="place" :value="p.place" ph="Endereço" ml /></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© {{ year }} <RhText path="legal" :value="p.legal" ph="Linha legal" /></span>
        <RhCookiePreferences />
        <span>Loja na plataforma OcaHub</span>
      </div>
    </div>
  </footer>
</template>
