# Website Management Guide

For the person looking after Aquafeel Solutions Arizona's website. Start with the first two sections, then use the section for the job you need to do. [Back to the README](../README.md).

Checked September 25, 2026 against the live repository, GitHub Pages settings and public domain records. This guide covers website management only.

## 1. Where the website lives

There are three separate pieces:

1. **GitHub repository:** stores the website files and their change history.
2. **GitHub Pages:** serves those files as the website people visit.
3. **Network Solutions:** registers the domain and runs its DNS, which points visitors to GitHub Pages.

```text
aquafeelsolutionsarizona.com
        | DNS at Network Solutions
        v
GitHub Pages
        | publishes main, repository root
        v
Files in this repository
```

| Item | Current setup |
| --- | --- |
| Live domain | https://aquafeelsolutionsarizona.com/ |
| Repository | https://github.com/Trejon-888/az-water-check-preview |
| GitHub owner | `Trejon-888` at the time of review |
| Publishing source | `main` branch, `/` (root) folder |
| Pages custom domain | `aquafeelsolutionsarizona.com` |
| HTTPS enforcement | Enabled at the time of review |
| Domain registrar | Network Solutions, LLC |
| Authoritative nameservers | `ns43.worldnic.com` and `ns44.worldnic.com` |
| Previous domain | `azwatercheck.com`, maintained in [another repository](https://github.com/Trejon-888/azwatercheck-redirect) |

Transferring a GitHub repository does **not** transfer the domain, its renewal billing, email accounts or booking service. Public registrar records establish the provider, not who holds the login. Confirm the actual domain account owner directly.

## 2. Accounts and access you need

| Task | Access needed |
| --- | --- |
| Read or download these files | Public repository link; ownership transfer is unnecessary |
| Propose a change | A GitHub account and a branch or fork/pull request |
| Merge changes and publish | Repository write access, subject to its branch rules |
| Change Pages settings or transfer the repository | The appropriate repository administrator/owner |
| Edit DNS or renew the domain | The Network Solutions account holder or authorized domain manager |
| Change appointments, availability or staff notifications | The business's LeadConnector/GoHighLevel calendar account |

Ask the current owner to invite your GitHub username if you will maintain the site. Accept the invitation and verify your access. If full ownership is wanted, use the transfer section below. A contact name/email helps coordinate; the receiving GitHub username or organization identifies a repository transfer.

Identify one person responsible for website changes, one for domain renewal/DNS, and one for the calendar and incoming leads. The same person can cover multiple roles. Keep passwords, customer records and private account details outside this public repository.

## 3. Find the right file

| What you are changing | Files |
| --- | --- |
| Main homepage | [index.html](../index.html), including its inline styles and language strings |
| New landing-page structure, English fallback and inline styles | [water-test-preview/index.html](../water-test-preview/index.html) |
| New landing-page language text and behavior | [water-test-preview/app.js](../water-test-preview/app.js) |
| New landing-page reviews, videos and booking configuration | [water-test-preview/content.js](../water-test-preview/content.js) |
| New landing-page stylesheet | [water-test-preview/styles.css](../water-test-preview/styles.css); keep the inline styles in its HTML aligned |
| New landing-page images and media | [water-test-preview/assets/](../water-test-preview/assets/) |
| Existing water-test questionnaire/calendar | [free-water-test/index.html](../free-water-test/index.html) |
| Booking aliases and Spanish entry points | [agenda/](../agenda/), [book-test/](../book-test/), [prueba-gratis/](../prueba-gratis/), [es/free-water-test/](../es/free-water-test/) |
| Other pages | [about/](../about/), [faq/](../faq/), [financing/](../financing/), [service-areas/](../service-areas/), with Spanish counterparts under [es/](../es/) where present |
| Educational articles | [resources/](../resources/) and [es/resources/](../es/resources/) |
| Shared legacy styling/scripts | [css/styles.css](../css/styles.css) and [js/main.js](../js/main.js); individual pages also have inline code |
| Logos, photos and fonts | [assets/brand/](../assets/brand/) |
| Contact and SMS opt-in pages | [contact.html](../contact.html) and [opt-in/index.html](../opt-in/index.html); see the form limitations below |
| Search metadata | [sitemap.xml](../sitemap.xml), [sitemap-images.xml](../sitemap-images.xml), [robots.txt](../robots.txt), [llms.txt](../llms.txt) and per-page canonical/hreflang tags |
| Custom domain | [CNAME](../CNAME) plus GitHub Settings > Pages and the DNS account |

Files such as `preview-v*.html`, `v2.html` and `index-v1-old.html` are earlier versions, not the current homepage. Notes in `seo/` are historical migration records. Read them as history, not proof of current account access or working lead delivery.

## 4. Preview the site on your computer

You need Git and Python 3. This is a static site: no dependency installation or application build is required.

```sh
git clone https://github.com/Trejon-888/az-water-check-preview.git
cd az-water-check-preview
git switch -c website-update
python -m http.server 4486 --bind 127.0.0.1
```

On some systems the Python command is `python3` or `py -3`. Run the server from the repository root, where `index.html` and `CNAME` are located.

Open:

- Homepage: http://127.0.0.1:4486/
- New preview: http://127.0.0.1:4486/water-test-preview/
- Spanish preview: http://127.0.0.1:4486/water-test-preview/?lang=es
- Existing questionnaire: http://127.0.0.1:4486/free-water-test/

Stop the server with Ctrl+C. If the port is occupied, use another port in both the command and URL. Some absolute links point to the live website even during a local preview. Embedded calendars are external services: a booking submitted locally could still create a real appointment.

For a small text edit, GitHub's pencil button can also edit a file. Choose a new branch and open a pull request instead of committing directly to `main`. Review the difference before merging. Local preview remains useful because a pull request by itself does not create a staging website in this setup.

## 5. Make common changes

### Text in English and Spanish

The new landing page has paired `en` and `es` dictionaries in `water-test-preview/app.js`. Match the key to a `data-copy` attribute in `index.html`. For example, to change the main headline:

1. Update `headline` in both language dictionaries.
2. Update the English text inside the HTML element with `data-copy="headline"`.
3. Keep keys, quotes and commas intact.
4. Test both languages, including a direct visit with `?lang=es`.

The HTML contains an initial English version so the page stays readable if JavaScript fails. Updating only the JavaScript can leave that version out of date. Similarly, keep duplicated inline CSS and `styles.css` consistent when changing the preview's layout.

The homepage and existing questionnaire use a different approach, including `data-en` and `data-es` attributes in their own HTML. Shared legacy pages also use `.lang-en`/`.lang-es` and `js/main.js`. Inspect the specific page; there is no single translation file for the entire website.

### Images and other media

Add appropriately sized files to the relevant assets folder and update their references and descriptive alt text. Check filename capitalization: a path that works on Windows can fail on the live host. Keep existing referenced files until replacements are checked. Existing fonts and media are included with the site; their presence is not a new license for unrelated reuse.

For articles or service-area pages, edit the matching Spanish page where one exists. If you add or rename a URL, update its navigation, sitemap and canonical/hreflang references. Keep old QR-code destinations working.

### Customer reviews and testimonial videos

Edit `water-test-preview/content.js`. The configuration currently contains three empty review entries, two empty testimonial entries and an unapproved calendar.

- A review needs `platform`, `quote`, `author`, an HTTPS `sourceUrl` and `approved: true` after the actual review and permission have been checked.
- A video needs its `language`, approved media in `src`, and `approved: true`. Add the customer name, poster and caption track where available. Captions use WebVTT; check that they match the spoken language.
- Video/image sources can use a permitted relative path such as `assets/testimonial-en.mp4` or an HTTPS media URL. The current player expects a playable video file, not an ordinary YouTube watch-page link. Public media URLs must not contain private credentials or short-lived access tokens.

These fields are explained by the existing entries in [content.js](../water-test-preview/content.js) and validated by [app.js](../water-test-preview/app.js). Use real approved material. The current illustrative posters are not customer testimonials.

### Finish the new preview

Leave `reviewMode: true` while the business reviews the page. After approved reviews, videos and calendar are in place, verify them before changing it to `false`. Unapproved evidence is hidden outside review mode; flipping the flag does not supply missing material. Synchronize the HTML's static cards/posters with the intended final content. Decide whether this campaign page should remain `noindex,nofollow`; changing `reviewMode` does not change its robots meta tag.

The script URLs in the HTML include version query strings. Change the version when publishing updated scripts, then check a fresh browser session to avoid reviewing cached content.

## 6. Booking and forms

### Existing website

The homepage embeds a LeadConnector calendar. The existing questionnaire at `/free-water-test/` builds a calendar iframe URL with answers in `notes` and `additional_information` parameters. The calendar owner's CRM settings control availability, staff, notifications and saved records; these are not managed by GitHub.

Confirm the current calendar with the business before replacing its URL. A URL parameter is not proof that the CRM saved the answers. With the calendar manager, perform a clearly labeled test and verify the contact, notes, appointment, assigned staff and confirmation inside the CRM. Arrange cleanup of that test afterward.

### New landing-page preview

In `water-test-preview/content.js`, update `booking.embedUrl` to the approved calendar embed URL and set `booking.approved` only when ready. Current code accepts HTTPS URLs on `api.leadconnectorhq.com` or `calendly.com`. A different provider requires a reviewed code change; do not disable URL validation simply to make a link pass.

Do not assume the older homepage calendar is the right destination for the new campaign. In review mode without an approved calendar, the button opens a preview dialog and submits nothing. Outside review mode without a valid calendar, booking is unavailable. Finish by testing the actual calendar/CRM receipt, not just the button animation.

### Contact and opt-in pages

The current `contact.html` handler in `js/main.js` and the handler in `opt-in/index.html` show local success without sending a submission to a backend. They must not be treated as working lead-capture or stored-consent systems. To use them, the maintainer needs to connect the business's chosen backend/CRM and verify that it receives the record.

## 7. Publish and check an update

1. Create a branch and make the smallest intended change. Review `git diff`; include only the files you mean to publish.
2. Preview the affected pages locally. Check English/Spanish, a narrow mobile width, links, images and browser console errors. For booking changes, include the CRM check above.
3. Push the branch and open a pull request. Ask the responsible website owner to review it.
4. Merge the reviewed change into `main` when ready to publish. In this repository, `main` at `/` is the Pages publishing source; merging there triggers publication.
5. Check the deployment in GitHub's **Actions** tab and **Settings > Pages**. Wait for a successful deployment of the intended commit.
6. Open the affected live URLs in a fresh session. Confirm the expected text, language, images and behavior. Record the commit and result so the next maintainer knows what changed.

For small changes the GitHub editor can create the branch/pull request. A local workflow can use `git add` with explicit filenames, `git commit`, then `git push -u origin YOUR_BRANCH`. Normal GitHub authentication is required for writes; no agency-specific tool is needed.

GitHub explains branch-based publishing in its [Pages publishing guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Keep **Settings > Pages** on the intended branch/root; do not switch it to `/docs` because this guide is stored there. A successful deployment does not prove a booking reached the CRM.

## 8. Undo a bad update

Find the commit or merged pull request that introduced the problem. Revert that change on a new branch and review the resulting pull request. GitHub offers a **Revert** action on eligible merged pull requests. For a simple non-merge commit, a maintainer can use:

```sh
git switch main
git pull --ff-only
git switch -c revert-website-update
git revert COMMIT_SHA
git push -u origin revert-website-update
```

Replace `COMMIT_SHA` with the actual faulty commit, then open and review a pull request into `main`. Merge only after checking the result. Merge commits require choosing the correct parent; use a maintainer's review instead of guessing. Avoid force-pushing or replacing the whole site with an old folder, which can erase unrelated work. Recheck the live deployment after the revert.

The website content reviewed for this handoff was at `400f37c4344e46fc999db2c35671622120fb89ce`; this is a reference snapshot, not a claim that every form or booking path is complete.

## 9. Domain, DNS and ownership transfer

### Domain management

The domain's Network Solutions account is separate from GitHub. Ask the actual account holder to confirm login access, renewal responsibility, billing and any delegated manager. Do not assume these from the public registrar name.

Before a DNS change, save the current DNS zone and identify web and email records. The reviewed setup has GitHub Pages apex A records, `www` pointing to `trejon-888.github.io`, and Google mail MX records. DNS values are time-sensitive: inspect the current zone and GitHub instructions before changing anything. Preserve mail, TXT verification and other unrelated records when updating web hosting.

The [CNAME file](../CNAME) records this site's custom domain. Keep it consistent with **Settings > Pages**. A repository change alone does not give access to the registrar. Use GitHub's [custom-domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for the applicable DNS settings, then verify apex, `www`, redirects and HTTPS.

The old `azwatercheck.com` domain and its [redirect repository](https://github.com/Trejon-888/azwatercheck-redirect) need separate attention. Their current root/booking redirects use HTML/JavaScript, not a verified server-side 301. Retain their domain and URL continuity while old links and QR codes are in use. Never overwrite this repository's `CNAME` with the old domain's file.

### Optional GitHub ownership transfer

1. Agree the destination account/organization and obtain its exact GitHub username. Introduce the incoming manager if a different person will maintain the site.
2. The current repository administrator starts the transfer under **Settings > General > Danger Zone > Transfer ownership** and follows GitHub's prompts. Check destination eligibility and naming conflicts.
3. The recipient completes any required acceptance and verifies repository administration. Review collaborators and integrations with both owners.
4. Verify Pages settings, custom domain, HTTPS and DNS after transfer. A GitHub repository redirect is not a guarantee that Pages URLs or the existing `www` DNS target follow automatically.
5. Update local clone remotes and management links. Handle the old-domain repository separately if included. Keep domain registration and calendar access as separate handoff items.

GitHub's [repository transfer instructions](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository) explain recipient requirements and which integrations remain attached. This guide does not itself transfer ownership or change permissions.

## 10. Known gaps and troubleshooting

| Symptom or open item | What to check |
| --- | --- |
| New preview still shows placeholders | Approved reviews/videos/calendar are missing in `content.js`; inspect `reviewMode` and the HTML fallback |
| Updated text does not appear | Correct file/branch, intended Pages commit, script version and browser cache; EN/ES dictionaries plus HTML fallback |
| Image/video does not load | Exact filename/case, relative path, supported media file and public URL; test the file itself |
| Booking opens but no appointment appears | Correct provider/calendar, business availability, contact mapping and notifications inside the CRM |
| Questionnaire answers change after the calendar appears | Current `qualifiedShown` logic builds its iframe once; later answer changes do not refresh that URL. Fix and verify if this behavior is needed |
| Contact/opt-in says success but no lead arrives | Current handlers have no backend submission; connect and test a real destination before relying on them |
| Homepage JavaScript/language behavior fails | Source still references `contactForm` after its form was replaced by an iframe. Inspect the console and guard/remove the stale handler in a reviewed fix; source mismatch is confirmed, live exception reproduction was not completed in the handoff |
| Domain or certificate error | Check live DNS, custom-domain setting, HTTPS and Pages deployment; test the affected device/network too |
| Need analytics or conversion reporting | Confirm the actual measurement account and installed tracking; this repository's review did not establish current GA4/Meta Pixel collection or CRM attribution |

These are existing findings, not repairs made by adding this documentation. Only the new preview's local language switching, preview dialog and sample text-edit flow were rehearsed during preparation; that does not certify every route, device or live CRM submission.

## 11. Taking over: final check

- Open these files using your own account and confirm the write/admin role you need.
- Preview and edit a harmless line locally in English and Spanish, then discard the sample edit.
- Explain which branch publishes, how to check its deployment and how to revert a bad change.
- Confirm who can manage the domain, DNS, renewal and calendar.
- Review the unfinished preview inputs and form limitations with the business.
- Verify a permitted booking test reaches the CRM before relying on it.
- Check the main domain, `www`, old links and HTTPS after any transfer.
- Keep a dated backup or Git clone, and record the next owner/action for unfinished work privately.

Once these checks are complete, the next person has both the files and a practical way to manage them.
