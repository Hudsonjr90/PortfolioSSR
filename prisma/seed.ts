import { PrismaClient, TechnologyCategory, TechnologyLevel } from "@prisma/client";

const prisma = new PrismaClient();

const technologies: Array<{
  name: string;
  category: TechnologyCategory;
  icon: string;
  sortOrder: number;
  featured: boolean;
  level: TechnologyLevel;
}> = [
  { name: "HTML", category: TechnologyCategory.FRONTEND, icon: "HTML", sortOrder: 1, featured: false, level: TechnologyLevel.ESPECIALIST },
  { name: "CSS", category: TechnologyCategory.FRONTEND, icon: "CSS", sortOrder: 2, featured: false, level: TechnologyLevel.ESPECIALIST },
  { name: "JavaScript", category: TechnologyCategory.FRONTEND, icon: "JavaScript", sortOrder: 3, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "Angular", category: TechnologyCategory.FRONTEND, icon: "Angular", sortOrder: 4, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "React", category: TechnologyCategory.FRONTEND, icon: "React", sortOrder: 5, featured: true, level: TechnologyLevel.ESPECIALIST },
  { name: "Vue", category: TechnologyCategory.FRONTEND, icon: "Vue", sortOrder: 6, featured: true, level: TechnologyLevel.ESPECIALIST },
  { name: "npm", category: TechnologyCategory.OTHER, icon: "npm", sortOrder: 7, featured: false, level: TechnologyLevel.BASIC },
  { name: "Yarn", category: TechnologyCategory.OTHER, icon: "Yarn", sortOrder: 8, featured: false, level: TechnologyLevel.BASIC },
  { name: "Node", category: TechnologyCategory.BACKEND, icon: "Node", sortOrder: 9, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "Git", category: TechnologyCategory.OTHER, icon: "Git", sortOrder: 10, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "GitHub", category: TechnologyCategory.OTHER, icon: "GitHub", sortOrder: 11, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "Bootstrap", category: TechnologyCategory.FRONTEND, icon: "Bootstrap", sortOrder: 12, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Wordpress", category: TechnologyCategory.OTHER, icon: "Wordpress", sortOrder: 13, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Shopify", category: TechnologyCategory.OTHER, icon: "Shopify", sortOrder: 14, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "TypeScript", category: TechnologyCategory.FRONTEND, icon: "TypeScript", sortOrder: 15, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "Sass", category: TechnologyCategory.FRONTEND, icon: "Sass", sortOrder: 16, featured: false, level: TechnologyLevel.ADVANCED },
  { name: "Less", category: TechnologyCategory.FRONTEND, icon: "Less", sortOrder: 17, featured: false, level: TechnologyLevel.BASIC },
  { name: "Express", category: TechnologyCategory.BACKEND, icon: "Express", sortOrder: 18, featured: false, level: TechnologyLevel.ADVANCED },
  { name: "Redux", category: TechnologyCategory.FRONTEND, icon: "Redux", sortOrder: 19, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "PostgreSQL", category: TechnologyCategory.DATABASE, icon: "PostgreSQL", sortOrder: 20, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "Firebase", category: TechnologyCategory.OTHER, icon: "Firebase", sortOrder: 21, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "MySQL", category: TechnologyCategory.DATABASE, icon: "MySQL", sortOrder: 22, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Jira", category: TechnologyCategory.OTHER, icon: "Jira", sortOrder: 23, featured: false, level: TechnologyLevel.BASIC },
  { name: "PHP", category: TechnologyCategory.BACKEND, icon: "PHP", sortOrder: 24, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Python", category: TechnologyCategory.BACKEND, icon: "Python", sortOrder: 25, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Markdown", category: TechnologyCategory.OTHER, icon: "Markdown", sortOrder: 26, featured: false, level: TechnologyLevel.BASIC },
  { name: "Java", category: TechnologyCategory.BACKEND, icon: "Java", sortOrder: 27, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Gitlab", category: TechnologyCategory.OTHER, icon: "Gitlab", sortOrder: 28, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Figma", category: TechnologyCategory.DESIGN, icon: "Figma", sortOrder: 29, featured: false, level: TechnologyLevel.BASIC },
  { name: "Pinia", category: TechnologyCategory.FRONTEND, icon: "Pinia", sortOrder: 30, featured: false, level: TechnologyLevel.BASIC },
  { name: "Vuetify", category: TechnologyCategory.FRONTEND, icon: "Vuetify", sortOrder: 31, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Tailwind", category: TechnologyCategory.FRONTEND, icon: "Tailwind", sortOrder: 32, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "Material", category: TechnologyCategory.FRONTEND, icon: "Material", sortOrder: 33, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "GraphQL", category: TechnologyCategory.BACKEND, icon: "GraphQL", sortOrder: 34, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Webpack", category: TechnologyCategory.FRONTEND, icon: "Webpack", sortOrder: 35, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Swagger", category: TechnologyCategory.BACKEND, icon: "Swagger", sortOrder: 36, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Laravel", category: TechnologyCategory.BACKEND, icon: "Laravel", sortOrder: 37, featured: false, level: TechnologyLevel.BASIC },
  { name: "Spring Boot", category: TechnologyCategory.BACKEND, icon: "Spring Boot", sortOrder: 38, featured: false, level: TechnologyLevel.BASIC },
  { name: "C#", category: TechnologyCategory.BACKEND, icon: "C#", sortOrder: 39, featured: false, level: TechnologyLevel.BASIC },
  { name: "Electron", category: TechnologyCategory.OTHER, icon: "Electron", sortOrder: 40, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Jenkins", category: TechnologyCategory.DEVOPS, icon: "Jenkins", sortOrder: 41, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "jQuery", category: TechnologyCategory.FRONTEND, icon: "jQuery", sortOrder: 42, featured: false, level: TechnologyLevel.ADVANCED },
  { name: "Photoshop", category: TechnologyCategory.DESIGN, icon: "Photoshop", sortOrder: 43, featured: false, level: TechnologyLevel.BASIC },
  { name: "Analytics", category: TechnologyCategory.OTHER, icon: "Analytics", sortOrder: 44, featured: false, level: TechnologyLevel.BASIC },
  { name: "ADS", category: TechnologyCategory.OTHER, icon: "ADS", sortOrder: 45, featured: false, level: TechnologyLevel.BASIC },
  { name: "Terraform", category: TechnologyCategory.DEVOPS, icon: "Terraform", sortOrder: 46, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Ansible", category: TechnologyCategory.DEVOPS, icon: "Ansible", sortOrder: 47, featured: false, level: TechnologyLevel.BASIC },
  { name: "Kubernetes", category: TechnologyCategory.DEVOPS, icon: "Kubernetes", sortOrder: 48, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Jest", category: TechnologyCategory.TESTING, icon: "Jest", sortOrder: 49, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "Jasmine", category: TechnologyCategory.TESTING, icon: "Jasmine", sortOrder: 50, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "MongoDB", category: TechnologyCategory.DATABASE, icon: "MongoDB", sortOrder: 51, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: ".NET", category: TechnologyCategory.BACKEND, icon: ".NET", sortOrder: 52, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Netlify", category: TechnologyCategory.DEVOPS, icon: "Netlify", sortOrder: 53, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Heroku", category: TechnologyCategory.DEVOPS, icon: "Heroku", sortOrder: 54, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Vercel", category: TechnologyCategory.DEVOPS, icon: "Vercel", sortOrder: 55, featured: false, level: TechnologyLevel.ADVANCED },
  { name: "Next.js", category: TechnologyCategory.FRONTEND, icon: "Next.js", sortOrder: 56, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "Vite", category: TechnologyCategory.OTHER, icon: "Vite", sortOrder: 57, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "Postman", category: TechnologyCategory.OTHER, icon: "Postman", sortOrder: 58, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Thunderclient", category: TechnologyCategory.OTHER, icon: "Thunderclient", sortOrder: 59, featured: false, level: TechnologyLevel.BASIC },
  { name: "Cypress", category: TechnologyCategory.TESTING, icon: "Cypress", sortOrder: 60, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "AWS", category: TechnologyCategory.DEVOPS, icon: "AWS", sortOrder: 61, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "Sketch", category: TechnologyCategory.DESIGN, icon: "Sketch", sortOrder: 62, featured: false, level: TechnologyLevel.BASIC },
  { name: "Adobe XD", category: TechnologyCategory.DESIGN, icon: "Adobe XD", sortOrder: 63, featured: false, level: TechnologyLevel.BASIC },
  { name: "Nuxt", category: TechnologyCategory.FRONTEND, icon: "Nuxt", sortOrder: 64, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "ESLint", category: TechnologyCategory.OTHER, icon: "ESLint", sortOrder: 65, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Magento", category: TechnologyCategory.OTHER, icon: "Magento", sortOrder: 66, featured: false, level: TechnologyLevel.BASIC },
  { name: "Ruby", category: TechnologyCategory.BACKEND, icon: "Ruby", sortOrder: 67, featured: false, level: TechnologyLevel.BASIC },
  { name: "Ruby on Rails", category: TechnologyCategory.BACKEND, icon: "Ruby on Rails", sortOrder: 68, featured: false, level: TechnologyLevel.BASIC },
  { name: "NestJS", category: TechnologyCategory.BACKEND, icon: "NestJS", sortOrder: 69, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "Prisma", category: TechnologyCategory.BACKEND, icon: "Prisma", sortOrder: 70, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "RubyMine", category: TechnologyCategory.OTHER, icon: "RubyMine", sortOrder: 71, featured: false, level: TechnologyLevel.BASIC },
  { name: "VS Code", category: TechnologyCategory.OTHER, icon: "VS Code", sortOrder: 72, featured: false, level: TechnologyLevel.ADVANCED },
  { name: "IntelliJ IDEA", category: TechnologyCategory.OTHER, icon: "IntelliJ IDEA", sortOrder: 73, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Android", category: TechnologyCategory.OTHER, icon: "Android", sortOrder: 74, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "DBeaver", category: TechnologyCategory.OTHER, icon: "DBeaver", sortOrder: 75, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Quasar", category: TechnologyCategory.FRONTEND, icon: "Quasar", sortOrder: 76, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "ECharts", category: TechnologyCategory.OTHER, icon: "ECharts", sortOrder: 77, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "gRPC", category: TechnologyCategory.OTHER, icon: "gRPC", sortOrder: 78, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Eclipse", category: TechnologyCategory.OTHER, icon: "Eclipse", sortOrder: 79, featured: false, level: TechnologyLevel.BASIC },
  { name: "Fastify", category: TechnologyCategory.BACKEND, icon: "Fastify", sortOrder: 80, featured: true, level: TechnologyLevel.BASIC },
  { name: "Insomnia", category: TechnologyCategory.OTHER, icon: "Insomnia", sortOrder: 81, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "GoLand", category: TechnologyCategory.OTHER, icon: "GoLand", sortOrder: 82, featured: false, level: TechnologyLevel.BASIC },
  { name: "Svelte", category: TechnologyCategory.FRONTEND, icon: "Svelte", sortOrder: 83, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Cursor", category: TechnologyCategory.AI, icon: "Cursor", sortOrder: 84, featured: false, level: TechnologyLevel.ADVANCED },
  { name: "Codex", category: TechnologyCategory.AI, icon: "Codex", sortOrder: 85, featured: false, level: TechnologyLevel.BASIC },
  { name: "Claude", category: TechnologyCategory.AI, icon: "Claude", sortOrder: 86, featured: false, level: TechnologyLevel.ADVANCED },
  { name: "Gemini", category: TechnologyCategory.AI, icon: "Gemini", sortOrder: 87, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "DeepSeek", category: TechnologyCategory.AI, icon: "DeepSeek", sortOrder: 88, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "ChatGPT", category: TechnologyCategory.AI, icon: "ChatGPT", sortOrder: 89, featured: false, level: TechnologyLevel.ADVANCED },
  { name: "Copilot", category: TechnologyCategory.AI, icon: "Copilot", sortOrder: 90, featured: false, level: TechnologyLevel.ADVANCED },
  { name: "OpenClaw", category: TechnologyCategory.AI, icon: "OpenClaw", sortOrder: 91, featured: false, level: TechnologyLevel.INTERMEDIATE },
  { name: "Docker", category: TechnologyCategory.DEVOPS, icon: "Docker", sortOrder: 92, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "Redis", category: TechnologyCategory.DEVOPS, icon: "Redis", sortOrder: 93, featured: true, level: TechnologyLevel.ADVANCED },
  { name: "Go", category: TechnologyCategory.BACKEND, icon: "Go", sortOrder: 94, featured: false, level: TechnologyLevel.BASIC },
];

async function main() {
  console.log("🌱 Starting technology seed...");
  console.log(`⚙️ Synchronizing ${technologies.length} technologies...`);

  let created = 0;
  let updated = 0;

  for (const technology of technologies) {
    const existing = await prisma.technology.findFirst({
      where: { name: technology.name },
      select: { id: true },
    });

    if (existing) {
      await prisma.technology.update({
        where: { id: existing.id },
        data: {
          category: technology.category,
          icon: technology.icon,
          sortOrder: technology.sortOrder,
          featured: technology.featured,
          level: technology.level,
        },
      });
      updated++;
      continue;
    }

    await prisma.technology.create({
      data: technology,
    });
    created++;
  }

  console.log("\n📊 Technology seed summary:");
  console.log(`   Created: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Total:   ${technologies.length}`);
  console.log("\n✅ Technology seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("❌ Technology seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });