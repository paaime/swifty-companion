import axios from 'axios'
import { IToken } from 'src/types/type'
import { getItem, setItem } from 'src/utils/secureStore'
import { create } from 'zustand'

type AuthStore = {
  token: IToken
  setToken: (token: IToken) => void
  signIn: (code: string) => Promise<void>
  signOut: () => Promise<void>
  checkValidToken: () => Promise<void>
  refreshToken: () => Promise<string | false>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: {} as IToken,
  setToken: (token: IToken) => set({ token }),
  signIn: async (code: string) => {
    try {
      const { data } = await axios.post('https://api.intra.42.fr/oauth/token', {
        grant_type: 'authorization_code',
        client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
        client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.EXPO_PUBLIC_REDIRECT_URI
      })
      await setItem('token', JSON.stringify(data))
      set({ token: data })
    } catch (err) {
      set({ token: undefined })
      await setItem('token', '')
    }
  },
  signOut: async () => {
    set({ token: undefined })
    await setItem('token', '')
  },
  checkValidToken: async () => {
    try {
      const token: IToken = JSON.parse((await getItem('token')) as string)
      if (token) {
        // check if token is still valid
        const now = Math.floor(new Date().getTime() / 1000)
        if (now < token.created_at + token.expires_in * 1000) {
          // token is still valid
          set({ token })
        } else {
          // refresh token
          const { data } = await axios.post('https://api.intra.42.fr/oauth/token', {
            grant_type: 'refresh_token',
            client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
            client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
            refresh_token: token.refresh_token
          })
          await setItem('token', JSON.stringify(data))
          set({ token: data })
        }
      }
    } catch (err) {
      set({ token: undefined })
      await setItem('token', '')
    }
  },
  refreshToken: async () => {
    try {
      const token = get().token
      const { data } = await axios.post('https://api.intra.42.fr/oauth/token', {
        grant_type: 'refresh_token',
        client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
        client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
        refresh_token: token.refresh_token
      })
      set({ token: data })
      await setItem('token', JSON.stringify(data))
      return data.access_token
    } catch (err) {
      set({ token: undefined })
      await setItem('token', '')
    }
  }
}))
