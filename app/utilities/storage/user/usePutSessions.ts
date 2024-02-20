import { create } from 'zustand'

type SessionStore = {
  sessions: any
  loading: boolean
  putSessionsGlobalMemberQuota: (sessionId: string, globalMemberQuota: number) => Promise<void>
  putSessionsGLobalTitleQuota: (sessionId: string, globalTitleQuota: number) => Promise<void>
  putSessionsGlobalSupervisorQuota: (sessionId: string, globalSupervisorQuota: number) => Promise<void>
}

export const usePutSessions = create<SessionStore>((set) => ({
  sessions: {},
  loading: false,
  putSessionsGlobalMemberQuota: async (sessionId: string, globalMemberQuota: number) => {
    try {
      set({
        loading: true,
      })
      // Make your fetch API call here
      const response = await fetch('/api/v1/GLOBAL/sessions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionID: sessionId,
          globalMemberQuota: globalMemberQuota,
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

  putSessionsGLobalTitleQuota: async (sessionId: string, globalTitleQuota: number) => {
    try {
      set({
        loading: true,
      })
      // Make your fetch API call here
      const response = await fetch('/api/v1/GLOBAL/sessions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionID: sessionId,
          globalTitleQuota: globalTitleQuota,
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

  putSessionsGlobalSupervisorQuota: async (sessionId: string, globalSupervisorQuota: number) => {
    try {
      set({
        loading: true,
      })
      // Make your fetch API call here
      const response = await fetch('/api/v1/GLOBAL/sessions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionID: sessionId,
          globalSupervisorQuota: globalSupervisorQuota,
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
