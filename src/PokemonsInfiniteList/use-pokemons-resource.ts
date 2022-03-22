import { RefObject, useEffect, useReducer, useRef } from "react"
import { PokemonListItem, PokemonsResource } from "../resources/types"

type UsePokemonsResourceParams = { 
  fetchPokemons: (prevResource: PokemonsResource) => Promise<PokemonsResource>,
  scrollThreshold: number,
}

type UsePokemonsResourceReturns<T> = { 
  scrollerRef: RefObject<T>, 
  onScroll: () => void, 
  pokemons: PokemonListItem[] 
}

type State = {
  resource: PokemonsResource
  isLoadingResource: boolean
  pokemons: PokemonListItem[]
}

type Actions = 
  | { type: 'start-loading' }
  | { type: 'done-loading', resource: PokemonsResource }

const initialState: State = {
  resource: {
    pokemons: []
  },
  isLoadingResource: false,
  pokemons: []
}

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'start-loading':
      return { 
        ...state, 
        isLoadingResource: true 
      }
    case 'done-loading':
      return {
        isLoadingResource: false,
        resource: action.resource,
        pokemons: [ ...state.pokemons, ...action.resource.pokemons ]
      }
  }
}

function usePokemonsResource<T extends HTMLElement>({ fetchPokemons, scrollThreshold }: UsePokemonsResourceParams): UsePokemonsResourceReturns<T> {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { resource, isLoadingResource, pokemons } = state

  useEffect(() => {
    fetchNextResource()
  }, [])

  const fetchNextResource = () => {
    dispatch({ type: 'start-loading' })
    fetchPokemons(resource)
      .then((resource) => {
        dispatch({ type: 'done-loading', resource })
      })
  }

  const scrollerRef = useRef<T>(null)

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

export { usePokemonsResource }
