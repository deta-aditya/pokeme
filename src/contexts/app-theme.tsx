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
  blackColor: '#000000',
  whiteColor: '#FFFFFF',
  baseBorderColor: '#DFDFDF',
  modalBackdropColor: 'rgba(0,0,0,0.7)',
}

function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={appTheme}>
      {children}
    </ThemeProvider>
  )
}

export { AppThemeProvider }
