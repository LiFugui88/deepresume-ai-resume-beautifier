// Career Template Data for Programmatic SEO Landing Pages
// Each career has optimized content for search engines

export interface CareerTemplate {
    slug: string;
    title: string;
    titleZh: string;
    category: 'tech' | 'business' | 'creative' | 'healthcare' | 'education' | 'engineering' | 'finance' | 'marketing' | 'legal' | 'other';
    metaTitle: string;
    metaDescription: string;
    h1: string;
    h1Zh: string;
    intro: string;
    introZh: string;
    whyBento: string;
    whyBentoZh: string;
    keySkills: string[];
    keySkillsZh: string[];
    recommendedTemplate: 'rio' | 'tokyo' | 'oslo' | 'milan' | 'nyc' | 'aurora' | 'midnight' | 'sunrise';
    sampleData: {
        name: string;
        title: string;
        summary: string;
    };
}

export const careerTemplates: CareerTemplate[] = [
    // =====================
    // TECH CAREERS
    // =====================
    {
        slug: 'software-engineer',
        title: 'Software Engineer',
        titleZh: '软件工程师',
        category: 'tech',
        metaTitle: 'Software Engineer Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a standout software engineer resume with CVGoPro. AI-powered Bento-style templates designed for tech professionals. Free to start.',
        h1: 'Software Engineer Resume Template',
        h1Zh: '软件工程师简历模板',
        intro: 'Stand out in the competitive tech industry with a modern, structured resume that showcases your technical skills and project experience.',
        introZh: '使用现代化、结构清晰的简历在竞争激烈的科技行业中脱颖而出，展示您的技术能力和项目经验。',
        whyBento: 'Bento-style layouts are perfect for software engineers because they allow you to organize complex information—like tech stacks, projects, and contributions—into visually digestible sections that recruiters can scan quickly.',
        whyBentoZh: 'Bento风格布局非常适合软件工程师，因为它可以将复杂信息（如技术栈、项目和贡献）组织成视觉上易于消化的部分，让招聘人员快速浏览。',
        keySkills: ['Programming Languages', 'Frameworks & Libraries', 'Cloud & DevOps', 'System Design', 'Version Control'],
        keySkillsZh: ['编程语言', '框架与库', '云计算与DevOps', '系统设计', '版本控制'],
        recommendedTemplate: 'tokyo',
        sampleData: { name: 'Alex Chen', title: 'Senior Software Engineer', summary: '8+ years building scalable web applications' }
    },
    {
        slug: 'frontend-developer',
        title: 'Frontend Developer',
        titleZh: '前端开发工程师',
        category: 'tech',
        metaTitle: 'Frontend Developer Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a stunning frontend developer resume with CVGoPro. Showcase your UI/UX skills with our AI-powered Bento-style templates. Free to use.',
        h1: 'Frontend Developer Resume Template',
        h1Zh: '前端开发工程师简历模板',
        intro: 'Your resume should reflect your design sensibility. Create a visually appealing frontend developer resume that demonstrates your eye for detail.',
        introZh: '您的简历应该体现您的设计美感。创建一份视觉吸引力强的前端开发简历，展示您对细节的把控。',
        whyBento: 'As a frontend developer, your resume is your first portfolio piece. Bento layouts let you showcase your aesthetic sense while maintaining professional structure.',
        whyBentoZh: '作为前端开发人员，您的简历是您的第一件作品集。Bento布局让您在保持专业结构的同时展示美感。',
        keySkills: ['React/Vue/Angular', 'TypeScript', 'CSS/Tailwind', 'Responsive Design', 'Performance Optimization'],
        keySkillsZh: ['React/Vue/Angular', 'TypeScript', 'CSS/Tailwind', '响应式设计', '性能优化'],
        recommendedTemplate: 'milan',
        sampleData: { name: 'Sarah Kim', title: 'Frontend Developer', summary: 'Creating beautiful, accessible web experiences' }
    },
    {
        slug: 'backend-developer',
        title: 'Backend Developer',
        titleZh: '后端开发工程师',
        category: 'tech',
        metaTitle: 'Backend Developer Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a professional backend developer resume with CVGoPro. Highlight your server-side expertise with AI-powered Bento templates.',
        h1: 'Backend Developer Resume Template',
        h1Zh: '后端开发工程师简历模板',
        intro: 'Highlight your server-side expertise with a clean, organized resume that emphasizes your architecture decisions and system reliability achievements.',
        introZh: '用简洁有序的简历突出您的服务器端专业知识，强调您的架构决策和系统可靠性成就。',
        whyBento: 'Backend developers deal with complex systems. Bento layouts help you present database designs, API architectures, and performance metrics in a structured, easy-to-understand format.',
        whyBentoZh: '后端开发人员处理复杂系统。Bento布局帮助您以结构化、易于理解的格式呈现数据库设计、API架构和性能指标。',
        keySkills: ['Node.js/Python/Java', 'Database Design', 'API Development', 'Microservices', 'Security'],
        keySkillsZh: ['Node.js/Python/Java', '数据库设计', 'API开发', '微服务', '安全'],
        recommendedTemplate: 'tokyo',
        sampleData: { name: 'Michael Zhang', title: 'Backend Developer', summary: 'Building robust, scalable server architectures' }
    },
    {
        slug: 'full-stack-developer',
        title: 'Full Stack Developer',
        titleZh: '全栈开发工程师',
        category: 'tech',
        metaTitle: 'Full Stack Developer Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a comprehensive full stack developer resume with CVGoPro. Showcase both frontend and backend skills with Bento-style layouts.',
        h1: 'Full Stack Developer Resume Template',
        h1Zh: '全栈开发工程师简历模板',
        intro: 'Demonstrate your versatility across the entire tech stack with a resume that balances frontend creativity and backend robustness.',
        introZh: '用一份平衡前端创意和后端稳健性的简历，展示您在整个技术栈中的多才多艺。',
        whyBento: 'Full stack developers need to show breadth and depth. Bento layouts excel at organizing diverse skill sets without overwhelming the reader.',
        whyBentoZh: '全栈开发人员需要展示广度和深度。Bento布局擅长组织多样化的技能集，而不会让读者感到overwhelming。',
        keySkills: ['Frontend Frameworks', 'Backend Languages', 'Databases', 'DevOps', 'System Architecture'],
        keySkillsZh: ['前端框架', '后端语言', '数据库', 'DevOps', '系统架构'],
        recommendedTemplate: 'oslo',
        sampleData: { name: 'David Park', title: 'Full Stack Developer', summary: 'End-to-end application development specialist' }
    },
    {
        slug: 'data-scientist',
        title: 'Data Scientist',
        titleZh: '数据科学家',
        category: 'tech',
        metaTitle: 'Data Scientist Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create an impactful data scientist resume with CVGoPro. Showcase your ML models and insights with AI-powered Bento templates.',
        h1: 'Data Scientist Resume Template',
        h1Zh: '数据科学家简历模板',
        intro: 'Present your analytical prowess and machine learning expertise with a data-driven resume that speaks to hiring managers.',
        introZh: '用数据驱动的简历展示您的分析能力和机器学习专业知识，打动招聘经理。',
        whyBento: 'Data scientists work with complex models and insights. Bento layouts help you present your projects, methodologies, and business impact in a visually compelling way.',
        whyBentoZh: '数据科学家处理复杂的模型和洞察。Bento布局帮助您以视觉吸引力的方式呈现您的项目、方法论和业务影响。',
        keySkills: ['Python/R', 'Machine Learning', 'Statistical Analysis', 'Data Visualization', 'Big Data Tools'],
        keySkillsZh: ['Python/R', '机器学习', '统计分析', '数据可视化', '大数据工具'],
        recommendedTemplate: 'midnight',
        sampleData: { name: 'Emily Wang', title: 'Senior Data Scientist', summary: 'Turning data into actionable business insights' }
    },
    {
        slug: 'machine-learning-engineer',
        title: 'Machine Learning Engineer',
        titleZh: '机器学习工程师',
        category: 'tech',
        metaTitle: 'Machine Learning Engineer Resume Template | CVGoPro',
        metaDescription: 'Build a powerful ML engineer resume with CVGoPro. Highlight your deep learning and model deployment skills with Bento-style templates.',
        h1: 'Machine Learning Engineer Resume Template',
        h1Zh: '机器学习工程师简历模板',
        intro: 'Showcase your expertise in building and deploying ML models at scale with a resume designed for the AI industry.',
        introZh: '用专为AI行业设计的简历展示您在大规模构建和部署ML模型方面的专业知识。',
        whyBento: 'ML engineers bridge research and production. Bento layouts help you present both your technical depth and practical deployment experience.',
        whyBentoZh: 'ML工程师连接研究和生产。Bento布局帮助您展示技术深度和实际部署经验。',
        keySkills: ['TensorFlow/PyTorch', 'MLOps', 'Model Optimization', 'Deep Learning', 'Production Deployment'],
        keySkillsZh: ['TensorFlow/PyTorch', 'MLOps', '模型优化', '深度学习', '生产部署'],
        recommendedTemplate: 'tokyo',
        sampleData: { name: 'Kevin Liu', title: 'ML Engineer', summary: 'Deploying AI solutions at scale' }
    },
    {
        slug: 'devops-engineer',
        title: 'DevOps Engineer',
        titleZh: 'DevOps工程师',
        category: 'tech',
        metaTitle: 'DevOps Engineer Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a professional DevOps engineer resume with CVGoPro. Showcase your CI/CD and cloud expertise with Bento-style templates.',
        h1: 'DevOps Engineer Resume Template',
        h1Zh: 'DevOps工程师简历模板',
        intro: 'Demonstrate your expertise in automation, infrastructure, and continuous delivery with a resume that reflects operational excellence.',
        introZh: '用体现卓越运营的简历展示您在自动化、基础设施和持续交付方面的专业知识。',
        whyBento: 'DevOps is about systems and processes. Bento layouts perfectly represent the interconnected nature of your work across development and operations.',
        whyBentoZh: 'DevOps关乎系统和流程。Bento布局完美地呈现了您在开发和运营之间工作的互联性质。',
        keySkills: ['AWS/GCP/Azure', 'Kubernetes/Docker', 'CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring'],
        keySkillsZh: ['AWS/GCP/Azure', 'Kubernetes/Docker', 'CI/CD流水线', '基础设施即代码', '监控'],
        recommendedTemplate: 'oslo',
        sampleData: { name: 'James Wilson', title: 'Senior DevOps Engineer', summary: 'Automating infrastructure and accelerating delivery' }
    },
    {
        slug: 'cloud-architect',
        title: 'Cloud Architect',
        titleZh: '云架构师',
        category: 'tech',
        metaTitle: 'Cloud Architect Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build an impressive cloud architect resume with CVGoPro. Showcase your cloud design expertise with AI-powered Bento templates.',
        h1: 'Cloud Architect Resume Template',
        h1Zh: '云架构师简历模板',
        intro: 'Present your cloud architecture expertise and multi-cloud strategies with a resume that demonstrates technical leadership.',
        introZh: '用展示技术领导力的简历呈现您的云架构专业知识和多云策略。',
        whyBento: 'Cloud architecture involves complex diagrams and systems. Bento layouts help you communicate your architectural decisions clearly.',
        whyBentoZh: '云架构涉及复杂的图表和系统。Bento布局帮助您清晰地传达架构决策。',
        keySkills: ['Multi-cloud Strategy', 'Solution Architecture', 'Cost Optimization', 'Security & Compliance', 'Migration Planning'],
        keySkillsZh: ['多云策略', '解决方案架构', '成本优化', '安全与合规', '迁移规划'],
        recommendedTemplate: 'midnight',
        sampleData: { name: 'Robert Chen', title: 'Cloud Architect', summary: 'Designing scalable, cost-effective cloud solutions' }
    },
    {
        slug: 'cybersecurity-analyst',
        title: 'Cybersecurity Analyst',
        titleZh: '网络安全分析师',
        category: 'tech',
        metaTitle: 'Cybersecurity Analyst Resume Template | CVGoPro',
        metaDescription: 'Create a strong cybersecurity analyst resume with CVGoPro. Highlight your security skills with professional Bento-style templates.',
        h1: 'Cybersecurity Analyst Resume Template',
        h1Zh: '网络安全分析师简历模板',
        intro: 'Showcase your security expertise and threat analysis skills with a professional resume that builds trust.',
        introZh: '用建立信任的专业简历展示您的安全专业知识和威胁分析技能。',
        whyBento: 'Security professionals need to convey competence and attention to detail. Bento layouts project the organized, methodical approach essential in cybersecurity.',
        whyBentoZh: '安全专业人员需要传达能力和对细节的关注。Bento布局展现了网络安全中必不可少的有组织、有条理的方法。',
        keySkills: ['Threat Detection', 'Penetration Testing', 'SIEM Tools', 'Incident Response', 'Compliance'],
        keySkillsZh: ['威胁检测', '渗透测试', 'SIEM工具', '事件响应', '合规'],
        recommendedTemplate: 'tokyo',
        sampleData: { name: 'Lisa Martinez', title: 'Cybersecurity Analyst', summary: 'Protecting organizations from cyber threats' }
    },
    {
        slug: 'mobile-developer',
        title: 'Mobile Developer',
        titleZh: '移动开发工程师',
        category: 'tech',
        metaTitle: 'Mobile Developer Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a standout mobile developer resume with CVGoPro. Showcase your iOS/Android expertise with Bento-style templates.',
        h1: 'Mobile Developer Resume Template',
        h1Zh: '移动开发工程师简历模板',
        intro: 'Highlight your mobile app development skills with a resume that showcases your published apps and technical expertise.',
        introZh: '用展示您已发布的应用和技术专长的简历突出您的移动应用开发技能。',
        whyBento: 'Mobile developers create visual experiences. Your resume should reflect the same attention to user experience that you bring to your apps.',
        whyBentoZh: '移动开发人员创造视觉体验。您的简历应该反映您为应用带来的相同用户体验关注。',
        keySkills: ['iOS/Swift', 'Android/Kotlin', 'React Native/Flutter', 'App Store Optimization', 'Mobile UI/UX'],
        keySkillsZh: ['iOS/Swift', 'Android/Kotlin', 'React Native/Flutter', '应用商店优化', '移动UI/UX'],
        recommendedTemplate: 'milan',
        sampleData: { name: 'Chris Johnson', title: 'Mobile Developer', summary: 'Building engaging mobile experiences' }
    },
    {
        slug: 'qa-engineer',
        title: 'QA Engineer',
        titleZh: '测试工程师',
        category: 'tech',
        metaTitle: 'QA Engineer Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a professional QA engineer resume with CVGoPro. Highlight your testing expertise with AI-powered Bento templates.',
        h1: 'QA Engineer Resume Template',
        h1Zh: '测试工程师简历模板',
        intro: 'Demonstrate your testing methodology and quality assurance expertise with a meticulous, well-organized resume.',
        introZh: '用细致、组织良好的简历展示您的测试方法论和质量保证专业知识。',
        whyBento: 'QA engineers value precision and organization. Bento layouts reflect these qualities, showing employers your systematic approach.',
        whyBentoZh: 'QA工程师重视精确和组织。Bento布局反映这些品质，向雇主展示您的系统方法。',
        keySkills: ['Test Automation', 'Selenium/Cypress', 'API Testing', 'Performance Testing', 'CI/CD Integration'],
        keySkillsZh: ['测试自动化', 'Selenium/Cypress', 'API测试', '性能测试', 'CI/CD集成'],
        recommendedTemplate: 'oslo',
        sampleData: { name: 'Anna Lee', title: 'QA Engineer', summary: 'Ensuring software quality through automation' }
    },
    {
        slug: 'database-administrator',
        title: 'Database Administrator',
        titleZh: '数据库管理员',
        category: 'tech',
        metaTitle: 'Database Administrator Resume Template | CVGoPro',
        metaDescription: 'Build a professional DBA resume with CVGoPro. Showcase your database management skills with Bento-style templates.',
        h1: 'Database Administrator Resume Template',
        h1Zh: '数据库管理员简历模板',
        intro: 'Present your database management expertise and optimization achievements with a structured, professional resume.',
        introZh: '用结构化、专业的简历呈现您的数据库管理专业知识和优化成就。',
        whyBento: 'DBAs manage structured data. Your resume should reflect this with clear organization and logical flow.',
        whyBentoZh: 'DBA管理结构化数据。您的简历应该用清晰的组织和逻辑流程来反映这一点。',
        keySkills: ['SQL/NoSQL', 'Performance Tuning', 'Backup & Recovery', 'Database Security', 'High Availability'],
        keySkillsZh: ['SQL/NoSQL', '性能调优', '备份与恢复', '数据库安全', '高可用性'],
        recommendedTemplate: 'tokyo',
        sampleData: { name: 'Tom Brown', title: 'Senior DBA', summary: 'Optimizing database performance and reliability' }
    },

    // =====================
    // PRODUCT & DESIGN
    // =====================
    {
        slug: 'product-manager',
        title: 'Product Manager',
        titleZh: '产品经理',
        category: 'business',
        metaTitle: 'Product Manager Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a compelling product manager resume with CVGoPro. Showcase your product vision and execution with Bento-style templates.',
        h1: 'Product Manager Resume Template',
        h1Zh: '产品经理简历模板',
        intro: 'Tell your product story with a resume that highlights your strategic thinking, user empathy, and measurable impact.',
        introZh: '用突出您的战略思维、用户同理心和可衡量影响的简历讲述您的产品故事。',
        whyBento: 'Product managers excel at organizing complex information. Bento layouts mirror your ability to structure roadmaps and prioritize features.',
        whyBentoZh: '产品经理擅长组织复杂信息。Bento布局反映了您构建路线图和确定功能优先级的能力。',
        keySkills: ['Product Strategy', 'User Research', 'Agile/Scrum', 'Data Analysis', 'Stakeholder Management'],
        keySkillsZh: ['产品策略', '用户研究', '敏捷/Scrum', '数据分析', '利益相关者管理'],
        recommendedTemplate: 'milan',
        sampleData: { name: 'Jessica Chen', title: 'Senior Product Manager', summary: 'Building products users love' }
    },
    {
        slug: 'ux-designer',
        title: 'UX Designer',
        titleZh: 'UX设计师',
        category: 'creative',
        metaTitle: 'UX Designer Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Design a beautiful UX designer resume with CVGoPro. Showcase your design process and portfolio with Bento-style templates.',
        h1: 'UX Designer Resume Template',
        h1Zh: 'UX设计师简历模板',
        intro: 'Your resume is your first design project in the eyes of recruiters. Make it count with a beautiful, user-centered layout.',
        introZh: '在招聘人员眼中，您的简历是您的第一个设计项目。用美丽、以用户为中心的布局让它发挥作用。',
        whyBento: 'UX designers understand the power of visual hierarchy. Bento layouts let you demonstrate your design thinking right on your resume.',
        whyBentoZh: 'UX设计师理解视觉层次的力量。Bento布局让您在简历上展示设计思维。',
        keySkills: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Figma/Sketch'],
        keySkillsZh: ['用户研究', '线框图', '原型设计', '可用性测试', 'Figma/Sketch'],
        recommendedTemplate: 'rio',
        sampleData: { name: 'Maya Johnson', title: 'UX Designer', summary: 'Crafting intuitive digital experiences' }
    },
    {
        slug: 'ui-designer',
        title: 'UI Designer',
        titleZh: 'UI设计师',
        category: 'creative',
        metaTitle: 'UI Designer Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a stunning UI designer resume with CVGoPro. Showcase your visual design skills with beautiful Bento-style templates.',
        h1: 'UI Designer Resume Template',
        h1Zh: 'UI设计师简历模板',
        intro: 'Let your visual design skills shine through a resume that demonstrates your eye for aesthetics and attention to detail.',
        introZh: '让您的视觉设计技能通过展示审美眼光和注重细节的简历闪耀。',
        whyBento: 'UI designers create beautiful interfaces. Your resume should be a testament to your visual design capabilities.',
        whyBentoZh: 'UI设计师创造美丽的界面。您的简历应该证明您的视觉设计能力。',
        keySkills: ['Visual Design', 'Design Systems', 'Typography', 'Color Theory', 'Motion Design'],
        keySkillsZh: ['视觉设计', '设计系统', '排版', '色彩理论', '动效设计'],
        recommendedTemplate: 'aurora',
        sampleData: { name: 'Sophie Lee', title: 'UI Designer', summary: 'Creating pixel-perfect visual experiences' }
    },
    {
        slug: 'graphic-designer',
        title: 'Graphic Designer',
        titleZh: '平面设计师',
        category: 'creative',
        metaTitle: 'Graphic Designer Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a creative graphic designer resume with CVGoPro. Display your design portfolio with eye-catching Bento-style templates.',
        h1: 'Graphic Designer Resume Template',
        h1Zh: '平面设计师简历模板',
        intro: 'Make a strong visual impression with a resume that showcases your creative vision and design versatility.',
        introZh: '用展示您的创意愿景和设计多才多艺的简历留下强烈的视觉印象。',
        whyBento: 'Graphic designers are visual communicators. Bento layouts provide the canvas to showcase your aesthetic sensibility.',
        whyBentoZh: '平面设计师是视觉沟通者。Bento布局提供画布来展示您的审美感。',
        keySkills: ['Adobe Creative Suite', 'Brand Identity', 'Print Design', 'Digital Design', 'Illustration'],
        keySkillsZh: ['Adobe创意套件', '品牌标识', '印刷设计', '数字设计', '插画'],
        recommendedTemplate: 'sunrise',
        sampleData: { name: 'Oliver Smith', title: 'Graphic Designer', summary: 'Transforming ideas into visual stories' }
    },

    // =====================
    // BUSINESS & MANAGEMENT
    // =====================
    {
        slug: 'project-manager',
        title: 'Project Manager',
        titleZh: '项目经理',
        category: 'business',
        metaTitle: 'Project Manager Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a professional project manager resume with CVGoPro. Highlight your leadership and delivery track record with Bento templates.',
        h1: 'Project Manager Resume Template',
        h1Zh: '项目经理简历模板',
        intro: 'Demonstrate your ability to deliver projects on time and within budget with a well-structured, professional resume.',
        introZh: '用结构良好、专业的简历展示您按时按预算交付项目的能力。',
        whyBento: 'Project managers orchestrate complex initiatives. Bento layouts reflect your organizational skills and ability to manage multiple workstreams.',
        whyBentoZh: '项目经理协调复杂的计划。Bento布局反映了您的组织能力和管理多个工作流的能力。',
        keySkills: ['Project Planning', 'Risk Management', 'Stakeholder Communication', 'Agile/Waterfall', 'Budget Management'],
        keySkillsZh: ['项目规划', '风险管理', '利益相关者沟通', '敏捷/瀑布', '预算管理'],
        recommendedTemplate: 'oslo',
        sampleData: { name: 'Daniel Kim', title: 'Senior Project Manager', summary: 'Delivering complex projects successfully' }
    },
    {
        slug: 'business-analyst',
        title: 'Business Analyst',
        titleZh: '业务分析师',
        category: 'business',
        metaTitle: 'Business Analyst Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a compelling business analyst resume with CVGoPro. Showcase your analytical skills with professional Bento-style templates.',
        h1: 'Business Analyst Resume Template',
        h1Zh: '业务分析师简历模板',
        intro: 'Present your analytical capabilities and business acumen with a resume that bridges technical and business stakeholders.',
        introZh: '用连接技术和业务利益相关者的简历呈现您的分析能力和商业敏锐度。',
        whyBento: 'Business analysts translate complex requirements. Bento layouts help you present your ability to organize and communicate information effectively.',
        whyBentoZh: '业务分析师翻译复杂需求。Bento布局帮助您展示有效组织和沟通信息的能力。',
        keySkills: ['Requirements Analysis', 'Process Mapping', 'Data Analysis', 'SQL', 'Stakeholder Management'],
        keySkillsZh: ['需求分析', '流程映射', '数据分析', 'SQL', '利益相关者管理'],
        recommendedTemplate: 'rio',
        sampleData: { name: 'Rachel Green', title: 'Business Analyst', summary: 'Bridging business needs and technical solutions' }
    },
    {
        slug: 'operations-manager',
        title: 'Operations Manager',
        titleZh: '运营经理',
        category: 'business',
        metaTitle: 'Operations Manager Resume Template | CVGoPro',
        metaDescription: 'Create an impactful operations manager resume with CVGoPro. Highlight your operational excellence with Bento-style templates.',
        h1: 'Operations Manager Resume Template',
        h1Zh: '运营经理简历模板',
        intro: 'Showcase your operational excellence and process optimization achievements with a results-driven resume.',
        introZh: '用结果驱动的简历展示您的卓越运营和流程优化成就。',
        whyBento: 'Operations managers optimize systems and processes. Your resume should reflect the same efficiency and organization you bring to your work.',
        whyBentoZh: '运营经理优化系统和流程。您的简历应该反映您为工作带来的相同效率和组织。',
        keySkills: ['Process Optimization', 'Team Leadership', 'Vendor Management', 'KPI Tracking', 'Cost Reduction'],
        keySkillsZh: ['流程优化', '团队领导', '供应商管理', 'KPI跟踪', '成本降低'],
        recommendedTemplate: 'tokyo',
        sampleData: { name: 'Mark Johnson', title: 'Operations Manager', summary: 'Driving operational efficiency and growth' }
    },
    {
        slug: 'consultant',
        title: 'Management Consultant',
        titleZh: '管理咨询师',
        category: 'business',
        metaTitle: 'Management Consultant Resume Template | CVGoPro',
        metaDescription: 'Build a polished consultant resume with CVGoPro. Present your advisory experience with professional Bento-style templates.',
        h1: 'Management Consultant Resume Template',
        h1Zh: '管理咨询师简历模板',
        intro: 'Position yourself as a trusted advisor with a resume that highlights your strategic thinking and client impact.',
        introZh: '用突出您的战略思维和客户影响的简历将自己定位为值得信赖的顾问。',
        whyBento: 'Consultants present complex solutions. Bento layouts demonstrate your ability to structure and communicate sophisticated recommendations.',
        whyBentoZh: '咨询师呈现复杂的解决方案。Bento布局展示您构建和传达复杂建议的能力。',
        keySkills: ['Strategy Development', 'Change Management', 'Client Engagement', 'Problem Solving', 'Presentation'],
        keySkillsZh: ['战略制定', '变革管理', '客户参与', '问题解决', '演示'],
        recommendedTemplate: 'milan',
        sampleData: { name: 'Catherine Lee', title: 'Senior Consultant', summary: 'Driving transformation for Fortune 500 clients' }
    },

    // =====================
    // MARKETING & SALES
    // =====================
    {
        slug: 'marketing-manager',
        title: 'Marketing Manager',
        titleZh: '市场经理',
        category: 'marketing',
        metaTitle: 'Marketing Manager Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a dynamic marketing manager resume with CVGoPro. Showcase your campaigns and ROI with eye-catching Bento templates.',
        h1: 'Marketing Manager Resume Template',
        h1Zh: '市场经理简历模板',
        intro: 'Market yourself effectively with a resume that demonstrates your campaign successes and brand-building expertise.',
        introZh: '用展示您的活动成功和品牌建设专业知识的简历有效地推销自己。',
        whyBento: 'Marketing managers understand visual impact. Bento layouts let you present your achievements in a way that grabs attention—just like your campaigns.',
        whyBentoZh: '市场经理理解视觉影响。Bento布局让您以吸引注意力的方式呈现成就——就像您的活动一样。',
        keySkills: ['Campaign Management', 'Brand Strategy', 'Digital Marketing', 'Analytics', 'Team Leadership'],
        keySkillsZh: ['活动管理', '品牌策略', '数字营销', '分析', '团队领导'],
        recommendedTemplate: 'sunrise',
        sampleData: { name: 'Amanda White', title: 'Marketing Manager', summary: 'Building brands that resonate' }
    },
    {
        slug: 'digital-marketing-specialist',
        title: 'Digital Marketing Specialist',
        titleZh: '数字营销专员',
        category: 'marketing',
        metaTitle: 'Digital Marketing Specialist Resume Template | CVGoPro',
        metaDescription: 'Build a results-driven digital marketing resume with CVGoPro. Highlight your online marketing skills with Bento-style templates.',
        h1: 'Digital Marketing Specialist Resume Template',
        h1Zh: '数字营销专员简历模板',
        intro: 'Showcase your digital marketing expertise with metrics-driven achievements and platform proficiency.',
        introZh: '用数据驱动的成就和平台熟练度展示您的数字营销专业知识。',
        whyBento: 'Digital marketers work across multiple channels. Bento layouts help you organize your diverse skill set and platform experience.',
        whyBentoZh: '数字营销人员跨多个渠道工作。Bento布局帮助您组织多样化的技能和平台经验。',
        keySkills: ['SEO/SEM', 'Social Media Marketing', 'Email Marketing', 'Google Analytics', 'Content Marketing'],
        keySkillsZh: ['SEO/SEM', '社交媒体营销', '电子邮件营销', 'Google Analytics', '内容营销'],
        recommendedTemplate: 'nyc',
        sampleData: { name: 'Tyler Adams', title: 'Digital Marketing Specialist', summary: 'Driving growth through digital channels' }
    },
    {
        slug: 'content-marketing-manager',
        title: 'Content Marketing Manager',
        titleZh: '内容营销经理',
        category: 'marketing',
        metaTitle: 'Content Marketing Manager Resume Template | CVGoPro',
        metaDescription: 'Create a compelling content marketing resume with CVGoPro. Showcase your storytelling skills with Bento-style templates.',
        h1: 'Content Marketing Manager Resume Template',
        h1Zh: '内容营销经理简历模板',
        intro: 'Tell your professional story as compellingly as you tell your brand stories.',
        introZh: '像讲述品牌故事一样有说服力地讲述您的职业故事。',
        whyBento: 'Content marketers are storytellers. Bento layouts provide the structure for your career narrative while maintaining visual appeal.',
        whyBentoZh: '内容营销人员是讲故事的人。Bento布局为您的职业叙事提供结构，同时保持视觉吸引力。',
        keySkills: ['Content Strategy', 'SEO Writing', 'Editorial Planning', 'Video Content', 'Analytics'],
        keySkillsZh: ['内容策略', 'SEO写作', '编辑规划', '视频内容', '分析'],
        recommendedTemplate: 'rio',
        sampleData: { name: 'Nicole Brown', title: 'Content Marketing Manager', summary: 'Creating content that converts' }
    },
    {
        slug: 'sales-manager',
        title: 'Sales Manager',
        titleZh: '销售经理',
        category: 'marketing',
        metaTitle: 'Sales Manager Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a powerful sales manager resume with CVGoPro. Highlight your revenue achievements with professional Bento templates.',
        h1: 'Sales Manager Resume Template',
        h1Zh: '销售经理简历模板',
        intro: 'Close the deal on your next opportunity with a resume that showcases your revenue achievements and leadership skills.',
        introZh: '用展示您的收入成就和领导技能的简历赢得下一个机会。',
        whyBento: 'Sales managers need to make quick impressions. Bento layouts present your numbers and achievements in a format that\'s easy to scan.',
        whyBentoZh: '销售经理需要快速留下印象。Bento布局以易于浏览的格式呈现您的数字和成就。',
        keySkills: ['Revenue Growth', 'Team Leadership', 'CRM Systems', 'Pipeline Management', 'Negotiation'],
        keySkillsZh: ['收入增长', '团队领导', 'CRM系统', '销售管道管理', '谈判'],
        recommendedTemplate: 'tokyo',
        sampleData: { name: 'Brian Thompson', title: 'Sales Manager', summary: 'Exceeding targets and building winning teams' }
    },
    {
        slug: 'account-executive',
        title: 'Account Executive',
        titleZh: '客户经理',
        category: 'marketing',
        metaTitle: 'Account Executive Resume Template | CVGoPro',
        metaDescription: 'Create a winning account executive resume with CVGoPro. Showcase your sales achievements with Bento-style templates.',
        h1: 'Account Executive Resume Template',
        h1Zh: '客户经理简历模板',
        intro: 'Demonstrate your ability to build relationships and close deals with a professional, results-focused resume.',
        introZh: '用专业、结果导向的简历展示您建立关系和达成交易的能力。',
        whyBento: 'Account executives manage multiple relationships. Bento layouts help you organize your achievements across different accounts and industries.',
        whyBentoZh: '客户经理管理多个关系。Bento布局帮助您组织不同客户和行业的成就。',
        keySkills: ['B2B Sales', 'Account Management', 'Contract Negotiation', 'Relationship Building', 'Quota Achievement'],
        keySkillsZh: ['B2B销售', '客户管理', '合同谈判', '关系建立', '配额达成'],
        recommendedTemplate: 'milan',
        sampleData: { name: 'Jennifer Davis', title: 'Account Executive', summary: 'Building lasting client partnerships' }
    },

    // =====================
    // FINANCE & ACCOUNTING
    // =====================
    {
        slug: 'financial-analyst',
        title: 'Financial Analyst',
        titleZh: '金融分析师',
        category: 'finance',
        metaTitle: 'Financial Analyst Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a professional financial analyst resume with CVGoPro. Present your analytical skills with clean Bento-style templates.',
        h1: 'Financial Analyst Resume Template',
        h1Zh: '金融分析师简历模板',
        intro: 'Present your financial modeling expertise and analytical achievements with a polished, professional resume.',
        introZh: '用精美、专业的简历呈现您的财务建模专业知识和分析成就。',
        whyBento: 'Financial analysts work with structured data. Bento layouts reflect the precision and organization essential in financial analysis.',
        whyBentoZh: '金融分析师处理结构化数据。Bento布局反映了金融分析中必不可少的精确性和组织性。',
        keySkills: ['Financial Modeling', 'Valuation', 'Excel/VBA', 'Data Analysis', 'Forecasting'],
        keySkillsZh: ['财务建模', '估值', 'Excel/VBA', '数据分析', '预测'],
        recommendedTemplate: 'oslo',
        sampleData: { name: 'David Miller', title: 'Financial Analyst', summary: 'Transforming data into financial insights' }
    },
    {
        slug: 'accountant',
        title: 'Accountant',
        titleZh: '会计师',
        category: 'finance',
        metaTitle: 'Accountant Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a clean accountant resume with CVGoPro. Highlight your accounting expertise with professional Bento-style templates.',
        h1: 'Accountant Resume Template',
        h1Zh: '会计师简历模板',
        intro: 'Demonstrate your attention to detail and financial expertise with a meticulously organized resume.',
        introZh: '用精心组织的简历展示您对细节的关注和财务专业知识。',
        whyBento: 'Accountants value accuracy and organization. Your resume should reflect these qualities through clean structure and clear presentation.',
        whyBentoZh: '会计师重视准确性和组织性。您的简历应该通过清晰的结构和呈现来反映这些品质。',
        keySkills: ['Financial Reporting', 'GAAP/IFRS', 'Tax Preparation', 'Auditing', 'ERP Systems'],
        keySkillsZh: ['财务报告', 'GAAP/IFRS', '税务准备', '审计', 'ERP系统'],
        recommendedTemplate: 'rio',
        sampleData: { name: 'Sarah Wilson', title: 'Senior Accountant', summary: 'Ensuring financial accuracy and compliance' }
    },
    {
        slug: 'investment-banker',
        title: 'Investment Banker',
        titleZh: '投资银行家',
        category: 'finance',
        metaTitle: 'Investment Banker Resume Template | CVGoPro',
        metaDescription: 'Build a polished investment banker resume with CVGoPro. Present your deal experience with professional Bento templates.',
        h1: 'Investment Banker Resume Template',
        h1Zh: '投资银行家简历模板',
        intro: 'Position yourself for top-tier opportunities with a resume that showcases your deal experience and technical skills.',
        introZh: '用展示您的交易经验和技术技能的简历为顶级机会定位自己。',
        whyBento: 'Investment bankers work on high-stakes deals. Your resume should project the same professionalism and attention to detail.',
        whyBentoZh: '投资银行家从事高风险交易。您的简历应该展现相同的专业精神和对细节的关注。',
        keySkills: ['M&A Advisory', 'Financial Modeling', 'Due Diligence', 'Valuation', 'Pitchbook Creation'],
        keySkillsZh: ['并购咨询', '财务建模', '尽职调查', '估值', '宣传册制作'],
        recommendedTemplate: 'midnight',
        sampleData: { name: 'Andrew Chen', title: 'Investment Banking Analyst', summary: 'Executing complex financial transactions' }
    },

    // =====================
    // HEALTHCARE
    // =====================
    {
        slug: 'registered-nurse',
        title: 'Registered Nurse',
        titleZh: '注册护士',
        category: 'healthcare',
        metaTitle: 'Registered Nurse Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a professional nursing resume with CVGoPro. Highlight your clinical skills with clean Bento-style templates.',
        h1: 'Registered Nurse Resume Template',
        h1Zh: '注册护士简历模板',
        intro: 'Present your clinical expertise and patient care achievements with a professional healthcare resume.',
        introZh: '用专业的医疗保健简历呈现您的临床专业知识和患者护理成就。',
        whyBento: 'Nurses manage complex patient information. Bento layouts help you organize your certifications, specialties, and experience clearly.',
        whyBentoZh: '护士管理复杂的患者信息。Bento布局帮助您清晰地组织认证、专业和经验。',
        keySkills: ['Patient Care', 'Clinical Assessment', 'Electronic Health Records', 'Emergency Response', 'Team Collaboration'],
        keySkillsZh: ['患者护理', '临床评估', '电子健康记录', '紧急响应', '团队协作'],
        recommendedTemplate: 'rio',
        sampleData: { name: 'Michelle Thomas', title: 'Registered Nurse', summary: 'Providing compassionate, evidence-based care' }
    },
    {
        slug: 'physician',
        title: 'Physician',
        titleZh: '医生',
        category: 'healthcare',
        metaTitle: 'Physician CV Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a comprehensive physician CV with CVGoPro. Present your medical credentials with professional Bento-style templates.',
        h1: 'Physician CV Template',
        h1Zh: '医生简历模板',
        intro: 'Present your medical credentials, research experience, and clinical achievements with a comprehensive CV.',
        introZh: '用全面的简历呈现您的医学资历、研究经验和临床成就。',
        whyBento: 'Physicians have extensive credentials. Bento layouts help organize education, certifications, publications, and experience effectively.',
        whyBentoZh: '医生有广泛的资历。Bento布局有效地帮助组织教育、认证、出版物和经验。',
        keySkills: ['Clinical Practice', 'Diagnosis', 'Patient Management', 'Research', 'Medical Leadership'],
        keySkillsZh: ['临床实践', '诊断', '患者管理', '研究', '医疗领导'],
        recommendedTemplate: 'oslo',
        sampleData: { name: 'Dr. Robert Lee', title: 'Physician', summary: 'Dedicated to patient-centered medicine' }
    },
    {
        slug: 'pharmacist',
        title: 'Pharmacist',
        titleZh: '药剂师',
        category: 'healthcare',
        metaTitle: 'Pharmacist Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a professional pharmacist resume with CVGoPro. Highlight your pharmaceutical expertise with Bento-style templates.',
        h1: 'Pharmacist Resume Template',
        h1Zh: '药剂师简历模板',
        intro: 'Showcase your pharmaceutical knowledge and patient counseling skills with a professional, well-organized resume.',
        introZh: '用专业、组织良好的简历展示您的药学知识和患者咨询技能。',
        whyBento: 'Pharmacists manage detailed medication information. Bento layouts reflect your ability to organize complex pharmaceutical data.',
        whyBentoZh: '药剂师管理详细的药物信息。Bento布局反映了您组织复杂药物数据的能力。',
        keySkills: ['Medication Management', 'Patient Counseling', 'Drug Interactions', 'Pharmacy Operations', 'Regulatory Compliance'],
        keySkillsZh: ['药物管理', '患者咨询', '药物相互作用', '药房运营', '法规合规'],
        recommendedTemplate: 'rio',
        sampleData: { name: 'Linda Chen', title: 'Clinical Pharmacist', summary: 'Optimizing medication therapy outcomes' }
    },

    // =====================
    // EDUCATION
    // =====================
    {
        slug: 'teacher',
        title: 'Teacher',
        titleZh: '教师',
        category: 'education',
        metaTitle: 'Teacher Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create an engaging teacher resume with CVGoPro. Showcase your teaching experience with professional Bento-style templates.',
        h1: 'Teacher Resume Template',
        h1Zh: '教师简历模板',
        intro: 'Demonstrate your passion for education and student success with a well-structured teaching resume.',
        introZh: '用结构良好的教学简历展示您对教育和学生成功的热情。',
        whyBento: 'Teachers organize complex curricula. Bento layouts reflect your ability to structure information for optimal learning.',
        whyBentoZh: '教师组织复杂的课程。Bento布局反映了您为最佳学习组织信息的能力。',
        keySkills: ['Curriculum Development', 'Classroom Management', 'Student Assessment', 'Educational Technology', 'Differentiated Instruction'],
        keySkillsZh: ['课程开发', '课堂管理', '学生评估', '教育技术', '差异化教学'],
        recommendedTemplate: 'sunrise',
        sampleData: { name: 'Elizabeth Moore', title: 'High School Teacher', summary: 'Inspiring the next generation of learners' }
    },
    {
        slug: 'professor',
        title: 'Professor',
        titleZh: '教授',
        category: 'education',
        metaTitle: 'Professor CV Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a comprehensive academic CV with CVGoPro. Present your research and teaching with professional Bento-style templates.',
        h1: 'Professor CV Template',
        h1Zh: '教授简历模板',
        intro: 'Present your academic achievements, research publications, and teaching philosophy with a comprehensive CV.',
        introZh: '用全面的简历呈现您的学术成就、研究出版物和教学理念。',
        whyBento: 'Academic CVs require extensive organization. Bento layouts help structure publications, grants, teaching, and service effectively.',
        whyBentoZh: '学术简历需要广泛的组织。Bento布局有效地帮助组织出版物、资助、教学和服务。',
        keySkills: ['Research', 'Teaching', 'Grant Writing', 'Publication', 'Academic Leadership'],
        keySkillsZh: ['研究', '教学', '资助写作', '出版', '学术领导'],
        recommendedTemplate: 'oslo',
        sampleData: { name: 'Dr. James Anderson', title: 'Associate Professor', summary: 'Advancing knowledge through research and teaching' }
    },

    // =====================
    // ENGINEERING
    // =====================
    {
        slug: 'mechanical-engineer',
        title: 'Mechanical Engineer',
        titleZh: '机械工程师',
        category: 'engineering',
        metaTitle: 'Mechanical Engineer Resume Template | CVGoPro',
        metaDescription: 'Build a professional mechanical engineer resume with CVGoPro. Highlight your engineering skills with Bento-style templates.',
        h1: 'Mechanical Engineer Resume Template',
        h1Zh: '机械工程师简历模板',
        intro: 'Showcase your engineering expertise and project achievements with a technical, well-organized resume.',
        introZh: '用技术性强、组织良好的简历展示您的工程专业知识和项目成就。',
        whyBento: 'Mechanical engineers work on complex systems. Bento layouts help present your projects and technical specifications clearly.',
        whyBentoZh: '机械工程师从事复杂系统的工作。Bento布局帮助清晰地呈现您的项目和技术规格。',
        keySkills: ['CAD/CAM', 'Product Design', 'Manufacturing Processes', 'Thermal Analysis', 'Project Management'],
        keySkillsZh: ['CAD/CAM', '产品设计', '制造工艺', '热分析', '项目管理'],
        recommendedTemplate: 'tokyo',
        sampleData: { name: 'Ryan Johnson', title: 'Mechanical Engineer', summary: 'Designing innovative mechanical solutions' }
    },
    {
        slug: 'electrical-engineer',
        title: 'Electrical Engineer',
        titleZh: '电气工程师',
        category: 'engineering',
        metaTitle: 'Electrical Engineer Resume Template | CVGoPro',
        metaDescription: 'Create a professional electrical engineer resume with CVGoPro. Showcase your technical expertise with Bento-style templates.',
        h1: 'Electrical Engineer Resume Template',
        h1Zh: '电气工程师简历模板',
        intro: 'Present your electrical engineering expertise and circuit design skills with a technical, structured resume.',
        introZh: '用技术性强、结构化的简历呈现您的电气工程专业知识和电路设计技能。',
        whyBento: 'Electrical engineers design complex circuits. Bento layouts mirror the systematic approach essential in electrical design.',
        whyBentoZh: '电气工程师设计复杂电路。Bento布局反映了电气设计中必不可少的系统方法。',
        keySkills: ['Circuit Design', 'PCB Layout', 'Power Systems', 'Embedded Systems', 'Signal Processing'],
        keySkillsZh: ['电路设计', 'PCB布局', '电力系统', '嵌入式系统', '信号处理'],
        recommendedTemplate: 'oslo',
        sampleData: { name: 'Kevin Park', title: 'Electrical Engineer', summary: 'Powering innovation through electrical design' }
    },
    {
        slug: 'civil-engineer',
        title: 'Civil Engineer',
        titleZh: '土木工程师',
        category: 'engineering',
        metaTitle: 'Civil Engineer Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a professional civil engineer resume with CVGoPro. Present your infrastructure projects with Bento-style templates.',
        h1: 'Civil Engineer Resume Template',
        h1Zh: '土木工程师简历模板',
        intro: 'Showcase your infrastructure projects and structural engineering expertise with a professional resume.',
        introZh: '用专业的简历展示您的基础设施项目和结构工程专业知识。',
        whyBento: 'Civil engineers build lasting structures. Your resume should reflect the same attention to foundation and structure.',
        whyBentoZh: '土木工程师建造持久的结构。您的简历应该反映对基础和结构的相同关注。',
        keySkills: ['Structural Analysis', 'AutoCAD/Revit', 'Project Management', 'Site Supervision', 'Regulatory Compliance'],
        keySkillsZh: ['结构分析', 'AutoCAD/Revit', '项目管理', '现场监督', '法规合规'],
        recommendedTemplate: 'tokyo',
        sampleData: { name: 'Matthew Clark', title: 'Civil Engineer', summary: 'Building infrastructure for tomorrow' }
    },

    // =====================
    // LEGAL
    // =====================
    {
        slug: 'lawyer',
        title: 'Lawyer',
        titleZh: '律师',
        category: 'legal',
        metaTitle: 'Lawyer Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a polished lawyer resume with CVGoPro. Present your legal expertise with professional Bento-style templates.',
        h1: 'Lawyer Resume Template',
        h1Zh: '律师简历模板',
        intro: 'Present your legal expertise and case achievements with a polished, professional resume.',
        introZh: '用精致、专业的简历呈现您的法律专业知识和案件成就。',
        whyBento: 'Lawyers organize complex arguments. Bento layouts reflect the structured thinking essential in legal practice.',
        whyBentoZh: '律师组织复杂的论点。Bento布局反映了法律实践中必不可少的结构化思维。',
        keySkills: ['Legal Research', 'Contract Drafting', 'Litigation', 'Negotiation', 'Client Counseling'],
        keySkillsZh: ['法律研究', '合同起草', '诉讼', '谈判', '客户咨询'],
        recommendedTemplate: 'midnight',
        sampleData: { name: 'Victoria Adams', title: 'Attorney', summary: 'Advocating for clients with excellence' }
    },
    {
        slug: 'paralegal',
        title: 'Paralegal',
        titleZh: '律师助理',
        category: 'legal',
        metaTitle: 'Paralegal Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a professional paralegal resume with CVGoPro. Highlight your legal support skills with Bento-style templates.',
        h1: 'Paralegal Resume Template',
        h1Zh: '律师助理简历模板',
        intro: 'Demonstrate your legal research skills and attention to detail with a well-organized paralegal resume.',
        introZh: '用组织良好的律师助理简历展示您的法律研究技能和对细节的关注。',
        whyBento: 'Paralegals manage extensive documentation. Bento layouts showcase your organizational skills and research capabilities.',
        whyBentoZh: '律师助理管理大量文件。Bento布局展示您的组织技能和研究能力。',
        keySkills: ['Legal Research', 'Document Management', 'Case Preparation', 'E-Discovery', 'Client Communication'],
        keySkillsZh: ['法律研究', '文档管理', '案件准备', '电子发现', '客户沟通'],
        recommendedTemplate: 'rio',
        sampleData: { name: 'Christina Lee', title: 'Paralegal', summary: 'Supporting legal excellence through research' }
    },

    // =====================
    // HR & ADMIN
    // =====================
    {
        slug: 'human-resources-manager',
        title: 'Human Resources Manager',
        titleZh: '人力资源经理',
        category: 'business',
        metaTitle: 'HR Manager Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a professional HR manager resume with CVGoPro. Showcase your people management skills with Bento-style templates.',
        h1: 'Human Resources Manager Resume Template',
        h1Zh: '人力资源经理简历模板',
        intro: 'Demonstrate your people management expertise with a resume that reflects HR best practices.',
        introZh: '用反映人力资源最佳实践的简历展示您的人员管理专业知识。',
        whyBento: 'HR managers handle diverse responsibilities. Bento layouts help organize recruitment, development, and compliance experience.',
        whyBentoZh: '人力资源经理处理多样化的职责。Bento布局帮助组织招聘、发展和合规经验。',
        keySkills: ['Talent Acquisition', 'Employee Relations', 'Performance Management', 'HRIS', 'Compliance'],
        keySkillsZh: ['人才获取', '员工关系', '绩效管理', 'HRIS', '合规'],
        recommendedTemplate: 'rio',
        sampleData: { name: 'Samantha Brown', title: 'HR Manager', summary: 'Building engaged, high-performing teams' }
    },
    {
        slug: 'recruiter',
        title: 'Recruiter',
        titleZh: '招聘专员',
        category: 'business',
        metaTitle: 'Recruiter Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build an effective recruiter resume with CVGoPro. Highlight your talent acquisition skills with Bento-style templates.',
        h1: 'Recruiter Resume Template',
        h1Zh: '招聘专员简历模板',
        intro: 'Show that you practice what you preach with a standout recruiter resume.',
        introZh: '用出色的招聘简历展示您言行一致。',
        whyBento: 'Recruiters review hundreds of resumes. Stand out with a Bento layout that demonstrates you understand what great resumes look like.',
        whyBentoZh: '招聘人员审查数百份简历。用Bento布局脱颖而出，展示您理解优秀简历的样子。',
        keySkills: ['Sourcing', 'Interviewing', 'ATS Systems', 'Candidate Assessment', 'Offer Negotiation'],
        keySkillsZh: ['人才搜索', '面试', 'ATS系统', '候选人评估', 'Offer谈判'],
        recommendedTemplate: 'milan',
        sampleData: { name: 'Jason Taylor', title: 'Senior Recruiter', summary: 'Connecting top talent with great opportunities' }
    },
    {
        slug: 'executive-assistant',
        title: 'Executive Assistant',
        titleZh: '行政助理',
        category: 'business',
        metaTitle: 'Executive Assistant Resume Template | CVGoPro',
        metaDescription: 'Create a polished executive assistant resume with CVGoPro. Showcase your organizational skills with Bento-style templates.',
        h1: 'Executive Assistant Resume Template',
        h1Zh: '行政助理简历模板',
        intro: 'Demonstrate your exceptional organizational skills and executive support capabilities.',
        introZh: '展示您卓越的组织技能和高管支持能力。',
        whyBento: 'Executive assistants are master organizers. Your Bento resume will reflect the same meticulous attention to detail you bring to your work.',
        whyBentoZh: '行政助理是组织大师。您的Bento简历将反映您在工作中带来的同样细致的关注。',
        keySkills: ['Calendar Management', 'Travel Coordination', 'Meeting Planning', 'Document Preparation', 'Communication'],
        keySkillsZh: ['日程管理', '差旅协调', '会议规划', '文档准备', '沟通'],
        recommendedTemplate: 'rio',
        sampleData: { name: 'Ashley Martin', title: 'Executive Assistant', summary: 'Enabling executive productivity and success' }
    },

    // =====================
    // DATA & ANALYTICS
    // =====================
    {
        slug: 'data-analyst',
        title: 'Data Analyst',
        titleZh: '数据分析师',
        category: 'tech',
        metaTitle: 'Data Analyst Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a data-driven analyst resume with CVGoPro. Showcase your analytics skills with professional Bento-style templates.',
        h1: 'Data Analyst Resume Template',
        h1Zh: '数据分析师简历模板',
        intro: 'Present your analytical skills and data storytelling abilities with a metrics-focused resume.',
        introZh: '用指标导向的简历呈现您的分析技能和数据讲故事能力。',
        whyBento: 'Data analysts present complex insights simply. Bento layouts help you showcase your ability to organize and visualize information.',
        whyBentoZh: '数据分析师简单地呈现复杂的洞察。Bento布局帮助您展示组织和可视化信息的能力。',
        keySkills: ['SQL', 'Python/R', 'Tableau/Power BI', 'Statistical Analysis', 'Data Visualization'],
        keySkillsZh: ['SQL', 'Python/R', 'Tableau/Power BI', '统计分析', '数据可视化'],
        recommendedTemplate: 'oslo',
        sampleData: { name: 'Rachel Kim', title: 'Data Analyst', summary: 'Transforming raw data into business insights' }
    },
    {
        slug: 'data-engineer',
        title: 'Data Engineer',
        titleZh: '数据工程师',
        category: 'tech',
        metaTitle: 'Data Engineer Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a professional data engineer resume with CVGoPro. Highlight your data pipeline skills with Bento-style templates.',
        h1: 'Data Engineer Resume Template',
        h1Zh: '数据工程师简历模板',
        intro: 'Showcase your data pipeline architecture and ETL expertise with a technical, well-structured resume.',
        introZh: '用技术性强、结构良好的简历展示您的数据管道架构和ETL专业知识。',
        whyBento: 'Data engineers build data infrastructure. Bento layouts reflect the systematic, structured approach essential in data engineering.',
        whyBentoZh: '数据工程师构建数据基础设施。Bento布局反映了数据工程中必不可少的系统化、结构化方法。',
        keySkills: ['ETL/ELT', 'Apache Spark', 'Data Warehousing', 'Cloud Platforms', 'Data Modeling'],
        keySkillsZh: ['ETL/ELT', 'Apache Spark', '数据仓库', '云平台', '数据建模'],
        recommendedTemplate: 'tokyo',
        sampleData: { name: 'Steven Wang', title: 'Data Engineer', summary: 'Building robust data infrastructure at scale' }
    },
    {
        slug: 'business-intelligence-analyst',
        title: 'Business Intelligence Analyst',
        titleZh: 'BI分析师',
        category: 'tech',
        metaTitle: 'BI Analyst Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a compelling BI analyst resume with CVGoPro. Showcase your dashboard and reporting skills with Bento templates.',
        h1: 'Business Intelligence Analyst Resume Template',
        h1Zh: 'BI分析师简历模板',
        intro: 'Present your BI tool expertise and business insight capabilities with a data-focused resume.',
        introZh: '用数据导向的简历呈现您的BI工具专业知识和业务洞察能力。',
        whyBento: 'BI analysts create dashboards and reports. Your Bento resume demonstrates the same clarity you bring to your visualizations.',
        whyBentoZh: 'BI分析师创建仪表板和报告。您的Bento简历展示了您在可视化中带来的相同清晰度。',
        keySkills: ['Tableau/Power BI', 'SQL', 'Dashboard Design', 'KPI Development', 'Data Storytelling'],
        keySkillsZh: ['Tableau/Power BI', 'SQL', '仪表板设计', 'KPI开发', '数据讲故事'],
        recommendedTemplate: 'midnight',
        sampleData: { name: 'Monica Chen', title: 'BI Analyst', summary: 'Empowering decisions through data visualization' }
    },

    // =====================
    // CUSTOMER SERVICE
    // =====================
    {
        slug: 'customer-success-manager',
        title: 'Customer Success Manager',
        titleZh: '客户成功经理',
        category: 'business',
        metaTitle: 'Customer Success Manager Resume Template | CVGoPro',
        metaDescription: 'Create a customer-focused CSM resume with CVGoPro. Highlight your retention skills with Bento-style templates.',
        h1: 'Customer Success Manager Resume Template',
        h1Zh: '客户成功经理简历模板',
        intro: 'Demonstrate your ability to drive customer satisfaction and retention with a results-focused resume.',
        introZh: '用结果导向的简历展示您推动客户满意度和留存的能力。',
        whyBento: 'CSMs manage multiple customer relationships. Bento layouts help organize your achievements across different accounts and metrics.',
        whyBentoZh: 'CSM管理多个客户关系。Bento布局帮助组织不同客户和指标的成就。',
        keySkills: ['Customer Retention', 'Account Management', 'Onboarding', 'Upselling', 'NPS/CSAT'],
        keySkillsZh: ['客户留存', '客户管理', '入职培训', '追加销售', 'NPS/CSAT'],
        recommendedTemplate: 'rio',
        sampleData: { name: 'Lauren Smith', title: 'Customer Success Manager', summary: 'Turning customers into advocates' }
    },
    {
        slug: 'customer-service-representative',
        title: 'Customer Service Representative',
        titleZh: '客服代表',
        category: 'other',
        metaTitle: 'Customer Service Representative Resume Template | CVGoPro',
        metaDescription: 'Build a professional customer service resume with CVGoPro. Showcase your support skills with Bento-style templates.',
        h1: 'Customer Service Representative Resume Template',
        h1Zh: '客服代表简历模板',
        intro: 'Present your customer service excellence and problem-solving abilities with a clear, professional resume.',
        introZh: '用清晰、专业的简历呈现您的客户服务卓越和问题解决能力。',
        whyBento: 'Customer service requires clear communication. Bento layouts demonstrate your ability to present information in an organized, helpful way.',
        whyBentoZh: '客户服务需要清晰的沟通。Bento布局展示您以有组织、有帮助的方式呈现信息的能力。',
        keySkills: ['Customer Support', 'Problem Resolution', 'CRM Systems', 'Communication', 'Multitasking'],
        keySkillsZh: ['客户支持', '问题解决', 'CRM系统', '沟通', '多任务处理'],
        recommendedTemplate: 'sunrise',
        sampleData: { name: 'Emily Johnson', title: 'Customer Service Representative', summary: 'Delivering exceptional customer experiences' }
    },

    // =====================
    // CREATIVE & MEDIA
    // =====================
    {
        slug: 'video-editor',
        title: 'Video Editor',
        titleZh: '视频剪辑师',
        category: 'creative',
        metaTitle: 'Video Editor Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Create a dynamic video editor resume with CVGoPro. Showcase your editing portfolio with creative Bento-style templates.',
        h1: 'Video Editor Resume Template',
        h1Zh: '视频剪辑师简历模板',
        intro: 'Let your editing skills shine through a visually engaging resume that captures attention.',
        introZh: '让您的剪辑技能通过视觉吸引力的简历闪耀，吸引注意力。',
        whyBento: 'Video editors are visual storytellers. Bento layouts let you showcase your creative eye and technical expertise.',
        whyBentoZh: '视频剪辑师是视觉讲故事者。Bento布局让您展示创意眼光和技术专长。',
        keySkills: ['Adobe Premiere Pro', 'After Effects', 'Color Grading', 'Motion Graphics', 'Storytelling'],
        keySkillsZh: ['Adobe Premiere Pro', 'After Effects', '调色', '动态图形', '叙事'],
        recommendedTemplate: 'aurora',
        sampleData: { name: 'Jake Wilson', title: 'Video Editor', summary: 'Crafting compelling visual narratives' }
    },
    {
        slug: 'copywriter',
        title: 'Copywriter',
        titleZh: '文案撰写人',
        category: 'creative',
        metaTitle: 'Copywriter Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a compelling copywriter resume with CVGoPro. Let your words shine with creative Bento-style templates.',
        h1: 'Copywriter Resume Template',
        h1Zh: '文案撰写人简历模板',
        intro: 'Write your own success story with a resume that demonstrates your way with words.',
        introZh: '用展示您文字能力的简历书写您自己的成功故事。',
        whyBento: 'Copywriters understand visual hierarchy and messaging. Bento layouts complement your copy skills with strong design.',
        whyBentoZh: '文案撰写人理解视觉层次和信息传达。Bento布局用强大的设计补充您的文案技能。',
        keySkills: ['Advertising Copy', 'Brand Voice', 'SEO Writing', 'Social Media', 'Storytelling'],
        keySkillsZh: ['广告文案', '品牌声音', 'SEO写作', '社交媒体', '叙事'],
        recommendedTemplate: 'sunrise',
        sampleData: { name: 'Claire Adams', title: 'Senior Copywriter', summary: 'Words that connect and convert' }
    },
    {
        slug: 'social-media-manager',
        title: 'Social Media Manager',
        titleZh: '社交媒体经理',
        category: 'marketing',
        metaTitle: 'Social Media Manager Resume Template | CVGoPro',
        metaDescription: 'Create an engaging social media manager resume with CVGoPro. Showcase your platform expertise with Bento-style templates.',
        h1: 'Social Media Manager Resume Template',
        h1Zh: '社交媒体经理简历模板',
        intro: 'Build your personal brand with a resume that demonstrates your social media expertise.',
        introZh: '用展示您社交媒体专业知识的简历建立您的个人品牌。',
        whyBento: 'Social media managers create engaging content. Your Bento resume should be as visually appealing as your best posts.',
        whyBentoZh: '社交媒体经理创建引人入胜的内容。您的Bento简历应该像您最好的帖子一样有视觉吸引力。',
        keySkills: ['Content Strategy', 'Community Management', 'Analytics', 'Paid Social', 'Influencer Relations'],
        keySkillsZh: ['内容策略', '社区管理', '分析', '付费社交', '网红关系'],
        recommendedTemplate: 'nyc',
        sampleData: { name: 'Olivia Brown', title: 'Social Media Manager', summary: 'Building engaged communities' }
    },
    {
        slug: 'photographer',
        title: 'Photographer',
        titleZh: '摄影师',
        category: 'creative',
        metaTitle: 'Photographer Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a stunning photographer resume with CVGoPro. Showcase your portfolio with beautiful Bento-style templates.',
        h1: 'Photographer Resume Template',
        h1Zh: '摄影师简历模板',
        intro: 'Capture attention with a resume that reflects your visual artistry and professional expertise.',
        introZh: '用反映您视觉艺术和专业知识的简历吸引注意力。',
        whyBento: 'Photographers understand composition. Bento layouts mirror the same principles of balance and visual hierarchy you use in your work.',
        whyBentoZh: '摄影师理解构图。Bento布局反映了您在作品中使用的相同平衡和视觉层次原则。',
        keySkills: ['Photography', 'Photo Editing', 'Lighting', 'Composition', 'Client Relations'],
        keySkillsZh: ['摄影', '照片编辑', '灯光', '构图', '客户关系'],
        recommendedTemplate: 'aurora',
        sampleData: { name: 'Marcus Lee', title: 'Professional Photographer', summary: 'Capturing moments that matter' }
    },

    // =====================
    // SUPPLY CHAIN & LOGISTICS
    // =====================
    {
        slug: 'supply-chain-manager',
        title: 'Supply Chain Manager',
        titleZh: '供应链经理',
        category: 'business',
        metaTitle: 'Supply Chain Manager Resume Template | CVGoPro',
        metaDescription: 'Create a professional supply chain manager resume with CVGoPro. Highlight your logistics expertise with Bento templates.',
        h1: 'Supply Chain Manager Resume Template',
        h1Zh: '供应链经理简历模板',
        intro: 'Demonstrate your ability to optimize supply chains and drive operational efficiency.',
        introZh: '展示您优化供应链和推动运营效率的能力。',
        whyBento: 'Supply chain managers coordinate complex networks. Bento layouts reflect your ability to organize interconnected processes.',
        whyBentoZh: '供应链经理协调复杂网络。Bento布局反映了您组织相互关联流程的能力。',
        keySkills: ['Procurement', 'Inventory Management', 'Logistics', 'Vendor Relations', 'Cost Optimization'],
        keySkillsZh: ['采购', '库存管理', '物流', '供应商关系', '成本优化'],
        recommendedTemplate: 'oslo',
        sampleData: { name: 'Thomas Clark', title: 'Supply Chain Manager', summary: 'Optimizing global supply chain operations' }
    },

    // =====================
    // ARCHITECTURE & CONSTRUCTION
    // =====================
    {
        slug: 'architect',
        title: 'Architect',
        titleZh: '建筑师',
        category: 'engineering',
        metaTitle: 'Architect Resume Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a stunning architect resume with CVGoPro. Showcase your design portfolio with professional Bento-style templates.',
        h1: 'Architect Resume Template',
        h1Zh: '建筑师简历模板',
        intro: 'Present your architectural vision and project portfolio with a beautifully designed resume.',
        introZh: '用设计精美的简历呈现您的建筑愿景和项目组合。',
        whyBento: 'Architects design spaces. Your Bento resume demonstrates the same spatial awareness and aesthetic sensibility.',
        whyBentoZh: '建筑师设计空间。您的Bento简历展示了相同的空间意识和审美感。',
        keySkills: ['Architectural Design', 'AutoCAD/Revit', 'Building Codes', 'Project Management', 'Sustainable Design'],
        keySkillsZh: ['建筑设计', 'AutoCAD/Revit', '建筑规范', '项目管理', '可持续设计'],
        recommendedTemplate: 'milan',
        sampleData: { name: 'Alexander Kim', title: 'Architect', summary: 'Designing spaces that inspire' }
    },

    // =====================
    // RESEARCH & SCIENCE
    // =====================
    {
        slug: 'research-scientist',
        title: 'Research Scientist',
        titleZh: '研究科学家',
        category: 'other',
        metaTitle: 'Research Scientist CV Template (Bento Style) | CVGoPro',
        metaDescription: 'Build a comprehensive research scientist CV with CVGoPro. Present your publications and research with Bento templates.',
        h1: 'Research Scientist CV Template',
        h1Zh: '研究科学家简历模板',
        intro: 'Present your research achievements, publications, and scientific expertise with a comprehensive CV.',
        introZh: '用全面的简历呈现您的研究成就、出版物和科学专业知识。',
        whyBento: 'Research scientists manage extensive projects. Bento layouts help organize publications, grants, and research experience.',
        whyBentoZh: '研究科学家管理广泛的项目。Bento布局帮助组织出版物、资助和研究经验。',
        keySkills: ['Research Methodology', 'Data Analysis', 'Grant Writing', 'Publication', 'Laboratory Management'],
        keySkillsZh: ['研究方法', '数据分析', '资助写作', '出版', '实验室管理'],
        recommendedTemplate: 'oslo',
        sampleData: { name: 'Dr. Patricia Chen', title: 'Research Scientist', summary: 'Advancing scientific discovery' }
    },

    // =====================
    // REAL ESTATE
    // =====================
    {
        slug: 'real-estate-agent',
        title: 'Real Estate Agent',
        titleZh: '房地产经纪人',
        category: 'other',
        metaTitle: 'Real Estate Agent Resume Template | CVGoPro',
        metaDescription: 'Create a professional real estate agent resume with CVGoPro. Showcase your sales achievements with Bento-style templates.',
        h1: 'Real Estate Agent Resume Template',
        h1Zh: '房地产经纪人简历模板',
        intro: 'Present your sales achievements and market expertise with a professional real estate resume.',
        introZh: '用专业的房地产简历呈现您的销售成就和市场专业知识。',
        whyBento: 'Real estate agents sell properties. Your Bento resume should be as well-presented as your best listings.',
        whyBentoZh: '房地产经纪人销售物业。您的Bento简历应该像您最好的房源一样精心呈现。',
        keySkills: ['Property Sales', 'Client Relations', 'Market Analysis', 'Negotiation', 'Marketing'],
        keySkillsZh: ['物业销售', '客户关系', '市场分析', '谈判', '营销'],
        recommendedTemplate: 'milan',
        sampleData: { name: 'Jennifer Roberts', title: 'Real Estate Agent', summary: 'Helping clients find their dream homes' }
    }
];

// Helper function to get careers by category
export const getCareersByCategory = (category: CareerTemplate['category']): CareerTemplate[] => {
    return careerTemplates.filter(career => career.category === category);
};

// Helper function to get career by slug
export const getCareerBySlug = (slug: string): CareerTemplate | undefined => {
    return careerTemplates.find(career => career.slug === slug);
};

// Get all unique categories
export const getAllCategories = (): CareerTemplate['category'][] => {
    return [...new Set(careerTemplates.map(career => career.category))];
};

// Category labels for display
export const categoryLabels: Record<CareerTemplate['category'], { en: string; zh: string }> = {
    tech: { en: 'Technology', zh: '技术' },
    business: { en: 'Business & Management', zh: '商业管理' },
    creative: { en: 'Creative & Design', zh: '创意设计' },
    healthcare: { en: 'Healthcare', zh: '医疗健康' },
    education: { en: 'Education', zh: '教育' },
    engineering: { en: 'Engineering', zh: '工程' },
    finance: { en: 'Finance & Accounting', zh: '金融会计' },
    marketing: { en: 'Marketing & Sales', zh: '市场销售' },
    legal: { en: 'Legal', zh: '法律' },
    other: { en: 'Other Professions', zh: '其他职业' }
};
