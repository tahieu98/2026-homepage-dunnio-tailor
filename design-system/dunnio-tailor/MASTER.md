# Dunnio Tailor — Brand and UX/UI contract

Revision: `brand-20261012`; variant status updated 15/10/2026.

## Current variant overrides — 15/10/2026

[Current version contract](../../docs/VERSION-STATUS.md) takes precedence over the dated hero decisions below. v3.2 desktop uses a **16:7** frame, 1896×829 WebP artwork (garden **02-new**, beach **01**); tablet keeps **5:3**. Mobile uses a nominal **4:7** capped frame with cover and copy inside the image. v3.1 mobile remains **4:5**, copy below the image. Both have a 64px control row below the image and 48px buttons; v3.2 mobile edge spacing is 20px. Image breakpoints: desktop ≥1200, tablet 640–1199, mobile ≤639 CSS px. Other component grids may change at 1024px. Mobile USP colours are navy/gold for 01/04 and gold/navy for 02/03. Header/drawer logos do not link to the comparison index; footer is retained.

Request 21 replaces the two Wedding Story studio boards with a responsive video demo (PC 8:5, Tablet 139:199, Mobile 195:422). Preserve the full recording with contain, native controls and visible-state autoplay; do not restore the old interactive swatches in these variants. See [studio video rules](../../docs/STUDIO-VIDEO-UPDATE.md).

The historical requests below explain earlier choices; generic statements such as no-cover, copy-below-image and 8:3 do not override these variant rules.

 The human user's specified colours take precedence over palette suggestions from skills.

## Primitive colours

```css
--color-primary: #0b1f3a;
--color-primary-variant: #04142a;
--color-dark-blue: #111a4c;
--color-secondary: #C8A96A;
--color-white: #fff;
```

`assets/brand.css` is the shared semantic layer, loaded after the structural stylesheet. It overrides the earlier concept palettes. Do not introduce independent olive, sage, bronze or brown interface themes. Natural colours inside photographs and illustrative cloth swatches are content, not brand UI colours.

## Semantic roles

| Role | Mapping | Use |
| --- | --- | --- |
| Main ink / primary brand | Primary navy | Headings, body hierarchy, outlines, logo on white |
| Deep surface | Primary variant | Footer, prototype utility bar, high-contrast code blocks |
| Editorial secondary dark | Dark blue | Design Studio inspiration section |
| Primary CTA | Gold background, navy foreground | Main next step; navy boundary on white |
| Secondary CTA | Transparent/white, navy outline and ink | Support or alternate path |
| Inverse secondary CTA | Dark surface, white outline and ink | Alternate path beside hero/closing CTA |
| Active choice | Navy, white label, gold lower edge | Filters/finder; aria-pressed exposes selection |
| Light surface | White | Main canvas, cards, forms |
| Subtle surface | Primary at 3.5% on white | Group related content without a new hue |
| Muted text | Primary at 78% on white | Supporting copy; verify composition contrast |
| Focus | Navy on light; gold on dark | 3px outline, 4px offset, contrasting inner ring |

Gold on white is approximately 2.25:1. Do not use it for informational text or the only visible control outline. Navy on gold is approximately 7.35:1. Exact calculation and limitations are in `docs/brand-contrast.json`.

## Typography

- `--font-primary: "Garamon Pro Display", serif`: display/editorial headings, real weight 400 from `GaramondPremrPro.woff2`; avoid synthesizing a bold serif.
- `--font-secondary: "Afacad", sans-serif`: body, prices, labels, navigation and modern hero headings. Original static files supply weights 400, 500, 600 and 700.
- Main mobile copy 16–17px; hero description 17px; BOD prose 18px desktop / 17px mobile; supporting metadata 12–14px. Labels remain visible.
- Short headings use text-wrap:balance; prose wraps normally. Never glue the last words with nonbreaking spaces.
- Self-hosted WOFF2 copied byte-for-byte from the original Dunnio clone, with font-display:swap and generic serif/sans-serif fallbacks. Hashes and original paths: `docs/font-provenance.json`. The CSS alias preserves the original spelling “Garamon Pro Display”.

## Layout and interaction

- Image-led hero revision (Request 11): all five variants use a full viewport width picture, with a short HTML heading and one CTA below the image. Artwork is selected separately for desktop/tablet/mobile; `height:auto` preserves any replacement upload ratio. Do not impose 100vh or crop completed artwork in CSS. Authoring compositions may crop source photos to preserve the intended subject per device.
- Hero display size is now 36–54px desktop and 32–36px mobile. Remove descriptive copy, secondary CTA and repeated captions from hero; retain explanatory sections below. Sticky mobile CTA hides only while the hero CTA is fully visible below the sticky header.
- `assets/fashion-heroes.css` overrides previous split/arched hero layouts; `tools/fashion-heroes.cjs` supplies shared image compositions and hero markup to the canonical generator.

- Use the 8/16/24/32/48/64 spacing scale where a change is made. No universal mandatory “6px grid”; the ux-audit example is adapted to this project.
- Breakpoints: mobile <640, tablet 640–1023, desktop >=1024. Overlay copy in Wedding Story is only attempted above 1200 and moves outside if it cannot fit.
- Text remains HTML. Banner artwork is chosen per device and displayed at its intrinsic ratio; no forced height or object-fit:cover on the final banner image.
- Main buttons >=52px; icon buttons >=44px. These are project comfort targets, not a claim that WCAG 2.2 AA universally requires 44px.
- Hover/pressed states change colours, not button position. All functions work without hover.
- Manual sliders have labelled previous/next controls. No autoplay, parallax or artificial waiting.
- Fixed mobile CTA reserves bottom space, hides during text/select input focus and yields to visible keyboard focus on content.
- Date validation is connected through aria-describedby and aria-invalid; invalid submit returns focus to the date input.
- Finder selections can be changed or reset. A changed choice invalidates a previous recommendation until the user requests a new one.

## Variant identity

| Version | Difference retained | Brand allocation |
| --- | --- | --- |
| Heritage Atelier | Serif, workshop-first, arched product images | White editorial canvas, navy text, fine gold craft accents |
| Design Studio | Sans display, interactive board, personalisation-first | White board, navy controls, dark-blue inspiration band |
| Wedding Story | Full-width wedding imagery, roles and planner | Deep-navy scrim, gold CTA, white outside-image copy |
| Modern Essentials | Category-first, tabs, wardrobe use cases | Primary-navy hero, white catalog, gold selection cues |
| Fit Concierge | Founder portrait, guided finder, supportive copy | White layout, navy portrait surround, gold CTA and feedback accents |

## Reference and scope

- ui-ux-pro-max: local typography, contrast, focus and validation searches. Its Liquid Glass style suggestion was off-topic, including one narrower retry, so it was not adopted or persisted as a verified style match. User colours replace its suggested palette.
- ui-ux-designer: semantic tokens, typography hierarchy, state documentation and accessibility checks.
- ux-audit: qualitative severity rubric and actionable findings. Native app-specific examples are adapted to a static marketing website.
- ux-flow: map the homepage → category/designer or support journey, including error recovery. The upstream PageShell/BottomNav and DESIGN-LANGUAGE references are absent here; use this project's semantic header/nav/main/footer and `DESIGN-LANGUAGE.md` instead.
- uxui-principles: the local package is a wrapper describing a larger collection; no detailed 168-principle dataset or API evaluation was available. Do not claim a complete 168-rule audit.

These rules are design decisions and scoped engineering checks, not conversion guarantees or a full WCAG certification.

## Hockerty template & full navigation — 12/10/2026

Supersedes the copy-below-image hero choice above. All five heroes share an overlay heading/subline/CTA, transparent navigation over the image and solid white/navy header on scroll. Headline font is Garamon Pro Display across all five; art direction and destination differ by theme. Natural image ratio is retained, with copy-outside fallback if artwork cannot contain the overlay. Desktop/tablet/mobile sources are 16:9 / 4:3 / approximately 9:16.

The published Dunnio menu is the source of truth in `assets/navigation-tree.json`: six main groups, 72 leaf links (71 unique destinations), 24 Custom clothing entries. Desktop from 1200px: grouped mega menus. Below 1200px: modal drawer with full category pages, Back, visible Menu and Custom clothing controls, focus trap and inert background. Intro-line exposes ten services in 5/3/2 columns. Featured blog cards are removed; Blog navigation/footer remain.


## Request 13 — responsive banner safe areas (12 October 2026)

Current rules supersede the earlier fixed desktop 16:9 hero: desktop8:3, portrait tablet4:3, tall mobile800:1422 and compact mobile4:5. The official transparent logo is truly centred; the full drawer opens from the left on all devices. Blog/Explore/Shop are inside the drawer. Foreground photographs scale uniformly against subject bounding boxes. Runtime checks reserve head/copy/control space and move copy below unregistered or unsafe artwork.

See [interactive formula](../../banner-guide.html), [editor recipe](../../docs/RESPONSIVE-BANNER-FORMULA.md), [configuration](../../assets/banner-layout.json), and [browser evidence](../../docs/responsive-banner-verification.json). Rebuild heroes using `node tools/fashion-heroes.cjs`; documentation using `node tools/update-balanced-docs.cjs`.


### Current editor artwork update

User-supplied finished images replace the8:3 experiment: PC7:4 and tablet5:3, with a comparison slide. Header is a separate row. PC/tablet copy starts4.2% from left, width24%; controls136px wide,4.2% from right. See `docs/BANNER-EDITOR-SPEC.md` and `banner-guide.html`. Remaining browser tests were skipped at the user’s request.
