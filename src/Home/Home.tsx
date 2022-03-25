import { MainHeader } from '../MainHeader'
import { PokemonsInfiniteList } from "../PokemonsInfiniteList";
import { PageContainer } from '../PageContainer'

function Home() {
  return (
    <PageContainer>
      <MainHeader />
      <PokemonsInfiniteList />
    </PageContainer>
  )
}

export { Home }
