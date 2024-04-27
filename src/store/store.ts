import axios from 'axios'
import Toast from 'react-native-toast-message'
import { IToken } from 'src/types/type'
import { setItem } from 'src/utils/secureStore'
import { create } from 'zustand'

type AuthStore = {
  token: IToken
  setToken: (token: IToken) => void
  signIn: () => Promise<void>
  refreshToken: () => Promise<string | false>
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: {} as IToken,
  setToken: (token: IToken) => set({ token }),
  signIn: async () => {
    try {
      const { data } = await axios.post('https://api.intra.42.fr/oauth/token', {
        grant_type: 'client_credentials',
        client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
        client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
      })
      await setItem('token', JSON.stringify(data))
      set({ token: data })
    } catch (err) {
      set({ token: undefined })
      await setItem('token', '')
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to connect to 42 API.'
      })
    }
  },
  refreshToken: async () => {
    try {
      const { data } = await axios.post('https://api.intra.42.fr/oauth/token', {
        grant_type: 'client_credentials',
        client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
        client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
      })
      set({ token: data })
      await setItem('token', JSON.stringify(data))
      return data.access_token
    } catch (err) {
      set({ token: undefined })
      await setItem('token', '')
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to connect to 42 API.'
      })
    }
  }
}))
