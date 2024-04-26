import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import { IUserSearch } from 'src/types/type'
import { useRouter } from 'expo-router'
import useAxiosPrivate from 'src/utils/axios'
import Toast from 'react-native-toast-message'

const ResultCard = ({ user }: { user: IUserSearch }) => {
  const router = useRouter()
  return (
    <Results.Card onPress={() => router.navigate(`user/${user.id}`)}>
      <Results.Image source={{ uri: user.image.versions.medium }} />
      <Results.Info>
        <Results.Login>{user.login}</Results.Login>
        <Results.Name>{user.displayname}</Results.Name>
      </Results.Info>
      <Results.Date>{user.pool_year}</Results.Date>
    </Results.Card>
  )
}

export default function SearchDrawer() {
  const axiosPrivate = useAxiosPrivate()
  const [input, setInput] = useState<string>('')
  const [users, setUsers] = useState<IUserSearch[]>([])
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = useMemo(() => ['25%', '80%'], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleSearchUser = async () => {
    try {
      if (!input) return
      const { data } = await axiosPrivate.get(`/users?filter[login]=${input}`)
      setUsers(data)
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to search user'
      })
    }
  }

  return (
    <View style={{ width: '100%' }}>
      <S.SearchButton onPress={handlePresentModalPress}>
        <S.ButtonText>Search</S.ButtonText>
      </S.SearchButton>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        style={{ zIndex: 10 }}
        backgroundStyle={{ backgroundColor: '#232627' }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}>
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: 'center',
            padding: 16
          }}>
          <S.Text>Search user</S.Text>
          <S.Description>Search for a 42 student</S.Description>
          <SearchBar.Container>
            <SearchBar.Icon name="search" size={24} color="white" />
            <SearchBar.Input
              placeholder="Search"
              placeholderTextColor={'white'}
              value={input}
              onChangeText={(input) => setInput(input)}
              onSubmitEditing={handleSearchUser}
              autoCapitalize="none"
            />
          </SearchBar.Container>
          <Results.Container>{users?.map((user, index) => <ResultCard user={user} key={index} />)}</Results.Container>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
}

const S = {
  Text: styled.Text`
    font-size: 24px;
    font-weight: 600;
    color: white;
    font-family: Urbanist_Bold;
  `,
  Description: styled.Text`
    color: ${(p) => p.theme.primary};
    font-family: Urbanist;
    text-align: center;
    font-size: ${(p) => p.theme.size(16, 'px')};
    margin-top: ${(p) => p.theme.size(5, 'px')};
  `,
  SearchButton: styled.TouchableOpacity`
    padding: ${(p) => p.theme.size(20, 'px')} ${(p) => p.theme.size(20, 'px')};
    border-radius: ${(p) => p.theme.size(50, 'px')};
    background-color: white;
    z-index: -1;
    width: 100%;
  `,
  ButtonText: styled.Text`
    color: black;
    font-weight: 600;
    text-align: center;
    font-size: ${(p) => p.theme.size(16, 'px')};
    font-family: Urbanist_Bold;
  `,
  SearchBarContainer: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `
}

const SearchBar = {
  Container: styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #232627;
    border: 1px solid #676767;
    padding: 8px;
    border-radius: 8px;
    margin-top: 16px;
  `,
  Input: styled.TextInput`
    flex: 1;
    padding: 0 8px;
    color: white;
    font-family: Urbanist;
  `,
  Icon: styled(Ionicons)`
    margin-right: 8px;
  `
}

const Results = {
  Container: styled.ScrollView`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 16px;
  `,
  Card: styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding: 16px;
    width: 100%;
  `,
  Login: styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: white;
    font-family: Urbanist_Bold;
  `,
  Name: styled.Text`
    font-size: 16px;
    color: white;
    font-family: Urbanist;
  `,
  Date: styled.Text`
    font-size: 16px;
    color: grey;
    margin-left: auto;
    font-family: Urbanist;
  `,
  Image: styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
  `,
  Info: styled.View`
    display: flex;
    flex-direction: column;
  `
}
