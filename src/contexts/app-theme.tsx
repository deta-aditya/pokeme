import { StyledComponent } from "@emotion/styled"
import { createContext, useContext } from "react"

type AppTheme = {
  baseBackgroundColor: string
  headerGradientColors: string
  accentColor: string
  blackColor: string
  whiteColor: string
  baseBorderColor: string
}

const appTheme: AppTheme = {
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
}

const AppThemeContext = createContext<AppTheme>(appTheme)

const useAppTheme = () => useContext(AppThemeContext)

const connectAppTheme = <CP, SCP, JP>(Component: StyledComponent<CP, SCP, JP>) => {
  return (props: CP & SCP & JP) => {
    const appTheme = useAppTheme()
    return <Component theme={appTheme} {...props} />
  }
}

function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppThemeContext.Provider value={appTheme}>
      {children}
    </AppThemeContext.Provider>
  )
}

export { AppThemeProvider, useAppTheme, connectAppTheme }
export type { AppTheme }
