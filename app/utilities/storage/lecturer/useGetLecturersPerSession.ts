import { create } from 'zustand'

type LecturerStore = {
  lecturers: any
  loading: boolean
  fetchData: (sessionId: string) => Promise<void>
}

export const useGetLecturersPerSession = create<LecturerStore>((set) => ({
  lecturers: {},
  loading: false,
  fetchData: async (sessionId: string) => {
    try {
      set({
        loading: true,
      })
      // Make your fetch API call here
      const response = await fetch(`/api/v1/AUTH/manageUser/lecturer?email=lecturerfaizul@example.com&selection=SESSION&sessionID=${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          cache : "no-store"
        },
      })
      const data = await response.json()
      // Update the state based on the fetched data
      set((state) => ({
        lecturers: data, // Adjust this based on your API response structure
        loading: false,
      }))
    } catch (error) {
      console.error('Error fetching data:', error)
      set({
        loading: false,
      })
    }
  },
}))
