import styled from "@emotion/styled"
import { useState } from "react"
import { useOwnedPokemons } from "../contexts/owned-pokemons"
import { Modal, ModalButton, ModalFooter, ModalTitle } from "../Modal"

type ModalState =
  | { type: 'closed' }
  | { type: 'opened', nickname: string }

function OwnedPokemonsList() {
  const { state, dispatch } = useOwnedPokemons()
  const { pokemons } = state

  const [isOpenModal, setIsOpenModal] = useState<ModalState>({ type: 'closed' })

  return (
    <>
      <Modal
        show={isOpenModal.type === 'opened'}
        onClosed={() => setIsOpenModal({ type: 'closed' })}
      >
        <ModalContent>
          <ModalTitle>
            Are you sure you want to release {isOpenModal.type === 'opened' && isOpenModal.nickname}?
          </ModalTitle>
        </ModalContent>
        <ModalFooter>
          <ModalButton isCloseButton>
            Cancel
          </ModalButton>
          <ModalButton
            onClick={() => {
              if (isOpenModal.type === 'opened') {
                dispatch({ type: 'release', nickname: isOpenModal.nickname })
              }
              setIsOpenModal({ type: 'closed' })
            }}
          >
            Release
          </ModalButton>
        </ModalFooter>
      </Modal>
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

const ModalContent = styled.div({
  marginTop: '2rem',
  padding: '0 1rem',
})

export { OwnedPokemonsList }
