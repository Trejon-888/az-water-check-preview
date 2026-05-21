# Post-Cutover Checklist — aquafeelsolutionsarizona.com

**Cutover completed:** 2026-05-21
**Status:** New domain LIVE with SSL ✅ — IndexNow notified ✅ — Old domain 301 + GSC + Bing pending

---

## ✅ Already Done (autonomous)

| Task | Status | Notes |
|---|---|---|
| DNS records at Network Solutions | ✅ | 4 A records + 1 CNAME, propagated to all major resolvers |
| Site-wide URL migration | ✅ | 1,084 refs across 71 files |
| Schema `@id` migration | ✅ | 140 refs |
| CNAME file flipped | ✅ | New domain canonical |
| Sitemap, llms.txt, robots.txt | ✅ | All migrated |
| Branch merged to main + pushed | ✅ | Commit `4b8a5f2` |
| GitHub Pages deploy | ✅ | Auto-deployed |
| SSL cert issued by Let's Encrypt | ✅ | Valid through Aug 19, 2026 |
| New domain smoke test (EN + ES + opt-in + sitemap) | ✅ | All 200 OK |
| IndexNow ping (64 URLs) | ✅ | IndexNow.org HTTP 202, Bing direct HTTP 200 |

---

## ⚠️ Action Required — YOU need to do these (I can't from here)

### 1. NetSol Web Forwarding — fix 301 redirect from old domain (PRIORITY)

**Why this matters:** `https://azwatercheck.com/` currently returns **404**. Every backlink, bookmark, and existing search-result snippet pointing at the old domain is broken right now. We need to set up Web Forwarding to 301-redirect everything to the new domain.

**Steps:**
1. Log into Network Solutions
2. From the project picker, click **"View Project"** on the **Az Water Check** card (blue one — `azwatercheck.com`)
3. Click **"Advanced Tools"** → it will show the same panel structure as the new domain
4. Look for **"Web Forwarding"** (right column) → click **"Add Web Forwarding"**
5. Configure:
   - **Forward to:** `https://aquafeelsolutionsarizona.com`
   - **Forward type:** **"Forward Only"** (permanent 301) — NOT "Forward with Masking" (which is frame-based and bad for SEO)
   - **Forward subdomains:** YES (so `www.azwatercheck.com` also forwards)
   - **Path forwarding:** YES if available (so `azwatercheck.com/about/` → `aquafeelsolutionsarizona.com/about/`)
6. Save

**Important:** Web Forwarding only affects HTTP/HTTPS traffic. Email (MX records) is untouched. `info@azwatercheck.com` continues to work.

**Verify after:** Wait ~10 min, then test:
```
curl -sI https://azwatercheck.com/
# Should show: HTTP/2 301 + Location: https://aquafeelsolutionsarizona.com/
```

### 2. Google Search Console — Change of Address (PRIORITY for SEO)

**Why this matters:** This is THE single most important post-migration SEO step. It tells Google to transfer all authority (rankings, links, history) from the old domain to the new one.

**Pre-requisite:** Both domains verified in GSC.

**Steps:**
1. Go to https://search.google.com/search-console
2. **Add new property:** `aquafeelsolutionsarizona.com` (Domain property, not URL-prefix)
3. **Verify ownership** via DNS TXT record:
   - GSC will give you a string like `google-site-verification=abc123...`
   - Add it as a TXT record at Network Solutions for `aquafeelsolutionsarizona.com`
   - Wait 5-10 min, click "Verify" in GSC
4. **Verify old domain too** (if not already):
   - Same TXT process for `azwatercheck.com` if you haven't done it before
5. **Submit sitemap on new property:**
   - In GSC for `aquafeelsolutionsarizona.com`, go to Sitemaps
   - Submit: `https://aquafeelsolutionsarizona.com/sitemap.xml`
6. **Submit Change of Address:**
   - In GSC for **`azwatercheck.com`** property → Settings → **Change of address**
   - Select destination: `aquafeelsolutionsarizona.com`
   - Google will verify the 301 redirect is in place (so do step #1 above FIRST)
   - Click Submit

### 3. Bing Webmaster Tools — Site Move

1. Go to https://www.bing.com/webmasters
2. Add new site: `aquafeelsolutionsarizona.com`
3. Verify via DNS TXT (Bing provides string)
4. Submit sitemap: `https://aquafeelsolutionsarizona.com/sitemap.xml`
5. Use **Site Move** tool to notify of the domain change (Bing's equivalent of GSC Change of Address)

### 4. Optional but recommended — update high-value backlinks at source

For SEO link equity preservation, update these at source where possible (the 301 catches the rest):
- BBB business listing URL
- NSF dealer directory listing
- Aquafeel parent brand site (if they link out to dealers)
- Solit's social profiles bio links (Instagram, TikTok, YouTube)
- Google Business Profile website field
- Yelp business listing
- Apple Maps Connect

---

## 📊 What Search Engines See Now

| Engine | What happens | Action needed |
|---|---|---|
| **Google Search** | New domain works; old domain 404 (until Web Forwarding set up) → users get broken pages. Once Web Forwarding is up and Change of Address submitted, Google transfers rankings in 1-4 weeks. | Web Forwarding + Change of Address |
| **Bing Search** | IndexNow already notified ✅. Bing will crawl new URLs within hours. Old domain rankings transfer with Site Move tool. | Web Forwarding + Site Move |
| **DuckDuckGo / Yandex** | IndexNow notified ✅. Will pick up new URLs naturally. | No further action |
| **ChatGPT / Perplexity / Claude / Gemini (AI search)** | `llms.txt` already updated and live at new domain. AI crawlers auto-discover on next crawl. | No further action |

---

## ⏱️ Expected Timeline

| Event | When |
|---|---|
| NetSol Web Forwarding (after you set it up) | ~10-30 min to propagate |
| Bing first crawl of new URLs | 24-48 hours |
| Google first crawl of new URLs | 1-7 days |
| GSC Change of Address signal acknowledged | 24-48 hours |
| Full ranking transfer Google → new domain | 2-6 weeks |
| ChatGPT/Perplexity citation updates | 2-8 weeks (depends on next crawl) |

---

## 🚨 Rollback Plan (if anything breaks badly)

```bash
cd /Users/trejon/.openclaw/workspace-quique/departments/business-ops/clients/az-water-check/website
git revert HEAD --no-edit
git push origin main
```

This reverts the merge commit. CNAME flips back to `azwatercheck.com`. Old domain serves again, new domain falls back to 404 / 301 forward.

Use only if a major issue surfaces that can't be fixed quickly.

---

## 🟡 Deferred — After Twilio A2P Approval

When the current Twilio resubmission is approved for "AZ Water Check":
1. Notify Twilio of the URL change for opt-in/privacy/terms pages (they now live at `aquafeelsolutionsarizona.com`)
2. After Twilio acknowledges, rebrand the 3 pages from "AZ Water Check" → "Aquafeel Solutions Arizona"
3. Update Twilio Campaign Registry with new brand name
4. Re-submit if Twilio requires it

This is a separate sprint, not part of this migration.
