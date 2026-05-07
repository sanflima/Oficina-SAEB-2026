# SAEB Workshop — PROFMAT / UNIVASF Design System

## Overview

This design system supports the **Oficina SAEB** — a workshop series run by **PROFMAT** (Mestrado Profissional em Matemática) in partnership with **UNIVASF** (Universidade Federal do Vale do São Francisco). The primary deliverable is a landing/sales page for the workshop aimed at mathematics teachers in public basic education.

### Sources provided
- **Visual reference**: [Behance — Agência Visto sales page](https://www.behance.net/gallery/246423775/Pagina-de-vendas-Agencia-Visto) (screenshots: uploads/1.png–6.png)
- **UNIVASF logo**: `uploads/Screenshot_1.png` → `assets/logo-univasf.png`
- **PROFMAT logo**: `uploads/ChatGPT Image 30 de abr. de 2026, 14_22_45.png` → `assets/logo-profmat.png`

---

## Content Fundamentals

**Language**: Brazilian Portuguese (pt-BR)

**Tone**: Professional but warm and accessible. Direct, practical, action-oriented. Builds trust through clarity and specificity. Not academic-stiff — encourages participation.

**Voice**:
- Uses **você** (direct address, second person)
- Imperative CTAs: "Inscreva-se agora", "Garantir minha vaga", "Saiba mais"
- Short sentences. Benefits first, mechanics second.
- Numbers and social proof: "+120 professores já participaram"
- Certainty words: "estruturado", "completo", "prático", "certificado"

**Casing**: Title case for section labels; sentence case for headings and body. No ALL CAPS in body copy. Section tag labels in small caps style via letter-spacing.

**Emoji**: Not used in body copy or headings. Only used as icon placeholders inside UI components (icon-box) until real icons are sourced.

**Examples**:
- Hero: "Aprenda a **interpretar** os resultados do SAEB"
- Subheading: "Formação prática para professores de matemática do ensino básico"
- CTA: "Garantir minha vaga"
- Tag pill: "● Oficina SAEB 2025"
- Feature: "Você não precisa entender os resultados do SAEB sozinho."

---

## Visual Foundations

### Colors
- **Primary blue** `#2563eb` (blue-600): main CTAs, links, accents in headings, icon boxes
- **Navy** `#0d1b3e`: dark section backgrounds (methodology, footer)
- **PROFMAT teal** `#1a9ea8`: secondary accent, alternate icon color, teal section tags
- **UNIVASF gold** `#f59e0b`: tertiary highlight (badges, specific modules)
- **Page background** `#f8fafc` (gray-50): base page tint, very light
- **Surface** `#ffffff`: cards, nav, banners
- **Body text** `#475569` (gray-600); **Primary text** `#0f172a` (gray-900)

### Typography
- **Primary font**: Plus Jakarta Sans (Google Fonts) — humanist geometric sans, weights 300–800
  - ⚠️ *Substitution*: The Visa Group reference uses a similar but proprietary/licensed sans. Plus Jakarta Sans is the closest free match. Provide original font files to replace if needed.
- **Accent font**: Lora (Google Fonts, serif) — used sparingly for pull quotes only
- **Display/H1**: 48–60px, weight 800, line-height 1.15
- **H2**: 30–36px, weight 800
- **H3**: 20px, weight 700
- **Body**: 16px, weight 400, line-height 1.6, color gray-600
- **Section tag/label**: 12–13px, weight 600, pill capsule, blue-100 background

### Backgrounds
- Light sections: `#f8fafc` (gray-50) or pure white
- Dark sections: `#0d1b3e` (navy-900), card inside dark: `#1a2a50`
- Subtle radial gradient in hero: `rgba(37,99,235,0.08)` radial, top-right
- No heavy gradients, no texture, no patterns. Clean flat surfaces.

### Cards
- White background, `1px solid #e2e8f0` border, `border-radius: 16px`
- Shadow: `0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)`
- Hover: lift `-2px`, stronger blue-tinted shadow
- Dark variant: navy-800 background, `rgba(255,255,255,0.07)` border

### Buttons
- **Primary**: solid blue pill, white text, `box-shadow: 0 2px 8px rgba(37,99,235,0.25)`, hover darkens + lifts
- **Outline**: transparent, gray border, hover → blue border + blue text + blue-50 bg
- Shape: fully pill (`border-radius: 999px`)
- Press state: `transform: scale(0.98)`

### Icon Boxes
- 44–48px rounded square (`border-radius: 10–12px`)
- Blue-600 or Teal-500 background, white icon
- Light variant: blue-50 bg, blue-600 icon

### Spacing
- Section padding: 88px vertical
- Container max-width: 1080px, horizontal padding: 32px
- Card gap: 20px in grids; card internal padding: 24px
- Scale: 4/8/12/16/24/32/48/64/80/96px

### Animations
- No heavy animations. Subtle: `transition: 0.15–0.2s ease` on hover states
- Hover: `transform: translateY(-1px)` on buttons, `translateY(-2px)` on cards
- Backdrop-filter blur on nav (`blur(12px)`) for sticky effect

### Corner Radii
- sm: 6px, md: 12px, lg: 16px, xl: 24px, pill: 999px

### Section Labels / Pill Tags
- Blue-100 background + blue-600 text + blue dot prefix (`●`)
- Teal variant: teal-100 bg + teal-600 text

### Layout
- Two-column hero: text left, feature card right (1fr / 440px)
- Feature grids: 3-column on desktop
- Two-col feature section: 1fr/1fr with 64px gap
- Footer: 2fr/1fr/1fr/1fr grid

---

## Iconography

**Approach**: The design system uses **emoji as placeholder icons** inside blue/teal icon-box containers (rounded squares). These should be replaced with a proper icon set before production.

**Recommended icon set**: [Lucide Icons](https://lucide.dev) — stroke-weight 1.5–2px, clean geometric. Load from CDN: `https://unpkg.com/lucide@latest`

**Usage pattern**:
```html
<div class="icon-box">
  <i data-lucide="bar-chart-2"></i>
</div>
```

**No icon font or SVG sprite is bundled** in this design system. Source from Lucide CDN or replace emoji with SVGs.

---

## File Index

```
README.md                          ← This file
colors_and_type.css                ← Full token system (colors, type, spacing, utilities)
SKILL.md                           ← Agent skill definition

assets/
  logo-univasf.png                 ← UNIVASF official logo
  logo-profmat.png                 ← PROFMAT official logo

preview/                           ← Design System tab cards
  colors-primary.html
  colors-brand.html
  colors-neutrals.html
  colors-semantic.html
  type-scale.html
  type-headings.html
  type-weights.html
  spacing-tokens.html
  spacing-shadows.html
  comp-buttons.html
  comp-cards.html
  comp-cards-dark.html
  comp-tags.html
  comp-navbar.html
  brand-logos.html

ui_kits/
  saeb-workshop/
    index.html                     ← Full SAEB Workshop landing page
```

---

## Products / Surfaces

| Surface | Description |
|---|---|
| **SAEB Workshop Landing Page** | One-page sales/registration site for the Oficina SAEB workshop. Modular sections: nav, hero, features, methodology (dark), two-col, instructors, CTA, footer. |
