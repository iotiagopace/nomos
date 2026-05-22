window.CMS_CONFIG = {
  brandName:  "Nomos Estúdio",
  shortName:  "NM",
  supabaseUrl:    "https://SEU-PROJETO.supabase.co",
  supabaseAnonKey:"SUA_PUBLISHABLE_KEY",
  imageBucket:        "nomos-images",
  settingsTableName:  "site_settings",
  leadsTableName:     "leads",
  publicStatus: "published",
  draftStatus:  "draft",
  defaultCover: "",

  // Logo do estúdio — descomente quando tiver o arquivo
  // logoUrl: "assets/logo-nomos.svg",

  // ─────────────────────────────────────────────────────────
  // IMAGENS DA HOME
  // ─────────────────────────────────────────────────────────
  homeImages: [
    { key: "hero_bg",    label: "Hero — Vídeo/Imagem de fundo", defaultSrc: "" },
    { key: "about_img",  label: "Sobre — Imagem da seção",      defaultSrc: "" },
    { key: "manifesto",  label: "Manifesto — Imagem de apoio",  defaultSrc: "" }
  ],

  // ─────────────────────────────────────────────────────────
  // SEÇÕES DO PAINEL
  // Cada seção alimenta diretamente o frontend React.
  // ─────────────────────────────────────────────────────────
  sections: [

    // ── PORTFÓLIO ─────────────────────────────────────────
    // Alimenta: src/components/ProjectsGrid.tsx → projects[]
    {
      id:    "projetos",
      label: "Projetos",
      group: "conteudo",
      icon:  "box",
      table: "projects",
      categories: [
        "Posicionamento & Identidade",
        "Voz de Marca & Editorial",
        "Experiência & Presença",
        "Design de Embalagem",
        "Estratégia Digital"
      ],
      fields: [
        { id: "category",    label: "Categoria do projeto", type: "text",     card: true,  placeholder: "Ex: Posicionamento & Identidade" },
        { id: "year",        label: "Ano",                  type: "text",     card: true,  placeholder: "Ex: 2026" },
        { id: "description", label: "Descrição",            type: "textarea", card: false                          },
        { id: "tags",        label: "Tags (separadas por vírgula)", type: "text", card: false, placeholder: "Ex: Branding, Estratégia, Visual" },
        { id: "link",        label: "Link do projeto (opcional)",   type: "text",              placeholder: "https://..." }
      ]
    },

    // ── SERVIÇOS ──────────────────────────────────────────
    // Alimenta: src/components/StrategySection.tsx
    {
      id:    "servicos",
      label: "Serviços",
      group: "conteudo",
      icon:  "star",
      table: "services",
      categories: ["Estratégia", "Identidade", "Editorial", "Digital"],
      fields: [
        { id: "subtitle",    label: "Subtítulo",       type: "text",     card: true  },
        { id: "description", label: "Descrição",       type: "textarea"              },
        { id: "deliverables",label: "Entregáveis",     type: "textarea",             placeholder: "Liste os entregáveis deste serviço" },
        { id: "duration",    label: "Duração estimada",type: "text",                 placeholder: "Ex: 4 a 6 semanas" },
        { id: "investment",  label: "Faixa de investimento", type: "text",           placeholder: "Ex: A partir de R$ 5.000" }
      ]
    },

    // ── PROCESSO ──────────────────────────────────────────
    // Alimenta: src/components/ProcessRow.tsx → steps
    {
      id:    "processo",
      label: "Processo",
      group: "conteudo",
      icon:  "file",
      table: "process_steps",
      categories: [],
      fields: [
        { id: "step_number", label: "Número da etapa",   type: "text", card: true,  placeholder: "Ex: 01" },
        { id: "subtitle",    label: "Subtítulo",         type: "text", card: true,  placeholder: "Ex: Entender antes de criar" },
        { id: "description", label: "Descrição",         type: "textarea"            }
      ]
    },

    // ── RELACIONAMENTO ────────────────────────────────────

    // Alimenta: seção de equipe do site
    {
      id:    "equipe",
      label: "Equipe",
      group: "relacionamento",
      icon:  "users",
      table: "team",
      categories: ["Sócio", "Estratégia", "Criação", "Operações"],
      fields: [
        { id: "role",       label: "Cargo",         type: "text",     card: true,  placeholder: "Ex: Diretora de Criação" },
        { id: "bio",        label: "Bio",           type: "textarea"               },
        { id: "instagram",  label: "Instagram",     type: "text",                  placeholder: "@usuario" },
        { id: "linkedin",   label: "LinkedIn",      type: "text",                  placeholder: "https://linkedin.com/in/..." }
      ]
    },

    // Alimenta: seção de depoimentos / social proof
    {
      id:    "depoimentos",
      label: "Depoimentos",
      group: "relacionamento",
      icon:  "star",
      table: "testimonials",
      categories: ["Branding", "Estratégia", "Editorial", "Digital"],
      fields: [
        { id: "author_role", label: "Cargo / Empresa",  type: "text",   card: true,  placeholder: "Ex: CEO – Empresa X" },
        { id: "rating",      label: "Avaliação",        type: "select", card: true,  options: ["5","4","3"] },
        { id: "text",        label: "Depoimento",       type: "textarea"              },
        { id: "source",      label: "Origem",           type: "select",              options: ["Indicação","Instagram","Google","LinkedIn","Site"] }
      ]
    },

    // FAQ do estúdio
    {
      id:    "faq",
      label: "FAQ",
      group: "relacionamento",
      icon:  "help",
      table: "faq",
      categories: ["Processo", "Investimento", "Prazo", "Geral"],
      fields: [
        { id: "question", label: "Pergunta", type: "text",     card: true },
        { id: "answer",   label: "Resposta", type: "textarea"             }
      ]
    }
  ]
};
