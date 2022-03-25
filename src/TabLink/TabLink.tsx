import { Interpolation, Theme } from "@emotion/react"
import styled, { StyledComponent } from "@emotion/styled"
import { Link, LinkProps } from "react-router-dom"

type TabLinkProps = {
  to?: string
  isActive: boolean
  outsideBackgroundColor: string
  insideBackgroundColor: string
  children: React.ReactNode
}

function TabLink({ children, to, ...props}: TabLinkProps) {
  if (to !== undefined) {
    return (
      <LinkContainer to={to}>
        <PlainContainer {...props}>
          <RoundedCornerLeft {...props} />
          {children}
          <RoundedCornerRight {...props} />
        </PlainContainer>
      </LinkContainer>
    )
  }

  return (
    <PlainContainer {...props}>
      <RoundedCornerLeft {...props} />
      {children}
      <RoundedCornerRight {...props} />
    </PlainContainer>
  )
}

type PropsForStyling = Omit<TabLinkProps, 'children' | 'to'>

const PlainContainer = styled.div<PropsForStyling>(({ isActive, insideBackgroundColor, theme }) => ({
  color: '#000',
  position: 'relative',
  padding: '0.5rem 1.25rem',
  textDecoration: 'none',
  border: '1px solid',
  borderColor: isActive 
    ? `${theme.baseBorderColor} ${theme.baseBorderColor} transparent` 
    : `transparent transparent ${theme.baseBorderColor}`,
  transform: 'translateY(1px)',
  backgroundColor: isActive ? insideBackgroundColor : '',
  borderRadius: '5px 5px 0 0',
  '::before': {
    content: '""',
    display: isActive ? 'block' : 'none',
    position: 'absolute',
    left: '-5px',
    bottom: '-1px',
    width: '5px',
    height: '5px',
    backgroundColor: insideBackgroundColor,
  },
  '::after': {
    content: '""',
    display: isActive ? 'block' : 'none',
    position: 'absolute',
    right: '-5px',
    bottom: '-1px',
    width: '5px',
    height: '5px',
    backgroundColor: insideBackgroundColor,
  },
}))

const LinkContainer = styled(Link)({
  position: 'relative',
  textDecoration: 'none',
})

const RoundedCornerLeft = styled.div<PropsForStyling>(({ isActive, outsideBackgroundColor, theme }) => ({
  position: 'absolute',
  display: isActive ? 'block' : 'none',
  left: '-6px',
  bottom: '-1px',
  width: '5px',
  height: '5px',
  borderRadius: '0 0 5px',
  border: `solid ${theme.baseBorderColor}`,
  borderWidth: '0 1px 1px 0',
  backgroundColor: outsideBackgroundColor,
}))

const RoundedCornerRight = styled.div<PropsForStyling>(({ isActive, outsideBackgroundColor, theme }) => ({
  position: 'absolute',
  display: isActive ? 'block' : 'none',
  right: '-6px',
  bottom: '-1px',
  width: '5px',
  height: '5px',
  borderRadius: '0 0 0 5px',
  border: `solid ${theme.baseBorderColor}`,
  borderWidth: '0 0 1px 1px',
  backgroundColor: outsideBackgroundColor,
  zIndex: 9,
}))

export { TabLink }
