import { Theme, ThemeProvider } from "@emotion/react"

const appTheme: Theme = {
  baseBackgroundColor: '#F8F8F8',
  headerGradientColors: `linear-gradient(
    180deg, 
    #F8F8F8 0%,
    #E5E5E5 35%, 
    #ECECEC 100%
  )`,
  accentColor: '#EE5050',
  accentColorDark: '#D93D3D',
  blackColor: '#000000',
  whiteColor: '#FFFFFF',
  baseBorderColor: '#DFDFDF',
  modalBackdropColor: 'rgba(0,0,0,0.7)',
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

const onMediaQuery = (minWidth: number): string => `@media (min-width: ${minWidth}px)`

function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={appTheme}>
      {children}
    </ThemeProvider>
  )
}

export { AppThemeProvider, onMediaQuery }
