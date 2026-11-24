import manifest from '~~/template.json'

/**
 * O template.json (00047): secoes, campos, aparencias e o conteudo padrao.
 * O painel le o mesmo arquivo (pelo cloud-management) para montar o editor.
 */
export const TEMPLATE = manifest

type Props = Record<string, any>
type SectionRef = string | { type: string, props?: Props }

const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v))

/** "hero" ou { type, props }: o padrao da secao com o que a pagina muda. */
export function templateSection(ref: SectionRef, id: string) {
  const type = typeof ref === 'string' ? ref : ref.type
  const base = (manifest.sectionDefaults as Record<string, Props>)[type] ?? {}
  return { id, type, props: { ...clone(base), ...(typeof ref === 'string' ? {} : clone(ref.props ?? {})) } }
}

/** O conteudo padrao do template, para quando nada foi publicado ainda. */
export function templateDefaultContent() {
  return {
    template: { id: manifest.id, version: manifest.version },
    theme: { ...manifest.defaults.theme },
    globals: {
      header: templateSection('header', 'header'),
      footer: templateSection('footer', 'footer')
    },
    pages: manifest.defaults.pages.map((p, i) => ({
      id: i === 0 ? 'p-home' : `p-${i}`,
      title: p.title, slug: p.slug, menu: p.menu, seoTitle: p.seoTitle, seoDescription: p.seoDescription,
      sections: (p.sections as SectionRef[]).map((s, j) => templateSection(s, `s-${i}-${j}`))
    }))
  }
}

/** Cores e fontes escolhidas no painel, nas variaveis do CSS do template (as do Flor do Vulcao). */
export function templateThemeVars(theme: Record<string, string> | undefined) {
  const palette = manifest.theme.palettes.find(p => p.id === theme?.palette) ?? manifest.theme.palettes[0]!
  const fonts = manifest.theme.fonts.find(f => f.id === theme?.fonts) ?? manifest.theme.fonts[0]!
  return {
    '--papel': palette.bg,
    '--papel-2': palette.surface2,
    '--kraft': palette.surface,
    '--kraft-2': palette.soft,
    '--tinta': palette.ink,
    '--tinta-2': palette.ink2,
    '--cereja': palette.accent,
    '--cereja-2': palette.accent2,
    '--folha': palette.leaf,
    '--basalto': palette.primary,
    '--basalto-2': palette.primary2,
    '--linha': palette.line,
    '--serif': fonts.display,
    '--sans': fonts.body
  }
}

/** Link de um botao: vazio = WhatsApp da loja; http = outro site; o resto, pagina do site. */
export function templateLink(link?: string | null): { kind: 'whatsapp' | 'external' | 'page', to: string } {
  const l = (link ?? '').trim()
  if (!l) return { kind: 'whatsapp', to: '' }
  if (/^https?:\/\//i.test(l) || l.startsWith('mailto:') || l.startsWith('tel:')) return { kind: 'external', to: l }
  return { kind: 'page', to: l.startsWith('/') ? l : `/${l}` }
}
