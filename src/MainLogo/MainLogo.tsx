import styled from "@emotion/styled"
import PokemonLogoSvg from '../assets/pokemon_logo.svg'

function MainLogo() {
  return (
    <Container>
      <PokemonLogo src={PokemonLogoSvg} alt="Pokemon logo" width={32} height={32} />
      <TextLogo>Pokeme</TextLogo>
    </Container>
  )
}

const Container = styled.h1({
  margin: 0,
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'center',
})

const PokemonLogo = styled.img({
  width: '2rem'
})

const TextLogo = styled.span({
  fontSize: '1.5rem',
})

export { MainLogo }
