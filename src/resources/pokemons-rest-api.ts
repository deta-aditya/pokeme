import axios from "axios"
import { PokemonDetailsData, PokemonsResource } from "./types"

const createRestAPIPokemonsList = (url: string, limit: number) => (prevResource: PokemonsResource) => {
  const completeUrl = prevResource.next ?? `${url}?limit=${limit}`

  return axios.get(completeUrl)
    .then(response => ({
      next: response.data.next,
      pokemons: response.data.results
    }) as unknown as PokemonsResource)
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
