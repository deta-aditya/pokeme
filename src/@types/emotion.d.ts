import '@emotion/react'

type AppTheme = {
  baseBackgroundColor: string
  headerGradientColors: string
  accentColor: string
  blackColor: string
  whiteColor: string
  baseBorderColor: string
}

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
