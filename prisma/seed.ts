import { PrismaClient, TechnologyCategory, TechnologyLevel } from "@prisma/client";

const prisma = new PrismaClient();

const profileData = {
  name: "Hudson Kennedy",
  headline: "Desenvolvedor Full Stack",
  shortBio: "Engenheiro de Software com mais de 10 anos de experiência no desenvolvimento de produtos web modernos, escaláveis e orientados a resultado.",
  about: "Sou Engenheiro de Software com mais de 10 anos de experiência no desenvolvimento de produtos web modernos, escaláveis e orientados a resultado. Atuo como Desenvolvedor Fullstack, com forte especialização em Frontend, participando desde a definição de arquitetura até a entrega de interfaces performáticas, acessíveis e centradas na experiência do usuário. Ao longo da minha trajetória, consolidei uma base sólida em engenharia de software, arquitetura de soluções e boas práticas de desenvolvimento, sempre equilibrando qualidade técnica, usabilidade e impacto para o negócio. Tenho facilidade para colaborar com times multidisciplinares, transformar requisitos complexos em soluções claras e sustentar decisões técnicas com visão de produto. Sou movido por aprendizado contínuo, evolução técnica e pelo desafio de criar experiências digitais que geram valor real para pessoas e empresas.",
  location: "Rio de Janeiro, Brasil",
  avatarUrl: "/imgs/my.webp",
  resumeUrl: "/cv/HudsonKennedy-BR.pdf",
  email: "hudsonhugo90@gmail.com",
};

const technologyLevels: Record<string, TechnologyLevel> = {
  HTML: "ADVANCED",
  CSS: "ADVANCED",
  JavaScript: "ADVANCED",
  Angular: "ADVANCED",
  React: "ADVANCED",
  Vue: "ADVANCED",
  npm: "BASIC",
  Yarn: "BASIC",
  Node: "ADVANCED",
  Git: "ADVANCED",
  GitHub: "ADVANCED",
  Bootstrap: "INTERMEDIATE",
  Wordpress: "INTERMEDIATE",
  Shopify: "INTERMEDIATE",
  TypeScript: "ADVANCED",
  Sass: "ADVANCED",
  Less: "BASIC",
  Express: "ADVANCED",
  Redux: "INTERMEDIATE",
  PostgreSQL: "ADVANCED",
  Firebase: "INTERMEDIATE",
  MySQL: "INTERMEDIATE",
  Jira: "BASIC",
  PHP: "INTERMEDIATE",
  Python: "INTERMEDIATE",
  Markdown: "BASIC",
  Java: "INTERMEDIATE",
  Gitlab: "INTERMEDIATE",
  Figma: "BASIC",
  Pinia: "ADVANCED",
  Vuetify: "INTERMEDIATE",
  Tailwind: "ADVANCED",
  Material: "INTERMEDIATE",
  GraphQL: "INTERMEDIATE",
  Webpack: "INTERMEDIATE",
  Swagger: "INTERMEDIATE",
  Laravel: "BASIC",
  "Spring Boot": "BASIC",
  "C#": "BASIC",
  Electron: "INTERMEDIATE",
  Jenkins: "INTERMEDIATE",
  jQuery: "ADVANCED",
  Photoshop: "BASIC",
  Analytics: "BASIC",
  ADS: "BASIC",
  Terraform: "INTERMEDIATE",
  Ansible: "BASIC",
  Kubernetes: "INTERMEDIATE",
  Jest: "ADVANCED",
  Jasmine: "INTERMEDIATE",
  MongoDB: "INTERMEDIATE",
  ".NET": "INTERMEDIATE",
  Netlify: "INTERMEDIATE",
  Heroku: "INTERMEDIATE",
  Vercel: "ADVANCED",
  "Next.js": "ADVANCED",
  Vite: "ADVANCED",
  Postman: "INTERMEDIATE",
  Thunderclient: "BASIC",
  Cypress: "ADVANCED",
  AWS: "ADVANCED",
  Sketch: "BASIC",
  "Adobe XD": "BASIC",
  Nuxt: "ADVANCED",
  ESLint: "INTERMEDIATE",
  Magento: "BASIC",
  Ruby: "BASIC",
  "Ruby on Rails": "BASIC",
  NestJS: "ADVANCED",
  Prisma: "ADVANCED",
  RubyMine: "BASIC",
  "VS Code": "ADVANCED",
  "IntelliJ IDEA": "INTERMEDIATE",
  Android: "INTERMEDIATE",
  DBeaver: "INTERMEDIATE",
  Quasar: "ADVANCED",
  ECharts: "INTERMEDIATE",
  gRPC: "INTERMEDIATE",
  Eclipse: "BASIC",
  Fastify: "ADVANCED",
  Insomnia: "INTERMEDIATE",
  GoLand: "BASIC",
  Svelte: "INTERMEDIATE",
  Cursor: "ADVANCED",
  Codex: "BASIC",
  Claude: "ADVANCED",
  Gemini: "INTERMEDIATE",
  DeepSeek: "INTERMEDIATE",
  ChatGPT: "ADVANCED",
  Copilot: "ADVANCED",
  OpenClaw: "BASIC",
  Docker: "ADVANCED",
  Redis: "ADVANCED",
  Go: "INTERMEDIATE",
};

const technologies = [
  {
    "name": "HTML",
    "category": "FRONTEND",
    "icon": "HTML",
    "sortOrder": 1,
    "featured": false
  },
  {
    "name": "CSS",
    "category": "FRONTEND",
    "icon": "CSS",
    "sortOrder": 2,
    "featured": false
  },
  {
    "name": "JavaScript",
    "category": "FRONTEND",
    "icon": "JavaScript",
    "sortOrder": 3,
    "featured": true
  },
  {
    "name": "Angular",
    "category": "FRONTEND",
    "icon": "Angular",
    "sortOrder": 4,
    "featured": true
  },
  {
    "name": "React",
    "category": "FRONTEND",
    "icon": "React",
    "sortOrder": 5,
    "featured": true
  },
  {
    "name": "Vue",
    "category": "FRONTEND",
    "icon": "Vue",
    "sortOrder": 6,
    "featured": true
  },
  {
    "name": "npm",
    "category": "OTHER",
    "icon": "npm",
    "sortOrder": 7,
    "featured": false
  },
  {
    "name": "Yarn",
    "category": "OTHER",
    "icon": "Yarn",
    "sortOrder": 8,
    "featured": false
  },
  {
    "name": "Node",
    "category": "BACKEND",
    "icon": "Node",
    "sortOrder": 9,
    "featured": true
  },
  {
    "name": "Git",
    "category": "OTHER",
    "icon": "Git",
    "sortOrder": 10,
    "featured": true
  },
  {
    "name": "GitHub",
    "category": "OTHER",
    "icon": "GitHub",
    "sortOrder": 11,
    "featured": true
  },
  {
    "name": "Bootstrap",
    "category": "FRONTEND",
    "icon": "Bootstrap",
    "sortOrder": 12,
    "featured": false
  },
  {
    "name": "Wordpress",
    "category": "OTHER",
    "icon": "Wordpress",
    "sortOrder": 13,
    "featured": false
  },
  {
    "name": "Shopify",
    "category": "OTHER",
    "icon": "Shopify",
    "sortOrder": 14,
    "featured": false
  },
  {
    "name": "TypeScript",
    "category": "FRONTEND",
    "icon": "TypeScript",
    "sortOrder": 15,
    "featured": true
  },
  {
    "name": "Sass",
    "category": "FRONTEND",
    "icon": "Sass",
    "sortOrder": 16,
    "featured": false
  },
  {
    "name": "Less",
    "category": "FRONTEND",
    "icon": "Less",
    "sortOrder": 17,
    "featured": false
  },
  {
    "name": "Express",
    "category": "BACKEND",
    "icon": "Express",
    "sortOrder": 18,
    "featured": false
  },
  {
    "name": "Redux",
    "category": "FRONTEND",
    "icon": "Redux",
    "sortOrder": 19,
    "featured": false
  },
  {
    "name": "PostgreSQL",
    "category": "DATABASE",
    "icon": "PostgreSQL",
    "sortOrder": 20,
    "featured": true
  },
  {
    "name": "Firebase",
    "category": "OTHER",
    "icon": "Firebase",
    "sortOrder": 21,
    "featured": false
  },
  {
    "name": "MySQL",
    "category": "DATABASE",
    "icon": "MySQL",
    "sortOrder": 22,
    "featured": false
  },
  {
    "name": "Jira",
    "category": "OTHER",
    "icon": "Jira",
    "sortOrder": 23,
    "featured": false
  },
  {
    "name": "PHP",
    "category": "BACKEND",
    "icon": "PHP",
    "sortOrder": 24,
    "featured": false
  },
  {
    "name": "Python",
    "category": "BACKEND",
    "icon": "Python",
    "sortOrder": 25,
    "featured": false
  },
  {
    "name": "Markdown",
    "category": "OTHER",
    "icon": "Markdown",
    "sortOrder": 26,
    "featured": false
  },
  {
    "name": "Java",
    "category": "BACKEND",
    "icon": "Java",
    "sortOrder": 27,
    "featured": false
  },
  {
    "name": "Gitlab",
    "category": "OTHER",
    "icon": "Gitlab",
    "sortOrder": 28,
    "featured": false
  },
  {
    "name": "Figma",
    "category": "OTHER",
    "icon": "Figma",
    "sortOrder": 29,
    "featured": false
  },
  {
    "name": "Pinia",
    "category": "FRONTEND",
    "icon": "Pinia",
    "sortOrder": 30,
    "featured": false
  },
  {
    "name": "Vuetify",
    "category": "FRONTEND",
    "icon": "Vuetify",
    "sortOrder": 31,
    "featured": false
  },
  {
    "name": "Tailwind",
    "category": "FRONTEND",
    "icon": "Tailwind",
    "sortOrder": 32,
    "featured": true
  },
  {
    "name": "Material",
    "category": "FRONTEND",
    "icon": "Material",
    "sortOrder": 33,
    "featured": false
  },
  {
    "name": "GraphQL",
    "category": "BACKEND",
    "icon": "GraphQL",
    "sortOrder": 34,
    "featured": false
  },
  {
    "name": "Webpack",
    "category": "FRONTEND",
    "icon": "Webpack",
    "sortOrder": 35,
    "featured": false
  },
  {
    "name": "Swagger",
    "category": "BACKEND",
    "icon": "Swagger",
    "sortOrder": 36,
    "featured": false
  },
  {
    "name": "Laravel",
    "category": "BACKEND",
    "icon": "Laravel",
    "sortOrder": 37,
    "featured": false
  },
  {
    "name": "Spring Boot",
    "category": "BACKEND",
    "icon": "Spring Boot",
    "sortOrder": 38,
    "featured": false
  },
  {
    "name": "C#",
    "category": "BACKEND",
    "icon": "C#",
    "sortOrder": 39,
    "featured": false
  },
  {
    "name": "Electron",
    "category": "OTHER",
    "icon": "Electron",
    "sortOrder": 40,
    "featured": false
  },
  {
    "name": "Jenkins",
    "category": "DEVOPS",
    "icon": "Jenkins",
    "sortOrder": 41,
    "featured": false
  },
  {
    "name": "jQuery",
    "category": "FRONTEND",
    "icon": "jQuery",
    "sortOrder": 42,
    "featured": false
  },
  {
    "name": "Photoshop",
    "category": "OTHER",
    "icon": "Photoshop",
    "sortOrder": 43,
    "featured": false
  },
  {
    "name": "Analytics",
    "category": "OTHER",
    "icon": "Analytics",
    "sortOrder": 44,
    "featured": false
  },
  {
    "name": "ADS",
    "category": "OTHER",
    "icon": "ADS",
    "sortOrder": 45,
    "featured": false
  },
  {
    "name": "Terraform",
    "category": "DEVOPS",
    "icon": "Terraform",
    "sortOrder": 46,
    "featured": false
  },
  {
    "name": "Ansible",
    "category": "DEVOPS",
    "icon": "Ansible",
    "sortOrder": 47,
    "featured": false
  },
  {
    "name": "Kubernetes",
    "category": "DEVOPS",
    "icon": "Kubernetes",
    "sortOrder": 48,
    "featured": false
  },
  {
    "name": "Jest",
    "category": "OTHER",
    "icon": "Jest",
    "sortOrder": 49,
    "featured": true
  },
  {
    "name": "Jasmine",
    "category": "OTHER",
    "icon": "Jasmine",
    "sortOrder": 50,
    "featured": false
  },
  {
    "name": "MongoDB",
    "category": "DATABASE",
    "icon": "MongoDB",
    "sortOrder": 51,
    "featured": false
  },
  {
    "name": ".NET",
    "category": "BACKEND",
    "icon": ".NET",
    "sortOrder": 52,
    "featured": false
  },
  {
    "name": "Netlify",
    "category": "DEVOPS",
    "icon": "Netlify",
    "sortOrder": 53,
    "featured": false
  },
  {
    "name": "Heroku",
    "category": "DEVOPS",
    "icon": "Heroku",
    "sortOrder": 54,
    "featured": false
  },
  {
    "name": "Vercel",
    "category": "DEVOPS",
    "icon": "Vercel",
    "sortOrder": 55,
    "featured": false
  },
  {
    "name": "Next.js",
    "category": "FRONTEND",
    "icon": "Next.js",
    "sortOrder": 56,
    "featured": true
  },
  {
    "name": "Vite",
    "category": "OTHER",
    "icon": "Vite",
    "sortOrder": 57,
    "featured": true
  },
  {
    "name": "Postman",
    "category": "OTHER",
    "icon": "Postman",
    "sortOrder": 58,
    "featured": false
  },
  {
    "name": "Thunderclient",
    "category": "OTHER",
    "icon": "Thunderclient",
    "sortOrder": 59,
    "featured": false
  },
  {
    "name": "Cypress",
    "category": "OTHER",
    "icon": "Cypress",
    "sortOrder": 60,
    "featured": true
  },
  {
    "name": "AWS",
    "category": "DEVOPS",
    "icon": "AWS",
    "sortOrder": 61,
    "featured": true
  },
  {
    "name": "Sketch",
    "category": "OTHER",
    "icon": "Sketch",
    "sortOrder": 62,
    "featured": false
  },
  {
    "name": "Adobe XD",
    "category": "OTHER",
    "icon": "Adobe XD",
    "sortOrder": 63,
    "featured": false
  },
  {
    "name": "Nuxt",
    "category": "FRONTEND",
    "icon": "Nuxt",
    "sortOrder": 64,
    "featured": true
  },
  {
    "name": "ESLint",
    "category": "OTHER",
    "icon": "ESLint",
    "sortOrder": 65,
    "featured": false
  },
  {
    "name": "Magento",
    "category": "OTHER",
    "icon": "Magento",
    "sortOrder": 66,
    "featured": false
  },
  {
    "name": "Ruby",
    "category": "BACKEND",
    "icon": "Ruby",
    "sortOrder": 67,
    "featured": false
  },
  {
    "name": "Ruby on Rails",
    "category": "BACKEND",
    "icon": "Ruby on Rails",
    "sortOrder": 68,
    "featured": false
  },
  {
    "name": "NestJS",
    "category": "BACKEND",
    "icon": "NestJS",
    "sortOrder": 69,
    "featured": true
  },
  {
    "name": "Prisma",
    "category": "BACKEND",
    "icon": "Prisma",
    "sortOrder": 70,
    "featured": true
  },
  {
    "name": "RubyMine",
    "category": "OTHER",
    "icon": "RubyMine",
    "sortOrder": 71,
    "featured": false
  },
  {
    "name": "VS Code",
    "category": "OTHER",
    "icon": "VS Code",
    "sortOrder": 72,
    "featured": false
  },
  {
    "name": "IntelliJ IDEA",
    "category": "OTHER",
    "icon": "IntelliJ IDEA",
    "sortOrder": 73,
    "featured": false
  },
  {
    "name": "Android",
    "category": "OTHER",
    "icon": "Android",
    "sortOrder": 74,
    "featured": false
  },
  {
    "name": "DBeaver",
    "category": "OTHER",
    "icon": "DBeaver",
    "sortOrder": 75,
    "featured": false
  },
  {
    "name": "Quasar",
    "category": "FRONTEND",
    "icon": "Quasar",
    "sortOrder": 76,
    "featured": true
  },
  {
    "name": "ECharts",
    "category": "OTHER",
    "icon": "ECharts",
    "sortOrder": 77,
    "featured": false
  },
  {
    "name": "gRPC",
    "category": "OTHER",
    "icon": "gRPC",
    "sortOrder": 78,
    "featured": false
  },
  {
    "name": "Eclipse",
    "category": "OTHER",
    "icon": "Eclipse",
    "sortOrder": 79,
    "featured": false
  },
  {
    "name": "Fastify",
    "category": "BACKEND",
    "icon": "Fastify",
    "sortOrder": 80,
    "featured": true
  },
  {
    "name": "Insomnia",
    "category": "OTHER",
    "icon": "Insomnia",
    "sortOrder": 81,
    "featured": false
  },
  {
    "name": "GoLand",
    "category": "OTHER",
    "icon": "GoLand",
    "sortOrder": 82,
    "featured": false
  },
  {
    "name": "Svelte",
    "category": "FRONTEND",
    "icon": "Svelte",
    "sortOrder": 83,
    "featured": false
  },
  {
    "name": "Cursor",
    "category": "OTHER",
    "icon": "Cursor",
    "sortOrder": 84,
    "featured": false
  },
  {
    "name": "Codex",
    "category": "OTHER",
    "icon": "Codex",
    "sortOrder": 85,
    "featured": false
  },
  {
    "name": "Claude",
    "category": "OTHER",
    "icon": "Claude",
    "sortOrder": 86,
    "featured": false
  },
  {
    "name": "Gemini",
    "category": "OTHER",
    "icon": "Gemini",
    "sortOrder": 87,
    "featured": false
  },
  {
    "name": "DeepSeek",
    "category": "OTHER",
    "icon": "DeepSeek",
    "sortOrder": 88,
    "featured": false
  },
  {
    "name": "ChatGPT",
    "category": "OTHER",
    "icon": "ChatGPT",
    "sortOrder": 89,
    "featured": false
  },
  {
    "name": "Copilot",
    "category": "OTHER",
    "icon": "Copilot",
    "sortOrder": 90,
    "featured": false
  },
  {
    "name": "OpenClaw",
    "category": "OTHER",
    "icon": "OpenClaw",
    "sortOrder": 91,
    "featured": false
  },
  {
    "name": "Docker",
    "category": "DEVOPS",
    "icon": "Docker",
    "sortOrder": 92,
    "featured": true
  },
  {
    "name": "Redis",
    "category": "DEVOPS",
    "icon": "Redis",
    "sortOrder": 93,
    "featured": true
  },
  {
    "name": "Go",
    "category": "BACKEND",
    "icon": "Go",
    "sortOrder": 94,
    "featured": false
  }
];
const experiences = [
  {
    "company": "Eterj - Escola Técnica do Estado do Rio de Janeiro",
    "role": "Freelancer / Projetos Pessoais",
    "startDate": "2012-02-01",
    "endDate": "2016-12-28",
    "isCurrent": false,
    "logoUrl": "/imgs/imgExperiences/eterj.png",
    "description": "Fiz curso de informática industrial na ETERJ, e trabalhos de freelancer, usando Angular Js, VB.net, HTML, Javascript, Jquery, Bootstrap, Sass.",
    "sortOrder": 1,
    "technologies": [
      "Angular",
      "JavaScript",
      "HTML",
      "jQuery",
      "Bootstrap",
      "Sass",
      ".NET"
    ]
  },
  {
    "company": "DT3 Sports",
    "role": "Analista de E-commerce / Desenvolvedor Front-end",
    "startDate": "2019-02-01",
    "endDate": "2021-06-28",
    "isCurrent": false,
    "logoUrl": "/imgs/imgExperiences/dt3.png",
    "description": "Emissão de nota fiscal, migração do site em Wordpress para React com NodeJs, usando redux, router proptypes, emailjs/browser, swiper, sweetalert e etc... otimização e carregamento de imagens e responsável pela integração do ERP Bling e integração dos marketplaces",
    "sortOrder": 2,
    "technologies": [
      "React",
      "Node",
      "Redux",
      "JavaScript",
      "TypeScript",
      "Bootstrap",
      "WordPress",
      "Jira"
    ]
  },
  {
    "company": "VILT Brasil Sistemas de Informação",
    "role": "Consultor Técnico Fullstack",
    "startDate": "2021-07-01",
    "endDate": "2021-08-28",
    "isCurrent": false,
    "logoUrl": "/imgs/imgExperiences/vilt.png",
    "description": "Consultoria Fullstack, usando Java/NodeJs no Backend, Angular/React no Frontend, além de programas Adobe Experience Manager(AEM), com serviços para Porto, CVC e etc.",
    "sortOrder": 3,
    "technologies": [
      "Java",
      "Node",
      "Angular",
      "React",
      "GraphQL"
    ]
  },
  {
    "company": "Capitona Rio",
    "role": "Freelancer / Projetos Pessoais",
    "startDate": "2022-01-01",
    "endDate": "2022-04-28",
    "isCurrent": false,
    "logoUrl": "/imgs/imgExperiences/capitona.png",
    "description": "Criação de site com shopify, Jquery para tratamentos de respostas e integrações externas, como correios, gateway de pagamentos, ERP Bling e etc..",
    "sortOrder": 4,
    "technologies": [
      "Shopify",
      "jQuery",
      "JavaScript",
      "HTML",
      "CSS"
    ]
  },
  {
    "company": "Atlas Technologies",
    "role": "Engenheiro Frontend",
    "startDate": "2022-04-01",
    "endDate": "2022-08-28",
    "isCurrent": false,
    "logoUrl": "/imgs/imgExperiences/atlas.png",
    "description": "Trabalho como Pessoa Jurídica, onde atuei na criação de arquitetura e otimização de páginas e carregamento de imagens, usando Vue3 no Frontend, PHP e Laravel no Backend, além de Docker e Webpack para montar os contâineres da aplicação, layouts e estilos com Sass/Scss e etc...",
    "sortOrder": 5,
    "technologies": [
      "Vue",
      "PHP",
      "Laravel",
      "Docker",
      "Webpack",
      "Sass",
      "JavaScript"
    ]
  },
  {
    "company": "Cast Group Informática S.A.",
    "role": "Desenvolvedor Fullstack",
    "startDate": "2022-08-01",
    "endDate": "2023-10-28",
    "isCurrent": false,
    "logoUrl": "/imgs/imgExperiences/cast.png",
    "description": "Atuando diretamente, nas diretivas e trativas de manutenção/refatoração de códigos, utilizando Java/springboot, NodeJs/Express no Backend, PostgreSQL,Typescript com Angular/React no Frontend",
    "sortOrder": 6,
    "technologies": [
      "Java",
      "Spring Boot",
      "Node",
      "Express",
      "PostgreSQL",
      "TypeScript",
      "Angular",
      "React",
      "Jira"
    ]
  },
  {
    "company": "Terapia de bolso - TDB",
    "role": "Desenvolvedor Frontend",
    "startDate": "2023-11-01",
    "endDate": "2024-01-28",
    "isCurrent": false,
    "logoUrl": "/imgs/imgExperiences/tdb.png",
    "description": "Trabalho como Pessoa Jurídica, onde atuei na arquitetura do projeto, fazendo update da versão do Angular14 para versão 15, ajustes de dependências, correções de sintaxes, layouts e estilos com Sass/Scss e etc...",
    "sortOrder": 7,
    "technologies": [
      "Angular",
      "TypeScript",
      "Sass",
      "JavaScript",
      "Jest"
    ]
  },
  {
    "company": "Cubo Connect - SPC Grafeno",
    "role": "Desenvolvedor Frontend",
    "startDate": "2024-04-01",
    "endDate": "2025-05-28",
    "isCurrent": false,
    "logoUrl": "/imgs/imgExperiences/cubo.png",
    "description": "Trabalho como Pessoa Jurídica, Criação e manutenção de layouts e interfaces com React, Styled-Components e Tailwind CSS, criação de testes unitários com Cypress e Jest, otimização de páginas e componentes.",
    "sortOrder": 8,
    "technologies": [
      "React",
      "TypeScript",
      "Tailwind",
      "Cypress",
      "Jest",
      "JavaScript"
    ]
  },
  {
    "company": "Afilio/Dynaton",
    "role": "Desenvolvedor Fullstack",
    "startDate": "2024-10-01",
    "endDate": "2026-08-28",
    "isCurrent": true,
    "logoUrl": "/imgs/imgExperiences/afilio.png",
    "description": "Trabalho como Pessoa Jurídica, usando NestJs e protocolo gRPC no Backend com Prisma para modelagem de banco de dados em PostgreSQL, VueJs com quasar no Frontend, Typescript, além de testes com Cypress, refatoração e criação de componentes e API .",
    "sortOrder": 9,
    "technologies": [
      "NestJS",
      "gRPC",
      "Prisma",
      "PostgreSQL",
      "Vue",
      "Quasar",
      "TypeScript",
      "Cypress",
      "Node",
      "Fastify",
      "Redis"
    ]
  }
];
const education = [
  {
    "course": "Mestrado em Ciência da Computação",
    "institution": "Universidade de Harvard",
    "logoUrl": "/imgs/imgEducation/harvard.webp",
    "sortOrder": 1
  },
  {
    "course": "Pós-graduação em Engenharia de Software",
    "institution": "Faculdade Única de MG",
    "logoUrl": "/imgs/imgEducation/mba.webp",
    "sortOrder": 2
  },
  {
    "course": "Graduação em Processos Gerenciais",
    "institution": "Faculdade Estácio de Sá",
    "logoUrl": "/imgs/imgEducation/estacio.webp",
    "sortOrder": 3
  },
  {
    "course": "Bootcamp Desenvolvimento Frontend com Angular",
    "institution": "Digital Innovation One · Banco Pan",
    "logoUrl": "/imgs/imgEducation/bootcamp.webp",
    "sortOrder": 4
  },
  {
    "course": "AEM Front-end Developer",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/aem-front.webp",
    "sortOrder": 5
  },
  {
    "course": "AEM Sites Business Practitioner",
    "institution": "Adobe Professional",
    "logoUrl": "/imgs/imgEducation/aem-sbp.webp",
    "sortOrder": 6
  },
  {
    "course": "Vue.js do Básico ao Avançado",
    "institution": "VueJS Brasil",
    "logoUrl": "/imgs/imgEducation/vuejs.webp",
    "sortOrder": 7
  },
  {
    "course": "JavaScript e TypeScript do Básico ao Avançado",
    "institution": "Udemy",
    "logoUrl": "/imgs/imgEducation/udemy.webp",
    "sortOrder": 8
  },
  {
    "course": "Trabalhando com Componentes em React",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/dio-comp.webp",
    "sortOrder": 9
  },
  {
    "course": "Arquitetura de Componentes no Frontend",
    "institution": "Fundação Getúlio Vargas",
    "logoUrl": "/imgs/imgEducation/dio-arq.webp",
    "sortOrder": 10
  },
  {
    "course": "Lógica de Programação Essencial",
    "institution": "Sebrae",
    "logoUrl": "/imgs/imgEducation/dio-log.webp",
    "sortOrder": 11
  },
  {
    "course": "JavaScript ES6 Essencial",
    "institution": "Cursos 24h",
    "logoUrl": "/imgs/imgEducation/dio-es6.webp",
    "sortOrder": 12
  },
  {
    "course": "Técnicas Avançadas em Angular 8",
    "institution": "XP Educação",
    "logoUrl": "/imgs/imgEducation/dio-ang8.webp",
    "sortOrder": 13
  },
  {
    "course": "Testes Automatizados com Cypress",
    "institution": "AlgaWorks",
    "logoUrl": "/imgs/imgEducation/testes.webp",
    "sortOrder": 14
  },
  {
    "course": "Diretivas e Propriedades de Componentes Vue.js",
    "institution": "Xperiun",
    "logoUrl": "/imgs/imgEducation/dio-vue1.webp",
    "sortOrder": 15
  },
  {
    "course": "Componentes, Métodos e Ciclo de Vida com Vue.js",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/dio-vue2.webp",
    "sortOrder": 16
  },
  {
    "course": "Segurança Digital",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/fgv.webp",
    "sortOrder": 17
  },
  {
    "course": "Gestão Financeira",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/sebrae-GF.webp",
    "sortOrder": 18
  },
  {
    "course": "Customer Success",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/sebrae-CS.webp",
    "sortOrder": 19
  },
  {
    "course": "Marketing Digital para Empreendedores",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/sebrae-MD.webp",
    "sortOrder": 20
  },
  {
    "course": "Estratégia Financeira para Crescimento",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/sebrae-EFC.webp",
    "sortOrder": 21
  },
  {
    "course": "Planejamento Estratégico",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/sebrae-PE.webp",
    "sortOrder": 22
  },
  {
    "course": "Educação Financeira Empresarial",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/sebrae-EF.webp",
    "sortOrder": 23
  },
  {
    "course": "Auxiliar Administrativo",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/24h.webp",
    "sortOrder": 24
  },
  {
    "course": "Arquiteto de Soluções IA Expert",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/xp.webp",
    "sortOrder": 25
  },
  {
    "course": "Especialista em Microserviços Nível 2 (Domain-Driven Design)",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/algaworks.webp",
    "sortOrder": 26
  },
  {
    "course": "Fundamentos de Análise de Dados",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/fad.webp",
    "sortOrder": 27
  },
  {
    "course": "Fundamentos de BI e Análise de Dados",
    "institution": "Digital Innovation One",
    "logoUrl": "/imgs/imgEducation/biad.webp",
    "sortOrder": 28
  }
];
const testimonials = [
  {
    "name": "Rafael Araujo",
    "company": "Afilio/Dynaton",
    "avatarUrl": "/imgs/imgsMobile/linkedin1.webp",
    "content": "Trabalhar com o Hudson foi uma daquelas experiências que deixam claro, muito rápido, quando você está diante de um profissional acima da média. Mesmo entrando em um projeto com alto nível de complexidade, ele absorveu o contexto com uma velocidade impressionante e, em pouco tempo, já estava realizando entregas de alto impacto tanto no front-end quanto no back-end. Sua capacidade técnica, autonomia e facilidade para transitar entre diferentes camadas da aplicação fizeram uma diferença real no ritmo e na qualidade do projeto. Mas o que mais me marcou foi a parceria. O Hudson não era apenas alguém que executava muito bem: era alguém com quem eu podia discutir arquitetura, avaliar caminhos, questionar decisões e buscar soluções melhores. Em diversos momentos, suas contribuições foram importantes para amadurecer decisões técnicas e dar mais segurança à evolução da plataforma. É um profissional extremamente competente, confiável e colaborativo, com visão técnica ampla e capacidade de gerar valor rapidamente. Sem dúvida, alguém que eu gostaria de ter novamente ao meu lado em qualquer projeto desafiador.",
    "sortOrder": 1
  },
  {
    "name": "Raphael Caires",
    "company": "Afilio/Dynaton",
    "avatarUrl": "/imgs/imgsMobile/linkedin17.webp",
    "content": "Trabalhar com o Hudson é sempre uma experiência incrível. Ele é o tipo de profissional que não apenas entrega resultados, mas também transforma o ambiente ao seu redor. Sua responsabilidade e comprometimento são admiráveis, e ele sempre encara desafios com criatividade e um olhar inovador, buscando sempre a melhor solução para cada problema. Mas o que realmente diferencia o Hudson não é apenas sua competência técnica, é a forma como ele se conecta com as pessoas. Seu bom humor torna qualquer dia mais leve, e sua disposição genuína para ajudar faz com que todos ao seu redor se sintam apoiados. Ele se preocupa de verdade com o bem-estar do time, criando laços que vão além do ambiente profissional. Se você procura um desenvolvedor talentoso, criativo e que realmente faz a diferença em uma equipe, o Hudson é sem dúvida a pessoa certa. Qualquer empresa teria sorte em tê-lo!",
    "sortOrder": 2
  },
  {
    "name": "Rodrigo Rangel",
    "company": "Afilio/Dynaton",
    "avatarUrl": "/imgs/imgsMobile/linkedin18.webp",
    "content": "Tenho satisfação em dizer que já trabalhei com o Hudson no mesmo projeto. Ele contribui de forma significativa para um ambiente de trabalho saudável e leve. Do ponto de vista técnico, está sempre em busca de ir além do básico, o que enriquece muito o trabalho de toda a equipe.",
    "sortOrder": 3
  },
  {
    "name": "Rafael Catarino",
    "company": "Afilio/Dynaton",
    "avatarUrl": "/imgs/imgsMobile/linkedin19.webp",
    "content": "Trabalhar com o Hudson é ter a certeza de que ele sempre fará o possível para entregar resultados de excelência. Trata-se de um profissional altamente capacitado, extremamente comprometido e com um nível técnico acima da média. Além disso, destaca-se pela sua excelente habilidade de relacionamento interpessoal, o que contribui para um ambiente de trabalho mais colaborativo, dinâmico e produtivo. Sua proatividade em ajudar colegas e buscar as informações necessárias faz toda a diferença no dia a dia da equipe. É uma honra trabalhar com um profissional que está constantemente em evolução, sempre buscando novos conhecimentos e aprimoramento contínuo.",
    "sortOrder": 4
  },
  {
    "name": "Lucas Meyble",
    "company": "Afilio/Dynaton",
    "avatarUrl": "/imgs/imgsMobile/linkedin23.webp",
    "content": "Tive a oportunidade de trabalhar com o Hudson na Você, atuando junto com ele como desenvolvedor sênior. Como ele já tinha mais tempo de empresa e conhecia muito bem o projeto, foi uma pessoa muito importante para mim, principalmente no início, quando eu ainda estava entendendo melhor o sistema e suas particularidades. O Hudson sempre foi muito solícito e estava disposto a ajudar. Ele tem um conhecimento muito amplo da plataforma e frequentemente me orientava sobre as melhores decisões técnicas para as features que eu estava desenvolvendo. Além disso, é um profissional muito forte tecnicamente, com bastante domínio de Vue, Node.js, TypeScript e da arquitetura de Gateway que utilizávamos no projeto. É uma pessoa muito atenta ao código, criteriosa nas decisões e sempre preocupada em encontrar a melhor solução para o time e para o produto. No dia a dia, também sempre foi muito educado, direto, perspicaz e fácil de conversar. Sem enrolação, conseguia explicar os pontos com clareza e contribuir de forma muito positiva com toda a equipe. Foi muito bom trabalhar e aprender com ele, e recomendo muito o Hudson como profissional.",
    "sortOrder": 5
  },
  {
    "name": "Marcos Cordeiro",
    "company": "Cubo Connect - SPC Grafeno",
    "avatarUrl": "/imgs/imgsMobile/linkedin20.webp",
    "content": "O Hudson é um engenheiro frontend excepcional, domina com propriedade tecnologias como React, Vue, Angular e TypeScript, e tem uma visão fullstack que enriquece ainda mais suas contribuições. Nos projetos em que trabalhamos juntos, ele se destacou pela capacidade de entregar soluções de alta qualidade com agilidade, sem abrir mão do cuidado com a arquitetura e a experiência do usuário. O que impressiona no Hudson é a combinação de comprometimento e velocidade de execução. Ele é o tipo de profissional que abraça o projeto como se fosse seu, se dedica de verdade e você pode contar com ele para entregar, no prazo e com qualidade.",
    "sortOrder": 6
  },
  {
    "name": "Leonardo Melo",
    "company": "Cubo Connect - SPC Grafeno",
    "avatarUrl": "/imgs/imgsMobile/linkedin21.webp",
    "content": "Tive a oportunidade de trabalhar com Hudson no mesmo projeto na Cubo Connect, alocados na SPC Grafeno, e posso dizer que é um desenvolvedor front-end de destaque. Sempre bem-humorado, contribui para um ambiente de trabalho leve e produtivo, mesmo em momentos de maior pressão. Além disso, é extremamente dedicado e comprometido com a qualidade das entregas. Demonstra responsabilidade, atenção aos detalhes e uma ótima capacidade de colaboração em equipe. Sem dúvida, um profissional que faz a diferença em qualquer projeto.",
    "sortOrder": 7
  },
  {
    "name": "Gustavo Ferrari",
    "company": "Cubo Connect - SPC Grafeno",
    "avatarUrl": "/imgs/imgsMobile/linkedin22.webp",
    "content": "Trabalhar com o Hudson foi extremamente prazeroso. Detém conhecimento técnico excepcional e está sempre disposto a ajudar e colaborar. Seu conhecimento em React foi de grande valia para o time, contribuindo para a qualidade das entregas.",
    "sortOrder": 8
  },
  {
    "name": "Fellipe Menezes",
    "company": "DT3 Sports",
    "avatarUrl": "/imgs/imgsMobile/linkedin2.webp",
    "content": "Excelente parceiro de trabalho e uma ótima pessoa! Seu senso de responsabilidade se destaca dentre os demais, nunca deixando nada pra trás ou sem solução. Aprendi muito com o Hudson e com certeza levo esses aprendizados para a vida.",
    "sortOrder": 9
  },
  {
    "name": "Luís Assis",
    "company": "DT3 Sports",
    "avatarUrl": "/imgs/imgsMobile/linkedin3.webp",
    "content": "Hudson é um excelente parceiro de trabalho, sempre buscando aprimoramento e desenvolver novas habilidades. Está sempre disposto a ajudar. Dedicado e comprometido.",
    "sortOrder": 10
  },
  {
    "name": "Carlos Ferreira",
    "company": "DT3 Sports",
    "avatarUrl": "/imgs/imgsMobile/linkedin4.webp",
    "content": "Tive o prazer de trabalhar com o Hudson Kennedy na DT3 (Bender M), onde ele demonstrou habilidades excepcionais e uma dedicação exemplar. Sua capacidade de resolver problemas de forma analítica e criativa, combinada com suas excelentes habilidades de comunicação, fez dele um membro valioso da equipe. Hudson sempre se antecipou às necessidades da equipe, propondo melhorias e soluções inovadoras que resultaram em sucesso significativo em nossas Sprints. Recomendo fortemente para qualquer posição que ele venha a buscar no futuro, pois sei que ele continuará a alcançar grandes sucessos em sua carreira.",
    "sortOrder": 11
  },
  {
    "name": "Hirvin Faria",
    "company": "DT3 Sports",
    "avatarUrl": "/imgs/imgsMobile/linkedin5.webp",
    "content": "Ótimo Profissional, sempre buscando aprender, melhorar e dominar novos assuntos. Auxiliando a equipe na resolução de problemas.",
    "sortOrder": 12
  },
  {
    "name": "André Scott",
    "company": "DT3 Sports",
    "avatarUrl": "/imgs/imgsMobile/linkedin6.webp",
    "content": "Hudson para mim, foi um excelente instrutor. Me ensinou a manusear uma plataforma, que nem de longe é da minha área. Profissional exemplar e de extrema capacidade. tem tudo para decolar em sua carreira de Desenvolvedor.",
    "sortOrder": 13
  },
  {
    "name": "Igor Tudisco",
    "company": "VILT Brasil Sistemas de Informação",
    "avatarUrl": "/imgs/imgsMobile/linkedin7.webp",
    "content": "Trabalhei com o Hudson na Vilt. Mesmo sendo um período curto, tive a oportunidade de conhecer essa pessoa maravilhosa, bem animada e colaborativa. Participamos de treinamentos e alguns desafios juntos, durantes esse tempo ele como uma pessoa mais experiente se mostrou um bom orientador e um ótimo motivador para todos a sua volta e principalmente para as pessoas mais juniores. Sempre disposto a ajudar, ele será um grande aliado dentro de qualquer equipe.",
    "sortOrder": 14
  },
  {
    "name": "Jailton Moreira",
    "company": "Cast Group Informática S.A.",
    "avatarUrl": "/imgs/imgsMobile/linkedin8.webp",
    "content": "Eu tive a oportunidade de trabalhar com o Hudson. Foi uma experiência muito interessante, pois se trata de um profissional muito dedicado e competente no quesito frontend. Uma grata surpresa e super recomendo. Sucesso Hudson!",
    "sortOrder": 15
  },
  {
    "name": "Paulo Alberto",
    "company": "Cast Group Informática S.A.",
    "avatarUrl": "/imgs/imgsMobile/linkedin9.webp",
    "content": "Hudson é um profissional completo, sempre pró-ativo e disposto a ajudar, mas no tempo em que trabalhamos juntos ele se destacou realmente pela sua habilidade no desenvolvimento frontend e conhecimentos de UX/UI, sempre muito detalhista. Ele se tornou uma referência para mim, tenho certeza que irá contribuir muito na equipe que venha a fazer parte!",
    "sortOrder": 16
  },
  {
    "name": "Bruno Carvalho",
    "company": "Cast Group Informática S.A.",
    "avatarUrl": "/imgs/imgsMobile/linkedin10.webp",
    "content": "Trabalhar com Hudson foi uma experiência excelente. Sua compreensão do FrontEnd é evidente em cada implementação e apoio ao time. Ele é proativo, criativo e sempre busca soluções inovadoras e elegantes.",
    "sortOrder": 17
  },
  {
    "name": "João Paulo",
    "company": "Cast Group Informática S.A.",
    "avatarUrl": "/imgs/imgsMobile/linkedin11.webp",
    "content": "Tive o prazer de contar com o Hudson no meu time. Um desenvolvedor focado e criativo, sempre buscando solucionar os desafios que encontramos no projeto. Proativo e disponível para ajudar os colegas de time, visando o melhor para a entrega dos objetivos!",
    "sortOrder": 18
  },
  {
    "name": "Éder Fialho",
    "company": "Cast Group Informática S.A.",
    "avatarUrl": "/imgs/imgsMobile/linkedin12.webp",
    "content": "Um ótimo profissional e profundo conhecedor na parte de Front-end, não se limitando a uso de frameworks para a 'magia' acontecer. Recomendado demais!",
    "sortOrder": 19
  },
  {
    "name": "Gei Batista",
    "company": "Cast Group Informática S.A.",
    "avatarUrl": "/imgs/imgsMobile/linkedin13.webp",
    "content": "Eu tive o prazer de trabalhar com o colega Hudson Kennedy na equipe de desenvolvimento da Cast, no projeto MG-Florestas e posso atestar suas habilidades excepcionais e dedicação. Hudson é um desenvolvedor front-end talentoso e apaixonado, sempre demonstrando um profundo entendimento das mais recentes tecnologias e melhores práticas. Durante nosso tempo juntos na Cast, ele desempenhou um papel fundamental no sucesso do projeto. O que mais me impressionou em Hudson é a sua capacidade de enfrentar desafios complexos com criatividade e eficiência. Sua atenção aos detalhes e comprometimento com a entrega de produtos de alta qualidade sempre o destacaram. Além de suas habilidades técnicas impressionantes, Hudson foi membro incrível da equipe. Sua comunicação clara e disposição para colaborar tornaram o ambiente de trabalho mais produtivo e agradável. Recomendo Hudson sem reservas e estou confiante de que ele continuará a ter um impacto positivo onde quer que vá. Se você está procurando um desenvolvedor front-end talentoso e comprometido, Hudson Kennedy é a escolha certa. Sinta-se à vontade para entrar em contato se precisar de informações adicionais. Atenciosamente, Gei Batista.",
    "sortOrder": 20
  },
  {
    "name": "Kauanne Nunes",
    "company": "Atlas Technologies",
    "avatarUrl": "/imgs/imgsMobile/linkedin14.webp",
    "content": "Hudson foi um dos candidatos que tive o prazer de conhecer. Uma pessoa muito educada, com uma história de vida incrível e levou o nosso bate-papo de uma maneira bem descontraída, sempre explicando com muita riqueza de detalhes as suas experiências. Um excelente perfil a ser avaliado.  ",
    "sortOrder": 21
  },
  {
    "name": "Deborah Montezano",
    "company": "DT3 Sports",
    "avatarUrl": "/imgs/imgsMobile/linkedin15.webp",
    "content": "Hudson é um perfeito profissional, comprometido no que faz, sempre conclui seus projetos com excelência",
    "sortOrder": 22
  },
  {
    "name": "Tássia Felicio",
    "company": "Capitona Rio",
    "avatarUrl": "/imgs/imgsMobile/linkedin16.webp",
    "content": "Profissional exemplar! Muito dedicado, assíduo resolutivo e proativo. E de uma ótima convivência interpessoal. Super recomendo!",
    "sortOrder": 23
  }
];

const socialLinks = [
  { platform: "github", label: "GitHub", url: "https://github.com/Hudsonjr90", icon: "github", sortOrder: 1 },
  { platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/hudsonkennedyjr", icon: "linkedin", sortOrder: 2 },
  { platform: "email", label: "E-mail", url: "mailto:hudsonhugo90@gmail.com", icon: "email", sortOrder: 3 },
  { platform: "whatsapp", label: "WhatsApp", url: "https://api.whatsapp.com/send?phone=5521969609121&text=Ol%C3%A1%2C%20vim%20pelo%20portf%C3%B3lio", icon: "whatsapp", sortOrder: 4 },
];

async function main() {
  console.log("🌱 Starting portfolio seed...");

  console.log("🧹 Clearing existing portfolio data...");
  await prisma.testimonial.deleteMany();
  await prisma.experienceTechnology.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.profile.deleteMany();

  console.log("👤 Creating profile...");
  const profile = await prisma.profile.create({
    data: profileData,
  });

  console.log(`⚙️ Creating ${technologies.length} technologies...`);
  await prisma.technology.createMany({
    data: technologies.map((technology) => ({
      name: technology.name,
      category: technology.category as TechnologyCategory,
      icon: technology.icon,
      sortOrder: technology.sortOrder,
      featured: technology.featured,
      level: technologyLevels[technology.name] ?? TechnologyLevel.INTERMEDIATE,
    })),
  });

  const savedTechnologies = await prisma.technology.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const technologyMap = new Map(
    savedTechnologies.map((technology) => [
      technology.name.trim().toLowerCase(),
      technology.id,
    ]),
  );

  console.log(`💼 Creating ${experiences.length} experiences...`);
  const experienceMap = new Map<string, string>();

  for (const experience of experiences) {
    const created = await prisma.experience.create({
      data: {
        profileId: profile.id,
        company: experience.company,
        role: experience.role,
        description: experience.description,
        startDate: new Date(experience.startDate),
        endDate: experience.endDate ? new Date(experience.endDate) : null,
        isCurrent: experience.isCurrent,
        logoUrl: experience.logoUrl,
        sortOrder: experience.sortOrder,
      },
    });

    experienceMap.set(created.company, created.id);
  }

  const experienceTechnologyData: Array<{
    experienceId: string;
    technologyId: string;
  }> = [];

  for (const experience of experiences) {
    const experienceId = experienceMap.get(experience.company);

    if (!experienceId) {
      console.warn(`⚠️ Experience not found: ${experience.company}`);
      continue;
    }

    for (const technologyName of experience.technologies) {
      const technologyId = technologyMap.get(
        technologyName.trim().toLowerCase(),
      );

      if (!technologyId) {
        console.warn(
          `⚠️ Technology not found for ${experience.company}: ${technologyName}`,
        );
        continue;
      }

      experienceTechnologyData.push({
        experienceId,
        technologyId,
      });
    }
  }

  if (experienceTechnologyData.length > 0) {
    console.log(
      `🔗 Creating ${experienceTechnologyData.length} experience/technology relations...`,
    );

    await prisma.experienceTechnology.createMany({
      data: experienceTechnologyData,
      skipDuplicates: true,
    });
  }

  if (education.length > 0) {
    console.log(`🎓 Creating ${education.length} education records...`);

    await prisma.education.createMany({
      data: education.map((item) => ({
        profileId: profile.id,
        institution: item.institution,
        course: item.course,
        description: null,
        startDate: null,
        endDate: null,
        logoUrl: item.logoUrl,
        sortOrder: item.sortOrder,
      })),
    });
  }

  if (socialLinks.length > 0) {
    console.log(`🔗 Creating ${socialLinks.length} social links...`);

    await prisma.socialLink.createMany({
      data: socialLinks.map((link) => ({
        profileId: profile.id,
        platform: link.platform,
        label: link.label,
        url: link.url,
        icon: link.icon,
        sortOrder: link.sortOrder,
      })),
    });
  }

  const testimonialData: Array<{
    experienceId: string;
    name: string;
    role: string | null;
    company: string | null;
    content: string;
    avatarUrl: string | null;
    sortOrder: number;
  }> = [];

  for (const testimonial of testimonials) {
    const experienceId = experienceMap.get(testimonial.company);

    if (!experienceId) {
      console.warn(
        `⚠️ Experience not found for testimonial: ${testimonial.name} (${testimonial.company})`,
      );
      continue;
    }

    testimonialData.push({
      experienceId,
      name: testimonial.name,
      role: null,
      company: testimonial.company,
      content: testimonial.content,
      avatarUrl: testimonial.avatarUrl ?? null,
      sortOrder: testimonial.sortOrder,
    });
  }

  if (testimonialData.length > 0) {
    console.log(`💬 Creating ${testimonialData.length} testimonials...`);

    await prisma.testimonial.createMany({
      data: testimonialData,
    });
  }

  console.log("\n📊 Seed summary:");
  console.log("   Profile:       1");
  console.log(`   Experiences:   ${experiences.length}`);
  console.log(`   Technologies:  ${savedTechnologies.length}`);
  console.log(`   Education:     ${education.length}`);
  console.log(`   Social links:  ${socialLinks.length}`);
  console.log(`   Testimonials:  ${testimonialData.length}`);
  console.log("\n✅ Portfolio seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("❌ Portfolio seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
