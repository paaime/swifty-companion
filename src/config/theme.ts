import { dimensions, height, width } from 'src/utils/dimensions'

/**
 * Theme For Styled Components
 * -
 */
export const appTheme = {
  background: '#141718',
  primary: '#FFF',
  secondary: '#CCC',
  test: '#000',
  highlight: '#FF2353',
  size: dimensions,
  windowHeight: `${height}px`,
  windowWidth: `${width}px`
}

/**
 * Theme For Expo Navigation Header
 * -
 */
export const navTheme = {
  dark: false,
  colors: {
    background: appTheme.background,
    border: appTheme.secondary,
    card: appTheme.background,
    notification: appTheme.highlight,
    primary: appTheme.primary,
    text: appTheme.primary
  }
}
