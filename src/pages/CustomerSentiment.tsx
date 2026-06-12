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
    headline: "Student feedback shifted from 'AI is unethical' to 'AI is making Adobe harder and less worth it'",
    finding: [
      "More 'AI change velocity' → teaching/learning friction: AI is creating constant UI/tool changes hard for classes to keep up with, driving student resistance to using Adobe at all — especially in Illustrator",
      "Stronger student linkage of AI to price hikes: recent feedback explicitly attributes subscription pain to AI bundling, with students asking for AI as a paid add-on rather than included in the base plan — more direct than earlier complaints which skewed toward values and switching intent",
      "Sharper product-level dismissal: student language now includes blunt quality criticism (AI 'dumb,' 'wonky,' 'doesn't feel professional') alongside frustration that 'old problems never get solved' while AI ships",
      "Emerging 'Adobe AI is weaker than competitors' framing: newer student feedback frames Adobe's AI quality as behind competing tools — a performance-based evaluation replacing older 'should AI exist at all' critiques",
    ],
    adobeImplication: [
      "The shift from ethics to product experience means responsible-AI messaging won't land — students are now asking 'why is AI making this worse and more expensive,' not 'should AI exist'",
      "Teaching/learning friction from rapid UI changes is an overlooked churn driver: students who can't keep up in class drop the tool, not just the subscription",
      "The AI-cost bundling complaint points to a positioning gap: no competitor currently offers a credible 'AI as opt-in add-on' framing that students are explicitly asking for",
    ],
    quotes: [],
    studyLabel: 'TAO · NPS + social listening · last 30 days vs. prior · directional only',
  },
  {
    rank: 2,
    headline: "Students use AI to unlock ideation and cut 'glue work' — taste and final judgment stay human",
    finding: [
      "Rapid ideation & concept visualization: students use AI to generate directions and moodboards for a concept already in mind — not outsourcing the whole design",
      "Volume at speed: 8 rough concepts for a first meeting instead of 2 — differentiation comes from art direction and refinement after AI exploration",
      "Mockups & comps → rebuild in pro tools: AI for early exploration; finish and refine in Figma or Photoshop for precision and control",
      "Production acceleration for video: generate short clips per scene, assemble in CapCut or Premiere — not one-shot long generations",
      "Small annoying tasks: cleaning notes, summarizing PDFs, rewriting emails — everyday survival that frees bandwidth for actual creative work",
      "In-app learning layer: students want AI that suggests workflows, guides masking, and teaches the software — not just generation",
    ],
    adobeImplication: [
      "The ideation benefit maps directly to Firefly's concept-generation capabilities — but the student frame is 'a starting point I direct,' not 'AI that decides for me'",
      "The tutoring/learning desire is under-served by every platform: an in-app Firefly Coach mode (suggest tools, guide masking, surface shortcuts) would align with how students actually want to learn",
      "Students' preference for iterating at volume maps well to CC's 4,000-credit allotment — but only if surfaced in plain language before students hit a wall",
    ],
    quotes: [
      { text: 'i already had an idea, but i was struggling to visualise it properly', source: 'Reddit · r/graphic_design · Apr 2026' },
      { text: 'showing 8 rough concepts in a first meeting instead of 2', source: 'Reddit · r/CreativeOperations · May 2026' },
      { text: 'it should be used educationally, like Clippy, to teach people about the software', source: 'NPS Survey · Photoshop (beta) · Canada · Mar 2026' },
    ],
    studyLabel: 'TAO Report · Jun 9, 2026',
  },
  {
    rank: 3,
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
    rank: 4,
    headline: 'Adobe is named as the execution layer — where AI-generated work gets finished and made professional',
    finding: [
      'Students describe a consistent two-step pipeline: AI tools (Midjourney, Runway, ChatGPT) generate the raw material; Adobe tools (Photoshop, Premiere, Illustrator) do the finishing',
      'Most cited tool stack: ChatGPT / Claude for text → Midjourney for image exploration → Photoshop for final execution; Runway / Kling for video clips → Premiere Pro for assembly',
      'Adobe appears at the end of the pipeline for precision control, typography, brand alignment, and professional export — not for generation',
      'Japanese and Chinese student NPS respondents specifically name Adobe AI as a career-building learning tool, suggesting the execution-layer position holds globally',
    ],
    adobeImplication: [
      "'Adobe is where the work gets finished' is a student-held belief Adobe doesn't currently claim in messaging — an organic positioning advantage worth owning",
      "The pipeline position (after AI generation, before professional delivery) creates deep stickiness: students who depend on Photoshop for the last mile stay even as they experiment with upstream tools",
      "International student mentions (Japan, China) suggest the execution-layer role is a global signal — an underexplored data point for regional CC Students marketing",
    ],
    quotes: [
      { text: 'midjourney for exploration, photoshop for the real execution', source: 'Reddit · r/Design · Apr 2026' },
      { text: 'generate shorter clips per image and stitch them together in capcut or premiere', source: 'Reddit · r/generativeAI · Apr 2026' },
      { text: 'As a student learning product design in Japan, Adobe AI has been an important tool for practice and research.', source: 'NPS Survey · Illustrator · Japan · Apr 2026' },
    ],
    studyLabel: 'TAO Report · Jun 9, 2026',
  },
  {
    rank: 5,
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
    rank: 6,
    headline: 'Four friction points consistently cap how deep students will push AI into creative work',
    finding: [
      "Skill atrophy fear: over-reliance is seen as a risk to foundational creative development — students prefer AI as mentor or critique partner, not a decision-maker",
      "Low originality trust: AI is perceived as weak at true originality and prone to fabrication; outputs require manual verification before client or academic use",
      "Consistency & control failure: video and image generators change subjects and styles even when instructed not to, forcing fallback to manual tools",
      "The handoff cost: typography, brand consistency, and finish after AI generation remain human-heavy — the last mile of the pipeline hasn't been automated",
    ],
    adobeImplication: [
      "Skill atrophy anxiety is the reason students resist fully AI-native tools — CC's role as the place where creative skills are built (not bypassed) is a credible counter-message no AI-first app can make",
      "Consistency failure (subjects changing unexpectedly) is a direct product gap Firefly's style-reference and subject-lock tools could address explicitly in student marketing",
      "The handoff cost is Adobe's home turf — Photoshop and Illustrator are already the tools students use to fix and polish AI output; naming this role explicitly would resonate",
    ],
    quotes: [
      { text: 'the sweet spot is using ai to accelerate learning, not replace the struggle', source: 'Reddit · r/Design · Jun 2026' },
      { text: 'it completely changes the cat and everything else and not what i want at all', source: 'Reddit · r/aiArt · Apr 2026' },
      { text: 'ai replacing the pipeline. the creative act was never the bottleneck', source: 'Reddit · r/artificial · Jun 2026' },
    ],
    studyLabel: 'TAO Report · Jun 9, 2026',
  },
  {
    rank: 7,
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

function FindingsCarousel({ items, title = 'Top Findings — What Students Are Saying About AI' }: { items: FindingItem[]; title?: string }) {
  const [idx, setIdx] = useState(0);
  const item = items[idx];

  return (
    <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', minHeight: 580 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#EB1000', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
        {title}
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
        <SourceChip label="TAO Report · AUP Experience Intelligence · Jun 9, 2026 · What are students saying they use AI for creatively?" />
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
        {ALL_TOPICS.map((topic) => {
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
