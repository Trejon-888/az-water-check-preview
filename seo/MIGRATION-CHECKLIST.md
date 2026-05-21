# Domain Migration: azwatercheck.com → aquafeelsolutionsarizona.com

**Branch:** `migration-to-aquafeelsolutionsarizona`
**Started:** 2026-05-21
**Strategy:** Atomic cutover. Email stays on `azwatercheck.com` (per Solit's existing setup). GitHub Pages auto-handles the 301 redirect from old domain → new domain once the CNAME file flips, because both domains point at GitHub Pages IPs.

---

## Phase 0 — DNS Setup ✅ DONE (2026-05-21)

Records added at Network Solutions for `aquafeelsolutionsarizona.com`:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | @ | 185.199.108.153 | 4h |
| A | @ | 185.199.109.153 | 4h |
| A | @ | 185.199.110.153 | 4h |
| A | @ | 185.199.111.153 | 4h |
| CNAME | www | trejon-888.github.io | 4h |

**Verification (authoritative `ns43.worldnic.com`):** ✅ All 4 IPs return
**Public DNS propagation:** In progress (1-24h typical)

Check propagation any time:
```bash
dig +short aquafeelsolutionsarizona.com A @8.8.8.8
# Expected: 185.199.108.153, .109.153, .110.153, .111.153
# Currently returning: 208.91.197.27 (old cached parking page) until TTL expires
```

---

## Phase 1 — Code Migration ✅ DONE (this branch)

Changes staged on branch `migration-to-aquafeelsolutionsarizona`:

| Change | Count | Verified |
|---|---|---|
| URL refs migrated `https://azwatercheck.com` → `https://aquafeelsolutionsarizona.com` | 1,084 | ✅ 0 old URLs remaining |
| Files modified | 71 | ✅ |
| Schema `@id` values migrated | 140 | ✅ 0 pointing at old domain |
| Email refs preserved (`info@azwatercheck.com`) | 122 | ✅ Untouched |
| Brand text "AZ Water Check" on A2P pages | preserved | ✅ Twilio compliance maintained |
| Social media handles (`instagram.com/azwatercheck` etc.) | preserved | ✅ Solit's handles unchanged |
| `CNAME` file in repo root | updated | ✅ Now reads `aquafeelsolutionsarizona.com` |
| `sitemap.xml` | 64 URLs migrated | ✅ |
| `sitemap-images.xml` | migrated | ✅ |
| `llms.txt` (AI search brief) | migrated | ✅ |
| `robots.txt` sitemap pointers | migrated | ✅ |
| Open Graph image absolute URLs | migrated | ✅ |
| Hreflang xhtml:link clusters | migrated | ✅ |
| IndexNow payload regenerated | 64 URLs | ✅ `seo/indexnow-payload-post-migration.json` |

---

## Phase 2 — Cutover (wait for DNS propagation, then execute)

**Pre-flight check:**
```bash
dig +short aquafeelsolutionsarizona.com A @8.8.8.8
# Must return 185.199.108-111.153 before proceeding
```

**Execute:**
1. Merge `migration-to-aquafeelsolutionsarizona` → `main`
2. Push to `origin/main`
3. GitHub Pages auto-deploys (1-2 min)
4. GitHub Pages auto-issues SSL cert for `aquafeelsolutionsarizona.com` (5-30 min)
5. Verify HTTPS works: `curl -I https://aquafeelsolutionsarizona.com/`
6. Verify 301 redirect from old: `curl -I https://azwatercheck.com/` (should 301 to new domain)

**Auto-301:** GitHub Pages auto-redirects any domain pointing at its IPs back to whatever is in the repo's `CNAME` file. Since `azwatercheck.com` still points at GitHub Pages, it will 301 to `aquafeelsolutionsarizona.com` automatically. No Cloudflare or NetSol Web Forwarding needed.

---

## Phase 3 — Search Engine + AI Search Notifications (post-cutover)

### Google Search Console (CRITICAL — preserves SEO authority transfer)
1. Add `aquafeelsolutionsarizona.com` as a NEW property in GSC
2. Verify via DNS TXT record at Network Solutions (GSC will provide the exact string)
3. Submit sitemap: `https://aquafeelsolutionsarizona.com/sitemap.xml`
4. Submit Change of Address: `azwatercheck.com` (old) → `aquafeelsolutionsarizona.com` (new)
   - Requires both properties verified
   - Tells Google to transfer authority + rankings

### Bing Webmaster Tools
1. Add `aquafeelsolutionsarizona.com` as a new site
2. Verify via DNS TXT
3. Submit sitemap
4. Use "Site Move" tool (Bing's equivalent of Change of Address)

### IndexNow (instant Bing + Yandex + DuckDuckGo notification)
1. Verify key file accessible at new domain: `curl https://aquafeelsolutionsarizona.com/1e03d71e692d26d7d8b54c2d2884de9e.txt`
2. POST `seo/indexnow-payload-post-migration.json` to `https://api.indexnow.org/IndexNow`:
   ```bash
   curl -X POST https://api.indexnow.org/IndexNow \
     -H "Content-Type: application/json" \
     -d @seo/indexnow-payload-post-migration.json
   ```
3. Expected response: HTTP 200 or 202

### AI Search (llms.txt is already updated)
- ChatGPT/Perplexity/Claude/Gemini crawlers will pick up the new `llms.txt` on next crawl
- Robots.txt allowlist for 14 AI bots is already migrated
- No manual notification needed — AI crawlers auto-discover

---

## Phase 4 — Backlink Outreach (high-value links only)

Update at source where possible to preserve link equity (301s catch the rest):
- BBB business listing
- NSF dealer directory
- Aquafeel parent brand site (if they link out to dealers)
- Any press / partner mentions
- Solit's social profiles (Instagram bio, etc.)

Low-priority backlinks: let the 301 redirect handle them.

---

## Phase 5 — Email Migration (DEFERRED)

**Decision:** Keep `info@azwatercheck.com` on the old domain. Solit's email continues to work via Network Solutions email service on azwatercheck.com.

**Future option:** Set up `info@aquafeelsolutionsarizona.com` with new MX records, migrate inbox content, update site-wide. Separate sprint when Solit is ready.

---

## Phase 6 — A2P Pages (BLOCKED on Twilio approval)

The following pages currently retain "AZ Water Check, a division of Sol Deja Vu" brand text for Twilio A2P 10DLC compliance:
- `/opt-in/`
- `/privacy-policy/`
- `/terms-and-conditions/`

Their canonical URLs and schema have migrated to the new domain (URL-only change is safe). Brand text inside these pages stays as "AZ Water Check" until the current Twilio resubmission is approved.

**After Twilio approval:**
1. Rebrand the 3 pages: "AZ Water Check" → "Aquafeel Solutions Arizona"
2. Update Twilio Campaign Registry with new brand name + new opt-in URL
3. Notify Twilio of the URL change if required

---

## Rollback Plan (if anything breaks)

If the cutover causes unexpected issues:
1. Revert the merge commit on `main`: `git revert <merge-sha> && git push`
2. CNAME file reverts to `azwatercheck.com` → GitHub Pages re-serves the site there
3. New domain falls back to 301-redirecting to old domain
4. SSL cert for old domain remains valid (was never deleted)

Rollback window: any time before GSC Change of Address is submitted. After submission, rollback is messier because Google starts re-pointing rankings.

---

## Verification After Cutover (full smoke test)

```bash
# 1. New domain serves the site
curl -sI https://aquafeelsolutionsarizona.com/ | head -1
# Expected: HTTP/2 200

# 2. Old domain 301s to new
curl -sI https://azwatercheck.com/ | head -3
# Expected: HTTP/2 301 + Location: https://aquafeelsolutionsarizona.com/

# 3. SSL cert valid
echo | openssl s_client -connect aquafeelsolutionsarizona.com:443 -servername aquafeelsolutionsarizona.com 2>/dev/null | openssl x509 -noout -subject -dates
# Expected: subject contains aquafeelsolutionsarizona.com; notBefore is recent

# 4. Sitemap accessible
curl -s https://aquafeelsolutionsarizona.com/sitemap.xml | head -5
# Expected: valid XML starting with <urlset>

# 5. IndexNow key file accessible
curl -s https://aquafeelsolutionsarizona.com/1e03d71e692d26d7d8b54c2d2884de9e.txt
# Expected: returns the key string

# 6. Email still works (DO NOT 301 the email path)
dig +short MX azwatercheck.com
# Expected: returns NetSol MX records (unchanged)

# 7. Spanish mirror accessible
curl -sI https://aquafeelsolutionsarizona.com/es/ | head -1
# Expected: HTTP/2 200

# 8. A2P opt-in form accessible
curl -sI https://aquafeelsolutionsarizona.com/opt-in/ | head -1
# Expected: HTTP/2 200
```
