import { useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────

interface QuoteItem { text: string; source: string; }

interface FindingItem {
  rank: number;
  headline: string;
  finding: string | string[];
  adobeImplication: string | string[];
  quotes: QuoteItem[];
  studyLabel: string;
}

interface TopicItem {
  label: string;
  total: number;
  descriptor: string;
  study: 'credits' | 'creativity';
}

// ── Data — Top 5 Findings ────────────────────────────────────────────────

const FINDINGS: FindingItem[] = [
  {
    rank: 1,
    headline: 'This week: student sentiment shifted from "AI as values debate" to "AI as workflow intrusion"',
    finding: [
      'AI features in Adobe tools called out directly as annoying, intrusive, and unprofessional — the clearest student-specific signal this week, showing up in Illustrator and InDesign NPS',
      'Price/value switching intent rising: CC cost increasingly benchmarked against simpler, faster AI-first tools — not just cheaper suites',
      '"AI as learning accelerator" still present but less dominant than prior weeks',
      'Stable: students still accept AI for pipeline and grunt-work tasks; "taste and judgment matter" narrative holds',
    ],
    adobeImplication: [
      'Students naming AI features as intrusive won\'t respond to capability messaging — the opening is opt-in control (AI out of the way until invoked)',
      'The competitive comparison has shifted from price to cognitive load — a different frame that current CC positioning doesn\'t address',
      'Portfolio transparency ("show what was AI vs. yours") is an emerging student need no tool currently owns',
    ],
    quotes: [
      { text: 'removal of AI features. Theyre annoying and intrusive to my workflow, and I never want or plan on using them.', source: 'NPS Survey · InDesign · United States · May 31, 2026' },
      { text: 'Stop pushing the generative AI! I will never recommend a program that obsessively tries to get me to use AI! Other than that it\'s great and I would absolutely recommend to my friends if the AI was less prominent, or in a perfect world, not a part of the program at all.', source: 'NPS Survey · Premiere Pro · United States · Jun 6, 2026' },
      { text: 'Difficult to recommend to new users to be honest, as the usage of photoshop is very complicated to learn where there are many new AI tools nowadays, ppl don\'t afford to spend so much time to learn how to use photoshop if AI tools can help them.', source: 'NPS Survey · Photoshop · Australia/New Zealand · Jun 4, 2026' },
    ],
    studyLabel: 'TAO Weekly · week-over-week shift · Jun 2–8, 2026',
  },
  {
    rank: 2,
    headline: 'AI threatens the "why" of creative work — not just the how',
    finding: 'The most-discussed topic across both studies. The core creativity anxiety isn\'t about tools or features — it\'s about meaning. Students fear AI outputs "replicate at scale" rather than generate something new, flattening originality and making creative culture feel like "slop." Many accept AI for production tasks (cleanup, ideation, drafts) but resist it on anything that touches authorship, process, or personal style.',
    adobeImplication: "Adobe's framing of Firefly as ethically trained and commercially safe addresses copyright concerns but not the deeper anxiety about authenticity. Student messaging that positions AI as a starting point the human directs — not a finishing point — would resonate more than capability-first messaging.",
    quotes: [
      { text: 'Critical Thinking Skills are a major part of what makes an artist an Artist, and giving people too easy a way to "do art" without understanding why it\'s considered Art will weaken the industry as a whole.', source: 'NPS Survey · Illustrator · United States · Mar 2026' },
      { text: 'What if we don\'t have to choose between AI and Humans... I think the truth and future is way more nuanced. What if the truth lies somewhere in the middle?', source: 'Reddit · r/generativeAI · Mar 2026' },
      { text: 'There needs to be an AI-free subscription model so people aren\'t paying more in order to lose their jobs.', source: 'NPS Survey · InDesign · United States · May 2026' },
    ],
    studyLabel: 'Both studies · 83 mentions',
  },
  {
    rank: 3,
    headline: 'The credit model reads as a tax on learning',
    finding: 'The second most-discussed topic across both studies. Students describe being "double charged" — paying a subscription and then being metered per AI generation. For learners who iterate constantly, credits run out fast and create anxiety rather than creative freedom. Non-rollover credits compound the frustration — students with project-based, irregular usage patterns lose whatever they didn\'t spend each month.',
    adobeImplication: 'CC for Students has a real opening to differentiate by offering credit transparency and a student experience sized for iteration — or framing what each plan\'s credits actually cover in plain language. Being the clearest subscription on cost-per-action would address the single biggest pain point in this data.',
    quotes: [
      { text: 'I accept different levels of credits at higher price points, but for the credits not to roll over is unacceptable. I\'m so unhappy about this decision I\'m thinking of choosing different software after having used Adobe for almost 30 years.', source: 'NPS Survey · Lightroom · Canada · Apr 2026' },
      { text: 'Make better, more affordable options for students. The AI capabilities are below average yet pushed into every product and make the service more expensive even if you don\'t use them.', source: 'NPS Survey · Illustrator · Eastern Europe · Feb 2026' },
      { text: 'Is there an alternative AI program for image/video that doesn\'t require you to buy credits? Getting into learning about how to make AI videos and every site has the same business model. That is ridiculous — having to purchase credits to use the system.', source: 'Reddit · r/artificial · May 2026' },
    ],
    studyLabel: 'AI Credits & Tokens study · ~58 mentions',
  },
  {
    rank: 4,
    headline: 'Entry-level creative careers already feel threatened',
    finding: 'Students and early-career creatives describe strong anxiety about job displacement — illustration, design, and production tasks that can now be generated cheaply. Several note a split forming: "verified human-made" work becoming a niche premium while production roles shrink. Critically, 0 of 41 mentions were positive — the highest-consensus-negative topic in the dataset.',
    adobeImplication: 'Messaging that frames Creative Cloud as building real, lasting skills — not shortcuts — could be a direct differentiator from pure-AI tools. The argument that human creative skill makes you a better director of AI tools is both true and actionable as student positioning.',
    quotes: [
      { text: 'Is it genuinely impossible to become a graphic designer without using genAI now? I find myself more and more discouraged with the current state of the industry.', source: 'Reddit · r/graphic_design · Apr 2026' },
      { text: 'In almost a few years AI will replace/can do at least 60–70% of the designers\' work. Social media design is over. Illustrators are out of the game already.', source: 'Discord · Illustrator · #chat · Apr 2026' },
      { text: 'The problem isn\'t AI, but how companies value creativity. I\'ve been feeling the pressure of AI and feeling down lately because of the constant bullying of those whose talents are being reproduced. It\'s tiring to think about.', source: 'Reddit · r/graphic_design · May 2026' },
    ],
    studyLabel: 'GenAI & Creativity study · 41 mentions',
  },
];

// ── Data — All Topics (sorted by mention count) ──────────────────────────

// Topics already featured in the carousel, or covered by a carousel finding, are excluded here
const ALL_TOPICS: TopicItem[] = [
  { label: 'Ethical, Legal & Environmental',         total: 21, study: 'creativity', descriptor: 'Copyright, training data consent, environmental impact, and fear of work being used for model training without consent' },
  { label: 'AI in Education & Skill Development',    total: 17, study: 'creativity', descriptor: 'AI removes the productive struggle that builds real creative skill; concerns about cognitive offloading and weakened independent problem-solving' },
  { label: 'AI Video Generation & Credits',          total: 15, study: 'credits',    descriptor: 'Image generation costs 1 credit; video can cost hundreds — the gap is not surfaced before generation begins' },
  { label: 'AI Quality, Limitations & Access',       total: 7,  study: 'creativity', descriptor: 'Unreliable on complex detail; floods channels with low-quality content' },
  { label: 'Distinction Between AI Tool Types',      total: 4,  study: 'credits',    descriptor: 'Confusion about which features consume credits vs. standard tooling' },
  { label: 'AI in Specific Creative Domains',        total: 3,  study: 'creativity', descriptor: 'Norms vary by field; game dev and visual arts are most resistant' },
  { label: 'AI Integration & Software Performance',  total: 3,  study: 'credits',    descriptor: 'AI features making software slower and harder to run on student machines' },
];

// ── Shared Components ────────────────────────────────────────────────────

function SourceChip({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px', borderRadius: 3,
      background: '#f0f0f0', border: '1px solid #e0e0e0',
      color: '#111111', fontSize: 10, fontWeight: 500,
    }}>
      {label}
    </span>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '40px 0 20px' }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#111111', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: '#e0e0e0' }} />
    </div>
  );
}

// ── Findings Carousel ────────────────────────────────────────────────────

function FindingsCarousel({ items }: { items: FindingItem[] }) {
  const [idx, setIdx] = useState(0);
  const item = items[idx];

  return (
    <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', minHeight: 580 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#EB1000', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
        Top Findings — What Students Are Saying About AI
      </div>

      <div style={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 4, overflow: 'hidden', background: '#ffffff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: item.quotes.length > 0 ? '3fr 2fr' : '1fr' }}>

          {/* Left: finding + implication */}
          <div style={{ padding: '20px 24px', borderRight: item.quotes.length > 0 ? '1px solid #e8e8e8' : 'none', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#EB1000', background: '#EB100010', border: '1px solid #EB100030', padding: '2px 8px', borderRadius: 3 }}>
                Finding #{item.rank}
              </span>
              <span style={{ fontSize: 10, color: '#111111' }}>{item.studyLabel}</span>
            </div>

            <p style={{ fontSize: 16, fontWeight: 700, color: '#111111', margin: '0 0 12px', lineHeight: 1.35 }}>
              {item.headline}
            </p>

            <div style={{ paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid #f0f0f0' }}>
              {Array.isArray(item.finding) ? (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {item.finding.map((point, i) => (
                    <li key={i} style={{ fontSize: 13, color: '#111111', lineHeight: 1.55, display: 'flex', gap: 8 }}>
                      <span style={{ color: '#EB1000', flexShrink: 0, marginTop: 1 }}>•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: 13, color: '#111111', margin: 0, lineHeight: 1.6 }}>{item.finding}</p>
              )}
            </div>

            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
                Implication for CC Students
              </div>
              {Array.isArray(item.adobeImplication) ? (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {item.adobeImplication.map((point, i) => (
                    <li key={i} style={{ fontSize: 13, color: '#111111', lineHeight: 1.55, display: 'flex', gap: 8 }}>
                      <span style={{ color: '#EB1000', flexShrink: 0, marginTop: 1 }}>•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: 13, color: '#111111', margin: 0, lineHeight: 1.6 }}>{item.adobeImplication}</p>
              )}
            </div>
          </div>

          {/* Right: verbatim quotes — only rendered when present */}
          {item.quotes.length > 0 && (
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', background: '#fafafa' }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>
                Selected Verbatim
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {item.quotes.map((q, i) => (
                  <div key={i} style={{
                    paddingBottom: i < item.quotes.length - 1 ? 20 : 0,
                    borderBottom: i < item.quotes.length - 1 ? '1px solid #eeeeee' : 'none',
                  }}>
                    <p style={{ fontSize: 13, color: '#111111', fontStyle: 'italic', lineHeight: 1.75, margin: '0 0 8px' }}>
                      "{q.text}"
                    </p>
                    <span style={{ fontSize: 10, color: '#111111' }}>— {q.source}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <button
          onClick={() => setIdx(i => (i - 1 + items.length) % items.length)}
          style={{ background: 'none', border: '1px solid #e0e0e0', color: '#111111', borderRadius: 3, padding: '4px 14px', cursor: 'pointer', fontSize: 12 }}
        >
          ← Prev
        </button>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {items.map((_, i) => (
            <div
              key={i}
              onClick={() => setIdx(i)}
              style={{ width: 6, height: 6, borderRadius: '50%', background: i === idx ? '#EB1000' : '#dddddd', cursor: 'pointer', transition: 'background 0.15s' }}
            />
          ))}
          <span style={{ fontSize: 10, color: '#111111', marginLeft: 6 }}>{idx + 1} of {items.length}</span>
        </div>
        <button
          onClick={() => setIdx(i => (i + 1) % items.length)}
          style={{ background: 'none', border: '1px solid #e0e0e0', color: '#111111', borderRadius: 3, padding: '4px 14px', cursor: 'pointer', fontSize: 12 }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────

export function CustomerSentiment() {
  return (
    <div style={{ color: '#111111' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#111111' }}>Customer Sentiment</h1>
      <p style={{ fontSize: 13, color: '#111111', marginBottom: 24 }}>
        Student attitudes toward generative AI and creative tools.
      </p>

      {/* ── Section 1: Student Voice ── */}
      <SectionDivider label="Student Voice" />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        <SourceChip label="TAO (Total Analysis of Opinions) · AUP Experience Intelligence · Jun 8, 2026" />
        <SourceChip label="Study 1 · How do students, those in creative fields/majors particularly, feel about generative AI in the context of creativity?" />
        <SourceChip label="Study 2 · What do students think about generative credits or AI credits or AI tokens?" />
        <SourceChip label="Social listening: Reddit, Discord · NPS surveys · App Store reviews" />
      </div>

      {/* Findings carousel */}
      <FindingsCarousel items={FINDINGS} />

      {/* All topics grid */}
      <div style={{ fontSize: 10, fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
        All Other Topics · sorted by mention count
      </div>
      <div style={{ display: 'flex', gap: 12, fontSize: 10, color: '#111111', marginBottom: 14, alignItems: 'center' }}>
        <span><span style={{ color: '#06B6D4', marginRight: 4 }}>■</span>GenAI &amp; Creativity study</span>
        <span><span style={{ color: '#EB1000', marginRight: 4 }}>■</span>AI Credits &amp; Tokens study</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 8 }}>
        {ALL_TOPICS.map(topic => {
          const studyColor = topic.study === 'credits' ? '#EB1000' : '#06B6D4';
          const studyLabel = topic.study === 'credits' ? 'AI Credits' : 'AI & Creativity';
          return (
            <div key={topic.label} style={{
              background: '#ffffff', border: '1px solid #e8e8e8',
              borderLeft: `3px solid ${studyColor}`,
              borderRadius: 3, padding: '10px 12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#111111', lineHeight: 1.3, flex: 1, marginRight: 8 }}>
                  {topic.label}
                </span>
                <span style={{ fontSize: 10, color: '#111111', flexShrink: 0 }}>{topic.total} mentions</span>
              </div>
              <p style={{ fontSize: 11, color: '#111111', margin: '0 0 8px', lineHeight: 1.4 }}>{topic.descriptor}</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{
                  fontSize: 9, color: studyColor,
                  background: `${studyColor}12`, border: `1px solid ${studyColor}25`,
                  padding: '1px 6px', borderRadius: 2,
                }}>{studyLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
