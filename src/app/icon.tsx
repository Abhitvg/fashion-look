import { ImageResponse } from 'next/og'

export const size = {
  width: 512,
  height: 512,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1A1A1A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '110px',
        }}
      >
        <div
          style={{
            fontSize: 260,
            color: '#C5A059',
            fontFamily: 'serif',
            fontWeight: 'bold',
            letterSpacing: '-0.05em',
          }}
        >
          FL
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
