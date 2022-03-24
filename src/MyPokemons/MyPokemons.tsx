import { useOwnedPokemons } from "../contexts/owned-pokemons"
import { MainHeader } from "../MainHeader"
import { NavBar } from "../NavBar"
import { TotalPokemonsOwned } from "../TotalPokemonsOwned"
import { OwnedPokemonsList } from './OwnedPokemonsList'

function MyPokemons() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    }}>
      <MainHeader />
      <OwnedPokemonsList />
    </div>
  )
}

export { MyPokemons }
