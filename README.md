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

## Sanity

The site is connected to the Sanity project **BOOM! Healthcare Communications** (`ilv0hlq1`, dataset `production`). Vercel has the project ID, dataset, Studio URL and a viewer token for preview. The Studio lives at https://boom-healthcare.sanity.studio.

To deploy or update the hosted Studio (needs a Sanity login with deploy rights):

```bash
cd studio && npx sanity login && npx sanity deploy
```

Every heading, body copy and closing call to action is editable under **Page copy → Page sections**. Workplace results, the Glassdoor quote and the team mix are under **Site settings → Workplace and team**. Interface labels (link and button text), badge artwork, culture photos and the legal and sustainability pages stay in code.

## Connect a different Sanity project

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
| Page copy (one per page) | Each page's eyebrow, headline, intro, hero photograph and SEO metadata. Pages: Home, Work, Services, Therapy areas, Insights, About, Careers, Contact |
| Team | About page (the band), home page line-up, contact people (drag to reorder) |
| Page copy → Page sections | Edit section labels, headings and introductions on the main pages. Layout and missing-field defaults live in code |
| Home page copy → Example briefs | Line-up choices, approach, disciplines, linked team members and case study |
| Insights | Topic, author, featured placement, article sections and optional first draft/revision example |
| Case studies | Work index, individual case pages and related work. Set a slug and add approved media. Untick "Example only" once the story is approved |
| Brand moments | The stage selector on Services. Edit the stage name, headline, description and service tags. Reorder the documents to change the sequence. |
| Specialist areas, therapy areas | Therapy areas page and home page |
| Careers perks | Careers page |
| Careers roles | Publish a role with Accepting applications enabled and an HTTPS application link to list it on Careers |

Workplace awards, culture photos, the sustainability figures and the legal pages live in `web/src/content/fallback.ts` and `web/src/app/{terms,privacy,cookies,sustainability}`.

Edit service disciplines, questions, capabilities and delivery steps under **Page copy → Services → Page sections → Services detail**. About, Careers and legal pages still contain some copy in their templates.

## Shared page layouts

Use `PageHero` for an interior masthead. A hero photograph from Page copy takes the artwork slot when supplied. Work, Services and Insights have individual record-sleeve treatments for pages without photography. Home and Contact use the same grid with room for the lead photograph and enquiry form.

Use `SubNav` for long pages with distinct destinations. Each link uses the section’s HTML ID. Work stories and Insights articles use `ReadingLayout`, with a chapter index generated from the sections actually shown. Shared spacing and responsive grid rules live in `web/src/app/globals.css`.

## How it is built

- **Components:** shadcn/ui (Radix) in `web/src/components/ui`, themed to the BOOM! brand in `web/src/app/globals.css` (black type, magenta `#D90070` from the logo, the colour-burst gradient). Site-level building blocks are in `web/src/components/site`. Run `./node_modules/.bin/shadcn info` from `web/` for installed components and registry configuration.
- **Data:** `web/src/lib/data.ts` reads from Sanity through `next-sanity` (Live Content API) and falls back to local content if Sanity is not configured or a document is missing.
- **Content model:** `studio/schemaTypes`. Singletons (Site settings and Page copy) are locked to fixed IDs in `studio/structure`.
- **Contact form:** submits server-side. Set `ENQUIRY_DEMO_MODE=true` for validation and demo confirmation without delivery. For Resend delivery, set `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL` to a verified sender and disable demo mode. Use `ENQUIRY_TEST_RECIPIENT` to test delivery in a controlled inbox before routing to recipients from Site settings.
- **Images:** self-hosted in `web/public/images`. The logo and team photos come from boom-cc.com. The splash and process images are AI-generated concept art.

## Deploy

Deploy `web/` to Vercel (set the root directory to `web` and add the environment variables). Set `NEXT_PUBLIC_SITE_URL` to the production URL for canonical links, the sitemap and social images.

## Sources

Content is based on boom-cc.com and BOOM!'s published Finance Coordinator job advert (team size, values, benefits, working pattern and the Wilburys hiring philosophy). The three case studies on the Work page are labelled examples to show the layout; they are not real projects. See `content-workshop.md` for everything to confirm with BOOM!.

## Export the demo CMS

With Studio configured for `zg5uzp4f`, run `npx sanity dataset export demo boom-demo.tar.gz` from `studio/`. The archive contains the documents and uploaded images. In the destination project, configure Studio with the new project ID, then run `npx sanity dataset import boom-demo.tar.gz --dataset production` into an empty dataset. Deploy the Studio schema from this repository and set the website's Sanity project and dataset variables to the destination.

### Add editorial fields to an existing dataset

The Work approach, About timeline, beliefs and positioning, and Careers working-life cards and FAQs are in **Page copy → [page] → Page sections → Editorial content**. To backfill an existing dataset, confirm the Studio environment points at the intended project and dataset, then run this from `studio/`:

```sh
npx sanity exec migrations/seed-editorial-lists.mjs --with-user-token
npx sanity exec migrations/seed-editorial-lists.mjs --with-user-token -- --apply
```

The first command is a dry run. The second fills missing fields on existing documents and drafts without replacing previously edited content. Deploy the updated Studio schema so editors can see the fields.
