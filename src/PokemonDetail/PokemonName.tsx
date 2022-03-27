import styled from "@emotion/styled";
import { usePokemonDetailsResource } from "../contexts/pokemon-details-resource"

type StandardHeadingProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

function PokemonName(props: StandardHeadingProps) {
  const { state: { isLoading, pokemon } } = usePokemonDetailsResource()

  return (
    <>
      <Loading show={isLoading}>
        <div></div>
      </Loading>
      <LoadedContent {...props} show={!isLoading}>
        {pokemon?.name}
      </LoadedContent>
    </>
  )
}

type Showable = { show: boolean }

const LoadedContent = styled.h1<Showable>(({ show }) => ({
  textTransform: 'capitalize',
  fontSize: '1.25rem',
  margin: '0.5rem 0 0',
  display: show ? 'block' : 'none',
}))

const Loading = styled.div<Showable>(({ show }) => ({
  display: show ? 'flex' : 'none',
  margin: '0.5rem 0 0',
  justifyContent: 'center',
  div: {
    width: `100px`,
    height: `24px`,
    position: 'relative',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    '::before': {
      content: '""',
      position: 'absolute',
      width: `100px`,
      height:`24px`,
      background: 'linear-gradient(to right, transparent 0%, #dedede 50%, transparent 100%)',
      animation: 'slide 1s ease infinite',
      '@keyframes slide': {
        from: {
          left: `-100px`,
        },
        to: {
          left: '100%',
        }
      },
    }
  },
}))

export { PokemonName }
