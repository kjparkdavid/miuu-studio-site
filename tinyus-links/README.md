# Tiny Us app links (prepared, NOT shipped)

Universal links (iOS) and App Links (Android) for invite links: `https://miuustudio.com/tinyus/invite/XXXX-XXXX/`.
With the app installed, the link opens the app. Without it, the browser shows `/tinyus/invite/` (via `pages/404.tsx`),
which says "Get Tiny Us to move in together" and shows the code.

These files live outside `public/` on purpose: a wrong app ID would be served to Apple's CDN and cached.
Ship them only after the developer sends the real values.

## To ship
1. Fill in from the developer:
   - `apple-app-site-association`: `appIDs` = `<Apple Team ID>.<bundle ID>`.
   - `assetlinks.json`: `package_name` + the **Play App Signing** SHA-256 (Play Console → App integrity), plus the upload key's if the dev wants debug builds to work.
2. `mkdir -p public/.well-known && cp tinyus-links/.well-known/* public/.well-known/`
3. App side (dev): iOS entitlement `applinks:miuustudio.com`; Android intent filter `autoVerify="true"`, host `miuustudio.com`, `pathPrefix="/tinyus/invite/"`.
   The domain gets baked into the app build, so it must be decided before the v1.0 build.
4. After deploy, check:
   - `https://miuustudio.com/.well-known/apple-app-site-association` returns the JSON with no redirect.
     GitHub Pages serves this extensionless file as `application/octet-stream`; Apple usually accepts it, but confirm with
     `https://app-site-association.cdn-apple.com/a/v1/miuustudio.com`.
   - `.well-known` is a hidden folder: confirm the Pages artifact (actions/upload-pages-artifact@v3) included it.
   - Android: `adb shell pm get-app-links <package>` shows `verified`.
