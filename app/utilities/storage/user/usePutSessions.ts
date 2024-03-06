import { toast } from 'react-toastify'
import { create } from 'zustand'

type SessionStore = {
  data: any
  loading: boolean
  putSessionsGlobalMemberQuota: (sessionId: string, globalMemberQuota: number) => Promise<void>
  putSessionsGLobalTitleQuota: (sessionId: string, globalTitleQuota: number) => Promise<void>
  putSessionsGlobalSupervisorQuota: (sessionId: string, globalSupervisorQuota: number) => Promise<void>
  putSessionsGlobalFinalPresentationDate: (sessionId: string, globalSupervisorQuota: any) => Promise<void>
}

export const usePutSessions = create<SessionStore>((set) => ({
  data: {},
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

      if (response.ok) {
        // Update the state based on the fetched data
        toast.success('Succesfully update global data', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        set((state) => ({
          loading: false,
          data: data,
        }))
      } else {
        // Update the state based on the fetched data
        toast.error('Failed update global data', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
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

      if (response.ok) {
        // Update the state based on the fetched data
        toast.success('Succesfully update global data', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        set((state) => ({
          loading: false,
          data: data,
        }))
      } else {
        // Update the state based on the fetched data
        toast.error('Failed update global data', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
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

      if (response.ok) {
        // Update the state based on the fetched data
        toast.success('Succesfully update global data', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        set((state) => ({
          loading: false,
          data: data,
        }))
      } else {
        // Update the state based on the fetched data
        toast.error('Failed update global data', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
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

  putSessionsGlobalFinalPresentationDate: async (sessionId: string, finalPresentationDate: any) => {
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
          finalPresentationDate: finalPresentationDate,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Update the state based on the fetched data
        toast.success('Succesfully update global data', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        set((state) => ({
          loading: false,
          data: data,
        }))
      } else {
        // Update the state based on the fetched data
        toast.error('Failed update global data', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
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
