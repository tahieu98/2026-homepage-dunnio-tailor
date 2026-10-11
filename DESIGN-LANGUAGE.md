# Dunnio homepage layout and flow reference

Use `design-system/dunnio-tailor/MASTER.md` and `assets/brand.css` for colour, type and interaction roles.

## Components in this static project

`site-header`, `desktop-nav`, `mobile-nav`, `hero`, `intro-line`, `product-rail`, `look-rail`, `studio-board`, `planner-form`, `finder-panel`, `faq-list`, `closing-section`, `usp-section`, `footer`, `mobile-cta`.

These are semantic HTML/CSS components, not React PageShell/BottomNav components from an upstream application template.

## Flow map

```text
Homepage
  +-- Hero / quick link / category -> Dunnio category -> product / designer
  +-- How it works -> process section -> Dunnio procedure / fit terms
  +-- Get advice -> Dunnio contact
  +-- Wedding date -> validation
  |     +-- missing / past date -> inline explanation -> edit date
  |     +-- upcoming date -> enquiry draft -> review/copy -> user's email app
  +-- Finder -> occasion + preferred starting method
        +-- missing choice -> explanation -> first incomplete group
        +-- design preference -> relevant category
        +-- help preference -> contact
        +-- choice changes -> stale recommendation cleared -> show next step
        +-- Start again -> no choices selected
```

Entry points to categories and help are one click from the homepage. The subsequent category/designer/contact pages belong to the existing Dunnio website and were not redesigned in this change. No email is sent by the prototype.

## Fixed UI and errors

The header and mobile CTA must not cover a focused input/button. All forms retain user selections on errors. Carousel arrows provide an alternative to horizontal swipe. Browser back and the prototype “All concepts” link preserve an exit route.

## Responsive banner contract

The final image element remains width:100%, height:auto. PC/tablet/mobile sources may have different intrinsic proportions. On narrow screens, copy stays outside the image. Workshop/style imagery and gallery content must not be represented as verified testimonials without supporting attribution.
