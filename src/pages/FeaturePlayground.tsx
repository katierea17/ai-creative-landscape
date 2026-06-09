// ── Feature Overview Playground ───────────────────────────────────────────
// Current matrix + three experimental alternatives.

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { CapabilityDot } from '../components/CapabilityDot';
import { useFilter } from '../context/FilterContext';
import { competitors } from '../data/competitorData';
import type { Category } from '../data/competitorData';

const ADOBE_FEATURE_STUB = {
  id: 'adobe',
  name: 'Adobe CC (Students)',
  category: 'Professional Tools' as Category,
  aiFeatures: {
    ideate: 'Firefly — text-to-image concept generation, style exploration, variations; Firefly web app purpose-built for generative ideation',
    creativeEditing: 'Generative Fill, Generative Expand, Generative Recolor, Remove Tool',
    imageGeneration: 'Firefly Text to Image (4,000 credits/mo on CC All Apps)',
    videoGeneration: 'AI-enhanced editing in Premiere Pro (auto-reframe, speech cleanup)',
  },
  experience: {
    certification: 'Adobe Certified Professional (Photoshop, Illustrator, Premiere Pro, and more)',
  },
  pricing: {
    studentPrice: '$19.99/mo intro (yr 1), $39.99/mo after',
  },
};

// ── Custom tooltip ─────────────────────────────────────────────────────────

function Tooltip({ content, children, wrapperStyle, placement = 'above' }: { content: React.ReactNode; children: React.ReactNode; wrapperStyle?: React.CSSProperties; placement?: 'above' | 'below' }) {
  const [visible, setVisible] = useState(false);
  if (!content) return <>{children}</>;
  const isAbove = placement === 'above';
  return (
    <div
      style={{ position: 'relative', display: 'inline-block', ...wrapperStyle }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div style={{
          position: 'absolute',
          ...(isAbove ? { bottom: 'calc(100% + 6px)' } : { top: 'calc(100% + 6px)' }),
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#111',
          border: '1px solid #444',
          borderRadius: 4,
          padding: '6px 10px',
          fontSize: 11,
          color: '#D0D0D0',
          whiteSpace: 'normal',
          lineHeight: 1.5,
          zIndex: 200,
          pointerEvents: 'none',
          minWidth: 160,
          maxWidth: 260,
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        }}>
          {content}
        </div>
      )}
    </div>
  );
}

// ── Current matrix data ────────────────────────────────────────────────────

const FEATURE_SOURCES: Record<string, { url: string; label: string }> = {
  'google-photos':   { url: 'https://photos.google.com',                          label: 'photos.google.com' },
  'instagram-edits': { url: 'https://about.instagram.com/features/edits',         label: 'about.instagram.com' },
  'imovie':          { url: 'https://www.apple.com/imovie/',                       label: 'apple.com/imovie' },
  'gemini':          { url: 'https://gemini.google.com',                           label: 'gemini.google.com' },
  'chatgpt':         { url: 'https://openai.com/chatgpt',                          label: 'openai.com/chatgpt' },
  'claude':          { url: 'https://claude.ai',                                   label: 'claude.ai' },
  'canva':           { url: 'https://www.canva.com/features/',                     label: 'canva.com/features' },
  'capcut':          { url: 'https://www.capcut.com/features',                     label: 'capcut.com/features' },
  'picsart':         { url: 'https://picsart.com/features/',                       label: 'picsart.com/features' },
  'midjourney':      { url: 'https://docs.midjourney.com',                         label: 'docs.midjourney.com' },
  'final-cut-pro':   { url: 'https://www.apple.com/final-cut-pro/features/',       label: 'apple.com/fcp/features' },
  'affinity':        { url: 'https://affinity.serif.com/en-us/',                   label: 'affinity.serif.com' },
  'figma':           { url: 'https://www.figma.com/features/',                     label: 'figma.com/features' },
  'runway':          { url: 'https://runwayml.com/features',                       label: 'runwayml.com/features' },
  'adobe':           { url: 'https://www.adobe.com/products/firefly.html',         label: 'adobe.com/firefly' },
};

const FEATURE_ROWS = [
  { label: 'Ideate / Agentic', key: 'ideate' },
  { label: 'Creative Editing', key: 'creativeEditing' },
  { label: 'Image Generation', key: 'imageGeneration' },
  { label: 'Video Generation', key: 'videoGeneration' },
] as const;

// ── Shared helpers ─────────────────────────────────────────────────────────

type Support = 'yes' | 'partial' | 'no';

function SupportDot({ value, note }: { value: Support; note?: string }) {
  const map = {
    yes:     { symbol: '✓', color: '#14B8A6', fallback: 'Native support' },
    partial: { symbol: '◐', color: '#F97316', fallback: 'Partial / workaround' },
    no:      { symbol: '✗', color: '#444',    fallback: 'Not available' },
  };
  const { symbol, color, fallback } = map[value];
  return (
    <Tooltip content={note ?? fallback} placement="below">
      <span style={{ color, fontSize: value === 'partial' ? 14 : 16, cursor: 'help' }}>
        {symbol}
      </span>
    </Tooltip>
  );
}

// ── Section 1: Task-based compatibility ────────────────────────────────────

const TASKS = [
  { label: 'Remove background from photo',          key: 'bgRemove' },
  { label: 'Remove object from photo',              key: 'objRemove' },
  { label: 'Generate image from text prompt',       key: 'imageGen' },
  { label: 'Create video from text prompt',         key: 'videoGen' },
  { label: 'Auto-caption a video',                  key: 'captions' },
  { label: 'Generate presentation from text',       key: 'presentation' },
  { label: 'Translate / localize content',          key: 'translate' },
  { label: 'Reformat design for different sizes',   key: 'resize' },
];

type TaskKey = typeof TASKS[number]['key'];

const TASK_SUPPORT: Record<string, Record<TaskKey, { s: Support; note?: string }>> = {
  chatgpt:  {
    bgRemove:     { s: 'partial', note: 'Via image editing in ChatGPT (limited)' },
    objRemove:    { s: 'partial', note: 'Via GPT-4o image editing' },
    imageGen:     { s: 'yes',     note: 'DALL-E 3 / GPT Image 2' },
    videoGen:     { s: 'partial', note: 'Sora available on Plus/Pro' },
    captions:     { s: 'no' },
    presentation: { s: 'yes',     note: 'Generates slide outlines + content natively' },
    translate:    { s: 'yes',     note: 'Text translation natively' },
    resize:       { s: 'no' },
  },
  gemini: {
    bgRemove:     { s: 'partial', note: 'Via Gemini image editing (limited)' },
    objRemove:    { s: 'partial', note: 'Via image editing tools' },
    imageGen:     { s: 'yes',     note: 'Imagen 3 / Gemini Omni' },
    videoGen:     { s: 'partial', note: 'Veo 2 available on AI Ultra' },
    captions:     { s: 'no' },
    presentation: { s: 'yes',     note: 'Google Slides integration' },
    translate:    { s: 'yes',     note: 'Native multilingual support' },
    resize:       { s: 'no' },
  },
  claude: {
    bgRemove:     { s: 'no' },
    objRemove:    { s: 'no' },
    imageGen:     { s: 'no',      note: 'Can describe/analyze images but not generate' },
    videoGen:     { s: 'no' },
    captions:     { s: 'no' },
    presentation: { s: 'yes',     note: 'Generates slide content / outlines' },
    translate:    { s: 'yes',     note: 'Native multilingual' },
    resize:       { s: 'no' },
  },
  canva: {
    bgRemove:     { s: 'yes',     note: 'Magic Eraser / Background Remover' },
    objRemove:    { s: 'yes',     note: 'Magic Eraser' },
    imageGen:     { s: 'yes',     note: 'Magic Media / Canva AI 2.0 Design Model' },
    videoGen:     { s: 'partial', note: 'Text-to-video via Magic Media (limited length)' },
    captions:     { s: 'yes',     note: 'Auto-captions in video editor' },
    presentation: { s: 'yes',     note: 'Magic Design + AI presentation generator' },
    translate:    { s: 'yes',     note: 'Magic Switch / Translate' },
    resize:       { s: 'yes',     note: 'Magic Resize — one-click reformat' },
  },
  capcut: {
    bgRemove:     { s: 'yes',     note: 'Auto-background removal' },
    objRemove:    { s: 'yes',     note: 'Auto Removal tool' },
    imageGen:     { s: 'partial', note: 'AI image generation available but limited' },
    videoGen:     { s: 'yes',     note: 'AI text-to-video, AI avatars' },
    captions:     { s: 'yes',     note: 'Auto Caption — flagship feature' },
    presentation: { s: 'no' },
    translate:    { s: 'yes',     note: 'Auto-translate captions' },
    resize:       { s: 'yes',     note: 'Auto-reframe for different aspect ratios' },
  },
  picsart: {
    bgRemove:     { s: 'yes',     note: 'Background Remover' },
    objRemove:    { s: 'yes',     note: 'Remove tool' },
    imageGen:     { s: 'yes',     note: 'AI image generation' },
    videoGen:     { s: 'no' },
    captions:     { s: 'no' },
    presentation: { s: 'no' },
    translate:    { s: 'no' },
    resize:       { s: 'partial', note: 'Basic resizing tools' },
  },
  midjourney: {
    bgRemove:     { s: 'no' },
    objRemove:    { s: 'partial', note: 'Vary (Region) inpainting' },
    imageGen:     { s: 'yes',     note: 'Core product — V7 model' },
    videoGen:     { s: 'no' },
    captions:     { s: 'no' },
    presentation: { s: 'no' },
    translate:    { s: 'no' },
    resize:       { s: 'partial', note: 'Zoom out / pan tools' },
  },
  figma: {
    bgRemove:     { s: 'partial', note: 'Via plugins (not native AI)' },
    objRemove:    { s: 'no' },
    imageGen:     { s: 'partial', note: 'AI can generate within designs via Figma Agent' },
    videoGen:     { s: 'no' },
    captions:     { s: 'no' },
    presentation: { s: 'partial', note: 'Slides feature, limited AI generation' },
    translate:    { s: 'yes',     note: 'AI Translate (credits)' },
    resize:       { s: 'yes',     note: 'Auto Layout + responsive components' },
  },
  runway: {
    bgRemove:     { s: 'yes',     note: 'Background removal in video' },
    objRemove:    { s: 'yes',     note: 'Inpainting / object removal' },
    imageGen:     { s: 'yes',     note: 'Gen-3 Alpha image generation' },
    videoGen:     { s: 'yes',     note: 'Gen-3 Alpha video — core product. Runway Agent: text to full multi-scene video' },
    captions:     { s: 'no' },
    presentation: { s: 'no' },
    translate:    { s: 'no' },
    resize:       { s: 'no' },
  },
  'final-cut-pro': {
    bgRemove:     { s: 'yes',     note: 'Smart Conform / masking tools' },
    objRemove:    { s: 'partial', note: 'Limited — requires manual masking' },
    imageGen:     { s: 'no' },
    videoGen:     { s: 'no' },
    captions:     { s: 'yes',     note: 'Auto-captions (macOS Ventura+)' },
    presentation: { s: 'no' },
    translate:    { s: 'no' },
    resize:       { s: 'yes',     note: 'Smart Conform for different aspect ratios' },
  },
  adobe: {
    bgRemove:     { s: 'yes',     note: 'Select Subject + Remove Tool / Generative Fill (Photoshop)' },
    objRemove:    { s: 'yes',     note: 'Generative Fill + Content-Aware Fill (Photoshop)' },
    imageGen:     { s: 'yes',     note: 'Firefly Text to Image — 4,000 credits/mo on CC All Apps Students' },
    videoGen:     { s: 'partial', note: 'AI-enhanced editing in Premiere (speech cleanup, auto-reframe) — not text-to-video generation' },
    captions:     { s: 'yes',     note: 'Auto-transcription + captions in Premiere Pro' },
    presentation: { s: 'no' },
    translate:    { s: 'partial', note: 'No native AI translate across suite; limited via Express or third-party plugins' },
    resize:       { s: 'yes',     note: 'Generative Expand (Photoshop); Artboard resize (Illustrator)' },
  },
};

// ── Section 2: Actual spec values ─────────────────────────────────────────

const SPEC_ROWS = [
  { label: 'Free AI credits / mo',     key: 'freeCredits' },
  { label: 'Paid tier credits / mo',   key: 'paidCredits' },
  { label: 'Paid tier price',          key: 'paidPrice' },
  { label: 'Max image output',         key: 'imageRes' },
  { label: 'Video generation',         key: 'videoSupport' },
  { label: 'Certification program',    key: 'cert' },
];

type SpecKey = typeof SPEC_ROWS[number]['key'];

const SPECS: Record<string, Record<SpecKey, string>> = {
  chatgpt:       { freeCredits: 'Limited (rate-capped)', paidCredits: 'Unlimited (Plus)', paidPrice: '$20/mo', imageRes: 'Up to 1792×1024', videoSupport: 'Sora (Plus+)', cert: '—' },
  gemini:        { freeCredits: 'Limited (rate-capped)', paidCredits: 'Unlimited (AI Pro)', paidPrice: '$19.99/mo', imageRes: 'Up to 1:1, 4:3, 16:9', videoSupport: 'Veo 2 (AI Ultra)', cert: '—' },
  claude:        { freeCredits: 'Limited (rate-capped)', paidCredits: 'Unlimited (Pro)', paidPrice: '$20/mo', imageRes: 'N/A (analysis only)', videoSupport: '—', cert: '—' },
  canva:         { freeCredits: '50 / mo', paidCredits: '500 / mo', paidPrice: '$18/mo', imageRes: 'Up to 4096×4096', videoSupport: 'Limited (Magic Media)', cert: 'Canva Certified Creative' },
  capcut:        { freeCredits: '150 / wk (~600/mo)', paidCredits: '1,200 / mo', paidPrice: '$19.99/mo', imageRes: 'Up to 1080p', videoSupport: 'Full — core product', cert: '—' },
  picsart:       { freeCredits: '5 / wk (~20/mo)', paidCredits: '500 / mo', paidPrice: '$10.50/mo', imageRes: 'Up to 4K', videoSupport: '—', cert: '—' },
  midjourney:    { freeCredits: 'None', paidCredits: '~200 images (Basic)', paidPrice: '$10/mo', imageRes: 'Up to 2048×2048', videoSupport: '—', cert: '—' },
  figma:         { freeCredits: '500 / mo', paidCredits: '3,000 / mo (Full seat)', paidPrice: '$12/mo', imageRes: 'N/A (design tool)', videoSupport: '—', cert: 'Figma Certified Professional' },
  runway:        { freeCredits: '125 (one-time)', paidCredits: '625 / mo (Standard)', paidPrice: '$12/mo', imageRes: 'Up to 4K (video)', videoSupport: 'Full — core product. Runway Agent', cert: 'Runway Certified Creator' },
  'final-cut-pro': { freeCredits: 'N/A', paidCredits: 'N/A', paidPrice: '$4.99/mo', imageRes: 'Up to 8K', videoSupport: 'Full — core product', cert: 'Apple Certified Pro' },
  adobe:           { freeCredits: 'None', paidCredits: '4,000/mo (CC All Apps)', paidPrice: '$19.99/mo (students yr 1)', imageRes: 'Up to 4096×4096 (Photoshop/Firefly)', videoSupport: 'AI-enhanced (Premiere) — not text-to-video', cert: 'Adobe Certified Professional' },
};

// ── Section 3: Feature count by category ──────────────────────────────────

type FeatureCat = 'Image Gen' | 'Video Gen' | 'Text & Writing' | 'Editing Tools' | 'Export & Publish';

// Feature names per platform per category — counts are derived from array length
const FEATURE_NAMES: Record<string, Record<FeatureCat, string[]>> = {
  chatgpt: {
    'Image Gen':       ['DALL-E 3', 'GPT Image 2', 'Image editing'],
    'Video Gen':       ['Sora (Plus/Pro)'],
    'Text & Writing':  ['GPT-4o chat', 'Canvas mode', 'Code interpreter', 'File analysis', 'Web search', 'Custom GPTs'],
    'Editing Tools':   ['Image editor', 'Document canvas'],
    'Export & Publish':['Share link'],
  },
  gemini: {
    'Image Gen':       ['Imagen 3', 'Gemini Omni', 'Image editing'],
    'Video Gen':       ['Veo 2 (AI Ultra)'],
    'Text & Writing':  ['Gemini chat', 'Google Docs integration', 'Code generation', 'Web search', 'File analysis'],
    'Editing Tools':   ['Image editing', 'Workspace integration'],
    'Export & Publish':['Google Drive export', 'Share link'],
  },
  claude: {
    'Image Gen':       [],
    'Video Gen':       [],
    'Text & Writing':  ['Long-form writing', 'Code generation', 'Document analysis', 'Research', 'Summarization', 'Multi-turn reasoning'],
    'Editing Tools':   ['Artifacts / canvas'],
    'Export & Publish':['Share conversation'],
  },
  canva: {
    'Image Gen':       ['Magic Media', 'Text to Image', 'AI Photo Filters', 'Canva AI 2.0 Design Model'],
    'Video Gen':       ['Text to Video', 'Magic Animate'],
    'Text & Writing':  ['Magic Write', 'AI Presentation Generator', 'Magic Switch / Translate'],
    'Editing Tools':   ['Magic Eraser', 'Background Remover', 'Magic Expand', 'Magic Edit', 'AI Photo Enhancer', 'Magic Morph'],
    'Export & Publish':['Social publish', 'Meta Ads', 'TikTok Ads', 'LinkedIn Ads', 'Brand Kit'],
  },
  capcut: {
    'Image Gen':       ['AI image generation', 'AI avatars'],
    'Video Gen':       ['Text to video', 'AI Remix', 'Auto Reframe', 'Motion Tracking', 'AI video generation'],
    'Text & Writing':  ['Script generator'],
    'Editing Tools':   ['Auto Caption', 'Auto Removal', 'Background removal', 'Sky replacement', 'Face effects'],
    'Export & Publish':['TikTok direct', 'Instagram direct', 'YouTube direct', 'Watermark removal (Pro)'],
  },
  picsart: {
    'Image Gen':       ['AI image generation', 'Style Transfer', 'Text to Image'],
    'Video Gen':       [],
    'Text & Writing':  [],
    'Editing Tools':   ['Background Remover', 'AI Remove', 'AI Enhance', 'AI Effects'],
    'Export & Publish':['Direct share', 'Download'],
  },
  midjourney: {
    'Image Gen':       ['Text to image (V7)', 'Vary Region', 'Style reference', 'Character reference', '/describe'],
    'Video Gen':       [],
    'Text & Writing':  [],
    'Editing Tools':   ['Vary (Region) inpainting', 'Zoom out / pan'],
    'Export & Publish':['Download'],
  },
  figma: {
    'Image Gen':       ['AI image generation (Figma Agent)', 'Fill with AI'],
    'Video Gen':       [],
    'Text & Writing':  ['AI layer rename', 'AI Autocomplete', 'AI content generation'],
    'Editing Tools':   ['Figma AI Agent', 'Make Designs', 'Dev Mode', 'Auto Layout', 'Prototyping'],
    'Export & Publish':['Developer handoff', 'Share prototype'],
  },
  runway: {
    'Image Gen':       ['Gen-3 Alpha (image)', 'Image to image', 'Reference images'],
    'Video Gen':       ['Gen-3 Alpha (video)', 'Runway Agent', 'Text to video', 'Image to video', 'Video to video', 'Motion Brush'],
    'Text & Writing':  [],
    'Editing Tools':   ['Inpainting', 'Background removal', 'Green screen', 'Color grade'],
    'Export & Publish':['Download', 'Team workspace'],
  },
  'final-cut-pro': {
    'Image Gen':       [],
    'Video Gen':       ['Smart Conform', 'Auto Reframe', 'Scene Removal AI', 'Color analysis', 'Cinematic mode'],
    'Text & Writing':  [],
    'Editing Tools':   ['Auto captions', 'Audio enhancement AI', 'Color wheels', 'Motion effects', 'Object tracker'],
    'Export & Publish':['Compressor export', 'YouTube direct', 'Vimeo direct'],
  },
  adobe: {
    'Image Gen':       ['Firefly Text to Image', 'Generative Fill (Photoshop)', 'Generative Expand', 'Text to Vector (Illustrator)', 'Generative Recolor'],
    'Video Gen':       ['Auto Reframe (Premiere)', 'AI Speech Enhancement', 'Scene Edit Detection'],
    'Text & Writing':  ['AI content generation (Express)'],
    'Editing Tools':   ['Remove Tool', 'Content-Aware Fill', 'Object Selection AI', 'Neural Filters', 'AI Masking', 'Smart Portrait', 'Sky Replacement (Photoshop)'],
    'Export & Publish':['Behance publish', 'Creative Cloud Libraries', 'Adobe Portfolio', 'Multi-format export'],
  },
};

const CAT_COLORS: Record<FeatureCat, string> = {
  'Image Gen':       '#06B6D4',
  'Video Gen':       '#EC4899',
  'Text & Writing':  '#A78BFA',
  'Editing Tools':   '#14B8A6',
  'Export & Publish':'#F59E0B',
};

const CATS = Object.keys(CAT_COLORS) as FeatureCat[];

// ── Shared table cell style ────────────────────────────────────────────────

const TH: React.CSSProperties = {
  padding: '8px 12px',
  fontSize: 11,
  fontWeight: 700,
  color: '#A0A0A0',
  textAlign: 'center',
  borderBottom: '1px solid #333',
  whiteSpace: 'nowrap',
  background: '#1A1A1A',
};

const TD: React.CSSProperties = {
  padding: '7px 12px',
  fontSize: 11,
  color: '#A0A0A0',
  textAlign: 'center',
  borderBottom: '1px solid #222',
};

const TD_LABEL: React.CSSProperties = {
  ...TD,
  textAlign: 'left',
  color: '#C0C0C0',
  fontWeight: 600,
  background: '#1A1A1A',
  position: 'sticky',
  left: 0,
  zIndex: 1,
  borderRight: '1px solid #333',
  whiteSpace: 'nowrap',
};

// ── Page ──────────────────────────────────────────────────────────────────

export function FeaturePlayground() {
  const { activeCategories } = useFilter();
  const adobeActive = activeCategories.includes('Professional Tools');
  const filtered = [
    ...(adobeActive ? [ADOBE_FEATURE_STUB as typeof competitors[0]] : []),
    ...competitors.filter(c => activeCategories.includes(c.category) && TASK_SUPPORT[c.id]),
  ];

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#fff' }}>Feature Overview Playground</h1>
      <p style={{ color: '#A0A0A0', fontSize: 13, marginBottom: 8 }}>
        Three experimental approaches to showing features more objectively than the current symbol matrix.
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          'Idea 1: Feature count by category — how deep is each platform?',
          'Idea 2: Task-based compatibility — can it do specific real-world tasks?',
          'Idea 3: Actual spec values — numbers instead of symbols',
        ].map(l => (
          <span key={l} style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 3, background: '#1e1e1e', border: '1px solid #3a3a3a', color: '#555', fontSize: 10, fontWeight: 500 }}>
            {l}
          </span>
        ))}
      </div>

      {/* ── Current matrix ── */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Current approach</span>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '4px 0 2px' }}>Feature Matrix</h2>
          <p style={{ color: '#555', fontSize: 12, margin: 0 }}>Moved from Core Value Props. Symbol-based — see ideas below for alternatives.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          {[
            { symbol: '✓', color: '#14B8A6', label: 'Available' },
            { symbol: '◐', color: '#F97316', label: 'Partial / specific feature' },
            { symbol: '✗', color: '#555',    label: 'Not available' },
          ].map(({ symbol, color, label }) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#A0A0A0' }}>
              <span style={{ color, fontSize: 16 }}>{symbol}</span> {label}
            </span>
          ))}
        </div>
        <div className="scrollable-table">
          <table style={{ minWidth: filtered.length * 130 + 180 }}>
            <thead>
              <tr>
                <th style={{ minWidth: 180, background: '#1A1A1A', position: 'sticky', left: 0, zIndex: 2, borderRight: '1px solid #333' }}>
                  Feature
                </th>
                {filtered.map(c => (
                  <th key={c.id} style={{ minWidth: 120, color: '#fff', fontSize: 12, fontWeight: 700 }}>
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURE_ROWS.map(row => (
                <tr key={row.key}>
                  <td style={{ color: '#A0A0A0', fontSize: 12, background: '#1A1A1A', position: 'sticky', left: 0, zIndex: 1, borderRight: '1px solid #333', fontWeight: 600 }}>
                    {row.label}
                  </td>
                  {filtered.map(c => (
                    <td key={c.id} style={{ textAlign: 'center' }}>
                      <CapabilityDot value={c.aiFeatures[row.key]} partial />
                    </td>
                  ))}
                </tr>
              ))}
              {[
                { label: 'Certification', getValue: (c: typeof filtered[0]) => c.experience.certification, placement: 'above' as const },
                { label: 'Student Offer', getValue: (c: typeof filtered[0]) => c.pricing.studentPrice ?? false, placement: 'above' as const },
              ].map(row => (
                <tr key={row.label}>
                  <td style={{ color: '#A0A0A0', fontSize: 12, background: '#1A1A1A', position: 'sticky', left: 0, zIndex: 1, borderRight: '1px solid #333', fontWeight: 600 }}>
                    {row.label}
                  </td>
                  {filtered.map(c => (
                    <td key={c.id} style={{ textAlign: 'center' }}>
                      <CapabilityDot value={row.getValue(c) as boolean | string} placement={row.placement ?? 'below'} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td style={{ color: '#444', fontSize: 10, background: '#1A1A1A', position: 'sticky', left: 0, zIndex: 1, borderRight: '1px solid #333', borderTop: '1px solid #333', fontWeight: 600, paddingTop: 8 }}>
                  Source
                </td>
                {filtered.map(c => {
                  const src = FEATURE_SOURCES[c.id];
                  return (
                    <td key={c.id} style={{ textAlign: 'center', borderTop: '1px solid #333', paddingTop: 8 }}>
                      {src ? (
                        <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '1px 5px', borderRadius: 3, background: '#1e1e1e', border: '1px solid #2a2a2a', color: '#555', fontSize: 9, fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                          <ExternalLink size={7} />
                          {src.label}
                        </a>
                      ) : (
                        <span style={{ color: '#C0C0C0', fontSize: 9 }}>—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── Idea 1: Feature count bar chart ── */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#A78BFA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Idea 1</span>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '4px 0 2px' }}>Feature Count by Category</h2>
          <p style={{ color: '#555', fontSize: 12, margin: 0 }}>Number of documented AI features per category — how deep is each platform's toolset?</p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
          {CATS.map(cat => (
            <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: CAT_COLORS[cat], flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: '#A0A0A0' }}>{cat}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map(c => {
            const names = FEATURE_NAMES[c.id];
            if (!names) return null;
            const total = CATS.reduce((sum, cat) => sum + names[cat].length, 0);
            return (
              <div key={c.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                  <div style={{ width: 100, fontSize: 12, color: '#C0C0C0', textAlign: 'right', flexShrink: 0, fontWeight: 600 }}>
                    {c.name}
                  </div>
                  <div style={{ flex: 1, display: 'flex', gap: 3, height: 22 }}>
                    {CATS.map(cat => {
                      const features = names[cat];
                      const count = features.length;
                      if (count === 0) return null;
                      const pct = (count / (total || 1)) * 100;
                      const tooltipContent = (
                        <div>
                          <div style={{ fontWeight: 700, color: CAT_COLORS[cat], marginBottom: 4, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{cat}</div>
                          {features.map(f => (
                            <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                              <span style={{ color: CAT_COLORS[cat], flexShrink: 0 }}>·</span>
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      );
                      return (
                        <Tooltip key={cat} content={tooltipContent} wrapperStyle={{ width: `${pct}%`, flexShrink: 0 }}>
                          <div style={{
                            width: '100%',
                            background: CAT_COLORS[cat],
                            borderRadius: 2,
                            opacity: 0.85,
                            cursor: 'help',
                            height: 22,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            {count > 1 && pct > 8 && (
                              <span style={{ fontSize: 9, fontWeight: 700, color: '#000', opacity: 0.6 }}>{count}</span>
                            )}
                          </div>
                        </Tooltip>
                      );
                    })}
                  </div>
                  <div style={{ width: 52, fontSize: 11, color: '#555', flexShrink: 0, paddingLeft: 8 }}>
                    {total} total
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ color: '#444', fontSize: 11, marginTop: 16, fontStyle: 'italic' }}>
          Feature counts based on publicly documented AI capabilities per platform. Counts reflect breadth, not quality.
        </p>
      </div>
      {/* ── Idea 2: Task compatibility ── */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#EB1000', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Idea 2</span>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '4px 0 2px' }}>Task-Based Compatibility</h2>
          <p style={{ color: '#555', fontSize: 12, margin: 0 }}>Can this platform perform each task natively? Sourced from product docs. Hover ◐ for context.</p>
        </div>
        <div style={{ overflowX: 'auto', border: '1px solid #333', borderRadius: 4 }}>
          <table style={{ borderCollapse: 'collapse', minWidth: '100%' }}>
            <thead>
              <tr>
                <th style={{ ...TH, textAlign: 'left', minWidth: 220 }}>Task</th>
                {filtered.map(c => <th key={c.id} style={TH}>{c.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {TASKS.map(task => (
                <tr key={task.key}>
                  <td style={TD_LABEL}>{task.label}</td>
                  {filtered.map(c => {
                    const entry = TASK_SUPPORT[c.id]?.[task.key];
                    return (
                      <td key={c.id} style={TD}>
                        {entry ? <SupportDot value={entry.s} note={entry.note} /> : <span style={{ color: '#C0C0C0' }}>—</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td style={{ ...TD_LABEL, fontSize: 10, color: '#444' }}>Legend</td>
                <td colSpan={filtered.length} style={{ ...TD, textAlign: 'left', fontSize: 10, color: '#555' }}>
                  <span style={{ color: '#14B8A6' }}>✓</span> Native support &nbsp;·&nbsp;
                  <span style={{ color: '#F97316' }}>◐</span> Partial / workaround &nbsp;·&nbsp;
                  <span style={{ color: '#444' }}>✗</span> Not available
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── Idea 3: Spec values ── */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#06B6D4', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Idea 3</span>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '4px 0 2px' }}>Actual Spec Values</h2>
          <p style={{ color: '#555', fontSize: 12, margin: 0 }}>Real numbers and values instead of ✓ / ◐ / ✗ symbols.</p>
        </div>
        <div style={{ overflowX: 'auto', border: '1px solid #333', borderRadius: 4 }}>
          <table style={{ borderCollapse: 'collapse', minWidth: '100%' }}>
            <thead>
              <tr>
                <th style={{ ...TH, textAlign: 'left', minWidth: 180 }}>Spec</th>
                {filtered.map(c => <th key={c.id} style={TH}>{c.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {SPEC_ROWS.map(row => (
                <tr key={row.key}>
                  <td style={TD_LABEL}>{row.label}</td>
                  {filtered.map(c => {
                    const val = SPECS[c.id]?.[row.key];
                    const isEmpty = !val || val === '—';
                    return (
                      <td key={c.id} style={{ ...TD, fontSize: 10, color: isEmpty ? '#333333' : '#C0C0C0' }}>
                        {val ?? '—'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
