# Conspagna — local redesign

Phase 2 design preview using React, TypeScript, and Vite. The original website-snapshot directory is preserved. Nothing has been deployed.

## Preview

From this directory, run:

    npm.cmd install
    npm.cmd run dev

Open the Local URL printed by Vite (usually http://127.0.0.1:5173). Keep the terminal running. On systems without the PowerShell execution policy restriction, npm can be used instead of npm.cmd.

## Checks

    npm.cmd test
    npm.cmd run build

The production frontend is emitted to dist. No backend or database is required. Deployment is pending approval.

## Content maintenance

src/menu.json holds 85 entries in 17 source categories, extracted from the downloaded original.html. Edit names, descriptions, prices, variants, and local image paths here. No new dishes or prices were invented. Source labels and modifiers are preserved as data. Dietary labels are not displayed pending verification. menu-review.json flags questionable source data; it is not imported into the customer UI.

Copy-prefixed source names are displayed without that prefix; duplicate entries remain for owner review. The zero-price Bozena Shiro displays “Please ask.” Daily business hours and social accounts await confirmation. Missing dish images render a text-only entry.

## Ordering

Copy .env.example to .env.local and set VITE_DOORDASH_URL and VITE_UBEREATS_URL to official merchant-provided HTTPS links. These variables are public browser configuration and must not contain secrets. Restart Vite after changing them. Empty values keep each provider button disabled and marked Coming soon. Payment and delivery stay on the provider website. Provider activation and integration validation belong to the next phase.

## Current scope

Includes responsive navigation, home, featured dishes, story, full searchable category-filtered menu, ordering placeholders, contact details, and directions. Mobile menu exposes its expanded state; controls have focus indicators; reduced-motion preferences are respected. Google Fonts is optional and falls back to system fonts. Photos are copied locally from the snapshot; original higher-resolution menu photos are retained and may benefit from further compression in the optimization phase.

Before launch: confirm flagged menu data, verify dietary claims, business hours, story wording, official ordering URLs, image rights, mobile browser behavior, accessibility, and SEO. The selected hero is the existing site's vegetarian platter photo. The decorative wordmark symbol is a design proposal, not a verified original logo.

## Current visual design

The burgundy-and-gold design is restored, including the split hero, official logo, Bare & Restaurant subtitle, sidebar menu filters, and text-only menu listings. The removed top-left slogan and Ethiopian roots tagline remain removed. Nothing has been deployed.

