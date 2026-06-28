# Faith Wealth Blueprint — Premium Digital Business

**A complete, production-ready biblical finance platform ready for launch or resale.**

> "Seek first the kingdom of God and His righteousness, and all these things will be added to you." — Matthew 6:33

---

## 🌟 What You're Getting

This is not a template. This is a **complete digital business** — a premium content and tools platform targeting the biblical stewardship / Christian personal finance niche.

**Live demo:** https://faith-wealth-blueprint.pages.dev/

---

## 📋 Feature List

### Pages (14 total)
- **Home** — Hero, features, tools preview, featured blog, testimonials, newsletter
- **About** — Mission, values, team bios, timeline, stats
- **Blog** — Search, category filter, responsive grid, 6 full articles
- **Blog Post** — Full article renderer, author bio, related posts, share button
- **Tools** — 6 working financial calculators with real math
- **AI Coach** — Working Claude API integration (Kingdom Coach persona)
- **Resources** — Free downloads section + affiliate resource catalog
- **FAQ** — Searchable accordion with 10 questions
- **Contact** — Form with full validation + toast notifications
- **Privacy Policy** — Complete, FTC-compliant
- **Terms of Service** — Complete
- **Financial Disclaimer** — Complete
- **Affiliate Disclosure** — FTC-compliant
- **404 Page** — Custom with scripture quote

### Working Tools (6 Calculators)
1. **Budget Calculator** — 10-20-70 framework with visual bar chart
2. **Debt Payoff Calculator** — Snowball vs. avalanche comparison
3. **Savings Goal Calculator** — Compound interest with target date
4. **Emergency Fund Calculator** — Multiple coverage periods
5. **Net Worth Calculator** — Full assets/liabilities breakdown
6. **Cash Flow Planner** — Complete income/expense mapping

### AI Features
- **AI Stewardship Coach** — Live Claude API integration (claude-sonnet-4-6)
- Kingdom Coach persona with biblical guardrails
- 6 starter prompts covering budget, debt, investing, tithing, savings, scripture
- Full chat UI with typing indicator and message history
- Ready for API key integration

### Content
- **6 full blog posts** (1,500–2,500 words each) — real, substantive content
- **6 testimonials** with star ratings
- **4 free downloadable resources** (PDF worksheets)
- **6 affiliate resources** with ratings and curated descriptions
- **10 FAQ entries**
- **6 AI prompt templates**

### SEO & Performance
- Dynamic meta tags (title, description, canonical) per page
- Open Graph + Twitter Card on every page
- JSON-LD structured data (Organization + WebSite)
- robots.txt
- sitemap.xml (all 14 routes)
- Web App Manifest (PWA-ready)
- Google Fonts (Playfair Display + Inter)
- Lazy loading for all non-home pages
- Theme persistence (no FOUC)

### Design System
- **Dark/Light mode** with localStorage persistence
- CSS custom properties (variables) for full theme control
- Brand colors: Navy `#1B2E5A`, Gold `#C9A84C`, Sage `#5d9170`
- Fonts: Playfair Display (display) + Inter (body)
- Responsive breakpoints: 1024px, 768px, 640px
- Scroll reveal animations
- Loading skeleton states
- Accessible (skip link, ARIA labels, semantic HTML)

### UX Components
- Sticky responsive Navbar with mobile hamburger
- Footer with newsletter form + 4-column link grid
- Back to Top button
- Cookie Consent Banner
- Toast notification system (react-hot-toast)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Routing | React Router v7 |
| Styling | CSS Modules + CSS Variables |
| Animations | Framer Motion |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| AI API | Anthropic Claude (claude-sonnet-4-6) |
| Hosting | Cloudflare Pages (included) |
| Version Control | GitHub |

---

## 🚀 Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/faith-wealth-blueprint.git
cd faith-wealth-blueprint

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:5173
```

---

## ⚙️ Configuration

### AI Coach API Key
The AI Stewardship Coach requires an Anthropic API key.

1. Get your key at https://console.anthropic.com
2. In `src/pages/AICoach.jsx`, the API is called via the Anthropic proxy (already configured for claude.ai artifacts). For standalone deployment, add your key:

```javascript
headers: {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
},
```

3. Create `.env.local`:
```
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Brand Customization
All colors, fonts, and design tokens are in one file:
```
src/styles/variables.css
```

Change the brand name and domain globally by searching for:
- `Faith Wealth Blueprint` → your brand name
- `faithwealthblueprint.com` → your domain
- `hello@faithwealthblueprint.com` → your email

### Content
- **Blog posts:** `src/data/blogPosts.js`
- **Testimonials, FAQs, Resources:** `src/data/siteData.js`
- **Team, mission:** `src/pages/About.jsx`

---

## 🌐 Deployment

### Cloudflare Pages (Recommended — Free)

```bash
# Build
npm run build

# The dist/ folder is your deployable output
```

1. Push to GitHub
2. Go to Cloudflare Pages → New Project → Connect GitHub
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

### Vercel (Alternative)
```bash
npm install -g vercel
vercel --prod
```

### Custom Domain
1. In Cloudflare Pages → Custom Domains → Add domain
2. Update all references to `faithwealthblueprint.com` in:
   - `index.html` (canonical, OG, structured data)
   - `public/sitemap.xml`
   - `public/robots.txt`

---

## 🔄 Transfer Guide (Flippa Buyers)

**What's included:**
- Complete source code (GitHub repository access)
- All design assets
- Deployment configuration
- This documentation

**Transfer steps:**
1. Buyer creates GitHub account
2. Seller transfers repository ownership (GitHub → Settings → Transfer)
3. Buyer creates Cloudflare account (free)
4. Buyer connects GitHub repo to Cloudflare Pages
5. Buyer points custom domain to Cloudflare Pages
6. Done — site is live under buyer's control

**Email list:** Not included (no list exists yet — this is a greenfield asset). First buyer starts from zero with the newsletter form already integrated.

---

## 💰 Monetization Roadmap

### Immediate (Month 1–3)
- [ ] **Affiliate commissions** — YNAB, Amazon books, Fidelity (already linked)
- [ ] **Email list** — Newsletter form is live; integrate ConvertKit or Mailchimp
- [ ] **Lead magnets** — 4 free downloads already positioned; gate with email

### Short-Term (Month 3–6)
- [ ] **Digital products** — Sell the worksheets as a premium bundle ($27–$47)
- [ ] **Course/cohort** — Kingdom Budget Bootcamp (6-week online course, $197)
- [ ] **Sponsored content** — Faith-based financial brands

### Medium-Term (Month 6–12)
- [ ] **Membership community** — Monthly subscription ($19–$49/mo)
- [ ] **1-on-1 coaching** — Kingdom wealth coaching sessions ($150–$300/hr)
- [ ] **Podcast sponsorships** — Launch a podcast, monetize with sponsors

### Long-Term
- [ ] **B2B licensing** — License the platform to churches and ministries
- [ ] **White-label** — Resell the platform concept to other faith niches

---

## 📈 Growth Roadmap

### SEO
- Submit sitemap to Google Search Console
- Target keywords: "biblical budgeting," "Christian debt free," "Kingdom finances"
- Publish 2–4 blog posts/month
- Build backlinks from Christian finance blogs and podcasts

### Content
- Expand blog to 50+ articles
- Launch YouTube channel (reuse AI Coach content)
- Start weekly email newsletter

### Features
- Add user accounts (Supabase or Firebase)
- Add saved calculator results
- Add prayer/accountability partner feature
- Launch mobile app (React Native)

---

## 📁 Project Structure

```
faith-wealth-blueprint/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── calculators/
│   │   │   ├── Calculators.jsx    # All 6 calculators
│   │   │   └── Calculators.css
│   │   ├── layout/
│   │   │   ├── Navbar.jsx         # Sticky responsive nav
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.jsx         # 4-column footer
│   │   │   └── Footer.css
│   │   ├── sections/
│   │   │   ├── Hero.jsx           # Animated landing hero
│   │   │   ├── Features.jsx       # 6-card feature grid
│   │   │   ├── Testimonials.jsx   # 6 testimonials
│   │   │   └── Newsletter.jsx     # Email capture
│   │   └── ui/
│   │       ├── SEOHead.jsx        # Dynamic meta tags
│   │       ├── BackToTop.jsx      # Scroll button
│   │       └── CookieBanner.jsx   # Cookie consent
│   ├── data/
│   │   ├── blogPosts.js           # 6 full articles
│   │   └── siteData.js            # FAQs, testimonials, resources
│   ├── hooks/
│   │   ├── useTheme.jsx           # Dark/light mode context
│   │   └── useScrollReveal.js     # Intersection observer
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   ├── About.jsx              # About page
│   │   ├── Blog.jsx               # Blog listing
│   │   ├── BlogPost.jsx           # Single post
│   │   ├── Tools.jsx              # Calculator hub
│   │   ├── AICoach.jsx            # AI chat interface
│   │   ├── Resources.jsx          # Downloads + affiliates
│   │   ├── FAQ.jsx                # Accordion FAQ
│   │   ├── Contact.jsx            # Contact form
│   │   └── Legal.jsx              # Privacy, Terms, Disclaimer, 404
│   ├── styles/
│   │   ├── variables.css          # Design tokens
│   │   └── global.css             # Global styles
│   ├── App.jsx                    # Router + layout
│   └── main.jsx                   # Entry point
├── index.html                     # HTML shell + SEO
└── package.json
```

---

## 📞 Support

This asset is sold as-is. For setup questions, the codebase is clean, well-commented, and follows standard React/Vite patterns. Any React developer can take it from here.

---

*Built with React 19 + Vite. Deployed on Cloudflare Pages. Ready to generate revenue from day one.*
