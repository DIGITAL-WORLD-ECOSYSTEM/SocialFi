import { ImageResponse } from 'next/og';
import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const runtime = 'edge'; // Vital para performance na borda

export const alt = 'ASPPIBRA - Associação dos Pequenos Produtores Integrados do Brasil';

export const size = {
  width: 1200,
  height: 630, // Proporção padrão para Summary Card with Large Image
};

export const contentType = 'image/png';

// ----------------------------------------------------------------------

export default async function Image() {
  // Buscamos a fonte para garantir que o texto não use a fonte padrão do sistema
  const fontData = await fetch(
    new URL('https://fonts.cdnfonts.com/s/15068/Inter-Bold.woff')
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
          color: '#ffffff',
          fontFamily: '"Inter"',
        }}
      >
        {/* Elemento Decorativo: O "Z" ou Círculo da sua marca */}
        <div
          style={{
            display: 'flex',
            marginBottom: '20px',
            background: '#65C4A8', // Sua cor primária
            width: '120px',
            height: '120px',
            borderRadius: '24px',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '64px',
            fontWeight: 'bold',
          }}
        >
          A
        </div>

        <h1 style={{ fontSize: '80px', margin: 0 }}>{CONFIG.appName}</h1>
        
        <p style={{ fontSize: '32px', opacity: 0.7, marginTop: '20px' }}>
          {CONFIG.siteUrl.replace('https://', '')}
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}