import styled from "@emotion/styled"
import { onMediaQuery } from "../contexts/app-theme"
import { usePokemonDetailsResource } from "../contexts/pokemon-details-resource"

function PokemonMoves() {
  const { state: { pokemon, isLoading }} = usePokemonDetailsResource()

  return (
    <MovesSection>
      <Loading show={isLoading}>
        <div></div>  
      </Loading>
      <Loading show={isLoading}>
        <div></div>
      </Loading>
      <Loading show={isLoading}>
        <div></div>  
      </Loading>
      {!isLoading && pokemon?.moves.map((move, idx) => (
        <div key={idx}>{move.replace('-', ' ')}</div>
      ))}
    </MovesSection>
  )
}

type Showable = { show: boolean }

const MovesSection = styled.div(({ theme }) => ({
  margin: '1rem 0 4rem',
  flexDirection: 'column',
  '& > div': {
    padding: '1rem 1.25rem',
    textTransform: 'capitalize',
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.baseBorderColor}`,
    }
  },
  [onMediaQuery(theme.lg)]: {
    overflowY: 'auto',
    margin: 0,
    padding: '1rem 0 1rem',
  }
}))

const Loading = styled.div<Showable>(({ show }) => ({
  display: show ? 'block' : 'none',
  div: {
    width: `200px`,
    height: `24px`,
    position: 'relative',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    '::before': {
      content: '""',
      position: 'absolute',
      width: `200px`,
      height:`24px`,
      background: 'linear-gradient(to right, transparent 0%, #dedede 50%, transparent 100%)',
      animation: 'slide 1s ease infinite',
      '@keyframes slide': {
        from: {
          left: `-200px`,
        },
        to: {
          left: '100%',
        }
      },
    },
  },
}))

export { PokemonMoves }
