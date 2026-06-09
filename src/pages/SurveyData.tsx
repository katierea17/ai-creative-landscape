// ── Gen AI Survey Data ─────────────────────────────────────────────────────
// GenAI Tracker · Q2 2026 · n=128 · US students 18-24

interface BarRow { label: string; value: number; color: string; }

function HBarChart({ rows, unit = '%', source }: { rows: BarRow[]; unit?: string; source?: string }) {
  const max = Math.max(...rows.map(r => r.value));
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 210, fontSize: 11, color: '#B0B0B0', textAlign: 'right', flexShrink: 0, lineHeight: 1.3 }}>
              {row.label}
            </div>
            <div style={{ flex: 1, background: '#2a2a2a', borderRadius: 2, height: 18, overflow: 'hidden' }}>
              <div style={{ width: `${(row.value / max) * 100}%`, height: '100%', background: row.color, opacity: 0.85, borderRadius: 2 }} />
            </div>
            <div style={{ width: 38, fontSize: 12, fontWeight: 700, color: row.color, flexShrink: 0 }}>
              {row.value}{unit}
            </div>
          </div>
        ))}
      </div>
      {source && (
        <div style={{ marginTop: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 3, background: '#1e1e1e', border: '1px solid #2a2a2a', color: '#444', fontSize: 10, fontWeight: 500 }}>
            {source}
          </span>
        </div>
      )}
    </div>
  );
}

function QCard({ qNum, question, note, color, children }: {
  qNum: string; question: string; note?: string; color: string; children: React.ReactNode;
}) {
  return (
    <div style={{ background: '#1e1e1e', border: '1px solid #333', borderTop: `3px solid ${color}`, borderRadius: 4, padding: '20px 24px', marginBottom: 20 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color, background: `${color}18`, border: `1px solid ${color}40`, padding: '2px 8px', borderRadius: 3, flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {qNum}
        </span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>{question}</div>
          {note && <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{note}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}

// ── Q2: Tools used in past 3 months ──────────────────────────────────────
const Q2_COLOR = '#06B6D4';
const Q2: BarRow[] = [
  { label: 'Canva',            value: 72, color: Q2_COLOR },
  { label: 'ChatGPT',          value: 67, color: Q2_COLOR },
  { label: 'CapCut',           value: 59, color: Q2_COLOR },
  { label: 'Gemini',           value: 42, color: Q2_COLOR },
  { label: 'Picsart',          value: 40, color: Q2_COLOR },
  { label: 'Adobe Photoshop',  value: 38, color: Q2_COLOR },
  { label: 'Google Photos',    value: 32, color: Q2_COLOR },
  { label: 'Instagram Edits',  value: 30, color: Q2_COLOR },
  { label: 'Adobe Express',    value: 21, color: Q2_COLOR },
  { label: 'Claude',           value: 20, color: Q2_COLOR },
  { label: 'Adobe Premiere',   value: 17, color: Q2_COLOR },
  { label: 'Final Cut Pro',    value: 16, color: Q2_COLOR },
  { label: 'Adobe Firefly',    value: 13, color: Q2_COLOR },
  { label: 'Figma',            value:  9, color: Q2_COLOR },
  { label: 'DaVinci Resolve',  value:  7, color: Q2_COLOR },
  { label: 'Midjourney',       value:  5, color: Q2_COLOR },
  { label: 'Runway',           value:  5, color: Q2_COLOR },
];

// ── Q3: Tools used most ───────────────────────────────────────────────────
const Q3_COLOR = '#14B8A6';
const Q3: BarRow[] = [
  { label: 'Canva',            value: 48, color: Q3_COLOR },
  { label: 'ChatGPT',          value: 47, color: Q3_COLOR },
  { label: 'CapCut',           value: 39, color: Q3_COLOR },
  { label: 'Gemini',           value: 22, color: Q3_COLOR },
  { label: 'Picsart',          value: 20, color: Q3_COLOR },
  { label: 'Google Photos',    value: 16, color: Q3_COLOR },
  { label: 'Adobe Photoshop',  value: 12, color: Q3_COLOR },
  { label: 'Adobe Express',    value:  9, color: Q3_COLOR },
  { label: 'Instagram Edits',  value:  9, color: Q3_COLOR },
  { label: 'Claude',           value:  8, color: Q3_COLOR },
  { label: 'Adobe Premiere',   value:  7, color: Q3_COLOR },
  { label: 'Final Cut Pro',    value:  7, color: Q3_COLOR },
  { label: 'DaVinci Resolve',  value:  6, color: Q3_COLOR },
  { label: 'Adobe Firefly',    value:  5, color: Q3_COLOR },
  { label: 'Runway',           value:  3, color: Q3_COLOR },
  { label: 'Figma',            value:  2, color: Q3_COLOR },
];

// ── Q4: Context for AI creative tools ────────────────────────────────────
const Q4_COLOR = '#EB1000';
const Q4: BarRow[] = [
  { label: 'Schoolwork / class assignments',  value: 47, color: Q4_COLOR },
  { label: 'Personal creative projects',      value: 24, color: Q4_COLOR },
  { label: 'Social media content',            value: 15, color: Q4_COLOR },
  { label: 'Portfolio / professional work',   value: 14, color: Q4_COLOR },
];

// ── Q5: How much creative work uses AI ───────────────────────────────────
const Q5_COLOR = '#F97316';
const Q5: BarRow[] = [
  { label: '11–50%',   value: 48, color: Q5_COLOR },
  { label: '0–10%',    value: 29, color: Q5_COLOR },
  { label: '51–75%',   value: 21, color: Q5_COLOR },
  { label: '76–100%',  value:  2, color: Q5_COLOR },
];

// ── Q6: Tools used solely/primarily for AI ───────────────────────────────
const Q6_COLOR = '#EC4899';
const Q6: BarRow[] = [
  { label: 'ChatGPT',          value: 53, color: Q6_COLOR },
  { label: 'Gemini',           value: 35, color: Q6_COLOR },
  { label: 'Canva',            value: 26, color: Q6_COLOR },
  { label: 'CapCut',           value: 26, color: Q6_COLOR },
  { label: 'Claude',           value: 15, color: Q6_COLOR },
  { label: 'Picsart',          value: 14, color: Q6_COLOR },
  { label: 'Google Photos',    value: 14, color: Q6_COLOR },
  { label: 'Adobe Photoshop',  value: 13, color: Q6_COLOR },
  { label: 'Adobe Express',    value: 10, color: Q6_COLOR },
  { label: 'Adobe Premiere',   value:  9, color: Q6_COLOR },
  { label: 'Final Cut Pro',    value:  8, color: Q6_COLOR },
  { label: 'Instagram Edits',  value:  7, color: Q6_COLOR },
  { label: 'Adobe Firefly',    value:  5, color: Q6_COLOR },
  { label: 'DaVinci Resolve',  value:  5, color: Q6_COLOR },
  { label: 'Runway',           value:  3, color: Q6_COLOR },
  { label: 'Figma',            value:  3, color: Q6_COLOR },
  { label: 'Midjourney',       value:  2, color: Q6_COLOR },
];

// ── Q7: Best overall for AI creativity ───────────────────────────────────
const Q7_COLOR = '#A78BFA';
const Q7: BarRow[] = [
  { label: 'ChatGPT',               value: 38, color: Q7_COLOR },
  { label: 'Canva',                 value: 13, color: Q7_COLOR },
  { label: 'Gemini',                value: 10, color: Q7_COLOR },
  { label: 'CapCut',                value:  7, color: Q7_COLOR },
  { label: 'Claude',                value:  6, color: Q7_COLOR },
  { label: 'Adobe Photoshop',       value:  5, color: Q7_COLOR },
  { label: 'Other',                 value:  4, color: Q7_COLOR },
  { label: 'Adobe Firefly',         value:  3, color: Q7_COLOR },
  { label: 'Adobe Premiere',        value:  3, color: Q7_COLOR },
  { label: 'Another Adobe product', value:  2, color: Q7_COLOR },
  { label: 'Adobe Express',         value:  2, color: Q7_COLOR },
  { label: 'Figma',                 value:  2, color: Q7_COLOR },
  { label: 'Final Cut Pro',         value:  2, color: Q7_COLOR },
  { label: 'Picsart',               value:  2, color: Q7_COLOR },
];

// ── Q9: Too expensive ─────────────────────────────────────────────────────
const Q9_COLOR = '#F97316';
const Q9: BarRow[] = [
  { label: 'Adobe Premiere',   value: 23, color: Q9_COLOR },
  { label: 'Adobe Photoshop',  value: 19, color: Q9_COLOR },
  { label: 'Adobe Express',    value: 18, color: Q9_COLOR },
  { label: 'ChatGPT',          value: 16, color: Q9_COLOR },
  { label: 'Final Cut Pro',    value: 16, color: Q9_COLOR },
  { label: 'CapCut',           value: 13, color: Q9_COLOR },
  { label: 'Picsart',          value: 13, color: Q9_COLOR },
  { label: 'Adobe Illustrator',value: 12, color: Q9_COLOR },
  { label: 'Gemini',           value: 11, color: Q9_COLOR },
  { label: 'Claude',           value:  9, color: Q9_COLOR },
  { label: 'DaVinci Resolve',  value:  9, color: Q9_COLOR },
  { label: 'Adobe Firefly',    value:  9, color: Q9_COLOR },
  { label: 'Canva',            value:  7, color: Q9_COLOR },
  { label: 'Midjourney',       value:  6, color: Q9_COLOR },
  { label: 'Google Photos',    value:  6, color: Q9_COLOR },
  { label: 'Figma',            value:  5, color: Q9_COLOR },
  { label: 'Instagram Edits',  value:  5, color: Q9_COLOR },
  { label: 'Runway',           value:  4, color: Q9_COLOR },
];

// ── Page ──────────────────────────────────────────────────────────────────

export function SurveyData() {
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#fff' }}>Gen AI Survey Data</h1>
      <p style={{ color: '#A0A0A0', fontSize: 13, marginBottom: 24 }}>
        GenAI Tracker · Q2 2026 · n=128 · US students 18–24 considering a paid creative tool
      </p>

      <QCard qNum="Q2" question="Which tools or platforms have you used for creative endeavors in the past 3 months?" note="Select all that apply · n=128" color={Q2_COLOR}>
        <HBarChart rows={Q2} source="Q2 · GenAI Tracker n=128, May 2026" />
      </QCard>

      <QCard qNum="Q3" question="Which tools or platforms do you use the most?" note="Select up to 3 · n=128" color={Q3_COLOR}>
        <HBarChart rows={Q3} source="Q3 · GenAI Tracker n=128, May 2026" />
      </QCard>

      <QCard qNum="Q4" question="In what context do you use AI-powered creative tools the most?" note="Ranked — % who ranked each option #1 · n=128" color={Q4_COLOR}>
        <HBarChart rows={Q4} source="Q4 · GenAI Tracker n=128, May 2026" />
      </QCard>

      <QCard qNum="Q5" question="About how much of your creative work uses built-in AI tools?" note="Single select · n=128" color={Q5_COLOR}>
        <HBarChart rows={Q5} source="Q5 · GenAI Tracker n=128, May 2026" />
      </QCard>

      <QCard qNum="Q6" question="Of the creative tools you use, which (if any) do you use solely or primarily for its AI functionality?" note="Select all that apply · n=128" color={Q6_COLOR}>
        <HBarChart rows={Q6} source="Q6 · GenAI Tracker n=128, May 2026" />
      </QCard>

      <QCard qNum="Q7" question='Which ONE platform do you currently think is "the best overall" for AI-powered creativity?' note="Single select · n=128" color={Q7_COLOR}>
        <HBarChart rows={Q7} source="Q7 · GenAI Tracker n=128, May 2026" />
      </QCard>

      {/* ── Open-ended responses ─────────────────────────────────────── */}
      <OECard
        qNum="Q8"
        question="What makes this platform stand out to you?"
        note="Open-ended · n=128 · follows Q7 best-overall selection"
        color="#F59E0B"
        themes={[
          { label: 'Ease of use & accessibility', summary: 'The dominant theme across all platforms. Nearly every substantive positive response cited simplicity, intuitive design, or ease of access — for Canva, CapCut, ChatGPT, and Adobe alike. "User friendly," "easy to understand," and "accessible" appeared in the majority of responses.' },
          { label: 'Prompt accuracy', summary: 'ChatGPT praised for understanding prompts clearly and producing accurate results "90% of the time." Claude specifically noted for deeper, more thoughtful responses — "takes longer but gives a clean-cut and flawless answer." Gemini called out for its ability to analyze examples and generate similar designs.' },
          { label: 'Versatility & range', summary: 'Canva cited repeatedly for multipurpose use: resume, cover letter, presentations, planners, social media — all in one place. ChatGPT valued for spanning homework, brainstorming, scheduling, and image generation. Adobe praised for professional depth. Gemini highlighted as a "collaborative partner" across tasks.' },
          { label: 'Free access as a signal of trust', summary: 'Free tier availability was a meaningful positive signal — not just a cost benefit. Students who could use a platform for free viewed it more favorably overall. CapCut and ChatGPT free tier specifically praised. Platforms where free versions met student needs were seen as more generous and trustworthy.' },
        ]}
        quotes={[
          { platform: 'ChatGPT', text: 'The images and art it creates are very specific and detailed. It can be a pigeon with a funny hat standing next to Bugs Bunny — it will make the image look good and polished while still being accurate to the idea.' },
          { platform: 'Canva', text: 'Canva stands out because it has multipurpose usages. I created a resume, a CV, a cover letter, and a presentation for my class using it. I am also working on a planner using it.' },
        ]}
        source="Q8 · GenAI Tracker n=128, May 2026"
      />

      <QCard qNum="Q9" question="Which platforms feel TOO EXPENSIVE for the AI features they offer?" note="Select up to 3 · n=128" color={Q9_COLOR}>
        <HBarChart rows={Q9} source="Q9 · GenAI Tracker n=128, May 2026" />
      </QCard>

      <OECard
        qNum="Q10"
        question="What makes it feel too expensive?"
        note="Open-ended · follows Q9 too-expensive selections · n=128"
        color="#EB1000"
        themes={[
          { label: 'Free alternatives undercut paid', summary: 'The clearest and most common theme across all 137 responses. Students consistently measured paid tools against free competitors — "cheaper or free apps offer the same and better," "I can get similar features on other apps for less." The availability of capable free tools made any paid tier feel harder to justify.' },
          { label: 'Value-feature mismatch', summary: '"Too expensive for the lack of things you can do." Features offered at paid tiers were often available free elsewhere, and AI add-ons were seen as incremental rather than transformative. "I think the commonality with all three is that their features can easily be found elsewhere — asking too much while providing too little."' },
          { label: 'Student affordability gap', summary: 'Multiple respondents called out the absence of student-specific pricing: "lack of plans targeted for students, also lack of good step payment plans." Monthly fees felt disproportionate for students already managing tuition and stacked subscriptions. "I already pay for subscriptions and I can\'t afford to add another one."' },
          { label: 'Subscription fatigue', summary: 'The subscription model itself — not just the price — generated friction. "I don\'t like platforms that push subscription — it demotivates the point of using the tool." Respondents also flagged frustration with features being locked behind tiers that weren\'t the primary reason they were using the app.' },
        ]}
        quotes={[
          { platform: 'Claude · Adobe Express · DaVinci Resolve', text: 'You don\'t get a lot for what you pay when cheaper, more accessible apps offer the same and better.' },
          { platform: 'Canva · Adobe', text: 'Their pricing is quite high for students or design beginners. Monthly subscription fees feel expensive when used solely for basic or personal needs.' },
        ]}
        source="Q10 · GenAI Tracker n=128, May 2026"
      />

      <OECard
        qNum="Q11"
        question="What's one AI creative tool or feature that impressed you recently — and why?"
        note="Open-ended · n=128"
        color="#14B8A6"
        themes={[
          { label: 'Background removal & content-aware fill', summary: 'The most frequently cited impressive feature category across the full dataset. Canva Magic Expand, Adobe content-aware fill, Google Photos eraser, and general "removing unwanted things from photos" appeared across dozens of responses. The common thread: AI doing in seconds what used to require significant skill or time.' },
          { label: 'ChatGPT image generation', summary: 'ChatGPT\'s image creation was a standout for many respondents — impressed by speed, prompt-to-image accuracy, and realism. "I thought it was impressive how little time it takes to generate a picture off of just one sentence." Primarily discovered via social media, especially TikTok.' },
          { label: 'Claude\'s honesty & self-awareness', summary: 'Claude was specifically praised for behaving differently from other AI: "Actually feels like it thinks before answering a question." Multiple respondents contrasted Claude favorably against tools that "just say yes to everything." Word-of-mouth — friends and classmates — was the primary discovery channel for Claude.' },
          { label: 'AI video & auto captions', summary: 'Google VideoFX ("highly cinematic 1080p video clips from simple text prompts"), CapCut\'s AI edit feature ("type in what effect you want and it interpolates it"), and auto-captioning (CapCut, Canva, DaVinci Resolve) all generated strong impressions among video-focused users.' },
          { label: 'Peer & social discovery', summary: 'TikTok and word-of-mouth from classmates and friends were the dominant discovery channels across all platforms: "I saw it on TikTok," "my classmate showed me," "I heard about it from a friend," "a professor encouraged us to use it." Organic social discovery drives first use.' },
        ]}
        quotes={[
          { platform: 'Adobe Firefly', text: 'Adobe Firefly made me some of the best visual art I had seen and it was relatively cheap.' },
        ]}
        source="Q11 · GenAI Tracker n=128, May 2026"
      />
    </div>
  );
}

// ── Open-ended question card component ────────────────────────────────────
function OECard({ qNum, question, note, color, themes, quotes, source }: {
  qNum: string;
  question: string;
  note?: string;
  color: string;
  themes: { label: string; summary: string }[];
  quotes: { platform: string; text: string }[];
  source: string;
}) {
  return (
    <QCard qNum={qNum} question={question} note={note} color={color}>
      {/* Curated themes */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Key Themes
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {themes.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 5 }} />
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#D0D0D0' }}>{t.label} — </span>
                <span style={{ fontSize: 12, color: '#808080', lineHeight: 1.6 }}>{t.summary}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verbatim quotes */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Verbatim Responses
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {quotes.map((q, i) => (
            <div key={i} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 3, padding: '10px 12px' }}>
              <div style={{ fontSize: 18, color: color, opacity: 0.4, lineHeight: 1, marginBottom: 4, fontFamily: 'Georgia, serif' }}>"</div>
              <p style={{ fontSize: 12, color: '#A0A0A0', margin: 0, lineHeight: 1.6, fontStyle: 'italic' }}>{q.text}</p>
              {q.platform && (
                <div style={{ marginTop: 8 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#555', background: '#111', padding: '1px 6px', borderRadius: 3 }}>
                    re: {q.platform}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Source */}
      <div style={{ marginTop: 14 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 3, background: '#1e1e1e', border: '1px solid #2a2a2a', color: '#444', fontSize: 10, fontWeight: 500 }}>
          {source}
        </span>
      </div>
    </QCard>
  );
}
