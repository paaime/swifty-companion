import styled from 'styled-components/native'
import { useLocalSearchParams } from 'expo-router'
import ScreenLayout from 'src/components/ScreenLayout'
import { useEffect, useState } from 'react'
import { ICursus, IUser } from 'src/types/type'
import Header from 'src/components/User/Header'
import Skills from 'src/components/User/Skills'
import Projects from 'src/components/User/Projects'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'
import useAxiosPrivate from 'src/utils/axios'
import Spinner from 'src/components/Spinner'
import RNPickerSelect from 'react-native-picker-select'

export default function SecondScreen() {
  // Hooks
  const { id } = useLocalSearchParams()
  const axiosPrivate = useAxiosPrivate()
  // State
  const [loading, setLoading] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<string>('skills')
  const [user, setUser] = useState<IUser | null>(null)
  const [cursus, setCursus] = useState<ICursus>()

  const getUser = async () => {
    try {
      setLoading(true)
      const { data } = await axiosPrivate.get(`/users/${id}`)
      setUser(data)
      if (data?.cursus_users) setCursus(data.cursus_users[data.cursus_users.length - 1])
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'User not found'
      })
      router.navigate('/')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  if (loading) return <Spinner />

  if (user)
    return (
      <ScreenLayout testID="second-screen-layout">
        <S.BackButton onPress={() => router.navigate('/')}>
          <S.Icon name="left" color="white" />
        </S.BackButton>
        <S.Content showsVerticalScrollIndicator={false}>
          {cursus && <Header user={user} cursus={cursus} />}
          <S.Cursus>Cursus</S.Cursus>
          <RNPickerSelect
            style={{
              inputIOS: {
                color: 'white',
                fontFamily: 'Urbanist',
                fontSize: 16
              }
            }}
            placeholder={{ label: 'Select a cursus', value: null }}
            value={cursus?.cursus.name}
            onValueChange={(value) => setCursus(user.cursus_users.find((cursus) => cursus.cursus.name === value))}
            Icon={() => <AntDesign name="down" size={16} color="white" />}
            items={user.cursus_users.map((cursus) => {
              return { label: cursus.cursus.name, value: cursus.cursus.name }
            })}
          />
          <S.ButtonWrapper>
            <S.Button onPress={() => setActiveTab('skills')} style={activeTab === 'skills' && { backgroundColor: '#232627' }}>
              <S.ButtonText style={activeTab === 'skills' && { color: 'white' }}>Skills</S.ButtonText>
            </S.Button>
            <S.Button onPress={() => setActiveTab('projects')} style={activeTab === 'projects' && { backgroundColor: '#232627' }}>
              <S.ButtonText style={activeTab === 'projects' && { color: 'white' }}>Projects</S.ButtonText>
            </S.Button>
          </S.ButtonWrapper>
          {activeTab === 'skills' && cursus && <Skills cursus={cursus} />}
          {activeTab === 'projects' && cursus && <Projects user={user} cursus={cursus} />}
        </S.Content>
      </ScreenLayout>
    )
}

const S = {
  Content: styled.ScrollView``,
  Cursus: styled.Text`
    color: ${(p) => p.theme.primary};
    font-family: Urbanist_Semi;
    font-size: ${(p) => p.theme.size(18, 'px')};
    margin-top: ${(p) => p.theme.size(20, 'px')};
    margin-bottom: ${(p) => p.theme.size(5, 'px')};
  `,
  ButtonWrapper: styled.View`
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
    margin: 40px 0;
  `,
  Button: styled.TouchableOpacity`
    padding: ${(p) => p.theme.size(15, 'px')} ${(p) => p.theme.size(20, 'px')};
    border-radius: ${(p) => p.theme.size(50, 'px')};
    background-color: #2b2c2c;
    z-index: -1;
    width: 125px;
  `,
  ButtonText: styled.Text`
    color: #cbcbcb;
    font-weight: 600;
    text-align: center;
    font-size: ${(p) => p.theme.size(15, 'px')};
    font-family: Urbanist_Bold;
  `,
  BackButton: styled.TouchableOpacity`
    padding: ${(p) => p.theme.size(15, 'px')} ${(p) => p.theme.size(20, 'px')};
    border-radius: ${(p) => p.theme.size(18, 'px')};
    background-color: #2b2c2c;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  `,
  Icon: styled(AntDesign)``
}
