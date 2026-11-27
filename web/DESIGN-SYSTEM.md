# BOOM! design system

The approved DS Manager system starts from BOOM!’s shadcn Nova components and theme. [Review the BOOM! system in DS Manager](https://manager.shadcndesign.com/reviews/etVAYFtnoFEBB5P5qwn-tQ).

| Foundation | How to use it |
| --- | --- |
| Typography | DM Sans for headings and body. Use `editorial-display` for the main masthead and `type-title` for section headings. |
| Colour | Use semantic shadcn tokens for controls and surfaces. Use BOOM! magenta for emphasis, warm neutrals for editorial sections and ink for body copy and navigation. Check text, icons and focus indicators against their actual backgrounds. |
| Layout | Use `wrap` and `section-pad` for page gutters and section spacing. Reuse the shared masthead, section heading and reading-layout components. |
| Interaction | Use the existing Radix-based buttons, tabs, accordion and sheet. Check keyboard navigation, visible focus, reduced motion and narrow-screen layout when changing a component. |
| Icons | Use Lucide. Pair an icon with a visible label when the action is unfamiliar. Give icon-only controls an accessible name. |

## Working with DS Manager

The published version 1 registry is configured as `@boom` in `components.json`. The site uses the published palette in `globals.css`, with its existing DM Sans loader and customised controls. Use `npx shadcn view @boom/<component>` to preview an individual registry component before syncing it. The shared `--control-height-xl` token gives prominent buttons and contact inputs a 48 px height.

The website theme lives in `src/app/globals.css`. Shared controls live in `src/components/ui`, and BOOM!’s page patterns live in `src/components/site`. The import review covers colour tokens, font roles and supported control rules.

Artwork, responsive layouts, animation and component behaviour live in the website. The review lists the unsupported rules, including styles in Accordion, Select, Sheet and Tabs. Compare any exported component against the existing implementation before installing it. Check the homepage, Contact and Services at mobile and desktop sizes after applying a theme change.
