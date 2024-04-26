import styled from 'styled-components/native'
import LinkButton from 'src/components/LinkButton'
import ScreenLayout from 'src/components/ScreenLayout'
import logo from '../src/assets/images/logo.png'
import * as Linking from 'expo-linking'
import { useEffect } from 'react'
import SearchDrawer from 'src/components/Home/SearchDrawer'
import Toast from 'react-native-toast-message'
import { useAuthStore } from 'src/store/store'

export default function HomeScreen() {
  const { token, signIn, signOut } = useAuthStore()

  useEffect(() => {
    const handleUrlChange = async (event: { url: string }) => {
      const { queryParams } = Linking.parse(event.url)
      if (queryParams?.code) {
        try {
          await signIn(queryParams.code as string)
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to sign in'
          })
        }
      }
    }

    // Add event listener for URL changes
    Linking.addEventListener('url', handleUrlChange)
  }, [])

  return (
    <ScreenLayout testID="home-screen-layout">
      <S.Content testID="home-screen-content">
        <S.Image source={logo} testID="home-screen-image" />
        <S.Title testID="home-screen-text">Swifty Companion</S.Title>
        <S.Description testID="home-screen-description">Find 42 students</S.Description>
        <S.Text>{JSON.stringify(token)}</S.Text>
        {token ? (
          <>
            <SearchDrawer />
            <S.LogoutButton onPress={signOut}>
              <S.LogoutText>Sign out</S.LogoutText>
            </S.LogoutButton>
          </>
        ) : (
          <LinkButton href={process.env.EXPO_PUBLIC_AUTH_URL as string} text="Login with 42" />
        )}
      </S.Content>
    </ScreenLayout>
  )
}

const S = {
  Content: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: ${(p) => p.theme.size(10, 'px')};
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.primary};
    font-family: Urbanist_Bold;
    text-align: center;
    font-size: ${(p) => p.theme.size(38, 'px')};
  `,
  Description: styled.Text`
    color: ${(p) => p.theme.primary};
    font-family: Urbanist;
    text-align: center;
    font-size: ${(p) => p.theme.size(20, 'px')};
    margin-bottom: ${(p) => p.theme.size(15, 'px')};
  `,
  Text: styled.Text`
    color: ${(p) => p.theme.primary};
    font-family: helvetica;
    font-weight: 700;
    font-size: ${(p) => p.theme.size(15, 'px')};
    margin-bottom: ${(p) => p.theme.size(15, 'px')};
  `,
  Image: styled.Image`
    height: ${(p) => p.theme.size(75, 'px')};
    width: ${(p) => p.theme.size(100, 'px')};
  `,
  SearchButton: styled.TouchableOpacity`
    padding: ${(p) => p.theme.size(10, 'px')} ${(p) => p.theme.size(20, 'px')};
    border-radius: ${(p) => p.theme.size(5, 'px')};
    background-color: white;
  `,
  ButtonText: styled.Text`
    color: black;
    font-weight: 600;
  `,
  LogoutButton: styled.TouchableOpacity`
    padding: ${(p) => p.theme.size(20, 'px')} ${(p) => p.theme.size(20, 'px')};
    border-radius: ${(p) => p.theme.size(50, 'px')};
    background-color: #232627;
    z-index: -1;
    width: 100%;
  `,
  LogoutText: styled.Text`
    font-family: Urbanist_Bold;
    color: white;
    font-weight: 600;
    text-align: center;
    font-size: ${(p) => p.theme.size(16, 'px')};
  `
}
