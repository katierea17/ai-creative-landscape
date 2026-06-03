import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useFilter } from '../context/FilterContext';
import { competitors } from '../data/competitorData';
import type { Category } from '../data/competitorData';

type FourP = 'Product' | 'Pricing' | 'Partnerships' | 'Promotion';

interface Update {
  platform: string;
  fourP: FourP;
  headline: string;
  detail: string;
  explanation?: { label: string; content: string }[];
  date: string;
  effectiveDate?: string;
  sourceUrl: string;
  sourceName: string;
}

const FOURP_COLORS: Record<FourP, string> = {
  Product:      '#06B6D4',
  Pricing:      '#EB1000',
  Partnerships: '#EC4899',
  Promotion:    '#14B8A6',
};

// Map each platform name to its competitor ID in competitorData
const PLATFORM_ID: Record<string, string> = {
  // main UPDATES platforms
  'Runway':             'runway',
  'Figma':              'figma',
  'Claude (Anthropic)': 'claude',
  'Gemini (Google)':    'gemini',
  'CapCut':             'capcut',
  'Canva':              'canva',
  // briefing platforms
  'Claude':             'claude',
  'Gemini':             'gemini',
  'ChatGPT':            'chatgpt',
  'Picsart':            'picsart',
  'Meta Edits':         'instagram-edits', // Ecosystem Utilities
  'Meta':               'instagram-edits', // Ecosystem Utilities
  'YouTube':            'google-photos',   // Ecosystem Utilities
  'Stability AI':       'runway',          // Professional Tools
  'Leonardo.AI':        'runway',          // Professional Tools
};

// Platforms that don't map to a competitor but have an explicit category
const PLATFORM_CATEGORY_OVERRIDE: Partial<Record<string, Category>> = {
  'Students': 'Other',
};

const UPDATES: Update[] = [
  {
    platform: 'Runway',
    fourP: 'Product',
    headline: 'Runway Agent — text to finished video, end-to-end',
    detail: 'Runway Agent takes a single text prompt all the way to a multi-scene, ready-to-publish video in one session. It autonomously handles concept development, story structure, scene generation, voiceover, dialogue, and music assembly. Users can upload reference images to steer the visual direction, then make final tweaks in a timeline editor. Aimed at brand teams, marketers, agencies, and filmmakers.',
    date: 'May 13, 2026',
    sourceUrl: 'https://runwayml.com/news/introducing-runway-agent',
    sourceName: 'runwayml.com',
  },
  {
    platform: 'Figma',
    fourP: 'Product',
    headline: 'Figma AI Agent — native design agent on the canvas',
    detail: 'Figma launched a native AI design agent embedded directly in the collaborative canvas. Directed by natural language, it generates new designs, edits existing files, creates iterations, and automates design tasks — crucially, using your actual design system components, tokens, and variables. Multiple agents can run simultaneously. Currently free (no credit consumption) in rolling beta; post-beta, available to Full seat users on Professional, Organization, and Enterprise plans.',
    date: 'May 20, 2026',
    sourceUrl: 'https://www.figma.com/blog/the-figma-agent-is-here/',
    sourceName: 'figma.com/blog',
  },
  {
    platform: 'Canva',
    fourP: 'Pricing',
    headline: 'Canva Pro raised to $18/mo — up from $12.99/mo',
    detail: 'Canva Pro is now priced at $18/month. This reflects a continued step-up from $12.99/mo (pre-2025) and the prior $15/mo tier. Teams pricing runs $20/user/month ($10/user/month billed annually, 3-seat minimum).',
    date: 'Ongoing — price current as of May 2026',
    sourceUrl: 'https://www.canva.com/pricing/',
    sourceName: 'canva.com/pricing',
  },
  {
    platform: 'Claude (Anthropic)',
    fourP: 'Pricing',
    headline: 'Claude subscriptions split into two usage buckets — effective June 15',
    detail: 'Anthropic is separating Claude subscription usage into two distinct buckets. Bucket 1 (unchanged): using Claude.ai directly on web, app, and mobile. Bucket 2 (new): any usage via third-party tools and agent apps — Zed editor, Claude Code GitHub Actions, the Agent SDK, and similar integrations — now draws from a separate monthly "Agent SDK Credit" that bills at full API list prices when exhausted.',
    explanation: [
      {
        label: 'What this means in plain English',
        content: 'Previously, using Claude through third-party apps was effectively subsidized — you paid your flat subscription and got unlimited access everywhere. After June 15, heavy third-party/agent usage will hit a credit cap and then bill at full API rates. This is a significant cost increase for developers and power users of Claude integrations, but has minimal impact on people who only use Claude.ai directly.',
      },
      {
        label: 'Credit allocations by plan',
        content: 'Pro ($20/mo) → $20 Agent SDK credit\nMax 5x ($100/mo) → $100 credit\nMax 20x ($200/mo) → $200 credit\nTeam Standard → $20/seat\nTeam Premium → $100/seat\n\nCredits are non-rollover. Once exhausted, usage stops unless you opt in to "extra usage" billed at API list rates.',
      },
      {
        label: 'Action required',
        content: 'Watch for a claim email from Anthropic around June 8 — you must actively activate your credit pool before June 15 or third-party usage will be disrupted.',
      },
    ],
    date: 'Announced May 14, 2026',
    effectiveDate: 'June 15, 2026',
    sourceUrl: 'https://the-decoder.com/claude-subscriptions-get-separate-budgets-for-programmatic-use-billed-at-full-api-prices/',
    sourceName: 'The Decoder',
  },
  {
    platform: 'Gemini (Google)',
    fourP: 'Pricing',
    headline: 'Google overhauls AI subscriptions — new AI Ultra tier at $99.99/mo',
    detail: 'At Google I/O 2026, Google restructured its entire AI subscription lineup into three tiers. The former AI Premium ($19.99/mo) was renamed AI Pro. A new AI Ultra entry tier was introduced at $99.99/mo, with a top Ultra tier at $199.99/mo (down from $249.99). New capabilities announced include Gemini Spark (a 24/7 personal AI agent that acts across Google products) and Gemini Omni (multimodal creation model).',
    explanation: [
      {
        label: 'New tier breakdown',
        content: 'AI Plus: $7.99/mo — 200GB storage, 2× usage limits\nAI Pro: $19.99/mo — 5TB storage, 4× limits, YouTube Premium Lite\nAI Ultra (entry): $99.99/mo — 20TB storage, 5× limits, Gemini Spark, full YouTube Premium\nAI Ultra (top): $199.99/mo — 20× limits, Project Genie, all features',
      },
    ],
    date: 'May 20, 2026 (Google I/O)',
    sourceUrl: 'https://blog.google/products-and-platforms/products/google-one/google-ai-subscriptions/',
    sourceName: 'blog.google',
  },
  {
    platform: 'Canva',
    fourP: 'Partnerships',
    headline: 'Canva integrates with Google Gemini via MCP',
    detail: 'Canva launched a Gemini integration using its MCP Server, letting users generate, edit, repurpose, and brand-align designs directly inside Gemini. Accessible via the @Canva prompt, users can browse and search Canva content, turn generated images into editable layouts with Magic Layers, and rewrite, update, or translate copy — all without leaving Gemini. Both Canva and Adobe have MCP integrations — Canva with Gemini, Adobe Firefly with Claude. The distinction is that Gemini\'s 900M users and Google Workspace embedding means Canva reaches students where they already work, while Adobe Firefly\'s MCP integration with Claude skews toward professional and developer audiences.',
    date: 'May 19, 2026',
    sourceUrl: 'https://www.canva.com/newsroom/news/whats-new-may-2026/',
    sourceName: 'canva.com/newsroom',
  },
  {
    platform: 'Picsart',
    fourP: 'Partnerships',
    headline: 'Picsart MCP gives ChatGPT and Claude access to 140+ AI models',
    detail: 'Picsart launched its Model Context Protocol (MCP) server, giving AI assistants like ChatGPT and Claude access to 140+ image, video, and audio AI models through a single integration. Users can generate and edit creative content with plain-English prompts, automate multi-step workflows, and complete creative tasks without manually choosing models or writing code.',
    date: 'May 7, 2026',
    sourceUrl: 'https://picsart.com/features/',
    sourceName: 'picsart.com',
  },
  {
    platform: 'CapCut',
    fourP: 'Partnerships',
    headline: 'CapCut integrating into Gemini app — editing inside the AI interface',
    detail: "CapCut announced a partnership with Google Gemini bringing CapCut's photo and video editing tools directly inside the Gemini app. Users will move from AI-generated content straight into CapCut-powered editing without leaving the Gemini interface, making Gemini a more complete end-to-end creative platform. CapCut joins Adobe and Canva as creative tool partners embedded in Gemini — completing a sweep of the consumer creative market. No separate pricing; integration leverages existing accounts. Launch described as coming 'soon.'",
    date: 'May 21, 2026',
    sourceUrl: 'https://9to5google.com/2026/05/21/capcut-announces-partnership-with-gemini-app/',
    sourceName: '9to5Google',
  },
  {
    platform: 'Canva',
    fourP: 'Partnerships',
    headline: 'Canva adds Meta, TikTok Ads, PayPal, and HubSpot integrations',
    detail: 'Canva shipped a wave of adtech and commerce integrations in May 2026, tightening its position as a closed-loop creative-to-distribution platform. Meta Catalog Data app: import a Meta product catalog, use Bulk Create to generate videos across the full product range, export straight back to Meta — no manual file handling. TikTok Ads app: design with TikTok-optimised templates and publish directly to TikTok Ads Manager, joining existing LinkedIn Ads and Meta Ads integrations. PayPal app: embed payment links and QR codes into designs so viewers can purchase without leaving the creative. New Publish apps push finished designs to Facebook, Pinterest, Google Drive, OneDrive, and Dropbox with a live preview before posting.',
    explanation: [
      {
        label: 'Strategic read',
        content: 'These integrations complete a full creative-to-commerce loop inside Canva: brief → design → publish → sell → measure — all without leaving the platform. TikTok Ads joins LinkedIn Ads and Meta Ads, making Canva the only consumer design tool with native publishing into all three major social ad platforms. The PayPal integration is new territory — Canva is now a point-of-sale surface, not just a creative tool.',
      },
    ],
    date: 'May 2026',
    sourceUrl: 'https://www.canva.com/newsroom/news/whats-new-may-2026/',
    sourceName: 'canva.com/newsroom',
  },
  {
    platform: 'Canva',
    fourP: 'Promotion',
    headline: '"The Thing That Makes Anything A Thing" — new U.S. brand campaign',
    detail: 'Canva launched a new brand campaign centered on the idea that anyone can turn bold ideas into reality using Canva. Spans experiential, OOH, social, influencer, digital, and audio — centers Canva as the creative partner for turning any idea into reality.',
    date: 'May 4, 2026',
    sourceUrl: 'https://www.canva.com/newsroom/news/',
    sourceName: 'canva.com/newsroom',
  },
  {
    platform: 'Canva',
    fourP: 'Promotion',
    headline: 'Canva running context-based ads inside ChatGPT (U.S.)',
    detail: "Canva is running context-targeted ads in ChatGPT in the U.S. — a query about videos surfaced a Canva video editor ad directly in the chat interface. This is in addition to a previously reported carousel ad on Canva's app page. OpenAI's ChatGPT ads pilot is expanding to the UK, Mexico, Brazil, Japan, and South Korea. Canva views ChatGPT as a key acquisition surface on its path to 1B MAU.",
    date: 'May 2026',
    sourceUrl: 'https://openai.com/chatgpt',
    sourceName: 'Spotted in ChatGPT · Adobe Internal Briefing',
  },
];

export function May2026Updates() {
  const { activeCategories } = useFilter();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [subExpanded, setSubExpanded] = useState<Record<number, boolean>>({});

  function toggleUpdate(i: number) {
    setExpanded(prev => ({ ...prev, [i]: !prev[i] }));
  }

  function toggleSub(i: number) {
    setSubExpanded(prev => ({ ...prev, [i]: !prev[i] }));
  }

  // Filter by active categories using the competitor data category mapping
  const filteredUpdates = UPDATES.filter(u => {
    const cId = PLATFORM_ID[u.platform];
    if (!cId) return true;
    const comp = competitors.find(c => c.id === cId);
    return !comp || activeCategories.includes(comp.category);
  });

  const filteredBriefItems = BRIEF_ITEMS.filter(item => {
    // Direct category override (for non-competitor platforms like Students)
    const override = PLATFORM_CATEGORY_OVERRIDE[item.platform];
    if (override) return activeCategories.includes(override);
    // Competitor category lookup
    const cId = PLATFORM_ID[item.platform];
    if (!cId) return true; // fully uncategorised → always show
    const comp = competitors.find(c => c.id === cId);
    return !comp || activeCategories.includes(comp.category);
  });

  const byFourP = (['Product', 'Pricing', 'Partnerships', 'Promotion'] as FourP[]).map(p => ({
    p,
    updates: filteredUpdates.filter(u => u.fourP === p),
  }));

  return (
    <div>
      {/* Amber banner */}
      <div style={{
        background: '#1a1400',
        border: '1px solid #F59E0B',
        borderRadius: 4,
        padding: '12px 16px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <span style={{ fontSize: 16 }}>⚡</span>
        <div>
          <span style={{ color: '#F59E0B', fontWeight: 700, fontSize: 13 }}>New intel — not yet integrated into the main dashboard.</span>
        </div>
      </div>

      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#fff' }}>Monthly Updates</h1>

      {/* ── Industry Briefings ─────────────────────────────────────── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #2a2a2a' }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
            📋 Industry Briefings
          </span>
          <span style={{ fontSize: 12, color: '#555' }}>Apr 30 – May 29, 2026 · Adobe internal competitive intelligence</span>
        </div>

        {/* ── Implications table ── */}
        {(() => {
          const flagged = filteredBriefItems
            .filter(i => i.highlight && i.adobeImplication)
            .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
          if (flagged.length === 0) return null;
          return (
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                Implications for Creative Cloud for Students
              </div>
              <div style={{ border: '1px solid #2a2a2a', borderRadius: 4, overflow: 'hidden' }}>
                {/* Header row */}
                <div style={{ display: 'grid', gridTemplateColumns: '32% 32px 1fr', background: '#161616', borderBottom: '1px solid #2a2a2a', padding: '7px 14px' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Industry Update</span>
                  <span />
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Implication for CC Students</span>
                </div>
                {flagged.map((item, i) => (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: '32% 32px 1fr',
                    borderBottom: i < flagged.length - 1 ? '1px solid #1e1e1e' : 'none',
                    background: i % 2 === 0 ? '#1a1a1a' : '#171717',
                  }}>
                    <div style={{ padding: '10px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <span style={{
                          fontSize: 10, fontWeight: 700, color: item.color,
                          background: `${item.color}18`, border: `1px solid ${item.color}40`,
                          padding: '1px 5px', borderRadius: 3, flexShrink: 0,
                        }}>{item.platform}</span>
                        <span style={{ fontSize: 10, color: '#444' }}>{item.date}</span>
                      </div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#C0C0C0', margin: '0 0 5px', lineHeight: 1.5 }}>{item.headline}</p>
                      {item.rankRationale && (
                        <p style={{ fontSize: 10, color: '#555', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>{item.rankRationale}</p>
                      )}
                    </div>
                    {/* Subtle arrow */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2e2e2e', fontSize: 20, userSelect: 'none' }}>
                      →
                    </div>
                    <div style={{ padding: '10px 14px', paddingTop: 22 }}>
                      <p style={{ fontSize: 12, color: '#A0A0A0', margin: '0 0 8px', lineHeight: 1.6 }}>{item.adobeImplication}</p>
                      {item.implicationSource && (
                        <span style={{ fontSize: 10, color: '#444', fontStyle: 'italic' }}>{item.implicationSource}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ── Remaining briefings (non-flagged) ── */}
        <div style={{ fontSize: 10, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Other Updates
        </div>
        {(() => {
          const rest = filteredBriefItems.filter(i => !i.highlight);
          const platforms = [...new Set(rest.map(i => i.platform))];
          const grouped = platforms.map(p => ({
            platform: p,
            color: rest.find(i => i.platform === p)!.color,
            items: rest.filter(i => i.platform === p),
          }));
          return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {grouped.map(({ platform, color, items }) => (
                <div key={platform} style={{
                  background: '#1a1a1a', border: '1px solid #2a2a2a',
                  borderLeft: `3px solid ${color}`, borderRadius: 3, padding: '10px 12px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <span style={{
                      fontSize: 9, fontWeight: 700, color,
                      background: `${color}18`, border: `1px solid ${color}40`,
                      padding: '1px 6px', borderRadius: 3,
                    }}>{platform}</span>
                    <span style={{ fontSize: 9, color: '#444', marginLeft: 'auto' }}>
                      {items.length} update{items.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {items.map((item, i) => (
                      <div key={i} style={{
                        paddingBottom: i < items.length - 1 ? 8 : 0,
                        borderBottom: i < items.length - 1 ? '1px solid #242424' : 'none',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
                          {item.sourceUrl ? (
                            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, fontWeight: 600, color: '#C0C0C0', lineHeight: 1.4, textDecoration: 'none' }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                              onMouseLeave={e => (e.currentTarget.style.color = '#C0C0C0')}
                            >{item.headline} <ExternalLink size={9} style={{ display: 'inline', verticalAlign: 'middle', opacity: 0.4 }} /></a>
                          ) : (
                            <span style={{ fontSize: 11, fontWeight: 600, color: '#C0C0C0', lineHeight: 1.4 }}>{item.headline}</span>
                          )}
                          <span style={{ fontSize: 9, color: '#444', flexShrink: 0 }}>{item.date}</span>
                        </div>
                        <p style={{ fontSize: 11, color: '#666', margin: 0, lineHeight: 1.5 }}>{item.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* ── Curated updates (Product / Pricing / Partnerships / Promotion) ── */}
      <div style={{ marginTop: 40 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          Curated Updates
        </div>
        <p style={{ color: '#A0A0A0', fontSize: 13, marginBottom: 16 }}>
          {filteredUpdates.length} competitive development{filteredUpdates.length !== 1 ? 's' : ''} detected · Sourced from public announcements, press coverage, and Adobe internal competitive intelligence
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {byFourP.map(({ p, updates }) => {
            const color = FOURP_COLORS[p];
            return (
              <div key={p} style={{ background: '#1e1e1e', border: '1px solid #333', borderTop: `3px solid ${color}`, borderRadius: 4, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid #2a2a2a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{p}</span>
                  </div>
                  <span style={{ fontSize: 10, color: '#555', background: '#2a2a2a', padding: '2px 8px', borderRadius: 3 }}>
                    {updates.length} update{updates.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {updates.length === 0 ? (
                  <p style={{ fontSize: 12, color: '#444', fontStyle: 'italic', margin: 0, textAlign: 'center', paddingTop: 8 }}>No updates detected this month</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {updates.map((u) => {
                      const gi = UPDATES.indexOf(u);
                      const isExp = expanded[gi];
                      const isSub = subExpanded[gi];
                      const hasSub = u.explanation && u.explanation.length > 0;
                      return (
                        <div key={gi} style={{ borderBottom: '1px solid #2a2a2a' }}>
                          <button onClick={() => toggleUpdate(gi)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0', textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: '#2e2e2e', padding: '2px 7px', borderRadius: 3, flexShrink: 0, marginTop: 2, whiteSpace: 'nowrap' }}>{u.platform}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: isExp ? '#fff' : '#D0D0D0', lineHeight: 1.4, flex: 1 }}>{u.headline}</span>
                            <span style={{ color: '#555', flexShrink: 0, fontSize: 11, marginTop: 2 }}>{isExp ? '▲' : '▼'}</span>
                          </button>
                          {isExp && (
                            <div style={{ paddingBottom: 12 }}>
                              {u.effectiveDate && <span style={{ display: 'inline-block', fontSize: 9, fontWeight: 600, color: '#EB1000', background: '#EB100018', border: '1px solid #EB100040', padding: '1px 6px', borderRadius: 3, marginBottom: 8 }}>Effective {u.effectiveDate}</span>}
                              <p style={{ fontSize: 12, color: '#A0A0A0', margin: '0 0 10px 0', lineHeight: 1.7 }}>{u.detail}</p>
                              {hasSub && (
                                <>
                                  <button onClick={() => toggleSub(gi)} style={{ color, background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, padding: '3px 0', fontWeight: 600 }}>
                                    {isSub ? '▲ Hide explanation' : '▼ Explain this further'}
                                  </button>
                                  {isSub && (
                                    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                      {u.explanation!.map((block, bi) => (
                                        <div key={bi} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 3, padding: '8px 10px' }}>
                                          <div style={{ fontSize: 9, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{block.label}</div>
                                          <p style={{ fontSize: 11, color: '#A0A0A0', margin: 0, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{block.content}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </>
                              )}
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                                <span style={{ fontSize: 10, color: '#444' }}>{u.date}</span>
                                <a href={u.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '1px 6px', borderRadius: 3, background: '#242424', border: '1px solid #3a3a3a', color: '#06B6D4', fontSize: 9, fontWeight: 500, textDecoration: 'none', marginLeft: 'auto' }}>
                                  <ExternalLink size={8} />{u.sourceName}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Briefing data — flat, sorted newest first ─────────────────────────────

const BRIEF_ITEMS = [
  // ── May 28 ──
  {
    platform: 'Claude', color: '#A78BFA', date: 'May 28', sortDate: '2026-05-28',
    headline: 'Opus 4.8 ships 41 days after 4.7; ARR jumps from $9B to $47B',
    summary: 'Unusually fast release driven by competitive pressure and 4.7 backlash; $65B Series H at $965B valuation makes Anthropic the most valued AI startup, surpassing OpenAI.',
    sourceUrl: 'https://www.anthropic.com/news/claude-opus-4-8',
  },
  {
    platform: 'Canva', color: '#22C55E', date: 'May 28', sortDate: '2026-05-28',
    headline: 'Image to Video now supports human faces',
    summary: 'Animating people realistically fills a key gap for brands whose content centers on people rather than products; Magic Eraser also updated for cleaner, shadow-free removals.',
    sourceUrl: 'https://www.canva.com/newsroom/news/whats-new-may-2026/',
  },
  // ── May 27 ──
  {
    platform: 'Runway', color: '#F59E0B', date: 'May 27', sortDate: '2026-05-27',
    headline: 'Runway MCP: connects to Claude, ChatGPT, Cursor',
    summary: 'Generate images and videos, create marketing content from a URL, and make dialogue-driven ads directly inside compatible AI agents.',
    sourceUrl: 'https://runwayml.com/blog/runway-mcp',
  },
  // ── May 26 ──
  {
    platform: 'Canva', color: '#22C55E', date: 'May 21–26', sortDate: '2026-05-26',
    highlight: true, rank: 5, rankRationale: 'An opportunity for Adobe rather than a threat — users are actively looking for alternatives and Adobe has a window to capture them.',
    headline: 'Video Editor 2.0 frustration continues; two outages reported',
    summary: 'Six months post-launch, users still request the old editor back; outages on May 21 and 26 spiked complaints on Downdetector, particularly in Asia and North America.',
    adobeImplication: 'With Canva\'s video editor frustrating users six months post-launch, Premiere and Premiere Mobile have a real window — particularly against CapCut, where Premiere Mobile is a well-suited competitor. Firefly-powered video features — auto-caption, generative fill in video, AI B-roll — could be the decisive differentiator if Adobe can reach these students before CapCut does.',
    implicationSource: 'Canva Design Community · Downdetector · Adobe Internal Briefing · May 21–26, 2026',
  },
  {
    platform: 'Students', color: '#A0A0A0', date: 'May 26', sortDate: '2026-05-26',
    highlight: true, rank: 2,
    rankRationale: 'Ranked second — student sentiment is a direct signal about the audience CC needs to win, and a positioning opportunity Adobe can act on now.',
    headline: 'Graduates booing AI optimism at commencement speeches',
    summary: 'Students at multiple graduations protested speakers celebrating AI, citing fears about skills disruption — a growing gap between AI narratives and student confidence.',
    sourceUrl: 'https://www.socialmediatoday.com/news/students-booing-ai-commencement-2026',
    adobeImplication: 'Students are expressing fear and anxiety about AI\'s impact on their creative futures — the exact audience CC needs to win. Positioning Firefly and Creative Cloud as tools that amplify human creativity rather than replace it could be a meaningful differentiator at a moment when the industry\'s standard AI messaging is landing poorly.',
    implicationSource: 'Social Media Today · Adobe Internal Briefing · May 26, 2026',
  },
  // ── May 25 ──
  {
    platform: 'Leonardo.AI', color: '#F59E0B', date: 'May 25', sortDate: '2026-05-25',
    headline: 'Pro Upscaler built for AI images — exports directly to Canva',
    summary: 'Recognises synthetic grain and AI textures to repair rather than distort; may foreshadow native Canva availability.',
    sourceUrl: 'https://leonardo.ai/news/pro-upscaler',
  },
  {
    platform: 'ChatGPT', color: '#A78BFA', date: 'May 2026', sortDate: '2026-05-25',
    headline: 'GPT-5.5 Instant updated; Canvas mode retired',
    summary: 'More conversational, less bullet-heavy output; Canvas writing and coding moves into a unified chat surface, removing a dedicated workspace mode.',
    sourceUrl: 'https://openai.com/blog/gpt-5-5-instant-update',
  },
  // ── May 22 ──
  {
    platform: 'Figma', color: '#F59E0B', date: 'May 22', sortDate: '2026-05-22',
    headline: 'Bulk edit and resize in Figma Buzz',
    summary: 'Upload a spreadsheet to bulk-create campaign assets; multi-select cells to manage sizes and brand imagery at scale.',
    sourceUrl: 'https://www.figma.com/blog/figma-buzz-bulk-edit',
  },
  // ── May 21 ──
  {
    platform: 'Picsart', color: '#22C55E', date: 'May 21', sortDate: '2026-05-21',
    highlight: true, rank: 3,
    rankRationale: 'Picsart\'s agent suite spans the full creative workflow — brand, content, localization, video — at a price point that significantly undercuts Creative Cloud.',
    headline: '16 AI agents launched across creative workflows',
    summary: 'A 3-system workflow spans brand identity, content creation, localization, and video production — routing each task to the most relevant agent before generating.',
    sourceUrl: 'https://picsart.com/blog/ai-agents',
    adobeImplication: 'Picsart\'s 16-agent system covers brand identity, content creation, localization, and video production in a coordinated workflow — scope that starts to rival Creative Cloud\'s suite breadth, and notably mirrors a direction Adobe is likely ultimately heading itself. At $10.50/mo, students can access what amounts to an AI creative team spanning functions that would otherwise require multiple CC apps.',
    implicationSource: 'Picsart · Adobe Internal Briefing · May 21, 2026',
  },
  {
    platform: 'Runway', color: '#F59E0B', date: 'May 21', sortDate: '2026-05-21',
    headline: 'Aleph 2.0 + Edit Studio: precise video editing up to 30s',
    summary: 'Localized edits (swap product, change background, restyle) while preserving original footage — editable across multiple shots simultaneously.',
    sourceUrl: 'https://runwayml.com/blog/aleph-2-edit-studio',
  },
  // ── May 20 ──
  {
    platform: 'Stability AI', color: '#F59E0B', date: 'May 20', sortDate: '2026-05-20',
    headline: 'Stable Audio 3.0: professional audio up to 6 minutes',
    summary: 'Four models covering sound effects, short clips, and fully structured songs — comparable to recent audio model launches from Google.',
    sourceUrl: 'https://stability.ai/news/stable-audio-3',
  },
  // ── May 19 ──
  {
    platform: 'Gemini', color: '#A78BFA', date: 'May 19', sortDate: '2026-05-19',
    headline: 'Gemini Omni Flash: photorealistic video from any input',
    summary: 'New model generates physics-aware video from text, images, or YouTube Shorts — rolling out to AI Plus, Pro, and Ultra this week.',
    sourceUrl: 'https://blog.google/products/gemini/google-io-2026/',
  },
  {
    platform: 'Gemini', color: '#A78BFA', date: 'May 19', sortDate: '2026-05-19',
    headline: 'Pics: Workspace-native AI design app',
    summary: 'Generates and edits visuals from conversational prompts inside Google Workspace; limited Trusted Tester rollout, coming to AI Pro/Ultra this summer.',
    sourceUrl: 'https://blog.google/products/workspace/google-io-2026/',
  },
  {
    platform: 'Canva', color: '#22C55E', date: 'May 19', sortDate: '2026-05-19',
    highlight: true, rank: 1, rankRationale: 'Distribution threat at the largest scale — Gemini has 900M users. Design habits forming inside Gemini bypass Creative Cloud entirely.',
    headline: 'Canva integrates with Gemini via MCP',
    summary: 'Users can generate, edit, repurpose, and brand-align Canva designs directly inside Gemini using @Canva — including Magic Layers and translate.',
    sourceUrl: 'https://www.canva.com/newsroom/news/whats-new-may-2026/',
    adobeImplication: 'Both Canva and Adobe Firefly are now usable directly inside AI assistants — Canva inside Gemini, Firefly inside Claude. The difference is which assistant: Gemini has 900M users and is built into Google Workspace, where students already write papers, build slide decks, and collaborate. Firefly\'s integration with Claude reaches a more professional and developer audience. The student exposure gap is real even if the capability parity isn\'t.',
    implicationSource: 'canva.com · Adobe Internal Briefing · May 19, 2026',
  },
  // ── May 18 ──
  {
    platform: 'Canva', color: '#22C55E', date: 'May 18', sortDate: '2026-05-18',
    headline: '4 senior leaders depart amid AI pivot and pre-IPO pressure',
    summary: 'CTO Brendan Humphreys plus Head of Design, Sr. Engineering Director, and an 8-year design lead all exited as Canva accelerates its AI-first restructuring.',
    sourceUrl: 'https://www.theaustralian.com.au/business/technology/canva-senior-exits',
  },
  {
    platform: 'Runway', color: '#F59E0B', date: 'May 18', sortDate: '2026-05-18',
    headline: 'Runway Characters can now take actions, not just speak',
    summary: 'Characters can call on tools and interact with other apps — expanding into eCommerce, customer support, onboarding, and gaming.',
    sourceUrl: 'https://runwayml.com/blog/runway-characters-actions',
  },
  {
    platform: 'Figma', color: '#F59E0B', date: 'May 18', sortDate: '2026-05-18',
    headline: 'Sections added to Figma Slides',
    summary: 'Users can now name and reorder rows of slides in grid view, and jump between sections from Presenter and Audience view.',
    sourceUrl: 'https://www.figma.com/blog/figma-slides-sections',
  },
  // ── May 15–16 ──
  {
    platform: 'Meta Edits', color: '#60A5FA', date: 'May 15', sortDate: '2026-05-15',
    headline: 'Edits: transition controls, sound effects, live photo uploads',
    summary: 'Adds transition pace control, text/sticker opacity, live photo support (iOS), and 200 new sound effects — each release tied to a cultural moment (this one: Met Gala).',
    sourceUrl: 'https://www.socialmediatoday.com/news/meta-edits-updates-may-2026',
  },
  {
    platform: 'Picsart', color: '#22C55E', date: 'May 2026', sortDate: '2026-05-15',
    headline: 'Recraft V4.1 integrated: photorealistic, vector, and product shot models',
    summary: 'Three coordinated models in Picsart AI Playground — main (photorealistic), vector (editable graphics), utility (catalog product shots).',
    sourceUrl: 'https://picsart.com/blog/recraft-v4-1',
  },
  // ── May 13 ──
  {
    platform: 'Claude', color: '#A78BFA', date: 'May 13', sortDate: '2026-05-13',
    headline: 'Claude for Small Business launches — Canva is the design layer',
    summary: 'Anthropic\'s new SMB package puts Claude inside everyday tools (QuickBooks, Google Workspace, HubSpot); Canva is specifically named as the creative AI layer for design tasks.',
    sourceUrl: 'https://www.anthropic.com/news/claude-for-small-business',
  },
  // ── May 12 ──
  // ── May 7–10 ──
  {
    platform: 'Picsart', color: '#22C55E', date: 'May 2026', sortDate: '2026-05-10',
    headline: 'AI Stylist: outfit generation + full retouching from one photo',
    summary: 'Generates complete outfits from a single photo and style direction, then layers in AI retouching (skin tone, hair, features) — full styling workflow inside Picsart.',
    sourceUrl: 'https://picsart.com/blog/ai-stylist',
  },
  {
    platform: 'Claude', color: '#A78BFA', date: 'May 7', sortDate: '2026-05-07',
    headline: 'Claude now works across Excel, PowerPoint, Word, and Outlook',
    summary: 'Full context carried across Microsoft 365 apps — draft emails, update spreadsheets, and build decks in one session; Outlook integration remains in beta.',
    sourceUrl: 'https://www.anthropic.com/news/claude-microsoft-365',
  },
  {
    platform: 'Picsart', color: '#22C55E', date: 'May 7', sortDate: '2026-05-07',
    highlight: true, rank: 4, rankRationale: 'Picsart is a direct Firefly competitor at a fraction of CC\'s price, now embedded in AI chat — but lower brand recognition than Canva limits its immediate threat.',
    headline: 'Picsart MCP: 140+ AI models accessible via ChatGPT and Claude',
    summary: 'A single integration gives AI assistants access to Picsart\'s full model library for image, video, and audio — following similar MCP launches by Canva and Adobe Express.',
    sourceUrl: 'https://picsart.com/blog/picsart-mcp',
    adobeImplication: 'Picsart is now usable directly inside ChatGPT and Claude, putting 140+ AI image, video, and audio tools one prompt away — and at $10.50 a month, it competes directly with Firefly\'s generative capabilities. This is particularly relevant to the creator audience.',
    implicationSource: 'picsart.com · Adobe Internal Briefing · May 7, 2026',
  },
  // ── May 6 ──
  {
    platform: 'Meta Edits', color: '#60A5FA', date: 'May 6', sortDate: '2026-05-06',
    headline: 'Caption profanity controls and improved image blending',
    summary: 'Edits continues adding CapCut feature parity — profanity replacement in captions, enhanced image blending effects, and a custom Met Gala font.',
    sourceUrl: 'https://www.socialmediatoday.com/news/meta-edits-updates-may-2026',
  },
  // ── May 3–4 ──
  {
    platform: 'Canva', color: '#22C55E', date: 'May 4', sortDate: '2026-05-04',
    headline: '"The Thing That Makes Anything A Thing" — new U.S. brand campaign',
    summary: 'Spans experiential, OOH, social, influencer, digital, and audio; centers Canva as the creative partner for turning any idea into reality.',
    sourceUrl: 'https://www.canva.com/newsroom/news/',
  },
  {
    platform: 'Gemini', color: '#A78BFA', date: 'May 4', sortDate: '2026-05-04',
    headline: 'Custom tone, style, and formatting instructions in Google Docs',
    summary: 'Persistent Gemini instructions (up to 1,000 characters) auto-apply preferences on every document — deepening Google ecosystem lock-in.',
    sourceUrl: 'https://workspace.google.com/blog/gemini-docs-custom-instructions',
  },
  {
    platform: 'YouTube', color: '#60A5FA', date: 'May 3', sortDate: '2026-05-03',
    headline: 'AI music generation replaces copyrighted songs in existing videos',
    summary: 'Creators can swap flagged audio with AI-generated royalty-free instrumental tracks in YouTube Studio — resolving copyright issues without removing videos.',
    sourceUrl: 'https://www.socialmediatoday.com/news/youtube-ai-music-generation',
  },
  // ── Apr 30 ──
  {
    platform: 'Meta Edits', color: '#60A5FA', date: 'Apr 30', sortDate: '2026-04-30',
    headline: 'AI ad connectors pipe Meta data into ChatGPT and Claude',
    summary: 'Brands can now query campaign performance in their AI assistant of choice via natural language — no APIs or developer credentials required.',
    sourceUrl: 'https://www.socialmediatoday.com/news/meta-ai-ad-connectors',
  },
];
