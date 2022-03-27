import styled from "@emotion/styled"
import { useState } from "react"

function Image(props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Loading width={props.width} height={props.height} show={!loaded} />
      <Img {...props} show={loaded} onLoad={() => setLoaded(true)}/>
    </>
  )
}

const Img = styled.img<{ show: boolean }>(({ show }) => ({
  display: show ? 'inline-block' : 'none',
}))

const Loading = styled.div<{ 
  width: string | number | undefined
  height: string | number | undefined
  show: boolean
}>(({ width, height, show }) => {
  if (width === undefined || height === undefined) {
    return {}
  }

  const numWidth = Number(width)
  const numHeight = Number(height)

  return {
    width: `${numWidth}px`,
    height:`${numHeight}px`,
    position: 'relative',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    borderRadius: '100%',
    display: show ? 'inline-block' : 'none',
    '::before': {
      content: '""',
      position: 'absolute',
      width: `${numWidth}px`,
      height:`${numHeight}px`,
      background: 'linear-gradient(to right, transparent 0%, #dedede 50%, transparent 100%)',
      animation: 'slide 1s ease infinite',
      '@keyframes slide': {
        from: {
          left: `${-numWidth}px`,
        },
        to: {
          left: '100%',
        }
      },
    }
  }
})

export { Image }
