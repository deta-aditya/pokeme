import styled from "@emotion/styled"
import PokemonLogoSvg from '../assets/pokemon_logo.svg'
import { NavBar } from "../NavBar"

function MainHeader() {
  return (
    <Header>
      <h1>
        <PokemonLogo src={PokemonLogoSvg} alt="Pokemon logo" />
        Pokeme
      </h1>
      <NavBar />
    </Header>
  )
}

const Header = styled.header(({ theme }) => ({
  padding: '2rem 1.25rem 0',
  borderBottom: `1px solid ${theme.baseBorderColor}`,
  flexGrow: 0,
  h1: {
    margin: 0,
    display: 'flex',
    gap: '0.75rem',
    fontSize: '1.5rem',
    alignItems: 'center',
  }, 
  backgroundImage: theme.headerGradientColors,
}))

const PokemonLogo = styled.img({
  width: '2rem'
})

export { MainHeader }
