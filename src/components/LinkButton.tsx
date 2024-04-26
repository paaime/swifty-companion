import styled from 'styled-components/native'
import { Link } from 'expo-router'
import { openURL } from 'expo-linking'

interface Props {
  href: string
  text: string
}

export default function LinkButton({ href, text }: Props) {
  return href.substring(0, 1) === '/' ? (
    <S.InternalLink testID="link-button" href={href}>
      <S.LinkText testID="link-button-text">{text}</S.LinkText>
    </S.InternalLink>
  ) : (
    <S.ExternalLink testID="link-button" onPress={() => openURL(href)}>
      <S.LinkText testID="link-button-text">{text}</S.LinkText>
    </S.ExternalLink>
  )
}

const S = {
  ExternalLink: styled.TouchableOpacity`
    padding: ${(p) => p.theme.size(20, 'px')} ${(p) => p.theme.size(20, 'px')};
    border-radius: ${(p) => p.theme.size(50, 'px')};
    background-color: #232627;
    z-index: -1;
    width: 100%;
  `,
  InternalLink: styled(Link)`
    padding: ${(p) => p.theme.size(10, 'px')} ${(p) => p.theme.size(20, 'px')};
    border-color: ${(p) => p.theme.highlight};
    border-width: ${(p) => p.theme.size(1, 'px')};
    border-radius: ${(p) => p.theme.size(5, 'px')};
    background-color: transparent;
  `,
  LinkText: styled.Text`
    color: white;
    font-weight: 600;
    text-align: center;
    font-size: ${(p) => p.theme.size(16, 'px')};
    font-family: Urbanist_Bold;
  `
}
