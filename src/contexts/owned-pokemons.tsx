import { createContext, Dispatch, Reducer, useContext, useEffect, useReducer } from "react";

type OwnedPokemon = {
  name: string,
  nickname: string,
  picture: string,
}

type CaughtPokemon = {
  name: string, 
  picture: string,
}

type RecentlyCaught =
  | { type: 'none' }
  | { type: 'caught', pokemon: CaughtPokemon }
  | { type: 'failed', pokemon: CaughtPokemon }

type OwnedPokemonsState = {
  pokemons: OwnedPokemon[],
  recentlyCaught: RecentlyCaught,
  isStored: boolean
}

type OwnedPokemonsAction = 
  | { type: 'try-catch', pokemon: CaughtPokemon, isCaught: boolean }
  | { type: 'cancel-caught' }
  | { type: 'save-caught', nickname: string }
  | { type: 'release', nickname: string }
  | { type: 'refresh-store', pokemons: OwnedPokemon[] }

const initialState: OwnedPokemonsState = {
  pokemons: [],
  recentlyCaught: { type: 'none' },
  isStored: true,
}

const reducer: Reducer<OwnedPokemonsState, OwnedPokemonsAction> = (state, action) => {
  switch (action.type) {
    case 'try-catch':
      return {
        ...state,
        recentlyCaught: action.isCaught 
          ? { type: 'caught', pokemon: action.pokemon }
          : { type: 'failed', pokemon: action.pokemon }
      }
    case 'save-caught':
      if (state.recentlyCaught.type === 'caught') {
        return {
          pokemons: [
            { 
              ...state.recentlyCaught.pokemon, 
              nickname: action.nickname, 
            },
            ...state.pokemons, 
          ],
          recentlyCaught: { type: 'none' },
          isStored: false,
        }
      }
      return state
    case 'cancel-caught':
      return {
        ...state,
        recentlyCaught: { type: 'none' },
      }
    case 'release':
      return {
        ...state,
        pokemons: state.pokemons.filter(pokemon => pokemon.nickname !== action.nickname),
        isStored: false,
      }
    case 'refresh-store':
      return {
        ...state,
        pokemons: action.pokemons,
        isStored: true,
      }
  }
}

type OwnedPokemons = {
  state: OwnedPokemonsState,
  dispatch: Dispatch<OwnedPokemonsAction>
}

const OwnedPokemonsContext = createContext<OwnedPokemons>({ 
  state: initialState,
  dispatch: (_) => {},
})

const useOwnedPokemons = () => useContext(OwnedPokemonsContext)

type OwnedPokemonsProviderProps = {
  children: React.ReactNode
  loadPokemons: () => Promise<OwnedPokemon[]>
  savePokemons: (pokemons: OwnedPokemon[]) => Promise<void>
}

function OwnedPokemonsProvider({ children, loadPokemons, savePokemons }: OwnedPokemonsProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    loadPokemons()
      .then(pokemons => dispatch({ type: 'refresh-store', pokemons }))
  }, [])

  useEffect(() => {
    if (state.isStored) {
      return
    }

    savePokemons(state.pokemons)
      .then(loadPokemons)
      .then(pokemons => dispatch({ type: 'refresh-store', pokemons }))
  }, [state.isStored])

  return (
    <OwnedPokemonsContext.Provider value={{state, dispatch}}>
      {children}
    </OwnedPokemonsContext.Provider>
  )
}

export { OwnedPokemonsProvider, useOwnedPokemons }
export type { OwnedPokemon }
