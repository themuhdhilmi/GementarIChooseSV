import { create } from 'zustand'

type SessionStore = {
  sessions: any
  loading: boolean
  setSessions: (sessionId: string) => Promise<void>
}

export const useSetSessions = create<SessionStore>((set) => ({
  sessions: {},
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

      // Update the state based on the fetched data
      set((state) => ({
        loading: false,
        sessions: data,
      }))
    } catch (error) {
      console.error('Error fetching data:', error)
      set({
        loading: false,
      })
    }
  },
}))
