import styled from "@emotion/styled"
import PokemonLogoSvg from '../assets/pokemon_logo.svg'

function MainLogo() {
  return (
    <TextLogo>
      <PokemonLogo src={PokemonLogoSvg} alt="Pokemon logo" />
      Pokeme
    </TextLogo>
  )
}

const TextLogo = styled.h1({
  margin: 0,
  display: 'flex',
  gap: '0.75rem',
  fontSize: '1.5rem',
  alignItems: 'center',
})

const PokemonLogo = styled.img({
  width: '2rem'
})

export { MainLogo }
