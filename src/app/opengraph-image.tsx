import { ImageResponse } from 'next/og';

import { CONFIG } from 'src/global-config';
import { _allPosts } from 'src/_mock/_blog';

// ----------------------------------------------------------------------

export const runtime = 'edge';

export const alt = 'SocialFi - Sua Rede Social Descentralizada';

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

  const post = _allPosts.find((post) => post.title === title);

  const [getFont, getFontBold] = await Promise.all([
    fetch(new URL('https://fonts.cdnfonts.com/s/15068/Inter-Regular.woff')).then((res) => res.arrayBuffer()),
    fetch(new URL('https://fonts.cdnfonts.com/s/15068/Inter-Bold.woff')).then((res) => res.arrayBuffer()),
  ]);

  const shared = {
    title: post?.title ?? alt,
    description: post?.description ?? '',
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
        <svg
          width="105"
          height="30"
          viewBox="0 0 105 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.08862 2.76632C1.70887 1.25983 0 2.21953 0 4.29821V25.7018C0 27.7805 1.70887 28.7402 3.08862 27.2337L10.3239 19.349C11.6631 17.8863 11.6631 12.1137 10.3239 10.651L3.08862 2.76632Z"
            fill="#86E6D4"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.7937 19.349C28.1329 17.8863 28.1329 12.1137 26.7937 10.651L19.5585 2.76632C18.1787 1.25983 16.4699 2.21953 16.4699 4.29821V25.7018C16.4699 27.7805 18.1787 28.7402 19.5585 27.2337L26.7937 19.349Z"
            fill="#86E6D4"
          />
          <path
            d="M32.0622 29V1H39.8135V29H32.0622Z"
            fill="url(#paint0_linear_2_23)"
          />
          <path
            d="M44.4259 29V1H52.1772V29H44.4259Z"
            fill="url(#paint1_linear_2_23)"
          />
          <path
            d="M56.7896 29V1H64.5409V29H56.7896Z"
            fill="url(#paint2_linear_2_23)"
          />
          <path
            d="M69.1533 29V1H76.9046V29H69.1533Z"
            fill="url(#paint3_linear_2_23)"
          />
          <path
            d="M81.517 29V1H89.2683V29H81.517Z"
            fill="url(#paint4_linear_2_23)"
          />
          <path
            d="M93.8807 29V1H101.632V29H93.8807Z"
            fill="url(#paint5_linear_2_23)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2_23"
              x1="35.9379"
              y1="1"
              x2="35.9379"
              y2="29"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#65C4A8" />
              <stop offset="1" stopColor="#65C4A8" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_2_23"
              x1="48.3015"
              y1="1"
              x2="48.3015"
              y2="29"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#65C4A8" />
              <stop offset="1" stopColor="#65C4A8" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_2_23"
              x1="60.6652"
              y1="1"
              x2="60.6652"
              y2="29"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#65C4A8" />
              <stop offset="1" stopColor="#65C4A8" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_2_23"
              x1="73.0289"
              y1="1"
              x2="73.0289"
              y2="29"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#65C4A8" />
              <stop offset="1" stopColor="#65C4A8" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_2_23"
              x1="85.3927"
              y1="1"
              x2="85.3927"
              y2="29"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#65C4A8" />
              <stop offset="1" stopColor="#65C4A8" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_2_23"
              x1="97.7563"
              y1="1"
              x2="97.7563"
              y2="29"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#65C4A8" />
              <stop offset="1" stopColor="#65C4A8" stopOpacity="0" />
            </linearGradient>
          </defs>
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
            {CONFIG.site.baseUrl.replace('https://', '')}
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