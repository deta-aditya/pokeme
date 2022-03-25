import { OwnedPokemon } from "../contexts/owned-pokemons"

type LocalStorageOwnedPokemons = {
  loadFromStorage: () => Promise<OwnedPokemon[]>
  saveToStorage: (pokemons: OwnedPokemon[]) => Promise<void>
}

const localStorageKey = 'owned-pokemons'

function createLocalStorageOwnedPokemons(initialValue: OwnedPokemon[]): LocalStorageOwnedPokemons {
  const loadFromStorage = () => {
    return new Promise<OwnedPokemon[]>((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve(initialValue)
      }
  
      try {
        const value = window.localStorage.getItem(localStorageKey)
        resolve(value ? JSON.parse(value): initialValue)
      } catch (error) {
        console.error(error)
        reject(initialValue)
      }
    })
  }

  const saveToStorage = (pokemons: OwnedPokemon[]) => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve()
      }

      try {
        const jsonValue = JSON.stringify(pokemons)
        window.localStorage.setItem(localStorageKey, jsonValue)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    loadFromStorage,
    saveToStorage,
  }
}

export { createLocalStorageOwnedPokemons }
