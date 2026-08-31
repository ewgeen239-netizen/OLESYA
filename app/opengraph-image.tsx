import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const alt = `${site.fullName} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Obraz do podglądu w social mediach — generowany z palety marki. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 76,
          background: 'linear-gradient(150deg, #fdf9f4 0%, #f8f3ed 45%, #ead8c7 100%)',
          color: '#302720',
        }}
      >
        <div style={{ display: 'flex', fontSize: 22, letterSpacing: 6, color: '#7b6a5d' }}>
          STYLIZACJA PAZNOKCI · SZCZECIN
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', fontSize: 92, lineHeight: 1, letterSpacing: -2 }}>
            Alesia Nails
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: '#8b6f5a' }}>
            Delikatny, precyzyjny manicure
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', width: 56, height: 56, borderRadius: 28, background: '#c6a889' }} />
          <div style={{ display: 'flex', fontSize: 26, color: '#4b3a31' }}>
            @nails_alesia_szczecin
          </div>
        </div>
      </div>
    ),
    size
  );
}
