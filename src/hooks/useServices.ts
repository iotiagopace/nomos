import { useState, useEffect } from 'react';
import { tursoQuery, tursoReady } from '../lib/turso';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string;
  duration: string;
  investment: string;
  category: string;
}

// Dados estáticos de fallback
const STATIC_SERVICES: ServiceItem[] = [
  {
    id: 'escuta',
    title: '1. Escuta',
    subtitle: 'Entender antes de criar',
    description: 'Entendemos o negócio, o público, o mercado e os sinais que já existem na marca.',
    deliverables: '',
    duration: '',
    investment: '',
    category: 'Estratégia',
  },
  {
    id: 'direcao',
    title: '2. Direção',
    subtitle: 'Posicionamento com clareza',
    description: 'Organizamos posicionamento, voz, narrativa e presença para dar clareza ao caminho.',
    deliverables: '',
    duration: '',
    investment: '',
    category: 'Estratégia',
  },
  {
    id: 'criacao',
    title: '3. Criação com sentido',
    subtitle: 'Estratégia em forma',
    description: 'Transformamos estratégia em escolhas visuais, verbais e criativas mais consistentes.',
    deliverables: '',
    duration: '',
    investment: '',
    category: 'Criação',
  },
];

export function useServices() {
  const [services, setServices] = useState<ServiceItem[]>(STATIC_SERVICES);
  const [loading, setLoading] = useState(tursoReady);

  useEffect(() => {
    if (!tursoReady) return;

    tursoQuery<Record<string, string | null>>(
      `SELECT * FROM services WHERE status = 'published' ORDER BY display_order ASC, created_at DESC`
    )
      .then(rows => {
        if (rows.length === 0) return;
        setServices(
          rows.map(r => ({
            id: r.id ?? '',
            title: r.title ?? '',
            subtitle: r.subtitle ?? '',
            description: r.description ?? '',
            deliverables: r.deliverables ?? '',
            duration: r.duration ?? '',
            investment: r.investment ?? '',
            category: r.category ?? '',
          }))
        );
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { services, loading };
}
