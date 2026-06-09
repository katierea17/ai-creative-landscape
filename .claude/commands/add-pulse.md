# /add-pulse — Pull the latest Gen AI Pulse and integrate into Monthly Updates

## Step 1 — Fetch the latest pulse emails from Outlook

Run both searches, then read the full body of any results:

**Search 1 — GenAI Pulse:**
Use `mcp__fb645b6a-a04d-4f77-9681-af25bd1b3a74__outlook_email_search` with:
- `query`: `"GenAI Pulse this week"`
- `limit`: 5

**Search 2 — Industry Update:**
Use `mcp__fb645b6a-a04d-4f77-9681-af25bd1b3a74__outlook_email_search` with:
- `query`: `"Industry Update for Lightweight Creative Tools"`
- `limit`: 5

Note: `order` is not compatible with free-text `query` — omit it. Check `receivedDateTime` on each result to determine recency.

For each result, use `mcp__fb645b6a-a04d-4f77-9681-af25bd1b3a74__read_resource` with the returned URI to get the full email body.

Only process emails with `receivedDateTime` AFTER the current dashboard end date (find the `Apr 30 –` label in `src/pages/May2026Updates.tsx`).

---

## Step 2 — Prune stories older than 30 days

Scan every entry in `BRIEF_ITEMS` and **delete any whose `sortDate` is more than 30 days before today**. No exceptions — this applies to carousel items and Other Updates alike. Platform counts dropping below 3 after pruning is fine.

---

## Step 3 — Triage new stories

**Carousel** (`highlight: true`, max 5 items):
- Only promote if the story is genuinely new AND more impactful than the weakest current carousel item
- Reject if press/video coverage from 3+ months ago covers the same headline
- Required fields: `highlight: true`, `rank: N`, `rankRationale`, `adobeImplication`, `implicationSource`

**Other Updates** (max 3 items per platform — hard limit):
- If adding would push a platform over 3, drop the least recent/relevant existing item
- Skip if the implication is already covered by a carousel item
- Skip pure PR/advocacy with no product or distribution move

**Skip entirely:**
- Not relevant to the student creative tools competitive landscape
- Duplicative of what's already in the carousel or Other Updates

---

## Step 4 — Edit `src/pages/May2026Updates.tsx`

1. Remove all pruned items (Step 2)
2. Add new items at the top of `BRIEF_ITEMS` under a date comment, e.g. `// ── Jun 6–12 ──`
3. Remove displaced items for any platform over 3 Other Updates items
4. Strip `highlight` fields from any carousel item being retired to Other Updates
5. Update the date range in the `<span>` label inside the Industry Briefings header. The start date is the `sortDate` of the oldest remaining BRIEF_ITEMS entry after pruning; the end date is the most recent.
6. Add new platforms to `PLATFORM_DOMAIN` with their main domain (for favicons)

---

## Step 5 — Report back

Summarise: what was pruned, what was added (carousel or Other Updates), what was swapped out, what was skipped and why.

---

## Data shape

```ts
{
  platform: 'Platform Name',   // must match a key in PLATFORM_DOMAIN
  color: '#hexcolor',          // use existing color for known platforms (see below)
  date: 'Jun 5',               // display label
  sortDate: '2026-06-05',      // ISO date for ordering
  headline: '...',
  summary: '...',              // 1–2 sentences, factual
  sourceUrl: 'https://...',
  // Carousel-only fields:
  highlight: true,
  rank: N,                     // 1 = most important
  rankRationale: '...',        // one sentence on why this ranks here
  adobeImplication: '...',     // so-what for Creative Cloud / students
  implicationSource: '...',    // e.g. 'canva.com · Jun 3, 2026'
  images: ['url1', 'url2'],    // optional; or videoUrl / videoEmbed
}
```

---

## Platform colors (existing)
| Platform | Color |
|---|---|
| Canva | `#22C55E` |
| Claude | `#A78BFA` |
| Gemini | `#A78BFA` |
| ChatGPT | `#A78BFA` |
| Figma | `#F59E0B` |
| Runway | `#F59E0B` |
| Picsart | `#22C55E` |
| CapCut | `#22C55E` |
| Meta Edits | `#60A5FA` |
| Students | `#111111` |
| IBM | `#2563EB` |

New platforms: pick a color that doesn't clash with the above and add the domain to `PLATFORM_DOMAIN`.
