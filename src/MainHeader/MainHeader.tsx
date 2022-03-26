import styled from "@emotion/styled"
import { MainLogo } from "../MainLogo"
import { onMediaQuery } from "../contexts/app-theme"
import { NavBar } from "../NavBar"

function MainHeader() {
  return (
    <Header>
      <div>
        <MainLogo />
        <NavBar />
      </div>
    </Header>
  )
}

const Header = styled.header(({ theme }) => ({
  padding: '2rem 1.25rem 0',
  borderBottom: `1px solid ${theme.baseBorderColor}`,
  backgroundImage: theme.headerGradientColors,
  flexGrow: 0,
  '& > div': {
    margin: 'auto',
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

export { MainHeader }
