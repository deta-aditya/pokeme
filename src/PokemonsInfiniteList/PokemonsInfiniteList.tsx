import { Link } from "react-router-dom"
import { usePokemonsResource } from './use-pokemons-resource'
import { createRestAPIPokemonsList } from '../resources/pokemons-rest-api'

function PokemonsInfiniteList() {
  const { scrollerRef, onScroll, pokemons } = usePokemonsResource<HTMLDivElement>({
    fetchPokemons: createRestAPIPokemonsList('https://pokeapi.co/api/v2/pokemon/', 20),
    scrollThreshold: 20,
  })

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
