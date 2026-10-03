# Velqora website

Static website for **Velqora**, web design & development (Ireland). Plain HTML, CSS and a small JavaScript file. No build step, frameworks, cookies, analytics or third-party requests.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home: services, process, promise, FAQ, contact |
| `privacy.html` | Privacy Policy (GDPR) |
| `cookies.html` | Cookie Policy |
| `terms.html` | Terms & Conditions |
| `refunds.html` | Refund & Cancellation Policy |
| `accessibility.html` | Accessibility Statement |
| `404.html` | Not-found page |

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Upload the whole folder to any static host (GitHub Pages, Netlify, Cloudflare Pages, etc.). After choosing a host, update the "server logs" row in `privacy.html` if needed.

## Compliance checklist

| Item | Status |
|------|--------|
| Colour contrast | All text pairs WCAG AA or better (body text 18.6:1, muted 9.7:1, buttons 6.1:1+) |
| Alt text | Logo images are decorative next to the "VELQORA" text, so `alt=""`; links have accessible names |
| Refund, Privacy, Cookies, T&Cs pages | Added, written for Irish/EU law (GDPR, ePrivacy S.I. 336/2011, Consumer Rights Act 2022) |
| Accessibility | Skip link, visible focus, landmarks, keyboard menu (Esc closes), 44px buttons, reduced motion, no sideways scroll at 320px |
| Fake reviews / unsupported claims | None: no testimonials, stats, ranking promises or reply-time promises |
| Third-party embeds | None. External links only load on click |
| Image copyright | Only the Velqora logo (owner's own). Icons: Lucide (ISC). Fonts: Inter and Space Grotesk (SIL OFL, self-hosted, licences in `assets/fonts/`) |
| Tracking / cookies | None, so no cookie banner is needed. A Content-Security-Policy blocks all outside scripts |
| Form consent, minimal data | Name, email, message and an optional project type; consent box required; nothing stored. The form opens the visitor's own email app |
| Keyboard-friendly form | Visible labels, inline errors and a focusable error summary |
| Business details | Name, email, phone, WhatsApp and Instagram in the footer and policies |

## Owner to-do before going live

- [ ] **Add a postal address and your legal/trading name**: the EU E-Commerce rules (S.I. 68/2003) require a geographic address. Search for `TODO (owner)` in `privacy.html`, then update the footer on every page.
- [ ] If you trade under "Velqora" rather than your own name, register the business name with the CRO and show your registered details.
- [ ] Add a VAT number to the footer if you become VAT-registered.
- [ ] Confirm the Instagram link (`https://www.instagram.com/__velqora/`).
- [ ] Have a solicitor review the policy pages. They're a solid starting point, not legal advice.
- [ ] If you ever add analytics, embeds or cookies, add a consent banner first and update `cookies.html`.
