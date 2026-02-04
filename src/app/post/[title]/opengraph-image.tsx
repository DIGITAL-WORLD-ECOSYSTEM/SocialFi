
import { ImageResponse } from 'next/og';
import { _allPosts } from 'src/_mock/_blog';

// ----------------------------------------------------------------------

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { title: string } }) {
  const post = _allPosts.find((post) => post.title === params.title);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 80,
          background: 'black',
          color: 'white',
          textAlign: 'center',
          padding: '40px',
        }}
      >
        {post?.title || 'Post não encontrado'}
      </div>
    ),
    {
      ...size,
    }
  );
}
