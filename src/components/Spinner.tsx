import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native'

export default function Spinner() {
  return (
    <S.Spinner testID="spinner">
      <ActivityIndicator testID="activity-indicator" color={'grey'} size="large" />
      <S.Text>Loading...</S.Text>
    </S.Spinner>
  )
}

const S = {
  Spinner: styled.View`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Text: styled.Text`
    color: grey;
    font-family: Urbanist_Bold;
    font-size: 20px;
    margin-top: 10px;
  `
}
