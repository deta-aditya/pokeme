import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CatchResultModal } from './CatchResultModal'
import { CatchButton } from './CatchButton'
import { PokemonDetailsData } from '../resources/types'
import { createRestAPIPokemonDetails } from "../resources/pokemons-rest-api"
import styled from "@emotion/styled"
import PokemonLogoSvg from '../assets/pokemon_logo_gray.svg'
import { useScrollListener } from "../hooks/use-scroll-listener"
import { TabLink } from "../TabLink"
import { useTheme } from "@emotion/react"

function PokemonDetail() {
  const { name } = useParams<'name'>()
  const [details, setDetails] = useState<PokemonDetailsData | null>(null)
  const getPokemonDetails = createRestAPIPokemonDetails('https://pokeapi.co/api/v2/pokemon/')
  useEffect(() => {
    if (name !== undefined) {
      getPokemonDetails(name).then(setDetails)
    }
  }, [])

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

  const theme = useTheme()

  return (
    <PageContainer>
      {details !== null ? <CatchResultModal pokemon={details} /> : <></>}
      <HeaderSection isScrollPassed={isScrollPassed}>
        <div>
          <BackLink to="/">&lt; Back</BackLink>
        </div>
        <h1>{name}</h1>
        <div>&nbsp;</div>
      </HeaderSection>
      <ContentSection ref={scrollerRef} onScroll={onScroll} >
        <TopSection>
          <img src={details?.picture} alt={`${name}'s picture`} />
          <h1>{details?.name}</h1>
          <PokemonTypes>
            {details?.types.map((type, idx) => (
              <div key={idx}>{type}</div>
            ))}
          </PokemonTypes>
          <TabsContainer>
            <TabLink
              isActive 
              insideBackgroundColor={theme.baseBackgroundColor}
              outsideBackgroundColor={theme.whiteColor}
            >
              Moves
            </TabLink>
          </TabsContainer>
        </TopSection>
        <MovesSection>
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

const PageContainer = styled.div(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: theme.baseBackgroundColor,
}))

const HeaderSection = styled.header<{ isScrollPassed: boolean }>(({ theme, isScrollPassed }) => ({
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

const BackLink = styled(Link)(({ theme }) => ({
  fontWeight: 'bold',
  textDecoration: 'none',
  color: theme.accentColor,
  paddingLeft: '1rem',
}))

const ContentSection = styled.div({
  overflow: 'auto',
  flexGrow: 0,
})

const TopSection = styled.div(({ theme }) => ({
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

const PokemonTypes = styled.div(({ theme }) => ({
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

const TabsContainer = styled.div(({ theme }) => ({
  display: 'flex',
  margin: '2rem 0 0 1rem'
}))

const MovesSection = styled.div(({ theme }) => ({
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
