# Aquafeel Solutions Arizona website

This repository contains the files for **[aquafeelsolutionsarizona.com](https://aquafeelsolutionsarizona.com/)**.

## Taking over the website? Start here

Read the **[Website Management Guide](docs/WEBSITE-MANAGEMENT.md)**. It explains where everything lives, which accounts you need, how to edit English and Spanish pages, how to publish and undo changes, and how to manage the domain or transfer this repository.

| What you need | Where to go |
| --- | --- |
| Understand hosting, the domain and access | [Hosting and accounts](docs/WEBSITE-MANAGEMENT.md#1-where-the-website-lives) |
| Find the right file to edit | [File map](docs/WEBSITE-MANAGEMENT.md#3-find-the-right-file) |
| Preview the site on your computer | [Local preview](docs/WEBSITE-MANAGEMENT.md#4-preview-the-site-on-your-computer) |
| Change text, images, reviews or videos | [Common changes](docs/WEBSITE-MANAGEMENT.md#5-make-common-changes) |
| Connect or check booking | [Booking and forms](docs/WEBSITE-MANAGEMENT.md#6-booking-and-forms) |
| Publish an update or undo one | [Publishing](docs/WEBSITE-MANAGEMENT.md#7-publish-and-check-an-update), [rollback](docs/WEBSITE-MANAGEMENT.md#8-undo-a-bad-update) |
| Manage DNS or transfer ownership | [Domain and transfer](docs/WEBSITE-MANAGEMENT.md#9-domain-dns-and-ownership-transfer) |
| Check what still needs work | [Known gaps](docs/WEBSITE-MANAGEMENT.md#10-known-gaps-and-troubleshooting) |

## How it is set up

- **Website hosting:** GitHub Pages, publishing `main` from the repository root (`/`). Changes merged into `main` go live automatically.
- **Domain registration and DNS:** Network Solutions for `aquafeelsolutionsarizona.com`. This is a separate account from GitHub.
- **Website files:** plain HTML, CSS, JavaScript and media. There is no required npm install, compilation step or CMS dashboard.
- **Old domain:** `azwatercheck.com` uses the separate [redirect repository](https://github.com/Trejon-888/azwatercheck-redirect). Do not mix its files or `CNAME` with this site.

## Useful links

- [Live website](https://aquafeelsolutionsarizona.com/)
- [Existing water-test questionnaire and booking](https://aquafeelsolutionsarizona.com/free-water-test/)
- [New landing-page preview — English](https://aquafeelsolutionsarizona.com/water-test-preview/)
- [New landing-page preview — Spanish](https://aquafeelsolutionsarizona.com/water-test-preview/?lang=es)

**The new landing page is still a review preview.** It needs approved customer reviews, English/Spanish testimonial videos and its approved booking calendar. Opening its preview button does not book an appointment. See the guide before launching it.

Setup checked September 25, 2026. Public links let you read the source; editing, publishing and ownership require the appropriate account permissions. The guide documents the existing site and outstanding work; adding these instructions does not transfer accounts or complete booking setup.
