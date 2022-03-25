import { useEffect, useLayoutEffect } from "react"
import styled from "@emotion/styled"
import { useScrollListener } from '../hooks/use-scroll-listener'
import { PokemonCardItem } from '../PokemonCardItem'
import { capitalize } from '../utils/capitalizer'
import { onMediaQuery } from "../contexts/app-theme"
import { usePokemonIndexResource } from "../contexts/pokemon-index-resource"

function PokemonsInfiniteList() {
  const { state: { pokemons }, fetchNextResource } = usePokemonIndexResource()

  const { scrollerRef, onScroll } = useScrollListener<HTMLDivElement>({
    pxThreshold: 20,
    fromBottom: true,
    onThresholdPassed: () => {
      fetchNextResource()
    },
  })

  useEffect(() => {
    if (pokemons.length === 0) {
      fetchNextResource()
    }
  }, [pokemons.length])

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
        {pokemons.map(({ name, image }, idx) => (
          <PokemonCardItem
            key={idx}
            to={`/pokemons/${name}`}
            pictureSrc={image}
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
