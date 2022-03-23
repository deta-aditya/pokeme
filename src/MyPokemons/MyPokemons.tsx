import { useOwnedPokemons } from "../contexts/owned-pokemons"
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
      <header style={{
        paddingBottom: '16px',
        borderBottom: '1px solid #eee',
        flexGrow: 0,
      }}>
        <h1>My Pokemons</h1>
        <TotalPokemonsOwned />
        <NavBar />
      </header>
      <OwnedPokemonsList />
    </div>
  )
}

export { MyPokemons }
