<script setup lang="ts">
/** Contato: WhatsApp e Instagram vem de Loja › Dados da loja › Contatos do site. */
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
const company = useRhCompany()
const v = computed(() => company.values.value)
const wa = computed(() => company.whatsappUrl(company.text(p.value.message) || undefined))
</script>

<template>
  <section :id="p.anchor || undefined" class="section on-kraft">
    <div class="wrap contact">
      <div>
        <RhText v-if="p.eyebrow || editing" tag="p" class="eyebrow" path="eyebrow" :value="p.eyebrow" ph="Chamada" />
        <TTitle class="h2" path="title" :value="p.title" />
        <RhText tag="p" class="lead" style="margin-top:20px" path="lead" :value="p.lead" ph="Texto" ml />
      </div>
      <div class="contact-cards">
        <a v-if="wa" class="contact-card" :href="wa" target="_blank" rel="noopener">
          <TIcon name="wa" />
          <div><strong>WhatsApp</strong><span>{{ v.whatsapp }}</span></div>
        </a>
        <a v-if="company.instagramUrl.value" class="contact-card" :href="company.instagramUrl.value" target="_blank" rel="noopener">
          <TIcon name="ig" />
          <div><strong>Instagram</strong><span>{{ v.instagram }}</span></div>
        </a>
        <a v-if="v.email" class="contact-card" :href="`mailto:${v.email}`">
          <TIcon name="mail" />
          <div><strong>E-mail</strong><span>{{ v.email }}</span></div>
        </a>
        <div v-if="p.place || editing" class="contact-card">
          <TIcon name="pin" />
          <div><strong><RhText path="place" :value="p.place" ph="Lugar" /></strong><RhText tag="span" path="city" :value="p.city" ph="Cidade" /></div>
        </div>
      </div>
    </div>
  </section>
</template>
