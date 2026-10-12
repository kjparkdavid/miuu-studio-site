# miuustudio.com

Brand site for Miuu Studio: characters, comics, reels and apps, in English (`/`) and Korean (`/ko/`).
Next.js 15 static export + Tailwind, deployed to GitHub Pages by `.github/workflows/nextjs.yml` on every push to `main`.

## Where things live

- `lib/content.ts` — all content: characters, comic series/episodes (+ Instagram-only episodes), reels, apps, stats
- `lib/i18n.ts` — UI strings for EN/KO and `localePath()`
- `components/` — `layout` (head/SEO, header, footer), `homePage`, `comicsPage` (series list), `seriesPage`, `comicReader`, `comicCard`
- `pages/` — thin wrappers; every page exists twice (`pages/…` and `pages/ko/…`)
- `public/comic-art/<episode>/<en|ko>/01.jpg…` + `cover.jpg` (1080px JPEG); `public/reels/<id>.mp4` + `<id>.jpg` poster; `public/characters/`, `public/apps/`, `public/brand/`

## Adding things

- **Comic episode:** export pages to `public/comic-art/<slug>/en/01.jpg…` (and `ko/` if there is one) plus `cover.jpg` (page 1 at 480px), add the episode to its series in `lib/content.ts`, add the URLs to `public/sitemap.xml`. An episode without `ko` pages shows the English pages on the Korean site with a note.
- **Reel:** add `public/reels/<id>.mp4` (re-encode with `avconvert -p Preset960x540`) and a poster `<id>.jpg`, then add it to the top of `REELS`.
- Only show Miuu Studio's own work (Miuu Note, Tiny Us; Paceon is not ours).

## Local preview

`yarn build`, then serve `out/` (the "studio-site" entry in secret-note-main/.claude/launch.json does this on :3020).
On this Mac the bundled node can't load native SWC, so build with
`NEXT_TEST_WASM_DIR=$PWD/node_modules/@next/swc-wasm-nodejs` (that package is untracked, unpacked from the npm tarball).
