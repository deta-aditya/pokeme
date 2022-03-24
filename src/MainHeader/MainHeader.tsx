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

const Header = styled.header({
  padding: '2rem 1.25rem 0',
  borderBottom: '1px solid #eee',
  flexGrow: 0,
  h1: {
    margin: 0,
    display: 'flex',
    gap: '0.75rem',
    fontSize: '1.5rem',
    alignItems: 'center',
  }, 
  backgroundImage: `linear-gradient(
    180deg, 
    #F8F8F8 0%,
    #E5E5E5 35%, 
    #ECECEC 100%
  )`,
})

const PokemonLogo = styled.img({
  width: '2rem'
})

export { MainHeader }
