import 'expo-dev-client'
import { ThemeProvider as NavProvider } from '@react-navigation/native'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider, type DefaultTheme } from 'styled-components/native'
import { appTheme, navTheme } from 'src/config/theme'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useFonts } from 'expo-font'
import { Urbanist_400Regular, Urbanist_700Bold, Urbanist_600SemiBold } from '@expo-google-fonts/urbanist'
import Toast from 'react-native-toast-message'
import { useAuthStore } from 'src/store/store'

export default function AppLayout() {
  const { checkValidToken } = useAuthStore()
  const [fontsLoaded] = useFonts({
    Urbanist: Urbanist_400Regular,
    Urbanist_Bold: Urbanist_700Bold,
    Urbanist_Semi: Urbanist_600SemiBold
  })

  useEffect(() => {
    checkValidToken()
  }, [])

  if (!fontsLoaded) return null

  return (
    <ThemeProvider theme={appTheme as DefaultTheme}>
      <StatusBar style="light" />
      <GestureHandlerRootView style={{ flex: 1, padding: 20, backgroundColor: appTheme.background }}>
        <BottomSheetModalProvider>
          <NavProvider value={navTheme}>
            <Slot screenOptions={{ headerShown: false }} />
          </NavProvider>
          <Toast topOffset={65} />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}
