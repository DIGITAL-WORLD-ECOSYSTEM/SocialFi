import { ImageResponse } from 'next/og';

import { CONFIG } from 'src/global-config';
import { _posts } from 'src/_mock/_blog'; // 🟢 CORREÇÃO 1: Alterado de _allPosts para _posts

// ----------------------------------------------------------------------

export const runtime = 'edge';

export const alt = 'ASPPIBRA - Conectando o agronegócio à tecnologia';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// ----------------------------------------------------------------------

type Props = {
  params: {
    title: string;
  };
};

export default async function GET(props: Props) {
  const { title } = props.params;

  // 🟢 CORREÇÃO 2: Tipagem explícita do parâmetro 'post' (Erro 7006)
  // E uso da variável correta _posts (Erro 2724)
  const post = _posts.find((p: any) => p.title === title);

  const [getFont, getFontBold] = await Promise.all([
    fetch(new URL('https://fonts.cdnfonts.com/s/15068/Inter-Regular.woff')).then((res) => res.arrayBuffer()),
    fetch(new URL('https://fonts.cdnfonts.com/s/15068/Inter-Bold.woff')).then((res) => res.arrayBuffer()),
  ]);

  const shared = {
    title: post?.title ?? CONFIG.appName,
    description: post?.description ?? 'Associação dos Pequenos Produtores Integrados do Brasil.',
  };

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: '80px',
          color: '#fff',
          backgroundColor: '#000000',
        }}
      >
        {/* SVG do Logo - Mantido conforme original */}
        <svg width="105" height="30" viewBox="0 0 105 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M3.08862 2.76632C1.70887 1.25983 0 2.21953 0 4.29821V25.7018C0 27.7805 1.70887 28.7402 3.08862 27.2337L10.3239 19.349C11.6631 17.8863 11.6631 12.1137 10.3239 10.651L3.08862 2.76632Z" fill="#86E6D4"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M26.7937 19.349C28.1329 17.8863 28.1329 12.1137 26.7937 10.651L19.5585 2.76632C18.1787 1.25983 16.4699 2.21953 16.4699 4.29821V25.7018C16.4699 27.7805 18.1787 28.7402 19.5585 27.2337L26.7937 19.349Z" fill="#86E6D4"/>
          <path d="M32.0622 29V1H39.8135V29H32.0622Z" fill="#65C4A8"/>
          <path d="M44.4259 29V1H52.1772V29H44.4259Z" fill="#65C4A8"/>
          <path d="M56.7896 29V1H64.5409V29H56.7896Z" fill="#65C4A8"/>
          <path d="M69.1533 29V1H76.9046V29H69.1533Z" fill="#65C4A8"/>
          <path d="M81.517 29V1H89.2683V29H81.517Z" fill="#65C4A8"/>
          <path d="M93.8807 29V1H101.632V29H93.8807Z" fill="#65C4A8"/>
        </svg>

        <h1
          style={{
            margin: 0,
            paddingTop: 64,
            maxWidth: 1040,
            fontSize: 64,
            lineHeight: 1.2,
            fontFamily: '"Inter-Bold"',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {shared.title}
        </h1>

        <p
          style={{
            margin: 0,
            paddingTop: 24,
            maxWidth: 880,
            opacity: 0.6,
            fontSize: 32,
            lineHeight: 1.5,
            fontFamily: '"Inter-Regular"',
          }}
        >
          {shared.description}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 'auto',
            width: '100%',
            fontFamily: '"Inter-Regular"',
          }}
        >
          <p
            style={{
              margin: 0,
              opacity: 0.8,
              fontSize: 24,
              lineHeight: 1.5,
            }}
          >
            {/* 🟢 CORREÇÃO 3: Usando siteUrl em vez de site.baseUrl (Erro 2339) */}
            {CONFIG.siteUrl.replace('https://', '')}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter-Regular', data: getFont, weight: 400, style: 'normal' },
        { name: 'Inter-Bold', data: getFontBold, weight: 700, style: 'normal' },
      ],
    }
  );
}