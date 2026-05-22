import { useState, useEffect } from 'react';
import { tursoQuery, parseJson, tursoReady } from '../lib/turso';

export interface SiteSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  tiktok: string;
  seo_title: string;
  seo_description: string;
  hours_weekday: string;
  hours_saturday: string;
  hours_sunday: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  phone: '',
  whatsapp: '5517992723486',
  email: '',
  address: '',
  instagram: '',
  facebook: '',
  youtube: '',
  linkedin: '',
  tiktok: '',
  seo_title: 'Nomos Estúdio — Branding & Estratégia de Marca',
  seo_description: 'Criatividade e estratégia de verdade. Da imersão ao refinamento.',
  hours_weekday: 'Seg–Sex: 9h às 18h',
  hours_saturday: 'Sábado: 9h às 13h',
  hours_sunday: 'Fechado',
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(tursoReady);

  useEffect(() => {
    if (!tursoReady) return;

    tursoQuery<{ value: string | null }>(
      `SELECT value FROM site_settings WHERE key = 'global_config'`
    )
      .then(rows => {
        if (!rows[0]?.value) return;
        const parsed = parseJson<Partial<SiteSettings>>(rows[0].value, {});
        setSettings(prev => ({ ...prev, ...parsed }));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
}
