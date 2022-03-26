import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { MainLogo } from "../MainLogo"
import { PageContainer } from "../PageContainer"

function NotFound() {
  return (
    <StyledPageContainer>
      <MainLogo />
      <CodeText>404</CodeText>
      <MessageText>Page Not Found</MessageText>
      <BackLink to="/">&lt; Back to home page</BackLink>
    </StyledPageContainer>
  )
}

const StyledPageContainer = styled(PageContainer)({
  justifyContent: 'center',
  alignItems: 'center',
})

const CodeText = styled.div({
  marginTop: '2rem',
  fontSize: '2.5rem'
})

const MessageText = styled.div({
  color: '#999',
  marginTop: '0.5rem',
  fontSize: '1.125rem',
})

const BackLink = styled(Link)({
  marginTop: '0.5rem',
  fontSize: '0.875rem',
})

export { NotFound }
