import styled from "@emotion/styled"
import { AppTheme, useAppTheme } from "../contexts/app-theme"
import { useOwnedPokemons } from "../contexts/owned-pokemons"
import { PokemonDetailsData } from "../resources/types"

type CatchButtonProps = {
  pokemon: PokemonDetailsData
}

function CatchButton({ pokemon }: CatchButtonProps) {
  const { dispatch } = useOwnedPokemons()
  const theme = useAppTheme()

  return (
    <Button
      theme={theme}
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

const Button = styled.div(({ theme }: { theme: AppTheme }) => ({
  padding: '0.875rem 3.75rem',
  backgroundColor: theme.accentColor,
  fontWeight: 'bold',
  color: theme.whiteColor,
  borderRadius: '40px',
}))

export { CatchButton }
