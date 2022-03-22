import { createContext, Dispatch, Reducer, useContext, useReducer } from "react";

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
}

type OwnedPokemonsAction = 
  | { type: 'try-catch', pokemon: CaughtPokemon, isCaught: boolean }
  | { type: 'cancel-caught' }
  | { type: 'save-caught', nickname: string }

const initialState: OwnedPokemonsState = {
  pokemons: [],
  recentlyCaught: { type: 'none' },
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
        }
      }
      return state
    case 'cancel-caught':
      return {
        ...state,
        recentlyCaught: { type: 'none' },
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
}

function OwnedPokemonsProvider({ children }: OwnedPokemonsProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <OwnedPokemonsContext.Provider value={{state, dispatch}}>
      {children}
    </OwnedPokemonsContext.Provider>
  )
}

export { OwnedPokemonsProvider, useOwnedPokemons }
export type { OwnedPokemonsState }
