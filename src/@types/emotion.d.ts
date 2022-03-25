import '@emotion/react'

type AppTheme = {
  baseBackgroundColor: string
  headerGradientColors: string
  accentColor: string
  accentColorDark: string
  blackColor: string
  whiteColor: string
  baseBorderColor: string
  modalBackdropColor: string
  sm: number
  md: number
  lg: number
  xl: number
}

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
