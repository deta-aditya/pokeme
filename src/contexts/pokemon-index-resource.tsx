import React, { createContext, Reducer, useContext, useReducer } from "react"
import { PokemonListItem } from "../resources/types"

type PokemonIndexResourceState = {
  currentPage: number,
  isLoading: boolean
  pokemons: PokemonListItem[]
}

type PokemonIndexResourceActions = 
  | { type: 'start-loading' }
  | { type: 'done-loading', newPokemons: PokemonListItem[] }

const initialState: PokemonIndexResourceState = {
  currentPage: 1,
  isLoading: false,
  pokemons: []
}

const reducer: Reducer<PokemonIndexResourceState, PokemonIndexResourceActions> = (state, action) => {
  switch (action.type) {
    case 'start-loading':
      return { 
        ...state, 
        isLoading: true 
      }
    case 'done-loading':
      return {
        isLoading: false,
        currentPage: state.currentPage + 1,
        pokemons: [ ...state.pokemons, ...action.newPokemons ]
      }
  }
}

type PokemonIndexResource = {
  state: PokemonIndexResourceState
  fetchNextResource: () => void
}

const PokemonIndexResourceContext = createContext<PokemonIndexResource>({
  state: initialState,
  fetchNextResource: () => {},
})

export const usePokemonIndexResource = () => useContext(PokemonIndexResourceContext)

type PokemonIndexResourceProviderProps = {
  children: React.ReactNode
  limit: number
  getPokemonsList: (limit: number, offset: number) => Promise<PokemonListItem[]>
}

export function PokemonIndexResourceProvider({ children, limit, getPokemonsList }: PokemonIndexResourceProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isLoading, currentPage } = state

  const fetchNextResource = () => {
    if (isLoading) {
      return
    }

    const offset = limit * (currentPage - 1)

    dispatch({ type: 'start-loading' })
    getPokemonsList(limit, offset)
      .then((newPokemons) => {
        dispatch({ type: 'done-loading', newPokemons })
      })
  }

  const providedValue = {
    state, fetchNextResource
  }

  return (
    <PokemonIndexResourceContext.Provider value={providedValue}>
      {children}
    </PokemonIndexResourceContext.Provider>
  )
}
