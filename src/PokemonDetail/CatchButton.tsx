import styled from "@emotion/styled"
import { useOwnedPokemons } from "../contexts/owned-pokemons"
import { usePokemonDetailsResource } from "../contexts/pokemon-details-resource"

type CatchButtonProps = {
  className?: string
}

function CatchButton({ className }: CatchButtonProps) {
  const { dispatch } = useOwnedPokemons()
  const { state: { pokemon, isLoading } } = usePokemonDetailsResource()

  return (
    <Button
      show={!isLoading}
      className={className}
      onClick={() => {
        if (pokemon !== undefined) {
          // let's find a way to purify this thing
          const isCaught = Math.random() < 0.5
          dispatch({ type: 'try-catch', pokemon, isCaught })
        }
      }}
    >
      Catch!
    </Button>
  )
}

type Showable = { show: boolean }

const Button = styled.div<Showable>(({ theme, show }) => ({
  padding: '0.875rem 3.75rem',
  backgroundColor: theme.accentColor,
  fontWeight: 'bold',
  color: theme.whiteColor,
  borderRadius: '40px',
  cursor: 'pointer',
  transition: '0.15s',
  display: show ? 'inline-block': 'none',
  '&:hover': {
    backgroundColor: theme.accentColorDark,
  }
}))

export { CatchButton }
