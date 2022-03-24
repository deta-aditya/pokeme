import styled from '@emotion/styled';
import { MainHeader } from '../MainHeader'
import { AppTheme, useAppTheme } from '../contexts/app-theme';
import { PokemonsInfiniteList } from "../PokemonsInfiniteList";

function Home() {
  const theme = useAppTheme()
  return (
    <PageContainer theme={theme}>
      <MainHeader />
      <PokemonsInfiniteList />
    </PageContainer>
  )
}

const PageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}, ({ theme }: { theme: AppTheme }) => ({
  backgroundColor: theme.baseBackgroundColor
}))

export { Home }
