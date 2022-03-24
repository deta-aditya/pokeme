import { useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import PokemonLogoSvg from '../assets/pokemon_logo_gray.svg'
import { usePokemonsResource } from './use-pokemons-resource'
import { useScrollListener } from '../hooks/use-scroll-listener'
import { createRestAPIPokemonsList } from '../resources/pokemons-rest-api'

function PokemonsInfiniteList() {
  const { pokemons, fetchNextResource } = usePokemonsResource({
    fetchPokemons: createRestAPIPokemonsList('https://pokeapi.co/api/v2/pokemon/', 20),
  })

  const { scrollerRef, onScroll } = useScrollListener<HTMLDivElement>({
    pxThreshold: 20,
    fromBottom: true,
    onThresholdPassed: fetchNextResource,
  })

  useEffect(() => {
    fetchNextResource()
  }, [])

  return (
    <Scroller 
      ref={scrollerRef}
      onScroll={onScroll}
    >
      <div>
        {pokemons.map(({ name }, idx) => (
          <PokemonListItem 
            to={`/pokemons/${name}`}
            key={idx}
          >
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png" alt={`${name}'s picture`} />
            <span>{name}</span>
          </PokemonListItem>
        ))}
      </div>
    </Scroller>
  )
}

const Scroller = styled.div({
  overflow: 'auto',
  flexGrow: 1,
  paddingTop: '1.875rem',
  '& > div': {
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    width: '300px', // adjust with breakpoint later
  },
})

const PokemonListItem = styled(Link)(({ theme }) => ({
  width: '135px',
  height: '135px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.baseBorderColor}`,
  borderRadius: '10px',
  margin: '0 0.75rem 0.75rem 0',
  textDecoration: 'none',
  color: theme.blackColor,
  fontWeight: 'bold',
  gap: '4px',
  backgroundColor: theme.whiteColor,
  backgroundImage: `url(${PokemonLogoSvg})`,
  backgroundSize: '125px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '45px 45px',
  boxShadow: '0px 2px 3px 0px #e0e0e0',
  textTransform: 'capitalize',
  img: {
    width: '75px',
  }
}))

export { PokemonsInfiniteList }
