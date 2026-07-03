import { useState, useEffect } from 'react';

function GlobalStyles() {
  return <style>{`
/* ==========================================================================
   DESIGN SYSTEM — TOKENS
   Concept: "Spec Sheet" — the portfolio reads like technical documentation.
   Every value below is a deliberate choice, not a framework default.
   ========================================================================== */

:root {
  /* ---------------------------------------------------------------------
     COLOR — "circuit & patina"
     Ink base with copper (primary/active) and patina (secondary/calm)
     accents. Named for what they evoke, not just their function.
  --------------------------------------------------------------------- */
  --color-ink: #000000;          /* page background */
  --color-surface: #171E23;      /* panels, cards */
  --color-surface-raised: #1F2830; /* modals, popovers, hovered surfaces */

  --color-copper: #C9793D;       /* primary accent — CTAs, active states */
  --color-copper-soft: #E3A063;  /* copper hover / lighter tint */
  --color-copper-dim: #7A4E2A;   /* copper on dark, subdued (borders/tags) */

  --color-patina: #6E9C93;       /* secondary accent — links, secondary CTA */
  --color-patina-soft: #93BDB4;  /* patina hover */

  --color-paper: #a0acf9;        /* primary text — warm paper white */
  --color-paper-muted: #a2daf9;  /* secondary text */
  --color-paper-faint: #fc90c2;  /* tertiary text, placeholders */

  --color-hairline: #2A3339;     /* borders, dividers, frames */
  --color-hairline-strong: #384249;

  --color-danger: #D9694A;       /* errors — warm red-orange, stays in family */
  --color-success: #7FB88A;

  /* ---------------------------------------------------------------------
     TYPOGRAPHY
     Display: Space Grotesk — geometric, technical, used with restraint
     Body:    IBM Plex Sans — built for engineering tools, highly legible
     Mono:    IBM Plex Mono — labels, tags, data, "endpoint" rows
  --------------------------------------------------------------------- */
  --font-display: 'Space Grotesk', 'Segoe UI', sans-serif;
  --font-body: 'IBM Plex Sans', 'Segoe UI', sans-serif;
  --font-mono: 'IBM Plex Mono', 'Courier New', monospace;

  --text-xs: 0.75rem;     /* 12px — tags, meta labels */
  --text-sm: 0.875rem;    /* 14px — captions, form labels */
  --text-base: 1rem;      /* 16px — body copy */
  --text-lg: 1.125rem;    /* 18px — lead paragraphs */
  --text-xl: 1.5rem;      /* 24px — card titles */
  --text-2xl: 2rem;       /* 32px — section titles */
  --text-3xl: 2.75rem;    /* 44px — sub-hero */
  --text-4xl: clamp(2.5rem, 6vw, 4.5rem); /* hero name */

  --leading-tight: 1.15;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;

  --tracking-wide: 0.06em;   /* mono labels, uppercase */
  --tracking-wider: 0.12em;  /* sheet index labels */

  /* ---------------------------------------------------------------------
     SPACING — 4px base scale
  --------------------------------------------------------------------- */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.5rem;    /* 24px */
  --space-6: 2rem;      /* 32px */
  --space-7: 3rem;      /* 48px */
  --space-8: 4rem;      /* 64px */
  --space-9: 6rem;      /* 96px */
  --space-10: 8rem;     /* 128px */

  /* ---------------------------------------------------------------------
     RADIUS
     Sharp corners = structure/documentation (sheets, frames).
     Soft corners  = interaction (buttons, inputs, chips).
     This contrast is intentional and should stay consistent.
  --------------------------------------------------------------------- */
  --radius-none: 0px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 999px;

  /* ---------------------------------------------------------------------
     ELEVATION
  --------------------------------------------------------------------- */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.24);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.32);
  --shadow-lg: 0 24px 64px rgba(0, 0, 0, 0.48);
  --shadow-copper-glow: 0 0 0 3px rgba(201, 121, 61, 0.22);
  --shadow-patina-glow: 0 0 0 3px rgba(110, 156, 147, 0.22);

  /* ---------------------------------------------------------------------
     MOTION
  --------------------------------------------------------------------- */
  --ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
  --duration-fast: 120ms;
  --duration-base: 200ms;
  --duration-slow: 420ms;

  /* ---------------------------------------------------------------------
     LAYOUT
  --------------------------------------------------------------------- */
  --content-max: 1080px;
  --content-narrow: 760px;
  --gutter: clamp(1.25rem, 5vw, 3rem);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}

* {
  box-sizing: border-box;
}

html, body, #root {
  min-height: 100%;
}

body {
  margin: 0;
  background: var(--color-ink);
  background-image:
    linear-gradient(var(--color-hairline) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-hairline) 1px, transparent 1px);
  background-size: 48px 48px;
  background-attachment: fixed;
  background-position: center;
  opacity: 1;
  color: var(--color-paper);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  -webkit-font-smoothing: antialiased;
}

/* the faint grid above is the "drafting table" backdrop — kept at very low
   contrast (hairline color, on ink) so it reads as texture, not noise */

h1, h2, h3, h4 {
  font-family: var(--font-display);
  line-height: var(--leading-tight);
  margin: 0;
  font-weight: 600;
}

p {
  margin: 0;
  color: var(--color-paper-muted);
}

a {
  color: var(--color-patina);
  text-decoration: none;
}

a:hover {
  color: var(--color-patina-soft);
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

button {
  font-family: inherit;
}

::selection {
  background: var(--color-copper-dim);
  color: var(--color-paper);
}

:focus-visible {
  outline: 2px solid var(--color-copper);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.container {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0 var(--gutter);
}

.mono-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-paper-faint);
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-standard),
              background var(--duration-base) var(--ease-standard),
              border-color var(--duration-base) var(--ease-standard),
              box-shadow var(--duration-base) var(--ease-standard);
  white-space: nowrap;
}

.btn:active {
  transform: translateY(1px);
}

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
}

/* Sizes */
.btn--sm { padding: var(--space-2) var(--space-3); font-size: var(--text-xs); }
.btn--md { padding: var(--space-3) var(--space-5); }
.btn--lg { padding: var(--space-4) var(--space-6); font-size: var(--text-sm); }

/* Primary — copper fill, the "make this happen" action */
.btn--primary {
  background: var(--color-copper);
  border-color: var(--color-copper);
  color: var(--color-ink);
}
.btn--primary:hover:not(:disabled) {
  background: var(--color-copper-soft);
  border-color: var(--color-copper-soft);
}
.btn--primary:focus-visible {
  box-shadow: var(--shadow-copper-glow);
}

/* Secondary — patina outline, calmer supporting action */
.btn--secondary {
  background: transparent;
  border-color: var(--color-patina);
  color: var(--color-patina);
}
.btn--secondary:hover:not(:disabled) {
  background: rgba(110, 156, 147, 0.1);
  color: var(--color-patina-soft);
  border-color: var(--color-patina-soft);
}
.btn--secondary:focus-visible {
  box-shadow: var(--shadow-patina-glow);
}

/* Ghost — mono text-only, for tertiary actions inside cards */
.btn--ghost {
  background: transparent;
  border-color: transparent;
  color: var(--color-paper-muted);
  padding-left: 0;
  padding-right: 0;
}
.btn--ghost:hover:not(:disabled) {
  color: var(--color-paper);
}
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
}

.field__label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-paper-faint);
}

.field__control {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-hairline-strong);
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  padding: var(--space-3) var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-paper);
  transition: border-color var(--duration-base) var(--ease-standard),
              background var(--duration-base) var(--ease-standard);
  resize: vertical;
}

.field__control::placeholder {
  color: var(--color-paper-faint);
}

.field__control:hover {
  background: rgba(255, 255, 255, 0.02);
}

.field__control:focus-visible {
  outline: none;
  border-color: var(--color-copper);
  background: rgba(201, 121, 61, 0.06);
}

.field__control--invalid {
  border-color: var(--color-danger);
}

.field__error {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-danger);
}
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color var(--duration-base) var(--ease-standard),
              transform var(--duration-base) var(--ease-standard);
}

.card:hover {
  border-color: var(--color-hairline-strong);
  transform: translateY(-2px);
}

.card__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-hairline);
  background: rgba(255, 255, 255, 0.015);
}

.card__tag {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-copper);
}

.card__index {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-paper-faint);
}

.card__title {
  font-size: var(--text-xl);
  color: var(--color-paper);
  margin: 0 0 var(--space-2);
}

.card__body {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  flex: 1;
}

.card__description {
  color: var(--color-paper-muted);
  line-height: var(--leading-relaxed);
  font-size: var(--text-sm);
}

.card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.card__chip {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--color-hairline-strong);
  border-radius: var(--radius-full);
  color: var(--color-paper-muted);
}

.card__footer {
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-hairline);
  display: flex;
  gap: var(--space-3);
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 20, 23, 0.72);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-5);
  z-index: 100;
  animation: modal-fade var(--duration-base) var(--ease-standard);
}

.modal {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-hairline-strong);
  border-radius: var(--radius-lg);
  max-width: 480px;
  width: 100%;
  box-shadow: var(--shadow-lg);
  animation: modal-rise var(--duration-slow) var(--ease-standard);
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-hairline);
}

.modal__title {
  font-size: var(--text-lg);
  color: var(--color-paper);
}

.modal__close {
  background: none;
  border: none;
  color: var(--color-paper-muted);
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  line-height: 1;
  cursor: pointer;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
}

.modal__close:hover {
  color: var(--color-paper);
  background: rgba(233, 14, 14, 0.05);
}

.modal__body {
  padding: var(--space-5);
  color: var(--color-paper-muted);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
}

.modal__footer {
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-hairline);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}

@keyframes modal-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modal-rise {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.sheet {
  padding: var(--space-9) 0;
}

.sheet__frame {
  position: relative;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-none);
  padding: var(--space-7) var(--space-6);
}

/* Corner registration marks — the recurring signature motif.
   Small crosses at each corner, like a printer's crop mark on a
   technical drawing sheet. */
.sheet__tick {
  position: absolute;
  width: 14px;
  height: 14px;
  pointer-events: none;
}
.sheet__tick::before,
.sheet__tick::after {
  content: '';
  position: absolute;
  background: var(--color-copper-dim);
}
.sheet__tick::before { width: 100%; height: 1px; top: 50%; }
.sheet__tick::after { width: 1px; height: 100%; left: 50%; }

.sheet__tick--tl { top: -7px; left: -7px; }
.sheet__tick--tr { top: -7px; right: -7px; }
.sheet__tick--bl { bottom: -7px; left: -7px; }
.sheet__tick--br { bottom: -7px; right: -7px; }

.sheet__header {
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-5);
  border-bottom: 1px solid var(--color-hairline);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sheet__index {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-copper);
}

.sheet__title {
  font-size: var(--text-2xl);
  color: var(--color-paper);
}

.sheet__meta {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-paper-faint);
}

@media (max-width: 640px) {
  .sheet__frame { padding: var(--space-5) var(--space-4); }
}
.hero {
  padding: var(--space-10) 0 var(--space-9);
}

.hero__eyebrow {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.hero__status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-success);
  box-shadow: 0 0 0 3px rgba(127, 184, 138, 0.18);
}

.hero__name {
  font-size: var(--text-4xl);
  color: var(--color-paper);
  margin-bottom: var(--space-3);
}

.hero__role {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  color: var(--color-copper);
  margin-bottom: var(--space-5);
}

.hero__tagline {
  max-width: var(--content-narrow);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-paper-muted);
  margin-bottom: var(--space-7);
}

.hero__actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-bottom: var(--space-7);
}

.hero__meta {
  display: flex;
  gap: var(--space-6);
  flex-wrap: wrap;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-paper-faint);
  border-top: 1px solid var(--color-hairline);
  padding-top: var(--space-4);
}

.hero__meta span b {
  color: var(--color-paper-muted);
  font-weight: 500;
}
.qual-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.qual-item {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: var(--space-5);
  padding-bottom: var(--space-5);
  border-bottom: 1px solid var(--color-hairline);
}

.qual-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.qual-period {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-paper-faint);
  padding-top: var(--space-1);
}

.qual-degree {
  font-size: var(--text-lg);
  color: var(--color-paper);
  margin-bottom: var(--space-1);
}

.qual-institution {
  font-size: var(--text-sm);
  color: var(--color-patina);
  margin-bottom: var(--space-2);
}

.qual-detail {
  font-size: var(--text-sm);
  color: var(--color-paper-muted);
  line-height: var(--leading-relaxed);
}

@media (max-width: 560px) {
  .qual-item { grid-template-columns: 1fr; gap: var(--space-2); }
}
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.skill-group__category {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-copper);
  margin-bottom: var(--space-3);
  display: block;
}

.skill-group__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.skill-chip {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-hairline-strong);
  border-radius: var(--radius-md);
  color: var(--color-paper-muted);
  transition: border-color var(--duration-base) var(--ease-standard), color var(--duration-base) var(--ease-standard);
}

.skill-chip:hover {
  border-color: var(--color-patina);
  color: var(--color-patina-soft);
}

@media (max-width: 640px) {
  .skills-grid { grid-template-columns: 1fr; }
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-5);
}
.cert-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.cert-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-md);
  flex-wrap: wrap;
}

.cert-row__main {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.cert-name {
  font-size: var(--text-base);
  color: var(--color-paper);
}

.cert-issuer {
  font-size: var(--text-sm);
  color: var(--color-paper-muted);
}

.cert-row__meta {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-paper-faint);
  text-align: right;
}
.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-7);
}

/* Signature element: contact channels presented as REST endpoints */
.endpoints {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.endpoint-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  transition: border-color var(--duration-base) var(--ease-standard);
}

.endpoint-row:hover {
  border-color: var(--color-patina);
}

.endpoint-method {
  color: var(--color-success);
  font-weight: 500;
  width: 3.5ch;
  flex-shrink: 0;
}

.endpoint-path {
  color: var(--color-paper-muted);
  flex-shrink: 0;
}

.endpoint-value {
  color: var(--color-paper);
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: auto;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.contact-form__status {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-success);
}

@media (max-width: 720px) {
  .contact-layout { grid-template-columns: 1fr; }
  .endpoint-value { margin-left: 0; }
  .endpoint-row { flex-wrap: wrap; }
}

/* ==========================================================================
   APP SHELL — nav + footer
   ========================================================================== */
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(15, 20, 23, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-hairline);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) 0;
}

.nav__mark {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-paper);
  letter-spacing: var(--tracking-wide);
}

.nav__mark b { color: var(--color-copper); }

.nav__links {
  display: flex;
  gap: var(--space-5);
}

.nav__links a {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-paper-muted);
}

.nav__links a:hover { color: var(--color-copper); }

.footer {
  padding: var(--space-7) 0 var(--space-8);
  text-align: center;
}

.footer__text {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-paper-faint);
}

@media (max-width: 640px) {
  .nav__links { gap: var(--space-3); }
}

`}</style>;
}


 

const profile = {
  name: 'HIMANSHU BHATT',
  role: 'Full Stack Developer',
  tagline: 'Building systems from the ground up — one architecture doc, one migration, one endpoint at a time.',
  location: 'India',
  status: 'Open to opportunities',
  email: 'himanshubhatt971@gmail.com',
  github: 'https://github.com/himanshubhatt-23',
  linkedin: 'https://www.linkedin.com/in/himanshu-bhatt-845a092b7/',
  Leetcode:'https://leetcode.com/u/Himanshu2305/',
};

const qualifications = [
  {
    Degree: 'B.Tech — Computer Science Engineering',
    Institution: 'Graphic Era Hill University',
    Period: '2023 `— 2027',
  //  detail: 'Add relevant coursework, honors, or focus area.',
  },
];

const skillGroups = [
  { category: 'Languages', skills: ['C++', 'TypeScript', 'JavaScript', 'Python', 'Java'] },
  { category: 'Backend', skills: ['NestJS', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'Socket.IO'] },
  { category: 'Infra & Integrations', skills: ['Docker', 'AWS S3', 'Firebase Admin SDK', 'Razorpay', 'Twilio'] },
  { category: 'Frontend', skills: ['React', 'HTML', 'CSS', 'JavaScript'] },
  { category: 'Systems & Low-Level', skills: ['C++', 'OpenGL', 'CMake', 'ECS Architecture'] },
  { category: 'tools & Utilities', skills: ['Git', 'VS Code', 'Postman', 'Figma'] },
];

const projects = [
  {
    tag: 'In Progress',
    title: 'FarmCity',
    description:
      'A hyperlocal grocery and delivery platform connecting consumers directly with local farmers and stores — real-time GPS tracking, order management, and payments.',
    stack: ['NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'Socket.IO', 'Razorpay'],
    link: '#',
  },
  {
    tag: 'Learning Project',
    title: 'HarvestMart',
    description:
      'A beginner e-commerce site built from scratch — plain HTML, CSS, and JavaScript — with authentication, a full storefront flow, and a hand-built parallax hero.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
  {
    tag: 'Learning Project',
    title: 'Custom Game Engine',
    description:
      'A from-scratch game engine covering rendering, physics, collision detection, and an ECS — built to understand low-level systems deeply, not to ship a product.',
    stack: ['C++20', 'OpenGL', 'CMake', 'EnTT'],
    link: '#',
  },
  {
    tag: 'Backend Based Project',
    title: 'Backend Based Project',
    description:
      'A backend-focused project designed to showcase expertise in server-side development, API design, and database management.',
    stack: ['Node.js', 'Express', 'Mongoose', 'Redis'],
    link: '#',
  }
];

const certifications = [
  { name: 'AWS Artificial Intelligennce Practitioner', issuer: 'Amazon Web Services', date: '2025'},
  { name: 'AWS Cloud Practitioner Essentials', issuer: 'Amazon Web Services', date: '2025' },
  { name: 'Security, Compliance, and Governance for AI Solutions', issuer: 'Amazon Web Services', date: '2025' },
  { name: 'Cloud Essentials - Knowledge Badge Readiness Path  (includes Labs)', issuer: 'Amazon Web Services', date: '2026' },
];

/* ==========================================================================
   UI PRIMITIVES
   ========================================================================== */

function Button({ children, variant = 'primary', size = 'md', as = 'button', href, className = '', ...rest }) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();
  if (as === 'a' || href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

function Input({ label, id, as = 'input', error, className = '', ...rest }) {
  const Tag = as;
  const controlClasses = `field__control ${error ? 'field__control--invalid' : ''} ${className}`.trim();
  return (
    <div className="field">
      {label && (
        <label className="field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <Tag id={id} className={controlClasses} rows={as === 'textarea' ? 4 : undefined} {...rest} />
      {error && <span className="field__error">{error}</span>}
    </div>
  );
}

function Card({ index, tag, title, description, stack = [], footer, children }) {
  return (
    <article className="card">
      <div className="card__header">
        <span className="card__tag">{tag}</span>
        {index && <span className="card__index">SPEC {index}</span>}
      </div>
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        {description && <p className="card__description">{description}</p>}
        {stack.length > 0 && (
          <div className="card__stack">
            {stack.map((item) => (
              <span className="card__chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        )}
        {children}
      </div>
      {footer && <div className="card__footer">{footer}</div>}
    </article>
  );
}

function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title" id="modal-title">{title}</h3>
          <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
}

/** Signature structural device — every section is a numbered "sheet" with
    corner registration marks, echoing real technical documentation. */
function SheetSection({ id, number, title, meta, children }) {
  return (
    <section id={id} className="sheet">
      <div className="container">
        <div className="sheet__frame">
          <span className="sheet__tick sheet__tick--tl" />
          <span className="sheet__tick sheet__tick--tr" />
          <span className="sheet__tick sheet__tick--bl" />
          <span className="sheet__tick sheet__tick--br" />
          <header className="sheet__header">
            <span className="sheet__index">SHEET {number}</span>
            <h2 className="sheet__title">{title}</h2>
            {meta && <p className="sheet__meta">{meta}</p>}
          </header>
          {children}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE SECTIONS
   ========================================================================== */

function Nav() {
  return (
    <nav className="nav">
      <div className="container nav__inner">
        <span className="nav__mark"><b>&gt;</b> {profile.name.toLowerCase()}</span>
        <div className="nav__links">
          <a href="#qualifications">Qualifications</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#certifications">Certifications</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__eyebrow mono-label">
          <span className="hero__status-dot" />
          {profile.status}
        </div>
        <h1 className="hero__name">{profile.name}</h1>
        <p className="hero__role">{profile.role}</p>
        <p className="hero__tagline">{profile.tagline}</p>
        <div className="hero__actions">
          <Button as="a" href="#projects" variant="primary" size="lg">View Projects</Button>
          <Button as="a" href="#contact" variant="secondary" size="lg">Get in Touch</Button>
        </div>
        <div className="hero__meta">
          <span>LOCATION — <b>{profile.location}</b></span>
          <span>ROLE — <b>{profile.role}</b></span>
          <span>SHEETS — <b>05</b></span>
        </div>
      </div>
    </section>
  );
}

function Qualifications() {
  return (
    <SheetSection id="qualifications" number="01" title="Qualifications" meta="Education ">
      <div className="qual-list">
        {qualifications.map((q) => (
          <div className="qual-item" key={q.Degree}>
            <span className="qual-period">{q.Period}</span>
            <div>
              <h3 className="qual-degree">{q.Degree}</h3>
              <p className="qual-institution">{q.Institution}</p>
              <p className="qual-detail">{q.Detail}</p>
            </div>
          </div>
        ))}
      </div>
    
    </SheetSection>
  );
}

function Skills() {
  return (
    <SheetSection id="skills" number="02" title="Technical Skills" meta="Grouped by domain">
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <span className="skill-group__category">{group.category}</span>
            <div className="skill-group__list">
              {group.skills.map((skill) => (
                <span className="skill-chip" key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SheetSection>
  );
}

function Projects() {
  const [active, setActive] = useState(null);
  return (
    <SheetSection id="projects" number="03" title="Projects" meta={`${projects.length} entries, most recent first`}>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <Card
            key={project.title}
            index={String(i + 1).padStart(2, '0')}
            tag={project.tag}
            title={project.title}
            description={project.description}
            stack={project.stack}
            footer={
              <>
                <Button variant="ghost" size="sm" onClick={() => setActive(project)}>View Detail</Button>
                <Button as="a" href={project.link} variant="ghost" size="sm">Visit →</Button>
              </>
            }
          />
        ))}
      </div>
      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.title}
        footer={<Button variant="primary" size="sm" onClick={() => setActive(null)}>Close</Button>}
      >
        {active?.description}
      </Modal>
    </SheetSection>
  );
}

function Certifications() {
  return (
    <SheetSection id="certifications" number="04" title="Certifications" meta="Issued credentials">
      <div className="cert-list">
        {certifications.map((cert) => (
          <div className="cert-row" key={cert.id}>
            <div className="cert-row__main">
              <span className="cert-name">{cert.name}</span>
              <span className="cert-issuer">{cert.issuer}</span>
            </div>
            <div className="cert-row__meta">{cert.date}<br />{cert.id}</div>
          </div>
        ))}
      </div>
    </SheetSection>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your backend or a form service (e.g. Formspree, your own API).
    console.log('Contact form submitted:', form);
    setSent(true);
  };

  return (
    <SheetSection id="contact" number="05" title="Contact" meta="Reachable through the following channels">
      <div className="contact-layout">
        <div className="endpoints">
          <div className="endpoint-row">
            <span className="endpoint-method">GET</span>
            <span className="endpoint-path">/email</span>
            <a className="endpoint-value" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div className="endpoint-row">
            <span className="endpoint-method">GET</span>
            <span className="endpoint-path">/github</span>
            <a className="endpoint-value" href={profile.github} target="_blank" rel="noreferrer">
              {profile.github.replace('https://', '')}
            </a>
          </div>
          <div className="endpoint-row">
            <span className="endpoint-method">GET</span>
            <span className="endpoint-path">/linkedin</span>
            <a className="endpoint-value" href={profile.linkedin} target="_blank" rel="noreferrer">
              {profile.linkedin.replace('https://', '')}
            </a>
          </div>
          <div className="endpoint-row">
            <span className="endpoint-method">GET</span>
            <span className="endpoint-path">/leetcode</span>
            <a className="endpoint-value" href={profile.Leetcode} target="_blank" rel ="noreferrer">
              {profile.Leetcode.replace('https://', '')}
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <Input id="name" label="Name" placeholder="Your name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input id="email" type="email" label="Email" placeholder="you@example.com" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input id="message" as="textarea" label="Message" placeholder="What are you building?" value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          <Button type="submit" variant="primary" size="md">Send Message</Button>
          {sent && <span className="contact-form__status">200 OK — message received.</span>}
        </form>
      </div>
    </SheetSection>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Built by {profile.name} · designed as a spec sheet, not a template.
      </p>
    </footer>
  );
}

/* ==========================================================================
   APP
   ========================================================================== */
export default function App() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <Hero />
      <Qualifications />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </>
  );
}