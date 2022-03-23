type StoredOwnedPokemon = {
  name: string,
  nickname: string,
  picture: string,
}

type UseLocalStorageOwnedPokemonsParams = {
  initialValue: StoredOwnedPokemon[]
}

type UseLocalStorageOwnedPokemonsReturns = {
  loadFromStorage: () => StoredOwnedPokemon[]
  saveToStorage: (pokemons: StoredOwnedPokemon[]) => void
}

const localStorageKey = 'owned-pokemons'

function useLocalStorageOwnedPokemons({ initialValue }: UseLocalStorageOwnedPokemonsParams)
  : UseLocalStorageOwnedPokemonsReturns {
  
  const loadFromStorage = () => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const value = window.localStorage.getItem(localStorageKey)
      return value ? JSON.parse(value): initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  }

  const saveToStorage = (pokemons: StoredOwnedPokemon[]) => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      const jsonValue = JSON.stringify(pokemons)
      window.localStorage.setItem(localStorageKey, jsonValue)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    loadFromStorage,
    saveToStorage,
  }
}

export { useLocalStorageOwnedPokemons }
export type { StoredOwnedPokemon }
