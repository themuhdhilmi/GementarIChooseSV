import { create } from 'zustand'

type Studenttore = {
  student: any
  loading: boolean
  doneFetch: boolean
  add: () => void
  remove: () => void
  removeAll: () => void
  fetchData: (email: string) => Promise<void>
}

export const useGetStudent = create<Studenttore>((set) => ({
  student: {},
  loading: false,
  doneFetch: true,
  add: () =>
    set((state) => ({
      student: state.student + 1,
    })),
  remove: () =>
    set((state) => ({
      student: state.student - 1,
    })),
  removeAll: () =>
    set({
      student: 0,
    }),
  fetchData: async (email: string) => {
    try {
      set({
        loading: true,
      })
      set({
        doneFetch: false,
      })
      // Make your fetch API call here
      const response = await fetch(`/api/v1/AUTH/manageUser/student?email=${email}&type=single`)
      const data = await response.json()

      // Update the state based on the fetched data
      set((state) => ({
        student: data, // Adjust this based on your API response structure
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
