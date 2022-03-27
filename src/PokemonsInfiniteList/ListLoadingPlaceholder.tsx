import styled from "@emotion/styled"
import { onMediaQuery } from "../contexts/app-theme"

function ListLoadingPlaceholder() {
  return (
    <>
      <CardPlaceholder showOn="all" />
      <CardPlaceholder showOn="all" />
      <CardPlaceholder showOn="sm" />
      <CardPlaceholder showOn="md" />
      <CardPlaceholder showOn="lg" />
      <CardPlaceholder showOn="lg" />
      <CardPlaceholder showOn="xl" />
    </>
  )
}

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'all'

const CardPlaceholder = styled.div<{ showOn: Breakpoint }>(({ showOn, theme }) => ({
  width: '135px',
  height: '135px',
  overflow: 'hidden',
  position: 'relative',
  margin: '0 0.75rem 0.75rem 0',
  backgroundColor: '#f0f0f0',
  borderRadius: '10px',
  display: showOn === 'all' ? 'block' : 'none',
  [onMediaQuery(theme.sm)]: {
    display: showOn === 'xl' || showOn === 'lg' || showOn === 'md' ? 'none' : 'block',
  },
  [onMediaQuery(theme.md)]: {
    display: showOn === 'xl' || showOn === 'lg' ? 'none' : 'block',
  },
  [onMediaQuery(theme.lg)]: {
    display: showOn === 'xl' ? 'none' : 'block',
  },
  [onMediaQuery(theme.xl)]: {
    display: 'block',
  },
  '::before': {
    content: '""',
    position: 'absolute',
    width: `135px`,
    height:`135px`,
    background: 'linear-gradient(to right, transparent 0%, #dedede 50%, transparent 100%)',
    animation: 'slide 1s ease infinite',
    '@keyframes slide': {
      from: {
        left: `-135px`,
      },
      to: {
        left: '100%',
      }
    },
  }
}))

export { ListLoadingPlaceholder }
