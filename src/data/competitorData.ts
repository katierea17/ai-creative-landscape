export type Category = 'Ecosystem Utilities' | 'Mass Market AI' | 'Creator Platforms' | 'Professional Tools' | 'Other';
export type AiLevel = 'Enhance' | 'Extend' | 'Open';
export type Trend = 'Up' | 'Down' | 'Flat';

export interface Competitor {
  id: string;
  name: string;
  category: Category;
  mau: string;
  aiLevel: AiLevel;
  coreValueProp: string;
  genAiMessaging: string;
  studentMessaging: string | null;
  studentPromo: string | null;
  pricing: {
    free: boolean;
    premiumSubscription: string | null;
    oneTimePurchase: string | null;
    aiCredits: boolean;
    studentPrice: string | null;
    studentPromo: string | null;
    notableChange: string | null;
  };
  creditDetail: string | null;
  aiFeatures: {
    ideate: boolean | string;
    creativeEditing: boolean | string;
    imageGeneration: boolean | string;
    videoGeneration: boolean | string;
  };
  experience: {
    easeOfUse: boolean | string;
    certification: boolean | string;
    frictionRating: 'Low' | 'Medium' | 'High';
    onboarding: string;
  };
  sentiment: {
    score: number;
    trend: Trend;
    praised: string[];
    complaints: string[];
  };
}

export const competitors: Competitor[] = [
  {
    id: 'google-photos',
    name: 'Google Photos',
    category: 'Ecosystem Utilities',
    mau: '1.5B+',
    aiLevel: 'Enhance',
    coreValueProp: 'Photo storage and organization, free and deeply embedded in the Google/Android ecosystem',
    genAiMessaging: 'Photos enhanced with Google. Edit your photos just by asking. Describe edits and watch them appear.',
    studentMessaging: null,
    studentPromo: null,
    pricing: {
      free: true,
      premiumSubscription: 'Google One from $1.99/mo (100GB)',
      oneTimePurchase: null,
      aiCredits: false,
      studentPrice: null,
      studentPromo: null,
      notableChange: null,
    },
    creditDetail: null,
    aiFeatures: {
      ideate: false,
      creativeEditing: 'Magic Eraser, Photo Unblur',
      imageGeneration: false,
      videoGeneration: false,
    },
    experience: {
      easeOfUse: 'Very High',
      certification: false,
      frictionRating: 'Low',
      onboarding: 'Automatic import from Android/iOS, seamless Google account integration',
    },
    sentiment: {
      score: 1,
      trend: 'Flat',
      praised: [],
      complaints: [],
    },
  },
  {
    id: 'instagram-edits',
    name: 'Instagram Edits',
    category: 'Ecosystem Utilities',
    mau: '2B+',
    aiLevel: 'Enhance',
    coreValueProp: 'Native video editor built exclusively for Instagram-first, short-form content creation',
    genAiMessaging: 'Create with powerful tools. Timeline with clip-level precision, auto-enhance features and creative tools like green screen and AI image animation.',
    studentMessaging: null,
    studentPromo: null,
    pricing: {
      free: true,
      premiumSubscription: null,
      oneTimePurchase: null,
      aiCredits: false,
      studentPrice: null,
      studentPromo: null,
      notableChange: 'Launched Jan 2026 as free standalone app',
    },
    creditDetail: null,
    aiFeatures: {
      ideate: false,
      creativeEditing: 'Auto captions, beat sync, background removal',
      imageGeneration: false,
      videoGeneration: false,
    },
    experience: {
      easeOfUse: 'High',
      certification: false,
      frictionRating: 'Low',
      onboarding: 'Requires Instagram account; direct import from camera roll or Instagram drafts',
    },
    sentiment: {
      score: 1,
      trend: 'Flat',
      praised: [],
      complaints: ['Too expensive for AI features (Q9)'],
    },
  },
  {
    id: 'imovie',
    name: 'iMovie',
    category: 'Ecosystem Utilities',
    mau: '300M+',
    aiLevel: 'Enhance',
    coreValueProp: 'Free, beginner-friendly video editing seamlessly integrated across Apple devices',
    genAiMessaging: 'Design your masterpiece from scratch or get help shaping your story with Magic Movie and Storyboards on iPhone or iPad.',
    studentMessaging: null,
    studentPromo: null,
    pricing: {
      free: true,
      premiumSubscription: null,
      oneTimePurchase: null,
      aiCredits: false,
      studentPrice: null,
      studentPromo: null,
      notableChange: null,
    },
    creditDetail: null,
    aiFeatures: {
      ideate: false,
      creativeEditing: 'Auto color correction, stabilization',
      imageGeneration: false,
      videoGeneration: false,
    },
    experience: {
      easeOfUse: 'Very High',
      certification: false,
      frictionRating: 'Low',
      onboarding: 'Pre-installed on Mac/iOS; zero-friction for Apple users',
    },
    sentiment: {
      score: 0,
      trend: 'Flat',
      praised: [],
      complaints: [],
    },
  },
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'Mass Market AI',
    mau: '350M+',
    aiLevel: 'Open',
    coreValueProp: 'Google\'s all-in-one AI assistant — deeply embedded in the apps people already use every day (Search, Photos, Gmail, Docs, Maps)',
    genAiMessaging: 'Get more access to our most accurate model Gemini 3 Pro. The best model in the world for multimodal understanding — whether you\'re uploading a photo of your homework or transcribing notes from a lecture you missed.',
    studentMessaging: 'Your AI study buddy — personalized learning, unlimited homework help, and exam prep.',
    studentPromo: null,
    pricing: {
      free: true,
      premiumSubscription: 'AI Plus $4.99/mo · AI Pro $19.99/mo · AI Ultra $99.99/mo',
      oneTimePurchase: null,
      aiCredits: false,
      studentPrice: '$9.99/mo (50% off AI Pro for verified students)',
      studentPromo: null,
      notableChange: 'AI Plus cut to $4.99/mo + 400GB storage (Jun 9, 2026) — cheapest paid AI subscription in the US',
    },
    creditDetail: null,
    aiFeatures: {
      ideate: true,
      creativeEditing: 'Image editing via Gemini 2.0',
      imageGeneration: true,
      videoGeneration: 'Veo 2 (AI Ultra tier only)',
    },
    experience: {
      easeOfUse: 'High',
      certification: false,
      frictionRating: 'Low',
      onboarding: 'Google account login; integrated with Gmail, Docs, Drive',
    },
    sentiment: {
      score: 10,
      trend: 'Flat',
      praised: ['Strong free plan for image generation', 'Google ecosystem integration', 'Student affordability'],
      complaints: ['Too expensive for AI features (Q9)'],
    },
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'Mass Market AI',
    mau: '400M+',
    aiLevel: 'Open',
    coreValueProp: 'General-purpose AI assistant for text, images, and code via conversational interface.',
    genAiMessaging: 'Get the most out of college with ChatGPT. Meet your always-available study partner, career counselor, and personal assistant. Use ChatGPT to help you learn faster, plan smarter, and get more done in everyday life.',
    studentMessaging: 'Study smarter. Get personalized tutoring for math, science, writing, and more.',
    studentPromo: null,
    pricing: {
      free: true,
      premiumSubscription: 'Go $8/mo · Plus $20/mo · Pro $200/mo',
      oneTimePurchase: null,
      aiCredits: false,
      studentPrice: null,
      studentPromo: null,
      notableChange: 'New Go tier at $8/mo (Jan 2026); GPT-5.5 launched Apr 2026; interactive charts Jun 2026',
    },
    creditDetail: null,
    aiFeatures: {
      ideate: true,
      creativeEditing: 'Canvas, image editing via GPT-4o',
      imageGeneration: true,
      videoGeneration: 'Sora (Plus/Pro only)',
    },
    experience: {
      easeOfUse: 'Very High',
      certification: false,
      frictionRating: 'Low',
      onboarding: 'Email signup; immediate access to GPT-4o on free tier',
    },
    sentiment: {
      score: 38,
      trend: 'Flat',
      praised: ['Ease of use & simple setup', 'Prompt accuracy & versatility', 'Image generation'],
      complaints: ['Too expensive for AI features (Q9)'],
    },
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'Mass Market AI',
    mau: '100M+',
    aiLevel: 'Open',
    coreValueProp: 'AI assistant built for nuanced writing and long-document analysis with a focus on reliability and safety',
    genAiMessaging: 'Claude is a next generation AI assistant built by Anthropic and trained to be safe, accurate, and secure to help you do your best work.',
    studentMessaging: null,
    studentPromo: null,
    pricing: {
      free: true,
      premiumSubscription: 'Pro $20/mo, Max from $100/mo, Team $25/mo per user',
      oneTimePurchase: null,
      aiCredits: false,
      studentPrice: null,
      studentPromo: null,
      notableChange: 'Claude Design announced Q1 2026 — significant threat to Adobe Express',
    },
    creditDetail: null,
    aiFeatures: {
      ideate: true,
      creativeEditing: 'Claude Design (beta)',
      imageGeneration: false,
      videoGeneration: false,
    },
    experience: {
      easeOfUse: 'High',
      certification: false,
      frictionRating: 'Low',
      onboarding: 'Account required; strong onboarding for creative professionals',
    },
    sentiment: {
      score: 6,
      trend: 'Flat',
      praised: ['Depth & thoroughness of responses', 'Honesty and self-awareness', 'Creative output quality'],
      complaints: ['Too expensive for AI features (Q9)'],
    },
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'Creator Platforms',
    mau: '220M+',
    aiLevel: 'Extend',
    coreValueProp: '\'Design for everyone\' through massive template libraries',
    genAiMessaging: 'Power your creative work with Magic Studio. Generate visuals, erase objects, resize for any format, and write copy — all powered by Magic Studio credits. Every plan includes credits; Pro unlocks 500/mo.',
    studentMessaging: 'Free design and presentation tool for students. Create for your projects and studying needs in minutes.',
    studentPromo: 'Pro is free for students ($18/mo value)',
    pricing: {
      free: true,
      premiumSubscription: 'Pro $18/mo or $144/yr',
      oneTimePurchase: null,
      aiCredits: true,
      studentPrice: 'Free (Canva for Education)',
      studentPromo: 'Pro is free for students ($18/mo value)',
      notableChange: 'AI credits now limited on Free; Pro gets 500/mo Magic Studio credits',
    },
    creditDetail: 'Free: 50 AI credits/mo. Pro: 500 AI credits/mo. Credits used for Magic Media, Magic Eraser, AI writing tools.',
    aiFeatures: {
      ideate: 'Magic Write, AI presentation generator',
      creativeEditing: 'Magic Edit, Magic Eraser, Background Remover',
      imageGeneration: true,
      videoGeneration: 'Magic Media text-to-video (limited)',
    },
    experience: {
      easeOfUse: 'Very High',
      certification: 'Canva Certified Creative (free course)',
      frictionRating: 'Low',
      onboarding: 'Template-first onboarding; instant value with drag-and-drop',
    },
    sentiment: {
      score: 13,
      trend: 'Flat',
      praised: ['Multipurpose utility', 'Ease of use', 'AI prompt-based design generation'],
      complaints: ['Too expensive for AI features (Q9)'],
    },
  },
  {
    id: 'capcut',
    name: 'CapCut',
    category: 'Creator Platforms',
    mau: '300M+',
    aiLevel: 'Extend',
    coreValueProp: 'Easy way to create and publish videos for social media (particularly TikTok)',
    genAiMessaging: 'Smart Editor & Generator. A quick chat with CapCut\'s AI video editor and it\'ll build a video from scratch — style, avatar, everything.',
    studentMessaging: null,
    studentPromo: null,
    pricing: {
      free: true,
      premiumSubscription: 'Pro $19.99/mo or $179.99/yr',
      oneTimePurchase: null,
      aiCredits: true,
      studentPrice: null,
      studentPromo: null,
      notableChange: 'AI credits introduced Q1 2026; free tier now limited to 200 AI uses/mo',
    },
    creditDetail: 'Free: 150 AI credits/wk (~600/mo). Pro: 1,200 AI credits/mo. Credits used for AI text-to-video, AI avatars, Auto Caption, sky replacement.',
    aiFeatures: {
      ideate: 'Script generator, AI storyboard',
      creativeEditing: 'Auto cut, beat sync, AI background, sky replacement',
      imageGeneration: 'AI image generator, AI avatars',
      videoGeneration: true,
    },
    experience: {
      easeOfUse: 'Very High',
      certification: false,
      frictionRating: 'Low',
      onboarding: 'TikTok account optional; quick project start with templates',
    },
    sentiment: {
      score: 7,
      trend: 'Flat',
      praised: ['Free access & value', 'Template system', 'Quick & accurate AI features'],
      complaints: ['Too expensive for AI features (Q9)'],
    },
  },
  {
    id: 'picsart',
    name: 'Picsart',
    category: 'Creator Platforms',
    mau: '150M+',
    aiLevel: 'Extend',
    coreValueProp: 'Creative expression via filters, stickers, and quick edits',
    genAiMessaging: 'Ignite your creative potential with Picsart — the all-in-one AI photo editor, AI video editor, and design studio that\'s free and easy to use. From business designs to AI art, go from inspiration to creation fast.',
    studentMessaging: 'Make your school projects impossible to ignore. Free AI tools for presentations, posters, and social graphics.',
    studentPromo: null,
    pricing: {
      free: true,
      premiumSubscription: 'Pro $10.50/mo',
      oneTimePurchase: null,
      aiCredits: true,
      studentPrice: null,
      studentPromo: null,
      notableChange: 'Free tier reduced to 5 AI credits/week (was unlimited)',
    },
    creditDetail: 'Free: 5 AI credits/wk (~20/mo). Pro: 500 AI credits/mo (Gold tier renamed to Pro). Credits used for AI image generation, Style Transfer, AI Remove.',
    aiFeatures: {
      ideate: false,
      creativeEditing: 'Style Transfer, AI effects, background removal',
      imageGeneration: true,
      videoGeneration: false,
    },
    experience: {
      easeOfUse: 'High',
      certification: false,
      frictionRating: 'Medium',
      onboarding: 'Mobile-first; account required for AI features; generous template library',
    },
    sentiment: {
      score: 2,
      trend: 'Flat',
      praised: ['AI effects for photo editing'],
      complaints: ['Too expensive for AI features (Q9)'],
    },
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'Creator Platforms',
    mau: '20M+',
    aiLevel: 'Open',
    coreValueProp: 'Premium AI image generation for creatives seeking high-quality, stylistically distinctive imagery',
    genAiMessaging: 'Imagine Anything — Generate incredible images and videos with simple text prompts. Create anything you can imagine, from images to video.',
    studentMessaging: null,
    studentPromo: null,
    pricing: {
      free: false,
      premiumSubscription: 'Basic $10/mo, Standard $30/mo, Pro $60/mo, Mega $120/mo',
      oneTimePurchase: null,
      aiCredits: true,
      studentPrice: null,
      studentPromo: null,
      notableChange: 'V8 default as of Jun 10, 2026 (5× faster, native 2K, improved text rendering); no free tier since 2023',
    },
    creditDetail: 'Basic: ~200 images/mo (3.3hr GPU). Standard: ~900 images/mo (15hr GPU). Pro: unlimited relaxed + 30hr fast. Credits = GPU compute time.',
    aiFeatures: {
      ideate: 'Describe, Remix, Vary',
      creativeEditing: 'Inpainting, outpainting, zoom',
      imageGeneration: true,
      videoGeneration: 'Image-to-video (5s clips, extendable to 21s)',
    },
    experience: {
      easeOfUse: 'Medium',
      certification: false,
      frictionRating: 'Medium',
      onboarding: 'Discord-based (historically); moving to web UI; requires paid plan',
    },
    sentiment: {
      score: 1,
      trend: 'Flat',
      praised: ['Variety of outputs', 'Not limited to one visual style'],
      complaints: ['Too expensive for AI features (Q9)'],
    },
  },
  {
    id: 'final-cut-pro',
    name: 'Final Cut Pro',
    category: 'Professional Tools',
    mau: '5M+',
    aiLevel: 'Enhance',
    coreValueProp: 'Fast, magnetic timeline editing optimized for Apple hardware',
    genAiMessaging: 'Powerful AI features that build on Apple Intelligence, right in your workflow.',
    studentMessaging: 'Professional apps. Student budget. $2.99/mo for the full creativity and productivity collection.',
    studentPromo: '$2.99/mo as part of Apple Creator Studio',
    pricing: {
      free: false,
      premiumSubscription: '$12.99/mo or $129/yr (Apple Creator Studio bundle)',
      oneTimePurchase: '$299.99 (standalone, Mac App Store)',
      aiCredits: false,
      studentPrice: '$2.99/mo (via Apple Creator Studio)',
      studentPromo: '$2.99/mo as part of Apple Creator Studio',
      notableChange: 'Subscription via Apple Creator Studio (FCP + Logic Pro + Motion + more) at $12.99/mo; standalone $299.99 one-time still on App Store; student bundle $2.99/mo',
    },
    creditDetail: null,
    aiFeatures: {
      ideate: false,
      creativeEditing: 'Scene Removal, Smart Captions, ML Color',
      imageGeneration: false,
      videoGeneration: false,
    },
    experience: {
      easeOfUse: 'Medium',
      certification: 'Apple Certified Pro — Final Cut Pro',
      frictionRating: 'Medium',
      onboarding: 'Mac-only; 90-day free trial; steep learning curve for beginners',
    },
    sentiment: {
      score: 2,
      trend: 'Flat',
      praised: ['Ease of use', 'Supports both creative and academic work'],
      complaints: ['Too expensive for AI features (Q9)'],
    },
  },
  {
    id: 'affinity',
    name: 'Affinity',
    category: 'Professional Tools',
    mau: '6M+',
    aiLevel: 'Enhance',
    coreValueProp: 'Professional-grade Adobe alternative (photo, design, publishing) now free with free Canva account',
    genAiMessaging: 'Professional design, photo editing, and page layout. Free for individuals. Optional AI via Canva.',
    studentMessaging: null,
    studentPromo: null,
    pricing: {
      free: true,
      premiumSubscription: null,
      oneTimePurchase: null,
      aiCredits: false,
      studentPrice: null,
      studentPromo: null,
      notableChange: 'Now fully free — Canva acquisition made Affinity V2 free for all users',
    },
    creditDetail: null,
    aiFeatures: {
      ideate: false,
      creativeEditing: 'AI Masking, Generative Fill (Stable Diffusion)',
      imageGeneration: 'Generative Fill (limited)',
      videoGeneration: false,
    },
    experience: {
      easeOfUse: 'Medium',
      certification: false,
      frictionRating: 'Medium',
      onboarding: 'Full-featured trial; one-time purchase removes friction of subscription commitment',
    },
    sentiment: {
      score: 0,
      trend: 'Flat',
      praised: [],
      complaints: [],
    },
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Professional Tools',
    mau: '8M+',
    aiLevel: 'Extend',
    coreValueProp: 'The dominant collaborative UI/UX design and prototyping tool for modern product teams',
    genAiMessaging: 'Figma AI is your creative collaborator. From prompting prototypes to speeding up workflows, Figma AI helps teams bring their best ideas to life.',
    studentMessaging: 'Learn design, UX, and engineering skills that advance your career. Free for education.',
    studentPromo: 'Free (Figma for Education)',
    pricing: {
      free: true,
      premiumSubscription: 'Professional $16/mo per editor, Organization $55/mo per editor',
      oneTimePurchase: null,
      aiCredits: true,
      studentPrice: 'Free (Figma Education)',
      studentPromo: 'Free (Figma for Education)',
      notableChange: 'AI features now consume credits; 500 credits/mo on Starter plan',
    },
    creditDetail: 'Starter: 500 AI credits/mo. Professional: 3,000/mo per Full seat. Credits used for Make designs, Rename layers, Translate, AI autocomplete.',
    aiFeatures: {
      ideate: 'Make designs (AI UI generation)',
      creativeEditing: 'AI rename, translate, search',
      imageGeneration: 'AI image generation (via plugin)',
      videoGeneration: false,
    },
    experience: {
      easeOfUse: 'High',
      certification: 'Figma Certified Professional',
      frictionRating: 'Low',
      onboarding: 'Web-based; collaborative first; strong onboarding tutorials and community resources',
    },
    sentiment: {
      score: 2,
      trend: 'Flat',
      praised: ['Clean interface', 'Accurate AI features'],
      complaints: ['Too expensive for AI features (Q9)'],
    },
  },
  {
    id: 'runway',
    name: 'Runway',
    category: 'Professional Tools',
    mau: '3M+',
    aiLevel: 'Open',
    coreValueProp: 'AI-native platform for generative video creation and cinematic visual effects',
    genAiMessaging: 'A real-time video agent API that lets you build fully custom conversational characters.',
    studentMessaging: 'Cutting-edge generative AI for classrooms — empowering students and teachers to explore creative possibilities.',
    studentPromo: '25% discount + 100K credits via Student Ambassador Program',
    pricing: {
      free: true,
      premiumSubscription: 'Standard $12/mo, Pro $28/mo, Unlimited $76/mo',
      oneTimePurchase: null,
      aiCredits: true,
      studentPrice: '$6/mo (Standard student rate)',
      studentPromo: '25% discount + 100K credits via Student Ambassador Program',
      notableChange: 'Gen-3 Alpha Turbo released — significantly faster inference at lower credit cost',
    },
    creditDetail: 'Free: 125 credits (one-time). Standard: 625 credits/mo. Pro: 2250 credits/mo. Unlimited: no limits. Gen-3 video = 5-10 credits/second.',
    aiFeatures: {
      ideate: 'Act One (motion capture), Storyboard',
      creativeEditing: 'Green screen, inpainting, video-to-video',
      imageGeneration: 'Gen-3 Alpha (image + video)',
      videoGeneration: true,
    },
    experience: {
      easeOfUse: 'Medium',
      certification: 'Runway Certified Creator',
      frictionRating: 'Medium',
      onboarding: 'Web-based; account required; tutorial-gated for advanced features',
    },
    sentiment: {
      score: 0,
      trend: 'Flat',
      praised: [],
      complaints: ['Too expensive for AI features (Q9)'],
    },
  },
];

export interface KeyDevelopment {
  date: string;
  competitor: string;
  category: Category;
  title: string;
  description: string;
}

export const keyDevelopments: KeyDevelopment[] = [
  {
    date: '2026-01-15',
    competitor: 'Instagram Edits',
    category: 'Ecosystem Utilities',
    title: 'Instagram Edits launches as standalone app',
    description: 'Meta launches Instagram Edits as a free standalone video editing app, directly targeting CapCut amid TikTok regulatory uncertainty.',
  },
  {
    date: '2026-01-20',
    competitor: 'Final Cut Pro',
    category: 'Professional Tools',
    title: 'Final Cut Pro switches to subscription model',
    description: 'Apple moves Final Cut Pro from $299 one-time purchase to $4.99/mo, with a student bundle "Apple Creator Studio" at $2.99/mo bundling FCP, Logic Pro, and other tools.',
  },
  {
    date: '2026-02-01',
    competitor: 'Gemini',
    category: 'Mass Market AI',
    title: 'Gemini 2.0 Flash goes free for all users',
    description: 'Google makes Gemini 2.0 Flash — its fastest multimodal model — free for all users, dramatically increasing AI capability access.',
  },
  {
    date: '2026-02-14',
    competitor: 'Claude',
    category: 'Mass Market AI',
    title: 'Claude Design announced',
    description: 'Anthropic announces Claude Design, an AI-powered design assistant that generates design systems, UI components, and creative briefs. Significant competitive pressure on Adobe Express.',
  },
  {
    date: '2026-03-10',
    competitor: 'Midjourney',
    category: 'Creator Platforms',
    title: 'Midjourney V7 released',
    description: 'Midjourney V7 sets a new standard for AI image generation — dramatically improved photorealism, better instruction following, and improved coherence for multi-element scenes.',
  },
  {
    date: '2026-03-25',
    competitor: 'CapCut',
    category: 'Creator Platforms',
    title: 'CapCut introduces AI credit system',
    description: 'CapCut rolls out AI credits system, limiting free users to 200 AI uses/month. Pro subscribers get unlimited AI access plus 200 AI avatar credits.',
  },
  {
    date: '2026-04-02',
    competitor: 'ChatGPT',
    category: 'Mass Market AI',
    title: 'GPT Image 2 launches — new benchmark for AI imagery',
    description: 'OpenAI launches GPT Image 2 with dramatically improved photorealism, text rendering in images, and consistent style following. Widely considered the most significant AI image leap since DALL·E 3.',
  },
  {
    date: '2026-04-10',
    competitor: 'Figma',
    category: 'Professional Tools',
    title: 'Figma rolls out AI credit limits',
    description: 'Figma moves from unlimited AI features to a credit system: 500 credits/mo for Starter, 5,000 for Professional. Spurs community debate about monetization of AI tools.',
  },
  {
    date: '2026-04-18',
    competitor: 'Runway',
    category: 'Professional Tools',
    title: 'Gen-3 Alpha Turbo cuts inference costs',
    description: 'Runway releases Gen-3 Alpha Turbo — same quality as Gen-3 at 40% fewer credits per second of video, significantly improving economics for professional users.',
  },
  {
    date: '2026-04-22',
    competitor: 'Canva',
    category: 'Creator Platforms',
    title: 'Canva AI credits tightened on Free tier',
    description: 'Canva reduces Free plan AI credits from unlimited (for some features) to 50/mo hard limit across Magic Studio. Pro plans maintain 500/mo.',
  },
];

export interface SurveyKeyFinding {
  title: string;
  stat: string;
  detail: string;
}

export const surveyKeyFindings: SurveyKeyFinding[] = [
  {
    title: 'No One Has Won the Creative AI Race',
    stat: '36%',
    detail: 'ChatGPT is rated best overall AI platform by 36% of respondents (n=137), but 64% name someone else. Adobe combined earns 15%, tied with Canva at 15%. No single platform commands majority loyalty — the category is still up for grabs.',
  },
  {
    title: 'Students Are Creators First, AI Users Second',
    stat: '60%',
    detail: '60% of design tool usage across all platforms is NOT AI-primary — students are in these apps to create and encounter AI along the way. 34% treat none of their design tools as AI-primary. AI doesn\'t register as a reason to open most apps.',
  },
  {
    title: 'Schoolwork Is the #1 Driver of AI Tool Adoption',
    stat: '45%',
    detail: '45% of respondents (62/137) rank schoolwork and class assignments as their #1 context for using AI creative tools — ahead of personal projects (25%), social media (16%), and portfolio/professional work (14%).',
  },
  {
    title: 'Platform Loyalty Gap: Using ≠ Preferring',
    stat: '28%',
    detail: 'Only 28% of students who use a design tool solely or primarily for AI (n=90) also name that same tool as best overall. 72% give the "best overall" crown to a different platform — a major white space opportunity for any tool that closes the gap.',
  },
  {
    title: 'Good Value Perception Doesn\'t Mean Loyalty',
    stat: '84%',
    detail: '84% of Canva users still name a non-Canva platform as best overall — even though only 9% flag Canva as too expensive for AI features. Separately, 82% of Adobe Firefly users name a rival as best overall (CapCut, Canva, ChatGPT, Gemini, Final Cut Pro). Pricing satisfaction and platform loyalty are decoupled.',
  },
];

export interface FourPShift {
  id: string;
  competitor: string;
  category: Category;
  p: 'Product' | 'Pricing' | 'Partnerships' | 'Promotion';
  shift: string;
  source: string;
  date: string;
}

export const fourPShifts: FourPShift[] = [
  {
    id: 'fcp-pricing',
    competitor: 'Final Cut Pro',
    category: 'Professional Tools',
    p: 'Pricing',
    shift: 'Switched from $299 one-time to $4.99/mo subscription. Student bundle at $2.99/mo resets market expectations for pro creative tools.',
    source: 'Apple Newsroom',
    date: 'Jan 2026',
  },
  {
    id: 'chatgpt-product',
    competitor: 'ChatGPT',
    category: 'Mass Market AI',
    p: 'Product',
    shift: 'GPT Image 2 launch raises the standard for AI image generation — photorealistic output with accurate text rendering challenges all AI image competitors.',
    source: 'OpenAI Blog',
    date: 'Apr 2026',
  },
  {
    id: 'claude-product',
    competitor: 'Claude',
    category: 'Mass Market AI',
    p: 'Product',
    shift: 'Claude Design announced as AI-native design tool — positions Anthropic directly in the creative software market for the first time.',
    source: 'Anthropic Blog',
    date: 'Feb 2026',
  },
  {
    id: 'instagram-product',
    competitor: 'Instagram Edits',
    category: 'Ecosystem Utilities',
    p: 'Product',
    shift: 'Standalone video editor app launched as free alternative to CapCut — leverages Meta ecosystem and Instagram publishing as key differentiator.',
    source: 'Meta Newsroom',
    date: 'Jan 2026',
  },
  {
    id: 'gemini-pricing',
    competitor: 'Gemini',
    category: 'Mass Market AI',
    p: 'Pricing',
    shift: 'Gemini 2.0 Flash made free for all users — dramatic increase in accessible AI capability at zero cost point.',
    source: 'Google Blog',
    date: 'Feb 2026',
  },
  {
    id: 'midjourney-product',
    competitor: 'Midjourney',
    category: 'Creator Platforms',
    p: 'Product',
    shift: 'V7 model release significantly improves photorealism and instruction following — maintains Midjourney position as aesthetic gold standard.',
    source: 'Midjourney Discord',
    date: 'Mar 2026',
  },
  {
    id: 'capcut-pricing',
    competitor: 'CapCut',
    category: 'Creator Platforms',
    p: 'Pricing',
    shift: 'AI credit system introduced — free tier capped at 200 AI uses/mo, pushing heavy users toward Pro at $7.99/mo.',
    source: 'CapCut Blog',
    date: 'Mar 2026',
  },
  {
    id: 'canva-pricing',
    competitor: 'Canva',
    category: 'Creator Platforms',
    p: 'Pricing',
    shift: 'Free AI credits reduced from effectively unlimited to 50/mo hard cap. Pro bump to 500/mo creates clearer upgrade incentive.',
    source: 'Canva Help Center',
    date: 'Apr 2026',
  },
  {
    id: 'figma-pricing',
    competitor: 'Figma',
    category: 'Professional Tools',
    p: 'Pricing',
    shift: 'AI features moved to credit-based model — 500 credits/mo on Starter creates friction that previously didn\'t exist.',
    source: 'Figma Changelog',
    date: 'Apr 2026',
  },
  {
    id: 'runway-product',
    competitor: 'Runway',
    category: 'Professional Tools',
    p: 'Product',
    shift: 'Gen-3 Alpha Turbo reduces credit cost per video by ~40% — improves economics for professional and classroom use.',
    source: 'Runway Blog',
    date: 'Apr 2026',
  },
  {
    id: 'fcp-promotion',
    competitor: 'Final Cut Pro',
    category: 'Professional Tools',
    p: 'Promotion',
    shift: 'Apple Creator Studio bundle heavily promoted to students and educators — direct challenge to Adobe Creative Cloud\'s education positioning.',
    source: 'Apple Education',
    date: 'Jan 2026',
  },
  {
    id: 'canva-partnerships',
    competitor: 'Canva',
    category: 'Creator Platforms',
    p: 'Partnerships',
    shift: 'Canva completes Affinity acquisition — consolidating professional design tools under Canva umbrella, expanding upmarket reach.',
    source: 'Canva Press Release',
    date: 'Feb 2026',
  },
  {
    id: 'runway-partnerships',
    competitor: 'Runway',
    category: 'Professional Tools',
    p: 'Partnerships',
    shift: 'Runway partners with leading film schools (USC, AFI, NYU Tisch) to integrate Gen-3 into film production curriculum.',
    source: 'Runway Education',
    date: 'Mar 2026',
  },
  {
    id: 'chatgpt-promotion',
    competitor: 'ChatGPT',
    category: 'Mass Market AI',
    p: 'Promotion',
    shift: 'GPT Image 2 launch campaign dominates creative social media — viral examples of photorealistic AI outputs drive significant brand awareness spike.',
    source: 'OpenAI Social',
    date: 'Apr 2026',
  },
];

export const lastUpdated = 'Jun 9, 2026';
