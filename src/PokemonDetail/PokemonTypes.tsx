import styled from "@emotion/styled"
import { usePokemonDetailsResource } from "../contexts/pokemon-details-resource"

function PokemonTypes() {
  const { state: { pokemon, isLoading }} = usePokemonDetailsResource()

  return (
    <Container>
      <Loading show={isLoading} />
      <Loading show={isLoading} />
      {!isLoading && pokemon?.types.map((type, idx) => (
        <PokemonType key={idx}>{type}</PokemonType>
      ))}
    </Container>
  )
}

type Showable = { show: boolean }

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginTop: '1.75rem',
}))

const PokemonType = styled.div(({ theme }) => ({
  padding: '0.375rem 0.875rem',
  border: `1px solid ${theme.baseBorderColor}`,
  borderRadius: '20px',
  textTransform: 'capitalize',
  fontSize: '0.875rem',
  backgroundColor: theme.whiteColor,
}))

const Loading = styled.div<Showable>(({ show }) => ({
  display: show ? 'block' : 'none',
  width: `75px`,
  height: `28px`,
  borderRadius: '20px',
  position: 'relative',
  backgroundColor: '#f0f0f0',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    width: `52px`,
    height:`28px`,
    background: 'linear-gradient(to right, transparent 0%, #dedede 50%, transparent 100%)',
    animation: 'slide 1s ease infinite',
    '@keyframes slide': {
      from: {
        left: `-52px`,
      },
      to: {
        left: '100%',
      }
    },
  },
}))

export { PokemonTypes }
