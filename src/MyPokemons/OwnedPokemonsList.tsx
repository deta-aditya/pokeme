import styled from "@emotion/styled"
import { useState } from "react"
import { onMediaQuery } from "../contexts/app-theme"
import { useOwnedPokemons } from "../contexts/owned-pokemons"
import { Modal, ModalButton, ModalFooter, ModalTitle } from "../Modal"
import { PokemonCardItem } from "../PokemonCardItem"
import { capitalize } from "../utils/capitalizer"

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
      <Scroller>
        <div>
          {pokemons.map((pokemon, idx) => (
            <PokemonCardItem
              key={idx}
              pictureSrc={pokemon.picture}
              primaryName={pokemon.nickname}
              secondaryName={capitalize(pokemon.name)}
              onRelease={() => setIsOpenModal({
                type: 'opened',
                nickname: pokemon.nickname,
              })}
            />
            // <div
            //   key={idx}
            //   style={{
            //     padding: '0.825rem 1rem',
            //     display: 'flex',
            //     alignItems: 'center',
            //   }}
            // >
            //   <div
            //     style={{
            //       width: '50px',
            //       height: '50px',
            //       marginRight: '1rem',
            //       backgroundImage: `url(${pokemon.picture})`,
            //       backgroundPosition: 'center'
            //     }}
            //   >
            //   </div>
            //   <div
            //     style={{
            //       flexGrow: 1,
            //     }}
            //   >
            //     <div>{pokemon.nickname}</div>
            //     <div style={{
            //       fontSize: '0.825rem',
            //     }}>
            //       {pokemon.name}
            //     </div>
            //   </div>
            //   <button
            //     onClick={() => {
            //       setIsOpenModal({
            //         type: 'opened',
            //         nickname: pokemon.nickname,
            //       })
            //     }}
            //   >
            //     Release
            //   </button>
            // </div>
          ))}
        </div>
      </Scroller>
    </>
  )
}

const ModalContent = styled.div({
  marginTop: '2rem',
  padding: '0 1rem',
})

const Scroller = styled.div(({ theme }) => ({
  overflow: 'auto',
  flexGrow: 1,
  padding: '1.875rem 0 1.875rem',
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

export { OwnedPokemonsList }
