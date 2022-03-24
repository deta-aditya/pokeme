import { useEffect } from "react"
import { Link } from "react-router-dom"
import { usePokemonsResource } from './use-pokemons-resource'
import { useInfiniteScroll } from './use-infinite-scroll'
import { createRestAPIPokemonsList } from '../resources/pokemons-rest-api'
import styled from "@emotion/styled"

function PokemonsInfiniteList() {
  const { pokemons, fetchNextResource } = usePokemonsResource({
    fetchPokemons: createRestAPIPokemonsList('https://pokeapi.co/api/v2/pokemon/', 20),
  })

  const { scrollerRef, onScroll } = useInfiniteScroll<HTMLDivElement>({
    pxThreshold: 20,
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
      {pokemons.map(({ name }, idx) => (
        <PokemonListItem 
          to={`/pokemons/${name}`}
          key={idx}
        >
          {name}
        </PokemonListItem>
      ))}
    </Scroller>
  )
}

const Scroller = styled.div({
  overflow: 'auto',
  flexGrow: 1,
})

const PokemonListItem = styled(Link)({
  padding: '0.825rem 1rem',
  display: 'flex',
  alignItems: 'center',
})

export { PokemonsInfiniteList }
