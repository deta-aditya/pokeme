import { useOwnedPokemons } from "../contexts/owned-pokemons"

function TotalPokemonsOwned() {
  const { state } = useOwnedPokemons()
  const { pokemons } = state

  return (
    <div>
      Pokemons Owned: {pokemons.length}
    </div>
  )
}

export { TotalPokemonsOwned }
