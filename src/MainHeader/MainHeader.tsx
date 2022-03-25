import styled from "@emotion/styled"
import PokemonLogoSvg from '../assets/pokemon_logo.svg'
import { onMediaQuery } from "../contexts/app-theme"
import { NavBar } from "../NavBar"

function MainHeader() {
  return (
    <Header>
      <div>
        <h1>
          <PokemonLogo src={PokemonLogoSvg} alt="Pokemon logo" />
          Pokeme
        </h1>
        <NavBar />
      </div>
    </Header>
  )
}

const Header = styled.header(({ theme }) => ({
  padding: '2rem 1.25rem 0',
  borderBottom: `1px solid ${theme.baseBorderColor}`,
  backgroundImage: theme.headerGradientColors,
  flexGrow: 0,
  h1: {
    margin: 0,
    display: 'flex',
    gap: '0.75rem',
    fontSize: '1.5rem',
    alignItems: 'center',
  },
  '& > div': {
    margin: 'auto',
    width: '300px',
    [onMediaQuery(theme.sm)]: {
      width: '500px',
    },
    [onMediaQuery(theme.md)]: {
      width: '700px',
    },
    [onMediaQuery(theme.lg)]: {
      width: '900px',
    },
    [onMediaQuery(theme.xl)]: {
      width: '1100px',
    },
  },
}))

const PokemonLogo = styled.img({
  width: '2rem'
})

export { MainHeader }
