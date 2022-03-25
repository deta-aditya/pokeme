import styled from "@emotion/styled"

const PageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}, ({ theme }) => ({
  backgroundColor: theme.baseBackgroundColor,
}))

export { PageContainer }
