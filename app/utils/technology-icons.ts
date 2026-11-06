export const technologyIcons: Record<string, string> = {
  // Frontend
  HTML: 'logos:html-5',
  CSS: 'logos:css-3',
  JavaScript: 'logos:javascript',
  Angular: 'logos:angular-icon',
  React: 'logos:react',
  Vue: 'logos:vue',
  Bootstrap: 'devicon:bootstrap',
  TypeScript: 'logos:typescript-icon',
  Sass: 'logos:sass',
  Less: 'logos:less',
  Redux: 'logos:redux',
  Pinia: 'logos:pinia',
  Vuetify: 'logos:vuetifyjs',
  Tailwind: 'logos:tailwindcss-icon',
  Material: 'logos:material-ui',
  GraphQL: 'logos:graphql',
  Webpack: 'logos:webpack',
  'Next.js': 'logos:nextjs-icon',
  Nuxt: 'logos:nuxt-icon',
  Quasar: 'devicon-plain:quasar',
  Vite: 'logos:vitejs',
  jQuery: 'devicon:jquery',
  Svelte: 'logos:svelte-icon',

  // Backend
  Node: 'logos:nodejs-icon',
  NodeJS: 'logos:nodejs-icon',
  Express: 'simple-icons:express',
  Fastify: 'devicon-plain:fastify',
  PHP: 'logos:php',
  Python: 'logos:python',
  Django: 'logos:django-icon',
  Java: 'logos:java',
  'Spring Boot': 'logos:spring-icon',
  Laravel: 'logos:laravel',
  'C#': 'logos:c-sharp',
  '.NET': 'logos:dotnet',
  Ruby: 'logos:ruby',
  'Ruby on Rails': 'logos:rails',
  Go: 'logos:go',
  NestJS: 'logos:nestjs',
  Prisma: 'material-icon-theme:prisma',
  Swagger: 'logos:swagger',
  gRPC: 'devicon:grpc',

  // Database
  PostgreSQL: 'logos:postgresql',
  MySQL: 'logos:mysql',
  MongoDB: 'skill-icons:mongodb',
  Firebase: 'devicon:firebase',
  Redis: 'logos:redis',
  SQLite: 'logos:sqlite',

  // DevOps & Cloud
  Docker: 'logos:docker-icon',
  AWS: 'fa-brands:aws',
  'AWS EKS': 'logos:aws-eks',
  'AWS Lambda': 'logos:aws-lambda',
  'AWS S3': 'logos:aws-s3',
  'AWS EC2': 'logos:aws-ec2',
  'AWS ECS': 'logos:aws-ecs',
  'AWS RDS': 'logos:aws-rds',
  'AWS Fargate': 'logos:aws-fargate',
  Vercel: 'skill-icons:vercel-light',
  Netlify: 'selfhst:netlify',
  Heroku: 'skill-icons:heroku',
  Jenkins: 'logos:jenkins',
  Terraform: 'devicon:terraform',
  Ansible: 'logos:ansible',
  Kubernetes: 'logos:kubernetes',

  // Testing
  Jest: 'logos:jest',
  Jasmine: 'logos:jasmine',
  Cypress: 'devicon-plain:cypressio',
  Playwright: 'logos:playwright',

  // Versionamento / ferramentas
  Git: 'logos:git-icon',
  GitHub: 'akar-icons:github-fill',
  Gitlab: 'devicon:gitlab',
  npm: 'devicon:npm-wordmark',
  NPM: 'devicon:npm-wordmark',
  Yarn: 'material-icon-theme:yarn',
  Jira: 'logos:jira',
  Markdown: 'cib:markdown',
  Electron: 'logos:electron',
  Postman: 'skill-icons:postman',
  Thunderclient: 'carbon:thunderstorm',
  ESLint: 'logos:eslint',
  Magento: 'logos:magento',
  RubyMine: 'simple-icons:rubymine',
  'VS Code': 'logos:visual-studio-code',
  'IntelliJ IDEA': 'logos:intellij-idea',
  Android: 'logos:android-icon',
  DBeaver: 'devicon:dbeaver',
  ECharts: 'thesvg-color:apache-echarts',
  Eclipse: 'devicon:eclipse',
  Insomnia: 'logos:insomnia',
  GoLand: 'logos:goland',

  // Design
  Figma: 'logos:figma',
  Photoshop: 'logos:adobe-photoshop',
  Sketch: 'logos:sketch',
  'Adobe XD': 'logos:adobe-xd',

  // Outros
  Wordpress: 'skill-icons:wordpress',
  Shopify: 'logos:shopify',
  Analytics: 'logos:google-analytics',
  ADS: 'logos:google-ads',

  // IA
  Cursor: 'simple-icons:cursor',
  Codex: 'carbon:ai-label',
  Claude: 'simple-icons:claude',
  Gemini: 'logos:google-gemini',
  DeepSeek: 'simple-icons:deepseek',
  ChatGPT: 'simple-icons:openai',
  Copilot: 'devicon:githubcopilot',
  OpenClaw: 'carbon:bot',
}
export const technologyIconOptions = Object.entries(technologyIcons).map(([name, icon]) => ({
  label: name,
  value: icon,
}))

export function normalizeTechnologyName(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function getTechnologyIcon(name: string, fallback: string | null) {
  if (fallback?.includes(':')) {
    return fallback
  }

  if (technologyIcons[name]) {
    return technologyIcons[name]
  }

  const normalizedName = normalizeTechnologyName(name)
  const match = Object.entries(technologyIcons).find(
    ([technologyName]) => normalizeTechnologyName(technologyName) === normalizedName,
  )

  return match?.[1] ?? fallback ?? 'carbon:code'
}
