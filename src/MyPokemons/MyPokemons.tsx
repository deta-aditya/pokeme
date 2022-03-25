import { MainHeader } from "../MainHeader"
import { PageContainer } from "../PageContainer"
import { OwnedPokemonsList } from './OwnedPokemonsList'

function MyPokemons() {
  return (
    <PageContainer>
      <MainHeader />
      <OwnedPokemonsList />
    </PageContainer>
  )
}

export { MyPokemons }
