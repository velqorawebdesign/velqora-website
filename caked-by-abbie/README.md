# Caked by Abbie website

Static website for **Caked by Abbie**, custom cakes and sweet treats from a home baker in Lucan, Co. Dublin. Built by Velqora. Plain HTML, CSS and a small JavaScript file. No build step, frameworks, cookies, analytics or third-party requests.

The folder is self-contained, so it can be uploaded on its own to any static host (GitHub Pages, Netlify, Cloudflare Pages) or its own domain. All links are relative.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home: prices, flavours, allergens, how to order, Instagram, order planner, FAQ |
| `privacy.html` | Privacy Policy (GDPR) |
| `cookies.html` | Cookie Policy |
| `terms.html` | Terms & Conditions |
| `refunds.html` | Refund & Cancellation Policy |
| `accessibility.html` | Accessibility Statement |

Content (prices, flavours, steps, delivery fee) is taken from the @cakedbyabbie Instagram story highlights.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Compliance checklist

| Item | Status |
|------|--------|
| Colour contrast | All text WCAG AA or better: body 13.4:1, muted 7.1:1+, rose links and buttons 5.1:1+, errors 7.2:1. Input borders 3.6:1 (3:1 needed) |
| Alt text | No product photos are hosted. The cake drawing and icons are decorative, so they're hidden from screen readers (`aria-hidden`). The share image has `og:image:alt` |
| Refund, Privacy, Cookies, T&Cs pages | Added, written for Irish/EU law (GDPR, ePrivacy S.I. 336/2011, Consumer Rights Act 2022) |
| Accessibility | Skip link, visible focus, landmarks, keyboard menu (Esc closes), 44px+ targets, reduced motion, no sideways scroll at 320px. axe-core: 0 violations on all pages |
| Fake reviews / unsupported claims | None. No testimonials, ratings, follower counts, "best in Dublin" or hygiene/registration claims |
| Third-party embeds | None. Instagram is linked, not embedded, so nothing loads from Meta until a visitor clicks |
| Image copyright | No photos from Instagram or stock libraries. The cake drawing, favicon and share image are original artwork made for this site. Icons: Lucide (ISC). Fonts: Great Vibes, Cormorant Garamond, Jost (SIL OFL, self-hosted, licences in `assets/fonts/`) |
| Tracking / cookies | None, so no cookie banner is needed. A Content-Security-Policy blocks all outside scripts, styles, fonts and frames |
| Form consent, minimal data | The order planner runs only in the browser and doesn't send or store anything. It asks for a name, order details and a date. No email, phone or address. Consent box required |
| Keyboard-friendly form | Visible labels, grouped radio buttons, inline errors and a focusable error summary that links to each field |
| Clear button labels | "Write my order message", "Copy message", "Open Instagram chat". New-tab links say so to screen readers |
| Local laws | Allergen info shown (EU FIC Regulation 1169/2011, S.I. 489/2014). The €10 delivery fee is shown up front. 14-day cancellation exception for personalised/perishable goods explained. Photo-sharing consent covered |
| Business details | Trading name, Lucan location and Instagram in the footer and policies. See owner to-do below |

## Owner to-do before going live

- [ ] **Add real contact details**: an email address (and ideally a postal address and full name). EU e-commerce rules (S.I. 68/2003) require a geographic address and an email address. Search for `TODO (owner)` in the HTML files and update the footer on every page.
- [ ] **Register as a food business** with the HSE Environmental Health Service before selling to the public (required for home bakers in Ireland). Once registered, you *can* say so on the site.
- [ ] **Check the allergen list** in `index.html` (`#allergens`) and `terms.html` against your actual ingredients, including any sprinkles, chocolates and toppers.
- [ ] **Confirm the deposit and cancellation rules** in `refunds.html` (7 days / 48 hours) and the deposit wording in `terms.html` match how you work.
- [ ] If you trade under "Caked by Abbie" rather than your own name, register the business name with the CRO.
- [ ] **Adding photos?** Only use your own photos. Save them as `.webp` in `assets/img/`, and give each one alt text that describes the bake, such as `alt="Two-tier pink vintage cake with piped hearts and cherries"`. Ask the customer before showing names, faces or photo-print cakes.
- [ ] Have a solicitor review the policy pages. They're a solid starting point, not legal advice.
- [ ] If you ever add analytics, an Instagram feed embed or cookies, add a consent banner first and update `cookies.html`.

## Credits

- **Icons**: paths based on [Lucide](https://lucide.dev), ISC License.
- **Fonts**: Great Vibes, Cormorant Garamond and Jost, SIL Open Font License 1.1 (see `assets/fonts/`). Self-hosted via Fontsource builds.
- **Illustrations**: original artwork made for this site.
