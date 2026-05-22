// ─── Turso HTTP API — leitura pública para o site ────────────────────────────
// Usa VITE_TURSO_URL e VITE_TURSO_TOKEN (read-only token)

const TURSO_URL   = import.meta.env.VITE_TURSO_URL  as string | undefined;
const TURSO_TOKEN = import.meta.env.VITE_TURSO_TOKEN as string | undefined;

export const tursoReady = !!(TURSO_URL && TURSO_TOKEN && !TURSO_URL.includes('SEU-BANCO'));

export async function tursoQuery<T = Record<string, string | null>>(
  sql: string,
  args: (string | number | null)[] = []
): Promise<T[]> {
  if (!tursoReady) return [];

  const res = await fetch(`${TURSO_URL}/v2/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TURSO_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          type: 'execute',
          stmt: {
            sql,
            args: args.map(v =>
              v === null ? { type: 'null' } : { type: 'text', value: String(v) }
            ),
          },
        },
        { type: 'close' },
      ],
    }),
  });

  if (!res.ok) throw new Error(`Turso HTTP ${res.status}`);

  const json = await res.json();
  const result = json.results[0];

  if (result.type === 'error') throw new Error(result.error?.message ?? 'Turso error');

  const { cols, rows } = result.response.result as {
    cols: { name: string }[];
    rows: { value: string | null }[][];
  };

  const colNames = cols.map(c => c.name);
  return rows.map(row =>
    Object.fromEntries(colNames.map((col, i) => [col, row[i]?.value ?? null]))
  ) as T[];
}

/** Faz parse de campo JSON armazenado como texto (gallery_images, youtube_videos etc.) */
export function parseJson<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try { return JSON.parse(value) as T; } catch { return fallback; }
}
