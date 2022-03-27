import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import PokemonLogoSvg from '../assets/pokemon_logo_gray.svg'
import { Image } from '../Image'

type PokemonCardItem = {
  to?: string
  pictureSrc: string
  primaryName: string
  secondaryName?: string
  onRelease?: () => void
}

function PokemonCardItem({ to, pictureSrc, primaryName, secondaryName, onRelease }: PokemonCardItem) {
  if (to !== undefined) {
    return (
      <CardContainer>
        {onRelease && <ReleaseButton onClick={onRelease}>&times;</ReleaseButton>}
        <StyledLink to={to}>
          <Image src={pictureSrc} alt={`${primaryName}'s picture`} width={75} height={75} />
          <PrimaryName>{primaryName}</PrimaryName>
          {secondaryName && <SecondaryName>{secondaryName}</SecondaryName>}
        </StyledLink>
      </CardContainer>
    )
  }

  return (
    <CardContainer>
      {onRelease && <ReleaseButton onClick={onRelease}>&times;</ReleaseButton>}
      <Image src={pictureSrc} alt={`${primaryName}'s picture`} />
      <PrimaryName>{primaryName}</PrimaryName>
      {secondaryName && <SecondaryName>{secondaryName}</SecondaryName>}
    </CardContainer>
  )
}

const CardContainer = styled.div(({ theme }) => ({
  width: '135px',
  height: '135px',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'center',
  border: `1px solid ${theme.baseBorderColor}`,
  borderRadius: '10px',
  margin: '0 0.75rem 0.75rem 0',
  color: theme.blackColor,
  gap: '4px',
  backgroundColor: theme.whiteColor,
  backgroundImage: `url(${PokemonLogoSvg})`,
  backgroundSize: '125px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '45px 45px',
  boxShadow: '0px 2px 3px 0px #e0e0e0',
}))

const ReleaseButton = styled.button(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: theme.accentColor,
  position: 'absolute',
  top: 0,
  right: 0,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
}))

const PrimaryName = styled.div({
  fontWeight: 'bold',
})

const SecondaryName = styled.div({
  fontSize: '0.875rem',
})

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  color: theme.blackColor,
  alignItems: 'center',
  justifyContent: 'center',
}))

export { PokemonCardItem }
