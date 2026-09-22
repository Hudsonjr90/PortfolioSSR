# Hudson Kennedy — Portfolio

<p align="center">
  <img
    src="https://www.hudsonkennedy.dev.br/logo.png"
    alt="Hudson Kennedy — Full Stack Software Engineer"
    width="50%"
  />
</p>

<p align="center">
  <strong>Software Engineer · Full Stack Developer · Architecture & Engineering</strong>
</p>

<p align="center">
  <a href="https://www.hudsonkennedy.dev.br/">
    <img src="https://img.shields.io/badge/🌐_Portfolio-00D4FF?style=for-the-badge&labelColor=070B14" alt="Portfolio">
  </a>
  <a href="https://www.linkedin.com/in/hudsonkennedyjr/">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://github.com/Hudsonjr90">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt-4-00DC82?style=flat-square&logo=nuxt.js&logoColor=white" alt="Nuxt">
  <img src="https://img.shields.io/badge/Vue-3-4FC08D?style=flat-square&logo=vue.js&logoColor=white" alt="Vue">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Quasar-2-1976D2?style=flat-square&logo=quasar&logoColor=white" alt="Quasar">
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel">
</p>

---

## 🌐 Live

> **Meu portfólio profissional, construído como uma aplicação real de software — e não apenas como uma página estática.**

<p align="center">

### [🚀 www.hudsonkennedy.dev.br](https://www.hudsonkennedy.dev.br/)

</p>

---

# Sobre o projeto

Este é o meu portfólio profissional.

Mas existe uma diferença importante entre este projeto e um simples site pessoal:

**eu quis construir o próprio portfólio como uma aplicação de software.**

Em vez de apenas criar uma página com currículo, experiências e links, aproveitei o projeto para aplicar conceitos que fazem parte da minha rotina como desenvolvedor:

- arquitetura de aplicações;
- SSR;
- APIs;
- persistência de dados;
- modelagem de banco;
- componentização;
- SEO;
- performance;
- responsividade;
- acessibilidade;
- CI/CD;
- observabilidade de problemas;
- deploy em produção.

O resultado é uma aplicação que apresenta minha trajetória profissional e, ao mesmo tempo, permite visualizar na prática **como penso e construo software**.

---

# 💡 Por que construir dessa forma?

Uma das decisões mais importantes do projeto foi não tratar o portfólio simplesmente como uma coleção de páginas estáticas.

Eu poderia ter colocado todas as informações diretamente nos componentes:

```text
Experiência
Formação
Tecnologias
Depoimentos
Certificações
```

e encerrado o projeto.

Mas isso não representaria a forma como costumo pensar aplicações.

Preferi estruturar o projeto considerando que o conteúdo poderia crescer, mudar e futuramente ser administrado através de uma interface própria.

A ideia principal

O portfólio precisava demonstrar não apenas o que eu sei usar, mas como eu penso sobre software.

## 🏗️ Arquitetura

A aplicação utiliza o Nuxt como plataforma principal, combinando frontend SSR, API Nitro e camada de persistência.

                         ┌─────────────────────┐
                         │       Browser       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                    ┌────────────────────────────┐
                    │          Nuxt 4            │
                    │                            │
                    │     Vue 3 + TypeScript     │
                    │        + Quasar             │
                    └─────────────┬──────────────┘
                                  │
                   ┌──────────────┴──────────────┐
                   │                             │
                   ▼                             ▼
        ┌───────────────────┐          ┌───────────────────┐
        │   Presentation    │          │     Nitro API     │
        │                   │          │                   │
        │ Components        │          │ /api/portfolio    │
        │ Pages             │          │ /api/map/...      │
        │ Layouts           │          │                   │
        └───────────────────┘          └─────────┬─────────┘
                                                 │
                                                 ▼
                                      ┌─────────────────────┐
                                      │     Repository      │
                                      │                     │
                                      │ portfolio.repository│
                                      └──────────┬──────────┘
                                                 │
                                                 ▼
                                      ┌─────────────────────┐
                                      │       Prisma        │
                                      └──────────┬──────────┘
                                                 │
                                                 ▼
                                      ┌─────────────────────┐
                                      │   PostgreSQL / Neon │
                                      └─────────────────────┘

# 🗂️ Estrutura 

```text
PortfolioSSR/
│
├── app/
│   │
│   ├── components/
│   │   ├── Home/
│   │   │   ├── AboutSection.vue
│   │   │   ├── ContactSection.vue
│   │   │   ├── EducationSection.vue
│   │   │   ├── ExperienceCard.vue
│   │   │   ├── ExperienceSection.vue
│   │   │   ├── HeroSection.vue
│   │   │   ├── TechnologySection.vue
│   │   │   └── TestimonialSection.vue
│   │   │
│   │   └── layout/
│   │       ├── AppFooter.vue
│   │       ├── AppNavbar.vue
│   │       └── ScrollToTop.vue
│   │
│   ├── pages/
│   │   └── index.vue
│   │
│   └── app.vue
│
├── assets/
│   └── styles/
│       ├── main.scss
│       ├── quasar-custom.scss
│       └── quasar-variable.scss
│
├── public/
│   └── images/
│       ├── education/
│       ├── education-pdf/
│       ├── experiences/
│       ├── testimonials/
│       └── github/
│
├── prisma/
│   └── schema.prisma
│
├── server/
│   ├── api/
│   │   └── portfolio.get.ts
│   │
│   ├── repositories/
│   │   └── portfolio.repository.ts
│   │
│   └── utils/
│       └── prisma.ts
│
├── .env.example
├── nuxt.config.ts
├── quasar-options.ts
├── package.json
└── README.md
```

# 🗄️ Modelagem de dados

O conteúdo do portfólio é armazenado em PostgreSQL.

A estrutura permite relacionar diferentes partes da trajetória profissional.

Uma representação simplificada:
```text
                     ┌──────────────┐
                     │    Profile   │
                     └──────┬───────┘
                            │
            ┌───────────────┼────────────────┐
            │               │                │
            ▼               ▼                ▼
      Experiences       Education      Certifications
            │
            │
       ┌────┴─────┐
       │          │
       ▼          ▼
Technologies  Testimonials
       │
       ▼
 Technology
 ```

# 🔄 CI/CD

O projeto possui pipeline de deploy utilizando GitHub Actions.

```text
Developer
    │
    │ git push
    ▼
 GitHub
    │
    ▼
GitHub Actions
    │
    ├── Checkout
    ├── Node.js
    ├── Dependencies
    ├── Vercel Pull
    └── Vercel Deploy
             │
             ▼
          Vercel
             │
             ▼
       Production
```
