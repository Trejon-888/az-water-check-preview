# ✅ Migration Complete: azwatercheck.com → aquafeelsolutionsarizona.com

**Date:** 2026-05-21
**Status:** PRODUCTION READY ✅

---

## What's Live

| Surface | Status | Notes |
|---|---|---|
| **https://aquafeelsolutionsarizona.com/** | ✅ 200 OK | New canonical domain, full site |
| **https://aquafeelsolutionsarizona.com/es/** | ✅ 200 OK | Spanish mirror, 29 pages |
| **https://aquafeelsolutionsarizona.com/sitemap.xml** | ✅ 200 OK | 64 URLs with hreflang |
| **https://aquafeelsolutionsarizona.com/llms.txt** | ✅ 200 OK | AI search brief |
| **https://aquafeelsolutionsarizona.com/opt-in/** | ✅ 200 OK | A2P form (brand text preserved for Twilio) |
| **SSL cert (Let's Encrypt)** | ✅ Valid | Expires Aug 19, 2026 |
| **https://azwatercheck.com/*** | ✅ Redirects | Path-preserving via meta-refresh + JS, served by `Trejon-888/azwatercheck-redirect` repo |
| **Email `info@azwatercheck.com`** | ✅ Untouched | Google Workspace MX intact on old domain |
| **IndexNow notification** | ✅ Sent | 64 URLs accepted by IndexNow.org + Bing |

## Architecture

Two GitHub Pages repos in `Trejon-888`:
1. **`az-water-check-preview`** → serves `aquafeelsolutionsarizona.com` (the actual site)
2. **`azwatercheck-redirect`** → serves `azwatercheck.com` (path-preserving redirect to new domain)

DNS at Network Solutions:
- `aquafeelsolutionsarizona.com` → 4 A records to GitHub Pages IPs + CNAME `www` → `trejon-888.github.io`
- `azwatercheck.com` → unchanged (still pointing at GitHub Pages IPs; routed to redirect repo via CNAME match)

## How the Redirect Works

For each of the 65 catalogued URLs (sitemap + noindex pages), the redirect repo has:
- A path-matched `index.html` returning HTTP 200
- `<link rel="canonical" href="https://aquafeelsolutionsarizona.com/{matching-path}/">` — strongest possible SEO signal
- `<meta http-equiv="refresh" content="0; url=...">` — instant refresh for browsers ignoring JS
- `<script>window.location.replace(newBase + path)</script>` — preserves path + query + hash
- Branded "moved" splash visible for the ~200ms before redirect fires

For any uncatalogued URL → `404.html` fires with the same JS path-preservation logic, so users still land on the right page on the new domain.

## What's NOT a Plain 301 (and Why That's Acceptable)

GitHub Pages can't serve true HTTP 301 redirects (only flat static files). For a true 301, you'd need:
- Cloudflare in front of `azwatercheck.com` (free tier, ~10 min setup)
- OR Network Solutions Web Forwarding (5 min setup in NetSol UI)

The meta-refresh + canonical + JS combo is treated by Google as a **"soft 301"** — combined with the next step (Search Console Change of Address), ranking transfer is reliable.

If you want to upgrade to true 301 later: see `POST-CUTOVER-CHECKLIST.md` for Cloudflare / NetSol Web Forwarding steps.

---

## Remaining manual actions (need your Google/Bing logins)

Full guide in `POST-CUTOVER-CHECKLIST.md`. TL;DR:

### High priority
1. **Google Search Console Change of Address** — preserves ranking authority transfer.
   - Add `aquafeelsolutionsarizona.com` as a new Domain property
   - Verify via DNS TXT at NetSol
   - Submit Change of Address (from `azwatercheck.com` property → new domain)

### Medium priority
2. **Bing Webmaster Tools Site Move** — same idea for Bing
3. **Update high-value backlinks at source** — BBB, NSF directory, GBP website field, social bios

### Deferred
4. **A2P pages rebrand** — wait for Twilio approval of current resubmission, then rebrand `/opt-in/`, `/privacy-policy/`, `/terms-and-conditions/` from "AZ Water Check" → "Aquafeel Solutions Arizona". Notify Twilio Campaign Registry of the brand-name update at that time.

---

## Rollback (only if something goes very wrong)

```bash
cd departments/business-ops/clients/az-water-check/website
git revert <merge-commit-sha> --no-edit
git push origin main
```

Reverts CNAME back to `azwatercheck.com`. The redirect repo (`azwatercheck-redirect`) would then conflict — disable Pages on that repo via `gh api -X DELETE /repos/Trejon-888/azwatercheck-redirect/pages` first.

---

## Quick verification commands

```bash
# New domain works
curl -sI https://aquafeelsolutionsarizona.com/ | head -1   # → HTTP/2 200

# Old domain redirects (per-path canonical)
curl -s "https://azwatercheck.com/service-areas/phoenix/?v=1" | grep canonical
# → canonical href="https://aquafeelsolutionsarizona.com/service-areas/phoenix/"

# Email intact
dig +short MX azwatercheck.com   # → smtp.google.com (Google Workspace)

# SSL valid
echo | openssl s_client -connect aquafeelsolutionsarizona.com:443 -servername aquafeelsolutionsarizona.com 2>/dev/null | openssl x509 -noout -dates
```
