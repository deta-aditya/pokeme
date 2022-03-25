import { useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import PokemonLogoSvg from '../assets/pokemon_logo_gray.svg'
import { usePokemonsResource } from './use-pokemons-resource'
import { useScrollListener } from '../hooks/use-scroll-listener'
import { createRestAPIPokemonsList } from '../resources/pokemons-rest-api'
import { PokemonCardItem } from '../PokemonCardItem'
import { capitalize } from '../utils/capitalizer'

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
          <PokemonCardItem
            key={idx}
            to={`/pokemons/${name}`}
            pictureSrc="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"
            primaryName={capitalize(name)}
          />
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

export { PokemonsInfiniteList }
