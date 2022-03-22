import { useEffect, useReducer } from "react"
import { PokemonListItem, PokemonsResource } from "../resources/types"

type UsePokemonsResourceParams = { 
  fetchPokemons: (prevResource: PokemonsResource) => Promise<PokemonsResource>,
}

type UsePokemonsResourceReturns = { 
  pokemons: PokemonListItem[]
  fetchNextResource: () => void
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

function usePokemonsResource({ fetchPokemons }: UsePokemonsResourceParams): UsePokemonsResourceReturns {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { resource, isLoadingResource, pokemons } = state

  const fetchNextResource = () => {
    if (isLoadingResource) {
      return
    }

    dispatch({ type: 'start-loading' })
    fetchPokemons(resource)
      .then((resource) => {
        dispatch({ type: 'done-loading', resource })
      })
  }

  return {
    pokemons,
    fetchNextResource,
  }
}

export { usePokemonsResource }
