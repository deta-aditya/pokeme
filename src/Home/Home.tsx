import { MainHeader } from '../MainHeader'
import { PokemonsInfiniteList } from "../PokemonsInfiniteList";

function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    }}>
      <MainHeader />
      <PokemonsInfiniteList />
    </div>
  )
}

export { Home }
