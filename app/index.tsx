import styled from 'styled-components/native'
import ScreenLayout from 'src/components/ScreenLayout'
import logo from '../src/assets/images/logo.png'
import SearchDrawer from 'src/components/Home/SearchDrawer'
import { useAuthStore } from 'src/store/store'

export default function HomeScreen() {
  const { token } = useAuthStore()

  return (
    <ScreenLayout testID="home-screen-layout">
      <S.Content testID="home-screen-content">
        <S.Image source={logo} testID="home-screen-image" />
        <S.Title testID="home-screen-text">Swifty Companion</S.Title>
        <S.Description testID="home-screen-description">Find 42 students</S.Description>
        {token && <SearchDrawer />}
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
  `
}
