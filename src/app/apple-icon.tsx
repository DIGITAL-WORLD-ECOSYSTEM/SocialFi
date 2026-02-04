import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  // Como um logotipo específico não foi fornecido, usarei a primeira letra do nome do projeto (SocialFi).
  // Isso garante um ícone pixel-perfect e dinâmico.
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: '#1a202c', // Um fundo escuro e elegante
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '36px', // Bordas arredondadas padrão da Apple
        }}
      >
        S
      </div>
    ),
    {
      ...size,
    }
  );
}
