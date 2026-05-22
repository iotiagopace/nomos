import { useState, useEffect } from 'react';
import { tursoQuery, parseJson, tursoReady } from '../lib/turso';
import { ProjectItem } from '../types';

// Dados estáticos de fallback (exibidos enquanto Turso não está configurado)
const STATIC_PROJECTS: ProjectItem[] = [
  {
    id: 'lume',
    title: 'Lume Café',
    category: 'Posicionamento & Identidade',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=85',
    description: 'Construção verbal e estética para cafeteria especial que visa transformar manhãs em rituais.',
    tags: ['Branding', 'Estratégia', 'Visual'],
  },
  {
    id: 'kairos',
    title: 'Kairós Editorial',
    category: 'Voz de Marca & Editorial',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=85',
    description: 'Série literária com foco em expressividade tipográfica de alto impacto dita do jeito certo.',
    tags: ['Editorial', 'Verbal', 'Tipografia'],
  },
  {
    id: 'planalto',
    title: 'Planalto Sul',
    category: 'Experiência & Presença',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85',
    description: 'Branding imobiliário refinado para empreendimento de alto padrão no interior do estado.',
    tags: ['Digital', 'Estratégia', 'Branding'],
  },
  {
    id: 'soma',
    title: 'SOMA Cosméticos',
    category: 'Design de Embalagem',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85',
    description: 'Design de produto sustentável com material tátil de alta qualidade e paleta minimalista.',
    tags: ['Embalagem', 'Visual', 'Sustentável'],
  },
];

export function useProjects() {
  const [projects, setProjects] = useState<ProjectItem[]>(STATIC_PROJECTS);
  const [loading, setLoading] = useState(tursoReady);

  useEffect(() => {
    if (!tursoReady) return;

    tursoQuery<Record<string, string | null>>(
      `SELECT * FROM projects WHERE status = 'published' ORDER BY display_order ASC, created_at DESC`
    )
      .then(rows => {
        if (rows.length === 0) return; // mantém fallback estático se banco vazio
        setProjects(
          rows.map(r => ({
            id: r.id ?? '',
            title: r.title ?? '',
            category: r.category ?? '',
            year: r.year ?? '',
            imageUrl: r.cover_image_url ?? parseJson<string[]>(r.gallery_images, [])[0] ?? '',
            description: r.description ?? '',
            tags: r.tags ? r.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
          }))
        );
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading };
}
