import axios from "axios"
import { PokemonsResource } from "./types"

const createRestAPIPokemonsList = (url: string, limit: number) => (prevResource: PokemonsResource) => {
  const completeUrl = prevResource.next ?? `${url}?limit=${limit}`

  return axios.get(completeUrl)
    .then(response => ({
      next: response.data.next,
      pokemons: response.data.results
    }) as unknown as PokemonsResource)
}

export { createRestAPIPokemonsList }
