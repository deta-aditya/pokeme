import { NavBar } from "../NavBar"
import { PokemonsInfiniteList } from "../PokemonsInfiniteList";

function Home() {
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
        <h1>Pokeme</h1>
        <NavBar />
      </header>
      <PokemonsInfiniteList />
    </div>
  )
}

export { Home }
