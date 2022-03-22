import { useEffect } from "react"
import { Link } from "react-router-dom"
import { usePokemonsResource } from './use-pokemons-resource'
import { useInfiniteScroll } from './use-infinite-scroll'
import { createRestAPIPokemonsList } from '../resources/pokemons-rest-api'

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
    <div 
      ref={scrollerRef}
      onScroll={onScroll}
      style={{
        overflow: 'auto',
        flexGrow: 1,
      }}
    >
      {pokemons.map(({ name }, idx) => (
        <div key={idx}>
          <Link to={`/pokemons/${name}`}>{name}</Link>
        </div>
      ))}
    </div>
  )
}

export { PokemonsInfiniteList }
