#!/usr/bin/env node
/**
 * AI Creative Market Landscape — Competitor Refresh Script
 *
 * Searches the web for recent pricing, product, and promotion changes
 * across all 14 tracked competitors and proposes updates.
 *
 * Usage:
 *   node scripts/refresh.mjs              # dry run — shows proposed changes only
 *   node scripts/refresh.mjs --verbose    # show full search output per competitor
 *
 * Requires:
 *   ANTHROPIC_API_KEY environment variable set
 *
 * After reviewing the output, apply changes manually to:
 *   src/data/competitorData.ts
 */

import Anthropic from '@anthropic-ai/sdk';

const VERBOSE = process.argv.includes('--verbose');

// ── Snapshot of current known facts ──────────────────────────────────────────
// Update these whenever you apply changes so future diffs stay accurate.
const COMPETITORS = [
  {
    id: 'canva',
    name: 'Canva',
    pricing: 'Free: 50 AI credits/mo. Pro: $18/mo or $144/yr (500 AI credits/mo). Students: free via Canva for Education.',
    notable: 'Canva AI 2.0 + proprietary Canva Design Model launched May 2026. Canva Create 2026 event.',
    studentPromo: 'Pro free for students ($15/mo value)',
    messaging: 'Hero positioning: "What will you design today?" / "For everyone, everywhere." Canva Create 2026 framing: AI as creative collaborator, not replacement.',
    campaigns: 'Canva Create 2026 conference (May 2026) served as major brand moment. "Canva AI 2.0" launch coverage across design/marketing press.',
  },
  {
    id: 'capcut',
    name: 'CapCut',
    pricing: 'Free: 150 AI credits/wk. Pro: $19.99/mo or $179.99/yr (1,200 AI credits/mo).',
    notable: 'CapCut + Google Gemini integration announced May 2026',
    studentPromo: null,
    messaging: 'Positioning: fast, social-native video editor. TikTok ecosystem tie-in central to brand identity.',
    campaigns: null,
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT (OpenAI)',
    pricing: 'Free tier. Plus: $20/mo. Pro: $200/mo.',
    notable: 'GPT Image 2 launched Apr 2026 — new benchmark for AI imagery',
    studentPromo: null,
    messaging: '"Get answers. Find inspiration. Be more productive." Broad general-purpose positioning.',
    campaigns: 'OpenAI has run several high-profile brand campaigns in late 2025/early 2026 around GPT-4o capabilities.',
  },
  {
    id: 'gemini',
    name: 'Gemini (Google)',
    pricing: 'AI Pro: $19.99/mo. AI Ultra: $99.99/mo. Students: 50% off AI Pro.',
    notable: 'Google I/O May 2026: AI Ultra tiers launched, Gemini Spark (24/7 personal agent), Gemini Omni announced.',
    studentPromo: '50% off AI Pro for students',
    messaging: '"Get help with anything." Google I/O 2026 messaging: Gemini as personal AI agent across all Google products.',
    campaigns: 'Google I/O 2026 (May 20) was primary brand activation. Heavy paid media around Gemini Spark launch.',
  },
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    pricing: 'Free. Pro: $20/mo. Max 5x: $100/mo. Max 20x: $200/mo. Team: $25/mo per user.',
    notable: 'Subscription split into two usage buckets (direct vs. third-party/agent) effective June 15, 2026.',
    studentPromo: null,
    messaging: 'Positioning: "Claude is trained by Anthropic, and our mission is the responsible development of AI for the long-term benefit of humanity." Safety-forward, thoughtful brand voice.',
    campaigns: null,
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    pricing: 'No free tier. Basic: $10/mo (~200 images/mo). Standard: $30/mo. Pro: $60/mo.',
    notable: 'V7 model released Mar 2026',
    studentPromo: null,
    messaging: '"Imagine." Minimalist, art-community-focused brand. Discord-first culture.',
    campaigns: null,
  },
  {
    id: 'figma',
    name: 'Figma',
    pricing: 'Free starter (500 AI credits/mo). Professional: $12/mo per editor. Students: free via Figma for Education.',
    notable: 'Figma AI Agent (native canvas agent) launched May 2026 in rolling beta.',
    studentPromo: 'Free via Figma for Education',
    messaging: '"Nothing great is made alone." Collaboration-first positioning. Config 2025/2026 as annual brand moment.',
    campaigns: 'Figma AI Agent launch (May 2026) generated significant design-community press coverage.',
  },
  {
    id: 'runway',
    name: 'Runway',
    pricing: 'Free: 125 one-time credits. Standard: $12/mo. Pro: $28/mo. Unlimited: $76/mo.',
    notable: 'Runway Agent launched May 13, 2026 — text prompt to full multi-scene video end-to-end.',
    studentPromo: '25% discount + 100K credits via Student Ambassador Program',
    messaging: '"Advancing creativity with artificial intelligence." Targeting filmmakers, brand teams, agencies.',
    campaigns: 'Runway Agent launch (May 13) press blitz. AI Film Festival activations.',
  },
  {
    id: 'picsart',
    name: 'Picsart',
    pricing: 'Free: 5 AI credits/wk (~20/mo). Pro: $10.50/mo (500 AI credits/mo, formerly Gold).',
    notable: 'Gold tier renamed to Pro; moved from unlimited to 500 AI credits/mo',
    studentPromo: null,
    messaging: 'Broad consumer creative/editing app. "Create anything."',
    campaigns: null,
  },
  {
    id: 'final-cut-pro',
    name: 'Final Cut Pro',
    pricing: '$4.99/mo or $49/yr. Students: $2.99/mo via Apple Creator Studio (bundles FCP + Logic Pro + more).',
    notable: 'Moved from $299 one-time purchase to $4.99/mo subscription Jan 2026',
    studentPromo: '$2.99/mo as part of Apple Creator Studio',
    messaging: 'Apple ecosystem positioning. Professional video editing. No standalone brand campaigns — rides Apple marketing.',
    campaigns: null,
  },
  {
    id: 'affinity',
    name: 'Affinity',
    pricing: '£89.99 universal license (V2). Now free with a free Canva account.',
    notable: 'Canva acquisition completed — future pricing model under review',
    studentPromo: null,
    messaging: 'Professional Adobe alternative. "Professional creative software." Post-Canva acquisition, messaging in flux.',
    campaigns: null,
  },
  {
    id: 'google-photos',
    name: 'Google Photos',
    pricing: 'Free. Google One storage from $2.99/mo (100GB).',
    notable: null,
    studentPromo: null,
    messaging: 'Utility-first. "Free up space. Back up your photos." Part of Google One umbrella.',
    campaigns: null,
  },
  {
    id: 'instagram-edits',
    name: 'Instagram Edits',
    pricing: 'Free standalone app.',
    notable: 'Launched Jan 2026 as free standalone video editor',
    studentPromo: null,
    messaging: 'Meta/Instagram brand halo. "Built for creators." Direct CapCut competitive response.',
    campaigns: null,
  },
  {
    id: 'imovie',
    name: 'iMovie',
    pricing: 'Free (pre-installed on Mac/iOS).',
    notable: null,
    studentPromo: null,
    messaging: 'Apple ecosystem tool. No standalone marketing — bundled with Mac/iOS. "Turn your videos into movie magic."',
    campaigns: null,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatSnapshot(c) {
  return [
    `  Pricing: ${c.pricing}`,
    `  Notable product/feature change: ${c.notable ?? 'None'}`,
    `  Student promo: ${c.studentPromo ?? 'None'}`,
    `  Current messaging/positioning: ${c.messaging ?? 'None on file'}`,
    `  Known recent campaigns: ${c.campaigns ?? 'None on file'}`,
  ].join('\n');
}

function hr(char = '─', len = 60) {
  return char.repeat(len);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('\n❌  ANTHROPIC_API_KEY is not set.');
    console.error('    Export it first:  export ANTHROPIC_API_KEY=sk-ant-...\n');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  console.log('\n' + hr('═'));
  console.log('  AI Creative Market Landscape — Competitor Refresh');
  console.log(`  ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`);
  console.log(hr('═'));
  console.log(`\n  Checking ${COMPETITORS.length} competitors across product, pricing, campaigns & messaging...\n`);

  const changes = [];
  const errors = [];

  for (const competitor of COMPETITORS) {
    process.stdout.write(`  ${competitor.name.padEnd(24)}`);

    try {
      const prompt = `You are a competitive intelligence analyst tracking AI creative tools.

Search the web for changes to ${competitor.name} that were announced or went into effect in THE LAST 30 DAYS ONLY. Ignore anything older than 30 days.

CURRENT KNOWN DATA (last updated):
${formatSnapshot(competitor)}

Look specifically for changes that happened in the last 30 days across ALL four dimensions:

PRODUCT / PRICING / FEATURES:
- Price increases or cuts
- New subscription tiers or removal of existing ones
- Changes to free tier limits (AI credits, features)
- New student or education discounts
- New AI features, model upgrades, or major product launches
- Product discontinuations or pivots

CAMPAIGNS:
- New advertising campaigns (TV, digital, OOH, social, influencer)
- New campaign themes or creative concepts
- Major brand activations, sponsorships, or events
- Notable campaign spending shifts or new markets targeted

MESSAGING / POSITIONING:
- New taglines, slogans, or hero copy
- Shifts in how the brand describes its core value proposition
- New audience targeting language (e.g. shifting from "creators" to "businesses")
- New competitive positioning language (e.g. explicitly targeting Adobe, or emphasising AI safety)
- Changes to homepage, landing page, or ad copy that signal a strategy shift

If a change happened more than 30 days ago, do NOT report it — it is already known.

Respond using EXACTLY this format — no extra text:

CHANGES_FOUND: yes | no
SUMMARY: <one concise paragraph covering all dimensions, or "No changes detected in the last 30 days.">
PROPOSED_UPDATES:
- field: <pricing | notable | studentPromo | messaging | campaign | other>
  old: <current value, or "none on file">
  new: <proposed new value>
  source: <URL>
(repeat for each change, or write "none" if no changes)`;

      const response = await client.messages.create({
        model: 'claude-opus-4-5',
        max_tokens: 1024,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: prompt }],
      });

      const text = response.content
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('\n')
        .trim();

      const hasChanges = /CHANGES_FOUND:\s*yes/i.test(text);

      if (hasChanges) {
        console.log('🔔  CHANGES DETECTED');
        changes.push({ competitor, text });
      } else {
        console.log('✅  No changes');
        if (VERBOSE) {
          console.log(`\n     ${text.split('\n').join('\n     ')}\n`);
        }
      }
    } catch (err) {
      console.log(`⚠️  Error`);
      errors.push({ competitor, error: err.message });
    }
  }

  // ── Results ────────────────────────────────────────────────────────────────
  console.log('\n' + hr());

  if (errors.length > 0) {
    console.log('\n⚠️  Errors during check:');
    for (const { competitor, error } of errors) {
      console.log(`   ${competitor.name}: ${error}`);
    }
  }

  if (changes.length === 0) {
    console.log('\n✅  All clear — no changes detected across any competitors.');
    console.log('    Dashboard data is current as of the last 30 days.\n');
    return;
  }

  console.log(`\n🔔  ${changes.length} competitor(s) with detected changes:\n`);

  for (const { competitor, text } of changes) {
    console.log(`\n┌─ ${competitor.name.toUpperCase()} ${hr('─', Math.max(0, 52 - competitor.name.length))}`);
    for (const line of text.split('\n')) {
      console.log(`│  ${line}`);
    }
    console.log(`└${hr('─', 53)}`);
  }

  console.log('\n' + hr());
  console.log('\n📋  To apply these changes:');
  console.log('    1. Review each proposed update above');
  console.log('    2. For pricing/product changes:');
  console.log('         Edit  src/data/competitorData.ts  with the new values');
  console.log('    3. For campaign/messaging changes:');
  console.log('         Add to  src/pages/May2026Updates.tsx  (Promotion or Messaging card)');
  console.log('         Update  src/pages/AiMessaging.tsx  if positioning language shifted');
  console.log('    4. Update the COMPETITORS snapshot in  scripts/refresh.mjs');
  console.log('    5. Run   npm run build   to rebuild\n');
  console.log('    Tip: also check if any changes should bubble up to');
  console.log('    the Overview cards in  src/pages/Overview.tsx\n');
}

main().catch(err => {
  console.error('\n❌  Fatal error:', err.message);
  process.exit(1);
});
