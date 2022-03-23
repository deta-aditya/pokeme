import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CatchResultModal } from './CatchResultModal'
import { CatchButton } from './CatchButton'
import { PokemonDetailsData } from './types'

function PokemonDetail() {
  const { name } = useParams<'name'>()
  const [details, setDetails] = useState<PokemonDetailsData | null>(null)

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => ({
        name: response.data.name,
        picture: response.data.sprites.front_default,
        moves: response.data.moves.map(({ move: { name } }: { move: { name: string }}) => name),
        types: response.data.types.map(({ type: { name } }: { type: { name: string }}) => name),
      }) as unknown as PokemonDetailsData)
      .then(setDetails)
  }, [])

  return (
    <div style={{
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      height: '100vh',
    }}>
      {details !== null ? <CatchResultModal pokemon={details} /> : <></>}
      <header>
        <Link to="/">&lt; Back</Link>
      </header>
      <div style={{
        overflow: 'auto',
        flexGrow: 0,
      }}>
        <div>
          <img src={details?.picture} alt={`${name}'s picture`} />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'max-content auto',
          gap: '1rem',
        }}>
          <div>Name</div><div>{details?.name}</div>
          <div>Types</div><div>{details?.types.join(', ')}</div>
          <div>Moves</div><div>{details?.moves.join(', ')}</div>
        </div>
      </div>
      <footer style={{
        textAlign: 'center',
      }}>
        {details !== null ? <CatchButton pokemon={details} /> : <></>}
      </footer>
    </div>
  )
}

export { PokemonDetail }
