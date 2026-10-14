# miuustudio.com

Brand site for Miuu Studio: characters, comics, reels and apps, in English (`/`) and Korean (`/ko/`).
Next.js 15 static export + Tailwind, deployed to GitHub Pages by `.github/workflows/nextjs.yml` on every push to `main`.

## Where things live

- `lib/content.ts` — all content: characters, comic series/episodes (+ Instagram-only episodes), reels, apps, stats
- `lib/i18n.ts` — UI strings for EN/KO and `localePath()`
- `components/` — `layout` (head/SEO, header, footer), `homePage`, `comicsPage` (series list), `seriesPage`, `comicReader`, `comicCard`
- `pages/` — thin wrappers; every page exists twice (`pages/…` and `pages/ko/…`)
- `public/comic-art/<episode>/<en|ko>/01.jpg…` + `cover.jpg` (1080px JPEG); `public/reels/<id>.mp4` + `<id>.jpg` poster; `public/characters/`, `public/apps/`, `public/brand/`

## Tiny Us (`/tinyus`)

Tiny Us's own section, self-contained so it can move to its own domain later: its own look (Figtree, v2 Soft UI tokens `tu-*`
in `tailwind.config.js` + `.tu` CSS variables in `styles/globals.css`, light + dark), header and footer.

- `lib/tinyus.ts` — **`TINYUS_LAUNCHED`** (false = Phase 1: waitlist + follow, "Coming soon"; true = store badges), store URLs,
  Instagram, **support email** (one constant), EN/KO copy, the 15-locale structure (`TINY_LOCALES`; EN + KO shipped)
- `lib/tinyusLegal.ts` — Privacy Policy + Terms of Use. **DRAFT**: `LEGAL_DRAFT` shows the banner, the "Confirm with dev" /
  "Lawyer review" flags and `noindex`. Korean URLs show the English text with a note until a reviewed Korean version exists.
- `components/tinyus/` — `layout`, `landing`, `getTinyUs` (the CTA for both phases + store badges), `pixelHome` (the animated
  pixel home + `PetSprite`), `legalPage`, `supportPage`, `invitePage`; `sprites.generated.ts` is generated, don't edit
- `pages/tinyus/*` + `pages/ko/tinyus/*` — `/`, `privacy`, `terms`, `support`, `invite`
- `pages/404.tsx` — forwards invite links `/tinyus/invite/XXXX-XXXX/` to `/tinyus/invite/?code=…`
- `public/tinyus/art|brand/` — pixel art + favicon/OG, made by `design-review/tinyus-pixel/website/make_site_art.py` in
  secret-note-main (`python3 make_site_art.py ~/Development/miuu-studio-site`); rerun it instead of editing the PNGs
- `tinyus-links/` — apple-app-site-association + assetlinks.json, prepared but **not shipped** (see its README)

Launch day: fill `TINYUS.store`, add the official badge artwork, flip `TINYUS_LAUNCHED`, switch Instagram to @tinyus.app.

## Adding things

- **Comic episode:** export pages to `public/comic-art/<slug>/en/01.jpg…` (and `ko/` if there is one) plus `cover.jpg` (page 1 at 480px), add the episode to its series in `lib/content.ts`, add the URLs to `public/sitemap.xml`. An episode without `ko` pages shows the English pages on the Korean site with a note.
- **Reel:** add `public/reels/<id>.mp4` (re-encode with `avconvert -p Preset960x540`) and a poster `<id>.jpg`, then add it to the top of `REELS`.
- Only show Miuu Studio's own work (Miuu Note, Tiny Us; Paceon is not ours).

## Local preview

`yarn build`, then serve `out/` (the "studio-site" entry in secret-note-main/.claude/launch.json does this on :3020).
On this Mac the bundled node can't load native SWC, so build with
`NEXT_TEST_WASM_DIR=$PWD/node_modules/@next/swc-wasm-nodejs` (that package is untracked, unpacked from the npm tarball).
