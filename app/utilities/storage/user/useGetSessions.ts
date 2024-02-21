import { create } from 'zustand'

type SessionStore = {
  data: any
  loading: boolean
  fetchData: () => Promise<void>
}

export const useGetsessions = create<SessionStore>((set) => ({
  data: {},
  loading: false,
  fetchData: async () => {
    try {
      set({
        loading: true,
      })
      // Make your fetch API call here
      const response = await fetch('/api/v1/GLOBAL/sessions')
      const data = await response.json()

      if (response.ok) {
        // Update the state based on the fetched data
        set((state) => ({
          loading: false,
          data: data,
        }))
      } else {
        // Update the state based on the fetched data
        set((state) => ({
          loading: false,
        }))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      set({
        loading: false,
      })
    }
  },
}))
