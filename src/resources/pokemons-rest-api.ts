import axios from "axios"
import { PokemonDetailsData, PokemonListItem } from "./types"

const createRestAPIPokemonsList = (url: string) => (limit: number, offset: number) => {
  const completeUrl =`${url}?limit=${limit}&offset=${offset}`

  return axios.get(completeUrl)
    .then(response => response.data.results as unknown as PokemonListItem[])
}

const createRestAPIPokemonDetails = (url: string) => (name: string) => {
  const completeUrl = `${url}${name}`

  return axios.get(completeUrl)
    .then(response => ({
      name: response.data.name,
      picture: response.data.sprites.front_default,
      moves: response.data.moves.map(({ move: { name } }: { move: { name: string }}) => name),
      types: response.data.types.map(({ type: { name } }: { type: { name: string }}) => name),
    }) as unknown as PokemonDetailsData)
}

export { createRestAPIPokemonsList, createRestAPIPokemonDetails }
