import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CatchResultModal } from './CatchResultModal'
import { CatchButton } from './CatchButton'
import styled from "@emotion/styled"
import PokemonLogoSvg from '../assets/pokemon_logo_gray.svg'
import { useScrollListener } from "../hooks/use-scroll-listener"
import { onMediaQuery } from "../contexts/app-theme"
import { DetailsTabs } from "./DetailsTabs"
import { useTheme } from "@emotion/react"
import { usePokemonDetailsResource } from "../contexts/pokemon-details-resource"
import { Image } from '../Image'
import { PokemonName } from './PokemonName'
import { PokemonTypes } from './PokemonTypes'
import { PokemonMoves } from './PokemonMoves'

function PokemonDetail() {
  const { name } = useParams<'name'>()
  const { state: { pokemon, isLoading }, fetchDetails } = usePokemonDetailsResource()
  useEffect(() => {
    if (name !== undefined) {
      fetchDetails(name)
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
  const navigate = useNavigate()

  return (
    <PageContainer>
      {pokemon !== undefined ? <CatchResultModal pokemon={pokemon} /> : <></>}
      <HeaderSection isScrollPassed={isScrollPassed}>
        <div>
          <BackLink href="/" onClick={(evt) => {
            evt.preventDefault()
            navigate(-1)
          }}>&lt; Back</BackLink>
        </div>
        <h1>{name}</h1>
        <div>&nbsp;</div>
      </HeaderSection>
      <ContentSection ref={scrollerRef} onScroll={onScroll} >
        <TopSection>
          <Image 
            src={pokemon?.picture} 
            alt={`${name}'s picture`} width={100} height={100}
            isLoading={isLoading}
          />
          <PokemonName />
          <PokemonTypes />
          <CatchButtonDesktop />
          <DetailsTabsMobile outsideBackgroundColor={theme.whiteColor} />
        </TopSection>
        <TabsSection>
          <DetailsTabsDesktop outsideBackgroundColor={'#ECECEC'} />
          <PokemonMoves />
        </TabsSection>
      </ContentSection>
      <ButtonContainer>
        <CatchButton />
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

const BackLink = styled.a(({ theme }) => ({
  fontWeight: 'bold',
  textDecoration: 'none',
  color: theme.accentColor,
  paddingLeft: '1rem',
}))

const ContentSection = styled.div(({ theme }) => ({
  overflow: 'auto',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  [onMediaQuery(theme.lg)]: {
    overflow: 'hidden',
    flexDirection: 'row',
  },
}))

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
  img: {
    width: '100px',
  },
  [onMediaQuery(theme.lg)]: {
    width: '400px',
    borderBottom: 'none',
    borderRight: `1px solid ${theme.baseBorderColor}`,
    backgroundPosition: 'right -50px top -50px',
  },
}))

const TabsSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
})

const CatchButtonDesktop = styled(CatchButton)(({ theme }) => ({
  display: 'none',
  [onMediaQuery(theme.lg)]: {
    display: 'inline-block',
    marginTop: '4rem',
  },
}))

const DetailsTabsMobile = styled(DetailsTabs)(({ theme }) => ({
  [onMediaQuery(theme.lg)]: {
    display: 'none',
  },
}))

const DetailsTabsDesktop = styled(DetailsTabs)(({ theme }) => ({
  display: 'none',
  [onMediaQuery(theme.lg)]: {
    display: 'flex',
    margin: 0,
    padding: '1rem 0 0 1rem',
    borderBottom: `1px solid ${theme.baseBorderColor}`,
    backgroundImage: theme.headerGradientColors,
  },
}))

const ButtonContainer = styled.footer(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  bottom: '1.25rem',
  [onMediaQuery(theme.lg)]: {
    display: 'none',
  }
}))

export { PokemonDetail }
