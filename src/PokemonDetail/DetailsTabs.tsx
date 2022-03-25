import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"
import { TabLink } from "../TabLink"

type DetailsTabsProps = {
  className?: string
  outsideBackgroundColor: string
}

const DetailsTabs = ({ className, outsideBackgroundColor }: DetailsTabsProps) => {
  const theme = useTheme()
  return (
    <TabsContainer className={className}>
      <TabLink
        isActive 
        insideBackgroundColor={theme.baseBackgroundColor}
        outsideBackgroundColor={outsideBackgroundColor}
      >
        Moves
      </TabLink>
    </TabsContainer>
  )
}

const TabsContainer = styled.div(({ theme }) => ({
  display: 'flex',
  margin: '2rem 0 0 1rem'
}))

export { DetailsTabs }