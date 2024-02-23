import { create } from 'zustand'

type Lecturertore = {
  data: any
  loading: boolean
  doneFetch: boolean
  fetchData: (email: string) => Promise<void>
}

export const useGetLecturer = create<Lecturertore>((set) => ({
  data: {},
  loading: false,
  doneFetch: true,
  fetchData: async (email: string) => {
    try {
      set({
        loading: true,
      })
      set({
        doneFetch: false,
      })
      // Make your fetch API call here

      const response = await fetch(`/api/v1/AUTH/manageUser/lecturer?email=${email}&selection=EMAIL`)
      const data = await response.json()

      // Update the state based on the fetched data
      set((state) => ({
        data: data, // Adjust this based on your API response structure
        loading: false,
        doneFetch: true,
      }))
    } catch (error) {
      console.error('Error fetching data:', error)
      set({
        loading: false,
      })
    }
  },
}))
