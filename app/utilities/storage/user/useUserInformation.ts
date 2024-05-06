import { create } from 'zustand'

type UseStore = {
  data: any
  isLoggedIn: boolean
  name: string
  email: string
  role: string
  image: string
  loading: boolean
  fetchData: () => Promise<void>
}

export const useUserInformation = create<UseStore>((set) => ({
  data: {},
  isLoggedIn: false,
  name: 'Guest',
  email: '',
  role: 'GUEST',
  image: '',
  loading: false,
  bearerSessionKey: '',
  fetchData: async () => {
    try {
      set({
        loading: true,
      })
      const response = await fetch('/api/v1/AUTH/global/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          cache : "no-store"
        },
      })
      const data = await response.json()

      // Update the state based on the fetched data
      if (response.ok) {
        set((state) => ({
          data: data,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          image: data.user.image ?? '',
        }))
        set({
          isLoggedIn: true,
          loading: false,
        })
      } else {
        set({
          isLoggedIn: false,
          loading: false,
        })
        set((state) => ({
          name: 'Guest',
          email: '',
          role: 'GUEST',
          image: '',
        }))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      set({
        isLoggedIn: false,
      })
      set({
        loading: false,
      })
    }
  },
}))
