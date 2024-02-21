import { create } from 'zustand'

type SessionStore = {
  data: any
  loading: boolean
  setSessions: (sessionId: string) => Promise<void>
}

export const useSetSessions = create<SessionStore>((set) => ({
  data: {},
  loading: false,
  setSessions: async (sessionId: string) => {
    try {
      set({
        loading: true,
      })
      // Make your fetch API call here
      const response = await fetch('/api/v1/GLOBAL/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionID: sessionId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        set((state) => ({
          loading: false,
          data: data,
        }))
      } else {
        set((state) => ({
          loading: false,
        }))
      }
      // Update the state based on the fetched data
    } catch (error) {
      console.error('Error fetching data:', error)
      set({
        loading: false,
      })
    }
  },
}))
