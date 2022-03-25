import { createContext, Reducer, useContext, useReducer } from "react"
import { PokemonDetailsData } from "../resources/types"

type PokemonDetailsResourceState = {
  isLoading: boolean
  name?: string
  pokemon?: PokemonDetailsData
}

type PokemonDetailsResourceActions = 
  | { type: 'start-loading', name: string }
  | { type: 'done-loading', pokemon: PokemonDetailsData }

const initialState: PokemonDetailsResourceState = {
  isLoading: false,
}

const reducer: Reducer<PokemonDetailsResourceState, PokemonDetailsResourceActions> = (state, action) => {
  switch (action.type) {
    case 'start-loading':
      return { 
        ...state,
        name: action.name,
        isLoading: true,
      }
    case 'done-loading':
      return {
        isLoading: false,
        pokemon: action.pokemon,
      }
  }
}

type PokemonDetailsResource = {
  state: PokemonDetailsResourceState
  fetchDetails: (name: string) => void
}

const PokemonDetailsResourceContext = createContext<PokemonDetailsResource>({
  state: initialState,
  fetchDetails: (_) => {},
})

export const usePokemonDetailsResource = () => useContext(PokemonDetailsResourceContext)

type PokemonDetailsResourceProviderProps = {
  children: React.ReactNode
  getPokemonDetails: (name: string) => Promise<PokemonDetailsData>
}

export function PokemonDetailsResourceProvider({ children, getPokemonDetails }: PokemonDetailsResourceProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isLoading } = state

  const fetchDetails = (name: string) => {
    if (isLoading) {
      return
    }

    dispatch({ type: 'start-loading', name })
    getPokemonDetails(name)
      .then((pokemon) => {
        dispatch({ type: 'done-loading', pokemon })
      })
  }

  const providedValue = {
    state, fetchDetails,
  }

  return (
    <PokemonDetailsResourceContext.Provider value={providedValue}>
      {children}
    </PokemonDetailsResourceContext.Provider>
  )
}
