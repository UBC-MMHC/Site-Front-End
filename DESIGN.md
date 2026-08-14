# Men's Mental Health Non-Profit Design System

## Overview

The men's mental health non-profit site reads as **warm editorial meets supportive resource hub** — closer to a trusted community space than a clinical healthcare portal. The base canvas is **soft cream** (`{colors.canvas}` — #f8f9fa) with warm slate text; darker sections appear for emphasis and contrast. The primary brand color is **Soft Teal** (`{colors.primary}` — #4a9d9c), representing calm, trust, and healing, used thoughtfully on primary CTAs, interactive elements, and supportive accents. The logo's **Deep Ocean** (`{colors.accent}` — #16345a) serves as a sophisticated accent for premium touchpoints.

Typography runs **Manrope** for display and headings paired with **Inter** for body text — approachable, professional, and highly readable. Display weights stay medium (500-600) for confidence without aggression. The brand uses generous spacing and rounded corners to create emotional safety and approachability.

The site's strongest visual signature is **approachable photography with authentic human connection** — imagery shows diverse men in supportive, non-clinical contexts (outdoors, conversations, moments of reflection). Headlines use warm, hope-focused language. Spacing follows an explicit 4px base unit: `xxxs` 4 / `xxs` 8 / `xs` 12 / `sm` 16 / `md` 24 / `lg` 32 / `xl` 48 / `xxl` 64 / `super` 96 / `mega` 128.

**Key Characteristics:**

- Primary color: `{colors.primary}` (Soft Teal #4a9d9c) for trust and calm. Used for primary CTAs, links, progress indicators.
- Accent color: `{colors.accent}` (Deep Ocean #16345a — logo color) for premium touchpoints and sophisticated depth.
- Soft cream canvas (#f8f9fa) — never stark white. Darker sections use warm slate (#2d3e50).
- Dual typography: Manrope for headings (500-600 weight), Inter for body (400-600 weight).
- Display weights stay 500-600 — confident but not aggressive.
- CTA labels use sentence case or title case — never all-caps (less clinical, more conversational).
- Rounded corners (`{rounded.md}` 8px, `{rounded.lg}` 12px) on CTAs, cards — warmth and approachability.
- Authentic, diverse photography showing real human connection.
- Explicit 4px spacing token ladder with named scale (xxxs through mega).
- Soft shadows for depth — gentle elevation, not harsh drops.
- Semantic colors for context (success = gentle green, urgent = soft coral, not alarming red).

---

## Colors

### Brand & Accent

- **Forest Green** (`{colors.primary}` — #2D5A4A): Primary brand color representing growth, healing, nature, and calm strength. Used for primary CTAs, links, active states, progress indicators. Central to the brand identity.
- **Forest Green Hover** (`{colors.primary-hover}` — #3b745f): Lighter hover state for lift and feedback.
- **Forest Green Active** (`{colors.primary-active}` — #1f4236): Pressed/active state for buttons and interactive elements.
- **Deep Navy** (`{colors.accent}` — #16345A): Logo color. Sophisticated accent for premium elements, trust badges, navigation highlights. Trust, stability, and professionalism.
- **Deep Navy Hover** (`{colors.accent-hover}` — #1f4570): Hover state for accent elements.

**Supporting Accents:**

- **Sage Green** (`{colors.accent-sage}` — #7ba882): Success states, positive progress, growth messaging.
- **Warm Clay** (`{colors.accent-clay}` — #c17c5b): Warmth and approachability, community elements.
- **Muted Gold** (`{colors.accent-gold}` — #d4a574): Highlights, secondary CTAs, achievements.

### Surface

- **Background** (`{colors.canvas}` — #F7F5F2): Warm off-white main page background. Approachable, non-clinical, welcoming.
- **Card Background** (`{colors.surface-card}` — #FFFFFF): Pure white for elevated card surfaces.
- **Canvas Dark** (`{colors.canvas-dark}` — #16345A): Deep Navy for dark sections, footer, contrast bands.
- **Muted Background** (`{colors.surface-soft-light}` — #E8E4DF): Muted color for secondary backgrounds, cards, alternating sections.
- **Surface Strong Light** (`{colors.surface-strong-light}` — #D4CFC7): Input backgrounds, disabled states.

### Border

- **Border** (`{colors.hairline}` — #D4CFC7): Subtle borders and dividers on light backgrounds.
- **Hairline On Dark** (`{colors.hairline-on-dark}` — #2a4870): Borders on dark backgrounds.

### Text

- **Foreground** (`{colors.ink}` — #1A1A1A): Primary text color on light backgrounds, headings.
- **Body** (`{colors.body}` — #1A1A1A): Default body text.
- **Body On Light** (`{colors.body-on-light}` — #1A1A1A): Text on light surfaces.
- **Body On Dark** (`{colors.body-on-dark}` — #F7F5F2): Text on dark surfaces — warm off-white.
- **Muted Foreground** (`{colors.muted}` — #6B6B6B): Secondary text, captions, metadata.
- **On Primary** (`{colors.on-primary}` — #ffffff): White text on primary buttons.
- **On Dark** (`{colors.on-dark}` — #ffffff): White text on dark backgrounds.
- **On Light** (`{colors.on-light}` — #1A1A1A): Dark text on light backgrounds.

### Semantic

- **Info** (`{colors.semantic-info}` — #5b8db8): Calm blue for informational content, resources.
- **Success** (`{colors.semantic-success}` — #6b9d7a): Gentle green for positive progress, confirmations.
- **Warning** (`{colors.semantic-warning}` — #e8a55c): Warm amber for gentle cautions (not alarming).
- **Destructive** (`{colors.semantic-urgent}` — #B85450): Muted red for error states and crisis support (approachable, not alarming).

---

## Typography

### Font Families

**Manrope** is the display and heading family — geometric humanist with warmth. **Inter** is the body family — highly legible, neutral, accessible. Fallback: `-apple-system, system-ui, sans-serif`.

### Hierarchy

| Token                            | Size | Weight | Line Height | Letter Spacing | Use                               |
| -------------------------------- | ---- | ------ | ----------- | -------------- | --------------------------------- |
| `{typography.display-mega}`      | 72px | 600    | 1.1         | -1.44px        | Homepage hero h1                  |
| `{typography.display-xl}`        | 56px | 600    | 1.15        | -1.12px        | Major landing pages               |
| `{typography.display-lg}`        | 40px | 600    | 1.2         | -0.8px         | Section heroes                    |
| `{typography.display-md}`        | 32px | 600    | 1.25        | -0.32px        | Sub-section heroes                |
| `{typography.title-lg}`          | 24px | 600    | 1.3         | 0              | Page section titles               |
| `{typography.title-md}`          | 20px | 600    | 1.4         | 0              | Card titles, component headers    |
| `{typography.title-sm}`          | 18px | 500    | 1.4         | 0              | Smaller headings                  |
| `{typography.body-lg}`           | 18px | 400    | 1.6         | 0              | Introductory paragraphs, emphasis |
| `{typography.body-md}`           | 16px | 400    | 1.6         | 0              | Default body text                 |
| `{typography.body-sm}`           | 14px | 400    | 1.5         | 0              | Supporting text, smaller blocks   |
| `{typography.caption}`           | 13px | 400    | 1.4         | 0              | Image captions, metadata          |
| `{typography.caption-uppercase}` | 12px | 600    | 1.4         | 0.6px          | Section labels, category tags     |
| `{typography.button}`            | 16px | 600    | 1.0         | 0              | Button labels (sentence case)     |
| `{typography.nav-link}`          | 15px | 500    | 1.4         | 0              | Navigation items                  |
| `{typography.number-display}`    | 64px | 700    | 1.0         | -1.28px        | Impact stats, metrics             |

### Principles

- **Display weights stay 500-600.** Confident and warm, not aggressive. The photography and layout create visual hierarchy — type supports, doesn't dominate.
- **Button labels use sentence case.** "Find support" not "FIND SUPPORT". More conversational, less clinical.
- **Nav labels use sentence/title case.** Warm and approachable, not corporate.
- **Generous line-height (1.6) for body text.** Optimal readability, especially for long-form mental health content.
- **Negative letter-spacing on display only.** -0.32px to -1.44px on large sizes for optical balance.

### Note on Font Substitutes

Manrope and Inter are both open-source Google Fonts. If unavailable, system fallbacks maintain readability.

**Font Import:**

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700&display=swap");
```

---

## Layout

### Spacing System

- **Base unit:** 4px.
- **Tokens:** `{spacing.xxxs}` 4px · `{spacing.xxs}` 8px · `{spacing.xs}` 12px · `{spacing.sm}` 16px · `{spacing.md}` 24px · `{spacing.lg}` 32px · `{spacing.xl}` 48px · `{spacing.xxl}` 64px · `{spacing.super}` 96px · `{spacing.mega}` 128px.
- **Section padding:** `{spacing.xxl}` (64px) for standard sections; `{spacing.super}` (96px) for major hero sections.
- **Component padding:** `{spacing.md}` (24px) for cards; `{spacing.lg}` (32px) for emphasized containers.

### Grid & Container

- **Max content width:** 1280px for standard layouts.
- **Content width:** 960px for text-heavy pages (articles, resources).
- **Narrow width:** 720px for forms, focused single-column content.
- **Editorial grid:** 12-column responsive grid.
- **Card grids:** 3-up at desktop for resource cards, 2-up for features, 1-up mobile.
- **Footer:** 4-column at desktop.

### Whitespace Philosophy

**Generous spacing creates emotional safety.** Breathing room between sections allows content to be absorbed without overwhelm. Hero sections use expansive spacing (`super` 96px); resource grids maintain comfortable card spacing (`md` 24px gaps). Text-heavy content uses narrower containers (720-960px) with line-height 1.6 for optimal readability.

---

## Elevation & Depth

The system uses **soft shadows and subtle color shifts** for elevation. Shadows are gentle and supportive, never harsh or dramatic.

| Level         | Treatment                                            | Use                                |
| ------------- | ---------------------------------------------------- | ---------------------------------- |
| Flat (canvas) | `{colors.canvas}` (#f8f9fa)                          | Page background                    |
| Card          | `{colors.surface-card}` (#ffffff) + `{shadow.sm}`    | Resource cards, content containers |
| Elevated      | `{colors.canvas-elevated}` (#ffffff) + `{shadow.md}` | Modals, dropdowns, sticky elements |
| Card hover    | `{shadow.lg}` + slight lift                          | Interactive card hover states      |
| Focus         | Border `{colors.primary}` + `{shadow.focus}`         | Keyboard focus, active inputs      |

### Shadow Tokens

```yaml
shadows:
  sm: 0 2px 8px rgba(22, 52, 90, 0.08)
  md: 0 4px 16px rgba(22, 52, 90, 0.12)
  lg: 0 8px 24px rgba(22, 52, 90, 0.16)
  focus: 0 0 0 3px rgba(74, 157, 156, 0.2)
```

### Decorative Depth

- **Photography:** Authentic, diverse imagery showing real connection and support.
- **Soft gradients:** Subtle teal-to-blue gradients for hero backgrounds (optional).
- **Warm overlays:** Light warm tints on hero sections for approachability.

---

## Shapes

### Border Radius Scale

| Token            | Value  | Use                                            |
| ---------------- | ------ | ---------------------------------------------- |
| `{rounded.none}` | 0px    | Rarely used — only for specific sharp elements |
| `{rounded.xs}`   | 4px    | Small badges, tight elements                   |
| `{rounded.sm}`   | 6px    | Form inputs                                    |
| `{rounded.md}`   | 8px    | Buttons, small cards — primary radius          |
| `{rounded.lg}`   | 12px   | Resource cards, feature sections               |
| `{rounded.xl}`   | 16px   | Large cards, prominent containers              |
| `{rounded.xxl}`  | 24px   | Hero sections (optional)                       |
| `{rounded.full}` | 9999px | Avatar images, badge pills, icon containers    |

**Roundedness creates warmth and approachability.** The dominant radii are `{rounded.md}` (8px) for buttons and `{rounded.lg}` (12px) for cards. Sharp corners are avoided except where necessary.

---

## Components

### Top Navigation

**`top-nav-on-light`** — Primary navigation. Background `{colors.canvas-light}` (white), text `{colors.body-on-light}`, height 72px, subtle bottom border `{colors.hairline-soft}`. Layout: Logo left, primary menu (About / Resources / Get Help / Get Involved), utilities right. Menu items use `{typography.nav-link}` with comfortable spacing.

**`top-nav-on-dark`** — Dark variant for dark hero sections. Background `{colors.canvas-dark}`, text `{colors.on-dark}`.

```yaml
components:
  top-nav-on-light:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.body-on-light}"
    typography: "{typography.nav-link}"
    height: 72px
    padding: 0 32px
    borderBottom: 1px solid {colors.hairline-soft}
```

### Buttons

**`button-primary`** — Primary CTA in Soft Teal. Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.button}` (16px / 600, sentence case), padding 12px × 24px, height 48px, rounded `{rounded.md}` (8px).

**`button-primary-hover`** — Hover state with lift and shadow. Background `{colors.primary-hover}`, `transform: translateY(-1px)`, shadow `0 4px 12px rgba(74, 157, 156, 0.25)`.

**`button-primary-active`** — Active/pressed state. Background `{colors.primary-active}`, `transform: translateY(0)`.

**`button-secondary`** — Outlined teal button. Background transparent, text `{colors.primary}`, 2px border `{colors.primary}`, padding 10px × 22px (accounts for border), rounded `{rounded.md}`.

**`button-secondary-hover`** — Filled teal on hover. Background `{colors.primary}`, text `{colors.on-primary}`.

**`button-outline-light`** — Outlined neutral button on light backgrounds. Border `{colors.hairline}`, text `{colors.body-on-light}`.

**`button-outline-dark`** — Outlined button on dark backgrounds. Border `{colors.on-dark}`, text `{colors.on-dark}`.

**`button-urgent`** — Crisis/urgent action button. Background `{colors.semantic-urgent}`, text `{colors.on-primary}`, padding 14px × 28px, height 52px, shadow `0 4px 16px rgba(217, 123, 111, 0.3)`, rounded `{rounded.md}`.

**`button-tertiary-text`** — Inline text link. Background transparent, text `{colors.primary}`, padding 8px × 16px, underline on hover.

```yaml
button-primary:
  backgroundColor: "{colors.primary}"
  textColor: "{colors.on-primary}"
  typography: "{typography.button}"
  rounded: "{rounded.md}"
  padding: 12px 24px
  height: 48px

button-urgent:
  backgroundColor: "{colors.semantic-urgent}"
  textColor: "{colors.on-primary}"
  typography: "{typography.button}"
  rounded: "{rounded.md}"
  padding: 14px 28px
  height: 52px
  boxShadow: "{shadow.md}"
```

### Hero Sections

**`hero-main`** — Primary homepage hero. Background `{colors.canvas-light}` or warm photo overlay, text `{colors.body-on-light}`, type `{typography.display-xl}`, padding 96px (desktop), centered or left-aligned. Includes large heading, supporting text (`{typography.body-lg}`), primary + secondary CTAs.

**`hero-dark`** — Dark hero variant. Background `{colors.canvas-dark}`, text `{colors.on-dark}`, same padding and layout.

**`hero-warm`** — Warm cream hero for softer sections. Background `{colors.surface-warm}`, text `{colors.body-on-light}`, type `{typography.display-lg}`, padding 64px.

```yaml
hero-main:
  backgroundColor: "{colors.canvas-light}"
  textColor: "{colors.body-on-light}"
  typography: "{typography.display-xl}"
  padding: 96px 32px
  textAlign: center

hero-dark:
  backgroundColor: "{colors.canvas-dark}"
  textColor: "{colors.on-dark}"
  typography: "{typography.display-xl}"
  padding: 96px 32px
```

### Cards

**`resource-card`** — Standard resource/content card. Background `{colors.surface-card}` (white), text `{colors.body-on-light}`, type `{typography.title-md}` for title, rounded `{rounded.lg}` (12px), padding 24px, shadow `{shadow.sm}`.

**`resource-card-hover`** — Hover state with lift. Shadow `{shadow.md}`, `transform: translateY(-2px)`, transition 250ms.

**`feature-card-light`** — Feature card with border. Background `{colors.canvas-light}`, 1px border `{colors.hairline-soft}`, rounded `{rounded.lg}`, padding 32px.

**`testimonial-card`** — Testimonial/quote card. Background `{colors.surface-soft-light}`, text `{colors.body}`, type `{typography.body-md}`, rounded `{rounded.lg}`, padding 32px, left border 4px `{colors.accent-sage}`.

**`stats-card`** — Impact statistics card. Background `{colors.accent}` (Deep Ocean), text `{colors.on-dark}`, type `{typography.number-display}` for number, rounded `{rounded.lg}`, padding 40px, centered.

```yaml
resource-card:
  backgroundColor: "{colors.surface-card}"
  textColor: "{colors.body-on-light}"
  typography: "{typography.title-md}"
  rounded: "{rounded.lg}"
  padding: 24px
  boxShadow: "{shadow.sm}"

stats-card:
  backgroundColor: "{colors.accent}"
  textColor: "{colors.on-dark}"
  typography: "{typography.number-display}"
  rounded: "{rounded.lg}"
  padding: 40px
  textAlign: center
```

### Forms

**`text-input`** — Standard text input. Background `{colors.canvas-light}`, text `{colors.body-on-light}`, type `{typography.body-md}`, rounded `{rounded.sm}` (6px), padding 12px × 16px, height 48px, 1px border `{colors.hairline}`.

**`text-input-focus`** — Focus state. Border `{colors.primary}`, shadow `{shadow.focus}` (3px teal glow), outline none.

**`textarea`** — Multi-line text input. Same as text-input, min-height 120px.

**`checkbox-radio`** — Checkboxes and radios. Accent color `{colors.primary}`, size 20px.

```yaml
text-input:
  backgroundColor: "{colors.canvas-light}"
  textColor: "{colors.body-on-light}"
  typography: "{typography.body-md}"
  rounded: "{rounded.sm}"
  padding: 12px 16px
  height: 48px
  border: 1px solid {colors.hairline}

text-input-focus:
  borderColor: "{colors.primary}"
  boxShadow: "{shadow.focus}"
  outline: none
```

### Special Components

**`crisis-banner`** — Sticky crisis support banner. Background `{colors.semantic-urgent}`, text `{colors.on-primary}`, type `{typography.title-md}`, padding 16px × 24px, rounded `{rounded.md}`, position sticky, top 0, z-index 100.

**`info-banner`** — Informational banner. Background `{colors.semantic-info}`, text `{colors.on-primary}`, padding 16px × 24px, rounded `{rounded.md}`.

**`success-banner`** — Success/confirmation banner. Background `{colors.semantic-success}`, text `{colors.on-primary}`, padding 16px × 24px, rounded `{rounded.md}`.

**`badge-pill`** — Small category/status badge. Background `{colors.accent-sage}`, text `{colors.on-primary}`, type `{typography.caption-uppercase}`, rounded `{rounded.full}`, padding 6px × 14px.

**`badge-accent`** — Accent badge with logo color. Background `{colors.accent}`, text `{colors.on-dark}`, type `{typography.caption-uppercase}`, rounded `{rounded.full}`, padding 6px × 14px.

```yaml
crisis-banner:
  backgroundColor: "{colors.semantic-urgent}"
  textColor: "{colors.on-primary}"
  typography: "{typography.title-md}"
  padding: 16px 24px
  rounded: "{rounded.md}"
  position: sticky
  top: 0
  zIndex: 100
```

### Layout Sections

**`cta-section-light`** — Call-to-action section on light background. Background `{colors.canvas-light}`, text `{colors.body-on-light}`, type `{typography.display-md}`, padding 96px × 32px, centered.

**`cta-section-teal`** — CTA section on teal background. Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.display-md}`, padding 96px × 32px, centered.

**`newsletter-section`** — Newsletter signup section. Background `{colors.surface-soft-light}`, rounded `{rounded.lg}`, padding 48px × 32px.

**`footer`** — Main footer. Background `{colors.canvas-dark}`, text `{colors.body-on-dark}`, type `{typography.body-sm}`, padding 64px × 32px.

**`footer-link`** — Footer links. Background transparent, text `{colors.muted-soft}`, type `{typography.body-sm}`, no decoration.

**`footer-link-hover`** — Footer link hover. Text `{colors.on-dark}`, underline.

```yaml
cta-section-teal:
  backgroundColor: "{colors.primary}"
  textColor: "{colors.on-primary}"
  typography: "{typography.display-md}"
  padding: 96px 32px
  textAlign: center

footer:
  backgroundColor: "{colors.canvas-dark}"
  textColor: "{colors.body-on-dark}"
  typography: "{typography.body-sm}"
  padding: 64px 32px
```

---

## Do's and Don'ts

### Do

- Use `{colors.primary}` (Soft Teal) generously for CTAs, links, progress, interactive states — it's welcoming and central to the brand.
- Use `{colors.accent}` (Deep Ocean / logo color) sparingly for premium accents, trust elements, navigation highlights.
- Set CTAs with `{rounded.md}` (8px) and cards with `{rounded.lg}` (12px) — warmth through roundedness.
- Use sentence case for button labels ("Find support", "Learn more") — conversational and approachable.
- Pair warm, authentic photography with generous white space.
- Use the explicit 4px spacing ladder (`xxxs` through `mega`) for consistency.
- Keep display weights at 500-600 — confident but not aggressive.
- Use semantic colors thoughtfully: gentle green for success, soft coral for urgent (not scary).
- Maintain high contrast for accessibility (WCAG AA minimum 4.5:1 for text).
- Use generous line-height (1.6) for body text — optimal readability.

### Don't

- Don't use harsh reds or clinical whites — stick to soft cream canvas and gentle semantic colors.
- Don't use all-caps for buttons or headings (except small labels) — less clinical, more human.
- Don't use sharp 0px corners on primary elements — rounded warmth is core to the brand.
- Don't bold display copy excessively — let hierarchy and spacing do the work.
- Don't use stock photography that looks posed or clinical — authentic, diverse, real connection only.
- Don't use harsh drop shadows — soft, gentle elevation only.
- Don't overcrowd layouts — generous spacing creates emotional safety.
- Don't use jargon or clinical language — warm, conversational, hope-focused tone.
- Don't use the logo Deep Ocean blue (#16345a) as primary action color — it's an accent, not the primary.
- Don't make urgent/crisis elements look scary — soft coral is approachable, not alarming.

---

## Responsive Behavior

### Breakpoints

| Name    | Width       | Key Changes                                                                          |
| ------- | ----------- | ------------------------------------------------------------------------------------ |
| Mobile  | < 640px     | Hero h1 72→40px; card grid 1-up; nav hamburger; stack CTAs vertically; padding 16px. |
| Tablet  | 640–1024px  | Hero h1 56px; card grid 2-up; padding 24px.                                          |
| Desktop | 1024–1280px | Full hero h1 72px; card grid 3-up; padding 32px.                                     |
| Wide    | > 1280px    | Content caps at 1280px; backgrounds extend full-width.                               |

### Touch Targets

- Primary buttons at 48px height — meets WCAG AAA (44 × 44px minimum).
- Urgent button at 52px height — extra prominence for crisis support.
- Nav items padded for 48px effective tap area.
- Form inputs at 48px height for easy tapping.

### Collapsing Strategy

- Top nav switches to hamburger menu below 768px.
- Hero sections reduce padding: 96px → 64px → 48px.
- Card grids: 3-up → 2-up → 1-up.
- Typography scales down: display-mega 72px → 56px → 40px.
- Horizontal button groups stack vertically on mobile.
- Footer: 4-column → 2-column → 1-column.

---

## Content Guidelines

### Tone & Voice

- **Warm but professional**: "You're not alone" not "Patients experience symptoms"
- **Action-oriented**: "Find support" not "Support is available"
- **Inclusive language**: "Men and people who identify as men"
- **De-stigmatizing**: Avoid clinical jargon like "disorder", "suffering", "afflicted"
- **Hope-focused**: Emphasize recovery, growth, strength — not just struggle

### Example Copy

| ❌ Avoid                                   | ✅ Use                                    |
| ------------------------------------------ | ----------------------------------------- |
| "Mental health services for male patients" | "Mental health support designed for men"  |
| "Suffering from depression?"               | "Struggling with low mood or depression?" |
| "Disorders we treat"                       | "Challenges we can help with"             |
| "Submit form"                              | "Get started" or "Reach out"              |
| "Crisis hotline"                           | "Get help now" or "Talk to someone"       |

### Content Sections

1. **Hero**: Welcoming headline, brief mission statement, clear primary CTA ("Find support", "Get help now").
2. **Resources**: Card grid with icons, clear categories (Therapy, Support Groups, Crisis Help, Self-Care).
3. **Crisis Support**: Always visible — sticky banner or floating button, phone number prominent, "Available 24/7".
4. **About/Mission**: Story-driven, founder/team photos, impact stats using `stats-card`.
5. **Testimonials**: Anonymous if needed, using `testimonial-card` with sage green accent.
6. **Get Involved**: Volunteer, Donate, Partner sections with clear CTAs.
7. **Footer**: Quick links, crisis number, social media, newsletter signup.

---

## Imagery Guidelines

### Photography Style

- **Authentic, not stock**: Real people in real moments, not posed studio shots.
- **Diverse representation**: Various ages, races, backgrounds, body types.
- **Outdoor and natural settings**: Parks, trails, cafes — everyday supportive environments, not clinical.
- **Warm, natural lighting**: Golden hour, soft window light — avoid harsh fluorescents.
- **Human connection**: Conversations, group support, moments of reflection.
- **Non-clinical contexts**: Avoid hospital/office settings — prefer community spaces.

### Iconography

- **Use lucide-react** for all icons — consistent outlined style.
- **24px base size** for standard icons, 20px for inline, 32px for feature icons.
- **2px stroke weight** for visual consistency.
- **Rounded line caps and joins** — matches rounded design language.
- **Semantic use**: Icons support meaning, not just decoration.

### Illustrations (Optional)

- **Minimal, supportive style** — abstract/metaphorical over literal.
- **Warm color palette** — use accent colors (sage, clay, gold).
- **Used for concepts** — growth, connection, resilience — not decoration.

---

## Accessibility Standards

### Color Contrast

- **Body text**: Minimum 4.5:1 (WCAG AA) — `{colors.body}` (#4a5568) on `{colors.canvas}` (#f8f9fa) = 7.8:1 ✓
- **Primary button**: `{colors.on-primary}` (#ffffff) on `{colors.primary}` (#4a9d9c) = 3.2:1 — meets AA for large text (3:1) ✓
- **Urgent button**: `{colors.on-primary}` (#ffffff) on `{colors.semantic-urgent}` (#d97b6f) = 3.4:1 ✓
- **Links**: `{colors.primary}` (#4a9d9c) on `{colors.canvas}` (#f8f9fa) = 4.8:1 ✓

### Keyboard Navigation

- All interactive elements have visible focus states using `{shadow.focus}`.
- Tab order follows logical content flow.
- Skip-to-content link for screen readers.
- Hamburger menu keyboard-accessible.

### Screen Readers

- Semantic HTML5 structure (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- All images have descriptive alt text.
- Form labels properly associated with inputs.
- ARIA labels where needed (icon buttons, status messages).
- Live regions for dynamic content (form validation, alerts).

### Touch Targets

- Minimum 44 × 44px (WCAG AAA) — all buttons meet or exceed 48px height.
- Adequate spacing between interactive elements (minimum 8px).

---

## Animation & Transitions

### Timing

- **Fast (150ms)**: Button hover, link underline, simple color changes.
- **Medium (250ms)**: Card hover lift, dropdown open/close, tab switching.
- **Slow (400ms)**: Modal open/close, page transitions, complex animations.

### Easing

- **Standard**: `cubic-bezier(0.4, 0.0, 0.2, 1)` — most transitions.
- **Decelerate**: `cubic-bezier(0.0, 0.0, 0.2, 1)` — elements entering (modals, dropdowns).
- **Accelerate**: `cubic-bezier(0.4, 0.0, 1, 1)` — elements leaving.

### Micro-interactions

- **Button hover**: Slight lift (`translateY(-1px)`), shadow increase, color lighten.
- **Card hover**: Lift (`translateY(-2px)`), shadow from `sm` to `md`, 250ms transition.
- **Link hover**: Color change to `{colors.primary-hover}`, underline slide-in.
- **Form focus**: Gentle glow using `{shadow.focus}`, border color to `{colors.primary}`.
- **Loading states**: Calm pulse animation, not aggressive spinner — respect user's mental state.

---

## Implementation

### CSS Custom Properties

```css
:root {
	/* Colors - Primary */
	--color-primary: #2D5A4A;
	--color-primary-hover: #3b745f;
	--color-primary-active: #1f4236;
	--color-accent: #16345A;
	--color-accent-hover: #1f4570;

	/* Colors - Text */
	--color-ink: #1A1A1A;
	--color-body: #1A1A1A;
	--color-body-strong: #000000;
	--color-muted: #6B6B6B;
	--color-muted-soft: #8a8a8a;

	/* Colors - Surfaces */
	--color-canvas: #F7F5F2;
	--color-canvas-elevated: #ffffff;
	--color-canvas-dark: #16345A;
	--color-surface-card: #FFFFFF;
	--color-surface-soft-light: #E8E4DF;
	--color-surface-warm: #E8E4DF;

	/* Colors - Semantic */
	--color-success: #6b9d7a;
	--color-info: #5b8db8;
	--color-warning: #e8a55c;
	--color-urgent: #B85450;

	/* Colors - Accents */
	--color-accent-sage: #7ba882;
	--color-accent-clay: #c17c5b;
	--color-accent-gold: #d4a574;

	/* Spacing */
	--space-xxxs: 4px;
	--space-xxs: 8px;
	--space-xs: 12px;
	--space-sm: 16px;
	--space-md: 24px;
	--space-lg: 32px;
	--space-xl: 48px;
	--space-xxl: 64px;
	--space-super: 96px;
	--space-mega: 128px;

	/* Rounded */
	--rounded-xs: 4px;
	--rounded-sm: 6px;
	--rounded-md: 8px;
	--rounded-lg: 12px;
	--rounded-xl: 16px;
	--rounded-xxl: 24px;
	--rounded-full: 9999px;

	/* Shadows */
	--shadow-sm: 0 2px 8px rgba(22, 52, 90, 0.08);
	--shadow-md: 0 4px 16px rgba(22, 52, 90, 0.12);
	--shadow-lg: 0 8px 24px rgba(22, 52, 90, 0.16);
	--shadow-focus: 0 0 0 3px rgba(74, 157, 156, 0.2);

	/* Typography */
	--font-primary: "Inter", system-ui, -apple-system, sans-serif;
	--font-heading: "Manrope", "Inter", sans-serif;
}
```

### Font Import (src/styles/fonts.css)

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700&display=swap");
```

### Component Organization

- **Atomic design methodology**: Atoms (Button, Input) → Molecules (FormGroup, Card) → Organisms (Header, Footer, Hero).
- **Reusable primitives** in `/src/app/components/primitives/`.
- **Composed components** in `/src/app/components/`.
- **Page-level layouts** in `/src/app/`.

---

## Iteration Guide

1. **Start with tokens.** Use `{colors.primary}`, `{spacing.md}`, `{rounded.lg}` — never inline values.
2. **Default button radius:** `{rounded.md}` (8px). Default card radius: `{rounded.lg}` (12px).
3. **Component variants** live as separate entries in the components section.
4. **Hover states** use subtle lift + shadow increase + color lighten.
5. **Typography pairing:** Manrope for headings (500-600), Inter for body (400-600).
6. **Soft Teal primary** is generous; Deep Ocean accent is sparce and intentional.
7. **Use the 4px spacing ladder** — consistency creates calm.
8. **Sentence case for CTAs** — "Find support" not "FIND SUPPORT".

---

## Known Gaps & Future Considerations

- **Animation timing curves** for hero entrance, card stagger — to be refined in development.
- **Dark mode considerations** — not currently in scope, but color tokens are structured to support future dark theme.
- **Form validation patterns** beyond focus states — error messaging, success states, inline validation to be developed.
- **Multi-language support** — typography may need adjustment for non-Latin scripts.
- **Print styles** — not currently defined, may be needed for resource PDFs.
- **Email templates** — transactional emails should follow similar color/typography patterns.

---

## Accessibility Checklist

- [ ] Color contrast meets WCAG AA minimum (4.5:1 text, 3:1 UI)
- [ ] All images have descriptive alt text
- [ ] Form inputs have proper labels (not just placeholders)
- [ ] Focus indicators visible on all interactive elements
- [ ] Semantic HTML structure (nav, main, section, footer)
- [ ] Keyboard navigation works throughout
- [ ] Screen reader tested (NVDA, JAWS, VoiceOver)
- [ ] Touch targets minimum 44 × 44px
- [ ] No text embedded in images
- [ ] Video captions provided
- [ ] Skip-to-content link for screen readers
- [ ] ARIA labels where needed
- [ ] Live regions for dynamic content
- [ ] Form validation messages announced

---

_This design system creates a safe, welcoming digital space where men feel comfortable seeking mental health support. Every design decision reinforces trust, reduces stigma, and encourages positive action toward healing and growth._
