import { ImageResponse } from 'next/og';
import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

// ----------------------------------------------------------------------

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000', // Fundo preto profundo
          borderRadius: '40px', // Curvatura contínua (estilo iOS squircle)
          border: '4px solid #65C4A8', // Bordas na cor primária da ASPPIBRA
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 'bold',
            color: '#65C4A8',
            display: 'flex',
            fontFamily: 'sans-serif',
          }}
        >
          {CONFIG.appName.substring(0, 1)}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}