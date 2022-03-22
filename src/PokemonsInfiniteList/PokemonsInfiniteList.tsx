import axios from "axios"
import { Link } from "react-router-dom"
import { RefObject, useEffect, useRef, useState } from "react"

type PokemonListItem = {
  name: string
  url: string
}

type PokemonsResource = {
  next?: string
  pokemons: PokemonListItem[]
}

function PokemonsInfiniteList() {
  const { scrollerRef, onScroll, pokemons } = usePokemonsResource<HTMLDivElement>({
    itemsLimit: 20,
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

function usePokemonsResource<T extends HTMLElement>({ itemsLimit, scrollThreshold }: { itemsLimit: number, scrollThreshold: number }): { scrollerRef: RefObject<T>, onScroll: () => void, pokemons: PokemonListItem[] } {
  const [resource, setResource] = useState<PokemonsResource>({ pokemons: [] })
  const [isLoadingResource, setIsLoadingResource] = useState(false)
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])

  const scrollerRef = useRef<T>(null)

  useEffect(() => {
    fetchNextResource()
  }, [])

  useEffect(() => {
    setPokemons(prevState => [...prevState, ...resource.pokemons])
  }, [resource])

  const fetchNextResource = () => {
    setIsLoadingResource(true)
    fetchPokemons(resource)
      .then((resource) => {
        setResource(resource)
        setIsLoadingResource(false)
      })
  }

  const fetchPokemons = (prevResource: PokemonsResource): Promise<PokemonsResource> => {
    const url = prevResource.next ?? `https://pokeapi.co/api/v2/pokemon/?limit=${itemsLimit}`

    return axios.get(url)
      .then(response => ({
        next: response.data.next,
        pokemons: response.data.results
      }) as unknown as PokemonsResource)
  }

  const onScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = (scrollerRef.current as T)
    const visibleThreshold = scrollHeight - clientHeight - scrollThreshold

    if (scrollTop >= visibleThreshold && !isLoadingResource) {
      fetchNextResource()
    }
  }

  return {
    scrollerRef,
    onScroll,
    pokemons,
  }
}

export { PokemonsInfiniteList }