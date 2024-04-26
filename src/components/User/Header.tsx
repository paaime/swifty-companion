import { ICursus, IUser } from 'src/types/type'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import LevelBar from '../LevelBar'

export default function Header({ user, cursus }: { user: IUser; cursus: ICursus }) {
  return (
    <S.Container>
      <S.Image source={{ uri: user.image.versions.medium }} />
      <S.Name>{user.displayname}</S.Name>
      <S.Login>{user.login}</S.Login>
      {cursus && <LevelBar level={cursus.level} maxLevel={100} userLevel />}
      <S.Details>
        <S.Wrapper>
          <S.Icon name="location" size={24} color="white" />
          <S.Text>{user.campus[0].name}</S.Text>
        </S.Wrapper>
        <S.Wrapper>
          <S.Icon name="mail" size={24} color="white" />
          <S.Text>{user.email}</S.Text>
        </S.Wrapper>
        <S.Wrapper>
          <S.Icon name="call" size={24} color="white" />
          <S.Text>{user.phone}</S.Text>
        </S.Wrapper>
        <S.Wrapper>
          <S.Icon name="wallet" size={24} color="white" />
          <S.Text>{user.wallet}</S.Text>
        </S.Wrapper>
      </S.Details>
    </S.Container>
  )
}

const S = {
  Container: styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 65px;
  `,
  Image: styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 100px;
  `,
  Login: styled.Text`
    font-size: 20px;
    color: white;
    font-family: Urbanist;
    margin-bottom: 20px;
  `,
  Name: styled.Text`
    font-size: 28px;
    color: white;
    font-family: Urbanist_Bold;
    margin-top: 20px;
  `,
  Text: styled.Text`
    color: ${(p) => p.theme.primary};
    font-family: Urbanist;
    font-size: ${(p) => p.theme.size(16, 'px')};
  `,
  Wrapper: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,
  Details: styled.View`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    border-radius: 25px;
    gap: 20px;
    margin-top: 20px;
  `,
  Icon: styled(Ionicons)``
}
