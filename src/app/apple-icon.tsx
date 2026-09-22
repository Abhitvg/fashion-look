import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';
 
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
          backgroundColor: '#0a0a0a',
          color: '#c9a227',
          fontSize: 90,
          fontFamily: 'serif',
          fontStyle: 'italic',
          fontWeight: 'bold',
          borderRadius: '34px',
          border: '2px solid #c9a227'
        }}
      >
        FL
      </div>
    ),
    { ...size }
  );
}
