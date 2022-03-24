import styled from '@emotion/styled';
import { MainHeader } from '../MainHeader'
import { PokemonsInfiniteList } from "../PokemonsInfiniteList";

function Home() {
  return (
    <PageContainer>
      <MainHeader />
      <PokemonsInfiniteList />
    </PageContainer>
  )
}

const PageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}, ({ theme }) => ({
  backgroundColor: theme.baseBackgroundColor,
}))

export { Home }
