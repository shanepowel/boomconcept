# BOOM! Healthcare Communications: website concept

A redesigned website for BOOM! Healthcare Communications, built as a Next.js site with a Sanity content studio.

```
boomconcept/
├── web/             Next.js 16 site (App Router, Tailwind CSS 4, shadcn/ui on Radix)
├── studio/          Sanity Studio (standalone) with the content model and a seed dataset
├── static-concept/  The earlier static HTML version, kept for reference
└── content-workshop.md  Facts and assets to confirm with BOOM! before launch
```

## Run it

You need Node 22 or later.

```bash
npm run install:all   # installs web/ and studio/
npm run dev           # site on http://localhost:3000
```

The site works straight away with no Sanity project. Until one is connected, every page renders the content in `web/src/content/fallback.ts`.

## Connect Sanity

1. Create a project: `cd studio && npx sanity login && npx sanity init --env` (or create one at sanity.io/manage and note the project ID).
2. Add the project ID to `studio/.env` (`SANITY_STUDIO_PROJECT_ID`) and `web/.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`). See the two `.env.example` files.
3. Load the current content into the dataset: `cd studio && npm run seed`. This builds `seed/seed.ndjson` from the site's fallback content, including the team photos, and imports it.
4. Allow the site to talk to the API: `npx sanity cors add http://localhost:3000 --credentials` (and later the production URL).
5. Run the Studio: `npm run dev:studio` (http://localhost:3333). Deploy it with `cd studio && npx sanity deploy`.
6. For live preview and draft mode, create a Viewer token in sanity.io/manage and set `SANITY_API_READ_TOKEN` in `web/.env.local`. Set `NEXT_PUBLIC_SANITY_STUDIO_URL` to the Studio URL and `SANITY_STUDIO_PREVIEW_ORIGIN` to the frontend origin, then open Presentation in Studio. Use matching hostnames in the preview origin and CORS settings.

### What editors can change

| In the Studio | Where it shows |
| --- | --- |
| Site settings | Stats, offices, emails, company details and legal links |
| Page copy (one per page) | Each page's eyebrow, headline, intro, hero photograph and SEO metadata. Pages: Home, Work, Services, Therapy areas, About, Careers, Contact |
| Team | About page (the band), home page line-up, contact people (drag to reorder) |
| Home page copy → Example briefs | Line-up choices, approach, disciplines, linked team members and case study |
| Insights | Topic, author, featured placement, article sections and optional first draft/revision example |
| Case studies | Work index, individual case pages and related work. Set a slug and add approved media. Untick "Example only" once the story is approved |
| Brand moments | Services page |
| Specialist areas, therapy areas | Therapy areas page and home page |
| Careers perks | Careers page |
| Careers roles | Publish a role with Accepting applications enabled and an HTTPS application link to list it on Careers |

Workplace awards, culture photos, the sustainability figures and the legal pages live in `web/src/content/fallback.ts` and `web/src/app/{terms,privacy,cookies,sustainability}`.

Longer-form section copy (for example the service disciplines and the process steps) still lives in `web/src/content/fallback.ts`. Moving it into Sanity is the natural next step.

## How it is built

- **Components:** shadcn/ui (Radix) in `web/src/components/ui`, themed to the BOOM! brand in `web/src/app/globals.css` (black type, magenta `#D90070` from the logo, the colour-burst gradient). Site-level building blocks are in `web/src/components/site`. Run `./node_modules/.bin/shadcn info` from `web/` for installed components and registry configuration.
- **Data:** `web/src/lib/data.ts` reads from Sanity through `next-sanity` (Live Content API) and falls back to local content if Sanity is not configured or a document is missing.
- **Content model:** `studio/schemaTypes`. Singletons (Site settings and Page copy) are locked to fixed IDs in `studio/structure`.
- **Contact form:** for the concept it opens a pre-filled email to the enquiries address. Replace it with a server action (for example Resend) for launch.
- **Images:** self-hosted in `web/public/images`. The logo and team photos come from boom-cc.com. The splash and process images are AI-generated concept art.

## Deploy

Deploy `web/` to Vercel (set the root directory to `web` and add the environment variables). Set `NEXT_PUBLIC_SITE_URL` to the production URL for canonical links, the sitemap and social images.

## Sources

Content is based on boom-cc.com and BOOM!'s published Finance Coordinator job advert (team size, values, benefits, working pattern and the Wilburys hiring philosophy). The three case studies on the Work page are labelled examples to show the layout; they are not real projects. See `content-workshop.md` for everything to confirm with BOOM!.
