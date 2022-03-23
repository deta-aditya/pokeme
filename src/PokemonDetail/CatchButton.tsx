import { useOwnedPokemons } from "../contexts/owned-pokemons"
import { PokemonDetailsData } from "../resources/types"

type CatchButtonProps = {
  pokemon: PokemonDetailsData
}

function CatchButton({ pokemon }: CatchButtonProps) {
  const { dispatch } = useOwnedPokemons()

  return (
    <button
      onClick={() => {
        // let's find a way to purify this thing
        const isCaught = Math.random() < 0.5
        dispatch({ type: 'try-catch', pokemon, isCaught })
      }}
    >
      Catch!
    </button>
  )
}

export { CatchButton }
