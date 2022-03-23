import { useState } from "react"
import { useOwnedPokemons } from "../contexts/owned-pokemons"

type ModalState =
  | { type: 'closed' }
  | { type: 'opened', nickname: string }

function OwnedPokemonsList() {
  const { state, dispatch } = useOwnedPokemons()
  const { pokemons } = state

  const [isOpenModal, setIsOpenModal] = useState<ModalState>({ type: 'closed' })

  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: isOpenModal.type === 'opened' ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={() => {
          setIsOpenModal({ type: 'closed' })
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            textAlign: 'center',
            padding: '1rem',
          }}
          onClick={(evt) => {
            evt.stopPropagation()
          }}
        >
          <div>
            Are you sure you want to release 
            <b> {isOpenModal.type === 'opened' && isOpenModal.nickname}</b>?
          </div>
          <div>
            <button
              onClick={() => {
                if (isOpenModal.type === 'opened') {
                  dispatch({ type: 'release', nickname: isOpenModal.nickname })
                }
                setIsOpenModal({ type: 'closed' })
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setIsOpenModal({ type: 'closed' })
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          overflow: 'auto',
          flexGrow: 1,
        }}
      >
        {pokemons.map((pokemon, idx) => (
          <div
            key={idx}
            style={{
              padding: '0.825rem 1rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                marginRight: '1rem',
                backgroundImage: `url(${pokemon.picture})`,
                backgroundPosition: 'center'
              }}
            >
            </div>
            <div
              style={{
                flexGrow: 1,
              }}
            >
              <div>{pokemon.nickname}</div>
              <div style={{
                fontSize: '0.825rem',
              }}>
                {pokemon.name}
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpenModal({
                  type: 'opened',
                  nickname: pokemon.nickname,
                })
              }}
            >
              Release
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export { OwnedPokemonsList }
