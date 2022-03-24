import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CatchResultModal } from './CatchResultModal'
import { CatchButton } from './CatchButton'
import { PokemonDetailsData } from '../resources/types'
import { createRestAPIPokemonDetails } from "../resources/pokemons-rest-api"
import styled from "@emotion/styled"
import { AppTheme, useAppTheme } from "../contexts/app-theme"
import PokemonLogoSvg from '../assets/pokemon_logo_gray.svg'
import { useScrollListener } from "../hooks/use-scroll-listener"

function PokemonDetail() {
  const { name } = useParams<'name'>()
  const [details, setDetails] = useState<PokemonDetailsData | null>(null)
  const getPokemonDetails = createRestAPIPokemonDetails('https://pokeapi.co/api/v2/pokemon/')

  const [isScrollPassed, setIsScrollPassed] = useState(false)
  const { scrollerRef, onScroll } = useScrollListener<HTMLDivElement>({ 
    pxThreshold: 250, 
    onThresholdPassed: () => {
      if (!isScrollPassed) {
        setIsScrollPassed(true)
      }
    },
    onThresholdNotPassed: () => {
      if (isScrollPassed) {
        setIsScrollPassed(false)
      }
    }
  })
  
  const theme = useAppTheme()

  useEffect(() => {
    if (name !== undefined) {
      getPokemonDetails(name).then(setDetails)
    }
  }, [])

  return (
    <PageContainer theme={theme}>
      {details !== null ? <CatchResultModal pokemon={details} /> : <></>}
      <HeaderSection theme={theme} isScrollPassed={isScrollPassed}>
        <div>
          <BackLink theme={theme} to="/">&lt; Back</BackLink>
        </div>
        <h1>{name}</h1>
        <div>&nbsp;</div>
      </HeaderSection>
      <ContentSection ref={scrollerRef} onScroll={onScroll} >
        <TopSection theme={theme}>
          <img src={details?.picture} alt={`${name}'s picture`} />
          <h1>{details?.name}</h1>
          <PokemonTypes theme={theme}>
            {details?.types.map((type, idx) => (
              <div key={idx}>{type}</div>
            ))}
          </PokemonTypes>
          <DetailsNav theme={theme}>
            <div>
              <RoundedCornerLeft theme={theme} />
              Moves
              <RoundedCornerRight theme={theme} />
            </div>
          </DetailsNav>
        </TopSection>
        <MovesSection theme={theme}>
          {details?.moves.map((move, idx) => (
            <div key={idx}>{move.replace('-', ' ')}</div>
          ))}
        </MovesSection>
      </ContentSection>
      <ButtonContainer>
        {details !== null ? <CatchButton pokemon={details} /> : <></>}
      </ButtonContainer>
    </PageContainer>
  )
}

const BackLink = styled(Link)(({ theme }: { theme: AppTheme }) => ({
  fontWeight: 'bold',
  textDecoration: 'none',
  color: theme.accentColor,
  paddingLeft: '1rem',
}))

const ContentSection = styled.div({
  overflow: 'auto',
  flexGrow: 0,
})

const PageContainer = styled.div(({ theme }: { theme: AppTheme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: theme.baseBackgroundColor,
}))

const HeaderSection = styled.header(({ theme, isScrollPassed }: { theme: AppTheme; isScrollPassed: boolean }) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '1rem 0',
  zIndex: 10,
  backgroundColor: isScrollPassed ? theme.whiteColor : 'transparent',
  transition: '0.25s',
  h1: {
    opacity: isScrollPassed ? 1 : 0,
    transition: '0.25s',
    fontSize: '1rem',
    margin: 0,
    textAlign: 'center',
  },
  '& > :not(h1)': {
    flex: 1,
  }
}))

const TopSection = styled.div(({ theme }: { theme: AppTheme }) => ({
  paddingTop: '4rem',
  backgroundColor: theme.whiteColor,
  backgroundImage: `url(${PokemonLogoSvg})`,
  backgroundSize: '250px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right -50px bottom -50px',
  textTransform: 'capitalize',
  borderBottom: `1px solid ${theme.baseBorderColor}`,
  textAlign: 'center',
  h1: {
    textTransform: 'capitalize',
    fontSize: '1.25rem',
    margin: '0.5rem 0 0',
  },
  img: {
    width: '100px',
  },
}))

const PokemonTypes = styled.div(({ theme }: { theme: AppTheme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '0.5rem',
  marginTop: '1.75rem',
  div: {
    padding: '0.375rem 0.875rem',
    border: `1px solid ${theme.baseBorderColor}`,
    borderRadius: '20px',
    textTransform: 'capitalize',
    fontSize: '0.875rem',
    backgroundColor: theme.whiteColor,
  }
}))

const DetailsNav = styled.nav(({ theme }: { theme: AppTheme }) => ({
  display: 'flex',
  margin: '2rem 0 0 1.25rem',
  '& > div': {
    color: '#000',
    position: 'relative',
    padding: '0.5rem 1.25rem',
    textDecoration: 'none',
    border: '1px solid',
    borderColor: `${theme.baseBorderColor} ${theme.baseBorderColor} transparent`,
    transform: 'translateY(1px)',
    backgroundColor: theme.baseBackgroundColor,
    borderRadius: '5px 5px 0 0',
    '::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: '-5px',
      bottom: '-1px',
      width: '5px',
      height: '5px',
      backgroundColor: theme.baseBackgroundColor,
    },
    '::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      right: '-5px',
      bottom: '-1px',
      width: '5px',
      height: '5px',
      backgroundColor: theme.baseBackgroundColor,
    },
  }
}))

const RoundedCornerLeft = styled.div(({ theme }: { theme: AppTheme }) => ({
  position: 'absolute',
  display: 'block',
  left: '-6px',
  bottom: '-1px',
  width: '5px',
  height: '5px',
  borderRadius: '0 0 5px',
  border: `solid ${theme.baseBorderColor}`,
  borderWidth: '0 1px 1px 0',
  backgroundColor: theme.whiteColor,
}))

const RoundedCornerRight = styled.div(({ theme }: { theme: AppTheme }) => ({
  position: 'absolute',
  display: 'block',
  right: '-6px',
  bottom: '-1px',
  width: '5px',
  height: '5px',
  borderRadius: '0 0 0 5px',
  border: `solid ${theme.baseBorderColor}`,
  borderWidth: '0 0 1px 1px',
  backgroundColor: theme.whiteColor,
  zIndex: 9,
}))

const MovesSection = styled.div(({ theme }: { theme: AppTheme }) => ({
  display: 'flex',
  margin: '1rem 0 4rem',
  flexDirection: 'column',
  '& > div': {
    padding: '1rem 1.25rem',
    textTransform: 'capitalize',
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.baseBorderColor}`,
    }
  },
}))

const ButtonContainer = styled.footer({
  position: 'absolute',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  bottom: '1.25rem',
})

export { PokemonDetail }
