import { useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

function ImageCarousel({ images, caption }: { images: string[]; caption?: string }) {
  const [idx, setIdx] = useState(0);
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', background: '#f0f0f0', lineHeight: 0 }}>
        <img
          src={images[idx]}
          alt={`Screenshot ${idx + 1} of ${images.length}`}
          style={{ width: '100%', display: 'block', height: '100%', objectFit: 'contain', background: '#eeeeee' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {images.length > 1 && (
          <>
            <button onClick={() => setIdx(i => (i - 1 + images.length) % images.length)}
              style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.55)', border: '1.5px solid rgba(255,255,255,0.4)', color: '#ffffff', borderRadius: 99, width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => setIdx(i => (i + 1) % images.length)}
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.55)', border: '1.5px solid rgba(255,255,255,0.4)', color: '#ffffff', borderRadius: 99, width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight size={16} />
            </button>
            <div style={{ position: 'absolute', bottom: 9, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
              {images.map((_, i) => (
                <div key={i} onClick={() => setIdx(i)} style={{ width: 7, height: 7, borderRadius: '50%', background: i === idx ? '#ffffff' : 'rgba(255,255,255,0.4)', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.4)' }} />
              ))}
            </div>
          </>
        )}
      </div>
      {caption && <div style={{ fontSize: 9, color: '#111111', marginTop: 5, fontStyle: 'italic', lineHeight: 1.4 }}>{caption}</div>}
    </div>
  );
}
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
    headline: 'Canva is now usable directly inside Google Gemini',
    detail: 'Canva launched a direct integration with Google Gemini, letting users generate, edit, repurpose, and brand-align designs without leaving Gemini. Accessible via the @Canva prompt, users can browse and search Canva content, turn generated images into editable layouts with Magic Layers, and rewrite, update, or translate copy — all inside the chat. Both Canva and Adobe Firefly are now usable inside AI assistants — Canva inside Gemini, Firefly inside Claude. The distinction is that Gemini\'s 900M users and Google Workspace embedding means Canva reaches students where they already work, while Firefly\'s integration with Claude skews toward professional and developer audiences.',
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

function ImplicationsCarousel({ items }: { items: any[] }) {
  const [idx, setIdx] = useState(0);
  if (items.length === 0) return null;
  const item = items[idx];
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
        Implications for Creative Cloud for Students
      </div>

      {/* Card */}
      <div style={{ border: '1px solid #e8e8e8', borderRadius: 4, overflow: 'hidden', background: '#f8f8f8' }}>
        {/* Card body — fixed height so navigation buttons never shift */}
        <div style={{ display: 'grid', gridTemplateColumns: (item.images?.length || item.videoEmbed || item.videoUrl) ? '1fr 1fr' : '1fr', height: 460 }}>
          {/* Left: update + implication stacked */}
          <div style={{ padding: '16px 18px', borderRight: (item.images?.length || item.videoEmbed || item.videoUrl) ? '1px solid #e8e8e8' : 'none', overflowY: 'auto', height: '100%', boxSizing: 'border-box' }}>
            {/* Update section */}
            <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Industry Update</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                {PLATFORM_DOMAIN[item.platform] && (
                  <img src={`https://www.google.com/s2/favicons?domain=${PLATFORM_DOMAIN[item.platform]}&sz=64`} alt={item.platform} style={{ width: 14, height: 14, borderRadius: 3, flexShrink: 0 }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                )}
                <span style={{ fontSize: 11, fontWeight: 700, color: item.color, background: `${item.color}18`, border: `1px solid ${item.color}40`, padding: '1px 5px', borderRadius: 3, flexShrink: 0 }}>{item.platform}</span>
                <span style={{ fontSize: 11, color: '#111111' }}>{item.date}</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#111111', margin: '0 0 6px', lineHeight: 1.5, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 12, flexShrink: 0 }}>{inferUpdateIcon(item.headline, item.summary)}</span>
                <span>{item.headline}</span>
              </p>
              {item.rankRationale && (
                <p style={{ fontSize: 12, color: '#111111', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>{item.rankRationale}</p>
              )}
            </div>
            {/* Implication section */}
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Implication for CC Students</div>
              <p style={{ fontSize: 12, color: '#111111', margin: '0 0 8px', lineHeight: 1.6 }}>{item.adobeImplication}</p>
              {item.implicationSource && (
                <span style={{ fontSize: 10, color: '#111111', fontStyle: 'italic' }}>{item.implicationSource}</span>
              )}
            </div>
          </div>

          {/* Right: image carousel or video — fills full column height */}
          {item.images?.length > 0 && (
            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
              <div style={{ flex: 1, overflow: 'hidden', borderRadius: 4, background: '#f0f0f0', minHeight: 0 }}>
                <ImageCarousel images={item.images} caption={undefined} />
              </div>
              {item.imageCaption && <div style={{ fontSize: 9, color: '#888888', marginTop: 5, flexShrink: 0, fontStyle: 'italic' }}>{item.imageCaption}</div>}
            </div>
          )}
          {!item.images?.length && item.videoUrl && (
            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
              <div style={{ flex: 1, borderRadius: 4, overflow: 'hidden', background: '#f0f0f0', minHeight: 0 }}>
                <video src={item.videoUrl} controls style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
              </div>
              {item.videoCaption && <div style={{ fontSize: 9, color: '#888888', marginTop: 5, flexShrink: 0, fontStyle: 'italic' }}>{item.videoCaption}</div>}
            </div>
          )}
          {!item.images?.length && !item.videoUrl && item.videoEmbed && (
            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
              <div style={{ flex: 1, borderRadius: 4, overflow: 'hidden', background: '#f0f0f0', position: 'relative', minHeight: 0 }}>
                <iframe
                  src={item.videoEmbed}
                  title="Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                />
              </div>
              <div style={{ fontSize: 9, color: '#888888', marginTop: 5, flexShrink: 0, fontStyle: 'italic' }}>YouTube · 2026 graduates boo commencement speeches on AI</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <button
          onClick={() => setIdx(i => (i - 1 + items.length) % items.length)}
          style={{ background: 'none', border: '1px solid #e8e8e8', color: '#111111', borderRadius: 3, padding: '4px 12px', cursor: 'pointer', fontSize: 12 }}
        >
          ← Prev
        </button>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {items.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{ width: 6, height: 6, borderRadius: '50%', background: i === idx ? '#F59E0B' : '#d0d0d0', cursor: 'pointer', transition: 'background 0.15s' }} />
          ))}
          <span style={{ fontSize: 10, color: '#111111', marginLeft: 6 }}>{idx + 1} of {items.length}</span>
        </div>
        <button
          onClick={() => setIdx(i => (i + 1) % items.length)}
          style={{ background: 'none', border: '1px solid #e8e8e8', color: '#111111', borderRadius: 3, padding: '4px 12px', cursor: 'pointer', fontSize: 12 }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

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
      {/* ── Industry Briefings ─────────────────────────────────────── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #e8e8e8' }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#111111', letterSpacing: '-0.01em' }}>
            📋 Industry Briefings
          </span>
          <span style={{ fontSize: 12, color: '#111111' }}>May 13 – Jun 11, 2026 · Adobe internal competitive intelligence</span>
        </div>

        {/* ── Implications carousel ── */}
        <ImplicationsCarousel items={filteredBriefItems.filter(i => i.highlight && i.adobeImplication).sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))} />

        {/* ── Remaining briefings (non-flagged) ── */}
        <div style={{ fontSize: 10, fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
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
                  background: '#ffffff', border: '1px solid #e0e0e0', boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                  borderLeft: `3px solid ${color}`, borderRadius: 3, padding: '10px 12px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    {PLATFORM_DOMAIN[platform] && (
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${PLATFORM_DOMAIN[platform]}&sz=64`}
                        alt={platform}
                        style={{ width: 14, height: 14, borderRadius: 3, flexShrink: 0 }}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}
                    <span style={{
                      fontSize: 9, fontWeight: 700, color,
                      background: `${color}18`, border: `1px solid ${color}40`,
                      padding: '1px 6px', borderRadius: 3,
                    }}>{platform}</span>
                    <span style={{ fontSize: 9, color: '#111111', marginLeft: 'auto' }}>
                      {items.length} update{items.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {items.map((item, i) => (
                      <div key={i} style={{
                        paddingBottom: i < items.length - 1 ? 8 : 0,
                        borderBottom: i < items.length - 1 ? '1px solid #f0f0f0' : 'none',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
                          {item.sourceUrl ? (
                            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, fontWeight: 600, color: '#111111', lineHeight: 1.4, textDecoration: 'none' }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#555')}
                              onMouseLeave={e => (e.currentTarget.style.color = '#111111')}
                            >{item.headline} <ExternalLink size={9} style={{ display: 'inline', verticalAlign: 'middle', opacity: 0.4 }} /></a>
                          ) : (
                            <span style={{ fontSize: 11, fontWeight: 600, color: '#111111', lineHeight: 1.4 }}>{item.headline}</span>
                          )}
                          <span style={{ fontSize: 9, color: '#111111', flexShrink: 0 }}>{item.date}</span>
                        </div>
                        <p style={{ fontSize: 11, color: '#111111', margin: 0, lineHeight: 1.5 }}>{item.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* ── Curated updates — hidden, stories rolled up into Other Updates ── */}
      {false && <div style={{ marginTop: 40 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          Curated Updates
        </div>
        <p style={{ color: '#111111', fontSize: 13, marginBottom: 16 }}>
          {filteredUpdates.length} competitive development{filteredUpdates.length !== 1 ? 's' : ''} detected · Sourced from public announcements, press coverage, and Adobe internal competitive intelligence
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {byFourP.map(({ p, updates }) => {
            const color = FOURP_COLORS[p];
            return (
              <div key={p} style={{ background: '#ffffff', border: '1px solid #e0e0e0', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', borderTop: `3px solid ${color}`, borderRadius: 4, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {QUADRANT_HERO[p] && (
                  <div style={{ height: 120, overflow: 'hidden', background: '#f0f0f0' }}>
                    <img
                      src={QUADRANT_HERO[p]}
                      alt={p}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                      onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
                    />
                  </div>
                )}
                <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid #e8e8e8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{p}</span>
                  </div>
                  <span style={{ fontSize: 10, color: '#111111', background: '#e8e8e8', padding: '2px 8px', borderRadius: 3 }}>
                    {updates.length} update{updates.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {updates.length === 0 ? (
                  <p style={{ fontSize: 12, color: '#111111', fontStyle: 'italic', margin: 0, textAlign: 'center', paddingTop: 8 }}>No updates detected this month</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {updates.map((u) => {
                      const gi = UPDATES.indexOf(u);
                      const isExp = expanded[gi];
                      const isSub = subExpanded[gi];
                      const hasSub = u.explanation && u.explanation.length > 0;
                      return (
                        <div key={gi} style={{ borderBottom: '1px solid #e8e8e8' }}>
                          <button onClick={() => toggleUpdate(gi)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0', textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: '#111111', background: '#f0f0f0', border: '1px solid #e0e0e0', padding: '2px 7px', borderRadius: 3, flexShrink: 0, marginTop: 2, whiteSpace: 'nowrap' }}>{u.platform}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: isExp ? '#000000' : '#333333', lineHeight: 1.4, flex: 1 }}>{u.headline}</span>
                            <span style={{ color: '#111111', flexShrink: 0, fontSize: 11, marginTop: 2 }}>{isExp ? '▲' : '▼'}</span>
                          </button>
                          {isExp && (
                            <div style={{ paddingBottom: 12 }}>
                              {u.effectiveDate && <span style={{ display: 'inline-block', fontSize: 9, fontWeight: 600, color: '#EB1000', background: '#EB100018', border: '1px solid #EB100040', padding: '1px 6px', borderRadius: 3, marginBottom: 8 }}>Effective {u.effectiveDate}</span>}
                              <p style={{ fontSize: 12, color: '#111111', margin: '0 0 10px 0', lineHeight: 1.7 }}>{u.detail}</p>
                              {hasSub && (
                                <>
                                  <button onClick={() => toggleSub(gi)} style={{ color, background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, padding: '3px 0', fontWeight: 600 }}>
                                    {isSub ? '▲ Hide explanation' : '▼ Explain this further'}
                                  </button>
                                  {isSub && (
                                    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                      {u.explanation!.map((block, bi) => (
                                        <div key={bi} style={{ background: '#f0f1f3', border: '1px solid #e8e8e8', borderRadius: 3, padding: '8px 10px' }}>
                                          <div style={{ fontSize: 9, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{block.label}</div>
                                          <p style={{ fontSize: 11, color: '#111111', margin: 0, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{block.content}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </>
                              )}
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                                <span style={{ fontSize: 10, color: '#111111' }}>{u.date}</span>
                                <a href={u.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '1px 6px', borderRadius: 3, background: '#f0f0f0', border: '1px solid #dddddd', color: '#06B6D4', fontSize: 9, fontWeight: 500, textDecoration: 'none', marginLeft: 'auto' }}>
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
                </div>{/* end padding wrapper */}
              </div>
            );
          })}
        </div>
      </div>}
    </div>
  );
}

// ── Update type icon inference ────────────────────────────────────────────
function inferUpdateIcon(headline: string, summary: string): string {
  const text = (headline + ' ' + summary).toLowerCase();
  if (text.includes('boo') || text.includes('commencement') || text.includes('protest') || text.includes('sentiment') || text.includes('anxiety') || text.includes('frustrat')) return '🙅‍♀️';
  // Product check first — catches "agent/marketplace/model" before "brand" triggers campaign
  if (text.includes('agent') || text.includes('marketplace') || text.includes('model') || text.includes('studio') || text.includes('editor 2.0')) return '🛠';
  if (text.includes('price') || text.includes('pricing') || text.includes('$') || text.includes('/mo') || text.includes('valuation') || text.includes('raise') || text.includes('funding') || text.includes(' arr ') || text.includes('tier')) return '💰';
  if (text.includes('partner') || text.includes('integrat') || text.includes('inside chatgpt') || text.includes('inside claude') || text.includes('inside gemini') || text.includes('usable directly') || text.includes('mcp') || text.includes('connect')) return '🤝';
  if (text.includes('campaign') || text.includes('ads') || text.includes('adverti') || text.includes('brand') || text.includes('event') || text.includes('community') || text.includes('tour') || text.includes('squirrel')) return '📣';
  return '🛠';
}

// ── Platform favicon domains ──────────────────────────────────────────────

const PLATFORM_DOMAIN: Record<string, string> = {
  'Canva': 'canva.com',
  'Claude': 'claude.ai',
  'Google': 'google.com',
  'ChatGPT': 'openai.com',
  'CapCut': 'capcut.com',
  'Picsart': 'picsart.com',
  'Runway': 'runwayml.com',
  'YouTube': 'youtube.com',
  'Figma': 'figma.com',
  'Meta Edits': 'instagram.com',
  'Stability AI': 'stability.ai',
  'Leonardo.AI': 'leonardo.ai',
  'Google Workspace': 'workspace.google.com',
  'Gamma': 'gamma.app',
  'IBM': 'ibm.com',
  'Microsoft Copilot': 'copilot.microsoft.com',
};

// ── Quadrant hero images ───────────────────────────────────────────────────
const QUADRANT_HERO: Partial<Record<FourP, string>> = {
  Product:      'https://d3phaj0sisr2ct.cloudfront.net/site/assets/agent-launch_blog-thumb-1.webp',
  Partnerships: 'https://images.fonearena.com/blog/wp-content/uploads/2026/05/Canva-x-Google-Gemini-1024x576.jpg',
};

// ── Briefing data — flat, sorted newest first ─────────────────────────────

const BRIEF_ITEMS = [
  // ── Jun 6–12 ──
  {
    platform: 'Microsoft Copilot', color: '#0078D4', date: 'Jun 11', sortDate: '2026-06-11',
    highlight: true, rank: 4,
    rankRationale: 'Direct distribution move to all M365 Education users — embeds AI study tools in the same platform students already use for papers, slides, and collaboration.',
    headline: 'Microsoft Copilot Notebooks + Study Guide shipped to all M365 Education users',
    summary: 'Students upload PDFs, slides, and notes; Copilot generates study guides, mind maps, flashcards, quizzes, and fill-in-the-blank exercises — all grounded in source materials with citations. Word, Excel, and PowerPoint generation from Notebooks coming soon.',
    sourceUrl: 'https://techcommunity.microsoft.com/blog/educationblog/copilot-notebooks-and-study-guide-now-available-to-copilot-chat-users/4527320',
    adobeImplication: "Microsoft is embedding AI into the exact study workflows students use every day — course PDFs, lecture slides, and notes — with citations back to source material. As AI learning companions become standard in M365 Education (which most students already have access to), the bar for what counts as a useful student AI tool rises. Adobe's opportunity is in the creative completion layer that Copilot doesn't own.",
    implicationSource: 'techcommunity.microsoft.com · Jun 11, 2026',
  },
  {
    platform: 'Google', color: '#A78BFA', date: 'Jun 8', sortDate: '2026-06-08',
    headline: 'NotebookLM adds agentic research and full document output generation',
    summary: 'Google upgraded NotebookLM with agentic capabilities and support for generating PDFs, data visualizations, spreadsheets, presentations, and images from source materials. Rolling out to AI Ultra and Workspace Business customers first.',
    sourceUrl: 'https://blog.google/innovation-and-ai/products/notebooklm/better-research-notebooklm/',
  },
  {
    platform: 'ChatGPT', color: '#A78BFA', date: 'Jun 8', sortDate: '2026-06-08',
    headline: 'ChatGPT adds interactive charts — bar, line, pie, and scatter in conversation',
    summary: 'Charts appear automatically when ChatGPT determines one would help, or on request. Available on web, iOS, and Android. Users move from a data question to a visual answer without exporting to a separate tool.',
    sourceUrl: 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
  },
  {
    platform: 'Canva', color: '#22C55E', date: 'Jun 7', sortDate: '2026-06-07',
    headline: 'Canva Magic Layers now inside Gemini and ChatGPT — AI images become editable designs',
    summary: 'AI-generated images from Gemini and ChatGPT convert into fully editable, layered Canva designs without leaving the assistant. Available globally to all users across both platforms.',
    sourceUrl: 'https://www.canva.com/newsroom/news/magic-layers-ai-assistants/',
  },
  // ── Jun 3–5 (Canva/ChatGPT carousel + Perplexity; Gemini Utah; ChatGPT memory + jobs; IBM) ──
  {
    platform: 'Canva', color: '#22C55E', date: 'Jun 3', sortDate: '2026-06-03',
    headline: 'Canva deepens ChatGPT integration — bulk deck editing and Codex support added',
    summary: 'New on top of the existing year-old Canva-in-ChatGPT integration: edit text across an entire presentation in one chat command, Brand Kits apply automatically, and Canva is now inside Codex. Rolling out to Free, Plus, and Pro ChatGPT users outside EU.',
    sourceUrl: 'https://www.canva.com/newsroom/news/deep-research-integration-mcp-server/',
  },
  {
    platform: 'Canva', color: '#22C55E', date: 'Jun 3', sortDate: '2026-06-03',
    headline: 'Canva is the exclusive design layer inside Perplexity',
    summary: 'Research and strategy generated in Perplexity converts directly into editable Canva designs — presentations, social assets, and infographics. Canva is the exclusive design integration inside Perplexity Computer, used by small and growing businesses. Available to paid users across eleven languages.',
    sourceUrl: 'https://www.canva.com/newsroom/',
  },
  {
    platform: 'Google', color: '#A78BFA', date: 'Jun 4', sortDate: '2026-06-04',
    headline: 'Google provides Gemini for Education to all Utah K–12 schools',
    summary: 'Statewide deal covers 700,000+ students and educators starting 2026–27. Bundles Gemini for Education, AI literacy training, Google Career Certificates, and educator training — securing AI adoption at the school system level rather than the classroom level.',
    sourceUrl: 'https://blog.google/outreach-initiatives/education/',
  },
  {
    platform: 'ChatGPT', color: '#A78BFA', date: 'Jun 4', sortDate: '2026-06-04',
    headline: 'ChatGPT memory auto-updates — capacity doubled for paid users',
    summary: 'Memory now updates automatically rather than requiring manual saves; stale and contradictory memories are reduced. Plus and Pro users get double the memory capacity. The more ChatGPT knows a user, the harder it becomes to switch — personalization is becoming a key retention lever across all major AI platforms.',
    sourceUrl: 'https://openai.com/chatgpt',
  },
  {
    platform: 'ChatGPT', color: '#A78BFA', date: 'May 2026', sortDate: '2026-05-30',
    headline: 'ChatGPT adds job search and resume builder',
    summary: 'Live roles and freelance opportunities from Indeed, Upwork, and Appcast, personalized to user goals. Resume upload, tailoring to a specific role, and download also added. Job search U.S. only; resume globally available. Another specialized workflow absorbed into a single chat interface.',
    sourceUrl: 'https://openai.com/chatgpt',
  },
  {
    platform: 'IBM', color: '#2563EB', date: 'Jun 5', sortDate: '2026-06-05',
    headline: 'IBM opens free AI dev tools to 20,000 universities — $15K student prize pool',
    summary: 'Students get free access to IBM Bob (AI-powered development partner) via IBM SkillsBuild, plus mentorship and competition. IBM is embedding its AI ecosystem in student projects and workforce preparation programs across 20,000 post-secondary institutions worldwide.',
    sourceUrl: 'https://skillsbuild.org/',
  },
  // ── May 21 (CapCut+Gemini, Canva integrations) ──
  {
    platform: 'CapCut', color: '#22C55E', date: 'May 21', sortDate: '2026-05-21',
    headline: 'CapCut integrating into Gemini app — editing inside the AI interface',
    summary: "CapCut's video and image editing tools coming directly inside Gemini. Users edit media without leaving the Gemini interface. CapCut joins Adobe and Canva as creative tool partners embedded in Gemini.",
    sourceUrl: 'https://9to5google.com/2026/05/21/capcut-announces-partnership-with-gemini-app/',
  },
  // ── May 20 (Figma AI Agent, Gemini AI Ultra) ──
  {
    platform: 'Figma', color: '#F59E0B', date: 'May 20', sortDate: '2026-05-20',
    headline: 'Figma AI Agent — native design agent on the canvas',
    summary: 'Native AI agent embedded directly in the collaborative canvas — generates and edits designs using your actual design system components and tokens. Free in rolling beta; available to Full seat users on paid plans post-GA.',
    sourceUrl: 'https://www.figma.com/blog/the-figma-agent-is-here/',
  },
  {
    platform: 'Google', color: '#A78BFA', date: 'May 20', sortDate: '2026-05-20',
    headline: 'Google overhauls AI subscriptions — new AI Ultra tier at $99.99/mo',
    summary: 'At Google I/O: AI Premium renamed AI Pro ($19.99/mo), new AI Ultra entry tier ($99.99/mo), top Ultra tier ($199.99/mo). Gemini Spark (24/7 personal agent) and Gemini Omni announced.',
    sourceUrl: 'https://blog.google/products-and-platforms/products/google-one/google-ai-subscriptions/',
  },
  // ── May 14 (Claude billing split) ──
  {
    platform: 'Claude', color: '#A78BFA', date: 'May 14', sortDate: '2026-05-14',
    headline: 'Claude subscriptions split into two usage buckets — effective June 15',
    summary: 'Direct Claude.ai use (unchanged) vs. third-party/agent integrations (new separate credit pool). Credits are non-rollover; once exhausted, usage stops or bills at full API rates.',
    sourceUrl: 'https://the-decoder.com/claude-subscriptions-get-separate-budgets-for-programmatic-use-billed-at-full-api-prices/',
  },
  // ── May 13 (Runway Agent) ──
  {
    platform: 'Runway', color: '#F59E0B', date: 'May 13', sortDate: '2026-05-13',
    headline: 'Runway Agent — text prompt to finished multi-scene video',
    summary: 'Takes a single text prompt to a ready-to-publish multi-scene video in one session — handling concept, story structure, scene generation, voiceover, dialogue, and music. Aimed at brand teams, agencies, and filmmakers.',
    sourceUrl: 'https://runwayml.com/news/introducing-runway-agent',
  },
  // ── May 28 ──
  {
    platform: 'Claude', color: '#A78BFA', date: 'May 28', sortDate: '2026-05-28',
    headline: 'Opus 4.8 ships 41 days after 4.7; ARR jumps from $9B to $47B',
    summary: 'Unusually fast release driven by competitive pressure and 4.7 backlash; $65B Series H at $965B valuation makes Anthropic the most valued AI startup, surpassing OpenAI.',
    sourceUrl: 'https://www.anthropic.com/news/claude-opus-4-8',
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
    platform: 'Students', color: '#111111', date: 'May 26', sortDate: '2026-05-26',
    highlight: true, rank: 2,
    rankRationale: 'Student sentiment is a direct signal about the audience CC needs to win, and a positioning opportunity Adobe can act on now.',
    headline: 'Graduates booing AI optimism at commencement speeches',
    summary: 'Students at multiple graduations protested speakers celebrating AI, citing fears about skills disruption — a growing gap between AI narratives and student confidence.',
    sourceUrl: 'https://www.socialmediatoday.com/news/students-booing-ai-commencement-2026',
    adobeImplication: 'Students are expressing fear and anxiety about AI\'s impact on their creative futures — the exact audience CC needs to win. Positioning Firefly and Creative Cloud as tools that amplify human creativity rather than replace it could be a meaningful differentiator at a moment when the industry\'s standard AI messaging is landing poorly.',
    implicationSource: 'Social Media Today · Adobe Internal Briefing · May 26, 2026',
    videoEmbed: 'https://www.youtube.com/embed/rgC874ARnX8',
  },
  // ── May 25 ──
  {
    platform: 'Leonardo.AI', color: '#F59E0B', date: 'May 25', sortDate: '2026-05-25',
    headline: 'Pro Upscaler built for AI images — exports directly to Canva',
    summary: 'Recognises synthetic grain and AI textures to repair rather than distort; may foreshadow native Canva availability.',
    sourceUrl: 'https://leonardo.ai/news/pro-upscaler',
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
    headline: 'Picsart AI Agents Marketplace — 16 named creative specialists you can hire',
    summary: 'Each agent is a named specialist with a distinct role: Zoe (AI influencer), Marc (video director), Mira (brand designer), Maya (deck architect), Lina (film director), and 11 more. Users "hire" agents for specific tasks; each learns their style over time.',
    sourceUrl: 'https://picsart.com/ai-agent/',
    adobeImplication: 'Picsart has reframed AI tools as a hireable creative team — brand designer, video director, film director, deck architect, content strategist — scope that starts to rival Creative Cloud\'s suite breadth, and notably mirrors a direction Adobe is likely ultimately heading itself. At $10.50/mo, students can access the equivalent of a full creative department.',
    implicationSource: 'Picsart · Adobe Internal Briefing · May 21, 2026',
    images: [
      'https://cdnblog.picsart.com/2026/05/PicsartAIAgents_Blog_1200x800.png',
      'https://cdnblog.picsart.com/2026/05/Screenshot-2026-05-21-at-11.58.29.png',
    ],
    imageCaption: 'Source: picsart.com/ai-agent · picsart.com/blog/meet-the-new-ai-agents',
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
    platform: 'Canva', color: '#22C55E', date: 'May 19', sortDate: '2026-05-19',
    highlight: true, rank: 1, rankRationale: 'Distribution threat at the largest scale — Gemini has 900M users (Google I/O, May 19, 2026). Design habits forming inside Gemini bypass Creative Cloud entirely.',
    headline: 'Canva is now usable directly inside Google Gemini',
    summary: 'Users can generate, edit, repurpose, and brand-align Canva designs without leaving Gemini — accessible via @Canva, including Magic Layers and translate.',
    sourceUrl: 'https://www.canva.com/newsroom/news/whats-new-may-2026/',
    images: [
      'https://images.fonearena.com/blog/wp-content/uploads/2026/05/Canva-x-Google-Gemini-1024x576.jpg',
      'https://images.fonearena.com/blog/wp-content/uploads/2026/05/Canva-Gemini-Image-Generation.jpg',
      'https://images.fonearena.com/blog/wp-content/uploads/2026/05/Canva-Brand-Kit-in-a-prompt.jpg',
    ],
    imageCaption: 'Source: fonearena.com · May 2026',
    adobeImplication: 'Both Canva and Adobe Firefly are now usable directly inside AI assistants — Canva inside Gemini, Firefly inside Claude. The difference is which assistant: Gemini has 900M users (announced Google I/O, May 19, 2026) and is built into Google Workspace, where students already write papers, build slide decks, and collaborate. Firefly\'s integration with Claude reaches a more professional and developer audience. The student exposure gap is real even if the capability parity isn\'t.',
    implicationSource: 'canva.com · Adobe Internal Briefing · May 19, 2026 · Ramp AI Index May 2026 (techcrunch.com/2026/05/13)',
  },
  // ── May 18 ──
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
  // ── May 13 ──
];
