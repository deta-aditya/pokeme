import { CSSProperties, useEffect, useLayoutEffect } from "react"
import styled from "@emotion/styled"
import { usePokemonsResource } from './use-pokemons-resource'
import { useScrollListener } from '../hooks/use-scroll-listener'
import { createRestAPIPokemonsList } from '../resources/pokemons-rest-api'
import { PokemonCardItem } from '../PokemonCardItem'
import { capitalize } from '../utils/capitalizer'
import { onMediaQuery } from "../contexts/app-theme"
import { Theme } from "@emotion/react"

function PokemonsInfiniteList() {
  const itemsPerBatch = 20

  const { pokemons, fetchNextResource } = usePokemonsResource({
    fetchPokemons: createRestAPIPokemonsList('https://pokeapi.co/api/v2/pokemon/', itemsPerBatch),
  })

  const { scrollerRef, onScroll } = useScrollListener<HTMLDivElement>({
    pxThreshold: 20,
    fromBottom: true,
    onThresholdPassed: () => {
      fetchNextResource()
    },
  })

  useEffect(() => {
    fetchNextResource()
  }, [])

  useLayoutEffect(() => {
    if (scrollerRef.current !== null && pokemons.length > 0) {
      const { scrollHeight, clientHeight } = scrollerRef.current
      if (scrollHeight == clientHeight) {
        fetchNextResource()
      }
    }
  }, [scrollerRef, pokemons.length])

  return (
    <Scroller 
      ref={scrollerRef}
      onScroll={onScroll}
    >
      <div>
        {pokemons.map(({ name }, idx) => (
          <PokemonCardItem
            key={idx}
            to={`/pokemons/${name}`}
            pictureSrc="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"
            primaryName={capitalize(name)}
          />
        ))}
      </div>
    </Scroller>
  )
}

const Scroller = styled.div(({ theme }) => ({
  overflow: 'auto',
  flexGrow: 1,
  paddingTop: '1.875rem',
  '& > div': {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '300px',
    [onMediaQuery(theme.sm)]: {
      width: '500px',
    },
    [onMediaQuery(theme.md)]: {
      width: '700px',
    },
    [onMediaQuery(theme.lg)]: {
      width: '900px',
    },
    [onMediaQuery(theme.xl)]: {
      width: '1100px',
    },
  },
}))

export { PokemonsInfiniteList }
