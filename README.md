# KingdomShift Homeschool Hub
## Complete Buyer Handoff Guide

**Live URL:** https://kingdomshift-homeschool-hub.netlify.app  
**Niche:** Faith-based homeschool education tools and resources  
**Built with:** React + Vite | Deployed on Netlify | Source on GitHub

---

## What You Just Bought

KingdomShift Homeschool Hub is a fully built, faith-rooted homeschool platform targeting the 3.3M+ homeschool families in the United States. It includes AI-powered tools, verified legal guides for all 50 states, curriculum comparisons, printable templates, and 6 original blog articles — all ready to generate affiliate revenue from day one.

---

## Revenue Streams (Active from Day One)

### 1. Affiliate Links (No approval needed — just sign up)
Every curriculum and resource link on the site is an affiliate opportunity. Sign up for these programs and replace the links with your affiliate URLs:

| Program | Sign Up URL | Commission |
|---|---|---|
| Abeka | abeka.com/affiliates | ~5-8% |
| Sonlight | sonlight.com | ~8% |
| Classical Conversations | classicalconversations.com | Contact them |
| Teaching Textbooks | teachingtextbooks.com | ~20% |
| The Good and the Beautiful | goodandbeautiful.com/affiliates | ~10% |
| Time4Learning | time4learning.com/affiliates | ~$15/sale |
| Memoria Press | memoriapress.com | ~8% |
| Rainbow Resource | rainbowresource.com | ~5% |
| HSLDA | hslda.org | Contact them |
| Khan Academy | N/A — free resource, use for trust |

**Where links live in the code:**
- `src/data/siteData.js` → `curriculumOptions` array → `url` field on each curriculum
- `src/pages/Resources.jsx` → resources section

### 2. Google AdSense (Apply after getting traffic)
AdSense placeholder code is already in the site. Once approved:
1. Go to `src/components/ui/AdSensePlaceholder.jsx`
2. Replace `YOUR-ADSENSE-CLIENT-ID` with your actual AdSense publisher ID
3. Replace `YOUR-AD-SLOT-ID` with your ad slot IDs
4. Push to GitHub — Netlify auto-deploys

**Best ad placements already in the layout:**
- Below the hero section on Home page
- Between blog article sections
- Sidebar on Tools page

### 3. Email List (Connect Mailchimp — free up to 500 subscribers)
The newsletter form is built and ready. To connect it:

**Option A — Mailchimp (Recommended, free):**
1. Create a free account at mailchimp.com
2. Create a new Audience
3. Go to Audience → Signup Forms → Embedded Forms
4. Copy your form action URL (looks like: `https://xxx.us1.list-manage.com/subscribe/post?u=xxx&id=xxx`)
5. Open `src/components/sections/Newsletter.jsx`
6. Replace `YOUR_MAILCHIMP_ACTION_URL` with your form action URL
7. Push to GitHub

**Option B — ConvertKit/Kit (Free up to 1,000 subscribers):**
1. Create account at kit.com
2. Create a Form
3. Copy the form ID
4. Follow same steps in Newsletter.jsx

### 4. Sponsored Content / Brand Partnerships
Once you have traffic, curriculum companies will pay for featured placement. Start with The Good and the Beautiful and Memoria Press — both actively sponsor homeschool content creators.

### 5. AI Lesson Planner (Needs Anthropic API Key)
The AI Lesson Planner is built and functional. To activate on the live site:
1. Get an API key at console.anthropic.com (pay-as-you-go, ~$0.01 per conversation)
2. In Netlify: Site Settings → Environment Variables → Add:
   - Key: `VITE_ANTHROPIC_API_KEY`
   - Value: your API key
3. Open `src/pages/AICoach.jsx` and add to the fetch headers:
```javascript
"x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
"anthropic-version": "2023-06-01",
```
4. Push to GitHub — Netlify rebuilds automatically

---

## How to Make Changes

### Edit Content (No coding required for most things)
All site content lives in two files:

**`src/data/siteData.js`** — Edit this to change:
- All 50 state requirements
- Curriculum comparison data
- Testimonials
- FAQs
- Resource links

**`src/data/blogPosts.js`** — Edit this to:
- Update existing blog posts
- Add new blog posts (copy the format of existing ones)

### Add a New Blog Post
1. Open `src/data/blogPosts.js`
2. Copy an existing post object
3. Change: `id`, `slug`, `title`, `excerpt`, `category`, `date`, `content`
4. Save and push to GitHub

### Change Colors / Branding
All colors are in one file: `src/styles/variables.css`
- Primary green: `--accent-primary`
- Amber/gold: `--accent-amber`
- Deep blue: `--accent-secondary`

---

## How Deployment Works

**Your setup:**
- Code lives on GitHub: `kingdomshiftlive/kingdomshiftlive-kingdomshift-homeschool-hub`
- Netlify watches GitHub and auto-deploys every time you push

**To make any change:**
1. Edit the file on your computer
2. Open Git Bash in the project folder
3. Run:
```bash
git add .
git commit -m "describe your change"
git push origin main
```
4. Netlify deploys automatically in ~60 seconds

---

## Transferring to a Buyer

When the site sells on Flippa, here is the exact transfer process:

### Step 1 — GitHub Repository Transfer
1. Go to github.com → Your repo → Settings → scroll to bottom
2. Click "Transfer" under Danger Zone
3. Enter buyer's GitHub username
4. Confirm transfer
5. Buyer now owns the code

### Step 2 — Netlify Transfer
1. Go to Netlify → Site Settings → General → scroll to bottom
2. Click "Transfer site to another team"
3. Enter buyer's Netlify account email
4. Buyer accepts transfer in their Netlify account
5. Site stays live throughout — zero downtime

### Step 3 — Domain (if custom domain purchased)
If you added a custom domain, transfer it through your domain registrar (GoDaddy, Namecheap, etc.)

### Step 4 — Affiliate Accounts
Affiliate accounts are NOT transferable — buyer must sign up for their own accounts and update the links in the code.

### Step 5 — Email List
If you built an email list, export as CSV from Mailchimp/ConvertKit and send to buyer.

---

## Site Structure

```
kingdomshift-homeschool-hub/
├── src/
│   ├── pages/          ← All page components
│   │   ├── Home.jsx
│   │   ├── Tools.jsx   ← State finder, curriculum, quiz, portfolio, templates, alerts, report card
│   │   ├── AICoach.jsx ← AI Lesson Planner
│   │   ├── Blog.jsx
│   │   ├── Resources.jsx
│   │   ├── FAQ.jsx
│   │   ├── Contact.jsx
│   │   └── Legal.jsx   ← Privacy, Terms, Disclaimer, Affiliate Disclosure
│   ├── data/
│   │   ├── siteData.js ← ALL editable content lives here
│   │   └── blogPosts.js← ALL blog posts live here
│   ├── components/
│   │   ├── layout/     ← Navbar, Footer
│   │   ├── sections/   ← Hero, Features, Newsletter, Testimonials
│   │   └── ui/         ← AdSense placeholder, BackToTop, CookieBanner
│   └── styles/
│       └── variables.css ← Change colors/fonts here
├── public/
│   ├── sitemap.xml
│   └── robots.txt
└── index.html          ← SEO meta tags live here
```

---

## Growth Roadmap for the Buyer

**Month 1-2:**
- Connect affiliate links (15 min per program)
- Connect newsletter to Mailchimp (30 min)
- Add Anthropic API key for AI Planner (15 min)
- Apply for Google AdSense
- Share site in 3-5 homeschool Facebook groups

**Month 3-6:**
- Write 2 new blog posts per month targeting search keywords
- Build email list with weekly tips
- Apply to Mediavine (1,000 sessions/mo) for better ad revenue
- Reach out to curriculum companies for sponsored content

**Month 6-12:**
- Add a printable resource shop (Teachers Pay Teachers model)
- Launch a "Homeschool Starter Kit" digital download ($27-$47)
- Consider a paid membership for premium tools

---

## Legal Notes

- All 50 state data sourced from HSLDA.org and primary state education department sources as of 2025-2026
- Always recommend users verify current laws with HSLDA — laws change
- Affiliate Disclosure page is live and FTC-compliant
- Privacy Policy covers data collection via newsletter and contact form

---

## Support

This site was built as a turnkey digital asset. The code is clean, documented, and built on standard React/Vite — any developer can maintain and extend it.

For questions about the codebase during the Flippa transfer window, contact through Flippa messaging.

---

*Built by KingdomShift Media Corp — kingdomshiftmedia.com*  
*Proverbs 22:6 — "Train up a child in the way he should go."*
