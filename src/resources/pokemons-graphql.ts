import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { PokemonDetailsData, PokemonListItem } from "./types";

export const newGraphQLPokemonsResource = (uri: string) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri,
  }) 

  const getPokemonsList = (limit: number, offset: number) => {
    return client.query({
      query: gql`
        query pokemons($limit: Int, $offset: Int) {
          pokemons(limit: $limit, offset: $offset) {
            results {
              name
              image
            }
          }
        }
      `,
      variables: {
        limit, offset,
      }
    }).then(response => response.data.pokemons.results as unknown as PokemonListItem[])
  }

  const getPokemonDetails = (name: string) => {
    return client.query({
      query: gql`
        query pokemon($name: String!) {
          pokemon(name: $name) {
            id
            name
            message
            sprites {
              front_default
            }
            moves {
              move {
                name
              }
            }
            types {
              type {
                name
              }
            }
          }
        }
      `,
      variables: {
        name,
      }
    }).then(response => {
        if (response.data.hasOwnProperty('errors')) {
          const has404Error = response.data.errors
            .map((error: { message: string }) => error.message)
            .some((message: string) => message.includes('404'))

          if (has404Error) {
            return Promise.reject({
              status: 404,
              message: 'not found'
            })
          }

          return Promise.reject({
            status: 500,
            message: 'internal error',
          })
        }

        return {
          name: response.data.pokemon.name,
          picture: response.data.pokemon.sprites.front_default,
          moves: response.data.pokemon.moves.map(({ move: { name } }: { move: { name: string }}) => name),
          types: response.data.pokemon.types.map(({ type: { name } }: { type: { name: string }}) => name),
        } as unknown as PokemonDetailsData
      })
  }

  return {
    getPokemonsList,
    getPokemonDetails,
  }
}
