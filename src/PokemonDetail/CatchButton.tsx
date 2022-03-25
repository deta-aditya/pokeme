import styled from "@emotion/styled"
import { useNavigate } from "react-router-dom"
import { useOwnedPokemons } from "../contexts/owned-pokemons"
import { PokemonDetailsData } from "../resources/types"

type CatchButtonProps = {
  pokemon: PokemonDetailsData
  className?: string
}

function CatchButton({ pokemon, className }: CatchButtonProps) {
  const { dispatch } = useOwnedPokemons()

  return (
    <Button
      className={className}
      onClick={() => {
        // let's find a way to purify this thing
        const isCaught = Math.random() < 0.5
        dispatch({ type: 'try-catch', pokemon, isCaught })
      }}
    >
      Catch!
    </Button>
  )
}

const Button = styled.div(({ theme }) => ({
  padding: '0.875rem 3.75rem',
  backgroundColor: theme.accentColor,
  fontWeight: 'bold',
  color: theme.whiteColor,
  borderRadius: '40px',
  cursor: 'pointer',
  transition: '0.15s',
  '&:hover': {
    backgroundColor: theme.accentColorDark,
  }
}))

export { CatchButton }
