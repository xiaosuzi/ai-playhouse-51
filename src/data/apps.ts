export interface AppCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

export interface AIApp {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  category: string;
  rating: number;
  downloads: number;
  version: string;
  size: string;
  developer: string;
  tags: string[];
  featured: boolean;
  useType: 'iframe' | 'external';
  useUrl: string;
  screenshots: string[];
}

export const categories: AppCategory[] = [
  { id: 'text', name: '文本生成', icon: '✍️', description: 'AI写作、翻译、摘要等文本处理工具', count: 4 },
  { id: 'image', name: '图像处理', icon: '🎨', description: 'AI绘画、图像编辑、风格迁移', count: 3 },
  { id: 'data', name: '数据分析', icon: '📊', description: '智能数据处理、可视化、预测分析', count: 3 },
  { id: 'assistant', name: '智能助手', icon: '🤖', description: '对话式AI助手、客服机器人', count: 2 },
  { id: 'audio', name: '音频处理', icon: '🎵', description: '语音识别、音乐生成、音频编辑', count: 2 },
  { id: 'video', name: '视频创作', icon: '🎬', description: 'AI视频生成、剪辑、特效', count: 2 },
];

export const apps: AIApp[] = [
  {
    id: 'smart-writer',
    name: 'Smart Writer',
    description: 'AI驱动的智能写作助手，支持多种文体创作',
    longDescription: 'Smart Writer 是一款功能强大的AI写作工具，支持文章、邮件、广告文案等多种文体的智能创作。基于最新的大语言模型，能够理解上下文语义，生成高质量、流畅自然的文本内容。',
    icon: '✍️',
    category: 'text',
    rating: 4.8,
    downloads: 52300,
    version: '2.3.1',
    size: '12MB',
    developer: 'AI Labs',
    tags: ['写作', 'AI', '文案'],
    featured: true,
    useType: 'iframe',
    useUrl: 'https://example.com/smart-writer',
    screenshots: [],
  },
  {
    id: 'ai-translator',
    name: 'AI Translator',
    description: '支持100+语言的实时翻译引擎',
    longDescription: '基于神经网络的翻译引擎，支持超过100种语言的互译。提供文档翻译、实时对话翻译、网页翻译等多场景支持，翻译质量媲美专业译员。',
    icon: '🌐',
    category: 'text',
    rating: 4.7,
    downloads: 89200,
    version: '3.1.0',
    size: '8MB',
    developer: 'LinguaAI',
    tags: ['翻译', '多语言'],
    featured: true,
    useType: 'iframe',
    useUrl: 'https://example.com/translator',
    screenshots: [],
  },
  {
    id: 'text-summarizer',
    name: 'TextSum Pro',
    description: '一键生成长文摘要，提取关键信息',
    longDescription: '输入任意长度的文章或文档，AI自动分析内容结构，提取核心观点和关键信息，生成简洁精炼的摘要。支持中英文，适用于论文、报告、新闻等场景。',
    icon: '📝',
    category: 'text',
    rating: 4.5,
    downloads: 31400,
    version: '1.8.2',
    size: '6MB',
    developer: 'SumAI',
    tags: ['摘要', '提取'],
    featured: false,
    useType: 'iframe',
    useUrl: 'https://example.com/summarizer',
    screenshots: [],
  },
  {
    id: 'code-copilot',
    name: 'Code Copilot',
    description: 'AI编程助手，智能代码补全与生成',
    longDescription: '面向开发者的AI编程助手，支持多种编程语言的代码补全、生成和调试。理解代码上下文，提供智能建议，大幅提升编码效率。',
    icon: '💻',
    category: 'text',
    rating: 4.9,
    downloads: 120500,
    version: '4.0.0',
    size: '25MB',
    developer: 'DevAI',
    tags: ['编程', '代码', '开发'],
    featured: true,
    useType: 'external',
    useUrl: 'https://example.com/code-copilot',
    screenshots: [],
  },
  {
    id: 'artforge',
    name: 'ArtForge',
    description: '文字生成图像，释放你的创意想象',
    longDescription: '输入文字描述即可生成精美图像。支持多种艺术风格、分辨率选择，可用于海报设计、插画创作、概念设计等场景。',
    icon: '🎨',
    category: 'image',
    rating: 4.6,
    downloads: 78900,
    version: '2.5.0',
    size: '45MB',
    developer: 'PixelAI',
    tags: ['绘画', '生成', '创意'],
    featured: true,
    useType: 'iframe',
    useUrl: 'https://example.com/artforge',
    screenshots: [],
  },
  {
    id: 'photo-enhance',
    name: 'Photo Enhance',
    description: 'AI图像增强，模糊照片秒变高清',
    longDescription: '利用深度学习技术对低分辨率、模糊、噪点图像进行智能增强。支持人像修复、老照片修复、超分辨率放大等功能。',
    icon: '📸',
    category: 'image',
    rating: 4.4,
    downloads: 45600,
    version: '1.6.3',
    size: '30MB',
    developer: 'ClearPix',
    tags: ['增强', '修复', '高清'],
    featured: false,
    useType: 'iframe',
    useUrl: 'https://example.com/enhance',
    screenshots: [],
  },
  {
    id: 'bg-remover',
    name: 'BG Remover',
    description: '一键智能抠图，完美去除背景',
    longDescription: '基于AI语义分割技术，精准识别前景主体，一键去除背景。支持人物、商品、动物等多种类型，边缘处理自然流畅。',
    icon: '🖼️',
    category: 'image',
    rating: 4.3,
    downloads: 67800,
    version: '2.1.0',
    size: '18MB',
    developer: 'ClearPix',
    tags: ['抠图', '背景', '去除'],
    featured: false,
    useType: 'iframe',
    useUrl: 'https://example.com/bg-remover',
    screenshots: [],
  },
  {
    id: 'data-insight',
    name: 'DataInsight',
    description: '上传数据集，AI自动生成分析报告',
    longDescription: '上传CSV、Excel等格式数据，AI自动完成数据清洗、统计分析、可视化图表生成，并输出专业的分析报告。适合市场分析、运营分析等场景。',
    icon: '📊',
    category: 'data',
    rating: 4.5,
    downloads: 23400,
    version: '1.4.0',
    size: '15MB',
    developer: 'DataAI',
    tags: ['分析', '报告', '可视化'],
    featured: false,
    useType: 'iframe',
    useUrl: 'https://example.com/data-insight',
    screenshots: [],
  },
  {
    id: 'predict-ai',
    name: 'PredictAI',
    description: '基于机器学习的智能预测分析平台',
    longDescription: '内置多种机器学习模型，支持销量预测、趋势分析、异常检测等任务。无需编程基础，可视化操作即可完成复杂的预测分析。',
    icon: '🔮',
    category: 'data',
    rating: 4.2,
    downloads: 15600,
    version: '1.2.1',
    size: '20MB',
    developer: 'FutureAI',
    tags: ['预测', '机器学习'],
    featured: false,
    useType: 'external',
    useUrl: 'https://example.com/predict',
    screenshots: [],
  },
  {
    id: 'chart-magic',
    name: 'ChartMagic',
    description: '用自然语言描述，AI自动生成图表',
    longDescription: '用自然语言描述你需要的图表，AI自动解析数据并生成精美的可视化图表。支持折线图、柱状图、饼图、散点图等多种类型。',
    icon: '📈',
    category: 'data',
    rating: 4.6,
    downloads: 34500,
    version: '2.0.0',
    size: '10MB',
    developer: 'DataAI',
    tags: ['图表', '可视化', '数据'],
    featured: true,
    useType: 'iframe',
    useUrl: 'https://example.com/chart-magic',
    screenshots: [],
  },
  {
    id: 'chat-buddy',
    name: 'ChatBuddy',
    description: '你的私人AI对话伙伴，知识问答无所不能',
    longDescription: '基于先进大语言模型的对话AI助手，可以进行知识问答、头脑风暴、情感陪伴等多种对话场景。支持上下文记忆，越聊越懂你。',
    icon: '💬',
    category: 'assistant',
    rating: 4.7,
    downloads: 156000,
    version: '5.0.0',
    size: '5MB',
    developer: 'BuddyAI',
    tags: ['对话', '问答', '助手'],
    featured: true,
    useType: 'iframe',
    useUrl: 'https://example.com/chat-buddy',
    screenshots: [],
  },
  {
    id: 'task-bot',
    name: 'TaskBot',
    description: 'AI任务管理助手，智能分解和跟踪任务',
    longDescription: '智能任务管理助手，可以根据项目目标自动分解任务、安排优先级、设置提醒。支持语音输入，自然语言创建和管理任务。',
    icon: '📋',
    category: 'assistant',
    rating: 4.3,
    downloads: 28900,
    version: '1.5.0',
    size: '8MB',
    developer: 'ProdAI',
    tags: ['任务', '管理', '效率'],
    featured: false,
    useType: 'iframe',
    useUrl: 'https://example.com/task-bot',
    screenshots: [],
  },
  {
    id: 'voice-ai',
    name: 'VoiceAI',
    description: '高精度语音识别与自然语音合成',
    longDescription: '支持实时语音转文字、文字转语音、语音翻译等功能。识别准确率达98%，语音合成自然流畅，支持多种音色选择。',
    icon: '🎙️',
    category: 'audio',
    rating: 4.4,
    downloads: 41200,
    version: '2.2.0',
    size: '22MB',
    developer: 'SoundAI',
    tags: ['语音', '识别', '合成'],
    featured: false,
    useType: 'iframe',
    useUrl: 'https://example.com/voice-ai',
    screenshots: [],
  },
  {
    id: 'music-gen',
    name: 'MusicGen',
    description: 'AI作曲，用文字描述生成原创音乐',
    longDescription: '输入文字描述你想要的音乐风格、情绪和节奏，AI自动生成原创音乐作品。支持多种乐器和音乐风格，可导出MP3/WAV格式。',
    icon: '🎵',
    category: 'audio',
    rating: 4.5,
    downloads: 38700,
    version: '1.3.0',
    size: '35MB',
    developer: 'MelodyAI',
    tags: ['音乐', '作曲', '生成'],
    featured: false,
    useType: 'external',
    useUrl: 'https://example.com/music-gen',
    screenshots: [],
  },
  {
    id: 'video-craft',
    name: 'VideoCraft',
    description: 'AI视频生成，从文字脚本到成片',
    longDescription: '输入文字脚本，AI自动生成视频内容，包括画面、配音、字幕和背景音乐。适合短视频创作、产品宣传、教育内容等场景。',
    icon: '🎬',
    category: 'video',
    rating: 4.6,
    downloads: 56300,
    version: '1.8.0',
    size: '50MB',
    developer: 'CineAI',
    tags: ['视频', '生成', '创作'],
    featured: true,
    useType: 'external',
    useUrl: 'https://example.com/video-craft',
    screenshots: [],
  },
  {
    id: 'clip-editor',
    name: 'ClipEditor',
    description: 'AI智能剪辑，自动识别精彩片段',
    longDescription: '上传视频素材，AI自动识别精彩片段、去除冗余内容、添加转场效果。支持自动字幕生成、背景音乐匹配，一键生成精彩短片。',
    icon: '✂️',
    category: 'video',
    rating: 4.3,
    downloads: 29800,
    version: '1.1.0',
    size: '40MB',
    developer: 'CineAI',
    tags: ['剪辑', '视频', '自动'],
    featured: false,
    useType: 'iframe',
    useUrl: 'https://example.com/clip-editor',
    screenshots: [],
  },
];

export function getAppsByCategory(categoryId: string): AIApp[] {
  return apps.filter(app => app.category === categoryId);
}

export function getFeaturedApps(): AIApp[] {
  return apps.filter(app => app.featured);
}

export function getAppById(id: string): AIApp | undefined {
  return apps.find(app => app.id === id);
}

export function getCategoryById(id: string): AppCategory | undefined {
  return categories.find(cat => cat.id === id);
}

export function searchApps(query: string): AIApp[] {
  const q = query.toLowerCase();
  return apps.filter(app =>
    app.name.toLowerCase().includes(q) ||
    app.description.toLowerCase().includes(q) ||
    app.tags.some(tag => tag.toLowerCase().includes(q))
  );
}

export function formatDownloads(num: number): string {
  if (num >= 100000) return (num / 10000).toFixed(1) + '万';
  if (num >= 10000) return (num / 10000).toFixed(1) + '万';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}
